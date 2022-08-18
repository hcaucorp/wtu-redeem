import { Component, OnInit } from '@angular/core';
import { RedemptionFormState, WtuErrorCodes } from '../redemption-form/redemption-form.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redemption-failed',
  templateUrl: './redemption-failed.component.html',
  styleUrls: ['./redemption-failed.component.css']
})
export class RedemptionFailedComponent implements OnInit {

  readonly ONE_PER_CUSTOMER = WtuErrorCodes.ONE_PER_CUSTOMER;

  model$: Observable<RedemptionFormState>;
  model: RedemptionFormState;

  constructor(store: Store<RedemptionFormState>, private router: Router) {
    this.model$ = store.pipe(select('vouchers'));
  }

  ngOnInit() {
    this.model$.subscribe(model => {
      this.navigateToHomeWhenNoRedemptionInfoPresent(model);
      this.model = model;
    });
  }

  navigateToHomeWhenNoRedemptionInfoPresent(model: RedemptionFormState) {
    if (model.redemptionStatus !== 'error') {
      this.navigateToRoot();
    }
  }

  navigateBack() {
    this.navigateToRoot();
  }

  private navigateToRoot() {
    this.router.navigate(['/']);
  }
}
