export enum WtuErrorCodes {
  ONE_PER_CUSTOMER = 'ONE_PER_CUSTOMER'
}

export interface RedemptionResponse {
    trackingUrls: string[];
    transactionId: string;
}

export interface RedemptionRequest {
    destinationAddress: string;
    voucherCode: string;
}

export interface VoucherInfoRequest {
    voucherCode: string;
}

export interface VoucherInfoResponse {
    status: string;
    expiresAt: number;
}

export interface RedemptionFormState {
    destinationAddress: string;
    redemptionStatus: 'pending' | 'success' | 'error' | 'new';
    redemptionRequest?: RedemptionRequest;
    redemptionResponse?: RedemptionResponse;
    redemptionError?: ApiError;
    voucherCode: string;
    voucherInfo?: VoucherInfoResponse;
    voucherInfoError: boolean;
}

export interface ApiError {
  status: number;
  message: WtuErrorCodes;
  error: string;
  timestamp: string;
  path: string;
}
