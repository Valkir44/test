import {Injectable} from '@angular/core';
import {Parent} from "./models/data.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteractiveMapService {
  _listToShow = new BehaviorSubject(null);
  getList$ = this._listToShow.asObservable();
  list: Array<Parent> = [
    {
      id: 1,
      name: "Parent 1",
      children: [
        {
          name: "Child 1",
          parent_id: 1
        },
        {
          name: "Child 2",
          parent_id: 1
        }
      ]
    },
    {
      id: 2,
      name: "Parent 2",
      children: [
        {
          name: "Child 3",
          parent_id: 2
        },
        {
          name: "Child 4",
          parent_id: 2
        }
      ]
    },
    {
      id: 3,
      name: "Parent 3",
      children: [
        {
          name: "Child 5",
          parent_id: 3
        },
        {
          name: "Child 6",
          parent_id: 3
        }
      ]
    }
  ];

  constructor() {
  }

  data(): Observable<Array<Parent>> {
    const data = Observable.create((list: any) => {
      list.next(this.list)
    });
    return data;
  }

  upDateList(list) {
    this._listToShow.next(list);
  }
}
