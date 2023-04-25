import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart-component',
  templateUrl: './bar-chart-component.component.html',
  styleUrls: ['./bar-chart-component.component.css']
})
export class BarChartComponentComponent implements OnInit {
  chart: any;

  constructor() { }

  ngOnInit() {
    // this.apiService.getData().subscribe((data) => {
    //   // Extract the data you want to display in the chart
    //   const labels = data.map((d) => d.label);
    //   const values = data.map((d) => d.value);
  
    //   // Create the chart
    //   this.chart = new Chart('canvas', {
    //     type: 'bar',
    //     data: {
    //       labels: labels,
    //       datasets: [{
    //         data: values,
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //         borderColor: 'rgba(255, 99, 132, 1)',
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       scales: {
    //         yAxis: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       }
    //     }
    //   });
    // });
  }
  

}
