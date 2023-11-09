import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Base URL
  constructor(private http: HttpClient) { }
  

  uploadCsv(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/upload-file`, formData);
  }
  getSubModuleData(mid: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/submodulelist/`+mid); // Append the route, not the full URL
  }

  getModule(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/modulelist`); // Append the route, not the full URL
  }
 
  getZone():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/zonelist`);
  } 

  getDivision(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/divisionlist/`+data);
  }

  getStatus():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/statuslist`);
  }

  getFeedbackType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/feedbacktypelist`); // Append the route, not the full URL
  }
 
  getlogin(): Observable<any> {
    const postData = {}; // Your POST data
    return this.http.post<any>(`${this.apiUrl}/login`, postData);
  }
  
  putFeedbackform(data:any):Observable<any>{
    console.log("Parent caleed")
    return this.http.post<any>(`${this.apiUrl}/parent`,data);
  }

  getfeedbackform(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/userfeedbacklist/`+data);
  }

  getfeedbackaction(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/userfeedbacktxnlist/`+data);
  }

  getFeedbackAdmin():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/feedbacklist4admin`);
  }
 
  getfeedbackActionlist(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/feedbacktxnlist4admin/`+data);
  }

  putAdminFeedbackReply(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/feedbackreply`,data);
  }
  
  putFileorm(formData: FormData){
    console.log("put file form called");
    return this.http.post<any>(`${this.apiUrl}/upload-file`,formData);
  } 

  saveinspectionform(data:any):Observable<any>{
    console.log("SERVICE INSPECT called");
    return this.http.post<any>(`${this.apiUrl}/inspectionsave`,data);
  }

  getpointdropdown():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pointasset`)
  }

  getpointdetails(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pointassetdtls/`+data);
  } 

  getpwaydetails(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pwaydtls/`+data);
  }

  sharedData: any;
   updateSharedData(data: any) {
    this.sharedData = data;
    console.log("service data ",this.sharedData)
  } 

  FeedbacksharedData:any;
  updateFeedbackData(data:any){
    this.FeedbacksharedData=data;
  }
  
  ModalIdData:any;
  updateModalIDData(data:any){
    this.ModalIdData=data;
  }

  ModalModuleData:any;
  updateModalModuleData(data:any){
    this.ModalModuleData=data;
  }
  ModalSubModuleData:any;
  updateModalSubModuleData(data:any){
    this.ModalSubModuleData=data;
  }

  ModalFeedbackData:any;
  updateFeedbackTypeData(data:any){
    this.ModalFeedbackData=data;
  } 
   ModalStatusData:any;
  updateModalStatusData(data:any){
    this.ModalStatusData=data;
  }

  FormPopZoneUser:any;
  updateformZoneData(data:any){
    this.FormPopZoneUser=data;
  }

  FormPopDivisionData:any;
  updateformDivisionData(data:any){
    this.FormPopDivisionData=data;
  }

  FormPopUserData:any;
  updateformUserData(data:any){
    this.FormPopUserData=data;
  }

  FormPopContactData:any;
  updateformContactData(data:any){
    this.FormPopContactData=data;
  }

  PointIDdata:any;
  updatePointIdData(data:any){
    this.PointIDdata=data;
  }

  public closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  triggerOnInit() {
    this.closeModalEvent.emit();
  console.log("MODAL SERVICE CALLLEDDDDD")
  }

 viewImage(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/images/`+data);
  } 

  getRdsoSpec():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/rdsospec4kavach`);
  }
  getMakeforKawach(data:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/make4kavach?rdsospecn=`+data); 
  }
  
  submitAction = new EventEmitter<void>();
  triggerSubmitAction() {
    this.submitAction.emit();
    console.log("EMITTER CALLLEDDDDD")
  }

  getZoneRail():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/zonelist4smms`);
  } 

  getZoneWiseCountRail(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/zonewisecount?zone=`+data);
  } 

  getDivisionRail(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/divisionlist4smms?zone=`+data);
  }

  getDivisionWiseCountRail(data1:any,data2:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/divisionwisecount?zone=`+data1+`&division=`+data2);
  } 

  getSectionRail(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/sectionlist?division=`+data);
  } 

 getSectionWiseRail (data1:any,data2:any,data3:any):Observable<any>{
  console.log("aaaa",data1)
  console.log("bbb",data2)
  console.log("cccc",data3)
    return this.http.get<any>(`${this.apiUrl}/sectionwisecount?zone=`+data1+`&division=`+data2+`&section=`+data3);
  } 


  getTotalCount():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/totalcount`);
  } 

  getTotalList():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/totallistcountwise`);
  }

  getTotalzonewiseList():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/totallistcountwise`);
  }

  getZoneWiseListRail(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/zonewiselist?zone=`+data);
  } 

  getDivisionWiseListRail(data1:any,data2:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/divisionwiselist?zone=`+data1+`&division=`+data2);
  } 

  getSectionWiseListRail (data1:any,data2:any,data3:any):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/sectionwiselist?zone=`+data1+`&division=`+data2+`&section=`+data3);
   } 

   getTotalCountDefault():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/totalcount4dflt`);
   }

   getZoneWiselist4Count(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/zonewiselist4count?zone=`+data);
   }

   getDivisionWiselist4Count(data1:any,data2:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/divisionwiselist4dash?zone=`+data1+`&division=`+data2);
   }

   getSectionWiseList4Dash(data1:any,data2:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/sectionwiselist4dash?zone=`+data1+`&division=`+data2);  
   }

   ZonedashData:any;
   updateZoneDashData(data:any){
     this.ZonedashData=data;
   }

   DivisiondashData:any;
   updateDivisionDashData(data:any){
     this.DivisiondashData=data;
   }
 
   SaveKavachGenralInfo(data:any):Observable<any>{
    console.log("SERVICE SaveKavachGenralInfo called");
    return this.http.post<any>(`${this.apiUrl}/kavachgenralinfosave`,data);
   }

  KavachIDdata: any;
  updateKavachIDData(data: any) {
    this.KavachIDdata = data;
    console.log("SERVICE KAVACHID1111111111111111111",this.KavachIDdata);
  } 

  SaveInstallLocation(data:any):Observable<any>{
    console.log("SERVICE SaveInstallLocation called");
    return this.http.post<any>(`${this.apiUrl}/kavachlocationsave`,data);
   }

   SaveKavachStcas(data:any):Observable<any>{
    console.log("SERVICE kavachstcassave called");
    return this.http.post<any>(`${this.apiUrl}/kavachstcassave`,data);
   }

   SaveKavachSmOperation(data:any):Observable<any>{
    console.log("SERVICE kavachsmoperationsave called");
    return this.http.post<any>(`${this.apiUrl}/kavachsmoperationsave`,data);
   }

   SaveKavachTowerboxsave(data:any):Observable<any>{
    console.log("SERVICE kavachtowerboxsave called");
    return this.http.post<any>(`${this.apiUrl}/kavachtowerboxsave`,data);
   }

   SaveKavachGsmGpsantenasave(data:any):Observable<any>{
    console.log("SERVICE kavachgsmgpsantenasave called");
    return this.http.post<any>(`${this.apiUrl}/kavachgsmgpsantenasave`,data);
   }

   SaveKavachOfchutsave(data:any):Observable<any>{
    console.log("SERVICE Ofchutsavecalled");
    return this.http.post<any>(`${this.apiUrl}/kavachofchutsave`,data);
   }

   SaveKavachRemoteinputsave(data:any):Observable<any>{
    console.log("SERVICE kavachremoteinputsavecalled");
    return this.http.post<any>(`${this.apiUrl}/kavachremoteinputsave`,data);
   }
   
   SaveKavachStationantenasave(data:any):Observable<any>{
    console.log("SERVICE stationantena called");
    return this.http.post<any>(`${this.apiUrl}/kavachstationantenasave`,data);
   }

   SaveKavachRfidsave(data:any):Observable<any>{
    console.log("SERVICE stationantena called");
    return this.http.post<any>(`${this.apiUrl}/kavachrfidsave`,data);
   }
   
   getgeneralinstall(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/kavachgenralinfoget?kawachid=`+data);  
   }

   getkavachcard(data1:any,data2:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/kavachcarddtlsget?kawachid=`+data1+`&cardtype=`+data2);  
   }

   getStationAntennakavachcard(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/kavachstationantenaget?kawachid=`+data);  
   }

   getRfidkavachcard(data:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/kavachrfidget?kawachid=`+data);  
   }

   getDivisiononCountDashBoard():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/divisionlistoncount`);
   }

   GeneralInfoData:any;
   updateGeneralInfoData(data:any){
     this.GeneralInfoData=data;
   }

   InstallLocData:any;
   updateInstallLocoData(data:any){
     this.InstallLocData=data;
   }
   
   StcasData1:any;
   updateStcasData1(data:any){
     this.StcasData1=data;
   }

   StcasData2:any;
   updateStcasData2(data:any){
     this.StcasData2=data;
   }

   StcasData3:any;
   updateStcasData3(data:any){
     this.StcasData3=data;
   }

   StcasData4:any;
   updateStcasData4(data:any){
     this.StcasData4=data;
   }

   StcasData5:any;
   updateStcasData5(data:any){
     this.StcasData5=data;
   }
   
   StcasData6:any;
   updateStcasData6(data:any){
     this.StcasData6=data;
   }

   StcasData7:any;
   updateStcasData7(data:any){
     this.StcasData7=data;
   } 

   SmOperationData:any;
   updateSmOperationData(data:any){
     this.SmOperationData=data;
   } 

   OfcHutData:any;
   updateOfcHutData(data:any){
     this.OfcHutData=data;
   } 

   TowerBoxData1:any;
   updateTowerBoxData1(data:any){
     this.TowerBoxData1=data;
   } 

   TowerBoxData2:any;
   updateTowerBoxData2(data:any){
     this.TowerBoxData2=data;
   } 

   TowerBoxData3:any;
   updateTowerBoxData3(data:any){
     this.TowerBoxData3=data;
   } 

  GsmData:any;
   updateGsmData(data:any){
    this.GsmData=data;
  } 

  GpsData:any;
   updateGpsData(data:any){
    this.GpsData=data;
  } 
  
  RemoteInput1:any;
  updateRemoteInput1(data:any){
    this.RemoteInput1=data;
  } 

  RemoteInput2:any;
  updateRemoteInput2(data:any){
    this.RemoteInput2=data;
  } 

  RemoteInput3:any;
  updateRemoteInput3(data:any){
    this.RemoteInput3=data;
  } 

  RemoteInput4:any;
  updateRemoteInput4(data:any){
    this.RemoteInput4=data;
  } 

  RemoteInput5:any;
  updateRemoteInput5(data:any){
    this.RemoteInput5=data;
  } 


   StationAntennaData:any;
   updateStationAntennaData(data:any){
     this.StationAntennaData=data;
   } 

   RfidData:any;
   updateRfidData(data:any){
     this.RfidData=data;
   } 

   getTotalCountFailiure():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/totalcountfailure`);
   }

    FinalKavachsave(data:any):Observable<any>{
    console.log("SERVICE Final Save Kavach");
    return this.http.get<any>(`${this.apiUrl}/kavachfinalsave?kawachid=`+data); 
   }
  }
