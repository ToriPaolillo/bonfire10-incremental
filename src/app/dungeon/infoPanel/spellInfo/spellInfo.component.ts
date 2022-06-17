import { Component, Injectable, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { MatButtonModule } from '@angular/material/button';
import { Tile } from 'src/app/models/tile';
import { Spell } from 'src/app/models/spell';


@Component({
  selector: 'spellInfo',
  templateUrl: './spellInfo.component.html',
  styleUrls: ['./spellInfo.component.css']
})
export class SpellInfoComponent {

  @Input() character: Character;
  @Input() relevantTile: Tile;
  @Input() spellRecycle: Boolean
  spell: Spell;
  hovered = false;
  constructor() {

  }

  ngOnInit() {
    if (this.relevantTile.contents != null && this.relevantTile.contents instanceof Spell) {
      this.spell = this.relevantTile.contents;
    }
  }

  ngOnChanges(changes) {
    if (this.relevantTile.contents != null && this.relevantTile.contents instanceof Spell) {
      this.spell = this.relevantTile.contents;
    }
  }

  pickUp() {
    if(this.spellRecycle){
      this.character.recycleSpell(this.spell);
    } else{
      if (this.character.spellSlotsOpen()) {
        this.character.addSpell(this.spell);
      }
    }
    this.relevantTile.contents = this.character
    this.relevantTile.playerAndContent = false;
  }

  getButtonsStyle() {
    if (this.spellRecycle) {
      return 'fullSpellSlots'
    } else {

      if (this.character.spellSlotsOpen()) {
        return 'openSpellSlots'
      }

    }
    return 'fullSpellSlots'
  }

  pickupText() {
    if (this.spellRecycle) {
      return 'Recycle'
    } else {
      return 'Pick Up'
    }
  }

}
