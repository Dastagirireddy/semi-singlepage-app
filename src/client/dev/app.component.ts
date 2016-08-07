import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {routes} from './app.router';

@RouteConfig(routes)
@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <h1 class="text-center page-header">Angular 2 Routing demo</h1>
            <div class="row">
                <div class="col-md-3">
                    <div class="list-group">
                        <a class="list-group-item" [routerLink]="['Home']">Home</a>
                        <a class="list-group-item" [routerLink]="['About']">About</a>
                        <a class="list-group-item" [routerLink]="['Contact']">Contact</a>
                    </div>
                </div>
                <div class="col-md-9">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    styles: [`
        .router-link-active{
            z-index: 2 !important;
            color: #fff !important;
            background-color: #337ab7 !important;
            border-color: #337ab7 !important;
        }
    `]
})
export class AppComponent {
	
}