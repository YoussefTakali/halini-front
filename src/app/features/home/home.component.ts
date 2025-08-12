import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProducts: Product[] = [
    {
      id: 1,
      name: 'Baklava Assortment',
      description: 'Traditional layered pastry with nuts and honey',
      price: 24.99,
      originalPrice: 29.99,
      image: 'assets/products/baklava.jpg',
      rating: 5,
      reviews: 152,
      isNew: true
    },
    {
      id: 2,
      name: 'Makroudh',
      description: 'Semolina pastry filled with dates and almonds',
      price: 18.99,
      image: 'assets/products/makroudh.jpg',
      rating: 5,
      reviews: 89
    },
    {
      id: 3,
      name: 'Qatayef',
      description: 'Stuffed pancakes with nuts and sweet syrup',
      price: 21.99,
      image: 'assets/products/qatayef.jpg',
      rating: 4,
      reviews: 67
    },
    {
      id: 4,
      name: 'Halva Assortment',
      description: 'Traditional sesame and pistachio confections',
      price: 16.99,
      image: 'assets/products/halva.jpg',
      rating: 5,
      reviews: 134
    },
    {
      id: 5,
      name: 'Zlabia',
      description: 'Crispy fried pastry soaked in fragrant syrup',
      price: 15.99,
      image: 'assets/products/zlabia.jpg',
      rating: 4,
      reviews: 78
    },
    {
      id: 6,
      name: 'Maamoul',
      description: 'Shortbread cookies filled with dates and nuts',
      price: 19.99,
      image: 'assets/products/maamoul.jpg',
      rating: 5,
      reviews: 95
    }
  ];

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      text: 'The most authentic Tunisian sweets I\'ve ever tasted! The baklava reminds me of my grandmother\'s recipes. Absolutely delicious!',
      avatar: 'assets/testimonials/sarah.jpg'
    },
    {
      id: 2,
      name: 'Ahmed Ben Ali',
      location: 'Paris, France',
      text: 'As a Tunisian living abroad, Hallini brings the taste of home to my doorstep. The quality is exceptional and delivery is always on time.',
      avatar: 'assets/testimonials/ahmed.jpg'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      location: 'Madrid, Spain',
      text: 'I discovered Hallini at a food festival and have been ordering ever since. The makroudh is my absolute favorite!',
      avatar: 'assets/testimonials/maria.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization logic here
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
