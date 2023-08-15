import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public urlAddress: string = 'https://localhost:7057';
  constructor() { }
}
