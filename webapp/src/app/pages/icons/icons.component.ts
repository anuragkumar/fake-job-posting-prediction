import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {DataClientService} from '../../services/data.client.service';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  // private myTemplate: any = '';

  constructor(private dataService: DataClientService) {}

  ngOnInit() {
    this.createMyChart('industry', 'industryChart', 'red');
    this.createMyChart('function', 'functionChart', 'yellow', 'line');
    this.createMyChart('department', 'departmentChart', 'orange', 'line');
    this.createMyChart('required_experience', 'experienceChart', 'purple');
    this.createMyChart('employment_type', 'employmentChart', 'darkBlue', 'line');
    this.createMyChart('education_bin', 'educationChart', 'blue');
    this.createMyChart('country', 'countryChart1', 'darkGreen');
    this.createMyChart('state', 'stateChart', 'green', 'line');
    this.createMyChart('city', 'cityChart', 'darkPurple', 'line');
    this.createMyChart('telecommuting', 'telecommuteChart', 'darkRed', 'bar', true);
    this.createMyChart('has_company_logo', 'companyLogoChart', 'darkOrange', 'bar', true);
    this.createMyChart('has_questions', 'hasQuestionsChart', 'lightGrey', 'bar', true);

    // this.dataService.getScatterTemplate().subscribe((res:string) => {
    //   this.myTemplate = res;
    // });
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }

  createMyChart = (content, canvasName, chartColor, chartType='bar', flag=false) => {
    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          // ticks: {
          //   suggestedMin: 60,
          //   suggestedMax: 120,
          //   padding: 20,
          //   fontColor: "#9e9e9e"
          // }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.dataService.getBarPlotData({plotName: content, boolean: flag}).subscribe(res => {
      console.log(res);

      const colorCodes = {
        darkRed: ['rgba(100, 30, 22, 0.2)', 'rgba(100, 30, 22, 0.0)', 'rgba(100, 30, 22, 0)', '#641E16'],
        darkPurple: ['rgba(255, 102, 255, 0.2)', 'rgba(255, 102, 255, 0.0)', 'rgba(255, 102, 255, 0)', '#ff66ff'],
        red: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.0)', 'rgba(255, 0, 0, 0)', 'red'],
        purple: ['rgba(155, 89, 182, 0.2)', 'rgba(155, 89, 182, 0.0)', 'rgba(155, 89, 182, 0)', '#9B59B6'],
        darkBlue: ['rgba(255, 0, 102, 0.2)', 'rgba(255, 0, 102, 0.0)', 'rgba(255, 0, 102, 0)', '#ff0066'],
        blue: ['rgba(80, 191, 230, 0.2)', 'rgba(80, 191, 230, 0.0)', 'rgba(80, 191, 230, 0)', '#50BFE6'],
        darkGreen: ['rgba(20, 90, 50, 0.2)', 'rgba(20, 90, 50, 0.0)', 'rgba(20, 90, 50, 0)', '#145A32'],
        green: ['rgba(102, 255, 51, 0.2)', 'rgba(102, 255, 51, 0.0)', 'rgba(102, 255, 51, 0)', '#66ff33'],
        yellow: ['rgba(244, 208, 63, 0.2)', 'rgba(244, 208, 63, 0.0)', 'rgba(244, 208, 63, 0)', '#F4D03F'],
        orange: ['rgba(230, 126, 34, 0.2)', 'rgba(230, 126, 34, 0.0)', 'rgba(230, 126, 34, 0)', '#E67E22'],
        darkOrange: ['rgba(186, 74, 0, 0.2)', 'rgba(186, 74, 0, 0.0)', 'rgba(186, 74, 0, 0)', '#BA4A00'],
        lightGrey: ['rgba(149, 165, 166, 0.2)', 'rgba(149, 165, 166, 0.0)', 'rgba(149, 165, 166, 0)', '#95A5A6'],
      };

      this.canvas = document.getElementById(canvasName);
      this.ctx  = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, colorCodes[chartColor][0]);
      gradientStroke.addColorStop(0.4, colorCodes[chartColor][1]);
      gradientStroke.addColorStop(0, colorCodes[chartColor][2]);


      var myChart = new Chart(this.ctx, {
        type: chartType,
        responsive: true,
        legend: {
          display: false
        },
        data: {
          labels: res[0],
          datasets: [{
            label: 'Industries',
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: colorCodes[chartColor][3],
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: res[1],
          }]
        },
        options: gradientBarChartConfiguration
      });
    });
  }
}
