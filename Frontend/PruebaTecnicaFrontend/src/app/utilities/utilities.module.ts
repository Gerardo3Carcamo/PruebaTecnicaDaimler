import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'primeng/sidebar';
import { MixChartComponent } from './components/mix-chart/mix-chart.component';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    SidebarMenuComponent,
    MixChartComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SidebarModule,
    ButtonModule,
    ChartModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule
  ],
  exports: [SidebarMenuComponent, MixChartComponent]
})
export class UtilitiesModule { }
