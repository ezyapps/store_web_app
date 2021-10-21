import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { UserService } from '../../../services/user.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SignalService } from '../../../../../common/_services/signal.service';
import { AuthService } from '../../../../../common/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-photo-update',
  templateUrl: './photo-update.component.html',
  styleUrls: ['./photo-update.component.scss']
})
export class ProfilePhotoUpdateComponent implements OnInit {
  title = 'ngImageCrop';
  file: any = {};
  imageChangedEvent: any = '';
  croppedImage: any = '';

    constructor(
      private twister: AlertifyService,
      private userService: UserService,
      private signalService: SignalService,
      private router: Router,
      private authService: AuthService
    ) { }

    ngOnInit() {
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        /* show cropper */
    }
    cropperReady() {
        /* cropper ready */
    }
    loadImageFailed() {
        /* show message */
    }
    uploadPhoto() {
      this.userService.uploadPhoto(this.croppedImage)
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(event.loaded * 100 / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          // this.twister.error('আপনার ছবিটি আপলোড সম্পন্ন হয়নি।');
          return of(`Photo upload failed.`);
        })).subscribe (
        (data: any) => {
          this.twister.success('আপনার ছবিটি আপলোড সম্পন্ন হয়েছে।');
          this.fileChangeEvent(null);
          this.croppedImage = null;
          this.authService.loadActiveToken().subscribe(() => {
            this.signalService.sendMessage('RELOAD-TOKEN');
            this.router.navigate(['/users/profile']);
          });
        },
        error => {
          this.twister.error('আপনার ছবিটি আপলোড সম্পন্ন হয়নি।');
        });
    }
}
