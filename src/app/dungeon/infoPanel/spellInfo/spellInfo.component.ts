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
    if (this.character.spellSlotsOpen()) {
      this.character.addSpell(this.spell);
      this.relevantTile.contents = this.character
      this.relevantTile.playerAndContent = false;
    }
  }

  getButtonsStyle(){
    if(this.hovered){
      if(this.character.spellSlotsOpen()){
        return 'openSpellSlots'
      }
    } 
    return 'fullSpellSlots'
  }

}
