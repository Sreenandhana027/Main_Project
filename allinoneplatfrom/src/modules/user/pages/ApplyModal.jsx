export default function ApplyModal({ show, onClose, job }) {
  if (!show || !job) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-4">✕</button>

        <h2 className="text-xl font-bold mb-2">
          Apply for {job.role}
        </h2>

        <p className="text-gray-500 mb-4">
          {job.company} • {job.location}
        </p>

        <form className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Full Name" />
          <input className="w-full border p-2 rounded" placeholder="Email" />
          <input type="file" className="w-full border p-2 rounded" />
          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
