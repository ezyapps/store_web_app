import { Component, Input, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { UserRole } from '../../../modules/users/models/user-roles.model';
import { UserRoleService } from '../../../modules/users/services/user-role.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { SignalService } from '../../_services/signal.service';

@Component({
  selector: 'app-menu-roles',
  templateUrl: './menu-roles.component.html',
  styleUrls: ['./menu-roles.component.scss']
})
export class MenuRolesComponent implements OnInit {
  @Input() userRole: UserRole;
  constructor(
    private userRoleService: UserRoleService,
    private twister: AlertifyService,
    private authService: AuthService,
    private router: Router,
    private signalService: SignalService
  ) { }

  ngOnInit() {
  }
  
  activateCurrentRole() {
    this.userRoleService.activateRole(this.userRole.userRoleId).subscribe(() => {
      this.authService.loadActiveToken().subscribe(() => {
        this.twister.message('Operation done.');
        this.signalService.sendMessage('RELOAD-TOKEN');
        this.router.navigate(['/']);
      });
    })
    console.log(this.userRole);
  }
}
