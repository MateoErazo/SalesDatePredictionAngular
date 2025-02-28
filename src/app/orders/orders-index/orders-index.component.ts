import { Component, inject, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSortModule, MatSort} from '@angular/material/sort';
import { OrderDTO } from '../DTO/OrderDTO';
import { OrdersService } from '../services/orders.service';
import { OrderFilterDTO } from '../DTO/OrderFilterDTO';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders-index',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './orders-index.component.html',
  styleUrl: './orders-index.component.css'
})

export class OrdersIndexComponent implements OnInit {
  
  displayedColumns: string[] = ['orderid','requireddate','shippeddate','shipname','shipaddress','shipcity']
  dataSource = new MatTableDataSource<OrderDTO>()
  totalRecordsAmount!: number
  pagesAmount!: number
  orderFilter: OrderFilterDTO = {
    customerId: 85,
    page: 1,
    pageSize: 5
  }
  private ordersService = inject(OrdersService)

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.ordersService.getOrdersByOrderFilter(this.orderFilter).subscribe((response: HttpResponse<OrderDTO[]>) => {
      this.dataSource.data = response.body as OrderDTO[]
      const recordsHeader = response.headers.get("total-records-amount") as string;
      this.totalRecordsAmount = parseInt(recordsHeader, 10);
    })
  }

}
