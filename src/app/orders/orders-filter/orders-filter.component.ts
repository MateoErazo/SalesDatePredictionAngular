import { Component, inject, Input, input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomerOrder } from '../orders-prediction-index/orders-prediction-index.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders-filter',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.css'
})
export class OrdersFilterComponent implements OnInit {
  ngOnInit(): void {
    this.customerOrders.filterPredicate = (data: CustomerOrder, filter: string) => {
      return data.customerName.toLowerCase().includes(filter)
    }

    this.form.controls.customerName.valueChanges.subscribe( (value) => {
      this.searchCustomerOrderByCustomerName(value || '')
    })
  }

  @Input({required:true})
  customerOrders!: MatTableDataSource<CustomerOrder>

  private formBuilder = inject(FormBuilder)
  form = this.formBuilder.group({
    customerName: ['']
  })

  searchCustomerOrderByCustomerName(customerName: string){
    this.customerOrders.filter = customerName.trim().toLowerCase()
  }

}
