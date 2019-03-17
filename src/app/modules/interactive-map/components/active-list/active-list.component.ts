import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InteractiveMapService} from "../../interactive-map.service";
import {Child, Parent} from "../../models/data.model";

@Component({
  selector: 'app-active-list',
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.scss']
})
export class ActiveListComponent implements OnInit {
  @Input() dataList: Array<Parent>;
  list: Array<Child> = [];
  @Output() sentToDataList = new EventEmitter<object>();

  constructor(public mapService: InteractiveMapService) {
  }

  ngOnInit() {
    this.mapService.getList$.subscribe(list => {
      if (list) {
        this.list = [...list].sort((a: Child, b: Child) => a.name.localeCompare(b.name));
      }
    });
  }

  deleteFromMap(scope) {
    if (scope.parent_id) {
      this.sentToDataList.emit(scope);
      const remainingChildren = this.list.filter((child: Child) => child.name !== scope.name);
      this.migrateList(remainingChildren);
      this.list = remainingChildren;
    }
  }

  migrateList(list) {
    this.mapService.upDateList(list);
  }
}
