import { Component, OnInit } from "@angular/core";
import {DataClientService} from '../../services/data.client.service';

@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {
  jobsData: [];
  features: any;
  selectedFeatures: any;

  constructor(private dataservice: DataClientService) {}

  ngOnInit() {
    this.dataservice.getDataset().then(res => {
      console.log(res);
      this.jobsData = res;
      this.selectedFeatures = ['fraudulent', 'job_id', 	'title', 'location',	'department',
        'employment_type',	'required_experience',	'required_education',
        'industry',	'function'];
      this.features = ['fraudulent', 'job_id', 	'title', 'location',	'department',	'salary_range',	'company_profile',	'description',	'requirements',
        'benefits',	'telecommuting',	'has_company_logo',	'has_questions',	'employment_type',	'required_experience',	'required_education',
        'industry',	'function'];
    });
  }
}
