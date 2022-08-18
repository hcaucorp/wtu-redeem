import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RedemptionFormState } from '../redemption-form/redemption-form.model';
import { initialState } from './voucher.reducer';
import { BehaviorSubject } from 'rxjs';
import { By } from 'protractor';

export type StoreType = Store<RedemptionFormState>;
export type StoreSpy = jasmine.SpyObj<StoreType>;

export function sendInput(nativeElement: any, text: string) {
    nativeElement.dispatchEvent(new Event('focus'));
    nativeElement.value = text;
    nativeElement.dispatchEvent(new Event('input'));
    nativeElement.dispatchEvent(new Event('blur'));
}

export class Finder<T> {
    constructor(private fixture: ComponentFixture<T>) { }

    byClass(className: string) {
        return this.fixture.debugElement.nativeElement.querySelector(By.className(className));
    }

    bySelector(selector: string) {
        return this.fixture.debugElement.nativeElement.querySelector(By.css(selector));
    }
}

describe('Voucher Reducer', () => {

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
    it('should reset model data after failed redemption', () => {
        fail();
    });

    it('should reset model except redemption info after successful redemption', () => {
        fail();
    });

});
