import { Component, OnInit } from "@angular/core";
import {DataClientService} from '../../services/data.client.service';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  jobsData: [];
  features: any;
  selectedFeatures: any;

  constructor(private dataService: DataClientService) {}

  ngOnInit() {
    this.dataService.getPredictedDataset().then(res => {
      console.log(res);
      this.jobsData = res;
      this.selectedFeatures = ['fraudulent', 'predict', 'prob_fake', 'job_id', 	'title', 'location',	'department',
        'employment_type',	'required_experience',	'required_education',
        'industry',	'function'];
      this.features = ['fraudulent', 'predict', 'prob_fake', 'job_id', 	'title', 'location',	'department',	'salary_range',	'company_profile',	'description',	'requirements',
        'benefits',	'telecommuting',	'has_company_logo',	'has_questions',	'employment_type',	'required_experience',	'required_education',
        'industry',	'function'];
    });
  }
}
