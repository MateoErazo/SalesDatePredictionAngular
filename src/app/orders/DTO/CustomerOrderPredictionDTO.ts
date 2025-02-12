export interface CustomerOrderPredictionDTO {
    customerId: number,
    customerName : string,
    lastOrderDate : Date,
    nextPredictedOrder: Date
}