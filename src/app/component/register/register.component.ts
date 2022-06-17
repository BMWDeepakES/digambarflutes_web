import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Common } from 'src/app/helper/validatation/commonValidatation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(Common.onlyAlphabetRegex)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(Common.onlyAlphabetRegex)]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(Common.phoneNumberRegex)]),
    address: new FormControl('', [Validators.required, Validators.pattern(Common.addressRegex)]),
    password: new FormControl('', [Validators.required, Validators.pattern(Common.passwordRegex)]),
    pincode: new FormControl('', [Validators.required, Validators.pattern(Common.pincodeRegex)]),
    city: new FormControl('', [Validators.required, Validators.pattern(Common.onlyAlphabetRegex)]),
    state: new FormControl('Maharashtra', [Validators.required, Validators.pattern(Common.onlyAlphabetRegex)]),
    country: new FormControl('India', [Validators.required, Validators.pattern(Common.onlyAlphabetRegex)]),

  });  fieldTextType:any
  isLoading: boolean = false;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,) {

  }

  ngOnInit(): void {
    localStorage.clear();
    
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let form = this.registerForm.value
      let obj = {
        address: form.address,
        city: form.city,
        country: form.country,
        emailId: form.email,
        lastName: form.lastName,
        mobileNumber: form.mobileNumber,
        name: form.firstName,
        os: 'web',
        password: form.password,
        pinCode: form.pincode,
        state: form.state
      }
      this.isLoading = true;
      this.accountService.registerUser(obj).subscribe(res => {
        this.isLoading = false;
        if (res.success) {
          this.toastr.success(res.message);
          this.router.navigate(['./account/login']);
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
