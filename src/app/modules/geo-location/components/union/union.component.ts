import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../models/geo-district.model';
import { GeoDivision } from '../../models/geo-division.model';
import { GeoUnion } from '../../models/geo-union.module';
import { GeoUpazila } from '../../models/geo-upazia.module';
import { DistrictService } from '../../services/district.service';
import { DivisionService } from '../../services/division.service';
import { UnionService } from '../../services/union.service';
import { UpazilaService } from '../../services/upazila.service';

@Component({
  selector: 'app-union',
  templateUrl: './union.component.html',
  styleUrls: ['./union.component.scss']
})
export class UnionComponent implements OnInit {

  model: any = {};
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  selectedDivCode: string;
  selectedDistCode: string;
  constructor(
    private twister: AlertifyService,
    private upazilaService: UpazilaService,
    private distService: DistrictService,
    private divService: DivisionService,
    private unionService: UnionService
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
    this.unionService.getAll(this.model.parentCode).subscribe(
      (data: GeoUnion[]) => {
        this.unions = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  saveUnion() {
    if (this.model !== null) {
      // console.log(this.model);
      if (!this.model.id) {
        this.createNew();
      } else {
        this.updateUnion();
      }
    }
  }

  createNew() {

    this.unionService.save(this.model).subscribe((data: GeoUnion) => {
      this.twister.success('The Union has been created.');
      this.model = {};
      this.loadUnions();
    },
    error => {
      this.twister.error(error.message);
      console.log(error);
    });
  }

  updateUnion() {
    console.log(this.model);
    this.unionService.update(this.model.id, this.model).subscribe((data: GeoUnion) => {
      this.twister.success('The Union has been created.');
      this.model = {};
      this.loadUnions();
    },
    error => {
      this.twister.error(error.message);
      console.log(error);
    });
  }

}
