import { Customer } from "./Customer";

export class Day{
    id?:number;
    siteId?:string;
    customers?:Array<Customer>;
    startTime?:Array<number>;
    timePerCustomer?:Array<number>;
    date?:Array<number>;
}