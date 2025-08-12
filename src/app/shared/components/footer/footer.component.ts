import { Component, Input } from '@angular/core';

export interface FooterLink {
  label: string;
  path?: string;
  external?: boolean;
  url?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() sections: FooterSection[] = [
    {
      title: 'Our Sweets',
      links: [
        { label: 'Traditional Collection', path: '/products/traditional' },
        { label: 'Premium Selection', path: '/products/premium' },
        { label: 'Gift Boxes', path: '/products/gifts' },
        { label: 'Custom Orders', path: '/custom-orders' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Our Story', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Locations', path: '/locations' },
        { label: 'Careers', path: '/careers' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', path: '/faq' },
        { label: 'Shipping Info', path: '/shipping' },
        { label: 'Returns', path: '/returns' },
        { label: 'Care Instructions', path: '/care' }
      ]
    }
  ];

  @Input() companyName = 'Hallini - حليني';
  @Input() year = new Date().getFullYear();

  socialLinks = [
    { icon: 'fab fa-facebook', url: '#', label: 'Facebook' },
    { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
    { icon: 'fab fa-twitter', url: '#', label: 'Twitter' },
    { icon: 'fab fa-youtube', url: '#', label: 'YouTube' }
  ];

  constructor() {}

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
