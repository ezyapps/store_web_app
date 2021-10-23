import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../../geo-location/models/geo-division.model';
import { DistrictService } from '../../../../geo-location/services/district.service';
import { DivisionService } from '../../../../geo-location/services/division.service';
import { QuarantineCenterService } from '../../../services/quarantine-center.service';

@Component({
  selector: 'app-new-quarantine-center',
  templateUrl: './new-center.component.html',
  styleUrls: ['./new-center.component.scss']
})
export class NewQuarantineCenterComponent implements OnInit {
  model: any = {};
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  selectedDivCode: string;
  constructor(
    private twister: AlertifyService,
    private distService: DistrictService,
    private divService: DivisionService,
    private centerService: QuarantineCenterService
  ) { }

  ngOnInit() {

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

  saveCenter(){
    this.twister.confirm("Confirmation", "Are you sure?",
    () => {
      this.centerService.save(this.model).subscribe((data: any) => {
        this.twister.success("");
      },
      error => {
        this.twister.error(error.message);
      });
    },
    () => {});

  }
}
