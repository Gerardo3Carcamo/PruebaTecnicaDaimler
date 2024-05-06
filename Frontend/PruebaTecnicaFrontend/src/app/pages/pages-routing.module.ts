import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { UpcomingAppointmentsComponent } from './components/Paciente/upcoming-appointments/upcoming-appointments.component';
import { PrescriptionDrugsComponent } from './components/Paciente/prescription-drugs/prescription-drugs.component';
import { AttendAppointmentComponent } from './components/Doctor/attend-appointment/attend-appointment.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { MedicationInventoryComponent } from './components/Admin/medication-inventory/medication-inventory.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      //Admin components
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: MedicationInventoryComponent },
      //Doctor components
      { path: 'attend-appointment', component: AttendAppointmentComponent },
      //Patient components
      { path: 'appointments', component: UpcomingAppointmentsComponent },
      { path: 'prescription', component: PrescriptionDrugsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
