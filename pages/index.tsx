import Link from "next/link";

export default function HomePage() {
  return (
    <div style={styles.pageWrapper as React.CSSProperties}>
      <div style={styles.card as React.CSSProperties}>
        <h1 style={styles.heading}>🛍️ Pixel Mind Store</h1>
        <p style={styles.subText}>
          Discover a smooth e-commerce experience with live product browsing and secure admin features.
        </p>

        <div style={styles.buttonWrapper as React.CSSProperties}>
          <Link href="/browse">
            <button style={{ ...styles.button, ...styles.browseButton }}>
              🛒 Browse Products
            </button>
          </Link>

          <Link href="/admin-login">
            <button style={{ ...styles.button, ...styles.addButton }}>
              ➕ Admin Panel
            </button>
          </Link>
        </div>

        <p style={styles.footer}>
          Built with ❤️ using Next.js, Zustand, React Query & CSS
        </p>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to right bottom, #e0c3fc, #8ec5fc)",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#6b21a8",
    marginBottom: "20px",
  },
  subText: {
    fontSize: "1.125rem",
    color: "#4b5563",
    marginBottom: "30px",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "9999px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "220px",
    transition: "transform 0.2s ease, background-color 0.3s ease",
  },
  browseButton: {
    backgroundColor: "#2563eb",
  },
  addButton: {
    backgroundColor: "#9333ea",
  },
  footer: {
    marginTop: "40px",
    fontSize: "0.875rem",
    color: "#6b7280",
    fontStyle: "italic",
  },
};
