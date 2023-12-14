import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  @Input() name: string;
  @Input() percentage: string;
  @Input() color: string;
  //TODO: define Input fields and bind them to the template.

  constructor() { }

  ngOnInit() {
  }

}
