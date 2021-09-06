import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  height: String;

  constructor() { 
    this.height = "1919px"
  }

  ngOnInit(): void {
    let height = window.innerHeight - (window.innerHeight * 0.1);
    this.height = height + "px";
    console.log(this.height);
  }

}
