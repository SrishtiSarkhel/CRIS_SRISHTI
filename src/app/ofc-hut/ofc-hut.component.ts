import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ofc-hut',
  templateUrl: './ofc-hut.component.html',
  styleUrls: ['./ofc-hut.component.css']
})
export class OfcHutComponent {
  form!: FormGroup;
  qtyOptions: number[] = [1, 2, 3, 4, 5];
  formData:any;
  SubmitEvent:any;

  constructor(private fb: FormBuilder,private apiService: ApiService) {}

  ngOnInit() {
    this.form = this.fb.group({
      int_OFC_HUT_MODEM_COUNT: [1, Validators.required],
      entries: this.fb.array([]) // Initialize with an empty array
    });
  

    this.onQtyChange(); // Add entries when the component initializes
   
    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log("Ofchut form:",this.formData);
      this.apiService.SaveKavachOfchutsave(this.formData).subscribe((response: any) => {
        console.log("Form submitted Ofchutsave:", response);
      }); 
    });

    
    console.log("form Ofc Hut dataaaaaa111",this.apiService.OfcHutData);
    if (this.apiService.OfcHutData != undefined) {
      this.apiService.getkavachcard(this.apiService.KavachIDdata, 'OFC_HUT_MODEM').subscribe(data => {
        this.form.get('int_OFC_HUT_MODEM_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
  
        // Clear existing entries before populating
        while (this.entries.length > 0) {
          this.entries.removeAt(0);
        }
  
        data.forEach(entryData => {
          const entryFormGroup = this.createEntryFormGroup();
          entryFormGroup.patchValue(entryData);
          this.entries.push(entryFormGroup); // Add the form group to the form array
        });
  
        console.log("form value", this.form.value);
        console.log("Ofc hut get API response", data);
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
    const qty = this.form.get('int_OFC_HUT_MODEM_COUNT')?.value;
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
    return Array.from({ length: this.form.get('int_OFC_HUT_MODEM_COUNT')?.value || 0 }, (_, i) => i);
  }

  createEntryFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no:[null,Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required]
    });
  }

  onSubmit() {
    const ofchutmodemcount = this.form.get('int_OFC_HUT_MODEM_COUNT')?.value;
    const entryControls = this.entries.controls; 
    const entriesData = entryControls.map(control => control.value);

   this.formData = {
      OFCHut: {
        int_OFC_HUT_MODEM_COUNT: ofchutmodemcount,
        OFC_HUT_MODEM: entriesData
      }
    }
    this.formData.int_kawach_id =this.apiService.KavachIDdata;
    this.apiService.updateOfcHutData(entriesData);
    console.log("kavach id Ofc-hut: ", this.formData.int_kawach_id);
    console.log("OFC HUT entries: ", this.formData);
  }
}







