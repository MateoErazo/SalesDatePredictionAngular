import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewOrderFormComponent } from './orders/new-order-form/new-order-form.component';
import { OrdersPredictionIndexComponent } from './orders/orders-prediction-index/orders-prediction-index.component';
import { OrdersIndexComponent } from './orders/orders-index/orders-index.component';

export const routes: Routes = [
    {path:'', component:OrdersPredictionIndexComponent},
    {path:'orders', component: OrdersIndexComponent},
    {path:'orders/new', component: NewOrderFormComponent},
    {path:'**', component: OrdersPredictionIndexComponent}
];
