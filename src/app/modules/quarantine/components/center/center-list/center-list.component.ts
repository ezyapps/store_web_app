import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../../geo-location/models/geo-division.model';
import { DistrictService } from '../../../../geo-location/services/district.service';
import { DivisionService } from '../../../../geo-location/services/division.service';
import { QuarantineCenter } from '../../../models/quarantine-center.model';
import { QuarantineCenterService } from '../../../services/quarantine-center.service';

@Component({
  selector: 'app-quarantine-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.scss']
})
export class QuarantineCenterListComponent implements OnInit {

  model: any = {};
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  centers: QuarantineCenter[];

  selectedDivCode: string;

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['Type','Name','Location', 'DistrictName', 'ContactPerson','ContactNo', 'Actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private twister: AlertifyService,
    private distService: DistrictService,
    private divService: DivisionService,
    private centerService: QuarantineCenterService
  ) { }

  applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
   }

  ngOnInit() {
    this.loadDivisions();
    this.loadQuarantinCenters();
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

  loadQuarantinCenters(){
    this.centerService.findAllWithFilter(this.model).subscribe(
      (data: any) => {
        this.centers = data;
        this.dataSource = new MatTableDataSource(this.centers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  saveCenter(){
    this.twister.confirm("Confirmation", "Are you sure?",
    () => {
      this.centerService.save(this.model).subscribe((data: any) => {
        this.twister.success("Center has been created successfully.");
        this.loadQuarantinCenters();
      },
      error => {
        this.twister.error(error.message);
      });
    },
    () => {});

  }

}
