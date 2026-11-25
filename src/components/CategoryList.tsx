import type { Product } from "../data/products";

type Props = {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategoryList({
  products,
  selectedCategory,
  onSelectCategory,
}: Props) {
  const categories = ["Tất cả", ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="category-list" aria-label="Danh mục giày">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-btn ${selectedCategory === category ? "active" : ""}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}