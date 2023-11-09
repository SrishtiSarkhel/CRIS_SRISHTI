import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-failure-details',
  templateUrl: './failure-details.component.html',
  styleUrls: ['./failure-details.component.css']
})
export class FailureDetailsComponent {
  title = 'FailureDetails';
  hidden: boolean = true;
  defaultdata:any[] =[];
  divisionlist:any[] =[];
  zonelist:any[]
  

  constructor(private apiService: ApiService){}  
  ngOnInit(): void { 

    this.apiService.getTotalCountFailiure().subscribe((data: any[])=>{
      console.log('Data for dropdown of total count wise:',data);
      this.defaultdata=data;
     });
  }

  
  onZoneSelected(value:string){
    console.log("the selected zone is " + value);
    this.apiService.getDivisionRail(value).subscribe(data=>{
      console.log('Data from Division api:',data);
      this.divisionlist=data;
    });
  }
}
