import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormPopupComponent } from '../form-popup/form-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent {

  admintable: any[];
  modulelist:any[];
  statuslist:any[];
  zonelist:any[];
  submodulelist:any[];
  divisionlist:any[];

  displayedColumns:string[]=['intfeedbackid', 'struserid', 'strmoduledescription', 'strsubmoduledescription']
  
    constructor(private apiService: ApiService,private dialog: MatDialog) { 
    }
  
    ngOnInit(): void {  
     
       this.apiService.getModule().subscribe(data=>{
        console.log('Data for module dropdown:',data);
        this.modulelist=data;
       });

       this.apiService.getZone().subscribe(data=>{
        console.log('Data for dropdown of Zone:',data);
        this.zonelist=data;
       })

       this.apiService.getStatus().subscribe(data=>{
        console.log('Data for dropdown of Status:',data);
        this.statuslist=data;
       })


      this.apiService.getFeedbackAdmin().subscribe(data =>{
         this.admintable=data;
         console.table('Data from Admin table:', this.admintable);
         this.filterTable();   
         console.log("NG  INIT");
       });

       
    }

    ngAfterViewInit() {
      // Subscribe to the closeModalEvent
      this.apiService.closeModalEvent.subscribe(() => {
        // Call ngOnInit of this component
        console.log("NG AFTER VIEW INIT");
        this.ngOnInit();
      });
    }
  

  selectedZone:string='';
  selectedDivsion:string='';  
  selectedModule: string = '';
  selectedSubModule: string = ''; 
  selectedStatus:string='';
  selectedFeedbackType: '';
  selectedFilters: any = {
  selectedModule: '',
  selectedFeedbackType: '',
    // Add more filter fields here
  };
  
  filteredTable: any[];
  
  
filterTable(){
  
this.admintable.forEach(entry => {
  console.log(" filterTable",entry.intmoduleid);
  console.log(typeof entry.intmoduleid, );
});
     this.filteredTable = this.admintable.filter(entry => 
      (!this.selectedZone || entry.strzonecode === this.selectedZone) &&
      (!this.selectedDivsion || entry.strdivisioncode === this.selectedDivsion) &&
      (!this.selectedModule || `${entry.intmoduleid}` === this.selectedModule) &&
      (!this.selectedSubModule || entry.strsubmoduledescription === this.selectedSubModule) &&
      (!this.selectedStatus || entry.strstatusdescription === this.selectedStatus)
    );
    this.sortTableByStatus()
    console.log('Selected Zone:', this.selectedZone);
    console.log('Selected Division:', this.selectedDivsion);
    console.log('Selected Module:', this.selectedModule);
    console.log('Selected SubModule:', this.selectedSubModule);
    console.log('Selected Status:', this.selectedStatus);
    console.log('Filtered Data:', this.filteredTable);
    console.log("type of module"+typeof this.selectedModule); 
    }

    showModel: boolean = false;
    openModal(feedbackid:number,zone:string,division:string,user:string,contact:string,module:string,submodule:string,feedbacktype:string,status:string){
        
        const Feedbackid=feedbackid;
        const  Zone= zone;
        const Division= division;
        const User=user;
        const Contact=contact;
        const Module=module;
        const SubModule=submodule;
        const Feedbacktype=feedbacktype;
        const Status= status;
        
        this.apiService.updateModalIDData(Feedbackid);
        this.apiService.updateformZoneData(Zone);
        this.apiService.updateformDivisionData(Division);
        this.apiService.updateformUserData(User);
        this.apiService.updateformContactData(Contact);
        this.apiService.updateModalModuleData(Module);
        this.apiService.updateModalSubModuleData(SubModule);
        this.apiService.updateFeedbackTypeData(Feedbacktype);
        this.apiService.updateModalStatusData(Status);
        this.showModel = true;
        const dialogRef= this.dialog.open(FormPopupComponent,{
          width: '1000px',
        });
      
      }

      onModuleSelected(moduletype:string){
        console.log("the selected value is " + moduletype);
        let mid = Number(moduletype);
        this.apiService.getSubModuleData(mid).subscribe(data => {
          console.log('Data from submodule api:', data); 
          this.submodulelist = data;
         });
      }

      onZoneSelected(value:string){
        console.log("the selected zone is " + value);
        this.apiService.getDivision(value).subscribe(data=>{
          console.log('Data from Division api:',data);
          this.divisionlist=data;
        })
      }
     
      // Initialize sort direction
    sortDirection: string ; // Default to ascending

      sortTableByStatus() {
        this.sortDirection='asc';
        console.log(" sort Table By Status")
        // Toggle the sort direction
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      
        // Sort the filteredTable based on the "Status" column
        this.filteredTable.sort((a, b) => {
          if (a.intstatusid> b.intstatusid) {
            console.log(" a  >  b "+this.sortDirection)
            return this.sortDirection === 'asc' ? -1 : 1;
          } else if (a.intstatusid< b.intstatusid) {
            console.log(" a <    b "+this.sortDirection)
            return this.sortDirection === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      
}
