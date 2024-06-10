import { AfterViewInit, Component, NgZone } from '@angular/core';
import { get } from 'scriptjs';


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
    
    this.loadCustomJsFiles();
    this.loadExternalStylesheets();
    
    this.load = !this.load;

  }
  loadCustomJsFiles(): void {

    get("../../../assets/plugins/jquery/jquery.min.js", () => {});
    get("../../../assets/plugins/jquery-ui/jquery-ui.min.js", () => {});
    get("../../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js", () => {});
    get("../../../assets/plugins/chart.js/Chart.min.js", () => {});
    get("../../../assets/plugins/sparklines/sparkline.js", () => {});
    get("../../../assets/plugins/jqvmap/jquery.vmap.min.js", () => {});
    get("../../../assets/plugins/jqvmap/maps/jquery.vmap.usa.js", () => {});
    get("../../../assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js", () => {});
    get("../../../assets/plugins/summernote/summernote-bs4.min.js", () => {});
    get("../../../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js", () => {});
    get("../../../assets/js/adminlte.js", () => {});
    get("../../../assets/js/pages/dashboard.js", () => {});

  }

  loadExternalStylesheets() {
    const stylesheets = [
      "../../../assets/plugins/fontawesome-free/css/all.min.css",
      "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
      "../../../assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
      "../../../assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
      "../../../assets/plugins/jqvmap/jqvmap.min.css",
      "../../../assets/css/adminlte.min.css",
      "../../../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
      "../../../assets/plugins/daterangepicker/daterangepicker.css",
      "../../../assets/plugins/summernote/summernote-bs4.min.css",
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
