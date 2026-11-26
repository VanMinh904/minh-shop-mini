import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  size: number | string;
  quantity: number;
};

export function addToCart(
  cart: CartItem[],
  product: Product,
  size: number | string,
  quantity = 1
): CartItem[] {
  const existing = cart.find(
    (item) => item.product.id === product.id && item.size === size
  );

  if (existing) {
    return cart.map((item) =>
      item.product.id === product.id && item.size === size
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cart, { product, size, quantity }];
}

export function removeFromCart(
  cart: CartItem[],
  productId: number,
  size?: number | string
): CartItem[] {
  return cart.filter((item) => {
    if (size === undefined) {
      return item.product.id !== productId;
    }
    return !(item.product.id === productId && item.size === size);
  });
}

export function updateQuantity(
  cart: CartItem[],
  productId: number,
  size: number | string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(cart, productId, size);
  }

  return cart.map((item) =>
    item.product.id === productId && item.size === size
      ? { ...item, quantity }
      : item
  );
}

export function countItems(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function calcTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}