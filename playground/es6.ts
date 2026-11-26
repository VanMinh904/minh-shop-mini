// Chạy: node playground/es6.ts (cần Node.js 22.18 trở lên)

// 1. let / const
const shopName = "MinhShoeStore";
let visitCount = 0;
visitCount += 1;

// 2. Template string
console.log(`Chào mừng đến ${shopName}! Lượt xem: ${visitCount}`);

// 3. Arrow function, tham số mặc định
const discount = (price: number, percent = 10) => price - (price * percent) / 100;
console.log("Giá giày sau giảm:", discount(1850000), discount(1850000, 20));

// 4. Destructuring đối tượng và mảng
const shoe = {
  id: 1,
  name: "Nike Air Force 1 '07 White",
  brand: "Nike",
  price: 2890000,
  sizes: [39, 40, 41, 42],
};
const { name: shoeName, price } = shoe;
const [defaultSize] = shoe.sizes;
console.log(shoeName, price, "Size mặc định:", defaultSize);

// 5. Spread: sao chép và ghi đè, không sửa đối tượng gốc
const updatedShoe = { ...shoe, price: 2450000 };
console.log(shoe.price, "->", updatedShoe.price);
const moreSizes = [...shoe.sizes, 43];
console.log("Danh sách size mới:", moreSizes);

// 6. Rest parameter (tính tổng tiền nhiều đôi giày trong giỏ)
const sum = (...prices: number[]) => prices.reduce((a, b) => a + b, 0);
console.log("Tổng giỏ hàng:", sum(2890000, 1450000, 1990000));

// 7. map / filter / find / reduce
const shoePrices = [2890000, 4250000, 1450000, 1990000];
const vnd = shoePrices.map((p) => p.toLocaleString("vi-VN") + " đ");
const under2M = shoePrices.filter((p) => p < 2000000);
const firstHighEnd = shoePrices.find((p) => p > 3000000);
const totalValue = shoePrices.reduce((acc, p) => acc + p, 0);
console.log({ vnd, under2M, firstHighEnd, totalValue });

// 8. Optional chaining (?.) và nullish coalescing (??)
type Customer = { name: string; shipping?: { district?: string } };
const customer: Customer = { name: "Nhật Hào" };
console.log(customer.shipping?.district ?? "Chưa cập nhật quận/huyện giao giày");

// 9. Promise và async/await
const fakeFetchShoes = (): Promise<string[]> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(["Nike Air Force 1 '07 White", "Adidas Ultraboost Light", "Giày Tây Derby Da Bò Classic"]),
      500
    )
  );

async function main() {
  console.log("Đang tải danh sách giày...");
  const shoeNames = await fakeFetchShoes();
  console.log("Đã tải giày:", shoeNames);
}

main();