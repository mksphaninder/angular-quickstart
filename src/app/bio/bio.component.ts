import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioService } from '../service/portfolio.service';
import { MessageDto } from '../shared/models/messageDto.model';


@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

  bioContent: string = '';

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getBioContent().subscribe(data => {
      console.log(data);
      this.bioContent = data.message;
    });
  }

}
