import { calcTotal, type CartItem } from "../utils/cart";
import { formatPrice } from "../utils/format";

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

  const totalPrice = calcTotal(items);

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
          <p className="empty-cart">
            Giỏ hàng đang trống. Hãy chọn một đôi giày nhé!
          </p>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => {
                const sizeNum = Number(item.size);
                return (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="cart-item"
                  >
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="cart-info">
                      <h4>{item.product.name}</h4>
                      <p className="cart-meta">
                        Size: <strong>{item.size}</strong> ·{" "}
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="qty-controls">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, sizeNum, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, sizeNum, 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => onRemoveItem(item.product.id, sizeNum)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="modal-footer">
              <div className="total-row">
                <span>Tổng thanh toán:</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <button
                type="button"
                className="btn checkout-btn"
                onClick={onCheckout}
              >
                Đặt hàng ngay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}