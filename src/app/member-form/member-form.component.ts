import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../../models/member";

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit{

  // injection de dépendences

  constructor(private memberService: MemberService, private router: Router, private activatedRoute:ActivatedRoute){
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
      this.memberService.getMemberById(this.idCourant).subscribe((m) => this.editForm(m))
    }
    // else je suis dans create => this.initForm()
    else
    this.initForm();
  }

  initForm(): void
  {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {

    if(!!this.idCourant)
    {
      //je suis dans edit
      this.memberService.onUpdate(this.idCourant, this.form.value).subscribe(()=>{
        this.router.navigate(['/members'])})
    }
    else {
      // récupération des valeurs
      const memberToSave = this.form.value;
      this.memberService.onSave(memberToSave).subscribe(()=>{
        this.router.navigate(['/members'])
      })
    }
  }

  private editForm(m: Member) {
    this.form = new FormGroup({
      cin: new FormControl(m.cin, [Validators.required]),
      name: new FormControl(m.name, [Validators.required]),
      cv: new FormControl(m.cv, [Validators.required]),
      type: new FormControl(m.type, [Validators.required])
    })
  }
}
