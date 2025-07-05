import { useStore } from "../store/useStore";
import { useRouter } from "next/router";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cart, removeFromCart, clearCart } = useStore();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    clearCart(); // clear cart before redirect
    toggleCart(); // close the cart drawer
    router.push("/payment"); // redirect to payment confirmation page
  };

  return isCartOpen ? (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "320px",
        backgroundColor: "#f9fafb",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
        padding: 20,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ❌ Close Button */}
      <button
        onClick={toggleCart}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: "1.2rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#6b7280",
        }}
        aria-label="Close Cart"
      >
        ❌
      </button>

      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 16, marginTop: 30 }}>
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: 12,
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: 8,
                }}
              >
                <p style={{ fontWeight: "bold" }}>{item.title}</p>
                <p>₹{item.price}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ color: "#ef4444", fontSize: "0.875rem" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* 🧾 Total Amount */}
          <div style={{ marginTop: 16, fontWeight: "bold", fontSize: "16px" }}>
            Total: ₹{total.toFixed(2)}
          </div>

          {/* 🧾 Checkout Button */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              🧾 Checkout
            </button>
          </div>
        </>
      )}
    </div>
  ) : null;
}
