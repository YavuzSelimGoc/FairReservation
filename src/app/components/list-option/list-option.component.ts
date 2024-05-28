import { Option } from './../../models/option';
import { Field } from './../../models/field';
import { ToastrService } from 'ngx-toastr';
import { OptionService } from './../../services/option.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-option',
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.scss']
})
export class ListOptionComponent implements OnInit{
  fieldId:number
  option:Option[]
  constructor(private optionService:OptionService, private toastrService:ToastrService,private activatedroute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params=>{
      if(params["fieldId"]){
        this.fieldId=params["fieldId"]
        this.getOptions(this.fieldId)
      }
      else{
        this.getOptions(this.fieldId)
      }
      })
  }
  getOptions(id:number) {
    this.optionService.getOptionByFieldId(id).subscribe(repsonse => {
      this.option=repsonse.data
    })
  }
  passive(option:Option){
    this.optionService.passive(option).subscribe(response=>{
    });
  }
  active(option:Option){
    this.optionService.active(option).subscribe(response=>{
    });
  }
  delete(option:Option){
    this.optionService.delete(option).subscribe(response=>{
      setTimeout(window.location.href="/admin/list-option"+this.fieldId,3000);
    });
  }
}
