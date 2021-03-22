import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded = false;
  filterText = '';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"] && params["brandId"]){
        this.getCarByFilter(params["brandId"],params["colorId"]);
      }else if(params["brandId"]){
        this.getCarByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarByColor(params["colorId"]);
      }
      else {
        this.getCar();
      }
    });
  
  }

  getCar(){
    this.carService.getCar().subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
    })
  }
  getCarByBrand(brandId:Number){
    this.carService.getCarByBrand(brandId).subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
    })
  }
  getCarByColor(colorId:Number){
    console.log(colorId);
    this.carService.getCarByColor(colorId).subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
      console.log(this.cars);
    })
  }
  getCarByFilter(brandId:Number, colorId: Number) {
    this.carService.getCarByBrandAndColor(brandId,colorId).subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
      if(this.cars.length == 0){
        this.toastr.info('Arama sonucunuza ait bir araç bulunmamaktadır.', 'Arama Sonucu');
      }
    })  
  }


}
