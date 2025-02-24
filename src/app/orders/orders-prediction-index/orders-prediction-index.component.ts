import { Component, AfterViewInit, ViewChild, inject, OnInit} from '@angular/core';
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
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-orders-prediction-index',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule, OrdersFilterComponent, DatePipe],
  templateUrl: './orders-prediction-index.component.html',
  styleUrl: './orders-prediction-index.component.css'
})
export class OrdersPredictionIndexComponent implements OnInit, AfterViewInit {

  private dialog = inject(MatDialog)
  private ordersService = inject(OrdersService)
  private locationService = inject(Location)
  private activatedRouteService = inject(ActivatedRoute)
  private _snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['customerName','lastOrderDate','nextPredictedOrder','viewOrders', 'newOrder'];
  dataSource = new MatTableDataSource<CustomerOrderPredictionDTO>();
  totalRecordsAmount!: number
  pagesAmount!:number
  orderFilters: OrderPredictionFilterDTO = {
    page:1, 
    pageSize:5, 
    customerName:''
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.readQueryStringsFromUrl()

    if(this.orderFilters.customerName == '' || this.orderFilters.customerName == undefined){
      this.loadOrdersData()
    }else{
      this.getFilteredOrders()
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  updatePagination(data: PageEvent){
    this.orderFilters = {
      page: data.pageIndex + 1, 
      pageSize: data.pageSize, 
      customerName:this.orderFilters.customerName
    }

    this.writeOrderFiltersInUrl(this.orderFilters)

    if(this.orderFilters.customerName == ''){
      this.loadOrdersData()
    }else{
      this.getFilteredOrders()
    }
  }

  loadOrdersData () {
      this.ordersService.getOrderPredictionsPaginated(this.orderFilters).subscribe((response: HttpResponse<CustomerOrderPredictionDTO[]>) => {
      this.dataSource.data = response.body as CustomerOrderPredictionDTO[]
      if(this.dataSource.data.length == 0){
        this.orderFilters = {
          page:1,
          pageSize:this.orderFilters.pageSize,
          customerName:''
        }
    
        this.writeOrderFiltersInUrl(this.orderFilters)
        this.loadOrdersData()
      }

      const recordsHeader = response.headers.get("total-records-amount") as string;
      this.totalRecordsAmount = parseInt(recordsHeader,10);
    })
  }

  getFilteredOrders() {
      this.ordersService.getOrderPredictionsFiltered(this.orderFilters).subscribe((response: HttpResponse<CustomerOrderPredictionDTO[]>) => {
      this.dataSource.data = response.body as CustomerOrderPredictionDTO[]

      if(this.dataSource.data.length == 0){
        this.orderFilters = {
          page:1,
          pageSize:this.orderFilters.pageSize,
          customerName:this.orderFilters.customerName
        }
    
        this.writeOrderFiltersInUrl(this.orderFilters)
        this.getFilteredOrders()
      }

      const recordsHeader = response.headers.get("total-records-amount") as string;
      this.totalRecordsAmount = parseInt(recordsHeader,10);
    })
  }

  showMessageStatus(message: string, action:string){
    this._snackBar.open(message, action,{
      duration: 4000,
      panelClass:['green-snackbar']
    });
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
    this.orderFilters = {
      page:1,
      pageSize:this.orderFilters.pageSize,
      customerName:filterValue
    }

    this.writeOrderFiltersInUrl(this.orderFilters)

    if(filterValue != ''){
      this.getFilteredOrders();
    }else{
      this.loadOrdersData();
    }
  }

  get currentPageIndex(): number{
    return this.orderFilters.page - 1;
  }

  writeOrderFiltersInUrl(filterValues: OrderPredictionFilterDTO){
    let queryStrings = []

    if(filterValues.customerName){
      queryStrings.push(`customerName=${encodeURIComponent(filterValues.customerName)}`);
    }

    if(filterValues.page !== 0){
      queryStrings.push(`page=${encodeURIComponent(filterValues.page)}`);
    }

    if(filterValues.pageSize !== 0){
      queryStrings.push(`pageSize=${encodeURIComponent(filterValues.pageSize)}`)
    }

    this.locationService.replaceState('', queryStrings.join('&'));
  }

  readQueryStringsFromUrl(){
    this.activatedRouteService.queryParams.subscribe( (params:any) => {
      var object : any = {}

      if(params.customerName){
        object.customerName = params.customerName
      }else{
        object.customerName = ''
      }

      if(params.page){
        object.page = params.page
      }else{
        object.page = this.orderFilters.page
      }

      if(params.pageSize){
        object.pageSize = params.pageSize
      }else{
        object.pageSize = this.orderFilters.pageSize
      }

      this.orderFilters = object as OrderPredictionFilterDTO;
    });
    
  }

  get customerName(): string{
    return this.orderFilters.customerName
  }
}