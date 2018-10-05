import {Component, Input} from '@angular/core';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'data-collection',
  styleUrls: ['./data-table.component.css'],
  templateUrl: './data-table.component.html',
})
export class DataCollectionComponent {
  @Input() data: any[]=[];
  @Input() displayedColumns: any[]=[];
  dataSource: MyDataSource;
  dataSubject = new BehaviorSubject<any[]>([]);
  selection = new SelectionModel<any>(true, []);
  constructor() {}

  ngOnInit() {
    this.dataSource =  new MyDataSource(this.dataSubject);
    this.dataSubject.next(this.data);    
  }
}

export class MyDataSource extends DataSource<any> {
  constructor(private subject: BehaviorSubject<any[]>) {
    super ();
  }
  connect (): Observable<any[]> {
    return this.subject.asObservable();
  }
  disconnect (): void {}
}
