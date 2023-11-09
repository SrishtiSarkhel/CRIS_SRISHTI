import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { DashboardModalComponent } from '../dashboard-modal/dashboard-modal.component';

interface TableEntry {
  assetsDocZone: string;
  assetsDocDivision: string;
  sectioncount: number;
  doctypcount: number;
  totalSum: number;
  countapproved: number;
  countnotapproved: number;
  countsurveycompleted: number;
  isRowVisible: boolean;
  // Add other properties as needed
}

@Component({
  selector: 'app-dashboard-user-multi',
  templateUrl: './dashboard-user-multi.component.html',
  styleUrls: ['./dashboard-user-multi.component.css']
})
export class DashboardUserMultiComponent {
 
  sectionlist: any[] =[];
  divisionlist:any[] =[];
  zonelist:any[] =[];
  feedbacktype: any[] =[];
  totalcount:any[] =[];
  zonewiselist:any;
  divisionwiselist:any;
  sectionwiselist:any[] =[];
  totalcountwiselist:any[] =[];
  selectedZone:any='';
  selectedDivsion:any='';
  selectedSection:any='';
  Approved_show:any='';
  Notapproved_show:any='';
  Survey_show:any='';
  isInputDisabled: boolean = true; 
  hidden:boolean=false;
  totalSectionSum :any;
  totaltypeasset:any;
  totalasset:any;
  totalapproved:any;
  totalnotapproved:any;
  totalsurvey:any;
  sumTotalSum:any=0;
  totalzonewiselist:any[]=[];
  divdata:any[] =[];
  recieveddata:any;
  admindata:any;
 /*  currentExpandedEntry:any; */
  currentExpandedEntry: TableEntry |null=null;

  constructor(public apiService: ApiService,private dialog: MatDialog) {}
 
  ngOnInit(): void {  
     
    this.apiService.getZoneRail().subscribe(data=>{
      console.log('Data for dropdown of Zone:',data);
      this.zonelist=data;
     });

     this.apiService.getTotalCount().subscribe(data=>{
      console.log('Data for dropdown TOTAL COUNT:',data);
      this.Approved_show = data[0].countapproved; // Replace 'approvedCount' with the actual field name
      this.Notapproved_show = data[0].countnotapproved; // Replace 'notApprovedCount' with the actual field name
      this.Survey_show = data[0].countsurveycompleted;
      console.log(this.Approved_show);
      console.log(this.Notapproved_show);
      console.log(this.Survey_show);
     });

     this.apiService.getDivisiononCountDashBoard().subscribe(data=>{
      console.log('Data for dropdown TOTAL COUNT:',data);
      this.divdata =data;
     });
     
 /*     this.apiService.getTotalList().subscribe(data=>{
      console.log('Data for dropdown of total count wise:',data);
      this.totalcountwiselist=data;
     }); */
     
     this.apiService.getTotalCountDefault().subscribe(data=>{
      console.log('Data for dropdown of total count wise:',data);
      this.totalcountwiselist=data;
      this.totalSectionSum = data.reduce((acc, entry) => parseInt(acc) + parseInt(entry.sectioncount.toString()), 0);      
      console.log("totalSectionSum",this.totalSectionSum);
      this.totaltypeasset = data.reduce((acc, entry) => parseInt(acc) + parseInt(entry.doctypcount.toString()), 0);      
      console.log("totaltypeasset",this.totaltypeasset);
      this.totalapproved = data.reduce((acc, entry) => parseInt(acc) + parseInt(entry.countapproved.toString()), 0);      
      console.log("totalapproved",this.totalapproved);
      this.totalnotapproved= data.reduce((acc, entry) => parseInt(acc) + parseInt(entry.countnotapproved.toString()), 0);      
      console.log("totalnotapproved",this.totalnotapproved);
      this.totalsurvey = data.reduce((acc, entry) => parseInt(acc) + parseInt(entry.countsurveycompleted.toString()), 0);      
      console.log("totalsurvey",this.totalsurvey);
    
      
      this.totalcountwiselist.forEach(entry => {
        entry.sumApproved = Number(entry.countapproved);
        entry.sumNotApproved = Number(entry.countnotapproved);
        entry.sumSurveyCompleted = Number(entry.countsurveycompleted);
        entry.totalSum = entry.sumApproved + entry.sumNotApproved + entry.sumSurveyCompleted;
        this.sumTotalSum += entry.totalSum;
        console.log("sum entry wise",entry.totalSum);
        console.log("sum  wise",this.sumTotalSum);
      });
     });

     const storedData = localStorage.getItem('receivedData');
    if (storedData) {
      try {
     /*    alert("ngAfterViewInit CALLED"); */
        this.admindata = JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        // Handle the error as needed (e.g., show a message, clear invalid data)
      }
    } else {
      console.warn('No data found in local storage.');
      // Handle the case when no data is found (e.g., show a message, initialize to default)
    }
    console.log("admin data",this.admindata);
     
/*      console.log("login initttt", this.apiService.sharedData);
     this.recieveddata=this.apiService.sharedData;
     localStorage.setItem('receivedData', JSON.stringify(this.recieveddata)); */

     this.filterTable();
  }

