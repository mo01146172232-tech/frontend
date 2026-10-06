import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IService } from '../../core/models/service';
import { HeaderService } from '../../core/services/header-service';
import { ServicesServiice } from '../../core/services/services-serviice';

@Component({
  imports: [],
  selector: 'app-services',
  styleUrl: './services.css',
  templateUrl: './services.html',
})
export class Services {
    services!: IService[];
    title = '';
    private _HeaderService= inject (HeaderService)
    private _ServicesService= inject (ServicesServiice)
    private _cdr= inject (ChangeDetectorRef)
  
      async ngOnInit() {
          this._HeaderService.getNavbarData().subscribe((data) => {
          this.title = data[0].dataNavbar[4];
          this._cdr.detectChanges();
        });
          this._ServicesService.getData().subscribe((data) => {
          this.services = data;
          this._cdr.detectChanges();
        });
    } 
}
