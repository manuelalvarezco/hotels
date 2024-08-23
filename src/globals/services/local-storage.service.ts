import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(title:string, data: string){
    localStorage.setItem(`${title}`, data);
  }

  getData(title: string){
    const data = localStorage.getItem(`${title}`);
    return data;
  }
}
