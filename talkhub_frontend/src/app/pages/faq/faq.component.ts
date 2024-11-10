import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
      question: 'Do I have to make an account to make comments?',
      answer: 'To make comments and threads you need to create an account, to register just click the button in your sidebar',
      isOpen: false,
    },
    {
      question: 'How do I report someone for breaking the rules?',
      answer: 'Go to the comment you want to report and click the button in the top right, a moderator will review it later.',
      isOpen: false,
    },
    // Add more FAQs as needed
  ];

  toggleFAQ(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
