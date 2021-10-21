import { Injectable } from '@angular/core';

import { GeoDistrict } from '../models/geo-district.model';
import { GeoDivision } from '../models/geo-division.model';
import { DistrictService } from './district.service';
import { DivisionService } from './division.service';
import { MouzaService } from './mouza.service';
import { UnionService } from './union.service';
import { UpazilaService } from './upazila.service';

@Injectable({
  providedIn: 'root'
})
export class GeoCommonService {

constructor(
  private divisionService: DivisionService,
  private distService: DistrictService,
  private upazilaService: UpazilaService,
  private unionService: UnionService,
  private mouzaService: MouzaService
) { }

  loadDivisions(): GeoDivision[] {
    var divList: any;
    this.divisionService.findAll().subscribe(
      (data: any) => {
        divList = data;
      },error => {
        throw new Error('Error loading division data: '+ error);
      }
    );
    return divList;
  }

  loadDistricts(): GeoDistrict[] {
    var distList: any;
    this.distService.findAll().subscribe(
      (data: any) => {
        distList = data;
      },error => {
        throw new Error('Error loading district data: '+ error);
      }
    );
    return distList;
  }

  loadDistrictsByDivision(distCode): GeoDistrict[] {
    var distList: any;
    this.distService.getAll(distCode).subscribe(
      (data: any) => {
        distList = data;
      },error => {
        throw new Error('Error loading district data: '+ error);
      }
    );
    return distList;
  }
}
