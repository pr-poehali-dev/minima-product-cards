import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { id: 1, name: 'Минималистичная керамическая ваза', price: 2890, image: '/placeholder.svg', quantity: 1 },
  { id: 3, name: 'Льняная скатерть', price: 3200, image: '/placeholder.svg', quantity: 2 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-medium tracking-tight">
            МАГАЗИН
          </Link>
          <nav className="hidden md:flex gap-8 text-sm">
            <Link to="/" className="hover:opacity-60 transition-opacity">Главная</Link>
            <Link to="/catalog" className="hover:opacity-60 transition-opacity">Каталог</Link>
            <Link to="/cart" className="hover:opacity-60 transition-opacity font-medium">Корзина</Link>
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
          <h1 className="text-3xl font-light tracking-tight mb-2">Корзина</h1>
          <p className="text-sm text-muted-foreground">
            {cartItems.length === 0 ? 'Ваша корзина пуста' : `${cartCount} ${cartCount === 1 ? 'товар' : 'товара'}`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground mb-6">Добавьте товары в корзину</p>
            <Link to="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-sm p-4 flex gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeItem(item.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Итого</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Товары ({cartCount})</span>
                    <span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between mb-6">
                  <span className="font-medium">Сумма</span>
                  <span className="text-xl font-light">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <Button className="w-full" size="lg">
                  Оформить заказ
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-xs text-muted-foreground">
          © 2026 Магазин. Минималистичный дизайн для каждого.
        </div>
      </footer>
    </div>
  );
}
