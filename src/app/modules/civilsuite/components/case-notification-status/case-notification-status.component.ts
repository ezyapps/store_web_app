import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { AuthService } from '../../../../common/_services/auth.service';
import { GeoDistrict } from '../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../geo-location/models/geo-division.model';
import { GeoUnion } from '../../../geo-location/models/geo-union.module';
import { GeoUpazila } from '../../../geo-location/models/geo-upazia.module';
import { DistrictService } from '../../../geo-location/services/district.service';
import { UnionService } from '../../../geo-location/services/union.service';
import { UpazilaService } from '../../../geo-location/services/upazila.service';
import { CaseNotificationService } from '../../services/case-notification.service';

@Component({
  selector: 'app-case-notification-status',
  templateUrl: './case-notification-status.component.html',
  styleUrls: ['./case-notification-status.component.scss']
})
export class CaseNotificationStatusComponent implements OnInit {
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  searchModel: any = {};
  notificationList: any = [];
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['CaseNo','NotificationDate',  'UpzName','NotifyTo','NotifyingMSISDN', 'NotifyTime','NotifiedThrough'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private twister: AlertifyService,
    private upazilaService: UpazilaService,
    private distService: DistrictService,
    private unionService: UnionService,
    private authService: AuthService,
    private caseNotifyService: CaseNotificationService,
    public datepipe: DatePipe
  ) {
    this.searchModel.dateFrom = this.datepipe.transform(new Date(), 'dd-MMM-yyyy');
    this.searchModel.dateTo = this.datepipe.transform(new Date(), 'dd-MMM-yyyy');
   //this.caseList = [{'caseNo': '123'}];
   this.dataSource = new MatTableDataSource(this.notificationList);
  }

 ngAfterViewInit() {
   //this.caseList = [{'caseNo': '123'}];
   this.dataSource = new MatTableDataSource(this.notificationList);
 }

  ngOnInit() {
    this.loadDistricts();
    this.searchModel.dateFrom = this.datepipe.transform(new Date(), 'dd-MMM-yyyy');
    this.searchModel.dateTo = this.datepipe.transform(new Date(), 'dd-MMM-yyyy');
    //this.dataSource = new MatTableDataSource(this.caseList);

  }

  findCase() {
    this.loadCases();
  }

  loadDistricts() {
    // this.distService.getAll(this.selectedDivCode).subscribe (
      this.distService.findAll().subscribe (
      (data: GeoDistrict[]) => {
        this.districts = data;
        this.searchModel.distCode = this.authService.decodedToken.OfficeGEOCode.split('-')[1];
        this.loadUpazilas();
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadUpazilas() {
    this.upazilaService.getAll(this.searchModel.distCode).subscribe(
      (data: GeoUpazila[]) => {
        console.log(data);
        this.upazilas = data;
        try {
          if(this.authService.decodedToken.OfficeGEOCode.split('-')[2] != '00'){
            this.searchModel.upazilaCode = this.authService.decodedToken.OfficeGEOCode.split('-')[2];
          }
        }catch(ex) {
        }

      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadUnions() {
    this.unionService.getAll(this.searchModel.distCode + '-' + this.searchModel.upazilaCode).subscribe(
      (data: GeoUnion[]) => {
        this.unions = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }
  applyFilter(event){
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue;
  }


  loadCases() {
    this.caseNotifyService.getAllNotifications(this.searchModel).subscribe(
      (data: any[]) => {
        console.log(data);
        this.notificationList = data;
        this.dataSource = new MatTableDataSource(this.notificationList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}
