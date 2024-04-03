import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {GLOBAL} from "../app-config";
import {MatTableDataSource} from "@angular/material/table";
import {Article} from "../../models/article";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ArticleFormComponent} from "../article-form/article-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'type', 'titre', 'createdDate'];
  dataSource = new MatTableDataSource<any>();
  tabArticles:Article[]= [];
  getAllData(){
    this.articleService.getArticles().subscribe((data) => {
      this.tabArticles = data;
      this.dataSource.data = this.tabArticles;
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllData();
  }

  constructor(private articleService: ArticleService, private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer, private router: Router){

  }

  delete(id:string) {
    // 1 ouvrir la boite de dialogue
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    // 2 attendre le resultat de l'utilisateur
    // 3 if click sur confirm =>
    // le composant joue le role de subscriber il lance le thread et attend la réponse
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.articleService.onDelete(id).subscribe(() => {
          this.dataSource = new MatTableDataSource<any>(this.articleService.tab_articles);
        })
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      type: "scientifique",
      title: 'Angular For Beginners'
    };
/*
    const dialogRef = this.dialog.open(ArticleFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.articleService.onSave(data)
    );

 */
  }

}
