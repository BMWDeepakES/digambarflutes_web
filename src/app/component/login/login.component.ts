import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });  
  isLoading: boolean = false;
  fieldTextType: boolean = false;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    
  }

  async onSubmit() {
    let formData = new FormData;
    formData.append("password", this.loginForm.value.password);
    formData.append("os", "web");
    formData.append("deviceId", "89ABCDEF-01234567-89ABCDEF");
    var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var mobile_pattern = /^[0-9]/;

    if (email_pattern.test(this.loginForm.value.username)) {
      formData.append("emailId", this.loginForm.value.username);
      this.accountService.authLoginUsingEmail(formData).subscribe(res => {
        if (res.data != null) {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          this.router.navigate(['./home'])
        } else {
          this.toastr.error(res.message);
        }
      })
    } else if (mobile_pattern.test(this.loginForm.value.username)) {
      formData.append("mobileNumber", this.loginForm.value.username);
      this.accountService.authLoginUsingMobile(formData).subscribe(res => {
        if (res.data != null) {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          this.router.navigate(['./home']);
        } else {
          this.toastr.error(res.message);

        }
      })
    } else {

      this.toastr.warning('Enter Valid Credentials')
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  fbSignIn() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      console.log("res", res)
    });
  }
  gmailSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      console.log("google", res);

      //       authToken: "ya29.a0AfH6SMBKPjtMKSh6raRL0SUeQEH5mQm4xFfoQWB-0MwhTsHeZyNxfGtWGNjhOFDsOCJgsNrgKP7WbIHru6F4JgPb6vXIipd8mT5WN6gugT1eGxVzd6qmEMqmVPM2_61zSNvqN0UDd_J5mxF0sD-wpsj7G_da2fImgRKyrEUnu7M"
      // email: "sap.4115@gmail.com"
      // firstName: "sagar"
      // id: "116114872955752925514"
      // idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzYxNjg5MzQ2NTQyLXZtYTcxamxqZzc2ZWs3NjZmZXVjMmMwbm1vN2k0NnVmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzYxNjg5MzQ2NTQyLXZtYTcxamxqZzc2ZWs3NjZmZXVjMmMwbm1vN2k0NnVmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2MTE0ODcyOTU1NzUyOTI1NTE0IiwiZW1haWwiOiJzYXAuNDExNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InJtNFNQdlFRdmNZSTczVXhYcWtSelEiLCJuYW1lIjoic2FnYXIgcGF0aWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2lHd0dDNUJfem5wcEdNUGdZb1lEN2JPQnhCV1pVODJRY3o0bkE0PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6InNhZ2FyIiwiZmFtaWx5X25hbWUiOiJwYXRpbCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjExNTczNzE4LCJleHAiOjE2MTE1NzczMTgsImp0aSI6ImM0OTFiMDYzMDg4MTczZjdiYmUxZmY4NWY1MWNkNmRkM2U3N2U3ODMifQ.ToDt2uizV7M7cAP8fUkIzpJV2TkBBw66X7dwem6wkYLt4lp7-QXgNrvBbfjBvjkiE5i3tIcTwNh-B9wkOwviXFFCX5u2hI7jXiE-591CkWkoYL6X8i7ARjvFU4i-tOiASvt3aKhhiK0IRIht7Qd6R5V62lqQzneICwNsKA0ZrzDvNUuboCP0Y81B_oUTJffT2t8wrGNc9xkAISbcij-sM9LifjflH6rCIFmXY4OkFdSum-KSWI7xlvQTs7g4OqnjsnA35MOvIw8ulNV7sWJU0RA6d56TDLy-f2psQi5l-Ah8gmv8MwBjyQjEsi4UiCr3Pnb7JeWiw2qASsTu6C5FGw"
      // lastName: "patil"
      // name: "sagar patil"
      // photoUrl: "https://lh3.googleusercontent.com/a-/AOh14GiGwGC5B_znppGMPgYoYD7bOBxBWZU82Qcz4nA4=s96-c"
      // provider: "GOOGLE"
    })
  }

}
