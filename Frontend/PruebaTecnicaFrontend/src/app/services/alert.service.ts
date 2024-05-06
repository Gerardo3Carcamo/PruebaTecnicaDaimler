import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AlertService {
    
    constructor() { }

    success(title: string, text: string) {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: text,
        });
    }

    error(title: string, text: string) {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: text
        });
    }

    loading() {
        Swal.fire({
            icon: 'success',
            title: 'Cargando',
            showConfirmButton: false,
            timer: 3000
        });
    }

    confirmation(title: string, text: string, confirmBtnText: string) {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmBtnText
        });
    }

    dynamic(title: string, text: string, icon: any) {
        return Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    enterData(title: string, subtitle: string, confirmBtnText: string, errorMsj: string) {
        return Swal.fire({
            title: title,
            text: subtitle,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: confirmBtnText,
            preConfirm: (value) => {
                console.log("🚀 ~ file: alert.service.ts ~ line 57 ~ AlertService ~ enterData ~ value", value)
                if (!value) {
                    Swal.showValidationMessage(`${errorMsj}`)
                }
                return value
            }
        });
     
    }
}