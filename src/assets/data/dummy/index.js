// import all dummy data then export it
import getStarted1 from '../../images/img-getstarted-1.png';
import getStarted2 from '../../images/img-getstarted-2.png';
import getStarted3 from '../../images/img-getstarted-3.png';

export const productList = [
  { id: 1, imageUrl: 'https://images.tokopedia.net/img/cache/500-square/product-1/2017/9/12/21613884/21613884_b340d72f-70da-44a0-b662-c57b2682ba49_900_900.jpg.webp', name: 'Lampu Meja', price: 168999 },
  { id: 2, imageUrl: 'https://ae01.alicdn.com/kf/Ha5185b427b234b7484c20725a3e77c44T.jpg_q50.jpg', name: 'Sofa Naribiru', price: 3169999 },
  { id: 3, imageUrl: 'https://pyxis.nymag.com/v1/imgs/9ad/543/ed01fb4319f2a75079359024364be94526-fan-lede.rsquare.w1200.jpg', name: 'Kipas Angin Black Decker', price: 659999 },
  { id: 4, imageUrl: 'https://ae01.alicdn.com/kf/Hb6af264403e547bd824a3954757f5afdm/Computer-desk-study-table-Nordic-office-desk-Modern-Europe-student-bedroom-study-desk-office-furniture-small.jpg', name: 'Meja Belajar Kayu', price: 469999 },
  { id: 5, imageUrl: "https://images.samsung.com/is/image/samsung/p5/id/discover/tv/2019/tv-beresolusi-full-hd/beresolusi-full-hd-720x720.jpg?$ORIGIN_JPG$", name: `TV Samsung HD 32"`, price: 1199999 },
  { id: 6, imageUrl: "https://cf.shopee.co.id/file/6925f04484831b534c2abe91e33e9c3a", name: "Karpet Premium Concord 210 x 310", price: 599999 }

];

export const tokenData = [
  { id: 1, isSelected: false, price: 20000 },
  { id: 2, isSelected: false, price: 50000 },
  { id: 3, isSelected: false, price: 100000 },
  { id: 4, isSelected: false, price: 200000 },
  { id: 5, isSelected: false, price: 500000 },
  { id: 6, isSelected: false, price: 1000000 },
];

export const bannerData = [{}];

export const ppobData = [{ id: 1, icon: '', title: 'All' }];

export const startedCarouselData = [
  {
    title: 'KSP CN',
    body:
      'Aplikasi jual beli produk koperasi seluruh Indonesia, pembayaran online, dan simpan pinjam koperasi.',
    img: getStarted1,
  },
  {
    title: 'Belanja produk koperasi',
    body:
      'Berbagai produk dari seluruh koperasi di Indonesia dapat kamu beli disini.',
    img: getStarted2,
  },
  {
    title: 'Bayar tagihan dengan mudah',
    body: 'Beli pulsa? Bayar tagihan bulanan? Cukup lewat satu aplikasi.',
    img: getStarted3,
  },
];
