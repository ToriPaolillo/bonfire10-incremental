import { Component, Injectable, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { MatButtonModule } from '@angular/material/button';
import { Tile } from 'src/app/models/tile';
import { Spell } from 'src/app/models/spell';
import { Enemy } from 'src/app/models/enemy';
import { Shop } from 'src/app/models/shop';
import { Altar } from 'src/app/models/altar';


@Component({
  selector: 'infoPanel',
  templateUrl: './infoPanel.component.html',
  styleUrls: ['./infoPanel.component.css']
})
export class InfoPanelComponent {

  @Input() character: Character;
  @Input() relevantTile: Tile;

  constructor() {

  }

  ngOnInit() {
    let that = this;
  }

  ngOnChanges(changes){
    let test = 9;
  }
  tileIsSpell() {
    return this.relevantTile != null && this.relevantTile.contents != null && (this.relevantTile.contents instanceof Spell)
  }

  tileIsEnemy() {
    return this.relevantTile != null && this.relevantTile.contents != null && (this.relevantTile.contents instanceof Enemy)
  }

  tileIsAltar() {
    return this.relevantTile != null && this.relevantTile.contents != null && (this.relevantTile.contents instanceof Altar)
  }

  tileIsShop() {
    return this.relevantTile != null && this.relevantTile.contents != null && (this.relevantTile.contents instanceof Shop)
  }

  tileHasNoInfo() {
    return !this.tileIsSpell() && !this.tileIsEnemy() && !this.tileIsAltar() && !this.tileIsShop();
  }

  activateSpell(spell){
    if(spell.canCast(this.character)){
      spell.activateSpell(this.character);
    }
  }

  mouseclickHeld(spell:Spell){
    spell.canCast(this.character) ? spell.spellBeingClickedSuccess = true : spell.spellBeingClickedFail = true;
  }

  mouseClickUp(spell:Spell){
    spell.spellBeingClickedSuccess = false 
    spell.spellBeingClickedFail = false;
  }

}
