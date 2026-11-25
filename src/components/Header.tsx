type Props = {
  cartCount: number;
  onOpenCart: () => void;
};

export default function Header({ cartCount, onOpenCart }: Props) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="logo">
          Minh<span>ShoeStore</span>
        </a>

        <nav className="nav">
          <a href="#top">Trang chủ</a>
          <a href="#products">Sản phẩm</a>
          <a href="#contact">Liên hệ</a>
        </nav>

        <button type="button" className="cart-btn" onClick={onOpenCart}>
          👟 Giỏ hàng ({cartCount})
        </button>
      </div>
    </header>
  );
}