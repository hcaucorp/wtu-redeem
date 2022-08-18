import { Component, OnInit } from '@angular/core';
import { RedemptionFormState } from '../redemption-form/redemption-form.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-redemption-success',
  templateUrl: './redemption-success.component.html',
  styleUrls: ['./redemption-success.component.css']
})
export class RedemptionSuccessComponent implements OnInit {

  model$: Observable<RedemptionFormState>;

  constructor(
    store: Store<RedemptionFormState>,
    private router: Router,
  ) {
    this.model$ = store.pipe(select('vouchers'));
  }

  ngOnInit() {
    this.model$
      .pipe(take(1))
      .subscribe(model => this.navigateToHomeWhenNoRedemptionInfoPresent(model));
  }

  navigateToHomeWhenNoRedemptionInfoPresent(model: RedemptionFormState) {
    if (!model.redemptionResponse) {
      this.router.navigate(['/']);
    }
  }

  navigateBack() {
    this.router.navigate(['/']);
  }
}
