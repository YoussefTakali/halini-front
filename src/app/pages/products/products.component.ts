import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  arabicName: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  isPremium?: boolean;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  weight: string;
  shelfLife: string;
}

interface Category {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  productCount: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedCategory: string = 'all';
  sortBy: string = 'featured';
  searchTerm: string = '';
  productQuantities: { [key: number]: number } = {};
  
  categories: Category[] = [
    {
      id: 'all',
      name: 'All Products',
      arabicName: 'جميع المنتجات',
      description: 'Complete collection of authentic Tunisian sweets',
      productCount: 16
    },
    {
      id: 'traditional',
      name: 'Traditional Sweets',
      arabicName: 'الحلويات التقليدية',
      description: 'Time-honored recipes passed down through generations',
      productCount: 6
    },
    {
      id: 'premium',
      name: 'Premium Collection',
      arabicName: 'المجموعة المميزة',
      description: 'Luxury confections made with finest ingredients',
      productCount: 4
    },
    {
      id: 'seasonal',
      name: 'Seasonal Specials',
      arabicName: 'المناسبات الموسمية',
      description: 'Limited time offerings for special occasions',
      productCount: 3
    },
    {
      id: 'gift-boxes',
      name: 'Gift Boxes',
      arabicName: 'علب الهدايا',
      description: 'Beautifully packaged assortments perfect for gifting',
      productCount: 3
    }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Classic Baklawa Assortment',
      arabicName: 'بقلاوة كلاسيكية متنوعة',
      description: 'Traditional layered phyllo pastry filled with nuts and sweetened with honey syrup',
      price: 28.99,
      originalPrice: 34.99,
      image: 'assets/products/baklawa-classic.jpg',
      category: 'traditional',
      isFeatured: true,
      isOnSale: true,
      rating: 4.9,
      reviewCount: 127,
      ingredients: ['Phyllo pastry', 'Mixed nuts', 'Honey', 'Rose water', 'Butter'],
      weight: '500g',
      shelfLife: '14 days'
    },
    {
      id: 2,
      name: 'Premium Ma\'moul Collection',
      arabicName: 'معمول فاخر',
      description: 'Delicate semolina cookies filled with dates, pistachios, and walnuts',
      price: 24.99,
      image: 'assets/products/maamoul-premium.jpg',
      category: 'premium',
      isFeatured: true,
      rating: 4.8,
      reviewCount: 89,
      ingredients: ['Semolina flour', 'Dates', 'Pistachios', 'Walnuts', 'Rose water'],
      weight: '400g',
      shelfLife: '21 days'
    },
    {
      id: 3,
      name: 'Diamond Makroudh',
      arabicName: 'مقروض الماس',
      description: 'Diamond-shaped semolina sweets filled with dates and almonds',
      price: 26.50,
      image: 'assets/products/makroudh-diamond.jpg',
      category: 'traditional',
      isNew: true,
      rating: 4.7,
      reviewCount: 64,
      ingredients: ['Semolina', 'Date paste', 'Almonds', 'Orange blossom water'],
      weight: '350g',
      shelfLife: '18 days'
    },
    {
      id: 4,
      name: 'Halawat El Jibn Deluxe',
      arabicName: 'حلاوة الجبن الفاخرة',
      description: 'Sweet cheese rolls with rose water, pistachios, and cream',
      price: 22.99,
      image: 'assets/products/halawat-deluxe.jpg',
      category: 'premium',
      rating: 4.6,
      reviewCount: 45,
      ingredients: ['Fresh cheese', 'Pistachios', 'Rose water', 'Sugar syrup', 'Cream'],
      weight: '300g',
      shelfLife: '7 days'
    },
    {
      id: 5,
      name: 'Ramadan Special Box',
      arabicName: 'علبة رمضان الخاصة',
      description: 'Curated selection of traditional sweets perfect for Ramadan celebrations',
      price: 45.99,
      originalPrice: 52.99,
      image: 'assets/products/ramadan-box.jpg',
      category: 'seasonal',
      isOnSale: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 156,
      ingredients: ['Mixed traditional sweets', 'Premium packaging'],
      weight: '800g',
      shelfLife: '14 days'
    },
    {
      id: 6,
      name: 'Ghraiba Butter Cookies',
      arabicName: 'غريبة الزبدة',
      description: 'Melt-in-your-mouth butter cookies with almonds and powdered sugar',
      price: 19.99,
      image: 'assets/products/ghraiba-butter.jpg',
      category: 'traditional',
      rating: 4.8,
      reviewCount: 93,
      ingredients: ['Butter', 'Almonds', 'Flour', 'Powdered sugar', 'Rose water'],
      weight: '250g',
      shelfLife: '30 days'
    },
    {
      id: 7,
      name: 'Luxury Gift Collection',
      arabicName: 'مجموعة هدايا فاخرة',
      description: 'Elegant wooden box containing our finest selection of handcrafted sweets',
      price: 89.99,
      image: 'assets/products/luxury-gift.jpg',
      category: 'gift-boxes',
      isPremium: true,
      rating: 4.9,
      reviewCount: 78,
      ingredients: ['Assorted premium sweets', 'Wooden gift box', 'Silk ribbon'],
      weight: '1.2kg',
      shelfLife: '21 days'
    },
    {
      id: 8,
      name: 'Qatayef Asafiri',
      arabicName: 'قطايف عصافيري',
      description: 'Small pancakes filled with nuts and cream, fried to golden perfection',
      price: 31.99,
      image: 'assets/products/qatayef-asafiri.jpg',
      category: 'seasonal',
      isNew: true,
      rating: 4.7,
      reviewCount: 34,
      ingredients: ['Pancake batter', 'Mixed nuts', 'Cream', 'Sugar syrup', 'Cinnamon'],
      weight: '400g',
      shelfLife: '3 days'
    }
  ];

  filteredProducts: Product[] = [];

  constructor(private cartService: CartService) { 
    // Initialize quantities to 1 for each product
    this.products.forEach(product => {
      this.productQuantities[product.id] = 1;
    });
  }

  ngOnInit(): void {
    this.filterProducts();
  }

  addToCart(product: Product): void {
    const quantity = this.productQuantities[product.id] || 1;
    this.cartService.addToCart(product, quantity);
  }

  updateQuantity(productId: number, change: number): void {
    const currentQty = this.productQuantities[productId] || 1;
    const newQty = Math.max(1, currentQty + change);
    this.productQuantities[productId] = newQty;
  }

  getProductQuantity(productId: number): number {
    return this.productQuantities[productId] || 1;
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.filterProducts();
  }

  onSortChange(): void {
    const selectElement = document.getElementById('sort-select') as HTMLSelectElement;
    this.sortBy = selectElement.value as 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
    this.filterProducts();
  }

  onSearchChange(event?: Event): void {
    if (event) {
      const target = event.target as HTMLInputElement;
      this.searchTerm = target.value;
    }
    this.filterProducts();
  }

  filterProducts(): void {
    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.arabicName.includes(this.searchTerm) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    switch (this.sortBy) {
      case 'featured':
        filtered = filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
    }

    this.filteredProducts = filtered;
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('fas fa-star');
      } else if (i - 0.5 <= rating) {
        stars.push('fas fa-star-half-alt');
      } else {
        stars.push('far fa-star');
      }
    }
    return stars;
  }

  getDiscountPercentage(originalPrice: number, currentPrice: number): number {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filterProducts();
  }
}
