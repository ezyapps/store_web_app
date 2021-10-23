import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
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
import { CivilCaseProgressService } from '../../services/civilcase-progress.service';
import { CivilCaseService } from '../../services/civilcase.service';

@Component({
  selector: 'app-lost-cases',
  templateUrl: './lost-cases.component.html',
  styleUrls: ['./lost-cases.component.scss']
})
export class LostCasesComponent implements OnInit {
  caseList: any[];
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  searchModel: any = {};

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['CaseNo','Complaintant', 'Defendant', 'UpzName','LandPercent','LandOfficeName','Status'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


   constructor(
     private twister: AlertifyService,
     private caseService: CivilCaseService,
     private upazilaService: UpazilaService,
     private distService: DistrictService,
     private divService: DivisionService,
     private unionService: UnionService,
     private authService: AuthService,
     private router: Router,
     //private dialogService: DialogService,
     private caseProgressService: CivilCaseProgressService
   ) { }

   ngOnInit() {
     this.loadDistricts();
   }
   applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
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
  loadCases() {
    this.caseService.getLostCases(this.searchModel).subscribe(
      (data: any[]) => {
        this.caseList = data;
        this.dataSource = new MatTableDataSource(this.caseList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(data);
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }
}
