import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { AuthService } from '../../../../../common/_services/auth.service';
import { GeoDistrict } from '../../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../../geo-location/models/geo-division.model';
import { DistrictService } from '../../../../geo-location/services/district.service';
import { DivisionService } from '../../../../geo-location/services/division.service';
import { QuarantineCenter } from '../../../models/quarantine-center.model';
import { ImmigrantService } from '../../../services/immigrant.service';
import { QuarantineCenterService } from '../../../services/quarantine-center.service';

@Component({
  selector: 'app-immigrant-move',
  templateUrl: './immigrant-move.component.html',
  styleUrls: ['./immigrant-move.component.scss']
})
export class ImmigrantMoveComponent implements OnInit {

  model: any = {};
  centerModel: any = {};
  action: string = 'Quarantine';
  inDistrict: boolean = true;
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  centers: QuarantineCenter[];
  immigrant: any = {};
  selectedDivCode: string;
  selectedQDist: string;
  tokenNo: any;
  constructor(
    private twister: AlertifyService,
    private distService: DistrictService,
    private divService: DivisionService,
    private centerService: QuarantineCenterService,
    private authService: AuthService,
    private immigrantService: ImmigrantService,
    public ref?: DynamicDialogRef,
    public config?: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.model.Center = '';
    this.loadDivisions();
    this.alterInDistrict(true);
    this.loadQuarantinCenters();
    if(this.config?.data?.immigrant){
      this.model = this.config.data.immigrant;
      console.log(this.model);
    }
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

  loadDistricts() {
    this.distService.getAll(this.selectedDivCode).subscribe (
      (data: GeoDistrict[]) => {
        this.districts = data;
        if(this.inDistrict) {
          this.selectedQDist = this.authService.decodedToken.OfficeGEOCode.split('-')[1];
          console.log('In-DistCode = '+ this.selectedQDist);
        }

      }, error => {
        this.twister.error(error.message);
      }
    );
  }
changeAction(val){
  this.model.Type = (val==='Refer')?'Hospital':'';
  this.loadQuarantinCenters();
}
  loadQuarantinCenters(){
    this.centerModel.District = this.selectedQDist;
    this.centerService.findAllWithFilter(this.centerModel).subscribe(
      (data: any) => {
        this.centers = data;
        console.log(this.centers);
      }, error => {
        this.twister.error(error.message);
      }
    )
  }
  alterInDistrict(ctr){
    this.inDistrict = ctr;
    if(ctr) {
      this.selectedDivCode = '40';
      this.loadDistricts();
    }
  }

  dateConverter(date: Date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '/' + mm + '/' + dd;
  }
  addDaysInDate(date: Date, days: number){
    return this.dateConverter(new Date(date.getTime() + ((1000 * 60 * 60 * 24)*days)));
  }

  saveData(){
    this.model.ImmigrantId = this.model.Id;
    this.model.MoveFrom = this.model.LastLocation;
    this.model.MovementType = this.action;
    this.model.MoveTo = this.model.Center;
    if(this.model.Center == '')
    {
      this.twister.error('Sorry! Please select '+ this.model.Type);
      return false;
    }
    console.log(this.model);
    this.immigrantService.moveImmigrant(this.model).subscribe(
      (data: any) => {
        this.twister.success('Data has been saved successfully.');
        this.model = {};
        console.log(data);
        this.ref.close();
      }, error => {
        this.twister.error('Sorry! Failed to save data. Error: '+error.message);
      }
    );

  }

}
