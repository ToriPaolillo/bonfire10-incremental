import { Injectable } from "@angular/core";
import { Character } from "./character";
import { Tile } from "./tile";

@Injectable()
export class Spell {
  name: string;
  pngString: string;
  description: string;
  manaCost: number;
  fontSize: number;
  spellBeingClickedSuccess:boolean;
  spellBeingClickedFail:boolean;



  constructor(name: string) {
    this.spellBeingClickedSuccess = false;
    this.spellBeingClickedFail = false;

    switch (name) {
      case 'fireBall':
        this.name = 'Fire Ball';
        this.pngString = 'G_Fireball';
        this.description = 'TARGET: Hits a monster with a fireball, causing 4 points of damage per player level';
        this.manaCost = 6;
        this.fontSize = 44;
        break;
      case 'poison':
        this.name = 'Poison';
        this.pngString = 'G_Poison';
        this.description = "TARGET: Inflicts a monster with poison, preventing it from regenerating health as you explore. Will wear off if they're attacked. Undead are immune.";
        this.manaCost = 5;
        this.fontSize = 50;
        break;
      case 'bloodMagic':
        this.name = 'Blood Magic';
        this.pngString = 'G_Blood';
        this.description = 'TOGGLE: while active, exploration regenerates twice as much mana but no health';
        this.manaCost = 0;
        this.fontSize = 42;
        break;
      case 'might':
        this.name = 'Might';
        this.pngString = 'G_Might';
        this.description = 'CAST: Gain +30% damage bonus for next physical attack';
        this.manaCost = 2;
        this.fontSize = 50;
        break;
      case 'deathDefy':
        this.name = 'Death Defy';
        this.pngString = 'G_KillProtect';
        this.description = 'CAST: Gain Death Defiance (the next fatal attack will instead only reduce your health to 1)';
        this.manaCost = 10;
        this.fontSize = 40;
        break;
      case 'destroyWall':
        this.name = 'Destroy Wall';
        this.pngString = 'G_Endwall';
        this.description = 'TARGET: Destroys a wall tile';
        this.manaCost = 8;
        this.fontSize = 40;
        break;
      case 'firstStrike':
        this.name = 'First Strike';
        this.pngString = 'G_FirstStrike';
        this.description = 'CAST: Gain First Strike for the next physical attack';
        this.manaCost = 3;
        this.fontSize = 40;
        break;
      case 'heal':
        this.name = 'Heal';
        this.pngString = 'G_Heal';
        this.description = 'CAST: Heals 3 HP per player level';
        this.manaCost = 3;
        this.fontSize = 50;
        break;
      case 'petrify':
        this.name = 'Petrify';
        this.pngString = 'G_Petrify';
        this.description = 'TARGET: Turns an enemy to stone. (no exp is gained)';
        this.manaCost = 5;
        this.fontSize = 50;
        break;
      case 'reveal':
        this.name = 'Reveal';
        this.pngString = 'G_Reveal';
        this.description = 'CAST: Reveals 3 random unrevealed tiles';
        this.manaCost = 3;
        this.fontSize = 50;
        break;
      case 'teleportMonster':
        this.name = 'Teleport Monster';
        this.pngString = 'G_TeleMonster';
        this.description = 'TARGET: Teleports monster to a random tile';
        this.manaCost = 10;
        this.fontSize = 40;
        break;
      case 'teleport':
        this.name = 'Teleport';
        this.pngString = 'G_TeleSelf';
        this.description = 'CAST: Teleports you to a random tile';
        this.manaCost = 6;
        this.fontSize = 46;
        break;
        case 'summon':
          this.name = 'Summon';
          this.pngString = 'G_Summon';
          this.description = 'CAST: Summmons a random monster of your current level (if one exists)';
          this.manaCost = 6;
          this.fontSize = 50;
          break;
      default:
        this.name = 'empty';
        this.pngString = 'G_Empty';
        this.description = '';
        this.manaCost = 0;
        this.fontSize = 20;
        break;
    }
  }

    activateSpell(character:Character, tile?:Tile){
      switch (this.name) {
        case 'Fire Ball':

          break;
        case 'Poison':

          break;
        case 'Blood Magic':
          character.bloodMagic = !character.bloodMagic;
          break;
        case 'Might':
            character.strongStrike = true;
          break;
        case 'Death Defy':
          character.deathDefiance = true;
          break;
        case 'Destroy Wall':

          break;
        case 'First Strike':
          character.firstStrike = true;
          break;
        case 'Heal':
          character.currentHealth += 3*character.level;
          character.currentHealth > character.getMaxHealth() ? character.currentHealth = character.getMaxHealth() : null ;
          break;
        case 'Petrify':

          break;
        case 'Reveal':

          break;
        case 'Teleport Monster':

          break;
        case 'Teleport':

          break;
          case 'Summon':

            break;
        default:

          break;
      }
      character.currentMana -= this.manaCost;
    }

    canCast(character:Character){
      let canCast = false;
      if(character.currentMana >= this.manaCost){
        if(this.name == 'Heal'){
          character.currentHealth == character.getMaxHealth() ? canCast = false : canCast = true
        } else{
          canCast = true
        }
      }
      return canCast;
    }



}