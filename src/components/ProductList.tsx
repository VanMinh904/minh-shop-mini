import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

type Props = {
  title: string;
  items: Product[];
  onAddToCart: (product: Product, size: number) => void;
};

export default function ProductList({ title, items, onAddToCart }: Props) {
  return (
    <section>
      <h2 className="section-title">{title}</h2>

      {items.length === 0 ? (
        <p className="empty-text">Không tìm thấy mẫu giày phù hợp.</p>
      ) : (
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}