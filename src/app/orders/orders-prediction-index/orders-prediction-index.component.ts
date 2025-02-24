import { Component, AfterViewInit, ViewChild, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { OrdersFilterComponent } from "../orders-filter/orders-filter.component";
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NewOrderFormComponent } from '../new-order-form/new-order-form.component';
import { OrdersService } from '../services/orders.service';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';
import { HttpResponse } from '@angular/common/http';
import { OrderPredictionFilterDTO } from '../DTO/OrderPredictionFilterDTO';


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
  displayedColumns: string[] = ['customerName','lastOrderDate','nextPredictedOrder','viewOrders', 'newOrder'];
  dataSource = new MatTableDataSource<CustomerOrderPredictionDTO>();
  totalRecordsAmount!: number
  ordersFilter: OrderPredictionFilterDTO = {
    page:1, 
    pageSize:5, 
    customerName:''
  }

  constructor (){
    this.loadOrdersData()
  }

  @ViewChild(MatSort) sort!: MatSort;

  updatePagination(data: PageEvent){
    this.ordersFilter = {
      page: data.pageIndex + 1, 
      pageSize: data.pageSize, 
      customerName:this.ordersFilter.customerName
    }

    if(this.ordersFilter.customerName == ''){
      this.loadOrdersData()
    }else{
      this.getFilteredOrders()
    }
  }

  loadOrdersData () {
      this.ordersService.getOrderPredictionsPaginated(this.ordersFilter).subscribe((response: HttpResponse<CustomerOrderPredictionDTO[]>) => {
      this.dataSource.data = response.body as CustomerOrderPredictionDTO[]
      const header = response.headers.get("total-records-amount") as string;
      this.totalRecordsAmount = parseInt(header,10);
    })
  }

  getFilteredOrders() {
      this.ordersService.getOrderPredictionsFiltered(this.ordersFilter).subscribe((response: HttpResponse<CustomerOrderPredictionDTO[]>) => {
      this.dataSource.data = response.body as CustomerOrderPredictionDTO[]
      const header = response.headers.get("total-records-amount") as string;
      this.totalRecordsAmount = parseInt(header,10);
    })
  }

  showMessageStatus(message: string, action:string){
    this._snackBar.open(message, action,{
      duration: 4000,
      panelClass:['green-snackbar']
    });
  }
  
  ngAfterViewInit(): void {
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

  filterValueHandler(filterValue: string) {

    this.ordersFilter = {
      page:1,
      pageSize:this.ordersFilter.pageSize,
      customerName:filterValue
    }

    if(filterValue != ''){
      this.getFilteredOrders();
    }else{
      this.loadOrdersData();
    }
  }

  get currentPageIndex(): number{
    return this.ordersFilter.page - 1;
  }
}