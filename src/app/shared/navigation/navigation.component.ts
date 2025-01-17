import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { ContactDto } from '../models/contactDto.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MessageDto } from '../models/messageDto.model';
import { data } from 'cypress/types/jquery';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  contacts: ContactDto[] = [];
  phone: string = '';
  linkedin: string = '';
  email: string = 'mailto:';
  resume: string = '';


  constructor(private portfolioService: PortfolioService, private httpClient: HttpClient, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.portfolioService.getContacts().subscribe(data => {
      this.contacts = data.portfolioContacts;
      this.linkedin = this.contacts.find(contact => contact.socialMedia === 'Linkedin')?.contactLink || 'not found';
      let userEmail = this.contacts.find(contact => contact.socialMedia === 'email')?.contactLink;
      this.phone = this.contacts.find(contact => contact.socialMedia === 'phone')?.contactLink || 'not found';
      if (userEmail) {
        this.email = this.email.concat(userEmail);
      }
    });
    this.handleResumeDownload();
  }

  handleResumeDownload() {
    this.portfolioService.getResume().subscribe(data => {
      if(data !== null) {
        this.resume = data;
      }
    })
  }
}
