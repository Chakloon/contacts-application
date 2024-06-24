import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Contact, ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchQuery: string = '';

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    this.contacts = this.contactService.getAllContacts();
  }

  searchContacts() {
    if (this.searchQuery) {
      this.contacts = this.contactService
        .getAllContacts()
        .filter((contact) =>
          `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
    } else {
      this.contacts = this.contactService.getAllContacts();
    }
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id);
    this.contacts = this.contactService.getAllContacts();
  }

  editContact(id: number) {
    this.router.navigate([`add-edit-contact/${id}`]);
  }

  detailsContact(id: number) {
    this.router.navigate([`contact-detail/${id}`]);
  }

  addContact() {
    this.router.navigate([`add-edit-contact`]);
  }
}
