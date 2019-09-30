import { Component, OnInit, ComponentRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { PiscinesService } from './services/piscines.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { PopupComponent } from './popup/popup.component';

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




cref: Array<ComponentRef<PopupComponent>> = [] ;
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

  constructor(private pservices: PiscinesService ,
      private componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector)  { }

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

      this.clearCref();
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

  clearCref() {
    this.cref.forEach(element => {
      element.destroy() ;
    });
   }

   ngOnDestroy(): void {
    this.clearCref();
 
   }
 
 
   public createPopup( data ) {
     const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
     const component = factory.create(this.injector);
     this.cref.push( component );
     //Set the component inputs manually 
     component.instance.data = data  ;
     component.changeDetectorRef.detectChanges();
 
     return component.location.nativeElement;
   }



}
