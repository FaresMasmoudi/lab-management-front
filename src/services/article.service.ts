import { Injectable } from '@angular/core';
import {Article} from "../models/article";
import {GLOBAL} from "../app/app-config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  tab_articles: Article[] = [];
  base_url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  onSave(articleToSave: Article): Observable<any> {
    const Article = {
      ...articleToSave,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toISOString()
    }
    return this.httpClient.post(this.base_url + '/articles', Article);
  }

  onUpdate(id: string, form: any): Observable<any> {
    const updatedArticle = {
      ...form,
      id: id,
      createdDate: new Date().toISOString()
    }
    return this.httpClient.put(`${this.base_url}/articles/${id}`, updatedArticle);
  }

  onDelete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.base_url}/articles/${id}`);
  }

  getArticleById(idCourant: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.base_url}/articles/${idCourant}`);
  }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.base_url + '/articles');
  }
}


