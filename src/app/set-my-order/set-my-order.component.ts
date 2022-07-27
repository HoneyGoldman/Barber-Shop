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
  formGroup = new UntypedFormGroup({});
  myControl = new FormControl('');
  barbers: Admin[] = []
  barbersNames: string[] = []
  filteredOptions: Observable<string[]> | undefined;
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
    })

    this.formBuilder.group({
      'barberName': this.formBuilder.control('', Validators.required)
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  Submit() {
    console.log(JSON.stringify(this.myControl.value))
  }


  private _filter(value: string): string[] {
    // console.log("filter " + value)
    const filterValue = value.toLowerCase();
    return this.barbersNames.filter(name => name.toLowerCase().includes(filterValue));
  }
}
