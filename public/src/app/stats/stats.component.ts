import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { StatsService } from './services/stats.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

    chart: Chart;
    constructor(private sService: StatsService) { }

    ngOnInit() {
        this.sService.getDatas().subscribe(
            (datas) => { this.initChart(datas) },
            (error) => { },
            () => { }
        );
    }

    private initChart(datas) {

        const denc = datas.enc.datas;
        const dlast = datas.last.datas;

        const sai_enc = 'Saison ' + datas.enc.saison + ' (' + datas.enc.tot + ')';
        const sai_last = 'Saison ' + datas.last.saison + ' (' + datas.last.tot + ')';


        this.chart = new Chart({
            chart: {
                type: 'bar'
            },
            title: {
                text: '',
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['Avenirs', 'Jeunes', 'Juniors', 'Seniors', 'Masters'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Lic.',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' Lic.'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                x: 0,
                y: 0,
                floating: false,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: sai_last,
                color: '#FF0000',
                data: dlast,
                type: undefined
            }, {
                name: sai_enc,
                color: '#047e05',
                data: denc,
                type: undefined
            }
            ]
        });

    }


}
