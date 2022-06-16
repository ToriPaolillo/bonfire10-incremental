import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'bonfire10',
  templateUrl: './bonfire10.component.html',
  styleUrls: ['./bonfire10.component.css']
})
export class Bonfire10Component {

  woodAmount = 0;
  woodIncrement = 1;
  constructor() { }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit() {
    let that = this;

    var mainGameLoop = window.setInterval(function () {
      that.woodAmount += that.woodIncrement;
      that.woodIncrement++;
    }, 1000)
  }

}
