import {Component} from 'angular2/core';
import {SidebarComponent} from './sidebar.component';


@Component({
	selector: 'analytics-cmp',
	templateUrl: '../partials/dashboard.html',
	directives: [SidebarComponent]
})
export class AnalyticsComponent {

}
