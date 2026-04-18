import { ShoppingBag, Heart, User, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ShoppingHome() {
  const { cart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  const navigate = useNavigate();

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const searchBarRef = useRef(null);

  // Refs
  const heroImgRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);
  const categoriesTitleRef = useRef(null);
  const categoryCardsRef = useRef([]);
  const footerRef = useRef(null);
  const headerRef = useRef(null);

  const categories = [
    { title: "The Modern Man", category: "men", img: "https://i.pinimg.com/1200x/ec/e4/5e/ece45e9f25f857e4ceacad8257bd92ea.jpg" },
    { title: "The Contemporary Woman", category: "women", img: "https://ricidress.com/cdn/shop/files/41718fde91fad6f7d1921f3b41a3d182_900x.jpg?v=1728635462" },
    { title: "Accessories", category: "accessories", img: "https://i.pinimg.com/736x/2e/6c/52/2e6c526cbff9fac17abb202ac8d7bd25.jpg" },
    { title: "Shoes", category: "shoe", img: "https://i.pinimg.com/736x/89/c7/bd/89c7bd177b96785bde44d1f4089a292d.jpg" },
    { title: "Bags", category: "bags", img: "https://i.pinimg.com/1200x/03/a0/18/03a018ebc23abf2858a6797e3e61ae9d.jpg" },
    { title: "Files", category: "files", img: "https://i.pinimg.com/736x/fa/63/f7/fa63f78c7b9b893b1a2979837d63946d.jpg" },
  ];

  // Filter categories based on search
  const filteredCategories = searchQuery.trim()
    ? categories.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : categories;

  // Toggle search open/close with GSAP animation
  const handleSearchToggle = () => {
    if (!searchOpen) {
      setSearchOpen(true);
      setTimeout(() => {
        gsap.fromTo(
          searchBarRef.current,
          { width: 0, opacity: 0 },
          { width: "260px", opacity: 1, duration: 0.4, ease: "power3.out" }
        );
        searchInputRef.current?.focus();
      }, 10);
    } else {
      gsap.to(searchBarRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          setSearchOpen(false);
          setSearchQuery("");
        },
      });
    }
  };

  // Close search on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && searchOpen) handleSearchToggle();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  // Handle search submit — navigate to category if exact match found
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const match = categories.find(
      (c) =>
        c.category.toLowerCase() === searchQuery.toLowerCase() ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      navigate(`/category/${match.category}`);
      handleSearchToggle();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroImgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        [heroTextRef.current, heroSubRef.current, heroBtnRef.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: "power4.out", delay: 0.3 }
      );

      gsap.fromTo(
        categoriesTitleRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: categoriesTitleRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        categoryCardsRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: categoryCardsRef.current[0], start: "top 88%" },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="font-serif text-gray-900 bg-white overflow-x-hidden">

      {/* HEADER */}
      <header ref={headerRef} className="border-b sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="font-semibold tracking-wide">CareerCraftPro</div>

          <nav className="hidden md:flex gap-8 text-sm">
            <Link to="/category/men" className="hover:underline">Men</Link>
            <Link to="/category/women" className="hover:underline">Women</Link>
            <Link to="/category/accessories" className="hover:underline">Accessories</Link>
            <Link to="/newarrival" className="hover:underline">New Arrivals</Link>
            <Link to="/category/bags" className="hover:underline">Bags</Link>
          </nav>

          <div className="flex items-center gap-4">

            {/* ── SEARCH BAR ── */}
            <div className="flex items-center gap-2">
              {/* Animated input */}
              {searchOpen && (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div
                    ref={searchBarRef}
                    className="overflow-hidden"
                    style={{ width: 0, opacity: 0 }}
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search categories..."
                      className="w-full border-b border-gray-400 outline-none text-sm py-1 px-2 bg-transparent placeholder-gray-400 focus:border-black transition-colors"
                    />
                  </div>
                </form>
              )}

              {/* Search / Close icon */}
              <button
                onClick={handleSearchToggle}
                className="hover:opacity-60 transition-opacity"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            <Link to="/wishlist" className="relative">
              <Heart size={18} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingBag size={18} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/Usersettings">
              <button><User size={18} /></button>
            </Link>
          </div>
        </div>

        {/* ── SEARCH RESULTS DROPDOWN ── */}
        {searchOpen && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-b shadow-lg z-50 max-h-64 overflow-y-auto">
            {filteredCategories.length > 0 ? (
              <ul className="max-w-7xl mx-auto px-6 py-3 divide-y divide-gray-100">
                {filteredCategories.map((c) => (
                  <li key={c.category}>
                    <Link
                      to={`/category/${c.category}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center gap-4 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium group-hover:underline">{c.title}</p>
                        <p className="text-xs text-gray-400 capitalize">{c.category}</p>
                      </div>
                      <span className="ml-auto text-xs text-gray-400">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-400">
                No categories found for "<span className="text-gray-700">{searchQuery}</span>"
              </div>
            )}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-[90vh] bg-black text-white overflow-hidden">
        <img
          ref={heroImgRef}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuApfkFcRj2ZXDc0cGmZqom3eKTBJ9W1j-bilMCChvWNyMqqSeZuw5badxNglS4l9WPtV8UfhrwJ1L4WK_KNCEkAKOwbzMId0tD3hcXjI3Nmx6ytaU724MTIjlqV91kysw0D_c8xmY5W1DNFiegOxtnEWox2RODasJurxqV6QkQM7H-Z39012hjFf2RUSySFD6AcyezVSToz2vsoBgXDm_13M6f1cFhvBqmw3xi5j6it1dUt6L4w8L4htkSMIHjN0aeZwVVfyAiU_6SJ"
          className="absolute inset-0 w-full h-[120%] object-cover opacity-80"
          style={{ top: "-10%" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-center px-6">
          <p className="tracking-widest text-sm mb-4 opacity-80">CareerCraftPro</p>
          <h1 ref={heroTextRef} className="text-6xl italic mb-6 opacity-0">Dress for Success</h1>
          <p ref={heroSubRef} className="max-w-xl text-sm opacity-0 mb-8">
            Shop professional formal wear, interview outfits, and essential accessories
            designed to help you look confident and make a powerful first impression.
          </p>
          <div ref={heroBtnRef} className="flex gap-4 opacity-0">
            <button type="button" className="px-6 py-3 bg-white text-black text-sm hover:bg-gray-100 transition-colors">
              SHOP COLLECTION
            </button>
            <Link to="/newarrival">
              <button type="button" className="px-6 py-3 border text-sm hover:bg-white/10 transition-colors">
                New Arrivals
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div ref={categoriesTitleRef} className="flex justify-between items-center mb-10 opacity-0">
          <h2 className="text-2xl">
            {searchQuery.trim() ? `Results for "${searchQuery}"` : "Featured Categories"}
          </h2>
          <Link to="/category/men" className="text-sm underline cursor-pointer">Explore All</Link>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredCategories.map((c, index) => (
              <Link to={`/category/${c.category}`} key={index}>
                <div
                  ref={(el) => (categoryCardsRef.current[index] = el)}
                  className="relative group overflow-hidden cursor-pointer opacity-0"
                >
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(c); }}
                    className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow hover:scale-110 transition-transform"
                  >
                    <Heart size={16} />
                  </button>
                  <div className="overflow-hidden h-[420px]">
                    <img
                      src={c.img}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="absolute bottom-6 left-6 text-white text-lg drop-shadow-lg">{c.title}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No categories match "<span className="text-gray-700">{searchQuery}</span>"</p>
            <button onClick={() => setSearchQuery("")} className="mt-4 text-sm underline text-gray-500">
              Clear search
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer ref={footerRef} className="bg-white text-gray-800 border-t mt-20 opacity-0">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="font-semibold tracking-wide mb-4">CareerCraftPro</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Elevated essentials for the contemporary individual. Crafted with intention and sustainable principles.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">COLLECTIONS</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>New Arrivals</li><li>Essentials</li><li>Limited Edition</li><li>Accessories</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">COMPANY</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Sustainability</li><li>Editorial</li><li>Stores</li><li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">SUPPORT</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Shipping & Returns</li><li>Size Guide</li><li>Track Order</li><li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6 px-6 text-xs text-gray-500 flex flex-col md:flex-row justify-between max-w-7xl mx-auto">
          <p>© 2024 CareerCraftPro. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <span>Terms</span><span>Privacy</span><span>Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}