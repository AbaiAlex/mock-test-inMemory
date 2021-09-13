import {EventEmitter, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { NewUserComponent } from './new-user/new-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SplitterModule} from 'primeng/splitter';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    AppComponent,
    UserEditorComponent,
    NewUserComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    CheckboxModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    TriStateCheckboxModule,
    NoopAnimationsModule,
    RadioButtonModule,
    SelectButtonModule,
    FormsModule,
    ConfirmPopupModule,
    AutoCompleteModule,
    DropdownModule,
    InputTextModule,
    DataViewModule,
    ToolbarModule,
    ButtonModule,
    SplitterModule,
    TableModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}),
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
