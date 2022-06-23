import { Injectable } from "@angular/core";
import { Enemy } from "./enemy";
import { Spell } from "./spell";
import * as _ from 'lodash';

@Injectable()
export class Character {
  //stats
  name: string;
  race: string;
  class: string;
  level: number;
  experience: number;
  gold: number;
  piety: number;
  healthPotions: number;
  manaPotions: number;
  baseStrength: number;
  bonusStrength: number;
  currentHealth: number;
  currentMana: number;
  baseHealth: number;
  baseMana: number;
  baseHealthRegen: number
  baseManaRegen: number;
  healthPotionGain: number;
  manaPotionGain: number;
  permaFirstStrike: boolean;
  spells: Spell[];
  spellSlots: number;
  spellsOnMap: number;

  // metaData
  pngString: String;
  levelNumberWidth: number;
  levelNumberHeight: number;

  //temp positive statuses
  firstStrike: boolean;
  strongStrike: boolean;
  deathDefiance: boolean;
  petrification: boolean;
  bloodMagic: boolean;

  //temp negative statuses
  poisoned: boolean;
  manaBurn: boolean;
  weakened: boolean;


  constructor() {
    this.name = 'Jared'
    this.race = 'Human'
    this.class = 'Fighter'
    this.level = 3
    this.experience = 22;
    this.gold = 13
    this.piety = 20
    this.healthPotions = 1;
    this.manaPotions = 1
    this.baseStrength = 5;
    this.bonusStrength = 0;
    this.currentHealth = 15
    this.currentMana = 12
    this.baseHealth = 10
    this.baseMana = 12
    this.baseHealthRegen = 1
    this.baseManaRegen = 1
    this.healthPotionGain = 0.38;
    this.manaPotionGain = 0.35;
    this.permaFirstStrike = false;
    this.strongStrike = false;
    this.spellSlots = 3;
    this.spellsOnMap = 5;
    this.pngString = 'HeroBase';
    this.levelNumberWidth = 6;
    this.levelNumberHeight = 12;

    this.spells = [];
    for (let i = 0; i < this.spellSlots; i++) {
      this.spells.push(new Spell('empty'));
    }

    this.bloodMagic = false;



  }


  getMaxHealth() {
    return this.baseHealth * this.level;
  }

  getCurrentAttack() {
    return (this.baseStrength * this.level) + this.bonusStrength
  }

  getMaxExperience() {
    return this.level * 5
  }

  getHealthRegen() {
    return this.bloodMagic ? 0 : this.level * this.baseHealthRegen;
  }

  getManaRegen() {
    return this.bloodMagic ? this.baseManaRegen * 2 : this.baseManaRegen;
  }

  exploredSquare() {
    (this.currentHealth + this.getHealthRegen()) > this.getMaxHealth() ? this.currentHealth = this.getMaxHealth() : this.currentHealth += this.getHealthRegen();
    (this.currentMana + this.getManaRegen()) > this.baseMana ? this.currentMana = this.baseMana : this.currentMana += this.getManaRegen();
  }

  addSpell(newSpell: Spell) {
    let slotFound = false;

    let newSpellList = []; // this temp variable is necssary because just updating the existing spells variable doesn't trigger ngOnChanges for the Character class. It has to be reset to a new variable
    this.spells.forEach(spell => {
      if (spell.name == 'empty' && !slotFound) {
        newSpellList.push(newSpell);
        slotFound = true;
      } else {
        newSpellList.push(spell)
      }
    })

    this.spells = newSpellList;
  }

  recycleSpell(recSpell: Spell) {
    let i = 0;
    this.spells.forEach(spell => {
      if (spell.name == recSpell.name) {
        this.spells[i] = new Spell('empty');
      }
      i++;
    })

    this.spells;
    this.spellRecycleBonus();
  }

  getCurrentLevelExp() {
    return this.experience - (5 * (0.5 * (this.level - 1)) * this.level);
  }


  spellRecycleBonus() {

  }

  spellSlotsOpen() {
    let slotOpen = false;
    this.spells.forEach(spell => {
      if (spell.name == 'empty') {
        slotOpen = true;
      }
    });
    return slotOpen;
  }

  killedEnemy(enemy: Enemy) {
    let expBoost = enemy.level
    switch (enemy.level - this.level) {
      case 0:
        break;
      case 1:
        expBoost = enemy.level + 2
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;



    }
    this.experience += expBoost
    if (this.getCurrentLevelExp() >= this.level * 5) {
      this.level++
      this.currentHealth = this.getMaxHealth()
      this.currentMana = this.baseMana
    }
  }

  predictCombat(enemy: Enemy): any {
    let activeSpell = _.find(this.spells, { targetFirstClick: true })
    if (activeSpell != null) {
      let characterHealth = this.currentHealth;
      let enemyHealth = enemy.currentHealth
      let death = 'none'
      if(activeSpell.name == 'Fire Ball'){
        enemyHealth = enemy.currentHealth - (this.level * 4);
        if (enemyHealth <= 0) {
          enemyHealth = 0;
          death = 'enemyDeath';
        }
      }
      
      let combatResult = { characterHealth: characterHealth, enemyHealth: enemyHealth, death: death, spell: activeSpell }
      return combatResult

    } else {
      let firstStrike = enemy.whoHasFirstStrike(this);


      let characterHealth = this.currentHealth - enemy.getCurrentAttack();
      let enemyHealth = enemy.currentHealth - this.getCurrentAttack();
      let death = 'none';



      if (enemyHealth <= 0) {
        enemyHealth = 0;
        death = 'enemyDeath';
      }

      if (characterHealth <= 0) {
        characterHealth = 0;
        death = 'characterDeath'
      }

      if (enemyHealth <= 0 && firstStrike == 'character') {
        characterHealth = this.currentHealth;
        death = 'enemyDeath';
      }

      let combatResult = { characterHealth: characterHealth, enemyHealth: enemyHealth, death: death }

      return combatResult
    }


  }

  predictSpellEffect(enemy: Enemy) {

  }


  getPredictedCombatHealth(enemy: Enemy) {
    return this.predictCombat(enemy).characterHealth / this.getMaxHealth()
  }

}