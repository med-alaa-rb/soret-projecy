import { Component, OnInit, ViewChild } from '@angular/core';
import { MbscFormOptions } from '@mobiscroll/angular';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('run1')
  r1: any;
  @ViewChild('run2')
  r2: any;
  @ViewChild('run3')
  r3: any;

  formSettings: MbscFormOptions = {
      theme: 'material',
      themeVariant: 'dark'
  };

  closeAll() {
      this.r1.instance.hide();
      this.r2.instance.hide();
      this.r3.instance.hide();
  }

 
}


