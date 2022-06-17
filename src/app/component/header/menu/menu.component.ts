import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  add:any;

  addClass(){
    if(this.add == true){
      this.add = false;
    }else{
      this.add = true;
    }
  }

  ngOnInit(): void {
  }

}
