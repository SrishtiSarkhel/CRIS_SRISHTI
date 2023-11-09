import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-p-waymodal',
  templateUrl: './p-waymodal.component.html',
  styleUrls: ['./p-waymodal.component.css']
})
export class PWaymodalComponent {

  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<PWaymodalComponent>){
  }
  
  isInputDisabled: boolean = true; 
  pwaydata:any[]=[];
  
  pwaydsiplay: any = {
  str_2mach_sleeper_l:'',
  str_2mach_sleeper_r:'',
  str_2srj_sleepr_l:'',
  str_2srj_sleepr_r:'',
  str_ssd_sleeper_l:'',
  str_ssd_sleeper_r:'',
  str_ballast_l:'',
  str_ballast_r:'',
  str_drainage_l:'',
  str_drainage_r:'',
  str_cond_stock_l:'',
  str_cond_stock_r: '',
  str_cond_tongue_l:'',
  str_cond_tongue_r: '',
  int_lateral_stock_l: '',
  int_lateral_stock_r: '',
  int_vertical_stock_l:'',
  int_vertical_stock_r:'',
  str_srj_welded_l: '',
  str_srj_welded_r:'',
  str_chairs_l: '',
  str_chairs_r: '',
  str_gauge_l:'',
  str_gauge_r:'',
  str_nut_washer_l:'',
  str_nut_washer_r:'',
  int_liners_l: '',
  int_liners_r:'',
  int_erc_l:'',
  int_erc_r: '',
  int_rubber_pad_l: '',
  int_rubber_pad_r:'',
  int_spring_load_l:'',
  int_spring_load_r:'',
  int_cotter_wedge_l:'',
  int_cotter_wedge_r:'',
  str_tongue_rail_flang_l:'',
  str_tongue_rail_flang_r:'',
  str_indicate_no:'',
  str_tongue_slide_chair_l:'',
  str_tongue_slide_chair_r:'',
  int_toe_switch_l:'',
  int_toe_switch_r:'',
  int_point_machine_sleeper_l:'',
  int_point_machine_sleeper_r:'',
  str_pack_under_switch:'',
  dt_last_unimat:'',
  str_ground_conn:'',
  str_gauge_toe_l:'',
  str_gauge_toe_r:'',
  str_cross_level_l:'',
  str_cross_level_r:'',
  int_gauge_150_l:'',
  int_gauge_150_r:'',
  str_gauge_150_l:'',
   str_gauge_150_r:'',
  int_cross_150_l:'',
  int_cross_150_r:'',
  str_cross_150_l:'',
  str_cross_150_r:'',
  int_gauge_5th_l:'',
  int_gauge_5th_r:'',
  str_gauge_5th_l:'',
  str_gauge_5th_r:'',
  int_cross_5th_l:'',
  int_cross_5th_r:'',
  str_cross_5th_l:'',
  str_cross_5th_r:'',
  int_gauge_9th_l:'',
  int_gauge_9th_r:'',
  str_gauge_9th_l:'',
  str_gauge_9th_r:'',
  int_cross_9th_l:'',
  int_cross_9th_r:'',
  str_cross_9th_l:'',
  str_cross_9th_r:'',
  str_lubr_slide_chair_l:'',
  str_lubr_slide_chair:'',
  str_dist_btwn_gauge:'',
  str_open_side_l:'',
  str_open_side:'',
  str_grease_lubr:'',
  str_insulation_cond:'',
  str_square_arms:'',
  str_tightness_nut:'',
  str_locn_pos:'',
  str_pway_defects:'',
  str_pway_rmrk:'',
  }
  
  
  ngOnInit(): void { 
  const pointid=this.apiService.PointIDdata;
  console.log("@Pway component end ",pointid)
  this.apiService.getpwaydetails(pointid).subscribe(data=>{
   this.pwaydata=data;
   console.log("Data of pwaydata type:",this.pwaydata);
   this.pwaydsiplay.str_2mach_sleeper_l=this.pwaydata[0].str_2mach_sleeper_l;
   this.pwaydsiplay.str_2mach_sleeper_r=this.pwaydata[0].str_2mach_sleeper_r;
   this.pwaydsiplay.str_2srj_sleepr_l=this.pwaydata[0].str_2srj_sleepr_l;
   this.pwaydsiplay.str_2srj_sleepr_r=this.pwaydata[0].str_2srj_sleepr_r;
   this.pwaydsiplay.str_ssd_sleeper_l=this.pwaydata[0].str_ssd_sleeper_l;
   this.pwaydsiplay.str_ssd_sleeper_r=this.pwaydata[0].str_ssd_sleeper_r;
   this.pwaydsiplay.str_ballast_l=this.pwaydata[0].str_ballast_l;
   this.pwaydsiplay.str_ballast_r=this.pwaydata[0].str_ballast_r;
   this.pwaydsiplay.str_drainage_l=this.pwaydata[0].str_drainage_l;
   this.pwaydsiplay.str_drainage_r=this.pwaydata[0].str_drainage_r;
   this.pwaydsiplay.str_cond_stock_l=this.pwaydata[0].str_cond_stock_l;
   this.pwaydsiplay.str_cond_stock_r=this.pwaydata[0].str_cond_stock_r;
   this.pwaydsiplay.str_cond_tongue_l=this.pwaydata[0].str_cond_tongue_l;
   this.pwaydsiplay.str_cond_tongue_r=this.pwaydata[0].str_cond_tongue_r;
   this.pwaydsiplay.int_lateral_stock_l=this.pwaydata[0].int_lateral_stock_l;
   this.pwaydsiplay.int_lateral_stock_r=this.pwaydata[0].int_lateral_stock_r;
   this.pwaydsiplay.int_vertical_stock_l=this.pwaydata[0].int_vertical_stock_l;
   this.pwaydsiplay.int_vertical_stock_r=this.pwaydata[0].int_vertical_stock_r;
   this.pwaydsiplay.str_srj_welded_l=this.pwaydata[0].str_srj_welded_l;
   this.pwaydsiplay.str_srj_welded_r=this.pwaydata[0].str_srj_welded_r;
   this.pwaydsiplay.str_chairs_l=this.pwaydata[0].str_chairs_l;
   this.pwaydsiplay.str_chairs_r=this.pwaydata[0].str_chairs_r;
   this.pwaydsiplay.str_gauge_l=this.pwaydata[0].str_gauge_l;
   this.pwaydsiplay.str_gauge_r=this.pwaydata[0].str_gauge_r;
   this.pwaydsiplay.str_nut_washer_l=this.pwaydata[0].str_nut_washer_l;
   this.pwaydsiplay.str_nut_washer_r=this.pwaydata[0].str_nut_washer_r;
   this.pwaydsiplay.int_liners_l=this.pwaydata[0].int_liners_l;
   this.pwaydsiplay.int_liners_r=this.pwaydata[0].int_liners_r;
   this.pwaydsiplay.int_erc_l=this.pwaydata[0].int_erc_l;
   this.pwaydsiplay.int_erc_r=this.pwaydata[0].int_erc_r;
   this.pwaydsiplay.int_rubber_pad_l=this.pwaydata[0].int_rubber_pad_l;
   this.pwaydsiplay.int_rubber_pad_r=this.pwaydata[0].int_rubber_pad_r;
   this.pwaydsiplay.int_spring_load_l=this.pwaydata[0].int_spring_load_l;
   this.pwaydsiplay.int_spring_load_r=this.pwaydata[0].int_spring_load_r;
   this.pwaydsiplay.int_cotter_wedge_l=this.pwaydata[0].int_cotter_wedge_l;
   this.pwaydsiplay.int_cotter_wedge_r=this.pwaydata[0].int_cotter_wedge_r;
   this.pwaydsiplay.str_tongue_rail_flang_l=this.pwaydata[0].str_tongue_rail_flang_l;
   this.pwaydsiplay.str_tongue_rail_flang_r=this.pwaydata[0].str_tongue_rail_flang_r;
   this.pwaydsiplay.str_indicate_no=this.pwaydata[0].str_indicate_no;
   this.pwaydsiplay.str_tongue_slide_chair_l=this.pwaydata[0].str_tongue_slide_chair_l;
   this.pwaydsiplay.str_tongue_slide_chair_r=this.pwaydata[0].str_tongue_slide_chair_r;
   this.pwaydsiplay.int_toe_switch_l=this.pwaydata[0].int_toe_switch_l;
   this.pwaydsiplay.int_toe_switch_r=this.pwaydata[0].int_toe_switch_r;
   this.pwaydsiplay.int_point_machine_sleeper_l=this.pwaydata[0].int_point_machine_sleeper_l;
   this.pwaydsiplay.int_point_machine_sleeper_r=this.pwaydata[0].int_point_machine_sleeper_r;
   this.pwaydsiplay.str_pack_under_switch=this.pwaydata[0].str_pack_under_switch;
   this.pwaydsiplay.dt_last_unimat=this.pwaydata[0].dt_last_unimat;
   this.pwaydsiplay.str_ground_conn=this.pwaydata[0].str_ground_conn;

   this.pwaydsiplay.int_gauge_toe=this.pwaydata[0].int_gauge_toe;
   this.pwaydsiplay.int_cross_level=this.pwaydata[0].int_cross_level;
   this.pwaydsiplay.str_gauge_toe=this.pwaydata[0].str_gauge_toe;
   this.pwaydsiplay.str_cross_level=this.pwaydata[0].str_cross_level;
   
   this.pwaydsiplay.int_gauge_150_l=this.pwaydata[0].int_gauge_150_l;
   this.pwaydsiplay.int_gauge_150_r=this.pwaydata[0].int_gauge_150_r;
   this.pwaydsiplay.str_gauge_150_l=this.pwaydata[0].str_gauge_150_l;
   this.pwaydsiplay.str_gauge_150_r=this.pwaydata[0].str_gauge_150_r;
   this.pwaydsiplay.int_cross_150_l=this.pwaydata[0].int_cross_150_l;
   this.pwaydsiplay.int_cross_150_r=this.pwaydata[0].int_cross_150_r;
   this.pwaydsiplay.str_cross_150_l=this.pwaydata[0].str_cross_150_l;
   this.pwaydsiplay.str_cross_150_r=this.pwaydata[0].str_cross_150_r;



   this.pwaydsiplay.int_gauge_5th_l=this.pwaydata[0].int_gauge_5th_l;
   this.pwaydsiplay.int_gauge_5th_r=this.pwaydata[0].int_gauge_5th_r;
   this.pwaydsiplay.str_gauge_5th_l=this.pwaydata[0].str_gauge_5th_l;
   this.pwaydsiplay.str_gauge_5th_r=this.pwaydata[0].str_gauge_5th_r;
   this.pwaydsiplay.int_cross_5th_l=this.pwaydata[0].int_cross_5th_l;
   this.pwaydsiplay.int_cross_5th_r=this.pwaydata[0].int_cross_5th_r;
   this.pwaydsiplay.str_cross_5th_l=this.pwaydata[0].str_cross_5th_l;
   this.pwaydsiplay.str_cross_5th_r=this.pwaydata[0].str_cross_5th_r;
   this.pwaydsiplay.int_gauge_9th_l=this.pwaydata[0].int_gauge_9th_l;
   this.pwaydsiplay.int_gauge_9th_r=this.pwaydata[0].int_gauge_9th_r;
   this.pwaydsiplay.str_gauge_9th_l=this.pwaydata[0].str_gauge_9th_l;
   this.pwaydsiplay.str_gauge_9th_r=this.pwaydata[0].str_gauge_9th_r;
   this.pwaydsiplay.int_cross_9th_l=this.pwaydata[0].int_cross_9th_l;
   this.pwaydsiplay.int_cross_9th_r=this.pwaydata[0].int_cross_9th_r;
   this.pwaydsiplay.str_cross_9th_l=this.pwaydata[0].str_cross_9th_l;
   this.pwaydsiplay.str_cross_9th_r=this.pwaydata[0].str_cross_9th_r;

   this.pwaydsiplay.str_lubr_slide_chair_l=this.pwaydata[0].str_lubr_slide_chair_l;
   this.pwaydsiplay.str_lubr_slide_chair_r=this.pwaydata[0].str_lubr_slide_chair_r;
   this.pwaydsiplay.str_dist_btwn_gauge=this.pwaydata[0].str_dist_btwn_gauge;
   this.pwaydsiplay.str_open_side_l=this.pwaydata[0].str_open_side_l;
   this.pwaydsiplay.str_open_side_r=this.pwaydata[0].str_open_side_r;
   this.pwaydsiplay.str_grease_lubr=this.pwaydata[0].str_grease_lubr;
   this.pwaydsiplay.str_insulation_cond=this.pwaydata[0].str_insulation_cond;
   this.pwaydsiplay.str_square_arms=this.pwaydata[0].str_square_arms;
   this.pwaydsiplay.str_tightness_nut=this.pwaydata[0].str_tightness_nut;
   this.pwaydsiplay.str_locn_pos=this.pwaydata[0].str_locn_pos;
   this.pwaydsiplay.str_pway_defects=this.pwaydata[0].str_pway_defects;
   this.pwaydsiplay.str_pway_rmrk=this.pwaydata[0].str_pway_rmrk;
   
   
   
    
  });
  } 
  





  closeModal(){
    this.dialogRef.close();
  }
}
