import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISkills } from '../../core/models/skills';
import { SkillsServiice } from '../../core/services/skills-serviice';

type CategoryForm = FormGroup<{
  _id: FormControl<string>;
  title: FormControl<string>;
  items: FormArray<FormControl<string>>;
}>;

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills implements OnInit {
  private _skillsService = inject(SkillsServiice);
  private _cdr = inject(ChangeDetectorRef);

  categoryForms: CategoryForm[] = [];
  private deletingCategories = new Set<CategoryForm>();

  ngOnInit() {
    this._skillsService.getData().subscribe((categories) => {
        this.categoryForms = categories.map((category) => this.createCategoryForm(category));
        if (this.categoryForms.length === 0) {
          this.addCategory();
        }
        this._cdr.detectChanges();
      
    });
  }

  createCategoryForm(category?: ISkills): CategoryForm {
    const form: CategoryForm = new FormGroup({
      _id: new FormControl(category?._id ?? '', { nonNullable: true }),
      title: new FormControl(category?.title ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      items: new FormArray<FormControl<string>>([]),
    });

    const items = category?.items?.length ? category.items : [''];
    items.forEach((item) => {
      form.controls.items.push(new FormControl(item, { nonNullable: true }));
    });

    return form;
  }

  addCategory() {
    this.categoryForms.push(this.createCategoryForm());
  }

  addSkill(categoryForm: CategoryForm) {
    this.getItems(categoryForm).push(new FormControl('', { nonNullable: true }));
  }

  removeSkill(categoryForm: CategoryForm, skillIndex: number): void {
    const items = this.getItems(categoryForm);
    items.removeAt(skillIndex);

    if (items.length === 0) {
      items.push(new FormControl('', { nonNullable: true }));
    }
  }

  removeCategory(categoryForm: CategoryForm) {
    const categoryIndex = this.categoryForms.indexOf(categoryForm);
    if (categoryIndex === -1 || this.deletingCategories.has(categoryForm)) {
      return;
    }

    const id = String(categoryForm.controls._id.value ?? '');
    if (!id) {
      this.removeCategoryForm(categoryForm);
      return;
    }

    this.deletingCategories.add(categoryForm);
    this._skillsService.deleteSkill(id).subscribe(() => {
      this.deletingCategories.delete(categoryForm)
      this.removeCategoryForm(categoryForm)
      this._cdr.detectChanges()
      alert('Delete is Done')
    })

  }

  saveCategory(categoryForm: CategoryForm) {
    if (this.categoryForms.indexOf(categoryForm) === -1) {
      return;
    }

    const titleControl = categoryForm.controls.title;
    titleControl.setValue(titleControl.value.trim());
    titleControl.updateValueAndValidity();

    if (categoryForm.invalid) {
      categoryForm.markAllAsTouched();
      return;
    }

    const title = titleControl.value;
    const items = this.getItems(categoryForm).value
      .map((item) => String(item ?? '').trim())
      .filter((item) => item.length > 0);
    const payload: Partial<ISkills> = { title, items };
    const id = String(categoryForm.controls._id.value ?? '');

    const request$ = id
      ? this._skillsService.updateSkill(id, payload)
      : this._skillsService.createSkill(payload);

    request$.subscribe({
      next: (savedCategory) => {
        categoryForm.patchValue({
          _id: savedCategory._id ?? id,
          title: savedCategory.title ?? title,
        });

        const savedItems = savedCategory.items ?? items;
        const itemControls = this.getItems(categoryForm);
        itemControls.clear();
        (savedItems.length ? savedItems : ['']).forEach((item) => {
          itemControls.push(new FormControl(item, { nonNullable: true }));
        });

        alert('Saved successfully');
      },
      error: (err) => {
        console.error('Error saving skill category:', err);
        alert('Error while saving category');
      },
    });
  }

  getItems(categoryForm: CategoryForm): FormArray<FormControl<string>> {
    return categoryForm.controls.items;
  }

  private removeCategoryForm(categoryForm: CategoryForm) {
    const categoryIndex = this.categoryForms.indexOf(categoryForm);
    if (categoryIndex !== -1) {
      this.categoryForms.splice(categoryIndex, 1);
    }

    if (this.categoryForms.length === 0) {
      this.addCategory();
    }
  }
}
