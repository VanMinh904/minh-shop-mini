export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  sizes: number[];
  stock: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Force 1 '07 White",
    brand: "Nike",
    price: 2650000,
    image: "src/assets/Nike Air Force 1 '07 White.jpg",
    category: "Sneaker",
    sizes: [38, 39, 40, 41, 42],
    stock: 5,
  },
  {
    id: 2,
    name: "Adidas Ultraboost Light",
    brand: "Adidas",
    price: 3400000,
    image: "src/assets/Adidas Ultraboost Light.avif",
    category: "Giày chạy bộ",
    sizes: [39, 40, 41, 42, 43],
    stock: 0,
  },
  {
    id: 3,
    name: "Converse Chuck 70 High Black",
    brand: "Converse",
    price: 1850000,
    image: "src/assets/Converse Chuck 70 High Black.png",
    category: "Sneaker",
    sizes: [36, 37, 38, 39, 40],
    stock: 10,
  },
  {
    id: 4,
    name: "Giày Tây Derby Da Bò Classic",
    brand: "VinaShoes",
    price: 1250000,
    image: "src/assets/Giày Tây Derby Da Bò Classic.jpg",
    category: "Giày tây",
    sizes: [39, 40, 41, 42],
    stock: 10,
  },
  {
    id: 5,
    name: "Vans Old Skool Black/White",
    brand: "Vans",
    price: 1650000,
    image: "src/assets/Vans Old Skool Black White.webp",
    category: "Sneaker",
    sizes: [37, 38, 39, 40, 41],
    stock: 10,
  },
  {
    id: 6,
    name: "Asics Gel-Kayano 30",
    brand: "Asics",
    price: 3890000,
    image: "src/assets/Asics Gel-Kayano 30.webp",
    category: "Giày chạy bộ",
    sizes: [40, 41, 42, 43],
    stock: 10,
  },
  {
    id: 7,
    name: "Giày Loafer Da Lộn Nâu",
    brand: "VinaShoes",
    price: 1490000,
    image: "src/assets/Giày Loafer Da Lộn Nâu.webp",
    category: "Giày tây",
    sizes: [39, 40, 41, 42],
    stock: 10,
  },
  {
    id: 8,
    name: "Nike Pegasus 41",
    brand: "Nike",
    price: 3550000,
    image: "src/assets/Nike Pegasus 41.webp",
    category: "Giày chạy bộ",
    sizes: [39, 40, 41, 42, 43],
    stock: 10,
  },
  {
    id: 9,
    name: "Tất Cổ Cao Nike Everyday Cushioned Crew",
    brand: "Nike",
    category: "Tất / Vớ",
    price: 250000,
    stock: 20,
    sizes: [38, 39, 40, 41, 42],
    image: "src/assets/Tất Cổ Cao Nike Everyday Cushioned Crew.jpg",
  },
  {
    id: 10,
    name: "Tất Cổ Ngắn Adidas Athletic No-Show",
    brand: "Adidas",
    category: "Tất / Vớ",
    price: 180000,
    stock: 4,
    sizes: [38, 39, 40, 41, 42],
    image: "src/assets/Tất Cổ Ngắn Adidas Athletic No-Show.avif",
  },
];