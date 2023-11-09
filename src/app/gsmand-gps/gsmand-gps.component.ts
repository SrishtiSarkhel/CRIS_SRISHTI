import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gsmand-gps',
  templateUrl: './gsmand-gps.component.html',
  styleUrls: ['./gsmand-gps.component.css']
})
export class GsmandGpsComponent {
  gsmform!: FormGroup;
  gspform!: FormGroup;
  qtyOptions: number[] = [1, 2, 3, 4, 5];
  formData:any;
  SubmitEvent:any;

  constructor(public fb: FormBuilder,private apiService: ApiService) {}

  ngOnInit() {
    this.gsmform = this.fb.group({
      int_GSM_antenna_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryGsmFormGroup()])
    });

    this.gspform = this.fb.group({
      int_GPS_antenna_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryGspFormGroup()])
    });

    this.onQtyChange(); // Add entries when the component initializes

    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log("Gsm and gps form",this.formData);
      this.apiService.SaveKavachGsmGpsantenasave(this.formData).subscribe((response: any) => {
        console.log("Form submitted Gsm and gps:", response);
      }); 
    });

    console.log("form Gps dataaaaaa111",this.apiService.GpsData);
    console.log("form Gsm dataaaaaa222",this.apiService.GsmData);
    
    if(this.apiService.GsmData!=undefined){
      this.apiService.getkavachcard(this.apiService.KavachIDdata,'GSM_antenna').subscribe(data =>{
        this.gsmform.get('int_GSM_antenna_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
        // Clear existing entries before populating
        while (this.Gsmentries.length > 0) {
          this.Gsmentries.removeAt(0);
        }
        data.forEach(entryData => {
          const entryFormGroup = this.createEntryGsmFormGroup(); // Create a new form group
          entryFormGroup.patchValue(entryData); // Patch the data into the form group
          this.Gsmentries.push(entryFormGroup); // Add the form group to the form array
        });
        console.log("form value", this.gsmform.value);
        console.log("Gsm get API response", data);
      });
     } 

     if(this.apiService.GpsData!=undefined){
      this.apiService.getkavachcard(this.apiService.KavachIDdata,'GPS_antenna').subscribe(data =>{
        this.gspform.get('int_GPS_antenna_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
        // Clear existing entries before populating
        while (this.Gspentries.length > 0) {
          this.Gspentries.removeAt(0);
        }
        data.forEach(entryData => {
          const entryFormGroup = this.createEntryGspFormGroup(); // Create a new form group
          entryFormGroup.patchValue(entryData); // Patch the data into the form group
          this.Gspentries.push(entryFormGroup); // Add the form group to the form array
        });
        console.log("form value", this.gspform.value);
        console.log("Gsp get API response", data);
      });
     }

 

  }

  ngOnDestroy(){
    if(this.SubmitEvent!=undefined){
      this.SubmitEvent.unsubscribe();
      console.log("EVENT DESTROYED");
    }
  }

  get Gsmentries() {
    return this.gsmform.get('entries') as FormArray;
  }

  get Gspentries() {
    return this.gspform.get('entries') as FormArray;
  }

  onQtyChange() {
   
    const qty = this.gsmform.get('int_GSM_antenna_COUNT')?.value;
    const currentEntries = this.Gsmentries.length;

    if (qty > currentEntries) {
      for (let i = currentEntries; i < qty; i++) {
        (<FormArray>this.gsmform.get('entries')).push(this.createEntryGsmFormGroup());
      }
    } else if (qty < currentEntries) {
      for (let i = currentEntries; i > qty; i--) {
        this.Gsmentries.removeAt(i - 1);
      }
    }

    const qty1 = this.gspform.get('int_GPS_antenna_COUNT')?.value;
    const currentEntries1 = this.Gspentries.length;

    if (qty1 > currentEntries1) {
      for (let i = currentEntries1; i < qty1; i++) {
        (<FormArray>this.gspform.get('entries')).push(this.createEntryGspFormGroup());
      }
    } else if (qty1 < currentEntries1) {
      for (let i = currentEntries1; i > qty1; i--) {
        this.Gspentries.removeAt(i - 1);
      }
    }
  }

  getGsmQuantityArray(): number[] {
    return Array.from({ length: this.gsmform.get('int_GSM_antenna_COUNT')?.value || 0 }, (_, i) => i);
  }

  getGspQuantityArray(): number[] {
    return Array.from({ length: this.gspform.get('int_GPS_antenna_COUNT')?.value || 0 }, (_, i) => i);
  }

  createEntryGsmFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install:[null, Validators.required]
    });
  }

  createEntryGspFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install:[null, Validators.required]
    });
  }

  onSubmitGsm() {
    const entryControls = this.Gsmentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("GSM entries: ", entriesData);
  }

  onSubmitGsp() {
    const entryControls = this.Gspentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("GSP entries: ", entriesData);
    
  }

  onSubmit() {
    const gsmAntennaCount = this.gsmform.get('int_GSM_antenna_COUNT')?.value;
    const gpsAntennaCount = this.gspform.get('int_GPS_antenna_COUNT')?.value;
  
    const gsmEntries = this.Gsmentries.controls.map((control) => control.value);
    const gpsEntries = this.Gspentries.controls.map((control) => control.value);
  
    this.formData = {
      GPS: {
        int_GPS_antenna_COUNT: gpsAntennaCount,
        GPS_antenna: gpsEntries
      },
      GSM: {
        int_GSM_antenna_COUNT: gsmAntennaCount,
        GSM_antenna: gsmEntries
      }
    };

    this.formData.int_kawach_id =this.apiService.KavachIDdata;
    this.apiService.updateGsmData(gsmEntries);
    this.apiService.updateGpsData(gpsEntries);

    console.log("kavach id Gsm and gps: ", this.formData.int_kawach_id);
    console.log("Form Data: ", this.formData);
  }
  
  
}


