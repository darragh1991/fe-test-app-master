import { switchMap } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CleanData } from 'src/app/shared/models/cleanData';
import { EMPTY, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'exads-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  @Input() cleanData: CleanData[];
  private uniqueUsernameObservable$: Subscription;
  private readonly SPECIAL_CHARACTER_PATTERN = /^[^{}"\[\].!]+$/;
  private mockError = {
    maxlength: false,
    required: false,
    notUnique: false
  };
  private newUserData: CleanData;
  private readonly usernameMaxlength: number = 20;
  private readonly usernameMinlength: number = 3;

  public createUserForm: FormGroup = new FormGroup({
    username: new FormControl('', ([Validators.required,
                                    Validators.maxLength(this.usernameMaxlength),
                                    Validators.minLength(this.usernameMinlength),
                                    Validators.pattern(this.SPECIAL_CHARACTER_PATTERN)])),
    firstName: new FormControl('', ([Validators.required, Validators.maxLength(20),])),
    lastName: new FormControl('', (Validators.maxLength(20))),
    email: new FormControl('', ([Validators.required, Validators.email]))
  });


  constructor(private _usersService: UsersService,
              private _router: Router
    ) { }

  ngOnInit() {
    this.uniqueUsernameObservable$ =
    this.createUserForm.controls.username.valueChanges.pipe((switchMap((input: string) => {
     this._usersService.getUsersByParams$({username: input}).subscribe((ret) => {
      const nonUnique: boolean = Object.keys(ret.data).length === 1;
      (nonUnique) ? this.createUserForm.get('username').setErrors({ notUnique: nonUnique }) :
          this.createUserForm.updateValueAndValidity()
      });
      return of(EMPTY);
    }))).subscribe();
    this.newUserData = new CleanData();
  }

  ngOnDestroy() {
    this.newUserData = new CleanData();
    this.uniqueUsernameObservable$.unsubscribe();
  }

  naviagteToUserSummary() {
    this._router.navigate(['users']);
  }

  checkForm() {
    console.log(this.createUserForm.get('username').errors)
  }

  sendForm() {
    if (this.createUserForm.valid) {
      this.newUserData.email = this.createUserForm.get('email').value;
      this.newUserData.username = this.createUserForm.get('username').value;
      this.newUserData.last_name = this.createUserForm.get('lastName').value ? this.createUserForm.get('lastName').value : null;
      this.newUserData.first_name = this.createUserForm.get('firstName').value;
      this.newUserData.created_date = new Date().toISOString();
      this._usersService.createUser(this.newUserData);
      this.naviagteToUserSummary();
    }
  }

  hasError(property: string): boolean {
    return this.createUserForm.controls[property].invalid &&
      (this.createUserForm.controls[property].dirty || this.createUserForm.controls[property].touched);
  }

  getUsernameErrorMessage(): string {
    let errorMessage: string = '';
    const errors = this.createUserForm.get('username').errors || this.mockError;
    if (errors.maxlength) {
      errorMessage = 'Max length exceeded';
    } else if (errors.minlength) {
      errorMessage = 'Min length required';
    } else if (errors.required) {
      errorMessage = 'Form field required to proceed';
    } else if (errors.notUnique) {
      errorMessage = `The username already exists. It can't be repeated`;
    } else if (errors.pattern) {
      errorMessage = 'pattern invalid';
    }
    return errorMessage;
  }

  getFirstNameErrorMessage(): string {
    let errorMessage: string = '';
    const errors = this.createUserForm.get('firstName').errors || this.mockError;
    if (errors.maxlength) {
      errorMessage = 'Max length exceeded';
    } else if (errors.required) {
      errorMessage = 'Form field required to proceed';
    }
    return errorMessage;
  }

  getEmailErrorMessage(): string {
    let errorMessage: string = '';
    const errors = this.createUserForm.get('email').errors || this.mockError;
    if (errors.required) {
      errorMessage = 'Form field required to proceed';
    } else if (errors.email) {
      errorMessage = 'Email pattern invalid';
    }
    return errorMessage;
  }
}
