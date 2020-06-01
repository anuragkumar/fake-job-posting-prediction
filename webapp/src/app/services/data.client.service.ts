import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DataClientService {
  url = 'https://myflaskserver-capstone.herokuapp.com/';
  constructor(private httpClient: HttpClient) {}

  getDataset = () => {
    return fetch(this.url + 'data/datarecords')
      .then(res => res.json());
  }

  getPredictedDataset = () => {
    return fetch(this.url + 'data/predictedDataRecords')
      .then(res => res.json());
  }


  getScatterTemplate = () => {
     return this.httpClient.get(this.url + 'scattertext_benefits.html', { responseType: 'text' });
  }

  getReadmeTemplate = () => {
    return this.httpClient.get(this.url + 'readme_template.html', { responseType: 'text' });
  }

  getBarPlotData = (plotInfo) => {
    return this.httpClient.post(this.url + 'eda/industry', plotInfo, httpOptions);
  }

  getOrigBarPlotData = (plotInfo) => {
    return this.httpClient.post(this.url + 'eda/origPlot', plotInfo, httpOptions);
  }
}
