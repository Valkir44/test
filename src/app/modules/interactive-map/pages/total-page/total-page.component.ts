import {Component, OnInit} from '@angular/core';
import {InteractiveMapService} from "../../interactive-map.service";
import {Child, Parent} from "../../models/data.model";

@Component({
  selector: 'app-total-page',
  templateUrl: './total-page.component.html',
  styleUrls: ['./total-page.component.scss']
})
export class TotalPageComponent implements OnInit {
  list: Array<Parent>;

  constructor(public mapService: InteractiveMapService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.mapService.data().subscribe(list => {
      this.list = list;
    })
  }

  receive($event) {
    console.dir($event);
    this.list.map(parent => {
      if ($event && (parent.id === $event.parent_id)) {
        parent.children.push($event);
        parent.children.sort((a: Child, b: Child) => a.name.localeCompare(b.name));
      }
    })
  }

}
