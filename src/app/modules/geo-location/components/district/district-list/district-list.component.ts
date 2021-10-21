import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GeoDistrict } from '../../../models/geo-district.model';
import { DistrictService } from '../../../services/district.service';
import { DistrictNewComponent } from '../district-new/district-new.component';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss'],
  // providers: [DialogService]
})
export class DistrictListComponent implements OnInit {
  showNewWindow: boolean = true;
  districts: GeoDistrict[] = [];
  selectedDistrict: GeoDistrict;
  constructor(
    private alertify: AlertifyService,
    // private dialogService: DialogService,
    private districtService: DistrictService
  ) { }

  ngOnInit() {
    this.loadDistricts('all');
    this.selectedDistrict = new GeoDistrict();
  }
  onDistCreated(event) {
    this.loadDistricts('all');
  }
  onDivisionChanged(parentCode) {
    this.loadDistricts(parentCode);
  }
  loadDistricts(parentCode) {
    console.log(parentCode);
    this.districtService.getAll(parentCode).subscribe(
      (data: GeoDistrict[]) => {
        this.districts = data;
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }
  openNewWindow() {
    this.showNewWindow = !this.showNewWindow;
    // const refDist = this.dialogService.open(DistrictNewComponent, {
    //     header: 'নতুন বিভাগ',
    //     width: '70%'
    //   });
    // refDist.onClose.subscribe((dist: GeoDistrict) => {
    //   if (dist !== null) {
    //     this.alertify.message('The Division has been created');
    //     this.loadDistricts();
    //     // this.divisions.push(division);
    //   }
    // });
  }
}
