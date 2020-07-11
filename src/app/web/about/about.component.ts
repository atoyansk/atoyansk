import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollnavService } from '../../services/scrollnav.service';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { About } from '../../models/about.model';
import { Skills } from '../../models/skills.model';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  navIsFixed: boolean;
  valor: number;
  basePath = 'about';
  about: About[];

  basePath2 = 'skills';
  softSkills;
  devSkills;

  barChartOptions = {};

  softBar = [];
  softValues = [];
  devBar = [];
  devValues = [];

  chartColors = [];
  barChartType;
  barChartLegend;
  barChartPlugins = [];

  barChartLabels1 = [];
  barChartData1 = [{}];
  barChartLabels2 = [];
  barChartData2 = [{}];

  constructor(@Inject(DOCUMENT) private document: Document,
              private scrollserv: ScrollnavService,
              private crudService: CrudMethodsService) { }

  // scroll to top
  @HostListener('window:scroll', [])
    onWindowScroll() {
      this.valor = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
      if (this.valor > 50) {
        this.navIsFixed = true;
        this.scrollserv.setdata(this.navIsFixed);
      } else if (this.navIsFixed && this.valor < 30) {
        this.navIsFixed = false;
        this.scrollserv.setdata(this.navIsFixed);
      }
      console.log(this.valor);
    }
      scrollToTop() { (function smoothscroll() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }

  ngOnInit() {

    this.crudService.getItems(this.basePath).subscribe(dado => {
      this.about = dado.map(e => {
        const data = e.payload.doc.data() as About;
        data.key = e.payload.doc.id;
        return data;
      });
    });

    this.devSkills = this.crudService.getItem(this.basePath2, 'type', 'dev').pipe(
      map (graph => graph.map(a => {
      const data = a.payload.doc.data() as Skills;
      const id = a.payload.doc.id;
      return { id, ...data };
      })
    ));

    this.devSkills.subscribe(item => {
      item.forEach(i => {
        this.devBar.push(i.name);
        this.devValues.push(i.percentage);
      });
    });


    this.softSkills = this.crudService.getItem(this.basePath2, 'type', 'soft').pipe(
      map (graph => graph.map(a => {
      const data = a.payload.doc.data() as Skills;
      const id = a.payload.doc.id;
      return { id, ...data };
      })
    ));

    this.softSkills.subscribe(item => {
      item.forEach(i => {
        this.softBar.push(i.name);
        this.softValues.push(i.percentage);
      });
    });

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'start',
          offset: 10,
          font: {
            weight: 'bold',
            size: '15'
          },
          color: 'white'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
              display: false
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 15
          },
          gridLines: {
              display: false
          }
        }]
      }
    };

    this.chartColors = [{ backgroundColor: '#27dfff'}];
    this.barChartType = 'horizontalBar';
    this.barChartLegend = false;
    this.barChartPlugins = [pluginDataLabels];


    this.barChartLabels1 = this.softBar;
    this.barChartData1 = [
      {
        data: this.softValues,
        label: 'Soft Skills',
        barThickness: 18,
        maxBarThickness: 20,
        minBarLength: 2
      }
    ];

    this.barChartLabels2 = this.devBar;
    this.barChartData2 = [
      {
        data: this.devValues,
        label: 'Development Skills',
        barThickness: 18,
        maxBarThickness: 20,
        minBarLength: 2
      }
    ];
  }

}
