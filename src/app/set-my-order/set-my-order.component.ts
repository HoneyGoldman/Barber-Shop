import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Admin } from 'src/Model/Admin';
import { DataServiceComponent } from '../data-service/data-service.component';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-set-my-order',
  templateUrl: './set-my-order.component.html',
  styleUrls: ['./set-my-order.component.css']
})
export class SetMyOrderComponent implements OnInit {
  isLoading: boolean = true;
  formGroup = new UntypedFormGroup({});
  myControl = new FormControl('', Validators.required);
  locationsSearch = new FormControl('', Validators.required);
  barbers: Admin[] = []
  barbersNames: string[] = []
  filteredOptions: Observable<string[]> | undefined;
  iKnowMyBarberFlag: boolean = false;
  searchByLocationFlag: boolean = true;
  allLocations: string[] = []
  selectedLocations: string[] = []
  searchResults:Admin[]=[]

  constructor(private formBuilder: UntypedFormBuilder, private data: DataServiceComponent) { }

  ngOnInit(): void {

    this.data.getAllBarbers().subscribe(barbers => {
      this.barbers = barbers;
      this.barbers.forEach(barber => {
        let barberFullName = barber.name + ' ' + barber.familyName;
        if (barberFullName !== undefined) {
          this.barbersNames.push(barberFullName);
        }
      })
      this.data.getAllLocations().subscribe(results => {
        results.forEach(location => {
          this.allLocations.push(location.location!);
        })
      })
      this.selectedLocations = this.allLocations;
      this.isLoading = false
    })

    this.formBuilder.group({
      'barberName': this.formBuilder.control('', Validators.required)
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  LocationSearch() {
    this.data.searchBarberByLocation(this.selectedLocations).subscribe(res => {
      console.log(res)
      this.searchResults=res;
    })
    console.log(JSON.stringify(this.locationsSearch.value))
  }

  SubmitByName() {
    console.log(JSON.stringify(this.locationsSearch.value))
    console.log(JSON.stringify(this.selectedLocations))

  }


  private _filter(value: string): string[] {
    // console.log("filter " + value)
    const filterValue = value.toLowerCase();
    return this.barbersNames.filter(name => name.toLowerCase().includes(filterValue));
  }


  iKnowMyBarber() {
    this.searchByLocationFlag = false;
    this.iKnowMyBarberFlag = true;
  }

  searchByLocation() {
    this.iKnowMyBarberFlag = false;
    this.searchByLocationFlag = true;
  }

  onKey(target: any) {
    this.selectedLocations = this.filter(target.value);
  }

  filter(value: string) {
    let filter = value;
    return this.allLocations.filter(option => option.includes(filter));
  }
}
