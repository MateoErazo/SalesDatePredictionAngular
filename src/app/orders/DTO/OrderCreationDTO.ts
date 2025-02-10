export interface OrderCreationDTO {
    customerId: number,
    employee: string,
    shipper: string,
    shipName: string,
    shipAddress: string,
    shipCity: string,
    shipCountry: string,
    orderDate: Date,
    requiredDate: Date,
    shippedDate: Date,
    freight: number,
    product: string,
    unitPrice: number,
    quantity: number,
    discount: number
}