  filterTable(){
   console.log(this.selectedZone);
   console.log(this.selectedDivsion);
   console.log(this.selectedSection);
  
   if (this.selectedZone && this.selectedDivsion) {
    console.log("SELECTED ZONE", this.selectedZone);
    console.log("SELECTED DIVISION", this.selectedDivsion);
    this.apiService.getDivisionWiseCountRail(this.selectedZone, this.selectedDivsion).subscribe(data => {
       console.log('Data for dropdown of DivisionWise:', data);
       this.Approved_show = data[0].countapproved; // Replace 'approvedCount' with the actual field name
       this.Notapproved_show = data[0].countnotapproved; // Replace 'notApprovedCount' with the actual field name
       this.Survey_show = data[0].countsurveycompleted;
       console.log(this.Approved_show);
       console.log(this.Notapproved_show);
       console.log(this.Survey_show);
    });

/*     this.apiService.getDivisionWiseListRail(this.selectedZone,this.selectedDivsion).subscribe(data => {
      console.log('Data for dropdown of DIVISION  LIST Wise :', data);
      this.totalcountwiselist=data;
   }); */

   this.apiService.getDivisionWiselist4Count(this.selectedZone, this.selectedDivsion).subscribe(data => {
    console.log('Data for dropdown of DivisionWise111111:', data);
    this.totalcountwiselist=data;
    this.totalcountwiselist.forEach(entry => {
    entry.sumApproved = Number(entry.countapproved);
    entry.sumNotApproved = Number(entry.countnotapproved);
    entry.sumSurveyCompleted = Number(entry.countsurveycompleted);
    entry.totalSum = entry.sumApproved + entry.sumNotApproved + entry.sumSurveyCompleted;
  });
  });
    this.selectedDivsion='';
  }

   else if (this.selectedZone ) {
    console.log("SELECTED ZONE", this.selectedZone);
    this.apiService.getZoneWiseCountRail(this.selectedZone).subscribe(data => {
       console.log('Data for dropdown of ZoneCountWise:', data);
       this.zonewiselist=data;
       this.Approved_show = data[0].countapproved; // Replace 'approvedCount' with the actual field name
       this.Notapproved_show = data[0].countnotapproved; // Replace 'notApprovedCount' with the actual field name
       this.Survey_show = data[0].countsurveycompleted;
       console.log(this.Approved_show);
       console.log(this.Notapproved_show);
       console.log(this.Survey_show);
    });
/*     this.apiService.getZoneWiseListRail(this.selectedZone).subscribe(data => {
      console.log('Data for dropdown of Zone  LIST Wise :', data);
      this.totalcountwiselist=data;
   }); */

    this.apiService.getZoneWiselist4Count(this.selectedZone).subscribe(data => {
      console.log('Data for dropdown of ZoneCountWise111111:', data);
      this.totalcountwiselist=data;
        this.totalcountwiselist.forEach(entry => {
        entry.sumApproved = Number(entry.countapproved);
        entry.sumNotApproved = Number(entry.countnotapproved);
        entry.sumSurveyCompleted = Number(entry.countsurveycompleted);
        entry.totalSum = entry.sumApproved + entry.sumNotApproved + entry.sumSurveyCompleted;
      });
    });
 }

/*   if (this.selectedZone && this.selectedDivsion && this.selectedSection) {
    console.log("SELECTED ZONE", this.selectedZone);
    console.log("SELECTED DIVISION", this.selectedDivsion);
    console.log("SELECTED DIVISION", this.selectedSection);
    this.apiService.getSectionWiseRail(this.selectedZone, this.selectedDivsion,this.selectedSection).subscribe(data => {
       console.log('Data for dropdown of SectionWise:', data);
       this.Approved_show = data[0].countapproved; // Replace 'approvedCount' with the actual field name
       this.Notapproved_show = data[0].countnotapproved; // Replace 'notApprovedCount' with the actual field name
       this.Survey_show = data[0].countsurveycompleted;
       console.log(this.Approved_show);
       console.log(this.Notapproved_show);
       console.log(this.Survey_show);
    });
  } */

 else if(!this.selectedZone && !this.selectedDivsion){
  this.apiService.getTotalCount().subscribe(data=>{
    console.log('Data for dropdown TOTAL COUNT:',data);
    this.Approved_show = data[0].countapproved; // Replace 'approvedCount' with the actual field name
    this.Notapproved_show = data[0].countnotapproved; // Replace 'notApprovedCount' with the actual field name
    this.Survey_show = data[0].countsurveycompleted;
    console.log(this.Approved_show);
    console.log(this.Notapproved_show);
    console.log(this.Survey_show);
   });
  }
}

