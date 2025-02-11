import { OrderCreationDTO } from "./OrderCreationDTO";

export interface OrderWithProductCreationDTO {
    order: OrderCreationDTO,
    productid: number,
    unitprice: number, 
    qty: number, 
    discount: number
}