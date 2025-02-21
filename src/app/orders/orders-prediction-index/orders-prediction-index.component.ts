import { Component, AfterViewInit, ViewChild, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { OrdersFilterComponent } from "../orders-filter/orders-filter.component";
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NewOrderFormComponent } from '../new-order-form/new-order-form.component';
import { OrdersService } from '../services/orders.service';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';
import { HttpResponse } from '@angular/common/http';
import { PaginationDTO } from '../../shared/models/paginationDTO';


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
  pagination: PaginationDTO = {page:1, pageSize:5}
  displayedColumns: string[] = ['customerName','lastOrderDate','nextPredictedOrder','viewOrders', 'newOrder'];
  dataSource = new MatTableDataSource<CustomerOrderPredictionDTO>(this.orderPredictions);
  totalRecordsAmount!: number

  constructor (){
    this.loadOrdersData()
  }

  @ViewChild(MatSort) sort!: MatSort;

  updatePagination(data: PageEvent){
    this.pagination = {page: data.pageIndex + 1, pageSize: data.pageSize}
    this.loadOrdersData()
  }

  loadOrdersData () {
    const orders = this.ordersService.getOrderPredictionsPaginated(this.pagination).subscribe((response: HttpResponse<CustomerOrderPredictionDTO[]>) => {
      this.orderPredictions = response.body as CustomerOrderPredictionDTO[]
      this.dataSource.data = response.body as CustomerOrderPredictionDTO[]
      const header = response.headers.get("total-records-amount") as string;
      this.totalRecordsAmount = parseInt(header,10);
      console.log('TotalRecorsAmount',this.totalRecordsAmount)
      console.log('Pagination',this.pagination)
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
}