  onZoneSelected(value:string){
    console.log("the selected zone is " + value);
    this.apiService.getDivisionRail(value).subscribe(data=>{
      console.log('Data from Division api:',data);
      this.divisionlist=data;
    });
  }

  ondivisionSelected(value:string){
    console.log("the selected Division is " + value);
    this.apiService.getSectionRail(value).subscribe(data=>{
      console.log('Data from Section api:',data);
      this.sectionlist=data;
    });
  }
  
  openModal(Zone:any,Division:any){
    this.apiService.updateZoneDashData(Zone);
    this.apiService.updateDivisionDashData(Division);
    const dialogRef = this.dialog.open(DashboardModalComponent, {
      width: '1000px', // Customize the width as needed
    });
  }

  toggleRowVisibility(entry: TableEntry, assetsDocZone: string) {
    if (this.currentExpandedEntry && this.currentExpandedEntry !== entry) {
      this.currentExpandedEntry.isRowVisible = false;
    }
    entry.isRowVisible = !entry.isRowVisible;
    this.currentExpandedEntry = entry;
    
    if (entry.isRowVisible) {
    console.log('+')
    this.apiService.getZoneWiselist4Count(assetsDocZone).subscribe(data => {
      console.log('Data for dropdown of ZoneCountWise111111:', data);
      this.totalzonewiselist=data;
      this.totalzonewiselist.forEach(entry => {
        entry.sumApproved = Number(entry.countapproved);
        entry.sumNotApproved = Number(entry.countnotapproved);
        entry.sumSurveyCompleted = Number(entry.countsurveycompleted);
        entry.totalSum = entry.sumApproved + entry.sumNotApproved + entry.sumSurveyCompleted;
      });
    });
  }
}

  openDialog(assetsDocZone: any, assetsDocDivision: any)
  {
   const dialogRef = this.dialog.open(DashboardModalComponent, {
   data: { assetsDocZone, assetsDocDivision} 
  });
  }
  
  
  
}
