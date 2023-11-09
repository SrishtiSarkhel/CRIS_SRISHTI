import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.css']
})
export class PreviewModalComponent {
  

  generalinstallist: any[] =[];
  Stcas_list1: any[] =[];
  Stcas_list2: any[] =[];
  Stcas_list3: any[] =[];
  Stcas_list4: any[] =[];
  Stcas_list5: any[] =[];
  Stcas_list6: any[] =[];
  Stcas_list7: any[] =[];
  SmOperation_list: any[] =[];
  towerbox_list1: any[] =[];
  towerbox_list2: any[] =[];
  towerbox_list3: any[] =[];
  Gsm_list: any[] =[];
  Gsp_list: any[] =[];
  Ofchut_list: any[] =[];
  Remote_Input_Unitlist1: any[] =[];
  Remote_Input_Unitlist2: any[] =[];
  Remote_Input_Unitlist3: any[] =[];
  Remote_Input_Unitlist4: any[] =[];
  Remote_Input_Unitlist5: any[] =[];
  Station_Antenna_list: any[] =[];
  RFID_list: any[] =[];

  int_kavach_id:any;

  generalinstaldsiplay: any = {
    int_asset_code:'',
    int_rfid:'',
    str_rdso_no:'',
    dbl_lat:'',
    dbl_long:'',
    str_make:'',
    str_model:'',
    str_model_type:'',
    str_conn_to:'',
    str_gear_pos:'',
    dbl_pole_km:'',
    plaform_no: '',
    po_number:'',
    dt_mfd: '',
    dt_purchase: '',
    dt_install: '',
    dt_warranty_exp:'',
    dt_mntnc_strt:'',
    str_zone_code: '',
    str_div_code:'',
    str_sec_code:'',
    str_loc_type:'',
    str_locn:'',
    int_route:'',
    int_codal_life:'' 
    }


  constructor(private apiService: ApiService,private router: Router, public dialogRef: MatDialogRef<PreviewModalComponent>){}

