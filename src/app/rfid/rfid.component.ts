import { Component } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-rfid',
  templateUrl: './rfid.component.html',
  styleUrls: ['./rfid.component.css']
})
export class RfidComponent {
  
  @Component({
    selector: 'app-remote-unit',
    templateUrl: './remote-unit.component.html',
    styleUrls: ['./remote-unit.component.css']
  })
  
      form!: FormGroup;
      qtyOptions: number[] = [1, 2, 3, 4, 5];
      formData:any;
      SubmitEvent:any;
    
      constructor(private fb: FormBuilder,private apiService: ApiService) {}
    
      ngOnInit() {
        this.form = this.fb.group({
          int_rfid_COUNT: [1, Validators.required],
          entries: this.fb.array([this.createEntryFormGroup()])
        });
    
        this.onQtyChange(); // Add entries when the component initializes

        this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
          this.onSubmit();
          console.log("Rfid form",this.formData);
          this.apiService.SaveKavachRfidsave(this.formData).subscribe((response: any) => {
            console.log("Form submitted Rfid:", response);
            this.apiService.updateRfidData(this.formData);
          }); 
        });
       
        console.log("form RFID dataaaaaa",this.apiService.RfidData);
        if(this.apiService.RfidData!=undefined){
        this.apiService.getRfidkavachcard(this.apiService.RfidData.int_kawach_id).subscribe(data =>{
          this.form.get('int_rfid_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control

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
          console.log("RFID get API response", data);
        });
        }
      }

      ngOnDestroy(){
        if(this.SubmitEvent!=undefined){
          this.SubmitEvent.unsubscribe();
          console.log("EVENT DESTROYED");
        }
      }
    
      get entries(): FormArray {
        return <FormArray>this.form.get('entries');
      }

      onQtyChange() {
        const qty = this.form.get('int_rfid_COUNT')?.value;
        const currentEntries = this.entries.length;
    
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
        return Array.from({ length: this.form.get('int_rfid_COUNT')?.value || 0 }, (_, i) => i);
      }
    
      createEntryFormGroup() {
        return this.fb.group({
          str_rfid_tag_no: [null,Validators.required],
          str_rfid_type_tag: [null,Validators.required],
          str_rfid_road_no: [null,Validators.required],
          str_rfid_tag_loc:[null,Validators.required]
        });
      }
    
      onSubmit() {
        const rfidCount = this.form.get('int_rfid_COUNT')?.value;
          const entryControls = this.entries.controls; 
          const entriesData = entryControls.map(control => control.value);
          this.entries.push(this.createEntryFormGroup());
         this.formData = {
            RFID: {
              int_rfid_COUNT:rfidCount,
              rfid: entriesData
            },
      }
      this.formData.int_kawach_id =this.apiService.KavachIDdata;
      console.log("kavach id Ofc-hut: ", this.formData.int_kawach_id);
      console.log("RFID entries: ", this.formData);
   }

}