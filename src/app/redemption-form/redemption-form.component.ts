import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RedeemVoucher, LoadVoucherInfo } from '../voucher/voucher.actions';
import { debounceTime, filter } from 'rxjs/operators';
import { RedemptionFormState } from './redemption-form.model';

@Component({
  selector: 'app-redemption-form',
  templateUrl: './redemption-form.component.html',
  styleUrls: ['./redemption-form.component.css']
})
export class RedemptionFormComponent implements OnInit {

  readonly VOUCHER_CODE_REGEX = /^wtu[a-z]{3}-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  form: FormGroup;
  model$: Observable<RedemptionFormState>;
  codePatternValidator = Validators.pattern(this.VOUCHER_CODE_REGEX);

  constructor(
    private fb: FormBuilder,
    private store: Store<RedemptionFormState>) {
    this.model$ = store.pipe(select('vouchers'));
  }

  ngOnInit() {
    this.form = this.fb.group({
      voucherCode: ['', [Validators.required, this.codePatternValidator]],
      destinationAddress: ['', [Validators.required, Validators.minLength(12)]]
    });

    const voucherCodeControl = this.form.controls.voucherCode;

    voucherCodeControl.valueChanges
      .pipe(
        debounceTime(500),
        filter(value => voucherCodeControl.valid)
      )
      .subscribe(value => this.store.dispatch(new LoadVoucherInfo({ voucherCode: value })));

      this.model$.subscribe(state => {
        if (state.voucherInfoError) {
          voucherCodeControl.setErrors({'voucher code error': true});
        }
      });
  }

  onSubmit() {
    this.form.disable();

    this.store.dispatch(new RedeemVoucher(this.form.value));
  }
}
