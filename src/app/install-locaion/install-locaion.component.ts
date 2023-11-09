import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-install-locaion',
  templateUrl: './install-locaion.component.html',
  styleUrls: ['./install-locaion.component.css']
})
export class InstallLocaionComponent {
  form2: FormGroup; // Create a FormGroup for form2
  SubmitEvent:any;
  formData:any;
  KavachID:any; 
  zonelist:any[];
  divisionlist:any[];
  
  constructor(private fb: FormBuilder,private apiService: ApiService) {
    this.form2 = this.fb.group({
      // Define your form controls here
      str_zone_code: [''],
      str_div_code: [''],
      str_sec_code: [''],
      str_loc_type: [''],
      str_locn: [''],
      int_route: [''],
      int_codal_life: ['']
    });
  }
 
  ngOnInit(): void {  

    this.apiService.getZone().subscribe(data=>{
      console.log('Data for dropdown of Zone:',data);
      this.zonelist=data;
     })
     
    
   // this.form2.value.int_kawach_id =this.apiService.KavachIDdata;
    console.log("instal kavach id",this.form2.value.int_kawach_id);
    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
     this.onSubmit();
      console.log("install loc form",this.formData); 

       this.apiService.SaveInstallLocation(this.formData).subscribe((response: any) => {
        console.log("Form  install loc submitted:", response);
/*       this.KavachID = response;
        this.apiService.updateKavachIDData(this.KavachID);
        this.form2.value.int_kawach_id=this.KavachID;  */
        console.log("KavachID install",this.form2.value.int_kawach_id);
        this.apiService.updateInstallLocoData(this.formData);
      });
    });
     
    console.log("form install location dataaaaaa",this.apiService.InstallLocData);
    if(this.apiService.InstallLocData!=undefined){
      this.apiService.InstallLocData.int_kawach_id=this.apiService.KavachIDdata;
      console.log("form dataaaaaa1",this.apiService.GeneralInfoData.int_kawach_id);
    this.apiService.getgeneralinstall(this.apiService.InstallLocData.int_kawach_id).subscribe(data =>{
      this.form2.patchValue(data[0]); 
      this.apiService.getDivision(data[0].str_zone_code).subscribe(data=>{
        console.log('Data from Division api:',data);
        this.divisionlist=data;
      })
      // Use patchValue to update only the provided fields
      console.log("form value",this.form2.value)
      console.log("install location get API response", data);
    }); 
  }

} 

ngOnDestroy(){
  if(this.SubmitEvent!=undefined){
    this.SubmitEvent.unsubscribe();  
    console.log("EVENT DESTROYED");
  }
}

onZoneSelected(value:string){
  console.log("the selected zone is " + value);
  this.apiService.getDivision(value).subscribe(data=>{
    console.log('Data from Division api:',data);
    this.divisionlist=data;
  })
 }
onSubmit(){
  this.form2.value.int_kawach_id =this.apiService.KavachIDdata;
  console.log("install submit id",this.form2.value.int_kawach_id )
  this.formData = this.form2.value;
  console.log("SAVE FUNCTION CALLED");
  console.log(this.formData);
 }
}
