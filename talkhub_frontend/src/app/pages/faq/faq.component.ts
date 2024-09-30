import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  faqs = [
    {
      question: 'How do I create a new discussion?',
      answer: 'To create a new discussion, click on the "New Discussion" link in the sidebar and fill out the form.',
      isOpen: false,
    },
    {
      question: 'How can I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the instructions to reset your password.',
      isOpen: false,
    },
    {
      question: 'How do I change my profile picture?',
      answer: 'Go to your profile settings and upload a new profile picture.',
      isOpen: false,
    },
    // Add more FAQs as needed
  ];

  toggleFAQ(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
