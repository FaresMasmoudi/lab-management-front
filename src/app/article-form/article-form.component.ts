import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../services/article.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Article} from "../../models/article";


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit{

  type:string;
  titre:string;

  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private dialogRef: MatDialogRef<ArticleFormComponent>,
              @Inject(MAT_DIALOG_DATA) data:any){
              this.type = data.type;
              this.titre = data.titre;
  }

  form !: FormGroup;
  idCourant !: string

  ngOnInit(): void //se charge par défaut quand on lance le composant (plus rapide que le constructeur)
  {
    this.idCourant=this.activatedRoute.snapshot.params['id']
    //if id existe et a une valeur =>
    // je suis dans edit
    // getMemberById(id => Member => this.initForm2(Member)
    if(!!this.idCourant){
      this.articleService.getArticleById(this.idCourant).subscribe((a) => this.editForm(a))
    }
    // else je suis dans create => this.initForm()
    else
      this.initForm();
  }

  initForm(): void
  {
    this.form = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      titre: new FormControl(null, [Validators.required]),
    })
  }
/*
  onSubmit() {

    if(!!this.idCourant)
    {
      //je suis dans edit
      this.articleService.onUpdate(this.idCourant, this.form.value).subscribe(()=>{
        this.router.navigate(['/articles'])})
    }
    else {
      // récupération des valeurs
      const articleToSave = this.form.value;
      this.articleService.onSave(articleToSave).subscribe(()=>{
        this.router.navigate(['/articles'])
      })
    }
  }
  */


  private editForm(a: Article) {
    this.form = new FormGroup({
      type: new FormControl(a.type, [Validators.required]),
      article: new FormControl(a.titre, [Validators.required]),
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}


