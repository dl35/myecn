import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { PiscinesService } from './services/piscines.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import * as geojson from 'geojson';

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

  public mymap: any;
  public geojson: any[] = [];

  public myGeoJsonRoute = null;
  public idLayer = null;
 // markerClusterGroup: L.MarkerClusterGroup;
//  markerClusterData: any[] = [];
//  markerClusterOptions: L.MarkerClusterGroupOptions;






  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng(48.117266, -1.6777926)
  };

  constructor(private pservices: PiscinesService) { }

  ngOnInit() {


    this.mymap = L.map('mapid').setView([48.117266, -1.6777926], 8);

    this.mymap.removeControl(this.mymap.zoomControl);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }
    ).addTo(this.mymap);

    const bbox = this.mymap.getBounds().toBBoxString();



    this.pservices.getdatas(bbox).subscribe(

      (datas) => { this.generateDatas(datas); },
      (error) => console.log(error)

    );

    /*   this.mymap.on('moveend' , function (e , this ) {
           console.log( 'move end ' + e.target.getBounds().toBBoxString()    ) ;
           const b = e.target.getBounds().toBBoxString() ;
           this.pservices.getdatas(b).subscribe(

                (datas) => { console.log( datas ) } ,
             (error) =>  console.log( error )

           );

       }*
         ) ;*/

    this.mymap.on('moveend', (e) => {
      this.test(e);
    });


  }

  test(e) {
    const b = e.target.getBounds().toBBoxString();

    this.pservices.getdatas(b).subscribe(

      (datas) => { this.generateDatas(datas); console.log(datas.length); },
      (error) => console.log(error)

    );
  }

  /*
  .ui-icon-waze {
    background: url(waze.png) 50% 50% no-repeat;
    background-size: 24px 24px;
    border-radius:0px!important;
    -moz-border-radius:0px!important;
    -webkit-border-radius:0px!important;
    -ms-border-radius:0px!important;
    -o-border-radius:0px!important;
  }
*/

  generateDatas(datas) {

    if (this.myGeoJsonRoute) {
      this.mymap.removeLayer(this.myGeoJsonRoute);
    }

  /*  const geojsonMarkerOptions = {
      radius: 8,
      fillColor: '#ff7800',
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
*/


    this.myGeoJsonRoute = L.geoJSON(datas, {

      //   icon: MonIcon ,
      onEachFeature: function EachFeature(feature, layer) {


        if (feature.properties && feature.properties.name) {
     //     const waze = 'waze://?ll=' + feature.geometry  + ',' + feature.geometry + '&navigate=yes' ;
     const ww = 'ww' ;
     const a = '<a class=\'waze\'  target=\'_blank\'  href=\'https://waze.com/ul?ll=' + feature.properties.waze + '&navigate=yes\' >waze</a>';

          layer.bindPopup('<strong>' + feature.properties.name + '</strong><br>' + feature.properties.ville +
            '<br>' + feature.properties.description + '<br>Bassin: ' + feature.properties.bassin
            + '&nbsp;Couloirs: ' + feature.properties.couloir + '<br>' + a );
        }
      },

    });


    const markers = L.markerClusterGroup({

      // maxClusterRadius: 60,
      // iconCreateFunction: null,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
   /*   iconCreateFunction: function (cluster) {
        return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</span></div>' ,
          className: 'marker-cluster marker-cluster-small', iconSize: new L.Point(40, 40) });
      }*/
    });
    markers.addLayer(this.myGeoJsonRoute);
    this.mymap.addLayer(markers);


    /*

     this.myGeoJsonRoute =  L.geoJSON( datas, {

        pointToLayer: function (feature, latlng) {

          geojsonMarkerOptions.fillColor =  feature.properties.color ;

            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function EachFeature(feature, layer) {
          if (feature.properties && feature.properties.name) {
              layer.bindPopup('<strong>' + feature.properties.name + '</strong><br>' + feature.properties.ville +
              '<br>' + feature.properties.description + '<br>Bassin: ' + feature.properties.bassin
              + '&nbsp;Couloirs: ' + feature.properties.couloir  );
          }
        },

    }).addTo(this.mymap);

    */








  }










}
