import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { IHero } from '../../core/models/hero';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeroService } from '../../core/services/hero-service';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero implements OnInit {
  hero!:IHero;
  private _HeroService= inject (HeroService)
  private _cdr= inject (ChangeDetectorRef)

  async ngOnInit() {
     this._HeroService.getData().subscribe((data) => {
      this.hero = data[0];
      this._cdr.detectChanges(); 
    })
  }

  staticURL = 'http://localhost:3000/hero/imgs/';
}
