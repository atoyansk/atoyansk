import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollnavService } from '../../services/scrollnav.service';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { About } from '../../models/about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  navIsFixed: boolean;
  basePath = 'about';
  about: About[];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
            display: false
        }
      }],
      yAxes: [{
        gridLines: {
            display: false
        }
      }]
    }
  };
  barChartLabels = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  chartColors: Array<any> = [{ backgroundColor: '#27dfff'}];
  barChartType = 'horizontalBar';
  barChartLegend = true;
  barChartData = [
    {
      data: [10, 65, 59, 80, 81, 56, 55, 100],
      label: 'My Skills',
      barThickness: 15,
      maxBarThickness: 20,
      minBarLength: 2
    }
  ];

  constructor(@Inject(DOCUMENT) private document: Document,
              private scrollserv: ScrollnavService,
              private crudService: CrudMethodsService) { }

  // scroll to top
  @HostListener('window:scroll', [])
    onWindowScroll() {
      const valor: number = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
      if (valor > 50) {
        this.navIsFixed = true;
        this.scrollserv.setdata(this.navIsFixed);
      } else if (this.navIsFixed && valor < 30) {
        this.navIsFixed = false;
        this.scrollserv.setdata(this.navIsFixed);
      }
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
  }

}
