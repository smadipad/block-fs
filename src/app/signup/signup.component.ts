import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public  signupForm !: FormGroup;
  constructor(private formBuilder :FormBuilder, private http :HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        staffs_id: parseInt((Math.random()*10000).toString()),
        first_name:[''],
        last_name:[''],
        phone:[''],
        email:[''],
        username:[''],
        password:['']

        
      }
    )
  }
  
  signup(){
    console.log(this.signupForm.value);
    this.http.post<any>("http://localhost:8085/user/add",this.signupForm.value)
    .subscribe(res=>{
      alert("signup Successfull");
      this.signupForm.reset();
      this .router.navigate(['login']);
    },err=>{
      alert("something went wrong")
    }
    )

  }

}
