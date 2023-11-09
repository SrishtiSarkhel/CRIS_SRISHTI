import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-station-tcas',
  templateUrl: './station-tcas.component.html',
  styleUrls: ['./station-tcas.component.css']
})
export class StationTcasComponent {
  PowerSupplyform!: FormGroup;
  stcasModemform!: FormGroup;
  VitalComputerform!: FormGroup;
  Communicationform!: FormGroup;
  EventLoggerform!: FormGroup;
  VitalInputform!: FormGroup;
  Modemform!: FormGroup;
  qtyOptions: number[] = [1, 2, 3, 4, 5];
  qtyOptions1: number[] = Array.from({ length: 32 }, (_, i) => i + 1);
  SubmitEvent:any;
  formData:any;
  kavachidData:any;

  constructor(public fb: FormBuilder,private apiService: ApiService) {}

  ngOnInit() {
    this.PowerSupplyform = this.fb.group({
      int_STCAS_ps_card_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryPowerSupply()]),
    });

    this.stcasModemform = this.fb.group({
      int_STCAS_modem_card_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntrystcasModem()]),
    });

    this.VitalComputerform = this.fb.group({
      int_vital_comp_card_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryVitalComputer()]),
    });

    this.Communicationform = this.fb.group({
      int_comm_intr_mod_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryCommunication()]),
    });

    this.EventLoggerform = this.fb.group({
      int_event_logger_mod_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryEventLogger()]),
    });

    this.VitalInputform = this.fb.group({
      int_vital_ip_card_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryVitalInput()]),
    });

    this.Modemform = this.fb.group({
      int_modem_COUNT: [1, Validators.required],
      entries: this.fb.array([this.createEntryModem()]),
    });

    this.onQtyChange();
    
    console.log("SATATION TACASSSSSS",this.formData);
    this.SubmitEvent= this.apiService.submitAction.subscribe(() => {
      this.onSubmit();
      console.log("STATION TACASSSSSS form",this.formData);
      this.apiService.SaveKavachStcas(this.formData).subscribe((response: any) => {
        console.log("Form submitted:", response);
      }); 
    });

    this.kavachidData=this.apiService.KavachIDdata;
    this.apiService.getkavachcard(this.kavachidData,'STCAS_ps_card').subscribe(data => {
      console.log('Data from power supply type1:', data); 
      this.PowerSupplyform.patchValue(data);
      console.log("form value",this.PowerSupplyform.value)
      console.log("STCAS power supply get API response", data);
    });
  
    console.log("form StcasData1  dataaaaaa",this.apiService.StcasData1);
    console.log("form StcasData2 dataaaaaa",this.apiService.StcasData2);
    console.log("form StcasData3 dataaaaaa",this.apiService.StcasData3);
    console.log("form StcasData4 dataaaaaa",this.apiService.StcasData4);
    console.log("form StcasData5 dataaaaaa",this.apiService.StcasData5);
    console.log("form StcasData6 dataaaaaa",this.apiService.StcasData6);
    console.log("form StcasData7 dataaaaaa",this.apiService.StcasData7);
    
    if(this.apiService.StcasData1!=undefined){
      this.apiService.getkavachcard(this.apiService.KavachIDdata,'STCAS_ps_card').subscribe(data =>{
        this.PowerSupplyform.get('int_STCAS_ps_card_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
        // Clear existing entries before populating
        while (this.PowerSupplyentries.length > 0) {
          this.PowerSupplyentries.removeAt(0);
        }
        data.forEach(entryData => {
          const entryFormGroup = this. createEntryPowerSupply(); // Create a new form group
         entryFormGroup.patchValue(entryData);  // Patch the data into the form group
          this.PowerSupplyentries.push(entryFormGroup); // Add the form group to the form array
        });
        console.log("form value", this.PowerSupplyform.value);
        console.log("STCAS_ps_card get API response", data);
      });
      
        this.apiService.getkavachcard(this.apiService.KavachIDdata,'STCAS_modem_card').subscribe(data =>{
          this.stcasModemform.get('int_STCAS_modem_card_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
          // Clear existing entries before populating
          while (this.stcasModementries.length > 0) {
            this.stcasModementries.removeAt(0);
          }
          data.forEach(entryData => {
            const entryFormGroup = this.createEntrystcasModem(); // Create a new form group
            entryFormGroup.patchValue(entryData); // Patch the data into the form group
            this.stcasModementries.push(entryFormGroup); // Add the form group to the form array
          });
          console.log("form value", this.stcasModemform.value);
          console.log("STCAS_modem_card get API response", data);
        });
        
          this.apiService.getkavachcard(this.apiService.KavachIDdata,'vital_comp_card ').subscribe(data =>{
            this.VitalComputerform.get('int_vital_comp_card_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
            // Clear existing entries before populating
            while (this.VitalComputerentries.length > 0) {
              this.VitalComputerentries.removeAt(0);
            }
            data.forEach(entryData => {
              const entryFormGroup = this.createEntryVitalComputer(); // Create a new form group
              entryFormGroup.patchValue(entryData); // Patch the data into the form group
              this.VitalComputerentries.push(entryFormGroup); // Add the form group to the form array
            });
            console.log("form value", this.VitalComputerform.value);
            console.log("vital_comp_card  get API response", data);
          });

            this.apiService.getkavachcard(this.apiService.KavachIDdata,'comm_intr_mod').subscribe(data =>{
              this.Communicationform.get('int_comm_intr_mod_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
              // Clear existing entries before populating
              while (this.Communicationentries.length > 0) {
                this.Communicationentries.removeAt(0);
              }
              data.forEach(entryData => {
                const entryFormGroup = this.createEntryCommunication(); // Create a new form group
                entryFormGroup.patchValue(entryData); // Patch the data into the form group
                this.Communicationentries.push(entryFormGroup); // Add the form group to the form array
              });
              console.log("form value", this.Communicationform.value);
              console.log("comm_intr_mod get API response", data);
            });
   
      this.apiService.getkavachcard(this.apiService.KavachIDdata,'event_logger_mod').subscribe(data =>{
        this.EventLoggerform.get('int_event_logger_mod_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
        // Clear existing entries before populating
        while (this.EventLoggerentries.length > 0) {
          this.EventLoggerentries.removeAt(0);
        }
        data.forEach(entryData => {
          const entryFormGroup = this.createEntryEventLogger(); // Create a new form group
          entryFormGroup.patchValue(entryData); // Patch the data into the form group
          this.EventLoggerentries.push(entryFormGroup); // Add the form group to the form array
        });
        console.log("form value", this.EventLoggerform.value);
        console.log("event_logger_mod get API response", data);
        });

          this.apiService.getkavachcard(this.apiService.KavachIDdata,'vital_ip_card').subscribe(data =>{
            this.VitalInputform.get('int_vital_ip_card_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
            // Clear existing entries before populating
            while (this.VitalInputentries.length > 0) {
              this.VitalInputentries.removeAt(0);
            }
            data.forEach(entryData => {
              const entryFormGroup = this.createEntryVitalInput(); // Create a new form group
              entryFormGroup.patchValue(entryData); // Patch the data into the form group
              this.VitalInputentries.push(entryFormGroup); // Add the form group to the form array
            });
            console.log("form value", this.VitalInputform.value);
            console.log("vital_ip_card get API response", data);
          });
          

        
            this.apiService.getkavachcard(this.apiService.KavachIDdata,'modem').subscribe(data =>{
              this.Modemform.get('int_modem_COUNT')?.setValue(data.length); // Update the 'int_rfid_COUNT' control
              // Clear existing entries before populating
              while (this.Modementries.length > 0) {
                this.Modementries.removeAt(0);
              }
              data.forEach(entryData => {
                const entryFormGroup = this.createEntryModem(); // Create a new form group
                entryFormGroup.patchValue(entryData); // Patch the data into the form group
                this.Modementries.push(entryFormGroup); // Add the form group to the form array
              });
              console.log("form value", this.Modemform.value);
              console.log("modem_card get API response", data);
            });
          }            
  }

  ngOnDestroy(){
    if(this.SubmitEvent!=undefined){
      this.SubmitEvent.unsubscribe();  
      console.log("EVENT DESTROYED");
    }
  }

  get PowerSupplyentries(): FormArray {
    return <FormArray>this.PowerSupplyform.get('entries');
  }

  get stcasModementries(): FormArray {
    return <FormArray>this.stcasModemform.get('entries');
  }

  get VitalComputerentries(): FormArray {
    return <FormArray>this.VitalComputerform.get('entries');
  }

  get Communicationentries(): FormArray {
    return <FormArray>this.Communicationform.get('entries');
  }

  get EventLoggerentries(): FormArray {
    return <FormArray>this.EventLoggerform.get('entries');
  }

  get VitalInputentries(): FormArray {
    return <FormArray>this.VitalInputform.get('entries');
  }

  get Modementries(): FormArray {
    return <FormArray>this.Modemform.get('entries');
  }


  onQtyChange() {
    const qty = this.PowerSupplyform.get('int_STCAS_ps_card_COUNT')?.value;
    const currentEntries = this.PowerSupplyentries.length;

    if (qty > currentEntries) {
      for (let i = currentEntries; i < qty; i++) {
        (<FormArray>this.PowerSupplyform.get('entries')).push(this.createEntryPowerSupply());
      }
    } else if (qty < currentEntries) {
      for (let i = currentEntries; i > qty; i--) {
        this.PowerSupplyentries.removeAt(i - 1);
      }
    }

    const qty1 = this.stcasModemform.get('int_STCAS_modem_card_COUNT')?.value;
    const currentEntries1 = this.stcasModementries.length;

    if (qty1 > currentEntries1) {
      for (let i = currentEntries1; i < qty1; i++) {
        (<FormArray>this.stcasModemform.get('entries')).push(this.createEntrystcasModem());
      }
    } else if (qty1 < currentEntries1) {
      for (let i = currentEntries1; i > qty1; i--) {
        this.stcasModementries.removeAt(i - 1);
      }
    }

    const qty2 = this.VitalComputerform.get('int_vital_comp_card_COUNT')?.value;
    const currentEntries2 = this.VitalComputerentries.length;

    if (qty2 > currentEntries2) {
      for (let i = currentEntries2; i < qty2; i++) {
        (<FormArray>this.VitalComputerform.get('entries')).push(this.createEntryVitalComputer());
      }
    } else if (qty2 < currentEntries2) {
      for (let i = currentEntries2; i > qty2; i--) {
        this.VitalComputerentries.removeAt(i - 1);
      }
    }

    const qty3 = this.Communicationform.get('int_comm_intr_mod_COUNT')?.value;
    const currentEntries3 = this.Communicationentries.length;

    if (qty3 > currentEntries3) {
      for (let i = currentEntries3; i < qty3; i++) {
        (<FormArray>this.Communicationform.get('entries')).push(this.createEntryCommunication());
      }
    } else if (qty3 < currentEntries3) {
      for (let i = currentEntries3; i > qty3; i--) {
        this.Communicationentries.removeAt(i - 1);
      }
    }

    const qty4 = this.EventLoggerform.get('int_event_logger_mod_COUNT')?.value;
    const currentEntries4 = this.EventLoggerentries.length;

    if (qty4 > currentEntries4) {
      for (let i = currentEntries4; i < qty4; i++) {
        (<FormArray>this.EventLoggerform.get('entries')).push(this.createEntryEventLogger());
      }
    } else if (qty4 < currentEntries4) {
      for (let i = currentEntries4; i > qty4; i--) {
        this.EventLoggerentries.removeAt(i - 1);
      }
    }

    const qty5 = this.VitalInputform.get('int_vital_ip_card_COUNT')?.value;
    const currentEntries5 = this.VitalInputentries.length;

    if (qty5 > currentEntries5) {
      for (let i = currentEntries5; i < qty5; i++) {
        (<FormArray>this.VitalInputform.get('entries')).push(this.createEntryVitalInput());
      }
    } else if (qty5 < currentEntries5) {
      for (let i = currentEntries5; i > qty5; i--) {
        this.VitalInputentries.removeAt(i - 1);
      }
    }

    const qty6 = this.Modemform.get('int_modem_COUNT')?.value;
    const currentEntries6 = this.Modementries.length;

    if (qty6 > currentEntries6) {
      for (let i = currentEntries6; i < qty6; i++) {
        (<FormArray>this.Modemform.get('entries')).push(this.createEntryModem());
      }
    } else if (qty6 < currentEntries6) {
      for (let i = currentEntries6; i > qty6; i--) {
        this.Modementries.removeAt(i - 1);
      }
    }
  }

  getPowerSupplyQuantityArray(): number[] {
    return Array.from({ length: this.PowerSupplyform.get('int_STCAS_ps_card_COUNT')?.value || 0 }, (_, i) => i);
  }

  getstcasModemQuantityArray(): number[] {
    return Array.from({ length: this.stcasModemform.get('int_STCAS_modem_card_COUNT')?.value || 0 }, (_, i) => i);
  }

  getVitalComputerQuantityArray(): number[] {
    return Array.from({ length: this.VitalComputerform.get('int_vital_comp_card_COUNT')?.value || 0 }, (_, i) => i);
  }

  getCommunicationQuantityArray(): number[] {
    return Array.from({ length: this.Communicationform.get('int_comm_intr_mod_COUNT')?.value || 0 }, (_, i) => i);
  }

  getEventLoggerQuantityArray(): number[] {
    return Array.from({ length: this.EventLoggerform.get('int_event_logger_mod_COUNT')?.value || 0 }, (_, i) => i);
  }

  getVitalInputQuantityArray(): number[] {
    return Array.from({ length: this.VitalInputform.get('int_vital_ip_card_COUNT')?.value || 0 }, (_, i) => i);
  }

  getModemQuantityArray(): number[] {
    return Array.from({ length: this.Modemform.get('int_modem_COUNT')?.value || 0 }, (_, i) => i);
  }

  createEntryPowerSupply(): FormGroup {
    return this.fb.group({
      str_kawach_card_spec: [null, Validators.required],
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required],
      str_kawach_card_range_of_output: [null, Validators.required]
    });
  }

  createEntrystcasModem(): FormGroup {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required],
    });
  }
  
  createEntryVitalComputer(): FormGroup {
    return this.fb.group({
      str_kavach_card_sl_no:[null, Validators.required],
      dt_kawach_card_mfd:[null, Validators.required],
      dt_kawach_card_install: [null, Validators.required]
    }); 
  }
  
  createEntryCommunication(): FormGroup {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required],
    });
  }

  createEntryEventLogger(): FormGroup {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required],
    });
  }

  
  createEntryVitalInput(): FormGroup {
    return this.fb.group({
      str_kavach_card_sl_no: [null, Validators.required],
      dt_kawach_card_mfd: [null, Validators.required],
      dt_kawach_card_install: [null, Validators.required],
    });
  }

  createEntryModem(): FormGroup {
    return this.fb.group({
      str_kavach_card_sl_no:[null, Validators.required],
      dt_kawach_card_mfd:[null, Validators.required],
      dt_kawach_card_install:[null, Validators.required],
      str_kawach_card_roc: [null, Validators.required],
      int_kawach_card_ps: [null, Validators.required],
      int_kawach_card_workng_freq:[null, Validators.required]
    });
  }

  onSubmitPowerSupply() {
    const entryControls = this.PowerSupplyentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Power Supply: ", entriesData);
  }

  onSubmitstcasModem() {
    const entryControls = this.stcasModementries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("STCAS Modem ", entriesData);
  }

  onSubmitVitalComputer() {
    const entryControls = this.VitalComputerentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Vital Computer ", entriesData);
  }

  onSubmitCommunication() {
    const entryControls = this.Communicationentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Communication ", entriesData);
  }

  onSubmitEventLogger() {
    const entryControls = this.EventLoggerentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Event Logger ", entriesData);
  }

  onSubmitVitalInput() {
    const entryControls = this.VitalInputentries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Vital Input ", entriesData);
  }

  onSubmitModem() {
    const entryControls = this.Modementries.controls;
    const entriesData = entryControls.map((control) => control.value);

    console.log("Modem ", entriesData);
  }

  onSubmit() {
   
    const STCASpscardCount = this.PowerSupplyform.get('int_STCAS_ps_card_COUNT')?.value;
    const STCASmodemcardCount = this.stcasModemform.get('int_STCAS_modem_card_COUNT')?.value;
    const vitalcompcardCount = this.VitalComputerform.get('int_vital_comp_card_COUNT')?.value;
    const commintrmodCount = this.Communicationform.get('int_comm_intr_mod_COUNT')?.value;
    const eventloggermodCount = this.EventLoggerform.get('int_event_logger_mod_COUNT')?.value;
    const vitalipcardCount = this.VitalInputform.get('int_vital_ip_card_COUNT')?.value;
    const modemCount = this.Modemform.get('int_modem_COUNT')?.value;
   
    const PowerSupplyEntries = this.PowerSupplyentries.controls.map((control) => control.value);
    const stcasModemEntries = this.stcasModementries.controls.map((control) => control.value);
    const VitalComputerEntries = this.VitalComputerentries.controls.map((control) => control.value);
    const CommunicationEntries = this.Communicationentries.controls.map((control) => control.value);
    const EventLoggerEntries = this.EventLoggerentries.controls.map((control) => control.value);
    const VitalInputEntries = this.VitalInputentries.controls.map((control) => control.value);
    const ModemEntries = this.Modementries.controls.map((control) => control.value);

  
     this.formData = {
      STCASPowerSupply: {
        int_STCAS_ps_card_COUNT: STCASpscardCount,
        STCAS_ps_card: PowerSupplyEntries
      },
      STCASstcasModem: {
        int_STCAS_modem_card_COUNT: STCASmodemcardCount,
        STCAS_modem_card: stcasModemEntries
      },
      STCASVitalComputer: {
        int_vital_comp_card_COUNT: vitalcompcardCount,
        vital_comp_card: VitalComputerEntries 
      },
      STCASCommunication: {
        int_comm_intr_mod_COUNT: commintrmodCount,
        comm_intr_mod: CommunicationEntries
      },
      STCASEventLogger: {
        int_event_logger_mod_COUNT: eventloggermodCount,
        event_logger_mod: EventLoggerEntries
      },
      STCASVitalInput: {
        int_vital_ip_card_COUNT: vitalipcardCount,
        vital_ip_card: VitalInputEntries
      },
      STCASModem: {
        int_modem_COUNT: modemCount,
        modem: ModemEntries
      }
    };


    this.apiService.updateStcasData1(PowerSupplyEntries);
    console.log("power entries",stcasModemEntries);
    this.apiService.updateStcasData2(stcasModemEntries);
    this.apiService.updateStcasData3(VitalComputerEntries);
    this.apiService.updateStcasData4(CommunicationEntries);
    this.apiService.updateStcasData5(EventLoggerEntries);
    this.apiService.updateStcasData6(VitalInputEntries);
    this.apiService.updateStcasData7( ModemEntries);

    this.formData.int_kawach_id =this.apiService.KavachIDdata; 
    console.log("kavach id statison tcas: ", this.formData.int_kawach_id); 
    console.log("Form Data: ", this.formData);
  }
 
}