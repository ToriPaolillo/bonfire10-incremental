import { Injectable } from "@angular/core";

@Injectable()
export class BasicItem {
  name: string;
  pngString: string;


  constructor(name: string) {
    this.name = name;
    this.pngString = this.getPngString();
  }

  getPngString() {
    let pngString = '';

    switch (this.name) {
      case 'wall':
        pngString = 'Wall'
        break;
      case 'blood':
        pngString = 'Blood'
        break;
      case 'empty':
        break;
      case 'gold':
        pngString = 'Gold'
        break;
      case 'strengthBoost':
        pngString = 'Attackboost'
        break;
      case 'healthBoost':
        pngString = 'HPBoost'
        break;
      case 'manaBoost':
        pngString = 'MPBoost'
        break;
      case 'healthPotion':
        pngString = 'HealthPotion'
        break;
      case 'manaPotion':
        pngString = 'ManaPotion'
        break;
      default:
        break;
    }



    return pngString;
  }

  pickupAction(character) {
    switch (this.name) {
      case 'healthPotion':
        character.healthPotions++;
        break;
      case 'gold':
        let goldAdd = Math.round((Math.random() * 2) + 1);
        character.gold += goldAdd;
        break;
      case 'manaPotion':
        character.manaPotions++;
        break;
      case 'healthBoost':
        character.baseHealth++;
        break;
      case 'manaBoost':
        character.baseMana++;
        break;
      case 'strengthBoost':
        character.bonusStrength++;
        break;
      case 'blood':

        break;
      default:
        break;
    }
  }

}