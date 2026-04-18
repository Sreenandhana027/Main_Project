import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play, Search, Filter, ArrowLeft, Clock, Eye,
  Sparkles, MonitorPlay, ChevronRight, X, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../../components/Footer";
import { getVideosAPI } from "../../../services/AllAPI";

export default function VideoMain() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Interview", "Aptitude", "HR Tips", "Technical", "Soft Skills"];

  // Load videos from backend
  const loadVideos = async () => {
    try {
      const res = await getVideosAPI();
      setVideos(res.data || []);
    } catch (err) {
      console.error("Error loading videos:", err);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // Search & Category filter
  const filteredVideos = videos.filter((v) => {
    const matchesSearch = v.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || v.title?.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500/30 overflow-x-hidden">

      {/* --- PREMIUM HERO SECTION --- */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden bg-white border-b border-slate-200">
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100 blur-[120px] rounded-full animate-pulse capitalize" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-50 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <Sparkles size={14} />
              <span>Expert Curated Tutorials</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 text-slate-900">
              Master Your <span className="text-sky-600">Career.</span>
            </h1>

            <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Immerse yourself in our premium video library. From high-stakes interviews
              to technical excellence, learn with CareerCraft TV.
            </p>

            {/* <div className="flex items-center gap-4">
              <Link to="/Dashboard">
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2 active:scale-95">
                  <MonitorPlay size={18} />
                  Start Learning
                </button>
              </Link>
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* --- STICKY GLASS SEARCH & FILTERS --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Link to="/inter" className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <ArrowLeft size={18} className="text-slate-600" />
            </Link>
            <h2 className="text-lg font-bold tracking-tight whitespace-nowrap text-slate-900">Video Portal</h2>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by topic, skill or channel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500/50 transition-all placeholder:text-slate-400 text-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-500/20"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- VIDEO GRID --- */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        {filteredVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-slate-400"
          >
            <MonitorPlay size={64} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="text-xl font-medium tracking-tight">No tutorials matched your search</p>
            <button onClick={() => { setSearch(""); setSelectedCategory("All") }} className="mt-4 text-sky-600 hover:underline text-sm font-bold">Clear all filters</button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, idx) => (
                <motion.div
                  key={video._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveVideo(video)}
                  className="bg-white border border-slate-200 rounded-3xl group cursor-pointer overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-sky-500/40 transition-all duration-300"
                >
                  {/* Thumbnail Overlay */}
                  <div className="relative aspect-video overflow-hidden border-b border-slate-100">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      onError={(e) => e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play size={24} className="text-sky-600 ml-1 fill-sky-600" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-md border border-white/10 uppercase tracking-widest">
                      {video.time || "12:45"}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 py-1 px-2 rounded bg-sky-50 inline-block">
                        Pro Lessons
                      </span>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        HD Quality
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug flex-1">
                      {video.title}
                    </h3>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-[10px] font-black">
                          {video.channel?.charAt(0) || "C"}
                        </div>
                        <span className="text-xs text-slate-500 font-medium truncate">{video.channel}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 whitespace-nowrap ml-2">
                        <span className="flex items-center gap-1"><Eye size={12} /> {video.views}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* --- THEATER MODE PLAYER MODAL --- */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-100 p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white border border-slate-200 w-full max-w-6xl rounded-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Cinematic Title Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="p-3 bg-sky-100 rounded-2xl border border-sky-200">
                    <MonitorPlay className="text-sky-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-black text-slate-900 leading-tight">
                      {activeVideo.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                      {activeVideo.channel} • Now Playing
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="self-start md:self-center p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all rounded-2xl border border-slate-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Player Area */}
              <div className="flex-1 bg-black relative">
                <div className="aspect-video w-full h-full max-h-[50vh] md:max-h-none">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                    allowFullScreen
                    title={activeVideo.title}
                  />
                </div>
              </div>

              {/* Theater Footer Info */}
              <div className="p-6 md:px-10 bg-slate-50 border-t border-slate-200 flex items-center justify-between overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-2"><Eye size={14} className="text-sky-600" /> {activeVideo.views} Views</div>
                  <div className="flex items-center gap-2"><Clock size={14} className="text-sky-600" /> Professional Tutorial</div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-700 rounded-lg">High Performance</div>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <button className="text-xs font-black text-sky-600 flex items-center gap-1 uppercase tracking-tighter hover:gap-2 transition-all">
                    Next Video <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

