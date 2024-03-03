import { Component } from '@angular/core';
import {GLOBAL} from "../app-config";
import {MemberService} from "../../services/member.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {

  constructor(private memberService: MemberService, private dialog: MatDialog){}

  dataSource:any[]=this.memberService.tab;
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createdDate', 'actions'];
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
        this.memberService.onDelete(id).subscribe(() => {
          this.dataSource = this.memberService.tab;
        })
    });
  }
}
