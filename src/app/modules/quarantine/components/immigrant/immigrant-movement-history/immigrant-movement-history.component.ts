import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { ImmigrantMovementLog } from '../../../models/immigrant-movement-log.model';
import { ImmigrantMovementLogService } from '../../../services/immigrant-movement-log.service';

@Component({
  selector: 'app-immigrant-movement-history',
  templateUrl: './immigrant-movement-history.component.html',
  styleUrls: ['./immigrant-movement-history.component.scss']
})
export class ImmigrantMovementHistoryComponent implements OnInit, OnChanges {

  @Input() immigrantId;
  movements: ImmigrantMovementLog[];
  constructor(
    private twister: AlertifyService,
    private movementService: ImmigrantMovementLogService
  ) { }

  ngOnChanges(): void {
    this.loadMovements();
  }

  ngOnInit() {
    this.loadMovements();
  }

  loadMovements(){
    this.movementService.getMovementsByImmigrant(this.immigrantId).subscribe(
      (data: any) => {
        this.movements = data;
        console.log(data);
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

}
