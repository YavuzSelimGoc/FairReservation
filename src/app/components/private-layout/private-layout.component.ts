import { AfterViewInit, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements AfterViewInit {
  load = true;

  constructor(private ngZone: NgZone) {
  }

  ngAfterViewInit(): void {

    this.loadExternalStylesheets();
          this.load = !this.load;

  }

  loadExternalStylesheets() {
    const stylesheets = [
      "../../../assets/plugins/fontawesome-free/css/all.min.css",
      "../../../assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
      "../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
      "../../../assets/css/adminlte.min.css"
    ];

    stylesheets.forEach((stylesheetUrl: string) => {
      const head = document.getElementsByTagName('head')[0];
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = stylesheetUrl;
      head.appendChild(style);
    });
  }
}
