
import { Component, OnInit } from '@angular/core';
import { LegendLabelsContentArgs } from "@progress/kendo-angular-charts";
import { IntlService } from '@progress/kendo-angular-intl';
import { SeriesLabelsContentArgs } from "@progress/kendo-angular-charts";
import { FormControl, FormGroup, Validators } from "@angular/forms";





@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {



  chart:boolean=false;
  type:any=[] 
  emp:any=[]

  nodeId:any;
  nodeName:any;



  record: any=[
    {name:'Amer',workingHours:3},
    {name:'Bilal',workingHours:5},
    {name:'Cerna',workingHours:7},
    {name:'Dona',workingHours:9},
    {name:'Egle',workingHours:1},
    {name:'Feri',workingHours:12},
  ];


  public treeItems: any[] = [
    {
        text: 'Projects', id: 1, items: []
    },
    {
        text: 'Employee', id: 2, items: []
    }
];


public complexValue = { text: 'QMS', id: 1 };
public complexArrayValue = [{ text: 'Employee', id: 2 }];






  constructor(private intl: IntlService) {
    this.labelContent = this.labelContent.bind(this);
  }


  ngOnInit(): void { 
    
  }

  public labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.name} -> ${args.dataItem.workingHours}`;
  }


    public labelContentDonut(e: SeriesLabelsContentArgs): string {
      return e.category;
    }

  toggleChart(type:any){
    this.chart=true
    this.type=type
  }

}

// -------------------------------------TreeView-----------------------------------------------------