import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  // postIllustrations(data : any){
  //   return this.http.post<any>("http://localhost:3000/historyIllustrations/", data);
  // }
  getIllustrations(){
    return this.http.get<any>("https://localhost:44353/api/History/GetAllIllustration");
  }

  deleteIllustration(id: number){
    return this.http.delete<any>("https://localhost:44353/api/History/DeleteIllustrations?Id="+id);
  }
}

