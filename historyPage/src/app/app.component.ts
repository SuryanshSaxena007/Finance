import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'historyPage';
  displayedColumns: string[] = ['SNo', 'name', 'amt_invested', 'MarketGrowth', 'dividends', 'sis', 'fee', 'time_y', 'gross_amt', 'retirementIncome', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  api: any;

  constructor(public service: ApiService){}

  ngOnInit(): void{
    this.getAllIllustrations();
  }

  data:any;

  getAllIllustrations(){
    this.service.getIllustrations()
    .subscribe({
      next:(res: any[] | undefined)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:()=>{
        alert("Error ehile fetching the records.")
      }
    })
    // this.service.getIllustrations().subscribe(
    //   res=>{
    //     console.log(res);
    //     this.data = res;
    //     console.log(this.data);
    //   },
    //   err =>{
    //     console.log(err);
    //   }
    // )
  }
  deleteIllustration(id:number){
    this.service.deleteIllustration(id)
    .subscribe({
      next:()=>{
        alert("Deleted");
        this.getAllIllustrations();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
