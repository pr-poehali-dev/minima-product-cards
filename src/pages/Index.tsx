import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const featuredProducts = [
  { id: 1, name: 'Минималистичная керамическая ваза', price: 2890, image: '/placeholder.svg', category: 'Декор' },
  { id: 2, name: 'Набор бамбуковых подставок', price: 1490, image: '/placeholder.svg', category: 'Кухня' },
  { id: 3, name: 'Льняная скатерть', price: 3200, image: '/placeholder.svg', category: 'Текстиль' },
  { id: 4, name: 'Стеклянная подсвечник', price: 890, image: '/placeholder.svg', category: 'Декор' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-medium tracking-tight">
            МАГАЗИН
          </Link>
          <nav className="hidden md:flex gap-8 text-sm">
            <Link to="/" className="hover:opacity-60 transition-opacity font-medium">Главная</Link>
            <Link to="/catalog" className="hover:opacity-60 transition-opacity">Каталог</Link>
            <Link to="/cart" className="hover:opacity-60 transition-opacity">Корзина</Link>
          </nav>
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <Icon name="ShoppingCart" size={20} />
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
              Минималистичные товары для современной жизни
            </h1>
            <p className="text-muted-foreground mb-8 text-sm md:text-base max-w-xl">
              Тщательно отобранная коллекция предметов для дома. Простота, качество и функциональность в каждой детали.
            </p>
            <Link to="/catalog">
              <Button size="lg" className="rounded-sm">
                Смотреть каталог
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light tracking-tight mb-2">Популярные товары</h2>
                <p className="text-sm text-muted-foreground">Выбор покупателей этого месяца</p>
              </div>
              <Link to="/catalog" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-xs">
                  Смотреть всё
                  <Icon name="ArrowRight" size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-background overflow-hidden">
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
                      <Button size="sm" className="h-8 px-3 text-xs">
                        В корзину
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/catalog" className="md:hidden block mt-6">
              <Button variant="outline" className="w-full" size="sm">
                Смотреть весь каталог
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-center">
            <div className="text-center space-y-2">
              <Icon name="MessageCircle" size={32} className="mx-auto mb-3 opacity-80" />
              <h3 className="text-sm font-medium">Поддержка 24/7</h3>
              <p className="text-xs text-muted-foreground">Всегда на связи</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-xs text-muted-foreground">
          © 2026 Магазин. Минималистичный дизайн для каждого.
        </div>
      </footer>
    </div>
  );
};

export default Index;