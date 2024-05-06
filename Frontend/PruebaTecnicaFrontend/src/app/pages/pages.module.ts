import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card'
import { CalendarModule } from 'primeng/calendar'
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { UpcomingAppointmentsComponent } from './components/Paciente/upcoming-appointments/upcoming-appointments.component';
import { PrescriptionDrugsComponent } from './components/Paciente/prescription-drugs/prescription-drugs.component'
import { ButtonModule } from 'primeng/button';
import { ChangeAppointmentDateComponent } from './components/Paciente/upcoming-appointments/Modals/change-appointment-date/change-appointment-date.component';
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendAppointmentComponent } from './components/Doctor/attend-appointment/attend-appointment.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { MedicationInventoryComponent } from './components/Admin/medication-inventory/medication-inventory.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { AddAppointmentComponent } from './components/Paciente/upcoming-appointments/Modals/add-appointment/add-appointment.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UpcomingAppointmentsComponent,
    PrescriptionDrugsComponent,
    ChangeAppointmentDateComponent,
    AttendAppointmentComponent,
    MedicationInventoryComponent,
    AddAppointmentComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    UtilitiesModule,
    FontAwesomeModule,
    TooltipModule,
    ChartModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule,
    CheckboxModule,
    InputNumberModule,
    SpeedDialModule
  ]
})
export class PagesModule { }
