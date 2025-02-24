import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
export class OrdersFilterComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  form = this.formBuilder.group({
    customerName: ['']
  })

  @Output()
  filterValue = new EventEmitter<string>()

  ngOnInit(): void {
    this.form.controls.customerName.valueChanges.subscribe( (value) => {
      this.filterValue.emit(value as string);
    })
  }

}
