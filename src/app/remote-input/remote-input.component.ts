import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-remote-input',
  templateUrl: './remote-input.component.html',
  styleUrls: ['./remote-input.component.css']
})
export class RemoteInputComponent {
  Powersupplyform!: FormGroup;
  VitalInputform!: FormGroup;
  SMOFCform!: FormGroup;
  RIUBatteryform!: FormGroup;
  Batteriesform!: FormGroup;
  qtyOptions: number[] = [1, 2, 3, 4, 5];
  formData:any;
  SubmitEvent:any;

  constructor(public fb: FormBuilder,private apiService: ApiService) {}

  ngOnInit() {

    this.Powersupplyform = this.fb.group({
      int_remote_io_pwr_crd_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryPowersupplyFormGroup()])
    });

    this.VitalInputform= this.fb.group({
      int_remote_io_vital_crd_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryVitalInputformFormGroup()])
    });

    this.SMOFCform = this.fb.group({
      int_remote_io_smofc_modem_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntrySMOFCFormGroup()])
    });

    this.RIUBatteryform = this.fb.group({
      int_remote_io_riu_btry_chrg_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryRIUBatteryFormGroup()])
    });

    this.Batteriesform = this.fb.group({
      int_remote_io_riu_btry_12v_42ah_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryBatteriesFormGroup()])
    });

    this.onQtyChange(); // Add entries when the component initializes

    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log("remote input form",this.formData);
      this.apiService.SaveKavachRemoteinputsave (this.formData).subscribe((response: any) => {
        console.log("Form submitted remote input:", response);
      }); 
    });

    
    console.log("form Remote Input1 dataaaaaa",this.apiService.RemoteInput1);
    console.log("form Remote Input2 dataaaaaa",this.apiService.RemoteInput2);
    console.log("form Remote Input3 dataaaaaa",this.apiService.RemoteInput3);
    console.log("form Remote Input4 dataaaaaa",this.apiService.RemoteInput4);
    console.log("form Remote Input5 dataaaaaa",this.apiService.RemoteInput5);
  

    if(this.apiService.RemoteInput1!=undefined){
      this.apiService.getkavachcard(this.apiService.KavachIDdata,'pwr_crd').subscribe(data =>{
        this.Powersupplyform.get('int_remote_io_pwr_crd_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
        // Clear existing entries before populating
        while (this.Powersupplyentries.length > 0) {
          this.Powersupplyentries.removeAt(0);
        }
        data.forEach(entryData => {
          const entryFormGroup = this.createEntryPowersupplyFormGroup(); // Create a new form group
          entryFormGroup.patchValue(entryData); // Patch the data into the form group
          this.Powersupplyentries.push(entryFormGroup); // Add the form group to the form array
        });
        console.log("form value", this.Powersupplyform.value);
        console.log("pwr_crd  get API response", data);
      });
      }
     
      if(this.apiService.RemoteInput2!=undefined){
        this.apiService.getkavachcard(this.apiService.KavachIDdata,'vital_crd').subscribe(data =>{
          this.VitalInputform.get('int_remote_io_vital_crd_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
          // Clear existing entries before populating
          while (this.VitalInputentries.length > 0) {
            this.VitalInputentries.removeAt(0);
          }
          data.forEach(entryData => {
            const entryFormGroup = this.createEntryVitalInputformFormGroup(); // Create a new form group
            entryFormGroup.patchValue(entryData); // Patch the data into the form group
            this.VitalInputentries.push(entryFormGroup); // Add the form group to the form array
          });
          console.log("form value", this.VitalInputform.value);
          console.log("vital_crd get API response", data);
        });
        }
        
        if(this.apiService.RemoteInput3!=undefined){
          this.apiService.getkavachcard(this.apiService.KavachIDdata,'smofc_modem').subscribe(data =>{
            this.SMOFCform.get('int_remote_io_smofc_modem_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
            // Clear existing entries before populating
            while (this.SMOFCentries.length > 0) {
              this.SMOFCentries.removeAt(0);
            }
            data.forEach(entryData => {
              const entryFormGroup = this.createEntrySMOFCFormGroup(); // Create a new form group
              entryFormGroup.patchValue(entryData); // Patch the data into the form group
              this.SMOFCentries.push(entryFormGroup); // Add the form group to the form array
            });
            console.log("form value", this.SMOFCform.value);
            console.log("smofc_modem get API response", data);
          });
          }
        
          if(this.apiService.RemoteInput4!=undefined){
            this.apiService.getkavachcard(this.apiService.KavachIDdata,'riu_btry_chrg').subscribe(data =>{
              this.RIUBatteryform.get('int_remote_io_riu_btry_chrg_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
              // Clear existing entries before populating
              while (this.RIUBatteryentries.length > 0) {
                this.RIUBatteryentries.removeAt(0);
              }
              data.forEach(entryData => {
                const entryFormGroup = this.createEntryRIUBatteryFormGroup(); // Create a new form group
                entryFormGroup.patchValue(entryData); // Patch the data into the form group
                this.RIUBatteryentries.push(entryFormGroup); // Add the form group to the form array
              });
              console.log("form value", this.RIUBatteryform.value);
              console.log("riu_btry_chrg get API response", data);
            });
            }
            
            if(this.apiService.RemoteInput5!=undefined){
              this.apiService.getkavachcard(this.apiService.KavachIDdata,'btry_12v_42ah').subscribe(data =>{
                this.Batteriesform.get('int_remote_io_riu_btry_12v_42ah_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
                // Clear existing entries before populating
                while (this.Batteriesentries.length > 0) {
                  this.Batteriesentries.removeAt(0);
                }
                data.forEach(entryData => {
                  const entryFormGroup = this.createEntryBatteriesFormGroup(); // Create a new form group
                  entryFormGroup.patchValue(entryData); // Patch the data into the form group
                  this.Batteriesentries.push(entryFormGroup); // Add the form group to the form array
                });
                console.log("form value", this.Batteriesform.value);
                console.log("btry_12v_42ah get API response", data);
              });
              }
  }


  get Powersupplyentries() {
    return this.Powersupplyform .get('entries') as FormArray;
  }

   get VitalInputentries() {
    return this.VitalInputform.get('entries') as FormArray;
  }

  get SMOFCentries() {
    return this.SMOFCform.get('entries') as FormArray;
  }

  get RIUBatteryentries() {
    return this.RIUBatteryform .get('entries') as FormArray;
  }

  get Batteriesentries() {
    return this.Batteriesform.get('entries') as FormArray;
  }

  onQtyChange() {

    const qty1 = this.Powersupplyform .get('int_remote_io_pwr_crd_COUNT')?.value;
    const currentEntries1 = this.Powersupplyentries.length;
    if (qty1 > currentEntries1) {
      for (let i = currentEntries1; i < qty1; i++) {
        this.Powersupplyentries.push(this. createEntryPowersupplyFormGroup());
      }
    } else if (qty1 < currentEntries1) {
      for (let i = currentEntries1; i > qty1; i--) {
        this.Powersupplyentries.removeAt(i - 1);
      }
    }

    const qty2 = this.VitalInputform.get('int_remote_io_vital_crd_COUNT')?.value;
    const currentEntries2 = this.VitalInputentries.length;
    if (qty2 > currentEntries2) {
      for (let i = currentEntries2; i < qty2; i++) {
        this.VitalInputentries.push(this.createEntryVitalInputformFormGroup());
      }
    } else if (qty2 < currentEntries2) {
      for (let i = currentEntries2; i > qty2; i--) {
        this.VitalInputentries.removeAt(i - 1);
      }
    }

     const qty3 = this.SMOFCform.get('int_remote_io_smofc_modem_COUNT')?.value;
    const currentEntries3 = this.SMOFCentries.length;
    if (qty3 > currentEntries3) {
      for (let i = currentEntries3; i < qty3; i++) {
        this.SMOFCentries.push(this.createEntrySMOFCFormGroup());
      }
    } else if (qty3 < currentEntries3) {
      for (let i = currentEntries3; i > qty3; i--) {
        this.SMOFCentries.removeAt(i - 1);
      }
    }

    const qty4 = this.RIUBatteryform .get('int_remote_io_riu_btry_chrg_COUNT')?.value;
    const currentEntries4 = this.RIUBatteryentries.length;
    if (qty4 > currentEntries4) {
      for (let i = currentEntries4; i < qty4; i++) {
        this.RIUBatteryentries.push(this.createEntryRIUBatteryFormGroup());
      }
    } else if (qty4 < currentEntries4) {
      for (let i = currentEntries4; i > qty4; i--) {
        this.RIUBatteryentries.removeAt(i - 1);
      }
      console.log("int_remote_io_riu_btry_chrg_COUNT",qty4)
    }

    const qty5 = this.Batteriesform.get('int_remote_io_riu_btry_12v_42ah_COUNT')?.value;
    const currentEntries5 = this.Batteriesentries.length;
    if (qty5 > currentEntries5) {
      for (let i = currentEntries5; i < qty5; i++) {
        this.Batteriesentries.push(this.createEntryBatteriesFormGroup());
      }
    } else if (qty5< currentEntries5) {
      for (let i = currentEntries5; i > qty5; i--) {
        this.Batteriesentries.removeAt(i - 1);
      }
      console.log("int_remote_io_riu_btry_12v_42ah_COUNT",qty5)
    }   
  }

  ngOnDestroy(){
    if(this.SubmitEvent!=undefined){
      this.SubmitEvent.unsubscribe();  
      console.log("EVENT DESTROYED");
    }
  }

  getPowersupplyQuantityArray(): number[] {
    return Array.from({ length: this.Powersupplyform.get('int_remote_io_pwr_crd_COUNT')?.value || 0 }, (_, i) => i);
  }

  getVitalInputQuantityArray(): number[] {
    return Array.from({ length: this.VitalInputform.get('int_remote_io_vital_crd_COUNT')?.value || 0 }, (_, i) => i);
  }

  getSMOFCformQuantityArray(): number[] {
    return Array.from({ length: this.SMOFCform.get('int_remote_io_smofc_modem_COUNT')?.value || 0 }, (_, i) => i);
  }

  getRIUBatteryformQuantityArray(): number[] {
    return Array.from({ length: this.RIUBatteryform.get('int_remote_io_riu_btry_chrg_COUNT')?.value || 0 }, (_, i) => i);
  }

  getBatteriesformQuantityArray(): number[] {
    return Array.from({ length: this.Batteriesform.get('int_remote_io_riu_btry_12v_42ah_COUNT')?.value || 0 }, (_, i) => i);
  }


  createEntryPowersupplyFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install:[null, Validators.required]
    });
  }

  createEntryVitalInputformFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install:[null, Validators.required]
    });
  }

  createEntrySMOFCFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install:[null, Validators.required]
    });
  }

  createEntryRIUBatteryFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install:[null, Validators.required]
    });
  }

  createEntryBatteriesFormGroup() {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install:[null, Validators.required]
    });
  }

  onSubmitPowersupply(){
    const entryControls = this.Powersupplyentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Powersupply entries: ", entriesData);
  }

  onSubmitVitalInput(){
    const entryControls = this.VitalInputentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Vital Input entries: ", entriesData);
  }

   onSubmitSMOFC(){
    const entryControls = this.SMOFCentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("SMOFC entries: ", entriesData);
  }

  onSubmitRIUBattery(){
    const entryControls = this.RIUBatteryentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("RIUBattery entries: ", entriesData);
  }

  onSubmitBatteries(){
    const entryControls = this.Batteriesentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Batteries entries: ", entriesData);
  }

  onSubmit() {
    const remoteiopwrcrdCount = this.Powersupplyform.get('int_remote_io_pwr_crd_COUNT')?.value;
    const remoteiovitalcrdCount = this.VitalInputform.get('int_remote_io_vital_crd_COUNT')?.value;
    const remoteiosmofcmodemCount = this.SMOFCform.get('int_remote_io_smofc_modem_COUNT')?.value;
    const remoteioriubtrychrgCount = this.RIUBatteryform.get('int_remote_io_riu_btry_chrg_COUNT')?.value;
    const remoteioriubtry12v42ahCount = this.Batteriesform.get('int_remote_io_riu_btry_12v_42ah_COUNT')?.value;
  
    console.log("bbbbbbbbbb count",remoteioriubtry12v42ahCount)
    const PowersupplyEntries = this.Powersupplyentries.controls.map((control) => control.value);
    const VitalInputEntries = this.VitalInputentries.controls.map((control) => control.value);
    const SMOFCEntries = this.SMOFCentries.controls.map((control) => control.value);
    const RIUBatteryEntries = this.RIUBatteryentries.controls.map((control) => control.value);
    const BatteriesEntries = this.Batteriesentries.controls.map((control) => control.value);
    


    console.log("aaaaaaaaaaaaaaaaaaa",BatteriesEntries);
    this.formData = {
      RemoteInputPowersupply: {
        int_remote_io_pwr_crd_COUNT:  remoteiopwrcrdCount,
        pwr_crd: PowersupplyEntries
      },
      RemoteInputVitalInput: {
        int_remote_io_vital_crd_COUNT: remoteiovitalcrdCount,
        vital_crd: VitalInputEntries
      },
      RemoteInputSMOFC: {
        int_remote_io_smofc_modem_COUNT: remoteiosmofcmodemCount,
        smofc_modem: SMOFCEntries
      },
      RemoteInputRIUBattery: {
        int_remote_io_riu_btry_chrg_COUNT:remoteioriubtrychrgCount,
        riu_btry_chrg: RIUBatteryEntries
      },
      RemoteInputBatteries: {
        int_remote_io_riu_btry_12v_42ah_COUNT:remoteioriubtry12v42ahCount,
        btry_12v_42ah:BatteriesEntries
      }
    };

    this.formData.int_kawach_id =this.apiService.KavachIDdata;
    this.apiService.updateRemoteInput1(this.Powersupplyentries);
    this.apiService.updateRemoteInput2(this.VitalInputentries);
    this.apiService.updateRemoteInput3(this.SMOFCentries);
    this.apiService.updateRemoteInput4(this.RIUBatteryentries);
    this.apiService.updateRemoteInput5(this.Batteriesentries);

    console.log("kavach id remote input: ", this.formData.int_kawach_id);
    console.log("Form Data: ", this.formData);
  }


}
