import { RedemptionFormComponent } from './redemption-form/redemption-form.component';
import { Routes } from '@angular/router';
import { RedemptionSuccessComponent } from './redemption-success/redemption-success.component';
import { RedemptionFailedComponent } from './redemption-failed/redemption-failed.component';

export const routes: Routes = [
    {
        path: 'redeem',
        component: RedemptionFormComponent
    },
    {
        path: 'redeem/success',
        component: RedemptionSuccessComponent
    },
    {
        path: 'redeem/failed',
        component: RedemptionFailedComponent
    },
    {
        path: '',
        redirectTo: '/redeem',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/redeem',
        pathMatch: 'full',
    },
];
