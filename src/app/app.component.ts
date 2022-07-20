import { Component, HostListener, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

declare var Razorpay: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dialog: MatDialog) {}

  message:any = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'CoinPe';
  options = {
    "key": "",
    "amount": "200",
    "name": "Megha Naik",
    "description": "Web Development",
    "image": "./assets/images/CoinPe.jpg",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
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

  payNow() {
    this.paymentId = '';
    this.error = '';
    this.options.amount = "200"; //paise
    this.options.prefill.name = "Abhishek";
    this.options.prefill.email = "abhishek.naryana.0912@gmail.com";
    this.options.prefill.contact = "9632129026";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
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

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {});
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
    console.log("Success Payment");
    this.openDialog();
  }

}

export interface DialogData {
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

