import { Injectable } from "@angular/core";
import { Altar } from "./altar";
import { Character } from "./character";
import { Enemy } from "./enemy";
import { Shop } from "./shop";
import { Spell } from "./spell";

@Injectable()
export class Tile {
  explored: boolean;
  preview: boolean;
  walkable: boolean;
  contents: any;
  xCoord: number;
  yCoord: number;
  playerAndContent: boolean


  constructor(explored: boolean, preview: boolean, walkable: boolean, contents?: any, xCoord?: number, yCoord?: number) {
    this.explored = explored;
    this.preview = preview;
    this.walkable = walkable;
    this.contents = contents;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.playerAndContent = false;

  }


  hasInfo(): boolean {
    if (this.contents != null) {
      return this.contents instanceof Spell || this.contents instanceof Enemy || this.contents instanceof Shop || this.contents instanceof Altar
    }
    return false;
  }

  canInteractWith(): boolean {
    if (this.contents != null) {
      return this.contents instanceof Spell || this.contents instanceof Shop || this.contents instanceof Altar
    }
    return false;
  }

  playerOrEnemy() {
    if (this.contents != null) {
      return this.contents instanceof Enemy || this.contents instanceof Character;
    }
    return false
  }

  getImage() {
    let returnString = 'Dirt';
    if (this.contents != null && this.contents.pngString != null && this.contents.pngString != '') {

      returnString = this.contents.pngString;
    }

    return returnString;
  }




}