import { Component, AfterViewInit, ViewChild, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { OrdersFilterComponent } from "../orders-filter/orders-filter.component";
import {MatDialog} from '@angular/material/dialog';
import { NewOrderFormComponent } from '../new-order-form/new-order-form.component';
import { OrdersService } from '../services/orders.service';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';


@Component({
  selector: 'app-orders-prediction-index',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule, OrdersFilterComponent],
  templateUrl: './orders-prediction-index.component.html',
  styleUrl: './orders-prediction-index.component.css'
})
export class OrdersPredictionIndexComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog)
  readonly ordersService = inject(OrdersService)
  orderPredictions!: CustomerOrderPredictionDTO[]

  constructor (){
    const orders = this.ordersService.getAllCustomerOrderPredictions().subscribe(orders => {
      this.orderPredictions = orders
      this.dataSource.data = orders
    })
  }

  displayedColumns: string[] = ['customerName','lastOrderDate','nextPredictedOrder','viewOrders', 'newOrder'];
  dataSource = new MatTableDataSource<CustomerOrderPredictionDTO>(this.orderPredictions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewOrderHandler(order : CustomerOrderPredictionDTO){
    console.log('customer order:', order)
  }

  newOrderOpenDialog(customerOrder: CustomerOrderPredictionDTO):void{
    const dialogRef = this.dialog.open(NewOrderFormComponent, {
      data: customerOrder,
      width: '90%'
    })

  }
}