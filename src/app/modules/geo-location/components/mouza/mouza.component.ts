import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../models/geo-district.model';
import { GeoDivision } from '../../models/geo-division.model';
import { GeoMouza } from '../../models/geo-mouza.model';
import { GeoUnion } from '../../models/geo-union.module';
import { GeoUpazila } from '../../models/geo-upazia.module';
import { DistrictService } from '../../services/district.service';
import { DivisionService } from '../../services/division.service';
import { MouzaService } from '../../services/mouza.service';
import { UnionService } from '../../services/union.service';
import { UpazilaService } from '../../services/upazila.service';

@Component({
  selector: 'app-mouza',
  templateUrl: './mouza.component.html',
  styleUrls: ['./mouza.component.scss']
})
export class MouzaComponent implements OnInit {

  model: any = {};
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  mouzas: GeoMouza[];

  selectedDivCode: string;
  selectedDistCode: string;
  selectedUpazilaCode: string;

  constructor(
    private twister: AlertifyService,
    private upazilaService: UpazilaService,
    private distService: DistrictService,
    private divService: DivisionService,
    private unionService: UnionService,
    private mouzaService: MouzaService
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
    this.unionService.getAll(this.selectedUpazilaCode).subscribe(
      (data: GeoUnion[]) => {
        this.unions = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadMouzas() {
    this.mouzaService.getAll(this.model.parentCode).subscribe(
      (data: GeoMouza[]) => {
        this.mouzas = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  saveMouza() {
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
    this.mouzaService.save(this.model).subscribe((data: GeoMouza) => {
      this.twister.success('The Mouza has been created.');
      this.model = {};
      this.loadMouzas();
    },
    error => {
      this.twister.error(error.message);
      console.log(error);
    });
  }

  updateUnion() {
    // console.log(this.model);
    this.mouzaService.update(this.model.id, this.model).subscribe((data: GeoMouza) => {
      this.twister.success('The Mouza has been updated.');
      this.model = {};
      this.loadMouzas();
    },
    error => {
      this.twister.error(error.message);
      console.log(error);
    });
  }

}
