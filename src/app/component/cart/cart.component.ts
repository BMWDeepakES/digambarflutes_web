import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopServiceService } from '../../services/shop-service.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  user: any | null;
  total: number = 0;
  constructor(private route: ActivatedRoute,
    private toastr: ToastrService, private productService: ProductService,
    private router: Router, private ShopService: ShopServiceService,) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}'); 
    this.getCardProduct();
  }


  //Increament
  increment(product: any, qty = 1) {
    debugger;
    if (product.cart.quantity + 1 <= product.product.stock) {

      console.log(product)
      let count = product.cart.quantity + 1

      let obj = {
        id: product.cart.id,
        quantity: count,
      }
      this.ShopService.updateCart(obj).subscribe((res: any) => {
        this.getCardProduct();
      });
    } else {
      this.toastr.warning("Stock is not available")
    }
  }


  // Decrement
  decrement(product: any, qty = -1) {

    let count = parseInt(product.cart.quantity) - 1;
    if (count > 0) {
      let obj = {
        id: product.cart.id,
        quantity: count,
      }
      this.ShopService.updateCart(obj).subscribe((res: any) => {
        this.getCardProduct();
      });
    }

  }

  public removeItem(productID: any) {
    this.ShopService.deleteCartProduct(productID).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        this.getCardProduct();
      } else {

        this.getCardProduct();
      }
    })
  }

  getCardProduct() {
    this.total = 0;
    this.products = [
      {
        id: 1,
        name: 'card One',
        img: 'image1.png',
        price: 500,
        quantity: 2,
        total: 1000
      },
      {
        id: 2,
        name: 'Card Two',
        img: 'image2.png',
        price: 500,
        quantity: 1,
        total: 500
      },
      {
        id: 3,
        name: 'Card Three',
        img: 'image3.png',
        price: 400,
        quantity: 3,
        total: 1200
      },
      {
        id: 4,
        name: 'Card Four',
        img: 'image4.png',
        price: 350,
        quantity: 4,
        total: 1400
      },
      {
        id: 5,
        name: 'Card Five',
        img: 'image5.png',
        price: 550,
        quantity: 1,
        total: 550
      },
      
    ]
    0
    this.products.map((product: any) => {
      this.total = this.total + product.total 
    })
  }

}
