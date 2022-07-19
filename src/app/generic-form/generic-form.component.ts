import { PropertyRead } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenericFormProperties } from 'src/Model/GenericFormProperties';
import { __classPrivateFieldGet } from 'tslib';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css']
})
export class GenericFormComponent implements OnInit {
  @Input()
  properties!: GenericFormProperties;
  formGroup = new UntypedFormGroup({});
  fields: any = [];
  translatedFields: any = [];
  direction: string = '';
  LoadingDone = false;
  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.fields = Object.keys(this.properties.object);
    if (this.properties.ignorId) {
      this.fields = this.fields.filter((x: string) => x !== 'id')
    }

    this.fields.forEach((x: string) => this.translatedFields.push(this.getFieldTranslation(x)!))
    this.fields = this.translatedFields;
    // console.log(this.fields + " " + this.translatedFields)
    this.fields.forEach((field: string) => {
      // console.log(field)
      this.formGroup.addControl(field, this.formBuilder.control('', Validators.required));
    })
    this.direction = '{dir=' + this.properties.direction + '}';
    this.LoadingDone = true;
  }

  getInputType(key: string) {
    if(key==='password' || key==='סיסמה'){
    return 'password';
    }
    switch (typeof (this.properties.object[key])) {
      case 'string':
        return 'text';
      case 'number':
        return 'number';
      case 'boolean':
        return 'checkBox';

        break;

      default: return 'text';
        break;
    }
  }

  Submit() {
    console.log("data is "+JSON.stringify(this.formGroup.value))
    if(this.properties.submitAction!==undefined){
    this.properties.submitAction(this.formGroup.value);
    }
  }

  getFieldTranslation(propertyName: string) {
    if (this, this.properties.propertyTranslation !== undefined && this.properties.propertyTranslation.get(propertyName) != undefined) {
      return this.properties.propertyTranslation?.get(propertyName);
    }
    console.log('no translation for property ' + propertyName);
    return propertyName;
  }

  isNotValid():boolean{
    return this.formGroup.valid;
  }
}
