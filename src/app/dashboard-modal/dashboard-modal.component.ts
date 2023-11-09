import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.component.html',
  styleUrls: ['./dashboard-modal.component.css']
})
export class DashboardModalComponent {
  
  sectionlist: any[] =[];

  constructor(private apiService: ApiService, public dialogRef: MatDialogRef<DashboardModalComponent>){
    this.apiService.getZoneRail().subscribe(data=>{
      console.log('Data for dropdown of Zone:',data);
      this.sectionlist=data;
     });
  }

  ngOnInit(): void { 
  const zoneDash= this.apiService.ZonedashData;
  const divisionDash=this.apiService.DivisiondashData;
  this.apiService.getSectionWiseList4Dash(zoneDash,divisionDash).subscribe(data=>{
    console.log('Data for dropdown of section:',data);
    this.sectionlist=data;
   });


  }
  closeModal(){
    this.dialogRef.close();
  } 
}
