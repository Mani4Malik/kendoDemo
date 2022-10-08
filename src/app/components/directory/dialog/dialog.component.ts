import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChecklistDatabase, DirectoryComponent } from '../directory.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent  {   form!: FormGroup;
  name:any;
  

  constructor(
      private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:any,
      private dialogRef: MatDialogRef<DialogComponent>,
      private directory:DirectoryComponent
        ) {
      this.name = data.item;
  }

  ngOnInit() {
      this.form = this.fb.group({
          name: [this.name, []],
      });
  }

  save() {  

      this.directory.updatItem(this.data,this.form.value.name);
      this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
}
