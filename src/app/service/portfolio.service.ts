import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PortfolioConstant } from '../constant/portfolio.constant';
import { MessageDto } from '../shared/models/messageDto.model';
import { ContactResponseDto } from '../shared/models/contactResponseDto.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private httpClient: HttpClient) { }

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
      .get(PortfolioConstant.UrlConstants.DOWNLOAD_URL.concat('/mullapudi_phaneendar.pdf'), { responseType: 'text' })
      .pipe(map(res => {
        try {
          const response: MessageDto = JSON.parse(res);
          return response.message;
        } catch (e) {
          console.error('Error parsing response', e);
          return null;
        }
      }));
    // .get<MessageDto>('localhost:3000/download/mullapudi_phaneendar.pdf', { headers: headers })
  }
}
