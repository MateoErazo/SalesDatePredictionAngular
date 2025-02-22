import { HttpParams } from "@angular/common/http";

export function BuildQueryParams(obj: any): HttpParams{
    let queryParams = new HttpParams();

    for(let property in obj){
        if(obj.hasOwnProperty(property)){
            if(obj[property] != ''){
                queryParams = queryParams.append(property, obj[property])
            }
        }
    }

    return queryParams;
}