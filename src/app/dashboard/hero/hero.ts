import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HeroService } from '../../core/services/hero-service';
import { IHero } from '../../core/models/hero';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {
  hero!:IHero;
  IMGURL=''
  staticURL = 'http://localhost:3000/hero/imgs/'
    private _HeroService= inject (HeroService)
    private _cdr= inject (ChangeDetectorRef)
  
    async ngOnInit() {
       this._HeroService.getData().subscribe((data) => {
        this.hero = data[0];
        this.heroForm.patchValue({
            welcome: this.hero.welcome || '',
            name: this.hero.name || '',
            jobTitle: this.hero.jobTitle || '',
            desc: this.hero.desc || '',
            primaryBtn: this.hero.primaryBtn || '',
            secondaryBtn: this.hero.secondaryBtn || ''
          });
          this.IMGURL=this.staticURL+this.hero.imgURL
        this._cdr.detectChanges(); 
      })
    }
    heroForm: FormGroup = new FormGroup({
    welcome: new FormControl('', [Validators.maxLength(20)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    jobTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    desc: new FormControl('', [Validators.minLength(10), Validators.maxLength(100)]),
    primaryBtn: new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]),
    secondaryBtn: new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]),
    img: new FormControl(null,Validators.required)
  });

  onSubmit(){
    const myFormData=new FormData()
    myFormData.append('welcome',this.heroForm.value.welcome as string)
    myFormData.append('name',this.heroForm.value.name as string)
    myFormData.append('jobTitle',this.heroForm.value.jobTitle as string)
    myFormData.append('desc',this.heroForm.value.desc as string)
    myFormData.append('primaryBtn',this.heroForm.value.primaryBtn as string)
    myFormData.append('secondaryBtn',this.heroForm.value.secondaryBtn as string)
    myFormData.append('img', this.heroForm.value.img);
    
    
    this._HeroService.updateHero(myFormData).subscribe(data=>{
      console.log(data);
      this.IMGURL=this.staticURL+data.imgURL
      this._cdr.detectChanges()
      alert("Done")
    })
  }
  onFileChange(event:any){
    if(event.target.files.length > 0){
      const file =event.target.files[0]
      this.heroForm.patchValue({
        img:file
      })
    }
    else{
      this.heroForm.patchValue({
        img:null 
      })
    }
  }
  delete(){
    this._HeroService.deleteHero().subscribe(()=>{this.heroForm.reset()
    })
  }

  
}
