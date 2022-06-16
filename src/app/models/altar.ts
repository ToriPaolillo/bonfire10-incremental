import { Injectable } from "@angular/core";

@Injectable()
export class Altar {
  name: string;
  description: string;
  cost: number;
  pngString: string;


  constructor(name?: string, description?: string, cost?: number) {
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.pngString = 'Altar';

  }

}