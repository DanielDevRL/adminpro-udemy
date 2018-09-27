import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { PAGES_ROUTES } from '../pages/pages.routes';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports: [
        PAGES_ROUTES,
        SharedModule,
        FormsModule
     ]
})
export class PagesModule { }
