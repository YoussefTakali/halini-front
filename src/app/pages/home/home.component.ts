import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isFeatured: boolean;
}

interface Testimonial {
  name: string;
  comment: string;
  rating: number;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Baklawa Assortment',
      description: 'Traditional layered pastry with honey and nuts, made with authentic Tunisian recipes',
      price: 25.99,
      image: 'assets/products/baklawa.jpg',
      category: 'pastries',
      isFeatured: true
    },
    {
      id: 2,
      name: 'Ma\'moul Premium Box',
      description: 'Delicate semolina cookies filled with dates and pistachios',
      price: 18.99,
      image: 'assets/products/maamoul.jpg',
      category: 'cookies',
      isFeatured: true
    },
    {
      id: 3,
      name: 'Makroudh Selection',
      description: 'Traditional diamond-shaped sweets filled with dates and almonds',
      price: 22.50,
      image: 'assets/products/makroudh.jpg',
      category: 'traditional',
      isFeatured: true
    },
    {
      id: 4,
      name: 'Halawat El Jibn',
      description: 'Sweet cheese rolls with rose water and pistachios',
      price: 16.99,
      image: 'assets/products/halawat.jpg',
      category: 'cheese-sweets',
      isFeatured: true
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Amira Hassan',
      comment: 'The most authentic Tunisian sweets I\'ve tasted outside of Tunisia. Simply magnificent!',
      rating: 5,
      location: 'Paris, France'
    },
    {
      name: 'Mohamed Al-Rashid',
      comment: 'Hallini brings back childhood memories. The quality is exceptional and the taste is perfect.',
      rating: 5,
      location: 'Dubai, UAE'
    },
    {
      name: 'Sarah Johnson',
      comment: 'Discovered these sweets at a friend\'s party. Now I\'m completely addicted! Amazing quality.',
      rating: 5,
      location: 'New York, USA'
    }
  ];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }

  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < rating ? 'fas fa-star' : 'far fa-star');
  }
}
