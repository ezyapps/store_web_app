import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../../geo-location/models/geo-division.model';
import { GeoUnion } from '../../../../geo-location/models/geo-union.module';
import { GeoUpazila } from '../../../../geo-location/models/geo-upazia.module';
import { DistrictService } from '../../../../geo-location/services/district.service';
import { DivisionService } from '../../../../geo-location/services/division.service';
import { UnionService } from '../../../../geo-location/services/union.service';
import { UpazilaService } from '../../../../geo-location/services/upazila.service';
import { GovtOffice } from '../../../models/govt-office.model';
import { Ministry } from '../../../models/ministry.model';
import { OfficeLevel } from '../../../models/office-level.model';
import { GovtOfficeService } from '../../../services/govt-office.service';
import { MinistryService } from '../../../services/ministry.service';
import { OfficeLevelService } from '../../../services/office-level.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  model: any = {};
  ministries: Ministry[];
  officeLevels: OfficeLevel[];
  offices: GovtOffice[];
  upperOffices: GovtOffice[];
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  selectedDivCode: string = '00';
  selectedDistCode: string = '00';
  selectedUpazilaCode: string = '00';
  selectedUnionCode: string = '00';
  selectedGeoLevel: number = 0;
  constructor(
    private ministryService: MinistryService,
    private officeLevelService:  OfficeLevelService,
    private officeService:  GovtOfficeService,
    private twister: AlertifyService,
    private upazilaService: UpazilaService,
    private distService: DistrictService,
    private divService: DivisionService,
    private unionService: UnionService
  ) { }

  ngOnInit() {
    this.loadMinistries();
    this.loadDivisions();
  }

  loadMinistries(){
    this.ministryService.findAll().subscribe(
      (data: Ministry[]) => {
        this.ministries = data;
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }

  loadOffices() {
    this.officeService.getAllByMinistryOfficeLevel(this.model.officeLevelId).subscribe (
      (data: GovtOffice[]) => {
        this.offices = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOfficeLevels() {
    this.officeLevelService.getAll(this.model.ministryId).subscribe(
      (data: OfficeLevel[]) => {
        this.officeLevels = data;
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
  onOfficeLevelChange(){
    this.selectedGeoLevel = 0;
    if(this.model.officeLevelId)
      this.selectedGeoLevel = +this.officeLevels.find(x => x.id === this.model.officeLevelId).geoLevel;
    this.selectedDivCode = '00';
    this.selectedDistCode = '00';
    this.selectedUpazilaCode = '00';
    this.selectedUnionCode = '00';
    this.loadUpperLevelOffices();
    this.loadOffices();
  }
  loadUpperLevelOffices(){
    this.officeService.getUpperLevelOfficesByMinistryOfficeLevel(this.model.officeLevelId).subscribe (
      (data: GovtOffice[]) => {
        this.upperOffices = data;
      }, error => {
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

  loadDistricts() {
    this.distService.getAll(this.selectedDivCode).subscribe (
      (data: GeoDistrict[]) => {
        this.districts = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadUpazilas() {
    this.upazilaService.getAll(this.selectedDistCode).subscribe(
      (data: GeoUpazila[]) => {
        console.log(data);
        this.upazilas = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadUnions() {
    this.unionService.getAll(this.selectedDistCode+'-'+this.selectedUpazilaCode).subscribe(
      (data: GeoUnion[]) => {
        this.unions = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }
  saveNewOffice() {
    this.model.geoCode = this.selectedDivCode+'-'+this.selectedDistCode+'-'+this.selectedUpazilaCode+'-'+this.selectedUnionCode;
    this.officeService.save(this.model).subscribe(
      (data: GovtOffice) => {
        this.loadOffices();
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
}
