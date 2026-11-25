export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <p>© {year} MinhShoeStore · Bài tập môn Công nghệ lập trình hiện đại</p>
        <p>Hotline: 1900 0000 · Email: hotro@minhshoestore.vn</p>
      </div>
    </footer>
  );
}