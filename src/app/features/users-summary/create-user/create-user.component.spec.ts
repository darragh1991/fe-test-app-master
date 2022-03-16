import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  class RouterMock {
    navigate() {
      return jasmine.createSpy("naviagte");
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [ ReactiveFormsModule, FormsModule, HttpClientModule ],
      providers: [ {
        provide: Router,
        useClass: RouterMock
       }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
