import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {


  Modelform:any[]=[];
  tableform:any[]=[];
  Module:any;
  SubModule:any;
  Feedbacktype:any;
  Status:any;

 

  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<ModalComponent>,private datePipe: DatePipe){
    this.tableform = this.apiService.FeedbacksharedData;
  }


  isInputDisabled=true;

   ngOnInit(): void {  
    
   const Feedbackid= this.apiService.ModalIdData;
    this.Module=this.apiService.ModalModuleData;
    this.SubModule=this.apiService.ModalSubModuleData;
    this.Feedbacktype=this.apiService.ModalFeedbackData;
    this.Status=this.apiService.ModalStatusData;

   console.log("@modal component end ",Feedbackid)
   this.apiService.getfeedbackaction(Feedbackid).subscribe(data=>{
    this.Modelform=data;
    console.log("Data of Model type:",this.Modelform);
   }); 

 
  }
  closeModal(){
    this.dialogRef.close();
    
  } 

  imageSrc:string;
  fileUrl:any;

  Imageview(imageName: any,feedbackid:any, reportdate:any) {
     const ImageName= imageName;
     const Feedbackid= feedbackid;
         const formattedDate = this.datePipe.transform(reportdate, 'dd-MM-yyyy'); 
   const url = `http://localhost:3000/images/${imageName}/${Feedbackid}/${formattedDate}`;
    window.open(url);

    //window.open('C:\Users\Administrator\Desktop\smms\nodedemouploads'+imageName)
    // this.apiService.viewImage(imageName).subscribe(data => {
    //   console.log('imageName',data);
    //    this.imageSrc = 'data:image/jpeg;base64,' + data.imageData;
    // });

  }
  
}
