import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../store/useStore";
import { useState } from "react";

const schema = z.object({
  title: z.string().min(3, "Title is too short"),
  price: z.string().min(1, "Enter a price"),
  description: z.string().min(5, "Enter a description"),
  category: z.string().min(1, "Choose a category"),
  image: z.string().url("Must be a valid image URL"),
});

type FormData = z.infer<typeof schema>;

export default function AddProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const { addProduct } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

const onSubmit = (data: FormData) => {
  const newProduct = {
    id: Date.now(),
    ...data,
    price: parseFloat(data.price),
  };

  // ✅ Add to Zustand store
  addProduct(newProduct);

  // ✅ Persist to localStorage
  const stored = localStorage.getItem("localProducts");
  const existing = stored ? JSON.parse(stored) : [];
  existing.push(newProduct);
  localStorage.setItem("localProducts", JSON.stringify(existing));

  setSubmitted(true);
  reset();
  if (onSuccess) onSuccess();
};

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        📝 Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          placeholder="Product Title"
          {...register("title")}
          style={inputStyle}
        />
        {errors.title && <p style={errorStyle}>{errors.title.message}</p>}

        <input
          type="text"
          placeholder="Price (₹)"
          {...register("price")}
          style={inputStyle}
        />
        {errors.price && <p style={errorStyle}>{errors.price.message}</p>}

        <textarea
          placeholder="Description"
          {...register("description")}
          style={{ ...inputStyle, minHeight: "80px" }}
        />
        {errors.description && <p style={errorStyle}>{errors.description.message}</p>}

        <input
          type="text"
          placeholder="Category"
          {...register("category")}
          style={inputStyle}
          list="categories"
        />
        <datalist id="categories">
          <option value="electronics" />
          <option value="jewelery" />
          <option value="men's clothing" />
          <option value="women's clothing" />
        </datalist>
        {errors.category && <p style={errorStyle}>{errors.category.message}</p>}

        <input
          type="text"
          placeholder="Image URL"
          {...register("image")}
          style={inputStyle}
        />
        {errors.image && <p style={errorStyle}>{errors.image.message}</p>}

        <button
          type="submit"
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          ➕ Add Product
        </button>
      </form>

      {isSubmitSuccessful && submitted && (
        <p style={{ color: "#10b981", marginTop: "20px", fontWeight: "bold" }}>
          ✅ Product added successfully!
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
};

const errorStyle: React.CSSProperties = {
  color: "#ef4444",
  fontSize: "13px",
  marginTop: "-10px",
};
