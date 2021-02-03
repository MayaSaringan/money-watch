import React, {useState, createContext, useContext} from 'react';
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};
export class Item {
  cost;
  date;
  title;
  notes;
  category;
  p1Cost;
  p2Cost;
  constructor(cost: number, date: Date, title: string, notes:string, category: string, p1Cost: number, p2Cost: number){
    this.cost = cost;
    this.date = date;
    this.title = title;
    this.notes = notes;
    this.category = category;
    this.p1Cost = p1Cost;
    this.p2Cost = p2Cost;
  }
}
export class Category {
  cost;
  p1Cost;
  p2Cost;
  constructor(cost: number,p1Cost: number, p2Cost: number){
    this.cost = cost;
    this.p1Cost = p1Cost;
    this.p2Cost = p2Cost;
  }
}
export const serviceContext :any = createContext(null)
export default class Service {
  items:any = {};
  summaries: any = {}
  constructor(){


    //this.addItem(100, new Date(), "test","notes","Groceries", 50, 50);
  }
 
  addItemWithID(id:string, cost: number, date: Date, title: string, notes:string, category: string, p1Cost: number, p2Cost: number){
    
    this.items  = {...this.items, [id]: new Item(cost, date, title, notes, category, p1Cost, p2Cost)}
    console.log("addItem")

    this.categorizeItem(this.items[id])
    console.log(this.items)
  }

  addItem(cost: number, date: Date, title: string, notes:string, category: string, p1Cost: number, p2Cost: number){
    let newID = ID();
    this.items  = {...this.items, [newID]: new Item(cost, date, title, notes, category, p1Cost, p2Cost)}
    console.log("addItem")

    this.categorizeItem(this.items[newID])
    console.log(this.items)
  }

  categorizeItem(item: Item){
    this.summaries = {...this.summaries, [item.category]: new Category(item.cost, item.p1Cost, item.p2Cost) } 

  }
  getItems(): {}{
    return this.items
  }

}
