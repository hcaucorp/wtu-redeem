import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RedemptionFormState } from '../redemption-form/redemption-form.model';
import { initialState } from './voucher.reducer';
import { BehaviorSubject } from 'rxjs';

type StoreType = Store<RedemptionFormState>;
type StoreSpy = jasmine.SpyObj<StoreType>;

describe('Voucher Effects', () => {

    const storeSpy: StoreSpy = jasmine.createSpyObj<StoreType>('Store', ['dispatch', 'select']);
    const store$ = new BehaviorSubject<RedemptionFormState>(initialState);
    const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Store, useValue: storeSpy },
                { provide: Router, useValue: routerSpy }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        storeSpy.select.and.returnValue(store$);
    });

    it('should navigate to "success" page after sucessful redemption', () => {
        fail();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/redeem/success']);
    });

    it('should navigate to "fail" page after failed redemption', () => {
        fail();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/redeem/failed']);
    });
});
