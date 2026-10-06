import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header-service';
import { AboutServiice } from '../../core/services/about-serviice';
import { IAbout } from '../../core/models/about';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  private _HeaderService = inject(HeaderService);
  private _cdr = inject(ChangeDetectorRef);
  title = '';
  private _AboutService = inject(AboutServiice);
  about!: IAbout;

  aboutForm: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(500)]),
  });

  ngOnInit() {
    this._HeaderService.getNavbarData().subscribe((data) => {
      this.title = data[0].dataNavbar[1];
      this._cdr.detectChanges();
    });

    this._AboutService.getData().subscribe((data) => {
      this.about = data[0];
      this.aboutForm.patchValue({
        text: this.about.text || '',
      });
      this._cdr.detectChanges();
    });
  }

  onSubmit() {
 
    this._AboutService.putAbout({text: this.aboutForm.value.text}).subscribe(()=>{
      alert('Done');
    });
  }
  delete(){
    this._AboutService.deleteAbout().subscribe(()=>{this.aboutForm.reset()
    })
  }
}
