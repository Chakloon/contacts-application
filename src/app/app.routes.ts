import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contact-detail/:id', component: ContactDetailComponent },
  { path: 'add-edit-contact', component: AddEditContactComponent },
  { path: 'add-edit-contact/:id', component: AddEditContactComponent },
  { path: '**', redirectTo: '/contacts' },
];
