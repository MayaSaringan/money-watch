export class Item {
  cost;
  date;
  title;
  notes;
  category;
  p1Cost;
  p2Cost;
  amazonOrderID;
  constructor(cost: number, date: Date, title: string, notes:string, category: string, p1Cost: number, p2Cost: number, amazonOrderID: string = ""){
    this.cost = cost;
    this.date = date;
    this.title = title;
    this.notes = notes;
    this.category = category;
    this.p1Cost = p1Cost;
    this.p2Cost = p2Cost;
    this.amazonOrderID = amazonOrderID;
  }
}
