import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PaymentPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isPaid, setIsPaid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [expiry, setExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "online" | "">("");

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim().length < 10) {
      setErrors(["Please enter a valid shipping address."]);
    } else {
      setErrors([]);
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() || "";
    const number = cardNumber.replace(/\s/g, "");
    const cvv = (form.elements.namedItem("cvv") as HTMLInputElement)?.value?.trim() || "";

    const newErrors: string[] = [];

    if (paymentMethod === "") {
      newErrors.push("Please select a payment method.");
    }

    if (paymentMethod === "card") {
      if (!/^[a-zA-Z ]+$/.test(name)) {
        newErrors.push("Cardholder name must contain only letters.");
      }
      if (!/^[0-9]{16}$/.test(number)) {
        newErrors.push("Card number must be 16 digits.");
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        newErrors.push("Expiry date must be in MM/YY format.");
      }
      if (!/^[0-9]{3}$/.test(cvv)) {
        newErrors.push("CVV must be 3 digits.");
      }
    }

    setErrors(newErrors);
    if (newErrors.length === 0) {
      setIsPaid(true);
      setStep(3);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value.slice(0, 5));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  return (
    <div style={wrapperStyle}>
      <h2 style={titleStyle}>🛒 Checkout</h2>

      {/* STEP 1: Shipping Address */}
      {step === 1 && (
        <form onSubmit={handleAddressSubmit} style={formStyle}>
          <h3>📦 Shipping Address</h3>
          {errors.length > 0 && (
            <ul style={errorListStyle}>
              {errors.map((err, i) => (
                <li key={i} style={{ color: "#ef4444" }}>❌ {err}</li>
              ))}
            </ul>
          )}
          <textarea
            placeholder="123 Main Street, City, Country"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
          />
          <button type="submit" style={buttonStyle}>Continue</button>
        </form>
      )}

      {/* STEP 2: Payment Method */}
      {step === 2 && (
        <form onSubmit={handlePaymentSubmit} style={formStyle}>
          <h3>💳 Select Payment Method</h3>
          {errors.length > 0 && (
            <ul style={errorListStyle}>
              {errors.map((err, i) => (
                <li key={i} style={{ color: "#ef4444" }}>❌ {err}</li>
              ))}
            </ul>
          )}

          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={() => setPaymentMethod("cod")}
              checked={paymentMethod === "cod"}
            /> Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              onChange={() => setPaymentMethod("card")}
              checked={paymentMethod === "card"}
            /> Credit/Debit Card
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="online"
              onChange={() => setPaymentMethod("online")}
              checked={paymentMethod === "online"}
            /> UPI / Online Wallet
          </label>

          {/* 🧾 Card Fields */}
          {paymentMethod === "card" && (
            <>
              <label>
                Cardholder Name
                <input name="name" type="text" required style={inputStyle} />
              </label>
              <label>
                Card Number
                <input
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                  style={inputStyle}
                />
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  maxLength={3}
                  required
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>
              <button type="submit" style={buttonStyle}>Place Order</button>
            </>
          )}

          {/* 🧾 QR Code for Online Payment */}
          {paymentMethod === "online" && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p style={{ marginBottom: "8px" }}>Scan this QR to pay:</p>
              <Image
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=fake-upi-id@upi"
                alt="Fake UPI QR"
                width={200}
                height={200}
                style={{ borderRadius: "8px" }}
              />
              <p style={{ fontSize: "14px", marginTop: "10px", color: "#6b7280" }}>
                UPI ID: <strong>fake-upi-id@upi</strong>
              </p>
              <button type="submit" style={{ ...buttonStyle, backgroundColor: "#10b981" }}>
                ✅ Mark as Paid
              </button>
            </div>
          )}

          {paymentMethod === "cod" && (
            <button type="submit" style={buttonStyle}>Place Order</button>
          )}
        </form>
      )}

      {/* STEP 3: Success Confirmation */}
      {step === 3 && isPaid && (
        <>
          <h3 style={{ color: "#10b981", marginTop: "24px" }}>✅ Order Confirmed!</h3>
          <p style={{ marginTop: "12px" }}>
            Your order will be delivered to:
          </p>
          <p style={{ fontWeight: "bold", color: "#374151", marginTop: "4px" }}>{address}</p>
          <p style={{ marginTop: "16px" }}>
            Payment Method: <strong>{paymentMethod.toUpperCase()}</strong>
          </p>
          <Image
            src="https://i.imgur.com/5RHR6Ku.png"
            alt="Order Confirmed"
            width={550}
            height={200}
            style={{ maxWidth: "100%", marginTop: "24px", borderRadius: "12px" }}
          />
          <Link href="/browse">
            <button style={buttonStyle}>🏠 Back to Store</button>
          </Link>
        </>
      )}
    </div>
  );
}

// Styles
const wrapperStyle: React.CSSProperties = {
  maxWidth: "500px",
  margin: "60px auto",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
  backgroundColor: "#ffffff",
  textAlign: "left",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "16px",
  textAlign: "center",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "12px",
  backgroundColor: "#4f46e5",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};

const errorListStyle: React.CSSProperties = {
  paddingLeft: "20px",
  marginBottom: "-8px",
  listStyleType: "none",
};
