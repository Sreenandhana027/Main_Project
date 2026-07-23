import { useEffect, useState } from "react";
import { getVideosAPI, addVideoAPI, deleteVideoAPI } from "../../../services/AllAPI";
import { LiaFileVideoSolid } from "react-icons/lia";
import { RiVideoUploadLine } from "react-icons/ri";
import toast from "react-hot-toast";

export default function ManageVideos() {

  const [videos, setVideos] = useState([]);

  const [form, setForm] = useState({
    title: "",
    channel: "",
    views: "",
    time: "",
    youtubeId: ""
  });

  const loadVideos = async () => {
    const res = await getVideosAPI();
    setVideos(res.data);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const addVideo = async () => {
    if (!form.title || !form.youtubeId) {
      toast.error("Title & Youtube ID required");
      return;
    }

    try {
      await addVideoAPI(form);
      toast.success("Video added successfully!");
      setForm({
        title: "",
        channel: "",
        views: "",
        time: "",
        youtubeId: ""
      });
      loadVideos();
    } catch (err) {
      toast.error("Failed to add video");
    }
  };

  const deleteVideo = async (id) => {
    const confirmDelete = window.confirm("Delete this video?");
    if (!confirmDelete) return;

    try {
      await deleteVideoAPI(id);
      toast.success("Video deleted successfully!");
      loadVideos();
    } catch (err) {
      toast.error("Failed to delete video");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-wide">
          <LiaFileVideoSolid />Manage Videos
        </h1>
      </div>

      <div className="p-6">

        {/* UPLOAD PANEL */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-10">
          <h3 className="text-lg font-semibold mb-4"><RiVideoUploadLine />

            Upload New Video
          </h3>

          <div className="grid md:grid-cols-5 gap-3">

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              placeholder="Channel"
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value })}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              placeholder="Views"
              value={form.views}
              onChange={(e) => setForm({ ...form, views: e.target.value })}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              placeholder="Time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="p-3 rounded bg-black border border-gray-700"
            />

            <input
              placeholder="Youtube ID"
              value={form.youtubeId}
              onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
              className="p-3 rounded bg-black border border-gray-700"
            />

          </div>

          {form.youtubeId && (
            <img
              src={`https://img.youtube.com/vi/${form.youtubeId}/hqdefault.jpg`}
              className="mt-4 w-72 rounded-xl"
            />
          )}

          <button
            onClick={addVideo}
            className="mt-6 bg-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-700"
          >
            Add Video
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {videos.map((v) => (
            <div
              key={v._id}
              className="group relative rounded-xl overflow-hidden bg-zinc-900 hover:scale-105 transition duration-300"
            >

              <img
                src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                className="w-full h-48 object-cover"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition">

                <h4 className="font-semibold text-lg">
                  {v.title}
                </h4>

                <p className="text-xs text-gray-300">
                  {v.channel}
                </p>

                <p className="text-xs text-gray-400 mb-3">
                  {v.views} • {v.time}
                </p>

                <button
                  onClick={() => deleteVideo(v._id)}
                  className="bg-red-600 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );

}
