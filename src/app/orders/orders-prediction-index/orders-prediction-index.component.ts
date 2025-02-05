import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-orders-prediction-index',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule],
  templateUrl: './orders-prediction-index.component.html',
  styleUrl: './orders-prediction-index.component.css'
})
export class OrdersPredictionIndexComponent implements AfterViewInit {
  displayedColumns: string[] = ['customerName','lastOrderDate','nextPredictedOrder','viewOrders', 'newOrder'];
  dataSource = new MatTableDataSource<CustomerOrder>(CUSTOMER_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewOrderHandler(order : CustomerOrder){
    console.log('customer order:', order)
  }

  newOrderHandler(order: CustomerOrder){
    console.log('new order:', order)
  }
}

export interface CustomerOrder{
  customerName : string,
  lastOrderDate : string,
  nextPredictedOrder: string
}
const CUSTOMER_DATA: CustomerOrder[] = [
  {customerName: 'Customer A', lastOrderDate: '2025-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer B', lastOrderDate: '2024-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer C', lastOrderDate: '2023-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer D', lastOrderDate: '2022-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer E', lastOrderDate: '2021-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer F', lastOrderDate: '2020-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer G', lastOrderDate: '2019-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer H', lastOrderDate: '2018-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer I', lastOrderDate: '2017-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer J', lastOrderDate: '2016-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer K', lastOrderDate: '2015-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer L', lastOrderDate: '2014-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer M', lastOrderDate: '2013-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer N', lastOrderDate: '2012-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer O', lastOrderDate: '2011-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer P', lastOrderDate: '2010-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer Q', lastOrderDate: '2009-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer R', lastOrderDate: '2008-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer S', lastOrderDate: '2007-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer T', lastOrderDate: '2006-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer U', lastOrderDate: '2005-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer V', lastOrderDate: '2004-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer W', lastOrderDate: '2003-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer X', lastOrderDate: '2002-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer Y', lastOrderDate: '2001-01-01', nextPredictedOrder: '2025-01-10'},
  {customerName: 'Customer Z', lastOrderDate: '2000-01-01', nextPredictedOrder: '2025-01-10'}
]