import {Component} from 'angular2/core';

@Component({
	selector: 'home-cmp',
	template: `
		<h1>I am in Home Component</h1>
	`,
	styles: [`
			h1 {
				color: orange;
			}
	`]
})
export class HomeComponent{

}