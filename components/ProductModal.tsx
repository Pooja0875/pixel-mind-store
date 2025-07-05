import Image from "next/image";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

type Props = {
  product: Product;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        
          <Image
            src={product.image}
            alt={product.title}
            width={160}
            height={160}
            className="h-40 mx-auto object-contain"
          />
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="mt-3 font-bold text-green-600 text-lg">₹{product.price}</p>
      </div>
    </div>
  );
}
