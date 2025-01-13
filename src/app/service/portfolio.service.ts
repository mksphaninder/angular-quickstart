import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PortfolioConstant } from '../constant/portfolio.constant';
import { MessageDto } from '../shared/models/messageDto.model';
import { ContactResponseDto } from '../shared/models/contactResponseDto.model';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private httpClient : HttpClient) { }

  getBioContent() {
    return this.httpClient.get<MessageDto>(PortfolioConstant.UrlConstants.BIO_URL);
  }

  getContacts() {
    return this.httpClient.get<ContactResponseDto>(PortfolioConstant.UrlConstants.CONTACTS_URL);
  }

  getResume() {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
      // Add any other headers you see working in Postman
    });
    return this.httpClient
    .get<MessageDto>(PortfolioConstant.UrlConstants.DOWNLOAD_URL.concat('/mullapudi_resume.pdf'))
    // .get<MessageDto>('localhost:3000/download/mullapudi_phaneendar.pdf', { headers: headers })
  }
}
