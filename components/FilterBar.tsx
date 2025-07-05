import { useStore } from "../store/useStore";
import styles from "./FilterBar.module.css";

export default function FilterBar({ categories }: { categories: string[] }) {
  const { search, setSearch, category, setCategory } = useStore();

  return (
    <div className={styles.filterBar}>
      {/* Search Bar */}
      <div className={styles.searchBox}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.categorySelect}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
