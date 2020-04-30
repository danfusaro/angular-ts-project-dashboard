import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'app'
  constructor(private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => {
        // Always scroll to top between page/state loads
        document.body.scrollTop = 0
      })
  }
}
