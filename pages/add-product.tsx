import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddProductForm from "../components/AddProductForm";

export default function AddProductPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState("none"); // 'add' or 'delete'
  const [localProducts, setLocalProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    const loginTime = localStorage.getItem("loginTime");
    const isExpired = loginTime ? Date.now() - parseInt(loginTime) > 30 * 60 * 1000 : true;

    if (adminStatus === "true" && !isExpired) {
      setIsAdmin(true);
      const storedProducts = JSON.parse(localStorage.getItem("localProducts") || "[]");
      setLocalProducts(storedProducts);
    } else {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("loginTime");
      router.push("/admin-login");
    }
  }, [router]);

  const handleDelete = (index: number) => {
    const updated = [...localProducts];
    updated.splice(index, 1);
    localStorage.setItem("localProducts", JSON.stringify(updated));
    setLocalProducts(updated);
  };

  if (!isAdmin) return null;

  return (
    <div>
      <LogoutButton />
      <h2 style={{ textAlign: "center", marginTop: 24 }}>👨‍💼 Admin Panel</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 30 }}>
        <button onClick={() => setView("add")} style={buttonStyle("#6366f1")}>
          ➕ Add New Product
        </button>
        <button onClick={() => setView("delete")} style={buttonStyle("#ef4444")}>🗑️ Delete Existing Product</button>
      </div>

      {view === "add" && <AddProductForm />}

      {view === "delete" && (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h3>🗒️ Locally Added Products</h3>
          {localProducts.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {localProducts.map((product, index) => (
                <li key={index} style={{ marginBottom: 20, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
                  <strong>{product.title}</strong> - ₹{product.price}
                  <button
                    onClick={() => handleDelete(index)}
                    style={{ marginLeft: 12, background: "#ef4444", color: "white", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function LogoutButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("loginTime");
        window.location.href = "/";
      }}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        background: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "8px 12px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}

function buttonStyle(color: string) {
  return {
    padding: "10px 16px",
    fontWeight: "bold",
    borderRadius: 6,
    color: "white",
    backgroundColor: color,
    border: "none",
    cursor: "pointer",
  };
}
