import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IHero } from '../../core/models/hero';
import { ContactServiice } from '../../core/services/contact-serviice';
import { IContact } from '../../core/models/contact';
import { HeaderService } from '../../core/services/header-service';
import { IHeader } from '../../core/models/header';
import { HeroService } from '../../core/services/hero-service';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer implements OnInit {
  header!:IHeader;
  contactText!:IContact;
  hero!:IHero;
  private _HeroService= inject (HeroService)
  private _headerService= inject (HeaderService)
  private _ContactService= inject (ContactServiice)
  private _cdr= inject (ChangeDetectorRef)

  async ngOnInit() {
      this._HeroService.getData().subscribe((data) => {
      this.hero = data[0];
      this._cdr.detectChanges(); 
      });
      this._headerService.getNavbarData().subscribe((data) => {
      this.header=data[0];
      this._cdr.detectChanges();
    });
      this._ContactService.getData().subscribe((data) => {
      this.contactText = data[0];
      this._cdr.detectChanges(); 
  })
}
}