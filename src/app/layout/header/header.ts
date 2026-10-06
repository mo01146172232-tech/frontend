import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IHeader } from '../../core/models/header';
import { HeaderService } from '../../core/services/header-service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  header!:IHeader
  private _headerService= inject (HeaderService)
  private _cdr= inject (ChangeDetectorRef)
    async ngOnInit() {
    this._headerService.getNavbarData().subscribe((data) => {
      this.header=data[0];
      this._cdr.detectChanges();
    });
  }
}
