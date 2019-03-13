import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { PiscinesService } from './services/piscines.service';
import * as L from 'leaflet';
// import 'leaflet.markercluster';

@Component({
  selector: 'app-piscines',
  templateUrl: './piscines.component.html',
  styleUrls: ['./piscines.component.scss']
})
export class PiscinesComponent implements OnInit {

  public mymap: any;
  public geojson: any[] = [];

  options = {
    layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng( 48.117266, -1.6777926)
};

  constructor(private pservices: PiscinesService) { }

  ngOnInit() {


this.mymap =  L.map('mapid').setView([48.117266, -1.6777926], 8);

  this.mymap.removeControl(this.mymap.zoomControl);

 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }
   ).addTo( this.mymap);



    this.pservices.getdatas().subscribe(

      (datas) => { this.generateDatas( datas ) } ,
      (error) =>  console.log( error )

    );

  }




generateDatas( datas ) {
  const  geojsonMarkerOptions = {
    radius: 8,
    fillColor: '#ff7800',
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};




  L.geoJSON( datas, {
   
    pointToLayer: function (feature, latlng) {

      geojsonMarkerOptions.fillColor =  feature.properties.color ;

        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function EachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.name) {
          layer.bindPopup('<strong>' + feature.properties.name + '</strong><br>' + feature.properties.ville +
          '<br>' + feature.properties.description + '<br>Bassin: ' + feature.properties.bassin
          + '&nbsp;Couloirs: ' + feature.properties.couloir  );
      }
    },

}).addTo(this.mymap);


}










}
