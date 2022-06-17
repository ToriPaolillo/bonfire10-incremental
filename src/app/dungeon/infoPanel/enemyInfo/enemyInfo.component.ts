import { Component, Injectable, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { MatButtonModule } from '@angular/material/button';
import { Tile } from 'src/app/models/tile';
import { Enemy } from 'src/app/models/enemy';


@Component({
  selector: 'enemyInfo',
  templateUrl: './enemyInfo.component.html',
  styleUrls: ['./enemyInfo.component.css']
})
export class EnemyInfoComponent {

  @Input() character: Character;
  @Input() relevantTile: Tile;

  enemy: Enemy;
  constructor() {

  }

  ngOnInit() {
    let that = this;
    if (this.relevantTile != null && this.relevantTile.contents != null && this.relevantTile.contents instanceof Enemy) {
      this.enemy = this.relevantTile.contents;
      this.enemy.setNextHit(this.character);
    }
  }


  ngOnChanges(changes) {
    if (this.relevantTile != null && this.relevantTile.contents != null && this.relevantTile.contents instanceof Enemy) {
      this.enemy = this.relevantTile.contents;
    }
  }

}
