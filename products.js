
const products = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    img: "https://images-cdn.ubuy.co.in/658da0be910005387c5e2673-restored-apple-iphone-15-pro-max-256gb.jpg",
    price: 299.99,
    desc: "Iphone.",
    category: "Smartphones"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    img: "https://www.theaudiostore.in/cdn/shop/files/sony-wh-ch720n-noise-canceling-wireless-headphones-black-43220896874751.webp?v=1744396394https://www.designinfo.in/wp-content/uploads/2023/08/Sony-WH-CH520-White-2.webp",
    price: 89.99,
    desc: "Noise-cancelling, long battery life.",
    category: "Audio"
  },
  {
    id: 3,
    name: "Laptop Air 14\"",
    img: "https://rukminim2.flixcart.com/image/1200/1200/xif0q/computer/2/v/v/-original-imagfdeqter4sj2j.jpeg",
    price: 599.99,
    desc: "Ultra-lightweight with SSD storage.",
    category: "Laptops"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    img: "https://avstore.in/cdn/shop/products/AVStore-JBL-boombox2-1.jpg?v=1615208720&width=2048",
    price: 49.50,
    desc: "12h playtime, waterproof.",
    category: "Audio"
  },
  {
    id: 5,
    name: "Infinix GT 20 PRO",
    img: "https://m.media-amazon.com/images/I/817UIXcn3lL._UF894,1000_QL80_.jpg",
    price: 310.99,
    desc: "Infinix GT 20 Pro 5G (Mecha Blue, 8GB RAM, 256GB Storage) | Up to 16GB Extented",
    category: "Smartphones"
  },
  {
    id: 6,
    name: "boAt Airdopes",
    img: "https://m.media-amazon.com/images/I/81S90p2oWBL.jpg",
    price: 99.99,
    desc: " Loop OWS Earbuds",
    category: "Audio"
  },
  {
    id: 7,
    name: "Dell G15 Laptop",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTEBXaJIA6f9Ron29GDX74a_SIt9zSM2Wm1wBdtLm3ks76842_kWXK8Ix02u20ut5IQg5QcE5VKoS6oTJ7iXMPhRN6NZbOT24sEkoB_Xgr4RZvlpgmYwUptXQ",
    price: 2999.99,
    desc: "Dell G15 Intel Core I5 13450hx - 8 Gb/512 Gb Ssd/Windows 11 Home/6 Gb Graphics/Nvidia Geforce Rtx 3050 Gaming 5530 Gaming Laptop",
    category: "Laptops"
  },
  {
    id: 8,
    name: "Google pixel 9 pro",
    img: "https://rukminim2.flixcart.com/image/704/844/xif0q/mobile/q/b/g/-original-imah3zznscgh3fgk.jpeg?q=90&crop=false",
    price: 984.45,
    desc: "Google Pixel 9 Pro XL - 256 GB",
    category: "Smartphones"
  },
  {
    id: 9,
    name: "Asus vivobook",
    img: "https://m.media-amazon.com/images/I/710mMkw+HmL.jpg",
    price: 1235.05,
    desc: "ASUS Vivobook S 15 OLED, 2.8K (2880 x 1620) 16:9,Core i9-13900H Processor 2.6 GHz",
    category: "Laptops"
  },
  {
    id: 10,
    name: "Skullcandy headphones",
    img: "https://m.media-amazon.com/images/I/7132xJGhhxL.jpg",
    price: 854.99,
    desc: "Skullcandy Hesh Evo Over Ear Wireless Headphones, 36 Hr Battery",
    category: "Audio"
  },
  {
    id: 11,
    name: "HP Victus Laptop",
    img: "https://m.media-amazon.com/images/I/710mMkw+HmL.jpg",
    price: 1009.99,
    desc: "Buy HP Victus Intel Core i5 13th Gen Gaming Laptop (16GB, 512GB SSD, Windows 11 Home",
    category: "Laptops"
  },
  {
    id: 12,
    name: "Samsung S25 Smartphone",
    img: "https://m.media-amazon.com/images/I/61p3FwE31-L._UF1000,1000_QL80_.jpg",
    price: 2489.99,
    desc: "Samsung Galaxy S25 5G Smartphone with Galaxy AI (Icyblue, 12GB RAM, 256GB Storage)",
    category: "Smartphones"
  }
];

function getFilteredProducts(category, search) {
  let res = products;
  if (category) res = res.filter(p => p.category === category);
  if (search) res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return res;
}

function sortProducts(arr, sortKey = "name", desc = false) {
  return arr.slice().sort((a, b) => {
    if (sortKey === "price") {
      return desc ? b.price - a.price : a.price - b.price;
    }
    return desc
      ? b[sortKey].localeCompare(a[sortKey])
      : a[sortKey].localeCompare(b[sortKey]);
  });
}
