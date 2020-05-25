import {Injectable} from '@angular/core';


@Injectable()
export class DataClientService {
  constructor() {}

  getDataset = () => {
    return fetch('http://localhost:5000/data/datarecords')
      .then(res => res.json());
  }

  getScatterTemplate = () => {
    return fetch('http://localhost:5000/eda/scatterHTML')
      .then(res => res.json());
  }
}
