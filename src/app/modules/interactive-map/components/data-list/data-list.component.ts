import {Component, Input, OnInit} from '@angular/core';
import {Child, Parent} from "../../models/data.model";
import {InteractiveMapService} from "../../interactive-map.service";

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  @Input() dataList: Array<Parent>;
  sharedList: Array<object> = [];
  list: Array<Child> = [];
  check = false;
  closeCheck = true;

  constructor(public mapService: InteractiveMapService) {
  }

  ngOnInit() {
    this.mapService.getList$.subscribe(list => {
      if (list) {
        this.sharedList = [...list];
        (this.sharedList.length === this.checkLength()) ? this.check = true : this.check = false;
      }
    });
  }

  closeList() {
    this.closeCheck = !this.closeCheck
  }

  checkLength() {
    return this.dataList.length * 2;
  }

  addToMap(scope) {
    if (scope.id) {
      scope.children.map(child => this.sharedList.push(child));
      const remainingParents = this.dataList.filter(parent => parent.id === scope.id);
      remainingParents[0].children = [];
    }
    if (scope.parent_id) {
      this.dataList.map(parent => {
        const remainingChildren = parent.children.filter(child => child.name !== scope.name);
        parent.children = [...remainingChildren];
      });
      this.sharedList.push(scope);
    }
    this.migrateList(this.sharedList);
  }

  migrateList(list) {
    this.mapService.upDateList(list);
  }

}
