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

  spell: Spell;
  spellHovered = false;

  spellRecycle = false;
  recycleTooltip = "Toggles spell recycle. When active, clicking aquired spells will recycle them, granting you some bonus based on your class"
  constructor() {

  }

  ngOnInit() {
    let that = this;
  }

  ngOnChanges(changes) {
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

  hoveringSpell(spell: Spell) {
    this.spell = spell;
    if (spell.canCast(this.character)) {
      this.spellHovered = true;
    }
  }

  mouseclickHeld(spell: Spell) {
    if (spell.name != 'empty') {
      spell.canCast(this.character) ? spell.spellBeingClickedSuccess = true : spell.spellBeingClickedFail = true;
    }
  }

  mouseClickUp(spell: Spell) {
    spell.spellBeingClickedSuccess = false
    spell.spellBeingClickedFail = false;
  }


  manaAfterSpellUse() {
    if (this.spell != null) {
      if (this.tileIsEnemy()) {
        return this.spell.predictSpellUse(this.character, true);
      }
      return this.spell.predictSpellUse(this.character);
    }
    else {
      return this.character.currentMana / this.character.baseMana;
    }
  }

  onSpellClick(spell: Spell) {
    if (this.spellRecycle) {
      this.character.recycleSpell(spell);
    } else if (spell.canCast(this.character)) {
      switch (spell.type) {
        case 'cast':
          spell.activateSpell(this.character);
          break;
        case 'toggle':
          spell.activateSpell(this.character);
          spell.toggleOn = !spell.toggleOn;
          break;
        case 'target':
          if (!spell.targetFirstClick) {
            this.character.spells.forEach(currentSpell => {
              currentSpell.targetFirstClick = false;
            });
            spell.targetFirstClick = true;
          } else {
            spell.targetFirstClick = false;

          }
          break;
        default:
          break;
      }
    }


  }

  onRecycleClick() {
    this.spellRecycle = !this.spellRecycle
    this.spellRecycle ? this.recycleTooltip = "ACTIVE: any spells clicked will be recycled" : this.recycleTooltip = "Toggles spell recycle. When active, clicking aquired spells will recycle them, granting you some bonus based on your class"

  }
}
