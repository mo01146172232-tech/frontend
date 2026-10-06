import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AboutServiice } from '../../core/services/about-serviice';
import { IAbout } from '../../core/models/about';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../core/services/header-service';

@Component({
  imports: [CommonModule],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements OnInit {
  about!:IAbout;
  title = '';
  constructor(private _HeaderService: HeaderService,private _AboutService: AboutServiice,private _cdr:ChangeDetectorRef){}
  async ngOnInit() {
      this._HeaderService.getNavbarData().subscribe((data) => {
      this.title = data[0].dataNavbar[1];
      this._cdr.detectChanges();
    });
    this._AboutService.getData().subscribe((data) => {
      this.about = data[0];
      this._cdr.detectChanges();
    });
  }
}
