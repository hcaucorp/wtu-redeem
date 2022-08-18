import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { LoadVoucherInfo } from '../voucher/voucher.actions';
import { BehaviorSubject } from 'rxjs';
import { initialState } from '../voucher/voucher.reducer';
import { Router } from '@angular/router';
import { StoreType, StoreSpy, Finder, sendInput } from '../voucher/voucher.reducer.spec';
import { RedemptionFormComponent } from './redemption-form.component';
import { RedemptionFormState } from './redemption-form.model';

describe('RedemptionFormComponent', () => {
  let component: RedemptionFormComponent;
  let fixture: ComponentFixture<RedemptionFormComponent>;
  let find: Finder<RedemptionFormComponent>;
  const storeSpy: StoreSpy = jasmine.createSpyObj<StoreType>('Store', ['dispatch', 'select']);
  const store$ = new BehaviorSubject<RedemptionFormState>(initialState);
  const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionFormComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionFormComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    find = new Finder<RedemptionFormComponent>(fixture);

    storeSpy.select.and.returnValue(store$);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sent redemption request when form submitted', () => {
    const button = find.byClass('button-up');

    fail('not implemented');
  });

  it('should request voucher info after typing in the code', fakeAsync(() => {
    const voucherCode = 'wtuxxx-3e491e82-6c3a-434c-af66-c2771ac2bb8b';
    const field = find.byClass(PageObjects.voucherCodeInputClass);
    sendInput(field, voucherCode);

    tick(500);

    expect(storeSpy.dispatch).toHaveBeenCalledWith(new LoadVoucherInfo({ voucherCode: voucherCode }));
  }));

  it('should display valid message if voucher info status is valid', fakeAsync(() => {
    store$.next(Object.assign({}, initialState, { voucherInfo: { status: 'valid', expiresAt: '0' } }));

    tick();

    const statusMessage = find.bySelector(PageObjects.voucherStatusMessage);
    expect(statusMessage).toBeDefined();
    expect(statusMessage.nativeElement.innerText).toBe('voucher code is valid');
  }));

  it('should display "expired" message if voucher info status is "expired"', fakeAsync(() => {
    store$.next(Object.assign({}, initialState, { voucherInfo: { status: 'expired', expiresAt: '0' } }));

    tick();

    const statusMessage = find.bySelector(PageObjects.voucherStatusMessage);
    expect(statusMessage).toBeDefined();
    expect(statusMessage.nativeElement.innerText).toBe('it expired');
  }));

  it('should display "invalid voucher" message if voucher info response is errorish', fakeAsync(() => {
    store$.next(Object.assign({}, initialState, { voucherInfoError: true }));

    tick();

    const statusMessage = find.bySelector(PageObjects.voucherStatusMessage);
    expect(statusMessage).toBeDefined();
    expect(statusMessage.nativeElement.innerText).toBe('voucher code is valid');
  }));

  it('should display "redeemed" message if voucher info response is "redeemed"', fakeAsync(() => {
    store$.next(Object.assign({}, initialState, { voucherInfo: { status: 'expired', expiresAt: '0' } }));

    tick();

    const statusMessage = find.bySelector(PageObjects.voucherStatusMessage);
    expect(statusMessage).toBeDefined();
    expect(statusMessage.nativeElement.innerText).toBe('already redeemed');
  }));

  it('should display "required" validation error if voucher code is empty', fakeAsync(() => {
    const field = find.byClass(PageObjects.voucherCodeInputClass);
    sendInput(field, '');

    const validationMessage = find.bySelector(PageObjects.voucherValidationError);
    expect(validationMessage).toBeDefined();
    expect(validationMessage.nativeElement.innerText).toBe('you must enter a value');
  }));

  it('should diplay "invalid voucher" message if voucher code doesn`t match standard format (regexp)', () => {
    const invalidVoucherCode = 'wtuxxx-3e4_1e82-6c3a-434c-af66-c2771ac2bb8b';
    const field = find.byClass(PageObjects.voucherCodeInputClass);
    sendInput(field, invalidVoucherCode);

    const validationMessage = find.bySelector(PageObjects.voucherValidationError);
    expect(validationMessage).toBeDefined();
    expect(validationMessage.nativeElement.innerText).toBe('we don\'t recognize this voucher 💩');
  });
});

class PageObjects {
  static voucherCodeInputClass = 'voucherCodeInput';
  static voucherStatusMessage = '.voucherCodeFormField mat-hint';
  static voucherValidationError = '.voucherCodeFormField mat-error';
  static addressInput = 'addressInput';
  static sendToButton = 'sendToButton';
}
