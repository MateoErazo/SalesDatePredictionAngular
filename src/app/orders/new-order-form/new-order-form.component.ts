import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { firstCapitalLetter } from '../../shared/functions/validations';
import {MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerOrder } from '../orders-prediction-index/orders-prediction-index.component';

@Component({
  selector: 'app-new-order-form',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink, MatSelectModule, 
    MatDatepickerModule, MatIconModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './new-order-form.component.html',
  styleUrl: './new-order-form.component.css'
})
export class NewOrderFormComponent {

  readonly dialogRef = inject(MatDialogRef<NewOrderFormComponent>);
  readonly data = inject<CustomerOrder>(MAT_DIALOG_DATA)

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    Employee: ['', {validators:[Validators.required, firstCapitalLetter()]}],
    Shipper:['',{validators:[Validators.required]}],
    ShipName:['', {validators:[Validators.required]}],
    ShipAddress:['', {validators:[Validators.required]}],
    ShipCity:['',{validators:[Validators.required]}],
    ShipCountry: ['', {validators:[Validators.required]}],
    OrderDate: new FormControl<Date | null>(null, {
      validators:[Validators.required]
    }),
    RequiredDate: new FormControl< Date | null> (null, {
      validators: [Validators.required]
    }),
    ShippedDate: new FormControl <Date | null>(null, {
      validators: [Validators.required]
    }),
    Freight:['', {validators:[Validators.required]}],
    Product : ['', {validators: [Validators.required]}],
    UnitPrice : ['', {validators: [Validators.required]}],
    Quantity : ['', {validators: [Validators.required]}],
    Discount : ['', {validators: [Validators.required]}],
  })

  onNoClick(): void{
    this.dialogRef.close()
  }

  getErrorEmployeeField (): string {
    let employee = this.form.controls.Employee

    if(employee.hasError('required')){
      return 'The field employee is required.'
    }

    if(employee.hasError('firstCapitalLetter')){
      return employee.getError('firstCapitalLetter').message;
    }

    return ''
  }

  getErrorShipperField ():string{
    let shipper = this.form.controls.Shipper
    
    if(shipper.hasError('required')){
      return 'The field shipper is required.'
    }

    return ''
  }

  getErrorShipNameField():string{
    let shipName = this.form.controls.ShipName

    if(shipName.hasError('required')){
      return 'The field ship name is required.'
    }
    return ''

  }

  getErrorShipAddressField(): string{
    let shipAddress = this.form.controls.ShipAddress

    if(shipAddress.hasError('required')){
      return 'The field ship address is required.'
    }
    return ''

  }

  getErrorShipCityField(): string{
    let shipCity = this.form.controls.ShipCity

    if(shipCity.hasError('required')){
      return 'The field ship city is required.'
    }
    return ''

  }

  getErrorShipCountryField ():string{
    let shipCountry = this.form.controls.ShipCountry

    if(shipCountry.hasError('required')){
      return 'The field ship country is required.'
    }
    return ''
  }

  getErrorOrderDateField():string{
    let orderDate = this.form.controls.OrderDate

    if(orderDate.hasError('required')){
      return 'The field order date is required.'
    }
    return ''
  }

  getErrorRequiredDateField():string{
    let requiredDate = this.form.controls.RequiredDate

    if(requiredDate.hasError('required')){
      return 'The field required date is required.'
    }
    return ''
  }

  getErrorShippedDateField():string{
    let shippedDate = this.form.controls.ShippedDate

    if(shippedDate.hasError('required')){
      return 'The field shipped date is required.'
    }
    return ''
  }

  getErrorFreightField():string {
    let freight = this.form.controls.Freight

    if(freight.hasError('required')){
      return 'The field freight is required.'
    }

    return ''
  }

  getErrorProductField () :string {
    let product = this.form.controls.Product

    if(product.hasError('required')){
      return 'The field product is required.'
    }
    return ''
  }

  getErrorUnitPriceField () :string {
    let unitPrice = this.form.controls.UnitPrice

    if(unitPrice.hasError('required')){
      return 'The field unit price is required.'
    }
    return ''
  }

  getErrorQuantityField () :string {
    let quantity = this.form.controls.Quantity

    if(quantity.hasError('required')){
      return 'The field quantity is required.'
    }
    return ''
  }

  getErrorDiscountField () :string {
    let discount = this.form.controls.Discount

    if(discount.hasError('required')){
      return 'The field discount is required.'
    }
    return ''
  }

  saveChanges(){
    console.log(this.form.value)
  }



}
