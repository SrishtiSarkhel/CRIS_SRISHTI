import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-sm-operation',
  templateUrl: './sm-operation.component.html',
  styleUrls: ['./sm-operation.component.css']
})

export class SmOperationComponent {
  form!: FormGroup;
  qtyOptions: number[] = [1, 2, 3, 4, 5];
  formData:any;
  SubmitEvent:any;
  testData!:any;
  constructor(private fb: FormBuilder,private apiService: ApiService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.form = this.fb.group({
      int_SMOCIP_unit_COUNT: [1, Validators.required],
      entries: this.fb.array([])
    });

    this.onQtyChange(); 

    console.log("SM operation form",this.formData);
     this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log("SM operation form",this.formData);
      this.apiService.SaveKavachSmOperation(this.formData).subscribe((response: any) => {
        console.log("Form submitted:", response);
      }); 
    });

    console.log("form Sm operation dataaaaaa111",this.apiService.SmOperationData);
    if(this.apiService.SmOperationData!=undefined){
    this.apiService.getkavachcard(this.apiService.KavachIDdata,'SMOCIP_unit').subscribe(data =>{
      this.form.get('int_SMOCIP_unit_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control

      // Clear existing entries before populating
      while (this.entries.length > 0) {
        this.entries.removeAt(0);
      }
        // Clear existing entries before populating
       /*  if (this.entries.length > 0) {
          //this.entries.removeAt(0);
          console.log("sss",this.entries.length)
          for (let i = this.entries.length ; i > 0; i--) {
            this.entries.removeAt(i - 1);
          }
        } */
  
      data.forEach(entryData => {
        const entryFormGroup = this.createEntryFormGroup(); // Create a new form group

        const date= this.datePipe.transform(entryData.dt_kawach_card_mfd, 'MM/dd/yyyy');
        const date1 = this.datePipe.transform(entryData.dt_kawach_card_install, 'MM/dd/yyyy');
    
       entryData.dt_kawach_card_mfd = moment(date, 'MM/dd/yyyy');
/*        entryData.dt_kawach_card_install = moment(date1, 'MM/dd/yyyy'); */
       console.log("dateee",entryData.dt_kawach_card_mfd);  
        entryData.dt_kawach_card_mfd = entryData.dt_kawach_card_mfd.format('YYYY-MM-DD');
        console.log("aaaaaaaaaa",  entryData.dt_kawach_card_mfd); 
       
       
        entryFormGroup.patchValue(entryData); // Patch the data into the form group
        this.entries.push(entryFormGroup); // Add the form group to the form array
      });
  
      console.log("form value", this.form.value);
      console.log("Sm operation get API response", data);
      this.testData=data
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
    return <FormArray>this.form.get('entries');
  }

  onQtyChange() {
    const qty = this.form.get('int_SMOCIP_unit_COUNT')?.value;
    const currentEntries = this.entries.length;
    console.log("current entriess",currentEntries)
    if (qty > currentEntries) {
      for (let i = currentEntries; i < qty; i++) {
        (<FormArray>this.form.get('entries')).push(this.createEntryFormGroup())
      }
    } else if (qty < currentEntries) {
      for (let i = currentEntries; i > qty; i--) {
        this.entries.removeAt(i - 1);
      }
    }
  }

  getQuantityArray(): number[] {
    return Array.from({ length: this.form.get('int_SMOCIP_unit_COUNT')?.value || 0 },(_, i) => i);
  }

  createEntryFormGroup() {
    return this.fb.group({
    str_kavach_card_sl_no:[null, Validators.required],
    dt_kawach_card_mfd:[null, Validators.required],
    dt_kawach_card_install:[null,Validators.required],
    str_kawach_card_make: [null,Validators.required],
    int_kawach_card_ps: [null, Validators.required]
    });
  }

  onSubmit() {
    const smocipunitCount= this.form.get('int_SMOCIP_unit_COUNT')?.value;
    const entryControls = this.entries.controls; 
    const entriesData = entryControls.map(control => control.value);
     this.formData = {
      SMoperation_indPanel: {
        int_SMOCIP_unit_COUNT: smocipunitCount,
        SMOCIP_unit: entriesData 
      }
    }
    this.formData.int_kawach_id =this.apiService.KavachIDdata;
      console.log("entiresss data",entriesData);
      this.apiService.updateSmOperationData(entriesData);
    console.log("kavach id Sm operation: ", this.formData.int_kawach_id);
    console.log("SM entries: ", this.formData);
  }

  
}
