import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import data from '../../assets/tasks.json';

import "survey-core/defaultV2.css";
import { Model } from "survey-core";
import { SurveyModule } from "survey-angular-ui";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [SurveyModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  surveyModel!: Model;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    const form = data.find(t => t.id === this.route.snapshot.queryParamMap.get('id'))?.survey;
    this.titleService.setTitle(form?.title ?? 'Ejercicios ingles');
    this.surveyModel = new Model(form);
    this.surveyModel.onComplete.add((survey) => {
      const data: any = [];
      Object.keys(survey.data).forEach(key => {
        const question = survey.getQuestionByName(key);
        if (question) {
          data.push({
            title: question.title,
            value: question.value
          })
        }
      })
  
      this.http.post("https://script.google.com/macros/s/AKfycbzRgva1k9CEtXdSuTS30jKYdPo5dN91wScab-_wGZ_JYERFn2bH2TEH9p6i9v66SeM/exec", JSON.stringify(data), {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }})
        .subscribe((response) => {
        
        });
    });
    this.surveyModel.completeText = 'Enviar tarea';
    this.surveyModel.pageNextText = 'Siguiente';
    this.surveyModel.pagePrevText = 'Anterior';
    this.surveyModel.completedHtml = "<h3>Tarea enviada! La revisaremos en la proxima clase</h3>";
  }
}
