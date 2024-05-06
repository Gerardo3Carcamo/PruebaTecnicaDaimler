import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangeAppointmentDateComponent } from './Modals/change-appointment-date/change-appointment-date.component';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { faClock, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { AddAppointmentComponent } from './Modals/add-appointment/add-appointment.component';

@Component({
  selector: 'app-upcoming-appointments',
  templateUrl: './upcoming-appointments.component.html',
  styleUrls: ['./upcoming-appointments.component.scss'],
})
export class UpcomingAppointmentsComponent implements OnInit {
  constructor(
    private dialog: DialogService,
    private apiService: ApiService,
    private alert: AlertService
  ) {}

  items: any = [
    {
      tooltipOptions: {
        tooltipLabel: 'Agregar nueva cita',
      },
      icon: 'pi pi-plus',
      command: () => {
        let addAppointment = this.dialog.open(AddAppointmentComponent, {
          header: 'Crear Cuenta',
          width: '85%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: false
        });
        addAppointment.onClose.subscribe(x =>{
          this.getAppointments();
        });
      },
    },
  ];

  doctorIcon = faUserDoctor;
  clockIcon = faClock;
  appointments: any = [];

  ngOnInit(): void {
    this.getAppointments();
  }

  changeAppointmentDate(id) {
    let change = this.dialog.open(ChangeAppointmentDateComponent, {
      header: 'Crear nueva cita',
      width: '55%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      closable: false,
      data: id,
    });
    change.onClose.subscribe((x) => {
      this.getAppointments();
    });
  }

  getAppointments() {
    this.apiService
      .GetMethod(
        'Appointment/GetAllAppointmentsByPatient?patientId=' +
          localStorage.getItem('hospitium-id')
      )
      .subscribe((x) => {
        if (!x['error']) {
          this.appointments = x['data'];
        } else {
          this.alert.error('Error', x['message']);
        }
      });
  }

  cancelAppointment(id) {
    this.apiService
      .DeleteMethod('Appointment/DeleteAppointment?id=' + id)
      .subscribe((x) => {
        if (!x['error']) {
          this.alert.success('Exito', x['message']);
        } else {
          this.alert.error('Error', x['message']);
        }
        this.getAppointments();
      });
  }

  dateDiff(date) {
    const today = moment(new Date());
    return moment(date).diff(today, 'days');
  }
}
