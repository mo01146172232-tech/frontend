import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IHeader } from '../../core/models/header';
import { HeaderService } from '../../core/services/header-service';

@Component({
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit{
  protected links: { label: string }[] = [];
  header!:IHeader
  private _headerService= inject (HeaderService)
  private _cdr= inject (ChangeDetectorRef)
    async ngOnInit() {
    this._headerService.getNavbarData().subscribe((data) => {
      this.header=data[0];
      this.items.clear();

          const navData = this.header.dataNavbar || [];
          navData.forEach((item: any) => {
            const value = typeof item === 'object' ? (item.label || item.text || '') : item;
            this.items.push(new FormControl(value, [Validators.required, Validators.maxLength(30)]));
          });
      this.navForm.patchValue({
          primaryBtn: this.header.primaryBtn || '',
          secondaryBtn: this.header.secondaryBtn || ''
      })
      this._cdr.detectChanges();
    });
  }
  navForm:FormGroup=new FormGroup({
    items:new FormArray([], Validators.required),
    primaryBtn:new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]),
    secondaryBtn:new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]),
  })
  
  get items():FormArray{
    return this.navForm.get('items') as FormArray;
  }
  addItem(){
    const items =this.navForm.get('items') as FormArray
    items.push(new FormControl('', [Validators.required, Validators.maxLength(30)]))
  }
  deleteItem(){
    this.items.removeAt(this.items.length-1)
  }
  onSubmit(){
    this.items.controls.forEach((control) => {
      control.setValue(String(control.value ?? '').trim());
      control.updateValueAndValidity();
    });
    this.navForm.controls['primaryBtn'].patchValue(
      String(this.navForm.controls['primaryBtn'].value ?? '').trim()
    );
    this.navForm.controls['secondaryBtn'].patchValue(
      String(this.navForm.controls['secondaryBtn'].value ?? '').trim()
    );

    if (this.navForm.invalid) {
      this.navForm.markAllAsTouched();
      return;
    }

    const navbarData = this.navForm.getRawValue();

    this._headerService.updateHeader({
      dataNavbar: navbarData.items,
      primaryBtn: navbarData.primaryBtn,
      secondaryBtn: navbarData.secondaryBtn
    }).subscribe({
      next: () => {
        this._cdr.detectChanges();
        alert('Done');
      },
      error: (error) => console.error('Error updating navbar:', error),
    });
  }
}