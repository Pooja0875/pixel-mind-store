import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../components/ProductCard.module.css";
import { useStore } from "../store/useStore";
import CartDrawer from "../components/CartDrawer";
import CartIcon from "../components/CartIcon";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export default function BrowsePage() {
  const { addToCart, products: localProducts, removeProduct } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

 useEffect(() => {
  const fetchProducts = async () => {
    const apiProducts = await fetch("https://fakestoreapi.com/products").then((res) =>
      res.json()
    );

    const localProductsRaw = localStorage.getItem("localProducts");
    const localProducts = localProductsRaw ? JSON.parse(localProductsRaw) : [];

    const combined = [...localProducts, ...apiProducts]; // local first
    setProducts(combined);
    setFiltered(combined);
  };

  fetchProducts();

  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data));
}, []);

  useEffect(() => {
    const filteredList = products.filter((product) => {
      const matchSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchSearch && matchCategory;
    });
    setFiltered(filteredList);
  }, [search, selectedCategory, products]);

  return (
    <div>
      <h1 className={styles.pageTitle}>🛍️ Browse Products</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={`${styles.grid} ${selectedProduct ? styles.blurBackground : ""}`}>
        {filtered.map((product) => (
          <div key={product.id} className={styles.card} onClick={() => setSelectedProduct(product)}>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={180}
              objectFit="contain"
            />
            <h2>{product.title}</h2>
            <p>{product.description.slice(0, 60)}...</p>
            <p className={styles.price}>₹{product.price}</p>
            <button
              className={styles.button}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
             {typeof product.id === "string" && (
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            removeProduct(product.id);
          }}
        >
          🗑️ Delete
        </button>
             )}
          </div>
        ))}
      </div>

        {selectedProduct && (
    <div className={styles.floatingDetail}>
      <Image
      src={selectedProduct.image}
      alt={selectedProduct.title}
      width={200}
      height={200}
      objectFit="contain"
    />
      <h2>{selectedProduct.title}</h2>
      <p>{selectedProduct.description}</p>
      <p className={styles.price}>₹{selectedProduct.price}</p>
      <button onClick={() => setSelectedProduct(null)}>Close</button>
    </div>
        )}
      <CartIcon />
      <CartDrawer />
    </div>
  );
}