  ngOnInit(): void { 
    this.int_kavach_id = this.apiService.KavachIDdata; 
    this.apiService.getgeneralinstall(this.int_kavach_id).subscribe(data => {
      console.log('Data from generalinfo type:', data); 
      this.generalinstallist = data;
     this.generalinstaldsiplay.int_asset_code=this.generalinstallist[0].int_asset_code;
     this.generalinstaldsiplay.int_RFID=this.generalinstallist[0].int_RFID;
     this.generalinstaldsiplay.str_rdso_no=this.generalinstallist[0].str_rdso_no;
     this.generalinstaldsiplay.dbl_lat=this.generalinstallist[0].dbl_lat;
     this.generalinstaldsiplay.dbl_long=this.generalinstallist[0].dbl_long;
     this.generalinstaldsiplay.str_make=this.generalinstallist[0].str_make;
     this.generalinstaldsiplay.str_model=this.generalinstallist[0].str_model;
     this.generalinstaldsiplay.str_conn_to=this.generalinstallist[0].str_conn_to;
     this.generalinstaldsiplay.str_gear_pos=this.generalinstallist[0].str_gear_pos;
     this.generalinstaldsiplay.dbl_pole_km=this.generalinstallist[0].dbl_pole_km;
     this.generalinstaldsiplay.plaform_no=this.generalinstallist[0].plaform_no;
     this.generalinstaldsiplay.po_number=this.generalinstallist[0].po_number;
     this.generalinstaldsiplay.dt_mfd=this.generalinstallist[0].dt_mfd;
     this.generalinstaldsiplay.po_number=this.generalinstallist[0].po_number;
     this.generalinstaldsiplay.dt_purchase=this.generalinstallist[0].dt_purchase;
     this.generalinstaldsiplay.dt_install=this.generalinstallist[0].dt_install;
     this.generalinstaldsiplay.dt_warranty_exp=this.generalinstallist[0].dt_warranty_exp;
     this.generalinstaldsiplay.dt_mntnc_strt=this.generalinstallist[0].dt_mntnc_strt;
     this.generalinstaldsiplay.str_zone_code=this.generalinstallist[0].str_zone_code;
     this.generalinstaldsiplay.str_div_code=this.generalinstallist[0].str_div_code;
     this.generalinstaldsiplay.str_sec_code=this.generalinstallist[0].str_sec_code;
     this.generalinstaldsiplay.str_loc_type=this.generalinstallist[0].str_loc_type;
     this.generalinstaldsiplay.str_locn=this.generalinstallist[0].str_locn;
     this.generalinstaldsiplay.int_route=this.generalinstallist[0].int_route;
     this.generalinstaldsiplay.int_codal_life=this.generalinstallist[0].int_codal_life;
    });
   
    this.apiService.getkavachcard(this.int_kavach_id,'STCAS_ps_card').subscribe(data => {
      console.log('Data from power supply type1:', data); 
      this.Stcas_list1 = data;
    });
    
    this.apiService.getkavachcard(this.int_kavach_id,'STCAS_modem_card').subscribe(data => {
      console.log('Data from power supply type2:', data); 
      this.Stcas_list2 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'vital_comp_card').subscribe(data => {
      console.log('Data from power supply type3:', data); 
      this.Stcas_list3 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'comm_intr_mod').subscribe(data => {
      console.log('Data from power supply type4:', data); 
      this.Stcas_list4 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'event_logger_mod').subscribe(data => {
      console.log('Data from power supply type5:', data); 
      this.Stcas_list5 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'vital_ip_card').subscribe(data => {
      console.log('Data from power supply type6:', data); 
      this.Stcas_list6 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'SMOCIP_unit').subscribe(data => {
      console.log('Data from Sm operation:', data); 
      this.SmOperation_list = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'radio_mod').subscribe(data => {
      console.log('Data from towerbox1:', data); 
      this.towerbox_list1 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'radio_comm_unit').subscribe(data => {
      console.log('Data from towerbox2:', data); 
      this.towerbox_list2 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'RS485_232').subscribe(data => {
      console.log('Data from towerbox3:', data); 
      this.towerbox_list3 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'GSM_antenna').subscribe(data => {
      console.log('Data from Gsm_list:', data); 
      this.Gsm_list = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'GPS_antenna').subscribe(data => {
      console.log('Data from Gsp_list:', data); 
      this.Gsp_list = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'OFC_HUT_MODEM').subscribe(data => {
      console.log('Data from OFC_HUT_list:', data); 
      this.Ofchut_list = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'pwr_crd').subscribe(data => {
      console.log('Data from Remote_Input_Unitlist1:', data); 
      this.Remote_Input_Unitlist1 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'vital_crd').subscribe(data => {
      console.log('Data from Remote_Input_Unitlist2:', data); 
      this.Remote_Input_Unitlist2 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'smofc_modem').subscribe(data => {
      console.log('Data from Remote_Input_Unitlist3:', data); 
      this.Remote_Input_Unitlist3 = data;
    });

    this.apiService.getkavachcard(this.int_kavach_id,'riu_btry_chrg').subscribe(data => {
      console.log('Data from Remote_Input_Unitlist4:', data); 
      this.Remote_Input_Unitlist4 = data;
    }); 

    this.apiService.getkavachcard(this.int_kavach_id,'btry_12v_42ah').subscribe(data => {
      console.log('Data from Remote_Input_Unitlist5:', data); 
      this.Remote_Input_Unitlist5 = data;
    });
   
    this.apiService.getStationAntennakavachcard(this.int_kavach_id).subscribe(data => {
      console.log('Data from Station_Antenna_list:', data); 
      this.Station_Antenna_list = data;
    });
    
    this.apiService.getRfidkavachcard(this.int_kavach_id).subscribe(data => {
      console.log('Data from RFID_list:', data); 
      this.RFID_list = data;
    });

  }

  redirect(){
    console.log("redirect")
   
    this.dialogRef.close();
  }

  closeModal(){
    this.dialogRef.close();
  }

  FinalSubmit(){
   console.log(this.int_kavach_id);
    this.apiService.FinalKavachsave(this.int_kavach_id).subscribe(data => {
      console.log('Final Save Kavach submitted:', data); 
    });
    alert("Form saved succesfully");
    this.dialogRef.close();
  }

}
