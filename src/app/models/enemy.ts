import { Injectable } from "@angular/core";
import { Character } from "./character";

@Injectable()
export class Enemy {
  //stats
  name; string;
  type: string;
  level: number;
  baseStrength: number;
  bonusStrength: number;
  currentHealth: number;
  baseHealth: number;
  baseHealthRegen: number
  permaFirstStrike: boolean;

  deathDefiance: boolean;
  petrification: boolean;

  // negative statuses
  poisoned: boolean;
  weakened: boolean;
  vulernable: boolean;
  physicalResist: boolean;
  magicResist: boolean;

  // metaData
  pngString: String;
  levelNumberWidth: number;
  levelNumberHeight: number;
  nextHit: string;
  nextHitTextColor: string;



  constructor(level: number, character: Character) {
    this.pngString = 'MeatMan'
    this.name = 'Meat Man'
    this.type = 'Normal'
    level ? this.level = level : this.level = 8;
    this.baseStrength = 5;
    this.bonusStrength = 0;
    this.baseHealth = 5
    this.currentHealth = this.getMaxHealth();
    this.baseHealthRegen = 1
    this.permaFirstStrike = false;
    level == 10 ? this.levelNumberWidth = 12 : this.levelNumberWidth = 6;
    this.levelNumberHeight = 10;

    this.setNextHit(character);

  }


  getMaxHealth() {
    return this.baseHealth * this.level;
  }

  getCurrentAttack() {
    return (this.baseStrength * this.level) + this.bonusStrength
  }

  getHealthRegen() {
    return this.level * this.baseHealthRegen;
  }


  GenerateRandomEnemyType() {

  }

  setNextHit(character: Character) {
    let combatResult = character.predictCombat(this)

    if (combatResult.death =='enemyDeath') {
      this.nextHit = 'VICTORY';
      this.nextHitTextColor = 'green'
    } else if (combatResult.death == 'characterDeath') {
      this.nextHit = 'DEATH';
      this.nextHitTextColor = 'red'
    } else {
      this.nextHit = 'SAFE';
      this.nextHitTextColor = 'yellow'
    }
  }

  whoHasFirstStrike(character: Character) {
    let firstStrike = 'none'
    if (this.permaFirstStrike && !character.firstStrike) {
      firstStrike = 'enemy';
    } else if (character.firstStrike) {
      firstStrike = 'character';
    }
    return firstStrike;

  }

  getPredictedCombatHealth(character: Character) {
    return character.predictCombat(this).enemyHealth / this.getMaxHealth()
  }

  combat(character: Character) {
    let combatResult = character.predictCombat(this);
    if(combatResult.spell != null){
      combatResult.spell.activateSpell(character, this);
    }else{
      character.currentHealth = combatResult.characterHealth;
      this.currentHealth = combatResult.enemyHealth;
      if (!character.permaFirstStrike) {
        character.firstStrike = false;
      }
    }

    this.setNextHit(character);



    return combatResult.death;
  }

}