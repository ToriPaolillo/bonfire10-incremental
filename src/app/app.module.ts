import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { AppComponent } from './app.component';
import { Bonfire10Component } from './bonfire10/bonfire10.component';
import { DungeonComponent } from './dungeon/dungeon.component';
import { InfoPanelComponent } from './dungeon/infoPanel/infoPanel.component';
import { BasicInfoComponent } from './dungeon/infoPanel/basicInfo/basicInfo.component';
import { SpellInfoComponent } from './dungeon/infoPanel/spellInfo/spellInfo.component';
import { EnemyInfoComponent } from './dungeon/infoPanel/enemyInfo/enemyInfo.component';
import { GridMatrix } from './models/gridMatrix';
import { Tile } from './models/tile';
import { Enemy } from './models/enemy';
import { Spell } from './models/spell';
import { Shop } from './models/shop';
import { Altar } from './models/altar';
import { BasicItem } from './models/basicItem';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Character } from './models/character';



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressBarModule,
    DragDropModule,


  ],
  exports: [
    MatButtonModule,
    MatProgressBarModule,
    DragDropModule,

  ],  
  providers: [
    GridMatrix,
    Tile,
    Character,
    Enemy,
    Spell,
    Shop,
    Altar,
    BasicItem
  ],
  declarations: [
    AppComponent,
    Bonfire10Component,
    DungeonComponent,
    InfoPanelComponent,
    BasicInfoComponent,
    SpellInfoComponent,
    EnemyInfoComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
