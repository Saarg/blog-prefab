import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public token = null;
  public user = { username: '', password: '' };

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.user = this.userService.verifyToken(this.token) || this.user;
  }

  login() {
    this.userService.login(this.user).then(res => {
      if (typeof(Storage) === 'function') {
        localStorage.setItem('AuthToken', res.token);
        this.router.navigateByUrl('/admin');
      } else {
        console.log('no html5 localstorage support please use a recent browser');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  editUser() {
    this.userService.editUser(this.user).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.user = res.user;
      }
    });
  }
}
