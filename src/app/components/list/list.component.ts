import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CreateFormGroupArgs } from '@progress/kendo-angular-treelist';
import { Employee, employees } from 'src/employee';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})



export class ListComponent {
    public data: Employee[] = employees;
    public formGroup!: FormGroup;

    constructor() {
        this.createFormGroup = this.createFormGroup.bind(this);
    }
    ngOnInit(): void {
    }

    public createFormGroup({ isNew, dataItem }: CreateFormGroupArgs): any {
        const item = isNew ? {} : dataItem;

        this.formGroup = new FormGroup({
            'id': new FormControl(item.id),
            'parentId': new FormControl(item.parentId),
            'name': new FormControl(item.name, Validators.required),
            'title': new FormControl(item.title),
            'phone': new FormControl(item.phone, Validators.required)
        });

        return this.formGroup;
    }
}
