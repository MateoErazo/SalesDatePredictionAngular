export interface OrderCreationFormDTO {
    custid: number,
    empid: number,
    shipperid: number,
    shipname: string,
    shipaddress: string,
    shipcity: string,
    shipcountry: string,
    orderdate: Date,
    requireddate: Date,
    shippeddate: Date,
    freight: number,
    productid: number,
    unitprice: number, 
    qty: number, 
    discount: number
}