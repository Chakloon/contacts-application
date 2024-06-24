import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  birthDate?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  private storageKey = 'contacts';

  constructor() {
    const savedContacts = localStorage.getItem(this.storageKey);
    if (savedContacts) {
      this.contacts = JSON.parse(savedContacts);
    } else {
      this.initializeContacts();
    }
  }

  private initializeContacts() {
    this.contacts = [
      { id: 1, firstName: 'John', lastName: 'Doe', phone: '123456789' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '987654321' },
    ];
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.contacts));
  }

  getAllContacts(): Contact[] {
    return this.contacts;
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find((contact) => contact.id === id);
  }

  addContact(contact: Contact) {
    contact.id = new Date().getTime();
    this.contacts.push(contact);
    this.saveToLocalStorage();
  }

  updateContact(updatedContact: Contact) {
    const index = this.contacts.findIndex(
      (contact) => contact.id === updatedContact.id
    );
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.saveToLocalStorage();
    }
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    this.saveToLocalStorage();
  }
}
