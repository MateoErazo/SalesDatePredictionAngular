import {TestBed} from '@angular/core/testing';
import { OrdersService } from './orders.service';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { OrderFilterDTO } from '../DTO/OrderFilterDTO';
import { OrderDTO } from '../DTO/OrderDTO';

describe('OrdersService', () => {
    let service: OrdersService;

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers:[OrdersService, provideHttpClient()]
        });

        service = TestBed.inject(OrdersService)
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('getOrdersByOrderFilter should return 5 records', (done: DoneFn) => {
        let orderFilter: OrderFilterDTO = {
            customerId: 85,
            page: 1,
            pageSize: 5
        }

        service.getOrdersByOrderFilter(orderFilter).subscribe({
            next: (result: HttpResponse<OrderDTO[]>) => {
                expect(result.body?.length).toBe(5);
                done();
            },
            error: (err) => {
                done.fail(err);
            }
        })
    })
});