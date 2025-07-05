.product-card {
  background: linear-gradient(to top right, #f9fafb, #e0e7ff);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
}

.product-info h2 {
  font-size: 1rem;
  color: #111827;
  margin-bottom: 4px;
}

.product-info p {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 4px;
}

.price {
  color: #10b981;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-info button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.product-info button:hover {
  background-color: #4338ca;
}
