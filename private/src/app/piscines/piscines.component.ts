import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-piscines',
  templateUrl: './piscines.component.html',
  styleUrls: ['./piscines.component.scss']
})
export class PiscinesComponent implements OnInit {


  options = {
    layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng( 48.117266, -1.6777926)
};



  constructor() { }

  ngOnInit() {
  }

}
