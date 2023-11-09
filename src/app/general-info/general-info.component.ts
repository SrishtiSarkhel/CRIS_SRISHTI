import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent {
  myform: FormGroup;
 
  constructor(private fb: FormBuilder,private apiService: ApiService,private datePipe: DatePipe) {
    this.myform = this.fb.group({
      int_asset_code: ['system generated'],
      int_rfid: [''],
      str_rdso_no: ['option1'],
      dbl_lat: ['0'],
      dbl_long: ['0'],
      str_make: [''],
      str_model: [''],
      str_model_type: [''],
      dbl_erthng: [''],
      str_sl_no:[''],
      str_conn_to:[''],
      str_gear_pos:[''],
      dbl_pole_km:[''],
      platform_no:[''],
      po_number:[''],
      dt_mfd:[''],
      dt_purchase:[''],
      dt_install:[''],
      dt_warranty_exp:[''],
      dt_mntnc_strt:[''],    
    });
  }
  
  rdsolist: any[] =[];
  makekavachlist:any[]=[];
  formData:any;
  generalformData:any;

  SubmitEvent:any;
  Kavachdata:any;

  ngOnInit(): void {  
    this.apiService.getRdsoSpec().subscribe(data => {
      console.log('Data from RDSO LIST type:', data); 
      this.rdsolist = data;
    });

 /*    this.myform.value.int_kawach_id = this.apiService.KavachIDdata;
   console.log("myform.value.int_kawach_id",this.myform.value.int_kawach_id) */

    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log("general info form",this.formData); 
       this.apiService.SaveKavachGenralInfo(this.formData).subscribe((response: any) => {
        console.log("Form general info submitted:", response);
        this.Kavachdata = response;
          this.apiService.updateKavachIDData( this.Kavachdata );
          console.log("kawach id reponse ",response);
        /*if(this.formData.int_kawach_id==''){
          this.Kavachdata = response;
          this.apiService.updateKavachIDData( this.Kavachdata );
          console.log("kawach id reponse ",response);
        }*/
     //   this.formData.int_kawach_id= this.Kavachdata;
        console.log("KavachID general info",this.formData.int_kawach_id);
        this.apiService.updateGeneralInfoData(this.formData);
      });
    });

   console.log("form general info dataaaaaa",this.apiService.GeneralInfoData);
   if(this.apiService.GeneralInfoData!=undefined){
    this.apiService.GeneralInfoData.int_kawach_id=this.apiService.KavachIDdata;
    console.log("form dataaaaaa1",this.apiService.GeneralInfoData.int_kawach_id);
    this.apiService.getgeneralinstall(this.apiService.GeneralInfoData.int_kawach_id).subscribe(data =>{
      const formattedData = this.formatDateValues1(data[0]);
      this.myform.patchValue(formattedData);
      console.log("form value",this.myform.value)
      console.log("general get API response", data);
    }); 
    }
  } 
 
  ngOnDestroy(){
    if(this.SubmitEvent!=undefined){
      this.SubmitEvent.unsubscribe();  
      console.log("EVENT DESTROYED");
    }
  }
  
  formatDateValues(data: any): any {
    const formattedData = { ...data };
    // Format dt_mfd, dt_purchase, dt_install, dt_warranty_exp, and dt_mntnc_strt
    formattedData.dt_mfd = this.formatDate(formattedData.dt_mfd);
    formattedData.dt_purchase = this.formatDate(formattedData.dt_purchase);
    formattedData.dt_install = this.formatDate(formattedData.dt_install);
    formattedData.dt_warranty_exp = this.formatDate(formattedData.dt_warranty_exp);
    formattedData.dt_mntnc_strt = this.formatDate(formattedData.dt_mntnc_strt);
    return formattedData;
  }

  formatDateValues1(data: any): any {
    const formattedData1 = { ...data };
    // Format dt_mfd, dt_purchase, dt_install, dt_warranty_exp, and dt_mntnc_strt
    formattedData1.dt_mfd = this.formatTimestamp(formattedData1.dt_mfd);
    formattedData1.dt_purchase = this.formatTimestamp(formattedData1.dt_purchase);
    formattedData1.dt_install = this.formatTimestamp(formattedData1.dt_install);
    formattedData1.dt_warranty_exp = this.formatTimestamp(formattedData1.dt_warranty_exp);
    formattedData1.dt_mntnc_strt = this.formatTimestamp(formattedData1.dt_mntnc_strt);
    console.log("formatted data",formattedData1);
    return formattedData1;
  }

  formatTimestamp(data:any) {
    return this.datePipe.transform(data, 'MM/dd/yyyy');
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      return `${year}/${month}/${day}`;
    }
    return dateString; // Return the original date if parsing fails
  }
  
  
  onOptionsSelected(value:string){
    console.log("the selected value is " + value);
    this.apiService.getMakeforKawach(value).subscribe(data => {
      console.log('Data from Make Kavach List:', data); 
      this.makekavachlist = data;
     });
  }

  onSubmit(){
    this.formData = this.myform.value;
/* 
      this.generalformData = {
      Generalinfo: {
        formData
      } 
  } */

  this.formData.int_kawach_id ='';
  console.log("value check",this.apiService.KavachIDdata);
  if(this.apiService.KavachIDdata != undefined){
    this.formData.int_kawach_id=this.apiService.KavachIDdata;
  }
  console.log("aaaaaaaaaa",this.formData.int_kawach_id)
  

  this.formData= this.formatDateValues(this.myform.value);
  console.log("GENERALINFO",this.formData);
 }
 
}
