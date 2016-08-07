import {AboutComponent} from './about.component';
import {ContactComponent} from './contact.component';
import {HomeComponent} from './home.component';

export const routes: any[] = [{
	path: '/about',
	component: AboutComponent, 
	name: 'About'
}, {
	path: '/contact',
	component: ContactComponent,
	name: 'Contact'
}, {
	path: '/',
	component: HomeComponent,
	name: 'Home',
	useAsDefault: true
}];