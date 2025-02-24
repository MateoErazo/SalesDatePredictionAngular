import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-orders-filter',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.css'
})
export class OrdersFilterComponent implements OnInit, OnChanges {
  
  private ignoreEmit = false;
  private formBuilder = inject(FormBuilder)
  form = this.formBuilder.group({
    customerName: ['']
  })

  @Input()
  customerName!:string

  @Output()
  filterValue = new EventEmitter<string>()

  ngOnInit(): void {
    this.form.controls.customerName.valueChanges.subscribe( (value) => {
      if(this.ignoreEmit) return;
      this.filterValue.emit(value as string);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['customerName'] && this.customerName){
      this.ignoreEmit = true;
      this.form.patchValue({customerName:this.customerName})
      this.ignoreEmit = false;
    }
  }

}