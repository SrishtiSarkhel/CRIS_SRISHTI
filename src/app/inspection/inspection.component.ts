import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { PWaymodalComponent } from '../p-waymodal/p-waymodal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent {

  inspectionForm: any = {
    inspectionDate: new Date().toISOString().split('T')[0], 
    int_point_ID:'', 
    str_free_obs:'',
    str_ground_pbracket:'',
    str_insulation_driverod_NR:'',
    str_insulation_driverod_RN:'',
    str_lubr_3slepr_NR:'',
    str_lubr_3slepr_RN:'',
    str_square_grnd:'',
    str_open_switch_NR:'',
    str_open_switch_RN:'',
    str_clamp_lock_NR:'',
    str_clamp_lock_RN:'',
    str_unusual_noise:'',
    str_obs_test_without_piece_NR:'',
   str_obs_test_without_piece_RN:'',
   str_obs_test_with_5mm_NR:'',
   str_obs_test_with_5mm_RN:'',
   int_tm_opr_completion_without_piece_NR:'',
   str_opr_completion_without_piece_NR:'',
   int_tm_opr_completion_without_piece_RN:'',
   str_opr_completion_without_piece_RN:'',
   int_tm_opr_completion_with_5mm_NR:'',
   str_opr_completion_with_5mm_NR:'',
   int_tm_opr_completion_with_5mm_RN:'',
   str_opr_completion_with_5mm_RN:'',
   str_pin_snug_NR:'',
   str_pin_snug_RN:'',
   str_insl_with_grnd_NR:'',
   str_insl_with_grnd_RN:'',
   str_insl_with_pbracket_NR:'',
   str_insl_with_pbracket_RN:'',
   str_insl_with_drivebar_NR:'',
   str_insl_with_drivebar_RN:'',
  };

 receivedData:any[]=[];
 pointDetail:any[]=[]; 
 gopointDetail:any[]=[];
 Section:any; 
 Location:any;
 Switch:any;
 Operating:any;
 isInputDisabled: boolean = true; 
 

  constructor(private apiService: ApiService,private dialog: MatDialog) { 
   // this.receivedData = this.apiService.sharedData;
    const storedData = localStorage.getItem('receivedData');
    this.receivedData = JSON.parse(storedData);
    console.log("constructor  RESPONSE "+this.receivedData[0].strusername);
    console.log("constructor  RESPONSE "+this.receivedData[0].struserdesignation);
  
    this.apiService.getpointdropdown().subscribe(data => {
      console.log('Data from Point dropdown type:', data); 
      this.pointDetail = data;
    });
    
    localStorage.setItem('receivedData', JSON.stringify(this.receivedData));
  }

  TrackDetails(){
    console.log("POINT ID INSPECT",this.inspectionForm.int_point_ID);
    let mid = Number(this.inspectionForm.int_point_ID);
    this.apiService.updatePointIdData(mid);
    this.apiService.getpointdetails(mid).subscribe(data => {
      console.log('Data from Point Detail type:', data); 
      this.gopointDetail = data;
       this.Section= this.gopointDetail[0].str_secn_code;
       this.Location= this.gopointDetail[0].str_locn_code;
       this.Switch=this.gopointDetail[0].str_switch_type;
       this.Operating=this.gopointDetail[0].str_stn_code;
    });
  }
  // This method will be called when the date input changes
  
  onDateInputChange(event: any) {
    // Format the date as yyyy-MM-dd and assign it to the inspectionForm property
    this.inspectionForm.inspectionDate = new Date(event.target.value).toISOString().split('T')[0];
  }
  
  onSubmit(formsave:any){
/*     console.log("form save",formsave); */

    Number(formsave.int_tm_opr_completion_without_piece_NR)
    Number(formsave.int_tm_opr_completion_without_piece_RN)
    Number(formsave.int_tm_opr_completion_with_5mm_NR)
    Number(formsave.int_tm_opr_completion_with_5mm_RN)
    const formDataToSubmit = {
      int_point_ID: Number(this.inspectionForm.int_point_ID),
      dt_inspection: this.inspectionForm.inspectionDate
    };
 
    const mergedFormData = { ...formsave, ...formDataToSubmit };
    console.log("Form save", mergedFormData);
    
/*     formsave.append('int_point_ID', this.inspectionForm.int_point_ID);
    formsave.append('dt_inspection', this.inspectionForm.inspectionDate); */
   this.apiService.saveinspectionform(mergedFormData).subscribe(data=>{
    (response:any)=>{
      console.log("Form submitted:",response);
    }
   }); 
  }

  OpenModal(){
    const dialogRef= this.dialog.open(PWaymodalComponent,{
      width: '1500px',
    });
  }

}
