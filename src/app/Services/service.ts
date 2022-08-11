import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, Product, Order } from '../Modals/Orders'; 


@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
    orderUrl = 'https://localhost:7074/api/Order';
    customerUrl = 'https://localhost:7074/api/Customer';
    productUrl = 'https://localhost:7074/api/Product';
  
    constructor(private http:HttpClient) { }

    //get orders
    getAllOrders():Observable<any[]>{
        return this.http.get<any>(this.orderUrl+"/get-all");
    }

    //add orders
    addOrder(custID:string, prodID:string, orderDate:string, quantity:number, shipDate:string, shipMode:string){
        console.log(shipDate)
        
        
        
        const params = new HttpParams()
        .append('CustID',custID)
        .append('ProdID',prodID)
        .append('OrderDate',orderDate)
        .append('Quantity',quantity)
        .append('ShipDate',shipDate)
        .append('ShipMode',shipMode)
        
        return this.http.post(this.orderUrl+'/add/', {}, {params:params});
    }
    
    deleteOrder(val:any){
        return this.http.delete(this.orderUrl+'/delete/'+val);
    }

    //update orders
    updateCard(orderID:number, custID:string, prodID:string, orderDate:string, quantity:number, shipDate:string, shipMode:string) {
        
        
        const params = new HttpParams()
        .append('OrderID', orderID)
        .append('CustID',custID)
        .append('ProdID',prodID)
        .append('OrderDate',orderDate)
        .append('Quantity',quantity)
        .append('ShipDate',shipDate)
        .append('ShipMode',shipMode)                           
        return this.http.put<Order>(this.orderUrl+'/update/' , {}, {params:params} );
    }

    //get products
    getAllProducts():Observable<any[]>{
        return this.http.get<any>(this.productUrl+"/get-all");
    }

    //get customers
    getAllCustomers():Observable<any[]>{
        return this.http.get<any>(this.customerUrl+"/get-all");
    }
  }