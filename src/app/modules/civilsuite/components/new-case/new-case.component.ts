// import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { Voice2TextService } from '../../../../common/_services/voice2text.service';
import { WindowRef } from '../../../../common/_services/window-ref.service';
import { GovtOfficeStructure } from '../../../app-admin/models/govt-office-structure.model';
import { GovtOffice } from '../../../app-admin/models/govt-office.model';
import { GovtOfficeStructureService } from '../../../app-admin/services/govt-office-structure.service';
import { GovtOfficeService } from '../../../app-admin/services/govt-office.service';
import { GeoDistrict } from '../../../geo-location/models/geo-district.model';
import { GeoDivision } from '../../../geo-location/models/geo-division.model';
import { GeoMouza } from '../../../geo-location/models/geo-mouza.model';
import { GeoUnion } from '../../../geo-location/models/geo-union.module';
import { GeoUpazila } from '../../../geo-location/models/geo-upazia.module';
import { DistrictService } from '../../../geo-location/services/district.service';
import { DivisionService } from '../../../geo-location/services/division.service';
import { MouzaService } from '../../../geo-location/services/mouza.service';
import { UnionService } from '../../../geo-location/services/union.service';
import { UpazilaService } from '../../../geo-location/services/upazila.service';
import { CivilCaseProgress } from '../../models/case-progress.model';
import { CaseTopshil } from '../../models/case-topshil.model';
import { NewCivilCase } from '../../models/new-case.model';
import { CaseTopshilService } from '../../services/case-topshil.service';
import { CivilCaseProgressService } from '../../services/civilcase-progress.service';
import { CivilCaseService } from '../../services/civilcase.service';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.less'],
  providers: [Voice2TextService]
})
export class NewCaseComponent implements OnInit {
  model: any = {};
  modelTopshil: any = {};

  divisions: GeoDivision[];
  districts: GeoDistrict[];
  upazilas: GeoUpazila[];
  unions: GeoUnion[];
  mouzas: GeoMouza[];
  offices: GovtOffice[];
  voiceListening: boolean = false;
  selectedDivCode: string;
  officeStructures: GovtOfficeStructure[];

  constructor(
    private twister: AlertifyService,
    private upazilaService: UpazilaService,
    private distService: DistrictService,
    private divService: DivisionService,
    private unionService: UnionService,
    private mouzaService: MouzaService,
    private caseService: CivilCaseService,
    private caseTopshilService: CaseTopshilService,
    private officeServices: GovtOfficeService,
    private officeStructureService: GovtOfficeStructureService,
    private civilCaseProgressService: CivilCaseProgressService,
    public v2textService: Voice2TextService,
    private winRef: WindowRef
  ) {
    this.v2textService.init();
    this.v2textService.getText().subscribe(
      data => {
      this.model.caseDescription = data;
    });
    console.log('Native window obj', winRef.nativeWindow);
   }

  ngOnInit() {
    this.loadDistricts();
  }

  convertVoice() {
    if (this.voiceListening === false) {
      this.v2textService.start();
      this.voiceListening = true;
    } else {
      this.v2textService.stop();
      // this.model.caseDescription = this.v2textService.text;
      this.voiceListening = false;
    }
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
    // this.distService.getAll(this.selectedDivCode).subscribe (
      this.distService.findAll().subscribe (
      (data: GeoDistrict[]) => {
        this.districts = data;
        this.modelTopshil.distCode = '41';
        this.loadUpazilas();
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadUpazilas() {
    this.upazilaService.getAll(this.modelTopshil.distCode).subscribe(
      (data: GeoUpazila[]) => {
        console.log(data);
        this.upazilas = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadUnions() {
    this.unionService.getAll(this.modelTopshil.distCode + '-' + this.modelTopshil.upazilaCode).subscribe(
      (data: GeoUnion[]) => {
        this.unions = data;
      }, error => {
        this.twister.error(error.message);
      }
    );

  }

  loadMouzas() {
    this.loadLandOffices(); // this.modelTopshil.unionId
    this.mouzaService.getAllByUpazila(this.modelTopshil.distCode + '-' + this.modelTopshil.upazilaCode).subscribe(
      (data: GeoMouza[]) => {
        this.mouzas = data;
        console.log(data);
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadUnionLandOfficeInfo() {
    const selMouza = this.mouzas.find(r => r.name === this.modelTopshil.mouzaNo);
    this.modelTopshil.landOfficeId = selMouza.unionLandOfficeId;
    console.log(this.modelTopshil.landOfficeId);
    this.loadOfficeStructures();
  }

  loadLandOffices() {
    // console.log(this.districts.find(a => a.code === this.modelTopshil.distCode));


    const geoCode: string = this.districts.find(a => a.code === this.modelTopshil.distCode).parentCode + '-'
    + this.modelTopshil.distCode + '-' + this.modelTopshil.upazilaCode;
 //  + '-' +  this.unions.find(x => x.id === this.modelTopshil.unionId).code

 console.log(geoCode);

    this.officeServices.getOfficeList().subscribe((data: GovtOffice[]) => { // geoCode, 'ইউনিয়ন ভূমি অফিস'
      this.offices = data;
      this.loadOfficeStructures();
    },
    error => {
      console.log(error.message);
    });
  }

  loadOfficeStructures() {
    this.officeStructureService.getAllByOfficeId(this.modelTopshil.landOfficeId).subscribe(
      (data: any) => {
        this.officeStructures = data;
      }, error => {
        this.twister.error('Sorry! Failed to load Office Structures.');
      }
    );
  }
  alterComplaintant(ctr) {
    console.log(ctr);
    if (ctr) {
      this.model.complaintant = 'সরকার';
      this.model.defendant = '';
    } else {
      this.model.defendant = 'সরকার';
      this.model.complaintant = '';
    }
  }
  saveNewCase() {
    this.twister.confirm('Confirmation', 'Are you sure to file new case?', () => {
      this.model.caseType = 'নতুন';
      if (this.model.caseType === 'নতুন') {
        this.model.status = 'SF Pending';
      } else {
        this.model.status = 'শুনানীর অপেক্ষায়';
      }

      if (this.model.complaintant == null) {
        this.model.complaintant = 'সরকার';
      }

      if (this.model.defendant == null) {
        this.model.defendant = 'সরকার';
      }

      this.model.caseCategory = 'দেওয়ানি মামলা';
      this.caseService.saveNew(this.model).subscribe (
        (data: NewCivilCase) => {
          this.modelTopshil.caseNo = this.model.caseNo;
          this.modelTopshil.caseId = data.id;
          this.caseTopshilService.save(this.modelTopshil).subscribe (
            (topshil: CaseTopshil) => {
              const progressModel = new CivilCaseProgress();
              progressModel.caseId = data.id;
              this.civilCaseProgressService.save(progressModel).subscribe (
                (resp: any) => {
                  this.twister.success('নতুন মামলাটি সফলভাবে সংরক্ষন করা হয়েছে।');
                  this.model = {};
                  this.modelTopshil = {};
                },
                error => {
                  this.twister.error(error.message);
                }
                );
            },
            error => {
              this.twister.error(error.message);
            }
          );
        },
        error => {
          this.twister.error(error.message);
        }
      );
    }, () => {});
    // console.log(this.model);
    // console.log(this.modelTopshil);
  }
}
