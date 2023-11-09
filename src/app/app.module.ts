import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { FormPopupComponent } from './form-popup/form-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InspectionComponent } from './inspection/inspection.component';
import { PWaymodalComponent } from './p-waymodal/p-waymodal.component';
import { DashboardUserMultiComponent } from './dashboard-user-multi/dashboard-user-multi.component';
import { DatePipe } from '@angular/common';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { InstallLocaionComponent } from './install-locaion/install-locaion.component';
import { KavachFormComponent } from './kavach-form/kavach-form.component';
import { KavachComponentComponent } from './kavach-component/kavach-component.component';
import { StationTcasComponent } from './station-tcas/station-tcas.component';
import { SmOperationComponent } from './sm-operation/sm-operation.component';
import { TowerBoxComponent } from './tower-box/tower-box.component';
import { GsmandGpsComponent } from './gsmand-gps/gsmand-gps.component';
import { OfcHutComponent } from './ofc-hut/ofc-hut.component';
import { RemoteInputComponent } from './remote-input/remote-input.component';
import { StationAntennaComponent } from './station-antenna/station-antenna.component';
import { RfidComponent } from './rfid/rfid.component';
import { DashboardModalComponent } from './dashboard-modal/dashboard-modal.component';
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import { HelpUsermanualComponent } from './help-usermanual/help-usermanual.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FailureDetailsComponent } from './failure-details/failure-details.component';


const routes: Routes=[
  {path:'login',component:LoginComponent},
  {path:'feedback',component:UserDashboardComponent},
  {path:'user-admin',component:UserAdminComponent},
  {path:'inspect',component:InspectionComponent},
  {path:'dashboard',component:DashboardUserMultiComponent},
  {path:'kavachform',component:KavachFormComponent},
  {path:'home',component:DashboardUserMultiComponent},
  {path:'help',component:HelpUsermanualComponent},
  {path:'failure-details',component:FailureDetailsComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}

]

library.add(fas);
@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    UserAdminComponent,
    ModalComponent,
    FormPopupComponent,
    LoginComponent,
    InspectionComponent,
    PWaymodalComponent,
    DashboardUserMultiComponent,
    GeneralInfoComponent,
    InstallLocaionComponent,
    KavachFormComponent,
    KavachComponentComponent,
    StationTcasComponent,
    SmOperationComponent,
    TowerBoxComponent,
    GsmandGpsComponent,
    OfcHutComponent,
    RemoteInputComponent,
    StationAntennaComponent,
    RfidComponent,
    DashboardModalComponent,
    PreviewModalComponent,
    HelpUsermanualComponent,
    FailureDetailsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  exports:[
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
