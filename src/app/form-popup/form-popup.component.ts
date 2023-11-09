import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.css']
})
export class FormPopupComponent {


  Feedbackid:any;
  Zone:any;
  Division:any;
  User:any;
  Contact:any;
  Module:any;
  SubModule:any;
  Feedbacktype:any;
  Status:any;
  tableform:any[];
  SelectedRemark:any;
  replyfeedbackdata:any={};
  Statusmarked:any='';
  formSubmitted=false;  
  
  isInputDisabled=true;
  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<FormPopupComponent>){
  }

  ngOnInit(): void {  

     this.Feedbackid=this.apiService.ModalIdData;
     this.Zone=this.apiService.FormPopZoneUser;
     this.Division=this.apiService.FormPopDivisionData;
     this.User=this.apiService.FormPopUserData;
     this.Contact=this.apiService.FormPopContactData;
     this.Module=this.apiService.ModalModuleData;
     this.SubModule=this.apiService.ModalSubModuleData;
     this.Feedbacktype=this.apiService.ModalFeedbackData;
     this.Status=this.apiService.ModalStatusData;
     
   console.log("@modal admin component end ",this.Feedbackid)
   this.apiService.getfeedbackaction(this.Feedbackid).subscribe(data=>{
    this.tableform=data;
    console.log("Data of admin Modal type:",this.tableform);
   });
  }
  
  closeModal(){
    console.log("CLODE MODAL CALLED");
    this.apiService.triggerOnInit();
    this.dialogRef.close();
  } 
  
  reply(){
    this.formSubmitted=true;
    const statusreply=this.Statusmarked;
   if(statusreply){
   
   console.log("reply function");
   this.replyfeedbackdata.intFeedbackID= this.Feedbackid;
   this.replyfeedbackdata.strCrisRemark = this.SelectedRemark;
   this.replyfeedbackdata.intStatusID=statusreply;
   
   console.log(this.replyfeedbackdata);
   this.apiService.putAdminFeedbackReply(this.replyfeedbackdata).subscribe(data => {
    console.log("Reply feedback submitted:", data);
  });
  this.apiService.getfeedbackaction(this.Feedbackid).subscribe(data=>{
    this.tableform=data;
    console.log("Data of admin Modal type:",this.tableform);
   });
   this.apiService.triggerOnInit();
   this.dialogRef.close();
   
   this.formSubmitted=false;
  }
  
  }
}
