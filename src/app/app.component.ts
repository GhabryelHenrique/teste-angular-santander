import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
  <app-header></app-header>
    <section class="pt-4">
      <router-outlet></router-outlet>
    </section>
    `,
})
export class AppComponent {
}
