import { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";
import { products, type Product } from "./data/products";
import {
  filterProducts,
  getCategories,
  type SortOrder,
} from "./utils/product";
import { formatPrice } from "./utils/format";
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
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<SortOrder | "">("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const categories = ["Tất cả", ...getCategories(products)];

  const filteredProducts = filterProducts(products, {
    category: selectedCategory === "Tất cả" ? undefined : selectedCategory,
    keyword: searchTerm,
    maxPrice: maxPrice === "" ? undefined : maxPrice,
    sort: sortOrder === "" ? undefined : sortOrder,
  });

  const lowStockProducts = products.filter(
    (p) => p.stock >= 1 && p.stock <= 5
  );

  const handleResetFilters = () => {
    setSelectedCategory("Tất cả");
    setSearchTerm("");
    setMaxPrice("");
    setSortOrder("");
  };

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
        <section className="filter-panel">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="filter-controls">
            <input
              type="text"
              className="filter-input"
              placeholder="Tìm tên giày, hãng (Nike, Adidas...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="filter-select"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
            >
              <option value="">Mọi mức giá</option>
              <option value={1500000}>Dưới {formatPrice(1500000)}</option>
              <option value={2500000}>Dưới {formatPrice(2500000)}</option>
              <option value={4000000}>Dưới {formatPrice(4000000)}</option>
            </select>

            <select
              className="filter-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder | "")}
            >
              <option value="">Sắp xếp mặc định</option>
              <option value="asc">Giá: Thấp đến cao</option>
              <option value="desc">Giá: Cao đến thấp</option>
            </select>

            <button
              type="button"
              className="btn reset-btn"
              onClick={handleResetFilters}
            >
              Xóa lọc
            </button>
          </div>
        </section>

        <section>
          <ProductList
            title={`Danh sách giày (${filteredProducts.length})`}
            items={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </section>

        {lowStockProducts.length > 0 && (
          <section>
            <ProductList
              title={`Sản phẩm sắp hết hàng (${lowStockProducts.length})`}
              items={lowStockProducts}
              onAddToCart={handleAddToCart}
            />
          </section>
        )}
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