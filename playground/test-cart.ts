// Chạy: node playground/test-cart.ts
import { products } from "../src/data/products.ts";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  countItems,
  calcTotal,
} from "../src/utils/cart.ts";
import type { CartItem } from "../src/utils/cart.ts";
import { formatPrice } from "../src/utils/format.ts";
import { filterProducts, getCategories } from "../src/utils/product.ts";

const firstShoe = products[0];
const fourthShoe = products[3] ?? products[0];
const defaultSize = firstShoe.sizes?.[0] ?? 40;
const fourthSize = fourthShoe.sizes?.[0] ?? 41;

let cart: CartItem[] = [];
cart = addToCart(cart, firstShoe, defaultSize);       // Đôi 1 x1
cart = addToCart(cart, firstShoe, defaultSize, 2);    // Đôi 1 x3
cart = addToCart(cart, fourthShoe, fourthSize);       // Đôi 4 x1

console.log("Số đôi trong giỏ:", countItems(cart));
console.log("Tổng tiền giỏ hàng:", formatPrice(calcTotal(cart)));

cart = updateQuantity(cart, firstShoe.id, defaultSize, 1);
cart = removeFromCart(cart, fourthShoe.id, fourthSize);
console.log(
  "Giỏ sau cập nhật & xóa:",
  cart.map((i) => `${i.product.name} (Size ${i.size}) x${i.quantity}`)
);

console.log("Danh mục giày:", getCategories(products));

const sampleCategory = getCategories(products)[0];
console.log(
  `Danh mục '${sampleCategory}', giá tăng dần:`,
  filterProducts(products, { category: sampleCategory, sort: "asc" }).map(
    (p) => `${p.name} (${formatPrice(p.price)})`
  )
);

console.log(
  "Tìm 'nike', tối đa 3.000.000 đ:",
  filterProducts(products, { keyword: "nike", maxPrice: 3000000 }).map(
    (p) => p.name
  )
);