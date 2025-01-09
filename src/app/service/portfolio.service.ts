import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioConstant } from '../constant/portfolio.constant';
import { MessageDto } from '../shared/models/messageDto.model';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private httpClient : HttpClient) { }

  getBioContent() {
    return this.httpClient.get<MessageDto>(PortfolioConstant.BIO_URL);
  }
}
