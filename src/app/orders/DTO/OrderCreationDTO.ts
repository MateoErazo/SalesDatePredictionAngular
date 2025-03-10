export interface OrderCreationDTO {
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
    freight: number
}