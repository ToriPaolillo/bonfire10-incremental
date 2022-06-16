import { Component, Injectable, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'basicInfo',
  templateUrl: './basicInfo.component.html',
  styleUrls: ['./basicInfo.component.css']
})
export class BasicInfoComponent {

  @Input() character: Character;

  constructor(character:Character) {
  }

  ngOnInit() {
    let that = this;

  }

}
