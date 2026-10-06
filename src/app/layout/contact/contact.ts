import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ContactServiice } from '../../core/services/contact-serviice';
import { IContact } from '../../core/models/contact';
import { HeaderService } from '../../core/services/header-service';
import { FormsModule, NgForm } from '@angular/forms';
import { FormMessageServiice } from '../../core/services/form-message-serviice';
import { IFormMessage } from '../../core/models/formMessage';

@Component({
  imports: [FormsModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  contactText!: IContact;
  title = '';
  private _ContactService = inject(ContactServiice);
  private _cdr = inject(ChangeDetectorRef);
  private _HeaderService = inject(HeaderService);

  async ngOnInit() {
    this._HeaderService.getNavbarData().subscribe((data) => {
      this.title = data[0].dataNavbar[5];
      this._cdr.detectChanges();
    });
    this._ContactService.getData().subscribe((data) => {
      this.contactText = data[0];
      this._cdr.detectChanges();
    });
  }

  msg = '';
  private _FormMessageService = inject(FormMessageServiice);
  postUser(myForm: NgForm) {
    if (myForm.valid) {
      this._FormMessageService.postMessage(myForm.value as IFormMessage).subscribe((data) => {
        console.log(data);
        myForm.resetForm();
      });
    } else {
      this.msg = 'Please type missing data';
    }
  }
}
