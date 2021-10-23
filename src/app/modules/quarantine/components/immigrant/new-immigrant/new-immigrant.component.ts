import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { AuthService } from '../../../../../common/_services/auth.service';
import { GeoDistrict } from '../../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../../geo-location/models/geo-division.model';
import { DistrictService } from '../../../../geo-location/services/district.service';
import { DivisionService } from '../../../../geo-location/services/division.service';
import { ImmigrantLOV } from '../../../models/immigrant-lovs.model';
import { Immigrant } from '../../../models/immigrant.model';
import { QuarantineCenter } from '../../../models/quarantine-center.model';
import { ImmigrantService } from '../../../services/immigrant.service';
import { QuarantineCenterService } from '../../../services/quarantine-center.service';

@Component({
  selector: 'app-new-immigrant',
  templateUrl: './new-immigrant.component.html',
  styleUrls: ['./new-immigrant.component.scss']
})
export class NewImmigrantComponent implements OnInit {

  model: any = {};
  centerModel: any = {};
  action: string = 'Quarantine';
  inDistrict: boolean = true;
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  imgrDistricts: GeoDistrict[];
  centers: QuarantineCenter[];
  categories: ImmigrantLOV[];

  selectedDivCode: string;
  selectedQDist: string;
  immigrants: Immigrant[];
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['TokenNo','Name','PassportNo','Category','PhoneNo','DistrictName','Gender', 'Actions']; //,'LastLocation','PortAction'
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private twister: AlertifyService,
    private distService: DistrictService,
    private divService: DivisionService,
    private centerService: QuarantineCenterService,
    private authService: AuthService,
    private immigrantService: ImmigrantService
  ) { }

  ngOnInit() {
    this.model.Center = '';
    this.loadDivisions();
    // this.alterInDistrict(true);
    // this.loadQuarantinCenters();
    this.loadImgrDistricts();
    this.loadImmigrants();
    this.loadCategories();
  }

  loadCategories(){
    this.immigrantService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },error => {
        this.twister.error(error.message);
      }
      );
  }
  loadDivisions() {
    this.divService.findAll().subscribe(
      (data: GeoDivision[]) => {
        this.divisions = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }
  loadImgrDistricts() {
    this.distService.getAll('all').subscribe (
      (data: GeoDistrict[]) => {
        this.imgrDistricts = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  // loadDistricts() {
  //   this.distService.getAll(this.selectedDivCode).subscribe (
  //     (data: GeoDistrict[]) => {
  //       this.districts = data;
  //       if(this.inDistrict) {
  //         this.selectedQDist = this.authService.decodedToken.OfficeGEOCode.split('-')[1];
  //         console.log('In-DistCode = '+ this.selectedQDist);
  //       }

  //     }, error => {
  //       this.twister.error(error.message);
  //     }
  //   );
  // }
// changeAction(val){
//   this.model.Type = (val==='Refer')?'Hospital':'';
//   this.loadQuarantinCenters();
// }
  // loadQuarantinCenters(){
  //   this.centerModel.District = this.selectedQDist;
  //   this.centerService.findAllWithFilter(this.centerModel).subscribe(
  //     (data: any) => {
  //       this.centers = data;
  //       console.log(this.centers);
  //     }, error => {
  //       this.twister.error(error.message);
  //     }
  //   )
  // }
  // alterInDistrict(ctr){
  //   this.inDistrict = ctr;
  //   if(ctr) {
  //     this.selectedDivCode = '40';
  //     this.loadDistricts();
  //   }
  // }

  dateConverter(date: Date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '/' + mm + '/' + dd;
  }
  addDaysInDate(date: Date, days: number){
    return this.dateConverter(new Date(date.getTime() + ((1000 * 60 * 60 * 24)*days)));
  }

  saveNewImmigrant(){
    //this.model.District = this.selectedQDist;

    // this.model.PortAction = this.action;
    // console.log(this.model);
    // if(this.action == 'Quarantine') {
    //   this.model.LastLocation = this.model.Center;
    //   if(this.model.Center == '')
    //   {
    //     this.twister.error('Sorry! Please select Center');
    //     return false;
    //   }
    //   var today = new Date();
    //   this.model.QStartTime = this.dateConverter(today);
    //   this.model.SampleCollectionDate = this.addDaysInDate(today, 13);

    // }else {
    //   this.model.LastLocation = this.model.Center;
    //   if(this.model.Center == '')
    //     {
    //       this.twister.error('Sorry! Please select '+ this.model.Type);
    //       return false;
    //     }
    // }

    this.immigrantService.createNew(this.model).subscribe (
      (data: any) => {
        this.twister.success('Data has been saved successfully.');
        this.model = {};
        this.loadImmigrants();
        console.log(data);
      }, error => {
        this.twister.error('Sorry! Failed to save data. Error: '+ error.message);
      }
    )
  }
  applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
   }

  loadImmigrants() {
    this.immigrantService.getListWithFilter(
        {
          //District: '41',
          DateFrom: this.dateConverter(new Date(Date())),
          DateTo: this.dateConverter(new Date(Date())),
          IgnoreDate: false
        }).subscribe (
      (data: any) => {
        this.immigrants = data;
        this.dataSource = new MatTableDataSource(this.immigrants);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.twister.error('Sorry! Some thing happened wrong.');
      }
    );
  }
}
