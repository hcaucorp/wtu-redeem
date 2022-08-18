import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RedemptionFormState } from '../redemption-form/redemption-form.model';
import { initialState } from '../voucher/voucher.reducer';
import { v4 as uuid } from 'uuid';
import { RedemptionSuccessComponent } from './redemption-success.component';
import { Finder } from '../voucher/voucher.reducer.spec';

describe('RedemptionSuccessComponent', () => {
  let component: RedemptionSuccessComponent;
  let fixture: ComponentFixture<RedemptionSuccessComponent>;
  const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  let find: Finder<RedemptionSuccessComponent>;
  const store$ = new BehaviorSubject<RedemptionFormState>(initialState);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionSuccessComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionSuccessComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    find = new Finder<RedemptionSuccessComponent>(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to / if no redemption info present in the model', fakeAsync(() => {
    store$.next(Object.assign({}, initialState));
    tick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should display transaction hash (txid) of successful redemption', () => {
    const txid = uuid();
    store$.next(Object.assign({}, initialState, {  }));

    const paragraph = find.bySelector(PageObjects.transactionHashParagraph);
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElemement.innerText).toContain(txid);
  });
});

class PageObjects {
  static transactionHashParagraph = 'p.txid';
}
