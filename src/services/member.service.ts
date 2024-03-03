import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Member} from "../models/member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  tab : Member[] = GLOBAL.DB.members;
  constructor(private httpClient: HttpClient) {  }
  onSave(memberToSave:any) : Observable<any>{
    // générateur de requete http en mode post
    // return this.httpClient.post('127.0.0.1:8080/api/member', memberToSave)
    const Member = {
      ...memberToSave,
      id: Math.ceil(Math.random()*1000),
      createdDate: new Date().toISOString()
    }
    this.tab.push(Member);
    return new Observable<any>(observer=>observer.next())
  }

  onUpdate(id:string, form:any):Observable<any>
  {
    // this.httpClient.put('linktorestAPI',form);
    const index= this.tab.findIndex(item=>item.id==id);
    this.tab[index]={
      id:id,
      ...form,
      createdDate: new Date().toISOString()
    }
    return new Observable(observer=>observer.next());
  }

  onDelete(id: string): Observable<any> {
    //return this.httpClient.delete('127.0.0.1:8080/api/member/$(id)');
    this.tab = this.tab.filter(item => item.id != id)
    return new Observable(observer => observer.next())
  }

  getMemberById(idCourant: string) : Observable<Member>{
    //return this.httpClient.get<Member>(`127.0.0.1:8080/api/member/$(id)}`)
    return new Observable(observer =>
      observer.next(this.tab.filter(item => item.id == idCourant) [0] ?? null))
  }
}
