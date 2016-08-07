import {Component} from 'angular2/core';

@Component({
	selector: 'about-cmp',
	template: `
		<h1>I am in About component</h1>
	`,
	styles: [`
		h1 {
			color: blue;
		}
	`]
})
export class AboutComponent{

}
