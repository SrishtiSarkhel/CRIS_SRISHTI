import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-station-antenna',
  templateUrl: './station-antenna.component.html',
  styleUrls: ['./station-antenna.component.css']
})
export class StationAntennaComponent {
  form!: FormGroup;
  qtyOptions: number[] = [1, 2, 3, 4, 5];
  formData:any;
  SubmitEvent:any;

  constructor(private fb: FormBuilder,private apiService: ApiService) {}

  ngOnInit() {
    this.form = this.fb.group({
      int_stn_antenna_COUNT: [1, Validators.required],
      entries: this.fb.array([])
    });

    this.onQtyChange(); 

    
    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log("Station antena form: ",this.formData);
      this.apiService.SaveKavachStationantenasave(this.formData).subscribe((response: any) => {
        console.log("Form submitted Station antena:", response);
        this.apiService.updateStationAntennaData(this.formData);
      }); 
    });
    
  console.log("form StationAntenna dataa",this.apiService.StationAntennaData);
  if(this.apiService.StationAntennaData!=undefined){
    this.apiService.getStationAntennakavachcard(this.apiService.StationAntennaData.int_kawach_id).subscribe(data =>{
      this.form.get('int_stn_antenna_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control

      // Clear existing entries before populating
      while (this.entries.length > 0) {
        this.entries.removeAt(0);
      }
  
      data.forEach(entryData => {
        const entryFormGroup = this.createEntryFormGroup(); // Create a new form group
        entryFormGroup.patchValue(entryData); // Patch the data into the form group
        this.entries.push(entryFormGroup); // Add the form group to the form array
      });
  
      console.log("form value", this.form.value);
      console.log("Station antena get API response", data);
    });
  }
  }

  ngOnDestroy(){
    if(this.SubmitEvent!=undefined){
      this.SubmitEvent.unsubscribe();
      console.log("EVENT DESTROYED");
    }
  }
  
  

  get entries() {
    return this.form.get('entries') as FormArray;
  }

  onQtyChange() {
    const qty = this.form.get('int_stn_antenna_COUNT')?.value;
    const currentEntries = this.entries.length;

    if (qty > currentEntries) {
      for (let i = currentEntries; i < qty; i++) {
        this.entries.push(this.createEntryFormGroup());
      }
    } else if (qty < currentEntries) {
      for (let i = currentEntries; i > qty; i--) {
        this.entries.removeAt(i - 1);
      }
    }
  }

  getQuantityArray(): number[] {
    return Array.from({ length: this.form.get('int_stn_antenna_COUNT')?.value || 0 }, (_, i) => i);
  }

  createEntryFormGroup() {
    return this.fb.group({
    int_stn_antenna_freq_band: [null, Validators.required],
    int_stn_antenna_ip_impd: [null, Validators.required],
    int_stn_antenna_gain: [null, Validators.required],
    int_stn_antenna_polar: [null, Validators.required]
    });
  }

  onSubmit() {
    const stnantenna = this.form.get('int_stn_antenna_COUNT')?.value;
    const entryControls = this.entries.controls; 
    const entriesData = entryControls.map(control => control.value);
    this.formData = {
      StationAntena: {
        int_stn_antenna_COUNT: stnantenna,
        stn_antenna: entriesData
      },
    };
    this.formData.int_kawach_id =this.apiService.KavachIDdata;
    console.log("kavach id Station Antenna: ", this.formData.int_kawach_id);
    console.log("Statio Antenna entries: ", this.formData);
}
}


