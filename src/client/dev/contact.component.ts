import {Component} from 'angular2/core';

@Component({
	selector: 'contact-cmp',
	template: `
		<h1>I am in Contact component</h1>
	`,
	styles: [`
		h1{
			color: green;
		}
	`]
})
export class ContactComponent {

}