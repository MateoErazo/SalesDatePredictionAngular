export interface CustomerOrderPredictionDTO {
    CustomerId: number,
    CustomerName : string,
    LastOrderDate : Date,
    NextPredictedOrder: Date
}