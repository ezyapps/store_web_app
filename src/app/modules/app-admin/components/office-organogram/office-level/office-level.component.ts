import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { Ministry } from '../../../models/ministry.model';
import { OfficeLevel } from '../../../models/office-level.model';
import { MinistryService } from '../../../services/ministry.service';
import { OfficeLevelService } from '../../../services/office-level.service';

@Component({
  selector: 'app-office-level',
  templateUrl: './office-level.component.html',
  styleUrls: ['./office-level.component.scss']
})
export class OfficeLevelComponent implements OnInit {

  model: any = {};
  ministries: Ministry[];
  officeLevels: OfficeLevel[];
  constructor(
    private ministryService: MinistryService,
    private officeLevelService:  OfficeLevelService,
    private twister: AlertifyService
  ) { }

  ngOnInit() {
    this.loadMinistries();
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

  elaborateGeoLevel(geoLevel){
    switch(geoLevel) {
      case 1: return 'Central';
      case 2: return 'Divisional';
      case 3: return 'District';
      case 4: return 'Upazila';
      case 5: return 'Union';
    }
  }
  saveOfficeLevel() {
    this.twister.confirm('Confirmation','Are you sure to add new level?', () => {
      this.model.geoLevel = +this.model.geoLevel;
        this.officeLevelService.save(this.model).subscribe(
          (data: OfficeLevel) => {
            this.twister.success('The new level has been added successfully');
            this.loadOfficeLevels();
          },error => {
            this.twister.error(error.message);
          }
        );
      }, () => {
        // Cancel button
      }
    );
  }
}
