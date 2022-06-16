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




  constructor(level: number) {
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


  GenerateRandomEnemyType(){

  }

  nextHit(character: Character){
    let result = 'SAFE';

    if(character.currentHealth <= this.getCurrentAttack()){
      result = 'DEATH';
    } else if(this.currentHealth <= character.getCurrentAttack()) {
      result = 'VICTORY';
    }
    return result;
  }

  simulateCombat(){

  }

  combat(character){

  }
}