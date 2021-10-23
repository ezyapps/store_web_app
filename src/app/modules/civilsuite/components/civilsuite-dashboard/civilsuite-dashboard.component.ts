import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { AuthService } from '../../../../common/_services/auth.service';
import { DataStoargeService } from '../../../../common/_services/datastorage.service';
import { SignalService } from '../../../../common/_services/signal.service';
import { GeoDistrict } from '../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../geo-location/models/geo-division.model';
import { GeoUnion } from '../../../geo-location/models/geo-union.module';
import { GeoUpazila } from '../../../geo-location/models/geo-upazia.module';
import { DistrictService } from '../../../geo-location/services/district.service';
import { DivisionService } from '../../../geo-location/services/division.service';
import { UnionService } from '../../../geo-location/services/union.service';
import { UpazilaService } from '../../../geo-location/services/upazila.service';
import { CivilCaseService } from '../../services/civilcase.service';


@Component({
  selector: 'app-civilsuite-dashboard',
  templateUrl: './civilsuite-dashboard.component.html',
  styleUrls: ['./civilsuite-dashboard.component.less']
})
export class CivilsuiteDashboardComponent implements OnInit {
  summaryData: any[];
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  searchModel: any = {};
  totalRows: number = 0;

  public pieChartLabels: string[]; // = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[]; // = [300, 500, 100];
  public pieChartType = 'pie';


  constructor(
    private signalService: SignalService,
    private civilCaseService: CivilCaseService,
    private upazilaService: UpazilaService,
    private distService: DistrictService,
    private divService: DivisionService,
    private unionService: UnionService,
    private twister: AlertifyService,
    private authService: AuthService,
    private _data: DataStoargeService,
    private router: Router,
    ) {
    this.signalService.setActiveModule('CIVILSUITE');
  }

  ngOnInit() {
    this.loadDistricts();

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
        this.loadSummaryData();
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
  findCase() {
    this.loadSummaryData();
  }
  // events
  public chartClicked(e: any): void {
    //console.log(e.active[0]);
    //console.log(e.active[0]._model.label);
    this._data.data = {
      distCode: this.searchModel.distCode,
      upazilaCode : this.searchModel.upazilaCode,
      status: e.active[0]._model.label
    }
    this.router.navigate(['/civil-suite/caselist']);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

  loadSummaryData(){
    this.civilCaseService.getStatusWiseSummary(this.searchModel).subscribe(
      (data: any) => {
        this.summaryData = data;
        this.pieChartLabels = new Array();
        this.pieChartData = new Array();
        data.forEach(status => {
          this.pieChartLabels.push(status.Status);
          this.pieChartData.push(status.Total);
          this.totalRows += status.Total;
        });

        console.log(this.totalRows);
    },
    error => {
      this.summaryData = null;
      this.twister.error('Sorry! Some error occured.');
    })
  }
}
