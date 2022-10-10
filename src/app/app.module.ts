import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from '@progress/kendo-angular-menu';
import { DataComponent } from './components/data/data.component';
import { RouterModule } from '@angular/router';
import { TreeListModule } from "@progress/kendo-angular-treelist";
import { ReactiveFormsModule } from "@angular/forms";
import { ListComponent } from './components/list/list.component';
import { TreeViewModule } from "@progress/kendo-angular-treeview";
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { ChecklistDatabase, DirectoryComponent } from './components/directory/directory.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/directory/dialog/dialog.component';
import { AddDialogComponent } from './components/directory/add-dialog/add-dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    DataComponent,  
    ListComponent, DirectoryComponent, DialogComponent, AddDialogComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserAnimationsModule,
    MenuModule,
    RouterModule,
    TreeListModule,
    ReactiveFormsModule,
    TreeViewModule,
    MatTreeModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    MatTreeModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule

    
  ],
  providers: [ChecklistDatabase,DirectoryComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
