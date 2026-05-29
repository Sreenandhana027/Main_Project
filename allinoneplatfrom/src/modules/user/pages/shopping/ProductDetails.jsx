import { useParams, useNavigate } from "react-router-dom";
import { Heart, Share2, ArrowLeft, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import { getSingleProductAPI } from "../../../../services/AllAPI";

export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [openSection, setOpenSection] = useState("desc");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getSingleProductAPI(id);
        console.log(result);

        setProduct(result.data);
      } catch (err) {
        console.log(err);

      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen grid place-items-center text-xl text-gray-600">
        Loading...
      </div>
    );

  const colors = ["#111827", "#d6b98c", "#6b7280", "#fefce8"];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:gap-10 pt-4 lg:pt-10">

          {/* IMAGE */}
          <div className="relative lg:w-3/5 xl:w-7/12 rounded-xl overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="h-[55vh] w-full object-cover lg:h-[80vh]"
            />

            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <button
                onClick={() => navigate(-1)}
                className="rounded-full bg-white/90 p-3 shadow"
              >
                <ArrowLeft size={22} />
              </button>

              <button className="rounded-full bg-white/90 p-3 shadow">
                <Share2 size={22} />
              </button>
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 lg:max-w-xl mt-6 lg:mt-0">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">

              <h1 className="text-2xl font-bold lg:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-4">
                {product.discount > 0 ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <p className="text-3xl font-bold text-blue-600">
                        ₹{Math.round(product.price - (product.price * product.discount / 100))}
                      </p>
                      <p className="text-xl text-gray-400 line-through">
                        ₹{product.price}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-red-600 mt-1 uppercase tracking-wider">
                      {product.discount}% Discount Applied
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{product.price}
                  </p>
                )}

                <div className="flex items-center gap-2 text-gray-600 ml-auto">
                  <Star size={20} />
                  <span>{product.rating || 4.5}</span>
                </div>
              </div>

              {product.offers && (
                <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                  <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {product.offers}
                  </p>
                </div>
              )}

              {/* COLOR */}
              <div className="mt-7">
                <p className="mb-3 text-sm font-semibold">Color</p>
                <div className="flex gap-3">
                  {colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`h-11 w-11 rounded-full border-2 ${selectedColor === i
                          ? "border-blue-600"
                          : "border-gray-200"
                        }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div className="mt-7">
                <p className="mb-3 text-sm font-semibold">Size</p>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-14 h-12 rounded-lg border ${selectedSize === size
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-8">
                <AccordionItem
                  title="Description"
                  isOpen={openSection === "desc"}
                  onToggle={() =>
                    setOpenSection(openSection === "desc" ? "" : "desc")
                  }
                >
                  <p>{product.description}</p>
                </AccordionItem>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* MOBILE ADD CART */}
      <div className="fixed inset-x-0 bottom-0 bg-white p-4 lg:hidden">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 py-4 text-white rounded-xl"
        >
          Add to Cart
        </button>
      </div>

      {/* DESKTOP BUTTON */}
      <div className="hidden lg:block fixed bottom-8 right-8">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-10 py-4 rounded-xl"
        >
          Add to Cart — ${product.price}
        </button>
      </div>

    </div>
  );
}

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className="py-5">
      <button onClick={onToggle} className="flex justify-between w-full">
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}
