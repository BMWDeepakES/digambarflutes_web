import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})

export class ShopServiceService {
  baseUrl = environment.baseUrl;

  public Currency = { name: 'Dollar', currency: 'USD', price: 1 } // Default Currency
  constructor(private http: HttpClient) { }

  getProductsOnSubCategory(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `Products/subCategoryId?subCategoryId=${id}`);
  }
  getProductsDeatil(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `Products/Id/?id=${id}`);
  }
  addToCartProduct(obj:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Cart', obj);
  }
  getCartProduct(userId:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `Cart/GetCartForUser?customerId=${userId}`);
  }
  deleteCartProduct(id:any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `Cart?id=${id}`);
  }
  deleteAllCartProduct(userID:any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `Cart/RemoveAllProductsFromCart?customerId=${userID}`);
  }
  updateCart(obj:any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'Cart', obj);
  }
  checkOut(obj:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'transaction/finalPayment', obj)
  }

  getVaeientStock(id:any, obj:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `Products/variant?id=${id}`, obj);
  }

  /* Get  Filters*/
  getAllFilter(subId:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `tags/subCategory?subCategoryId=${subId}`)
  }

  getProductOnFilter(obj:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'filter', obj)
  }

  /* New Product */

  getNewProduct(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Products/newProducts')
  }
  /* Home Screen Banner */
  getHomeScreenBanner(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'home/list');
  }

  /* Order List & return Order */
  getOrderListUsingId(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `order/product/customerId?customerId=${id}`);
  }

  /* Add Review */
  addReview(obj:any): Observable<any> {
    return this.http.post(this.baseUrl + 'review', obj)
  }
  getAllReview(id:any): Observable<any> {
    return this.http.get(this.baseUrl + `reviews/productId?productId=${id}`)
  }



  /* Return Product */
  returnProduct(obj:any): Observable<any> {
    return this.http.put(this.baseUrl + 'BaughtProducts/return', obj)
  }

  initiatePayment(amount:any): Observable<any> {
    return this.http.post(this.baseUrl + `transaction/initiatePayment?amount=${amount}&currency=INR`, {})
  }

}