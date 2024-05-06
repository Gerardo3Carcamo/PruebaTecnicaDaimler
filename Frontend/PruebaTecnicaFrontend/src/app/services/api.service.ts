import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getBaseUrl: string = 'https://localhost:7279/api/'

  PostMethod(params: any = {}, actionURL: string) {
    return this.http.post(this.getBaseUrl + actionURL, params).pipe(
      map((Response: any) => {
        return Response;
      })
    );
  }

  GetMethod(actionURL: string) {
    return this.http.get(this.getBaseUrl + actionURL).pipe(
      map((Response: any) => {
        return Response;
      })
    );
  }

  PutMethod(params: any = {}, actionURL: string){
    return this.http.put('' + actionURL, params).pipe(
      map((Response: any) =>{
        return Response;
      })
    );
  }

  PatchMethod(params: any = {}, actionURL: string){
    return this.http.patch(this.getBaseUrl + actionURL, params).pipe(
      map((Response: any)=>{
        return Response;
      })
    );
  }

  DeleteMethod(actionURL: string){
    return this.http.delete(this.getBaseUrl + actionURL).pipe(
      map((response: any) => {
        return response;
      })
    );
  }  
}
