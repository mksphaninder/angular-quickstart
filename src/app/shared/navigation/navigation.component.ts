import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { ContactDto } from '../models/contactDto.model';
import { MessageDto } from '../models/messageDto.model';
import { data } from 'cypress/types/jquery';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  contacts: ContactDto[] = [];
  linkedin: string = '';
  email: string = 'mailto:';
  resume: string = '';

  constructor(private portfolioService: PortfolioService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.portfolioService.getContacts().subscribe(data => {
      this.contacts = data.portfolioContacts;
      console.log(this.contacts);
      this.linkedin = this.contacts.find(contact => contact.socialMedia === 'Linkedin')?.contactLink || 'not found';
      let userEmail = this.contacts.find(contact => contact.socialMedia === 'email')?.contactLink;
      if (userEmail) {
        this.email = this.email.concat(userEmail);
      }
    });
  }

  handleResumeDownload() {
    this.portfolioService.getResume().subscribe(data => {
      if(data !== null) {
        window.open(data.message, '_blank');
      }
    })
  }
}
