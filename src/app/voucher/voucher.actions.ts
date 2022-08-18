import { Action } from '@ngrx/store';
import {
  RedemptionRequest,
  RedemptionResponse,
  VoucherInfoResponse,
  VoucherInfoRequest,
  ApiError
} from '../redemption-form/redemption-form.model';

export enum VoucherActionTypes {
  RedeemVoucher = '[Redemption Form Component] Redeem Voucher',
  RedeemVoucherCompleted = '[Redemption Form Component] Redeem Voucher Completed',
  RedeemVoucherFailed = '[Redemption Form Component] Redeem Voucher Failed',
  LoadVoucherInfo = '[Redemption Form Component] Load Voucher Info',
  LoadVoucherInfoCompleted = '[Redemption Form Component] Load Voucher Info Completed',
  LoadVoucherInfoFailed = '[Redemption Form Component] Load Voucher Info Failed',
}

export class RedeemVoucher implements Action {
  constructor(public payload: RedemptionRequest) { }
  readonly type = VoucherActionTypes.RedeemVoucher;
}

export class RedeemVoucherCompleted implements Action {
  constructor(public payload: RedemptionResponse) { }
  readonly type = VoucherActionTypes.RedeemVoucherCompleted;
}

export class RedeemVoucherFailed implements Action {
  constructor(public payload?: ApiError) { }
  readonly type = VoucherActionTypes.RedeemVoucherFailed;
}

export class LoadVoucherInfo implements Action {
  constructor(public payload: VoucherInfoRequest) { }
  readonly type = VoucherActionTypes.LoadVoucherInfo;
}

export class LoadVoucherInfoCompleted implements Action {
  constructor(public payload: VoucherInfoResponse) { }
  readonly type = VoucherActionTypes.LoadVoucherInfoCompleted;
}

export class LoadVoucherInfoFailed implements Action {
  readonly type = VoucherActionTypes.LoadVoucherInfoFailed;
}

export type VoucherActions =
  RedeemVoucher | RedeemVoucherCompleted | RedeemVoucherFailed |
  LoadVoucherInfo | LoadVoucherInfoCompleted | LoadVoucherInfoFailed;
