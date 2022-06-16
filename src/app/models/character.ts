import { Injectable } from "@angular/core";
import { Spell } from "./spell";

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
    this.experience = 7;
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

    this.spells=[];
    for (let i = 0; i < this.spellSlots; i++) {
      this.spells.push(new Spell('empty'));
    }

    this.bloodMagic = false;
    


  }


  getMaxHealth(){
    return this.baseHealth * this.level;
  }

  getCurrentAttack(){
    return (this.baseStrength * this.level) + this.bonusStrength
  }

  getMaxExperience(){
    return this.level * 5
  }

  getHealthRegen(){
    return this.bloodMagic ? 0 : this.level * this.baseHealthRegen;
  }

  getManaRegen(){
    return this.bloodMagic ? this.baseManaRegen * 2 : this.baseManaRegen;
  }

  exploredSquare(){
    (this.currentHealth + this.getHealthRegen() ) > this.getMaxHealth() ? this.currentHealth = this.getMaxHealth() : this.currentHealth += this.getHealthRegen();
    (this.currentMana + this.getManaRegen() ) > this.baseMana ? this.currentMana = this.baseMana : this.currentMana += this.getManaRegen();
  }

  addSpell(newSpell:Spell){
    let slotFound = false;

    let newSpellList = []; // this temp variable is necssary because just updating the existing spells variable doesn't trigger ngOnChanges for the Character class. It has to be reset to a new variable
    this.spells.forEach(spell=>{
      if(spell.name == 'empty' && !slotFound){
        newSpellList.push(newSpell);
        slotFound = true;
      } else{
        newSpellList.push(spell)
      }
    })

    this.spells = newSpellList;


  }

  spellSlotsOpen(){
    let slotOpen = false;
    this.spells.forEach(spell=>{
      if(spell.name == 'empty'){
        slotOpen = true;
      }
    });
    return slotOpen;
  }

}