import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private apiUrl = 'https://api.graph.cool/simple/v1/cjmqqzqy73ogt0158sn0ue34o';

  constructor(private http: HttpClient){
    //this.createUser();
    this.allUsers();
  }

  allUsers(): void{
    const body = {
      query: `
        query{
          allUsers{
            id
            name
            email
          }
        }`
    };

    this.http.post(this.apiUrl, body)
      .subscribe(res => {
        console.log('Query: ', res);
      });
  }

  createUser(): void{
    const body = {
      query: `
        mutation CreateNewUser($name: String!, $email: String!, $password: String!){
            createUser(name: $name, email: $email, password: $password){
              id
              name
              email
            }
        }
      `,
      variables: {
        name: 'Black Pather',
        email: 'panther@avengers.com',
        password: '123'
      }
    };
    this.http.post(this.apiUrl, body).subscribe(res => console.log('Mutatios: ', res));
  }
}
