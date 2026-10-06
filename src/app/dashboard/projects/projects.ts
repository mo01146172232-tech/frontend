// import { IProject } from './../../core/models/projects';
// import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { ProjectsServiice } from '../../core/services/projects-serviice';

// @Component({
//   imports: [ReactiveFormsModule],
//   selector: 'app-projects',
//   styleUrl: './projects.css',
//   templateUrl: './projects.html',
// })
// export class Projects implements OnInit{
//   private _ProjectService=inject(ProjectsServiice)
//   projectForm= new FormGroup({
//     name:new FormControl(''),
//     link:new FormControl(''),
//     img:new FormControl(null)
//   })
//   onSubmit(){
//     let myFormData=new FormData()
//     myFormData.append('name',this.projectForm.value.name as string)
//     myFormData.append('desc',this.projectForm.value.link as string)
//     myFormData.append('img',this.projectForm.value.img!)
//     this._ProjectService.postProduct(myFormData).subscribe(data=>{
//       console.log(data);
      
//     })
//   }
//   onFileChange(event:any){
//     if(event.target.files.length > 0){
//       const file =event.target.files[0]
//       this.projectForm.patchValue({
//         img:file
//       })
//     }
//     else{
//       this.projectForm.patchValue({
//         img:null 
//       })
//     }
//   }
//   private _cdr=inject(ChangeDetectorRef)
//     projects!:IProject[]
//     async ngOnInit() {
//       this._ProjectService.getData().subscribe((data) => {
//       this.projects = data;
//       this.projectForm.patchValue({
//           name: this.projects[0].name,
//           link: this.projects[0].link
//         });
//         this._cdr.detectChanges();
//     })
// }
// }
import { IProject } from './../../core/models/projects';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsServiice } from '../../core/services/projects-serviice';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  private _ProjectService = inject(ProjectsServiice);
  private _cdr = inject(ChangeDetectorRef);

  projectForms!: FormGroup[];

  createProjectFormGroup(project?: IProject): FormGroup {
    return new FormGroup({
      _id: new FormControl(project?._id || ''),
      name: new FormControl(project?.name || '', [Validators.required, Validators.maxLength(30)]),
      link: new FormControl(project?.link || '', Validators.required),
      img: new FormControl<File | string | null>(project?.imgURL || null, Validators.required)
    });
  }

  ngOnInit(): void {
    this._ProjectService.getData().subscribe({
      next: (data: IProject[]) => {
        this.projectForms = data.map((proj) => this.createProjectFormGroup(proj));
        this._cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching projects:', err)
    });
  }

  addProject() {
    this.projectForms.push(this.createProjectFormGroup());
  }

  removeProject(index: number) {
    this.projectForms.splice(index, 1);
  }

  onFileChange(event: any, index: number) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imgControl = this.projectForms[index].get('img');
      imgControl?.setValue(file);
      imgControl?.markAsTouched();
      imgControl?.updateValueAndValidity();
    }
  }

  onSubmitSingleProject(index: number) {
    const projectForm = this.projectForms[index];
    const nameControl = projectForm.get('name');
    const linkControl = projectForm.get('link');
    nameControl?.setValue(String(nameControl.value ?? '').trim());
    linkControl?.setValue(String(linkControl?.value ?? '').trim());
    nameControl?.updateValueAndValidity();
    linkControl?.updateValueAndValidity();

    if (projectForm.invalid) {
      projectForm.markAllAsTouched();
      return;
    }

    const projectData = projectForm.value;
    const myFormData = new FormData();

    if (projectData._id) {
      myFormData.append('_id', projectData._id);
    }
    myFormData.append('name', projectData.name);
    myFormData.append('desc', projectData.link);

    if (projectData.img && projectData.img instanceof File) {
      myFormData.append('img', projectData.img);
    }

    this._ProjectService.postProduct(myFormData).subscribe({
      next: (res) => {
        console.log(`Project ${index + 1} saved successfully:`, res);
        alert(`Project ${index + 1} saved successfully ✓`);
      },
      error: (err) => console.error(`Error saving project ${index + 1}:`, err)
    });
  }
}