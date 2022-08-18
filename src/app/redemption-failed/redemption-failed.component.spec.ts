import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RedemptionFormState, RedemptionResponse } from '../redemption-form/redemption-form.model';
import { BehaviorSubject } from 'rxjs';
import { initialState } from '../voucher/voucher.reducer';
import { v4 as uuid } from 'uuid';
import { RedemptionFailedComponent } from './redemption-failed.component';
import { Finder } from '../voucher/voucher.reducer.spec';

describe('RedemptionFailedComponent', () => {
  let component: RedemptionFailedComponent;
  let fixture: ComponentFixture<RedemptionFailedComponent>;
  let find: Finder<RedemptionFailedComponent>;
  const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  const store$ = new BehaviorSubject<RedemptionFormState>(initialState);
  const testRedemptionResponse: RedemptionResponse = {
    trackingUrls: ['http://foo.bar/transactionId'],
    transactionId: uuid()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionFailedComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionFailedComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    find = new Finder<RedemptionFailedComponent>(fixture);
  });

  it('should create when redemption info present and redemption status is "failed"', () => {
    store$.next(Object.assign({}, initialState, { redemptionStatus: 'failed', redemptionResponse: testRedemptionResponse }));
    expect(component).toBeTruthy();

    const header = find.byClass(PageObjects.header);
    expect(header).toBeTruthy();
    expect(header.nativeElement.innerText).toBe('Redmeption failed 💩');
  });

  it('should redirect to / if no redemption info present in the model ', () => {
    store$.next(Object.assign({}, initialState, { redemptionStatus: 'failed' }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to / if redemption status is not "failed"', () => {
    store$.next(Object.assign({}, initialState, { redemptionStatus: 'success', redemptionResponse: testRedemptionResponse }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});

class PageObjects {
  static header = 'header-fail';
}
