import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-kavach-form',
  templateUrl: './kavach-form.component.html',
  styleUrls: ['./kavach-form.component.css']
})
export class KavachFormComponent {
  selectedForm: string = 'general-info';
  isNextPageDisabled:boolean;
  isPrevPageDisabled:boolean;

  constructor(private apiService: ApiService) {}
  showForm(formName: string) {
    console.log("show formmm")
    this.isNextPageDisabled = false;
    this.isPrevPageDisabled=false;

    if(this.apiService.KavachIDdata!=undefined){
    this.selectedForm = formName;
    }
  }

   nextPage() {
      console.log("show pageeeeeeee")
    // this.selectedForm = formName;
    this.isPrevPageDisabled=false;
    if (this.selectedForm == 'kawach-components') {
      // Disable the button
      this.isNextPageDisabled = true;
    } else {
      // Enable the button for all other components
      this.isNextPageDisabled = false;
    }
    
    if(this.selectedForm =='general-info'){
      this.selectedForm = 'install-location';
      this.apiService.triggerSubmitAction();
    }
    else if(this.selectedForm =='install-location'){
      this.selectedForm = 'kawach-components';
      this.apiService.triggerSubmitAction();
    }
}
backPage(){
  this.isNextPageDisabled = false;
  if (this.selectedForm == 'general-info') {
    // Disable the button
    this.isPrevPageDisabled = true;
  } else {
    // Enable the button for all other components
    this.isPrevPageDisabled = false;
  }
if(this.selectedForm =='install-location'){
    this.selectedForm = 'general-info';
   // this.apiService.triggerSubmitAction();
  }
  else if(this.selectedForm =='kawach-components'){
    this.selectedForm = 'install-location';

  }
}
}
