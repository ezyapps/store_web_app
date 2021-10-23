import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../../geo-location/models/geo-division.model';
import { DistrictService } from '../../../../geo-location/services/district.service';
import { DivisionService } from '../../../../geo-location/services/division.service';
import { Immigrant } from '../../../models/immigrant.model';
import { QuarantineCenter } from '../../../models/quarantine-center.model';
import { ImmigrantService } from '../../../services/immigrant.service';
import { QuarantineCenterService } from '../../../services/quarantine-center.service';
import { ImmigrantMoveComponent } from '../immigrant-move/immigrant-move.component';
import { QuarantineReferComponent } from '../quarantine-refer/quarantine-refer.component';

@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.scss'],
  providers: [DialogService]
})
export class SampleCollectionComponent implements OnInit {

  model: any = {};
  divisions: GeoDivision[];
  districts: GeoDistrict[];
  centers: QuarantineCenter[];
  selectedDivCode: string;
  entryDateEnabled: boolean = false;
  sampleDateEnabled: boolean = false;

  immigrants: Immigrant[];
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateCreated','PassportNo','Name','PhoneNo','LastLocation','SampleCollectionDate', 'Actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private twister: AlertifyService,
    private distService: DistrictService,
    private divService: DivisionService,
    private centerService: QuarantineCenterService,
    private immigrantService: ImmigrantService,
    private dialogService: DialogService
  ) { }

  applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
   }

  ngOnInit() {
    this.loadDivisions();
    this.loadQuarantinCenters();
  }
  loadProgressWindow(immigrant){
    const ref = this.dialogService.open(QuarantineReferComponent, {
      data: {
          immigrant: immigrant
      },
      width: '70%',
      header: 'Immigrant Quarantine / Refer',

    });
    ref.onClose.subscribe(() => {
      this.loadImmigrants();
    });
   }

   loadMovementWindow(immigrant){
    const ref = this.dialogService.open(ImmigrantMoveComponent, {
      data: {
          immigrant: immigrant
      },
      width: '70%',
      header: 'Immigrant Movement',

    });
    ref.onClose.subscribe(() => {
      this.loadImmigrants();
    });
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

      }
    )
  }

  loadImmigrants(){
    if(this.entryDateEnabled) {
        this.model.IgnoreDate = false;
        this.model.DateTo = this.model.DateFrom;
      }else{
        this.model.IgnoreDate = true;
      }
    if(!this.sampleDateEnabled){
      this.model.IgnoreSampleDate = true;
    }


    this.immigrantService.getListWithFilter(this.model).subscribe(
      (data: any) => {
        this.immigrants = data;
        this.dataSource = new MatTableDataSource(this.immigrants);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(data);
      }, error => {
        this.twister.error('Sorry! Something happened wrong.');
      }
    );

  }

}
