import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, ContactService } from '../services/contact.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddEditContactComponent implements OnInit {
  contactForm: FormGroup;
  contactId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.email]],
      birthDate: [''],
      address: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.contactId = +id;
        this.isEditMode = true;
        const contact = this.contactService.getContactById(this.contactId);
        if (contact) {
          this.contactForm.patchValue(contact);
        }
      }
    });
  }

  onSubmit() {
    this.saveContact();
  }

  saveContact() {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      if (this.contactId) {
        contact.id = this.contactId;
        this.contactService.updateContact(contact);
      } else {
        this.contactService.addContact(contact);
      }
      this.router.navigate(['/']);
    }
  }
}
