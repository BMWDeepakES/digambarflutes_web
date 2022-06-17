import { Component, OnInit, HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

declare var Razorpay:any;

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
   paymessage:string="not started";
   paymentId:string='';
   error:string='';
  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: [' < ', ' > '],
    rewind:true,
    items: 4,
    autoplay:false,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      900: {
        items: 4
      }
    },
    nav: true
  }

  options={
    "key": "rzp_live_glajDlWiYUEmz0",
    "amount": "1",
    "name": "Digambar Kamble",
    "description": "Digambar Flutes",
    "image": "./../../../../assets/logo.png",
    "order_id": "",
    "handler": function(response: any){
      var event=new CustomEvent("payment.success",
      {
        detail: response,
        bubbles: true,
        cancelable: true
      });window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  paynow(){
    this.paymentId = '';
          this.error = '';
            this.options.amount = "200"; //paise
            this.options.prefill.name = "Digambar Kamble";
            this.options.prefill.email = "digambarflutes@gmail.com";
            this.options.prefill.contact = "7875008983";
            var rzp1 = new Razorpay(this.options);
            rzp1.open();
            rzp1.on('payment.failed', function (response: any){
                // Todo - store this information in the server
                console.log(response.error.code);
                console.log(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                console.log(response.error.reason);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);
                //this.error = response.error.reason;
            }
        );
  }
  @HostListener('window:payment.success', ['$event'])
    onPaymentSuccess(event: any): void {
       this.paymessage = "Payment Success";
    }
}
