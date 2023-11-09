import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-tower-box',
  templateUrl: './tower-box.component.html',
  styleUrls: ['./tower-box.component.css']
})
export class TowerBoxComponent {
  RadioModemform!: FormGroup;
  RadioCommunicationform!: FormGroup;
  Converterform!: FormGroup
  qtyOptions: number[] = [1, 2, 3, 4, 5];
  formData:any;
  SubmitEvent:any;

  constructor(private fb: FormBuilder,private apiService: ApiService) {}

  ngOnInit() {
    this.RadioModemform = this.fb.group({
      int_radio_mod_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryRadioModemform()])
    });

    this.RadioCommunicationform = this.fb.group({
      int_radio_comm_unit_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryRadioCommunicationform()])
    });

    this.Converterform = this.fb.group({
      int_RS485_232_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryConverterform()])
    });

    this.onQtyChange(); 
  
  
    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log(this.formData.int_kawach_id);
      console.log("tower box form",this.formData);
      this.apiService.SaveKavachTowerboxsave(this.formData).subscribe((response: any) => {
        console.log("Form submitted tower box:", response);
      }); 
    });
    
    console.log("form Sm operation dataaaaaa111",this.apiService.TowerBoxData1);
    console.log("form Sm operation dataaaaaa222",this.apiService.TowerBoxData2);
    console.log("form Sm operation dataaaaaa333",this.apiService.TowerBoxData3);

    if(this.apiService.TowerBoxData1!=undefined){
      this.apiService.getkavachcard(this.apiService.KavachIDdata,'radio_mod').subscribe(data =>{
        this.RadioModemform.get('int_radio_mod_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
        // Clear existing entries before populating
        while (this.RadioModementries.length > 0) {
          this.RadioModementries.removeAt(0);
        }
        data.forEach(entryData => {
          const entryFormGroup = this.createEntryRadioModemform(); // Create a new form group
          entryFormGroup.patchValue(entryData); // Patch the data into the form group
          this.RadioModementries.push(entryFormGroup); // Add the form group to the form array
        });
        console.log("form value", this.RadioModemform.value);
        console.log("radio_mod get API response", data);
      });
      }

      if(this.apiService.TowerBoxData2!=undefined){
        this.apiService.getkavachcard(this.apiService.KavachIDdata,'radio_comm_unit').subscribe(data =>{
          this.RadioCommunicationform.get('int_radio_comm_unit_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
          // Clear existing entries before populating
          while (this.RadioCommunicationentries.length > 0) {
            this.RadioCommunicationentries.removeAt(0);
          }
          data.forEach(entryData => {
            const entryFormGroup = this.createEntryRadioCommunicationform(); // Create a new form group
            entryFormGroup.patchValue(entryData); // Patch the data into the form group
            this.RadioCommunicationentries.push(entryFormGroup); // Add the form group to the form array
          });
          console.log("form value", this.RadioCommunicationform.value);
          console.log("radio_comm_unit get API response", data);
        });
        }
        
        if(this.apiService.TowerBoxData3!=undefined){
          this.apiService.getkavachcard(this.apiService.KavachIDdata,'RS485_232').subscribe(data =>{
            this.Converterform.get('int_RS485_232_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
            // Clear existing entries before populating
            while (this.Converterentries.length > 0) {
              this.Converterentries.removeAt(0);
            }
            data.forEach(entryData => {
              const entryFormGroup = this.createEntryRadioCommunicationform(); // Create a new form group
              entryFormGroup.patchValue(entryData); // Patch the data into the form group
              this.Converterentries.push(entryFormGroup); // Add the form group to the form array
            });
            console.log("form value", this.Converterform.value);
            console.log("RS485_232 get API response", data);
          });
          } 


  }

  ngOnDestroy(){
    if(this.SubmitEvent!=undefined){
      this.SubmitEvent.unsubscribe();
      console.log("EVENT DESTROYED");
    }
  }

  get RadioModementries(): FormArray {
    return <FormArray>this.RadioModemform.get('entries');
  }

  get RadioCommunicationentries(): FormArray{
    return <FormArray>this.RadioCommunicationform.get('entries');
  }

  get Converterentries(): FormArray{
    return <FormArray>this.Converterform.get('entries');
  }

  onQtyChange() {
    const qty = this.RadioModemform.get('int_radio_mod_COUNT')?.value;
    const currentEntries = this.RadioModementries.length;

    if (qty > currentEntries) {
      for (let i = currentEntries; i < qty; i++) {
        (<FormArray>this.RadioModemform.get('entries')).push(this.createEntryRadioModemform())
      }
    } else if (qty < currentEntries) {
      for (let i = currentEntries; i > qty; i--) {
        this.RadioModementries.removeAt(i - 1);
      }
    }

    const qty1 = this.RadioCommunicationform.get('int_radio_comm_unit_COUNT')?.value;
    const currentEntries1 = this.RadioCommunicationentries.length;

    if (qty1 > currentEntries1) {
      for (let i = currentEntries1; i < qty1; i++) {
        (<FormArray>this.RadioCommunicationform.get('entries')).push(this.createEntryRadioCommunicationform())
      }
    } else if (qty1 < currentEntries1) {
      for (let i = currentEntries1; i > qty1; i--) {
        this.RadioCommunicationentries.removeAt(i - 1);
      }
    }

    const qty2 = this.Converterform.get('int_RS485_232_COUNT')?.value;
    const currentEntries2 = this.Converterentries.length;

    if (qty2 > currentEntries2) {
      for (let i = currentEntries2; i < qty2; i++) {
        (<FormArray>this.Converterform.get('entries')).push(this.createEntryConverterform())
      }
    } else if (qty2 < currentEntries2) {
      for (let i = currentEntries2; i > qty2; i--) {
        this.Converterentries.removeAt(i - 1);
      }
    }
  }

  getRadioModemQuantityArray(): number[] {
    return Array.from({ length: this.RadioModemform.get('int_radio_mod_COUNT')?.value || 0 }, (_, i) => i);
  }
  getRadioCommunicationQuantityArray(): number[] {
    return Array.from({ length: this.RadioCommunicationform.get('int_radio_comm_unit_COUNT')?.value || 0 }, (_, i) => i);
  }
  getConverterQuantityArray(): number[] {
    return Array.from({ length: this.Converterform.get('int_RS485_232_COUNT')?.value || 0 }, (_, i) => i);
  }

  createEntryRadioModemform():FormGroup {
    return this.fb.group({
      str_kavach_card_sl_no:[null,Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required]
    });
  }
  createEntryRadioCommunicationform(): FormGroup{
    return this.fb.group({
      str_kavach_card_sl_no:[null,Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required]
    });
  }
  createEntryConverterform(): FormGroup{
    return this.fb.group({
      str_kavach_card_sl_no:[null,Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required]
    });
  }

  onSubmitRadioModem() {
    const entryControls = this.RadioModementries.controls; 
    const entriesData = entryControls.map(control => control.value);
  
    console.log("Radio Modem: ", entriesData);
}
  onSubmitRadioCommunication() {
  const entryControls = this.RadioCommunicationentries.controls; 
  const entriesData = entryControls.map(control => control.value);

  console.log("Radio Communication: ", entriesData);
}
  onSubmitConverter() {
  const entryControls = this.Converterentries.controls; 
  const entriesData = entryControls.map(control => control.value);

  console.log("Converter: ", entriesData);
}

onSubmit() {
  const radiomodCount = this.RadioModemform.get('int_radio_mod_COUNT')?.value;
  const radiocommunitCount = this.RadioCommunicationform.get('int_radio_comm_unit_COUNT')?.value;
  const RS485_232_Count = this.Converterform.get('int_RS485_232_COUNT')?.value;

  const RadioModem = this.RadioModementries.controls.map((control) => control.value);
  const RadioCommunication = this.RadioCommunicationentries.controls.map((control) => control.value);
  const Converterform = this.Converterentries.controls.map((control) => control.value);

  this.formData = {
   TowerBoxRadioModem: {
      int_radio_mod_COUNT: radiomodCount,
      radio_mod:RadioModem
    },
    TowerBoxRadioCommunication: {
      int_radio_comm_unit_COUNT: radiocommunitCount,
      radio_comm_unit: RadioCommunication
    },
    TowerBoxConverterform: {
      int_RS485_232_COUNT: RS485_232_Count,
      RS485_232:  Converterform
    }
  };

  this.apiService.updateTowerBoxData1(RadioModem);
  this.apiService.updateTowerBoxData2(RadioCommunication);
  this.apiService.updateTowerBoxData3(Converterform);

  this.formData.int_kawach_id =this.apiService.KavachIDdata;
  console.log("kavach id Tower box: ", this.formData.int_kawach_id);
  console.log("Form Data: ", this.formData);
}



}