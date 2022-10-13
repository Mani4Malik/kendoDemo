import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectoryComponent } from '../directory.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent { 
  form!: FormGroup;
  name:any;


constructor(
    private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:any,
    private addDialogRef: MatDialogRef<AddDialogComponent>,
    private directory:DirectoryComponent,
      ) {
    this.name = data;
}

ngOnInit() {
    this.form = this.fb.group({
        name: ['Add Name', []],
    });
}

save() {   
    this.directory.addDataInTree(this.name,this.form.value.name)
    this.addDialogRef.close();
}

close() {
    this.addDialogRef.close();
}
}
