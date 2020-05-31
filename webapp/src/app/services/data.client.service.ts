import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DataClientService {
  constructor(private httpClient: HttpClient) {}

  getDataset = () => {
    return fetch('http://localhost:5000/data/datarecords')
      .then(res => res.json());
  }

  getScatterTemplate = () => {
    // return fetch('http://localhost:5000/data/scattertext_benefits.html')
    //   .then(res => res.text());
     return this.httpClient.get('http://localhost:5000/data/scattertext_benefits.html', { responseType: 'text' });
  }

  getBarPlotData = (plotInfo) => {
    return this.httpClient.post('http://localhost:5000/eda/industry', plotInfo, httpOptions);
  }
}
