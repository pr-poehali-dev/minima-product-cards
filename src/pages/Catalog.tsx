import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  { id: 1, name: 'Минималистичная керамическая ваза', price: 2890, image: '/placeholder.svg', category: 'Декор' },
  { id: 2, name: 'Набор бамбуковых подставок', price: 1490, image: '/placeholder.svg', category: 'Кухня' },
  { id: 3, name: 'Льняная скатерть', price: 3200, image: '/placeholder.svg', category: 'Текстиль' },
  { id: 4, name: 'Стеклянная подсвечник', price: 890, image: '/placeholder.svg', category: 'Декор' },
  { id: 5, name: 'Деревянная разделочная доска', price: 2100, image: '/placeholder.svg', category: 'Кухня' },
  { id: 6, name: 'Хлопковая салфетка (набор 4 шт)', price: 1290, image: '/placeholder.svg', category: 'Текстиль' },
  { id: 7, name: 'Керамическая тарелка ручной работы', price: 1890, image: '/placeholder.svg', category: 'Посуда' },
  { id: 8, name: 'Лаконичная книжная полка', price: 5490, image: '/placeholder.svg', category: 'Мебель' },
];

export default function Catalog() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-medium tracking-tight">
            МАГАЗИН
          </Link>
          <nav className="hidden md:flex gap-8 text-sm">
            <Link to="/" className="hover:opacity-60 transition-opacity">Главная</Link>
            <Link to="/catalog" className="hover:opacity-60 transition-opacity font-medium">Каталог</Link>
            <Link to="/cart" className="hover:opacity-60 transition-opacity">Корзина</Link>
          </nav>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-tight mb-2">Каталог</h1>
          <p className="text-sm text-muted-foreground">Все товары в одном месте</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                  <h3 className="text-sm font-medium leading-tight">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-light">{product.price.toLocaleString('ru-RU')} ₽</span>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product.id)}
                    className="h-8 px-3 text-xs"
                  >
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-xs text-muted-foreground">
          © 2026 Магазин. Минималистичный дизайн для каждого.
        </div>
      </footer>
    </div>
  );
}
