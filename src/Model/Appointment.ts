import { Customer } from "./Customer";

export class Appointment {

    id?: number;
    siteId?: string;
    date?: { day?: string, month?: string, year?: string };
    startTime?: string; //{ hour?: string, minutes?: string, seconds?: string }
    customer?: Customer
}