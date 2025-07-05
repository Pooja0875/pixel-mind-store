import { useStore } from "../store/useStore";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const { cart, toggleCart } = useStore();
  const itemCount = cart.length;

  return (
    <div
      onClick={toggleCart}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          padding: 10,
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <ShoppingCart size={24} color="#4B5563" />
        {itemCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: "#ef4444",
              color: "white",
              borderRadius: "9999px",
              padding: "2px 6px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
}
