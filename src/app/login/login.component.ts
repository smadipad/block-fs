import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm!: FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  
  login(){
    console.log(this.loginForm.value.email)
    let uname= this.loginForm.value.email
    let pass= this.loginForm.value.password
    let user= uname.split('@')
    const httpOptions={
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'GET'
        }
      )
    } ;
    this.http.get<any>(`http://localhost:8085/login/${uname}`).subscribe(res => {
        console.log(res);
        
        if (res.email === uname && res.password === this.loginForm.value.password)
              {
                alert("Login Success");
                this.loginForm.reset();
                this.router.navigate(['/home']) 

              }
              else{
        alert("user not found");

    }

    });
  
    
  }
}
