import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {icon, Marker} from 'leaflet';
import {Child} from "../../models/data.model";
import {InteractiveMapService} from "../../interactive-map.service";

declare let L;
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;
  list: Array<Child> = [];
  markers = [];
  marker: any;
  myFeatureGroup: any;
  @Output() sentToDataList = new EventEmitter<object>();

  constructor(public mapService: InteractiveMapService) {
  }

  ngOnInit() {
    this.mapService.getList$.subscribe(list => {
      if (list) {
        this.list = [...list].sort((a: Child, b: Child) => a.name.localeCompare(b.name));
        this.addMarker();
      }
    });
    this.addMap();
  }

  addMap() {
    this.map = L.map('map').setView([48.86, 2.35], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidmljdG9yNDMiLCJhIjoiY2p0NmR0bjhvMGV4NDRhbXN4MmF3MXVoayJ9.qHf_DofrrJ760rbyZJSq7A'
    }).addTo(this.map);

  }

  getRandomLatLng() {
    return [
      48.86 + 0.05 * Math.random() - 0.05,
      2.35 + 0.05 * Math.random() - 0.05
    ];
  }

  getRandomId() {
    return Date.now();
  }

  addMarker() {
    if (this.myFeatureGroup) {
      this.map.removeLayer(this.myFeatureGroup)
    }
    this.myFeatureGroup = L.featureGroup().addTo(this.map);
    this.list.map((childMarker) => {
      this.marker = new L.marker(this.getRandomLatLng(), {
        title: `${childMarker.name}`,
        id: this.getRandomId()
      }).addTo(this.myFeatureGroup);
      this.markers.push(this.marker);
      this.marker.on("click", (e) => {
        this.deleteClickedMarker(e)
      });
    });
  }

  deleteClickedMarker(e) {
    this.myFeatureGroup.removeLayer(e.target);
    // console.dir(e.target);
    const upDateDataList = this.list.filter((child: Child) => child.name === e.target.options.title);
    // console.warn('upDateDataList', upDateDataList[0]);
    this.sentToDataList.emit(upDateDataList[0]);

    const listChange = this.list.filter((child: Child) => child.name !== e.target.options.title);
    // console.warn('listChange', listChange);
    this.list = listChange;
    this.migrateList(listChange);

  }

  migrateList(list) {
    this.mapService.upDateList(list);
  }

}
