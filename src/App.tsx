import { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";
import { products, type Product } from "./data/products";
import { filterProducts } from "./utils/product";
import {
  addToCart,
  countItems,
  removeFromCart,
  updateQuantity,
  type CartItem,
} from "./utils/cart";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const filteredProducts = filterProducts(products, {
    category: selectedCategory,
    keyword: searchTerm,
  });

  const handleAddToCart = (product: Product, size: number) => {
    if (product.stock === 0) return;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing && existing.quantity >= product.stock) {
        return prev;
      }
      return addToCart(prev, product, size, 1);
    });
  };

  const handleUpdateQty = (productId: number, size: number, delta: number) => {
    setCart((prev) => {
      const target = prev.find(
        (item) => item.product.id === productId && item.size === size
      );
      if (!target) return prev;

      const nextQty = Math.min(target.quantity + delta, target.product.stock);
      return updateQuantity(prev, productId, size, nextQty);
    });
  };

  const handleRemoveItem = (productId: number, size: number) => {
    setCart((prev) => removeFromCart(prev, productId, size));
  };

  const handleCheckout = () => {
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại MinhShoeStore.");
    setCart([]);
    setIsCartOpen(false);
  };

  const totalCount = countItems(cart);

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