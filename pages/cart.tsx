import { useStore } from "../store/useStore";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useStore();

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-600 underline">Go shopping</Link>.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <p className="text-lg font-bold">Total: ₹{total.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
