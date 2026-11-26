import { useState } from "react";
import type { Product } from "../data/products";
import { formatPrice } from "../utils/format";

type Props = {
  product: Product;
  onAddToCart: (product: Product, size: number) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const isOutOfStock = product.stock === 0;

  return (
    <article className={`product-card ${isOutOfStock ? "is-sold-out" : ""}`}>
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {isOutOfStock ? (
          <span className="badge-out">Hết hàng</span>
        ) : (
          <span className="badge-stock">Còn {product.stock} đôi</span>
        )}
      </div>

      <div className="product-body">
        <div className="product-meta-top">
          <span className="product-brand">{product.brand}</span>
          <span className="product-dot">•</span>
          <span className="product-category">{product.category}</span>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <div className="size-selector">
          <span className="size-label">Size:</span>
          <div className="size-list">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
                disabled={isOutOfStock}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="product-footer">
          <p className="product-price">{formatPrice(product.price)}</p>

          <button
            type="button"
            className="btn add-btn"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product, selectedSize)}
          >
            {isOutOfStock ? "Hết hàng" : `+ Thêm size ${selectedSize}`}
          </button>
        </div>
      </div>
    </article>
  );
}