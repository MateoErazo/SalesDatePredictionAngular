import { Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrdersService } from '../services/orders.service';
import { OrderCreationDTO } from '../DTO/OrderCreationDTO';
import { EmployeesService } from '../../employees/services/employees.service';
import { EmployeeDTO } from '../../employees/DTO/EmployeeDTO';
import { ShippersService } from '../../shippers/services/shippers.service';
import { ShipperDTO } from '../../shippers/DTO/ShipperDTO';
import { ProductsService } from '../../products/services/products.service';
import { ProductDTO } from '../../products/DTO/ProductDTO';
import { OrderWithProductCreationDTO } from '../DTO/OrderWithProductCreationDTO';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';
import moment from 'moment';
import { OrderCreationFormDTO } from '../DTO/OrderCreationFormDTO';
import { getErrors } from '../../shared/functions/getErrors';

@Component({
  selector: 'app-new-order-form',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, 
    MatDatepickerModule, MatIconModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './new-order-form.component.html',
  styleUrl: './new-order-form.component.css'
})
export class NewOrderFormComponent implements OnInit{
  errors:string[] = [];
  private productsService = inject(ProductsService)
  private shippersService = inject(ShippersService)
  private employeesService = inject(EmployeesService);
  private ordersService = inject(OrdersService);
  readonly dialogRef = inject(MatDialogRef<NewOrderFormComponent>);
  readonly data = inject<CustomerOrderPredictionDTO>(MAT_DIALOG_DATA);

  employeesData!: EmployeeDTO[];
  shippersData!: ShipperDTO[];
  productsData!: ProductDTO[];

  ngOnInit(): void {
    this.loadEmployeesData();
    this.loadShippersData();
    this.loadProductsData();
  }

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    empid: [0, {validators:[Validators.required]}],
    shipperid:[0,{validators:[Validators.required]}],
    shipname:['', {validators:[Validators.required]}],
    shipaddress:['', {validators:[Validators.required]}],
    shipcity:['',{validators:[Validators.required]}],
    shipcountry: ['', {validators:[Validators.required]}],
    orderdate: new FormControl<Date | null>(null, {
      validators:[Validators.required]
    }),
    requireddate: new FormControl< Date | null> (null, {
      validators: [Validators.required]
    }),
    shippeddate: new FormControl <Date | null>(null, {
      validators: [Validators.required]
    }),
    freight:[0, {validators:[Validators.required]}],
    productid : [0, {validators: [Validators.required]}],
    unitprice : [0, {validators: [Validators.required]}],
    qty : [0, {validators: [Validators.required]}],
    discount : [0, {validators: [Validators.required]}],
  })

  onNoClick(): void{
    this.dialogRef.close()
  }

  saveChanges(){
    let formData: OrderCreationFormDTO = this.form.value as OrderCreationFormDTO;

    let order: OrderWithProductCreationDTO = this.buildOrderWithProductCreationDTO(formData)

    this.ordersService.addNewOrder(order).subscribe({
      next: ()=>{
        this.dialogRef.close("The order was created successfully."); 
      },
      error: err =>{
        const errors = getErrors(err)
        this.errors = errors
        console.log(this.errors)
        this.dialogRef.close("The order wasn't created. Please try again."); 
      }
    });
  }

  buildOrderWithProductCreationDTO(formData: OrderCreationFormDTO): OrderWithProductCreationDTO{
    
    const orderCreationDTO: OrderCreationDTO = {
      custid: this.data.customerId,
      empid: formData.empid,
      shipperid: formData.shipperid,
      shipname: formData.shipname,
      shipaddress: formData.shipaddress,
      shipcity: formData.shipcity,
      shipcountry: formData.shipcountry,
      orderdate: moment(formData.orderdate).toDate(),
      requireddate: moment(formData.requireddate).toDate(),
      shippeddate: moment(formData.shippeddate).toDate(),
      freight: formData.freight
    }

    const orderWithProductCreationDTO : OrderWithProductCreationDTO = {
      order: orderCreationDTO,
      productid: formData.productid,
      unitprice: formData.unitprice, 
      qty: formData.qty, 
      discount: formData.discount
    }

    return orderWithProductCreationDTO;
  }

  loadEmployeesData() {
    let employeesDataDb = this.employeesService.getAllEmployees().subscribe({
      next: employees =>{this.employeesData = employees},
      error: err =>{console.log(err)}
    });
  }

  loadShippersData(){
    this.shippersService.getAllShippers().subscribe({
      next: shippers => {this.shippersData = shippers},
      error: err => {console.log(err)}
    });
  }

  loadProductsData(){
    this.productsService.getAllProducts().subscribe({
      next: products => {this.productsData = products},
      error: err => {console.log(err)}
    });
  }

  getErrorEmployeeField (): string {
    let employee = this.form.controls.empid

    if(employee.hasError('required')){
      return 'The field employee is required.'
    }

    return ''
  }

  getErrorShipperField ():string{
    let shipper = this.form.controls.shipperid
    
    if(shipper.hasError('required')){
      return 'The field shipper is required.'
    }

    return ''
  }

  getErrorShipNameField():string{
    let shipName = this.form.controls.shipname

    if(shipName.hasError('required')){
      return 'The field ship name is required.'
    }
    return ''

  }

  getErrorShipAddressField(): string{
    let shipAddress = this.form.controls.shipaddress

    if(shipAddress.hasError('required')){
      return 'The field ship address is required.'
    }
    return ''

  }

  getErrorShipCityField(): string{
    let shipCity = this.form.controls.shipcity

    if(shipCity.hasError('required')){
      return 'The field ship city is required.'
    }
    return ''

  }

  getErrorShipCountryField ():string{
    let shipCountry = this.form.controls.shipcountry

    if(shipCountry.hasError('required')){
      return 'The field ship country is required.'
    }
    return ''
  }

  getErrorOrderDateField():string{
    let orderDate = this.form.controls.orderdate

    if(orderDate.hasError('required')){
      return 'The field order date is required.'
    }
    return ''
  }

  getErrorRequiredDateField():string{
    let requiredDate = this.form.controls.requireddate

    if(requiredDate.hasError('required')){
      return 'The field required date is required.'
    }
    return ''
  }

  getErrorShippedDateField():string{
    let shippedDate = this.form.controls.shippeddate

    if(shippedDate.hasError('required')){
      return 'The field shipped date is required.'
    }
    return ''
  }

  getErrorFreightField():string {
    let freight = this.form.controls.freight

    if(freight.hasError('required')){
      return 'The field freight is required.'
    }

    return ''
  }

  getErrorProductField () :string {
    let product = this.form.controls.productid

    if(product.hasError('required')){
      return 'The field product is required.'
    }
    return ''
  }

  getErrorUnitPriceField () :string {
    let unitPrice = this.form.controls.unitprice

    if(unitPrice.hasError('required')){
      return 'The field unit price is required.'
    }
    return ''
  }

  getErrorQuantityField () :string {
    let quantity = this.form.controls.qty

    if(quantity.hasError('required')){
      return 'The field quantity is required.'
    }
    return ''
  }

  getErrorDiscountField () :string {
    let discount = this.form.controls.discount

    if(discount.hasError('required')){
      return 'The field discount is required.'
    }
    return ''
  }
}
