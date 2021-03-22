import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getCar():Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl +'cars/getcarsdetail';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarByBrand(brandId:Number):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl +`cars/getcardetailsbybrandid?brandid=${brandId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarByColor(colorId:Number):Observable<ListResponseModel<Car>>{
    console.log("service",colorId)
    let newPath = environment.apiUrl +`cars/getcardetailsbycolorid?colorid=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarByBrandAndColor(brandId:Number,colorId:Number):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl +`cars/getbybrandandcolor?brandId=${brandId}&colorid=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
