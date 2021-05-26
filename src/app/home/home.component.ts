import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor() { }

  ngOnInit() {

  }

}
