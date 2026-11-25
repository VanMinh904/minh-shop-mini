type Props = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
};

export default function Banner({
  title = "Bộ Sưu Tập Giày Chính Hãng 2026",
  subtitle = "Sneaker, Giày chạy bộ & Giày tây tuyển chọn · Giảm đến 30% · Đổi size miễn phí tận nhà trong 7 ngày.",
  ctaText = "Mua Ngay",
}: Props) {
  const handleShopNow = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="banner" id="top">
      <div className="banner-glow" aria-hidden="true" />
      <div className="container banner-inner">
        <span className="banner-tag">🔥 ƯU ĐÃI ĐỘC QUYỀN · GIẢM ĐẾN 30%</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="banner-actions">
          <button type="button" className="btn banner-btn" onClick={handleShopNow}>
            {ctaText} →
          </button>
          <span className="banner-note">✓ Cam kết chính hãng 100%</span>
        </div>
      </div>
    </section>
  );
}