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
    return fetch('http://localhost:5000/eda/scatterHTML')
      .then(res => res.json());
  }

  getBarPlotData = (plotInfo) => {
    return this.httpClient.post('http://localhost:5000/eda/industry', plotInfo, httpOptions);
  }
}
