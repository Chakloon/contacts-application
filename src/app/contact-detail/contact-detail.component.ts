import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Contact, ContactService } from '../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.contact = this.contactService.getContactById(+id);
      }
    });
  }

  editContact(id: number) {
    this.router.navigate([`add-edit-contact/${id}`]);
  }
}
