export default class Item {
  cost;
  date;
  title;
  notes;
  category;
  p1Cost;
  p2Cost;
  amazonOrderID;
  constructor(cost: number, date: Date, title: string, notes:string | null, category: string | null, p1Cost: number | null, p2Cost: number | null, amazonOrderID: string = ""){
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
