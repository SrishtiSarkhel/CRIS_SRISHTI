import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  uname:string='';
  pwd:string='';
  msg:string='';
  username:string="aradhyaaa";

  constructor(private _router: Router, private formBuilder: FormBuilder, private http: HttpClient, private apiService: ApiService) 
  { console.log("constrcutor "); }

  ngonInit(){
    console.log("INITTTT ");
  }

  validateUser() {
    console.log("Validating User");
    console.log("userid "+this.uname+" password "+this.pwd);
  
    const credentials = {
      struserid: this.uname,
      struserpassword: this.pwd
    };
  
    // Replace 'YOUR_API_ENDPOINT' with the actual URL of your API for user authentication
   this.http.post('http://localhost:3000/login', credentials)     .pipe(
        catchError(error => {
          console.error('Validation failed:', error);
          console.log("credintion "+ credentials)
          this.msg = "Invalid username or password";
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          console.log("Validation Successful");
          console.log(response);
          
          const userRole = response[0].strroledescription;
          console.log(response[0].strroledescription);
          console.log("credintion userid: "+ credentials.struserid)
          console.log("credintion  password: "+ credentials.struserpassword)
          
    /*       inspect */
          this.apiService.updateSharedData(response);
 
          localStorage.setItem('receivedData', JSON.stringify(response));
     
          if (userRole === 'user') 
          {
            this._router.navigate(['dashboard']); 
          } 
          else if (userRole === 'admin')
           {
            this._router.navigate(['user-admin']); 
          } else {
            console.error('Unknown role:', userRole);
            this.msg = "Unknown user role";
          }
  
        //  localStorage.setItem('uname', this.uname);
        } else {
          console.error('Validation failed:', response);
          this.msg = "Invalid username or password";
        }
      });
          // Remove an item from local storage by its key
          localStorage.removeItem('receivedData');
          // Remove all items from local storage
         localStorage.clear();
     
  }
  
  
/*protected aFormGroup: FormGroup;
  

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  } */
}
