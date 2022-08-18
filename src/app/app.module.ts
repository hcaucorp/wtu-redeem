import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RedemptionFormComponent } from './redemption-form/redemption-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { voucherReducer } from './voucher/voucher.reducer';
import { StoreModule } from '@ngrx/store';
import { VoucherEffects } from './voucher/voucher.effects';
import { EffectsModule } from '@ngrx/effects';
import { RedemptionFormService } from './voucher/voucher.service';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { RedemptionSuccessComponent } from './redemption-success/redemption-success.component';
import { RedemptionFailedComponent } from './redemption-failed/redemption-failed.component';

@NgModule({
  declarations: [
    AppComponent,
    RedemptionFormComponent,
    RedemptionSuccessComponent,
    RedemptionFailedComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ vouchers: voucherReducer }),
    EffectsModule.forRoot([VoucherEffects]),
  ],
  providers: [
    RedemptionFormService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
