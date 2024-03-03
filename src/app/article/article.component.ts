import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {GLOBAL} from "../app-config";
import {MatTableDataSource} from "@angular/material/table";
import {Article} from "../../models/article";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'type', 'titre', 'createdDate'];
  dataSource = new MatTableDataSource<any>(this.articleService.tab);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private articleService: ArticleService, private dialog: MatDialog){

  }

  protected readonly GLOBAL = GLOBAL;

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
          this.dataSource = new MatTableDataSource<any>(this.articleService.tab);
        })
    });
  }
}

