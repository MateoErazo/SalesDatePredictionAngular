import { Component, AfterViewInit, ViewChild, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { OrdersFilterComponent } from "../orders-filter/orders-filter.component";
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  private _snackBar = inject(MatSnackBar);
  orderPredictions!: CustomerOrderPredictionDTO[]

  constructor (){
    this.loadOrdersData()
  }

  displayedColumns: string[] = ['customerName','lastOrderDate','nextPredictedOrder','viewOrders', 'newOrder'];
  dataSource = new MatTableDataSource<CustomerOrderPredictionDTO>(this.orderPredictions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadOrdersData () {
    const orders = this.ordersService.getAllCustomerOrderPredictions().subscribe(orders => {
      this.orderPredictions = orders
      this.dataSource.data = orders
    })
  }

  showMessageStatus(message: string, action:string){
    this._snackBar.open(message, action,{
      duration: 4000,
      panelClass:['green-snackbar']
    });
  }
  
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

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.showMessageStatus(result,"Ok")
      }
    });
  }
}