import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'http';
  num1: number = 0;
  num2: number = 0;
  sum: number | undefined;
  done: boolean = false;
// post
  user: User=new User("", 0); // данные вводимого пользователя
  receivedUser: User | undefined;

  users: User[] = [];
  //
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getData().subscribe((data:any) => {
      this.users = data;
    });
  }
// POST
  POSTsubmit(user: User) {
    this.httpService.postData(user)
      .subscribe(
        (data: any) => {this.receivedUser = data; this.done = true;},
        error => console.log(error)
      )
  }
   submit(){
    this.httpService.getSum(this.num1, this.num2).subscribe((data:any) => {
        this.sum=data.result; 
        this.done=true;
    });
  }
}
