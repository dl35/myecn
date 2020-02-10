import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Marker, icon } from 'leaflet';
import { PiscinesService } from './services/piscines.service';
import 'leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;






@Component({
  selector: 'app-piscines',
  templateUrl: './piscines.component.html',
  styleUrls: ['./piscines.component.css']
})
export class PiscinesComponent implements OnInit {


  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  map: L.Map ;


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng(48.117266, -1.6777926)
  };

  constructor(private pservices: PiscinesService) { }

  ngOnInit() {



  }


onMapReady(map: L.Map) {
  this.map = map ;
  const bbox =  map.getBounds().toBBoxString() ;
  this.pservices.getdatas(bbox).subscribe(
      (datas) => { this.generateDatas(datas); },
      () =>  { }
    );
      }

      markerClusterReady(group: L.MarkerClusterGroup) {
        this.markerClusterGroup = group;
     }



      generateDatas(data: any) {

          const result: any[] = [];
          data.forEach(function (item) {

              const  marker =  new L.Marker([item.geometry.coordinates[1], item.geometry.coordinates[0]]);
              marker.bindPopup(  this.createPopup( item.properties ) );
              result.push( marker );
          }, this );

          this.markerClusterData =  result ;
      }


      refreshData(): void {
      const bbox =  this.map.getBounds().toBBoxString() ;
        this.pservices.getdatas(bbox).subscribe(
      (datas) => { this.generateDatas(datas); },
      () =>  { }
      );
      }


      createPopup( item ) {
      let str = '' ;

        if (item && item.name) {

     const a = '<a   target=\'_blank\'  href=\'https://waze.com/ul?ll=' + item.waze + '&navigate=yes\' >' +
     '<img border=\'0\' src=\'assets/images/waze.png\' width=\'24\'  height=\'24\' ></a>';
      const g = '<a   target=\'_blank\'  href=\'http://maps.google.com/maps?q=' + item.waze + '\' >' +
     '<img border=\'0\' src=\'assets/images/map.png\' width=\'24\'  height=\'24\' ></a>';

      str = '<strong>' + item.name + '</strong><br>' + item.ville +
            '<br>' + item.description + '<br>Bassin:<br> ' ;
      item.bassins.forEach( function (e) {
        str += e ;
        str += '<br>';
      }
      )  ;

      str +=  a + '&nbsp;&nbsp;&nbsp;' + g ;

        }
        return str ;
      }




      }

