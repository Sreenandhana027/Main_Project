import { useEffect, useState } from "react";
import { getProductsAPI, addProductAPI, updateProductAPI, deleteProductAPI } from "../../../services/AllAPI";
import { Plus, Edit, Trash, PackageSearch, Image as ImageIcon, X, ShoppingBag, User, Users, Gem, Footprints, BriefcaseBusiness, FolderOpen, Package } from "lucide-react";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const [form, setForm] = useState({
    name: "", price: "", image: "", category: "",
    description: "", discount: "", offers: ""
  });

  const loadProducts = async () => {
    try {
      const res = await getProductsAPI();
      if (res.status === 200) setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  // Group products by category
  const grouped = products.reduce((acc, p) => {
    const cat = p.category || "uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const categoryLabels = {
    all: <span className="flex items-center gap-1"><ShoppingBag size={14} /> All</span>,
    men: <span className="flex items-center gap-1"><User size={14} /> Men</span>,
    women: <span className="flex items-center gap-1"><Users size={14} /> Women</span>,
    accessories: <span className="flex items-center gap-1"><Gem size={14} /> Accessories</span>,
    shoes: <span className="flex items-center gap-1"><Footprints size={14} /> Shoes</span>,
    bags: <span className="flex items-center gap-1"><BriefcaseBusiness size={14} /> Bags</span>,
    files: <span className="flex items-center gap-1"><FolderOpen size={14} /> Files</span>,
    uncategorized: <span className="flex items-center gap-1"><Package size={14} /> Uncategorized</span>,
  };

  const categoryColors = {
    men: "border-blue-600 text-blue-400 bg-blue-900/20",
    women: "border-pink-600 text-pink-400 bg-pink-900/20",
    accessories: "border-yellow-600 text-yellow-400 bg-yellow-900/20",
    shoes: "border-green-600 text-green-400 bg-green-900/20",
    bags: "border-purple-600 text-purple-400 bg-purple-900/20",
    files: "border-gray-500 text-gray-400 bg-gray-900/20",
    uncategorized: "border-zinc-600 text-zinc-400 bg-zinc-800/20",
    all: "border-white text-white bg-white/10"
  };

  // Filtered products based on active tab
  const filteredProducts =
    activeCategory === "all"
      ? products
      : grouped[activeCategory] || [];

  const allCategories = ["all", ...Object.keys(grouped)];

  const handleOpenModal = (product = null) => {
    if (product) {
      setIsEditing(true);
      setCurrentId(product._id);
      setForm({
        name: product.name || "", price: product.price || "",
        image: product.image || "", category: product.category || "",
        description: product.description || "", discount: product.discount || "",
        offers: product.offers || ""
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setForm({ name: "", price: "", image: "", category: "", description: "", discount: "", offers: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      alert("Name, Price, and Category are required");
      return;
    }
    try {
      const payload = { ...form, price: Number(form.price), discount: Number(form.discount) || 0 };
      if (isEditing) await updateProductAPI(currentId, payload);
      else await addProductAPI(payload);
      handleCloseModal();
      loadProducts();
    } catch (err) {
      alert("Failed to save product.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProductAPI(id);
      loadProducts();
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 font-serif">

      {/* HEADER */}
      <div className="flex justify-between items-center p-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
            <PackageSearch /> Manage Products
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} in{" "}
            <span className="text-white capitalize">{activeCategory}</span>
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* CATEGORY TABS */}
      <div className="px-6 pt-5 flex flex-wrap gap-2 border-b border-zinc-800 pb-5">
        {allCategories.map((cat) => {
          const count = cat === "all" ? products.length : (grouped[cat]?.length || 0);
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${isActive
                  ? categoryColors[cat] || "border-white text-white bg-white/10"
                  : "border-zinc-700 text-zinc-500 bg-transparent hover:border-zinc-500 hover:text-zinc-300"
                }`}
            >
              {categoryLabels[cat] || cat}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-zinc-800"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* PRODUCT GRID */}
      <div className="p-6">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            <PackageSearch size={48} className="mx-auto mb-4 opacity-30" />
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition duration-300 flex flex-col"
              >
                {/* IMAGE */}
                <div className="relative h-48 bg-zinc-800 flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ImageIcon size={40} className="text-zinc-600" />
                  )}
                  {p.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {p.discount}% OFF
                    </div>
                  )}
                  {/* Category badge on card */}
                  <div className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full border 
                    ${categoryColors[p.category] || "border-zinc-600 text-zinc-400 bg-black/60"}`}>
                    {categoryLabels[p.category] || p.category}
                  </div>
                </div>

                {/* INFO */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg line-clamp-1">{p.name}</h4>
                    <p className="text-lg font-bold">₹{p.price}</p>
                  </div>
                  {p.offers && (
                    <p className="text-xs text-green-400 mb-2 truncate">🎁 {p.offers}</p>
                  )}
                  <p className="text-sm text-zinc-500 line-clamp-2 flex-1">{p.description}</p>

                  {/* ACTIONS */}
                  <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-2">
                    <button
                      onClick={() => handleOpenModal(p)}
                      className="flex-1 flex justify-center items-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-2 rounded text-sm transition"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex-1 flex justify-center items-center gap-2 bg-red-900/40 text-red-500 hover:bg-red-900/60 py-2 rounded text-sm transition"
                    >
                      <Trash size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 w-full max-w-2xl rounded-xl border border-zinc-800 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h2 className="text-xl font-semibold">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={handleCloseModal} className="text-zinc-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Product Name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:border-white outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Category *</label>
                  <select
                    required value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:border-white outline-none transition"
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="accessories">Accessories</option>
                    <option value="shoes">Shoes</option>
                    <option value="bags">Bags</option>
                    <option value="files">Files</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Price (₹) *</label>
                  <input
                    type="number" required min="0" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:border-white outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Discount (%)</label>
                  <input
                    type="number" min="0" max="100" value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:border-white outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Image URL</label>
                <input
                  type="text" value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                  className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:border-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Special Offers Text</label>
                <input
                  type="text" value={form.offers}
                  onChange={(e) => setForm({ ...form, offers: e.target.value })}
                  placeholder="e.g. Buy 1 Get 1 Free"
                  className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:border-white outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">Description</label>
                <textarea
                  rows="3" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:border-white outline-none transition resize-none"
                />
              </div>
            </form>

            <div className="p-6 border-t border-zinc-800 flex justify-end gap-3">
              <button
                type="button" onClick={handleCloseModal}
                className="px-6 py-2 rounded-md font-medium text-white hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-md font-medium bg-white text-black hover:bg-gray-200 transition"
              >
                {isEditing ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}