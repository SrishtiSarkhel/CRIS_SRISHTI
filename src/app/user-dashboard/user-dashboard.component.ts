import { Component} from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})

export class UserDashboardComponent {

  formDataObject: any = {};
  isInputDisabled: boolean = true; 
 // selectedImage: File | null = null;
  selectedFile:File |null=null;
  SelectedModuleId:any='';
  SelectedSubModule:any='';
  SelectedFeedbackid:any='';
  formSubmitted = false;

    dropdownData: any[] =[];
    modulelist: any[] =[];
    feedbacktype: any[] =[];
    receivedData:any[]=[];
    tableform:any[]=[];
    feedbackid:any;
    statusid:any;
    strzonecode:any;
    strdivisioncode:any;
    struserdesignation:any;
    struserid:any;
    SelectedRemark:any;
     


  constructor(private apiService: ApiService,private dialog: MatDialog) { 
    const storedData = localStorage.getItem('receivedData');
    if (storedData) {
      try {
     /*    alert("ngAfterViewInit CALLED"); */
        this.receivedData = JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        // Handle the error as needed (e.g., show a message, clear invalid data)
      }
    } else {
      console.warn('No data found in local storage.');
      // Handle the case when no data is found (e.g., show a message, initialize to default)
    }
    console.log("login init login",  this.receivedData);
    this.strzonecode=this.receivedData[0].strzonecode;
    this.strdivisioncode=this.receivedData[0].strdivisioncode;
    this.struserdesignation=this.receivedData[0].struserdesignation;
    this.struserid=this.receivedData[0].struserid;
}

/* ngAfterViewInit() {
  const storedData = localStorage.getItem('receivedData');
  if (storedData) {
    try {
  
      this.receivedData = JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      // Handle the error as needed (e.g., show a message, clear invalid data)
    }
  } else {
    console.warn('No data found in local storage.');
    // Handle the case when no data is found (e.g., show a message, initialize to default)
  }
} */

  ngOnInit(): void {  



    this.apiService.getModule().subscribe(data => {
      console.log('Data from module type:', data); 
      this.modulelist = data;
    });

    this.apiService.getFeedbackType().subscribe(data => {
      console.log('Data from Feedback type:', data); 
      this.feedbacktype = data;
    });

    this.apiService.getfeedbackform(this.struserid).subscribe(data=>{
      console.log('Data from feedback form api:',data);
      this.tableform=data;
      this.apiService.updateFeedbackData(this.tableform);
      console.log('TABLE FORM:',this.tableform);
    });

        // Storing data before page refresh
  /*     localStorage.setItem('receivedData', JSON.stringify(this.receivedData)); */
      // Retrieving data after page refresh

      const storedData = localStorage.getItem('receivedData');
      if (storedData) {
        try {
       /*    alert("ngAfterViewInit CALLED"); */
          this.receivedData = JSON.parse(storedData);
        } catch (error) {
          console.error('Error parsing stored data:', error);
          // Handle the error as needed (e.g., show a message, clear invalid data)
        }
      } else {
        console.warn('No data found in local storage.');
        // Handle the case when no data is found (e.g., show a message, initialize to default)
      }
  
  }


onOptionsSelected(value:string){
  console.log("the selected value is " + value);
  let mid = Number(value);
  this.apiService.getSubModuleData(mid).subscribe(data => {
    console.log('Data from submodule api:', data); 
    this.dropdownData = data;
   });
}

handleFileUpload(event: any) {
  this.selectedFile = event.target.files[0];

}

clearFileInput() {
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = ''; // Clear the file input value
  }
}

 onSubmit() {
  this.formSubmitted = true;
  if (this.isValidForm()) {
   /*  if (this.selectedFile) {  */
    // Create a FormData object and append the file and other data
    const formData = new FormData();
    this.statusid=1;
    console.log("NGSUBMIT"+formData);
    formData.append('file', this.selectedFile);
    formData.append('intFeedbackTypeID', this.SelectedFeedbackid);
    formData.append('intModuleID', this.SelectedModuleId);
    formData.append('strSubModuleID',this.SelectedSubModule);
    formData.append('strFeedbackRemark',this.SelectedRemark); 
    formData.append('strUserID', this.struserid);
    formData.append('intStatusID',this.statusid); 
    this.apiService.putFileorm(formData).subscribe((response: any) => {
      console.log("Form submitted:", response);
    }); 

    alert("Form saved succesfully");
    
    this.apiService.getfeedbackform(this.struserid).subscribe(data=>{
      console.log('Data from feedback form api:',data);
      this.tableform=data;
      console.log('TABLE FORM:',this.tableform);
    });
    console.log("file before null "+this.selectedFile);
    this.clearFileInput();
    this.selectedFile = null; // Reset the file input
    console.log("file after null "+this.selectedFile);
    this.SelectedFeedbackid = ''; // Reset other form fields as needed
    this.SelectedModuleId = '';
    this.SelectedSubModule = '';
    this.SelectedRemark = '';
/*   }   */
     this.formSubmitted = false;
  }
  else {
    // Form is invalid, display error messages or prevent submission
    console.log('Form is invalid');
  } 
  
  
}

isValidForm() {
  console.log('Form  valid funtuion');
  return this.SelectedModuleId !== '' && this.SelectedRemark !== '' && this.SelectedFeedbackid !=='' && this.SelectedSubModule!=='';
}


/* 
 SaveForm(Formdata:any){
    console.log("form save",Formdata);
    for (const key in Formdata) 
    {
      if (Formdata.hasOwnProperty(key)) 
      {
        const value = Formdata[key];
        console.log(`${key}: ${value}`);
        this.formDataObject[key] = value;
      }
     this.formDataObject.strUserID = this.receivedData[0].struserid;
     this.formDataObject.intStatusID = 1;
     this.formDataObject.file=this.selectedFile;
     console.log('Form Data Array:', this.formDataObject);
     console.log('File selecteds:', this.formDataObject.file);
     console.log('FILE:', this.selectedFile);
     this.apiService.updateFeedbackData(this.formDataObject)
    }
   this.apiService.putFeedbackform(this.formDataObject).subscribe(data=>{
    (response: any)=>{
      console.log("Form submitted:",response);
      }
   });  
   this.apiService.uploadCsv(this.formDataObject.file).subscribe(data=>{
    (response: any)=>{
      console.log("file uploaded:",response);
      }
   });  
   
   this.apiService.getfeedbackform(this.receivedData[0].struserid).subscribe(data=>{
    console.log('Data from feedback form api:',data);
    this.tableform=data;
    console.log('TABLE FORM:',this.tableform);
  })
  
  this.formDataObject={};
 }
 */
showModel: boolean = false;

openModal(feedbackid:number,module:string,submodule:string,feedbacktype:string,status:string) {
  
   this.showModel = true;
  
   const Feedbackid = feedbackid;
   const Module=module;
   const SubModule=submodule;
   const Feedbacktype=feedbacktype;
   const Status= status;
   console.log('Modal button ID', Feedbackid);
   this.apiService.updateModalIDData(Feedbackid);
   this.apiService.updateModalModuleData(Module);
   this.apiService.updateModalSubModuleData(SubModule);
   this.apiService.updateFeedbackTypeData(Feedbacktype);
   this.apiService.updateModalStatusData(Status);

   const dialogRef = this.dialog.open(ModalComponent, {
    width: '1000px', // Customize the width as needed
  });
 }

closeModal() {
   this.showModel = false;
   console.log("parent close")
}

}