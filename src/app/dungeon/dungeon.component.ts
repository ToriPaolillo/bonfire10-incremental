import { Component, Injectable } from '@angular/core';
import { Character } from '../models/character';
import { GridMatrix } from '../models/gridMatrix';
import { Tile } from '../models/tile';


@Component({
  selector: 'dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent {

  items = ['test', 'test2', 'test3', 'test4'];

  gridMatrix: GridMatrix;
  character: Character;
  relevantTile: Tile;

  levelNumberWidth = 6;
  levelNumberHeight = 10;

  constructor(gridMatrix: GridMatrix) {
    this.character = new Character();
    this.gridMatrix = new GridMatrix(this.character);
    this.relevantTile = this.gridMatrix.getPlayerTile();

  }



  ngOnInit() {
    let that = this;



  }

  determineRelevantTile(hoveredTile) {
    let playerTile = this.gridMatrix.getPlayerTile();

    if (hoveredTile.hasInfo() && hoveredTile.explored) {
      this.relevantTile = hoveredTile;
    } else if (this.relevantTile != null && !this.relevantTile.playerAndContent && !playerTile.playerAndContent && hoveredTile.explored) {
      this.relevantTile = hoveredTile;
    } else {
      this.relevantTile = playerTile;
    }
  }



  // getClass(tile) {
  //   let styleClass = 'tile';

  //   if (!tile.explored) {
  //     return 'unexplored-tile'
  //   }

  //   switch (tile.contents) {
  //     case 'player':
  //       styleClass = 'player-tile'
  //       break;
  //     case 'wall':
  //       styleClass = 'wall-tile'
  //       break;
  //     default:
  //       break;
  //   }

  //   return styleClass;

  // }

  onClick(clickedTile) {

    if (clickedTile.explored && clickedTile.walkable) {
      let updateInfoPanel = this.gridMatrix.clickedTile(clickedTile, this.character);
      this.relevantTile = clickedTile;
    }
  }




  magnifyLevel(tile) {
    if (tile.playerOrEnemy()) {
      if (tile.contents.level == 10) {
        tile.contents.levelNumberWidth = 24;
        tile.contents.levelNumberHeight = 20;
      } else {
        tile.contents.levelNumberWidth = 12;
        tile.contents.levelNumberHeight = 20;
      }
    }
    if (tile.playerAndContent) {
      if (this.character.level == 10) {
        this.character.levelNumberWidth = 24;
        this.character.levelNumberHeight = 20;
      } else {
        this.character.levelNumberWidth = 12;
        this.character.levelNumberHeight = 20;
      }
    }
  }

  shrinkLevel(tile) {
    if (tile.playerOrEnemy()) {
      if (tile.contents.level == 10) {
        tile.contents.levelNumberWidth = 12;
        tile.contents.levelNumberHeight = 10;
      } else {
        tile.contents.levelNumberWidth = 6;
        tile.contents.levelNumberHeight = 10;
      }
    }
    if (tile.playerAndContent) {
      if (this.character.level == 10) {
        this.character.levelNumberWidth = 12;
        this.character.levelNumberHeight = 10;
      } else {
        this.character.levelNumberWidth = 6;
        this.character.levelNumberHeight = 10;
      }
    }
  }





}
