import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';

@Component({
  selector: 'app-kavach-component',
  templateUrl: './kavach-component.component.html',
  styleUrls: ['./kavach-component.component.css']
})
export class KavachComponentComponent {
   
  constructor(private apiService:ApiService,private dialog: MatDialog) {}
  isNextPageDisabled:boolean;
  isPrevPageDisabled:boolean;

  selectedComponent: string = 'stationtcas';
 
  showComponent(componentName: string) {
    this.selectedComponent = componentName;
    this.isNextPageDisabled = false;
    this.isPrevPageDisabled=false;
  }
      
  nextPage() {
    console.log("show pageeeeeeee")

  this.isPrevPageDisabled=false;
  if (this.selectedComponent == 'rfid') {
    // Disable the button
    this.isNextPageDisabled = true;
  } else {
    // Enable the button for all other components
    this.isNextPageDisabled = false;
  }

  if(this.selectedComponent =='stationtcas'){
    this.selectedComponent = 'smoperation';
    this.apiService.triggerSubmitAction();
  }
  else if(this.selectedComponent =='smoperation'){
    this.selectedComponent= 'tower-box';
    this.apiService.triggerSubmitAction();
  }
  else if(this.selectedComponent =='tower-box'){
    this.selectedComponent= 'gsmand-gps';
    this.apiService.triggerSubmitAction();
  }
  else if(this.selectedComponent =='gsmand-gps'){
    this.selectedComponent= 'ofc-hut';
    this.apiService.triggerSubmitAction();
  }
  else if(this.selectedComponent =='ofc-hut'){
    this.selectedComponent= 'remote-unit';
    this.apiService.triggerSubmitAction();
  }
  else if(this.selectedComponent =='remote-unit'){
    this.selectedComponent= 'station-antenna';
    this.apiService.triggerSubmitAction();
  }
  else if(this.selectedComponent =='station-antenna'){
    this.selectedComponent= 'rfid';
    this.apiService.triggerSubmitAction();
  }
}

backPage(){
  
  this.isNextPageDisabled = false;

  if (this.selectedComponent == 'stationtcas') {
    // Disable the button
    this.isPrevPageDisabled = true;
  } else {
    // Enable the button for all other components
    this.isPrevPageDisabled = false;
  }

  if(this.selectedComponent  =='smoperation'){
       this.selectedComponent  = 'stationtcas';
       this.apiService.triggerSubmitAction();
     }
     else if(this.selectedComponent =='tower-box'){
       this.selectedComponent  = 'smoperation';
       this.apiService.triggerSubmitAction();
     }
     else if(this.selectedComponent =='tower-box'){
      this.selectedComponent  = 'smoperation';
      this.apiService.triggerSubmitAction();
    }
    else if(this.selectedComponent =='gsmand-gps'){
      this.selectedComponent  = 'tower-box';
      this.apiService.triggerSubmitAction();
    }
    else if(this.selectedComponent =='ofc-hut'){
      this.selectedComponent  = 'gsmand-gps';
      this.apiService.triggerSubmitAction();
    }
    else if(this.selectedComponent =='remote-unit'){
      this.selectedComponent  = 'ofc-hut';
      this.apiService.triggerSubmitAction();
    }
    else if(this.selectedComponent =='station-antenna'){
      this.selectedComponent  = 'remote-unit';
      this.apiService.triggerSubmitAction();
    }
    else if(this.selectedComponent =='rfid'){
      this.selectedComponent  = 'station-antenna';
      this.apiService.triggerSubmitAction();
    }
   }
  
   openModal(){
    const dialogRef= this.dialog.open(PreviewModalComponent,{
      width: '5000px',
    });
  }
}
