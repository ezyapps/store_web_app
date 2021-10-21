import { INavData } from "@coreui/angular";
import { AuthService } from "../_services/auth.service";

export class AppAdminMenu {
  constructor(private authService: AuthService) {  }

  public makeMenus(menuItems: INavData[]) {
    menuItems.push(
      {
        title: true,
        name: 'অ্যাপ সেটিংস'
      }
    );
    menuItems.push()
  }
}
