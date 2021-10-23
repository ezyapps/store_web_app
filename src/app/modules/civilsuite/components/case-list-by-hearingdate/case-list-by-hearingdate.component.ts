import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { AuthService } from '../../../../common/_services/auth.service';
import { GeoDistrict } from '../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../geo-location/models/geo-division.model';
import { GeoUnion } from '../../../geo-location/models/geo-union.module';
import { GeoUpazila } from '../../../geo-location/models/geo-upazia.module';
import { DistrictService } from '../../../geo-location/services/district.service';
import { DivisionService } from '../../../geo-location/services/division.service';
import { UnionService } from '../../../geo-location/services/union.service';
import { UpazilaService } from '../../../geo-location/services/upazila.service';
import { CivilCaseProgress } from '../../models/case-progress.model';
import { CaseHearingDateService } from '../../services/case-hearingdate.service';
import { CivilCaseProgressService } from '../../services/civilcase-progress.service';
import { CivilCaseService } from '../../services/civilcase.service';
import { CaseProgressPopupComponent } from '../case-progress-popup/case-progress-popup.component';

@Component({
  selector: 'app-case-list-by-hearingdate',
  templateUrl: './case-list-by-hearingdate.component.html',
  styleUrls: ['./case-list-by-hearingdate.component.scss'],
  providers: [DialogService]
})
export class CaseListByHearingdateComponent implements OnInit, AfterViewInit {




  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  searchModel: any = {};

  caseList: any[];
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['CaseNo','Complaintant', 'Defendant', 'UpzName','LandPercent','Status','HearingDate', 'Actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  caseListApl: any[];
  dataSourceApl: MatTableDataSource<any>;
  displayAppealColumns: string[] = ['AplCaseNo','Complaintant', 'Defendant', 'UpzName','LandPercent','Status','HearingDate', 'Actions'];
  @ViewChild('AplTablePaginator', {static: true}) aplPaginator: MatPaginator;
  @ViewChild('AplTableSort', {static: true}) aplSort: MatSort;

   constructor(
     private twister: AlertifyService,
     private caseService: CivilCaseService,
     private caseHearingDateService: CaseHearingDateService,
     private upazilaService: UpazilaService,
     private distService: DistrictService,
     private divService: DivisionService,
     private unionService: UnionService,
     private authService: AuthService,
     private router: Router,
     private dialogService: DialogService,
     private caseProgressService: CivilCaseProgressService
   ) {
    //this.caseList = [{'caseNo': '123'}];
    this.dataSource = new MatTableDataSource(this.caseList);
   }

  ngAfterViewInit() {
    //this.caseList = [{'caseNo': '123'}];
    this.dataSource = new MatTableDataSource(this.caseList);
  }

   ngOnInit() {
     this.loadDistricts();
     //this.dataSource = new MatTableDataSource(this.caseList);

   }

   findCase() {
     this.loadCases();
   }

   caseDetails(caseNo){
     this.router.navigate(['/civil-suite/casedetails/'+caseNo]);
   }

   loadProgressWindow(caseId){
     this.caseProgressService.getByCaseId(caseId).subscribe(
       (repoData: CivilCaseProgress) => {
           const ref = this.dialogService.open(CaseProgressPopupComponent, {
             data: {
                 caseProgress: repoData
             },
             width: '50%'
         });
       }, error => {
         this.twister.error('Sorry! Failed to load case progress. ' );

       }
     );
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
   applyFilterApl(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceApl.filter = filterValue;
   }
   findRegularCases(){
    this.caseHearingDateService.getRegularCasesByHearingDates(this.searchModel).subscribe(
      (data: any[]) => {
        this.caseList = data;
        this.dataSource = new MatTableDataSource(this.caseList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
   }

   findAppealCases(){
    this.caseHearingDateService.getAppealCasesByHearingDates(this.searchModel).subscribe(
      (data: any[]) => {
        this.caseListApl = data;
        this.dataSourceApl = new MatTableDataSource(this.caseListApl);
        this.dataSourceApl.sort = this.aplSort;
        this.dataSourceApl.paginator = this.aplPaginator;
      }
    );
   }

   loadCases() {
    this.findRegularCases();
    this.findAppealCases();

    // this.caseService.getAll(this.searchModel).subscribe(
    //    (data: any[]) => {
    //      this.caseList = data;
    //      this.dataSource = new MatTableDataSource(this.caseList);
    //      this.dataSource.sort = this.sort;
    //      this.dataSource.paginator = this.paginator;
    //      console.log(data);
    //    },
    //    error => {
    //      this.twister.error(error.message);
    //    }
    //  );
   }

}
