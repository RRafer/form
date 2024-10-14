import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import data from '../../assets/tasks.json';

import "survey-core/defaultV2.css";
import { Model } from "survey-core";
import { SurveyModule } from "survey-angular-ui";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [SurveyModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  surveyModel!: Model;

  constructor(private titleService: Title,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    const form = data.find(t => t.id === this.route.snapshot.paramMap.get('id'));
    this.titleService.setTitle(form?.title ?? 'Ejercicios ingles');
    this.surveyModel = new Model(form);
    this.surveyModel.onComplete.add(this.alertResults);
    this.surveyModel.completeText = 'Enviar tarea';
    this.surveyModel.pageNextText = 'Siguiente';
    this.surveyModel.pagePrevText = 'Anterior';
    this.surveyModel.completedHtml = "<h3>Tarea enviada! La revisaremos en la proxima clase</h3>";
  }

  alertResults(sender: any) {
    const results = JSON.stringify(sender.data);
    alert(results);
  }
}
