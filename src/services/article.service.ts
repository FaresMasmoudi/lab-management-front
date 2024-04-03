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
/*
  onSave(articleToSave: Article): Observable<any> {
    const Article = {
      ...articleToSave,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toISOString()
    }
    this.httpClient.post(this.base_url + '/articles', Article);
  }*/

  onUpdate(id: string, form: any): Observable<any> {
    // this.httpClient.put('linktorestAPI',form);
    const index = this.tab_articles.findIndex(item => item.id == id);
    this.tab_articles[index] = {
      id: id,
      ...form,
      createdDate: new Date().toISOString()
    }
    return new Observable(observer => observer.next());
  }

  onDelete(id: string): Observable<any> {
    //return this.httpClient.delete('127.0.0.1:8080/api/member/$(id)');
    this.tab_articles = this.tab_articles.filter(item => item.id != id)
    return new Observable(observer => observer.next())
  }

  getArticleById(idCourant: string): Observable<Article> {
    //return this.httpClient.get<Member>(`127.0.0.1:8080/api/member/$(id)}`)
    return new Observable(observer =>
      observer.next(this.tab_articles.filter(item => item.id == idCourant) [0] ?? null))

  }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.base_url + '/articles');
  }
}


