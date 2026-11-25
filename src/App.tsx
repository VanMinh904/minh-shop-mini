import { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import CartModal, { type CartItem } from "./components/CartModal";
import Footer from "./components/Footer";
import { products, type Product } from "./data/products";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "Tất cả" || p.category === selectedCategory;
    const matchKeyword =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchKeyword;
  });

  const handleAddToCart = (product: Product, size: number) => {
    if (product.stock === 0) return;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: number, size: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: number, size: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const handleCheckout = () => {
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại MinhShoeStore.");
    setCart([]);
    setIsCartOpen(false);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={totalCount} onOpenCart={() => setIsCartOpen(true)} />

      <Banner />

      <main className="container" id="products">
        <div className="toolbar">
          <CategoryList
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="search-box">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm tên giày, hãng (Nike, Adidas...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Xóa từ khóa"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <ProductList
          title={
            selectedCategory === "Tất cả"
              ? `Tất cả mẫu giày (${filteredProducts.length})`
              : `${selectedCategory} (${filteredProducts.length})`
          }
          items={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </main>

      <CartModal
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <Footer />
    </>
  );
}

export default App;