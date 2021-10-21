import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../models/geo-district.model';
import { GeoDivision } from '../../models/geo-division.model';
import { GeoUpazila } from '../../models/geo-upazia.module';
import { DistrictService } from '../../services/district.service';
import { DivisionService } from '../../services/division.service';
import { GeoCommonService } from '../../services/geo-common.service';
import { UnionService } from '../../services/union.service';
import { UpazilaService } from '../../services/upazila.service';

@Component({
  selector: 'app-upazila',
  templateUrl: './upazila.component.html',
  styleUrls: ['./upazila.component.scss']
})
export class UpazilaComponent implements OnInit {

  model: any = {};
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];

  selectedDivCode: string;

  constructor(
    private twister: AlertifyService,
    private upazilaService: UpazilaService,
    private distService: DistrictService,
    private divService: DivisionService
  ) { }

  ngOnInit() {
    this.loadDivisions();
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
    this.upazilaService.getAll(this.model.parentCode).subscribe(
      (data: GeoUpazila[]) => {
        this.upazilas = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  saveUpazila() {
    if (this.model !== null) {
      // console.log(this.model);
      if (!this.model.id) {
        this.createNew();
      } else {
        this.updateUpazila();
      }
    }
  }

  createNew() {
    this.upazilaService.save(this.model).subscribe((data: GeoUpazila) => {
      this.twister.success('The upazila has been created.');
      this.model = {};
      this.loadUpazilas();
    },
    error => {
      this.twister.error(error.message);
      console.log(error);
    });
  }

  updateUpazila() {
    console.log(this.model);
    this.upazilaService.update(this.model.id, this.model).subscribe((data: GeoUpazila) => {
      this.twister.success('The upazila has been created.');
      this.model = {};
      this.loadUpazilas();
    },
    error => {
      this.twister.error(error.message);
      console.log(error);
    });
  }
}
