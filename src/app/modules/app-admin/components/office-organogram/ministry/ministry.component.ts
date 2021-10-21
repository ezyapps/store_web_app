import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { Ministry } from '../../../models/ministry.model';
import { MinistryService } from '../../../services/ministry.service';

@Component({
  selector: 'app-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.scss']
})
export class MinistryComponent implements OnInit {
  model: any = {};
  ministries: Ministry[];
  constructor(
    private ministryService: MinistryService,
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
  saveMinistry(){
    this.ministryService.save(this.model).subscribe(
      (data: Ministry) => {
        this.twister.success('New Ministry has been added successfully.');
        this.loadMinistries();
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
}
