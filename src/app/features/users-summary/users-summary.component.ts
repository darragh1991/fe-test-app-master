import { StatusService } from './../../shared/services/status/status.service';
import { UsersService } from './../../shared/services/users/users.service';
import { Status } from './../../shared/models/status';
import { CleanData } from './../../shared/models/cleanData';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Users } from 'src/app/shared/models/users';
import {forkJoin, Observable, Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'exads-users-summary',
  templateUrl: './users-summary.component.html',
  styleUrls: ['./users-summary.component.scss'],
})
export class UsersSummaryComponent implements OnDestroy, AfterViewInit {

  private statusData: Status;
  displayedColumns: string[] = ['username', 'fullName', 'email', 'status', 'dateCreated'];
  dataSource: MatTableDataSource<CleanData>;
  public dataLoaded: boolean = false;
  public rowCount: number = 20;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  public loadingSubject$: Observable<boolean>
  private cleanData: CleanData[] = [];
  private alterTableDataSubscription$: Subscription;
  private matPaginator: MatPaginator;
  private matSort: MatSort;



  @ViewChild(MatSort, {static: false}) set matSortFunc(sort: MatSort) {
    this.matSort = sort
  };
  @ViewChild(MatPaginator, {static: false}) set materialPaginator(matPaginator: MatPaginator){
    this.matPaginator = matPaginator;
  }

  constructor(private _usersService: UsersService,
              private _statusesService: StatusService,
              private _cdf: ChangeDetectorRef
    ) {}

  ngAfterViewInit(): void {
    this.alterTableDataSubscription$ =
    forkJoin([this._statusesService.getStatuses$(), this._usersService.getUsersByUrl$()]).pipe(
      finalize(() => this.dataLoaded = true))
        .subscribe(result => {
          this.statusData = result[0];
          this.extractRequiredData(result[1]);
          this.setDataSource()
    });
    this._cdf.detectChanges();
  }

  ngOnDestroy() {
    this.alterTableDataSubscription$.unsubscribe();
  }


  rowSelectionChange(event) {
    this.rowCount = event.value;
    this.dataSource.paginator._changePageSize(this.rowCount);
  }


  private extractRequiredData(data) {
    data.find((clientInformation: Users) => {
      const {username, first_name, last_name, email, created_date, id_status} = clientInformation;
      const cleanClientInformation: CleanData = {
        username, fullName: first_name.concat(' ', last_name), email, created_date, id_status};
        this.cleanData.push({...cleanClientInformation, status: this.retrieveStatusId(id_status)});
    });
  }

  sayHi() {
    console.log('hello');
  }

  private retrieveStatusId(id_status: number): string {
    return this.statusData[id_status - 1].id === 3 ? 'Inactive' : this.statusData[id_status - 1].description
  }

  private getRangeLabel = (page: number, pageSize: number, length: number): string => {
    length = Math.max(length, 0);
    const startIndex: number = page * pageSize;
    const endIndex: number =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `Showing ${startIndex + 1} - ${endIndex} / ${length} entries`;
  };
  /**
   * would of went with calling api and custom paginator if svgs where given in demo
   */
  private setDataSource() {
    this.dataSource = new MatTableDataSource(this.cleanData);
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator._intl.getRangeLabel = this.getRangeLabel;
  }
}
