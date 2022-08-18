import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedemptionResponse, RedemptionRequest, VoucherInfoRequest, VoucherInfoResponse } from '../redemption-form/redemption-form.model';
import { HttpClient } from '@angular/common/http';

const API_URL = `/api/vouchers`;

@Injectable()
export class RedemptionFormService {
  constructor(private http: HttpClient) { }

  redeem(request: RedemptionRequest): Observable<RedemptionResponse> {
    return this.http.post<RedemptionResponse>(`${API_URL}/redeem`, request);
  }

  requestVoucherInfo(request: VoucherInfoRequest): Observable<VoucherInfoResponse> {
    return this.http.get<VoucherInfoResponse>(`${API_URL}/${request.voucherCode}`);
  }
}
