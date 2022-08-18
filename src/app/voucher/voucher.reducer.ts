import { RedemptionFormState } from '../redemption-form/redemption-form.model';
import { VoucherActions, VoucherActionTypes } from './voucher.actions';

export const initialState: RedemptionFormState = {
  destinationAddress: '',
  redemptionStatus: 'new',
  voucherInfoError: false,
  voucherCode: '',
};

export function voucherReducer(state = initialState, action: VoucherActions) {
  switch (action.type) {
    case VoucherActionTypes.LoadVoucherInfo:
      return Object.assign({}, state, {voucherInfoError: false, voucherInfo: undefined});

    case VoucherActionTypes.LoadVoucherInfoCompleted:
      return Object.assign({}, state, {voucherInfo: action.payload});

    case VoucherActionTypes.LoadVoucherInfoFailed:
      return Object.assign({}, state, {voucherInfoError: true});

    case VoucherActionTypes.RedeemVoucher:
      return Object.assign({}, state, {redemptionStatus: 'pending'});

    case VoucherActionTypes.RedeemVoucherCompleted:
      return Object.assign({}, state, {redemptionStatus: 'success', redemptionResponse: action.payload});

    case VoucherActionTypes.RedeemVoucherFailed:
      return Object.assign({}, state, {redemptionStatus: 'error', redemptionError: action.payload});

    default:
      return state;
  }
}
