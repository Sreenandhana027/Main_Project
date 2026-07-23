import { ShoppingBag, Heart, User, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import { useEffect, useRef, useState } from "react";
import { getProductsAPI } from "../../../../services/AllAPI";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Design tokens — formal, light "atelier" palette
 * ink      #1E2A38  deep navy-charcoal (headlines, primary text, buttons)
 * ink-soft #5C6670  muted slate (secondary/body text)
 * ivory    #FAF8F4  page background
 * paper    #FFFFFF  card surface
 * gold     #AD8A54  antique brass accent (the one warm note)
 * gold-tint #F1E9D8 soft gold wash for hovers
 * line     #E7E2D6  hairline borders/dividers
 *
 * Display face: Cormorant Garamond (elegant, editorial serif)
 * Body/UI face: Jost (clean geometric sans, quietly formal)
 */

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
  const heroRuleRef = useRef(null);
  const heroEyebrowRef = useRef(null);
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

  // Load display + body typefaces once
  useEffect(() => {
    if (document.getElementById("prepvault-fonts")) return;
    const link = document.createElement("link");
    link.id = "prepvault-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

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
          { width: "260px", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
        searchInputRef.current?.focus();
      }, 10);
    } else {
      gsap.to(searchBarRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.35,
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
      // Header glides down softly
      gsap.fromTo(
        headerRef.current,
        { y: -48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );

      // Hero image — slow Ken-Burns drift, no jump-cut
      gsap.fromTo(
        heroImgRef.current,
        { scale: 1.12, yPercent: 0 },
        { scale: 1, duration: 2.2, ease: "power2.out" }
      );
      gsap.to(heroImgRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: heroImgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero copy — refined stagger with the gold rule drawing in last
      const heroTl = gsap.timeline({ delay: 0.25 });
      heroTl
        .fromTo(heroEyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
        .fromTo(heroTextRef.current, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.35")
        .fromTo(heroRuleRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut", transformOrigin: "left center" }, "-=0.5")
        .fromTo(heroSubRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.4")
        .fromTo(heroBtnRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.55");

      gsap.fromTo(
        categoriesTitleRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: categoriesTitleRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        categoryCardsRef.current,
        { y: 70, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: categoryCardsRef.current[0], start: "top 88%" },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 92%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="text-[#1E2A38] bg-[#FAF8F4] overflow-x-hidden"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      <style>{`
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -4px;
          width: 100%; height: 1px;
          background: #AD8A54;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .btn-primary {
          background: #1E2A38;
          color: #FAF8F4;
          transition: background 0.5s ease, color 0.5s ease, letter-spacing 0.5s ease;
        }
        .btn-primary:hover { background: #AD8A54; color: #1E2A38; }
        .btn-outline {
          border: 1px solid rgba(250,248,244,0.75);
          color: #FAF8F4;
          transition: background 0.5s ease, border-color 0.5s ease;
        }
        .btn-outline:hover { background: rgba(250,248,244,0.12); border-color: #AD8A54; }
        .cat-card-frame {
          transition: box-shadow 0.6s ease;
        }
        .cat-card-frame:hover {
          box-shadow: inset 0 0 0 1px #AD8A54;
        }
      `}</style>

      {/* HEADER */}
      <header
        ref={headerRef}
        className="border-b border-[#E7E2D6] sticky top-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="font-display text-2xl tracking-wide italic">PrepVault</div>

          <nav className="hidden md:flex gap-9 text-[13px] tracking-wide uppercase text-[#3E4954]">
            <Link to="/category/men" className="nav-link pb-1">Men</Link>
            <Link to="/category/women" className="nav-link pb-1">Women</Link>
            <Link to="/category/accessories" className="nav-link pb-1">Accessories</Link>
            <Link to="/newarrival" className="nav-link pb-1">New Arrivals</Link>
            <Link to="/category/bags" className="nav-link pb-1">Bags</Link>
          </nav>

          <div className="flex items-center gap-5 text-[#1E2A38]">

            {/* ── SEARCH BAR ── */}
            <div className="flex items-center gap-2">
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
                      className="w-full border-b border-[#C9C0AC] outline-none text-sm py-1 px-2 bg-transparent placeholder-[#9A9382] focus:border-[#AD8A54] transition-colors duration-300"
                    />
                  </div>
                </form>
              )}

              <button
                onClick={handleSearchToggle}
                className="hover:text-[#AD8A54] transition-colors duration-300"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            <Link to="/wishlist" className="relative hover:text-[#AD8A54] transition-colors duration-300">
              <Heart size={18} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#AD8A54] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative hover:text-[#AD8A54] transition-colors duration-300">
              <ShoppingBag size={18} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#AD8A54] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to="/Usersettings" className="hover:text-[#AD8A54] transition-colors duration-300">
              <button><User size={18} /></button>
            </Link>
          </div>
        </div>

        {/* ── SEARCH RESULTS DROPDOWN ── */}
        {searchOpen && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 bg-[#FFFFFF] border-t border-b border-[#E7E2D6] shadow-lg z-50 max-h-64 overflow-y-auto">
            {filteredCategories.length > 0 ? (
              <ul className="max-w-7xl mx-auto px-6 py-3 divide-y divide-[#F0ECE3]">
                {filteredCategories.map((c) => (
                  <li key={c.category}>
                    <Link
                      to={`/category/${c.category}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center gap-4 py-3 hover:bg-[#F1E9D8]/60 transition-colors duration-300 group px-2 -mx-2 rounded"
                    >
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium group-hover:text-[#AD8A54] transition-colors">{c.title}</p>
                        <p className="text-xs text-[#8A8272] capitalize">{c.category}</p>
                      </div>
                      <span className="ml-auto text-xs text-[#AD8A54]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-[#8A8272]">
                No categories found for "<span className="text-[#1E2A38]">{searchQuery}</span>"
              </div>
            )}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-[90vh] bg-[#1E2A38] text-white overflow-hidden">
        <img
          ref={heroImgRef}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuApfkFcRj2ZXDc0cGmZqom3eKTBJ9W1j-bilMCChvWNyMqqSeZuw5badxNglS4l9WPtV8UfhrwJ1L4WK_KNCEkAKOwbzMId0tD3hcXjI3Nmx6ytaU724MTIjlqV91kysw0D_c8xmY5W1DNFiegOxtnEWox2RODasJurxqV6QkQM7H-Z39012hjFf2RUSySFD6AcyezVSToz2vsoBgXDm_13M6f1cFhvBqmw3xi5j6it1dUt6L4w8L4htkSMIHjN0aeZwVVfyAiU_6SJ"
          className="absolute inset-0 w-full h-[120%] object-cover"
          style={{ top: "-10%" }}
        />
        {/* soft ink wash instead of flat black overlay, keeps it feeling light & editorial */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A38]/85 via-[#1E2A38]/35 to-[#1E2A38]/10" />

        <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-center px-6">
          <p ref={heroEyebrowRef} className="tracking-[0.35em] text-xs mb-4 text-[#D9C6A0] uppercase opacity-0">
            PrepVault — Est. Atelier
          </p>
          <h1 ref={heroTextRef} className="font-display text-6xl md:text-7xl italic mb-5 opacity-0 leading-[1.05]">
            Dress for Success
          </h1>
          <div
            ref={heroRuleRef}
            className="h-[1.5px] w-24 bg-[#AD8A54] mb-6"
            style={{ transform: "scaleX(0)" }}
          />
          <p ref={heroSubRef} className="max-w-xl text-[15px] leading-relaxed text-[#EDE7DA] opacity-0 mb-9">
            Shop professional formal wear, interview outfits, and essential accessories
            designed to help you look confident and make a powerful first impression.
          </p>
          <div ref={heroBtnRef} className="flex gap-4 opacity-0">
            <button type="button" className="btn-primary px-7 py-3 text-[13px] tracking-widest uppercase">
              Shop Collection
            </button>
            <Link to="/newarrival">
              <button type="button" className="btn-outline px-7 py-3 text-[13px] tracking-widest uppercase">
                New Arrivals
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div ref={categoriesTitleRef} className="flex justify-between items-end mb-12 opacity-0">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#AD8A54] mb-3">Curated For You</p>
            <h2 className="font-display text-4xl italic text-[#1E2A38]">
              {searchQuery.trim() ? `Results for "${searchQuery}"` : "Featured Collections"}
            </h2>
          </div>
          <Link
            to="/category/men"
            className="text-xs uppercase tracking-widest border-b border-[#1E2A38] pb-1 hover:text-[#AD8A54] hover:border-[#AD8A54] transition-colors duration-300"
          >
            Explore All
          </Link>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-7">
            {filteredCategories.map((c, index) => (
              <Link to={`/category/${c.category}`} key={index}>
                <div
                  ref={(el) => (categoryCardsRef.current[index] = el)}
                  className="cat-card-frame relative group overflow-hidden cursor-pointer opacity-0 bg-[#FFFFFF]"
                >
                  <div className="overflow-hidden h-[500px]">
                    <img
                      src={c.img}
                      className="h-full w-full object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms] ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A38]/70 via-[#1E2A38]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-10 left-8 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-display text-3xl italic tracking-tight">{c.title}</p>
                    <p className="text-[#D9C6A0] text-[11px] uppercase tracking-[0.25em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Shop Collection
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#8A8272]">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-display italic">No categories match "<span className="text-[#1E2A38] not-italic">{searchQuery}</span>"</p>
            <button onClick={() => setSearchQuery("")} className="mt-4 text-sm underline text-[#AD8A54] hover:text-[#8C6C3C] transition-colors">
              Clear search
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer ref={footerRef} className="bg-[#FAF8F4] text-[#3E4954] border-t border-[#AD8A54]/40 mt-20 opacity-0">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="font-display italic text-2xl text-[#1E2A38] mb-4">PrepVault</h2>
            <p className="text-sm text-[#6B7480] leading-relaxed">
              Elevated essentials for the contemporary individual. Crafted with intention and sustainable principles.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-[11px] tracking-[0.25em] uppercase text-[#1E2A38]">Collections</h3>
            <ul className="space-y-2 text-sm text-[#6B7480]">
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">New Arrivals</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Essentials</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Limited Edition</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Accessories</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-[11px] tracking-[0.25em] uppercase text-[#1E2A38]">Company</h3>
            <ul className="space-y-2 text-sm text-[#6B7480]">
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Sustainability</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Editorial</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Stores</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4 text-[11px] tracking-[0.25em] uppercase text-[#1E2A38]">Support</h3>
            <ul className="space-y-2 text-sm text-[#6B7480]">
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Shipping & Returns</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Size Guide</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Track Order</li>
              <li className="hover:text-[#AD8A54] transition-colors cursor-pointer w-fit">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#E7E2D6] py-6 px-6 text-xs text-[#8A8272] flex flex-col md:flex-row justify-between max-w-7xl mx-auto">
          <p>© 2024 PrepVault. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-[#AD8A54] transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-[#AD8A54] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#AD8A54] transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}