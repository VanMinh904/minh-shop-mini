import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  size: number;
  quantity: number;
};

type Props = {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: number, size: number, delta: number) => void;
  onRemoveItem: (productId: number, size: number) => void;
  onCheckout: () => void;
};

export default function CartModal({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}: Props) {
  if (!isOpen) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Giỏ hàng của bạn</h3>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="empty-cart">Giỏ hàng đang trống. Hãy chọn một đôi giày nhé!</p>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="cart-item"
                >
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-info">
                    <h4>{item.product.name}</h4>
                    <p className="cart-meta">
                      Size: <strong>{item.size}</strong> ·{" "}
                      {item.product.price.toLocaleString("vi-VN")} đ
                    </p>
                    <div className="qty-controls">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.size, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.product.id, item.size, 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <div className="total-row">
                <span>Tổng thanh toán:</span>
                <strong>{totalPrice.toLocaleString("vi-VN")} đ</strong>
              </div>
              <button type="button" className="btn checkout-btn" onClick={onCheckout}>
                Đặt hàng ngay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}