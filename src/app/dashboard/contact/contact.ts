import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IContact } from '../../core/models/contact';
import { ContactServiice } from '../../core/services/contact-serviice';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact implements OnInit {
  private _contactService = inject(ContactServiice);
  private _cdr = inject(ChangeDetectorRef);

  contactForm = new FormGroup({
    smallLabel: new FormControl(''),
    subHeading: new FormControl(''),
    introText: new FormControl(''),
    email: new FormControl(''),
    location: new FormControl(''),
    socialLinks: new FormArray([]),
  });

  get socialLinks(): FormArray {
    return this.contactForm.get('socialLinks') as FormArray;
  }

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this._contactService.getData().subscribe({
      next: (data) => {
        const contact = data?.[0];

        if (contact) {
          this.contactForm.patchValue({
            smallLabel: contact.smallLabel ?? '',
            subHeading: contact.subHeading ?? '',
            introText: contact.introText ?? '',
            email: contact.email ?? '',
            location: contact.location ?? '',
          });

          this.socialLinks.clear();
          (contact.socialLinks ?? []).forEach((link) => {
            this.socialLinks.push(new FormGroup({
              platform: new FormControl(link.platform ?? '', Validators.required),
              url: new FormControl(link.url ?? '', Validators.required),
            }));
          });
        }

        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading contact:', err);
      },
    });
  }

  addSocialLink(): void {
    this.socialLinks.push(new FormGroup({
      platform: new FormControl('linkedin', Validators.required),
      url: new FormControl('', Validators.required),
    }));
  }

  removeSocialLink(index: number): void {
    this.socialLinks.removeAt(index);
  }

  saveContact(): void {
    const textFields = ['smallLabel', 'subHeading', 'introText', 'email', 'location'];
    textFields.forEach((field) => {
      const control = this.contactForm.get(field);
      const value = String(control?.value ?? '').trim();
      control?.setValue(field === 'email' ? value.toLowerCase() : value);
      control?.updateValueAndValidity();
    });

    this.socialLinks.controls.forEach((link) => {
      const platformControl = link.get('platform');
      const urlControl = link.get('url');
      platformControl?.setValue(String(platformControl.value ?? '').trim().toLowerCase());
      urlControl?.setValue(String(urlControl.value ?? '').trim());
      platformControl?.updateValueAndValidity();
      urlControl?.updateValueAndValidity();
    });

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const payload: Partial<IContact> = {
      smallLabel: this.contactForm.value.smallLabel ?? '',
      subHeading: this.contactForm.value.subHeading ?? '',
      introText: this.contactForm.value.introText ?? '',
      email: this.contactForm.value.email ?? '',
      location: this.contactForm.value.location ?? '',
      socialLinks: this.socialLinks.value
        .filter((link: any) => link && (link.platform || link.url))
        .map((link: any) => ({
          platform: String(link.platform ?? '').trim().toLowerCase(),
          url: String(link.url ?? '').trim(),
        })),
    };

    this._contactService.updateContact(payload).subscribe({
      next: (res) => {
        console.log('Contact saved:', res);
        alert('Saved successfully');
      },
      error: (err) => {
        console.error('Error saving contact:', err);
        alert('Error while saving contact');
      },
    });
  }
}
