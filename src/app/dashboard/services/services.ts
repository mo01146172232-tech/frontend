import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IService } from '../../core/models/service';
import { ServicesServiice } from '../../core/services/services-serviice';

type ServiceForm = FormGroup<{
  _id: FormControl<string>;
  title: FormControl<string>;
  desc: FormControl<string>;
  tags: FormArray<FormControl<string>>;
}>;

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-services',
  styleUrl: './services.css',
  templateUrl: './services.html',
})
export class Services implements OnInit {
  private _servicesService = inject(ServicesServiice);
  private _cdr = inject(ChangeDetectorRef);

  serviceForms: ServiceForm[] = [];
  private deletingServices = new Set<ServiceForm>();

  ngOnInit(){
    this._servicesService.getData().subscribe((services) => {
        this.serviceForms = services.map((service) => this.createServiceForm(service));
        if (this.serviceForms.length === 0) {
          this.addService();
        }
        this._cdr.detectChanges();

    });
  }

  createServiceForm(service?: IService): ServiceForm {
    const form: ServiceForm = new FormGroup({
      _id: new FormControl(service?._id ?? '', { nonNullable: true }),
      title: new FormControl(service?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      desc: new FormControl(service?.desc ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(150)],
      }),
      tags: new FormArray<FormControl<string>>([]),
    });

    const tags = service?.tags?.length ? service.tags : ['Angular'];
    tags.forEach((tag) => {
      form.controls.tags.push(new FormControl(tag ?? '', { nonNullable: true }));
    });

    return form;
  }

  addService(){
    this.serviceForms.push(this.createServiceForm());
  }

  addTag(serviceForm: ServiceForm){
    this.getTags(serviceForm).push(new FormControl('', { nonNullable: true }));
  }

  removeTag(serviceForm: ServiceForm, tagIndex: number){
    this.getTags(serviceForm).removeAt(tagIndex);
  }

  removeService(serviceForm: ServiceForm){
    if (this.serviceForms.indexOf(serviceForm) === -1 || this.deletingServices.has(serviceForm)) {
      return;
    }

    const id = serviceForm.controls._id.value;
    if (!id) {
      this.removeServiceForm(serviceForm);
      return;
    }

    this.deletingServices.add(serviceForm);
    this._servicesService.deleteService(id).subscribe(() =>{
      this.removeServiceForm(serviceForm),
      this.deletingServices.delete(serviceForm)
      this._cdr.detectChanges()
      });
  }

  saveService(serviceForm: ServiceForm){
    if (this.serviceForms.indexOf(serviceForm) === -1) {
      return;
    }

    serviceForm.controls.title.setValue(serviceForm.controls.title.value.trim());
    serviceForm.controls.desc.setValue(serviceForm.controls.desc.value.trim());

    if (serviceForm.invalid) {
      serviceForm.markAllAsTouched();
      return;
    }

    const title = serviceForm.controls.title.value;
    const desc = serviceForm.controls.desc.value;
    const tags = this.getTags(serviceForm).value
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const payload: Partial<IService> = { title, desc, tags };
    const id = serviceForm.controls._id.value;

    const request$ = id
      ? this._servicesService.updateService(id, payload)
      : this._servicesService.createService(payload);

    request$.subscribe({
      next: (savedService) => {
        serviceForm.patchValue({
          _id: savedService._id ?? id,
          title: savedService.title ?? title,
          desc: savedService.desc ?? desc,
        });

        const savedTags = savedService.tags ?? tags;
        const tagControls = this.getTags(serviceForm);
        tagControls.clear();
        savedTags.forEach((tag) => {
          tagControls.push(new FormControl(tag, { nonNullable: true }));
        });

        alert('Saved successfully');
      },
      error: (err) => {
        console.error('Error saving service:', err);
        alert('Error while saving service');
      },
    });
  }

  getTags(serviceForm: ServiceForm): FormArray<FormControl<string>> {
    return serviceForm.controls.tags;
  }

  private removeServiceForm(serviceForm: ServiceForm){
    const serviceIndex = this.serviceForms.indexOf(serviceForm);
    if (serviceIndex !== -1) {
      this.serviceForms.splice(serviceIndex, 1);
    }

    if (this.serviceForms.length === 0) {
      this.addService();
    }
  }
}
