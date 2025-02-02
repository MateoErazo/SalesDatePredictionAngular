import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewOrderFormComponent } from './orders/new-order-form/new-order-form.component';
import { OrdersPredictionIndexComponent } from './orders/orders-prediction-index/orders-prediction-index.component';

export const routes: Routes = [
    {path:'', component:OrdersPredictionIndexComponent},
    {path:'orders/new', component: NewOrderFormComponent},
    {path:'**', component: OrdersPredictionIndexComponent}
];
