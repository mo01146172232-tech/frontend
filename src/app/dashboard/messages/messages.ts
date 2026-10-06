import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormMessageServiice } from '../../core/services/form-message-serviice';
import { IFormMessage } from '../../core/models/formMessage';

@Component({
  imports: [],
  selector: 'app-messages',
  styleUrl: './messages.css',
  templateUrl: './messages.html',
})
export class Messages implements OnInit {
  private _MessageService = inject(FormMessageServiice);
  private _cdr = inject(ChangeDetectorRef);

  messages!: IFormMessage[] ;

  ngOnInit() {
    this._MessageService.getData().subscribe((data) => {
      this.messages = data;
      this._cdr.detectChanges();
    });
  }
}