import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    { path: ':id', component: FormComponent }
];
