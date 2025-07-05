import Link from "next/link";
import { useState } from "react";

export default function BackButton() {
  const [hover, setHover] = useState(false);

  return (
    <Link href="/browse">
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          backgroundColor: hover ? "#c7d2fe" : "#e0e7ff",
          borderRadius: "8px",
          border: "1px solid #c7d2fe",
          color: "#3730a3",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        ← Back to Browse
      </button>
    </Link>
  );
}
