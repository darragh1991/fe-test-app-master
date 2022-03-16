import { MatTableModule } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSummaryComponent } from './users-summary.component';


class RouterMock {
  public navigate() {
    return jasmine.createSpy("naviagte");
  }
}

describe('UsersSummaryComponent', () => {
  let component: UsersSummaryComponent;
  let fixture: ComponentFixture<UsersSummaryComponent>;

  beforeEach(async(() => TestBed.configureTestingModule({
    declarations: [UsersSummaryComponent],
    imports: [HttpClientModule, MatTableModule],
    providers: [{
      provide: Router,
      useClass: RouterMock
    }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
    .compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

