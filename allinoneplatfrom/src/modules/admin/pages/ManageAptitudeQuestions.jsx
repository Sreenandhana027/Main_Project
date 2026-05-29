import { useState, useEffect } from "react";
import {
  getAptitudeQuestionsAPI,
  addAptitudeQuestionAPI,
  updateAptitudeQuestionAPI,
  deleteAptitudeQuestionAPI
} from "../../../services/AllAPI";
import {
  Plus, Edit, Trash, X, Brain,
  Calculator, MessageSquare, Lightbulb, CheckCircle2, Circle
} from "lucide-react";

const CATEGORIES = [
  { key: "all",     label: "All",               icon: Brain },
  { key: "quant",   label: "Quantitative",      icon: Calculator },
  { key: "logical", label: "Logical Reasoning", icon: Lightbulb },
  { key: "verbal",  label: "Verbal Ability",    icon: MessageSquare },
];

const CATEGORY_COLORS = {
  quant:   { tab: "border-blue-500 text-blue-400 bg-blue-500/10",   badge: "border-blue-800 text-blue-400 bg-blue-500/10" },
  logical: { tab: "border-amber-500 text-amber-400 bg-amber-500/10", badge: "border-amber-800 text-amber-400 bg-amber-500/10" },
  verbal:  { tab: "border-rose-500 text-rose-400 bg-rose-500/10",   badge: "border-rose-800 text-rose-400 bg-rose-500/10" },
  all:     { tab: "border-zinc-400 text-white bg-white/10",          badge: "" },
};

const OPTION_LABELS = ["A", "B", "C", "D"];

const EMPTY_FORM = {
  question: "",
  options: ["", "", "", ""],
  answer: "",
  category: "quant"
};

export default function ManageAptitudeQuestions() {
  const [questions, setQuestions]           = useState([]);
  const [allQuestions, setAllQuestions]     = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [isEditing, setIsEditing]           = useState(false);
  const [currentId, setCurrentId]           = useState(null);
  const [form, setForm]                     = useState(EMPTY_FORM);
  const [loading, setLoading]               = useState(false);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const cat = activeCategory === "all" ? "" : activeCategory;
      const res = await getAptitudeQuestionsAPI(cat);
      if (res.status === 200) setQuestions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQuestions(); }, [activeCategory]);

  useEffect(() => {
    getAptitudeQuestionsAPI("").then(res => {
      if (res.status === 200) setAllQuestions(res.data);
    }).catch(console.error);
  }, [questions]);

  const getCount = (cat) =>
    cat === "all" ? allQuestions.length : allQuestions.filter(q => q.category === cat).length;

  const handleOpenModal = (question = null) => {
    if (question) {
      setIsEditing(true);
      setCurrentId(question._id);
      setForm({
        question: question.question,
        options:  [...question.options],
        answer:   question.answer,
        category: question.category
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setForm(EMPTY_FORM);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    // Clear answer if the option it matched changed
    const newAnswer = form.answer === form.options[index] ? "" : form.answer;
    setForm({ ...form, options: updated, answer: newAnswer });
  };

  const handleSave = async () => {
    const { question, options, answer, category } = form;
    if (!question.trim()) { alert("Please enter a question."); return; }
    if (options.some(o => !o.trim())) { alert("Please fill in all 4 options."); return; }
    if (!answer) { alert("Please select the correct answer."); return; }
    if (!options.includes(answer)) { alert("Correct answer must match one of the options."); return; }
    try {
      if (isEditing) await updateAptitudeQuestionAPI(currentId, form);
      else await addAptitudeQuestionAPI(form);
      handleCloseModal();
      loadQuestions();
    } catch (err) {
      alert("Failed to save question.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await deleteAptitudeQuestionAPI(id);
      loadQuestions();
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">

      {/* HEADER */}
      <div className="px-8 py-6 border-b border-zinc-800/60 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2.5 text-white">
            <Brain size={22} className="text-zinc-400" />
            Manage Aptitude Questions
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            <span className="text-zinc-300 font-medium">{questions.length}</span> question{questions.length !== 1 ? "s" : ""} in{" "}
            <span className="text-zinc-300 capitalize">{activeCategory === "all" ? "All Categories" : activeCategory}</span>
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-100 transition"
        >
          <Plus size={16} /> Add Question
        </button>
      </div>

      {/* CATEGORY TABS */}
      <div className="px-8 py-4 border-b border-zinc-800/60 flex flex-wrap gap-2">
        {CATEGORIES.map(({ key, label, icon: Icon }) => {
          const isActive = activeCategory === key;
          const colors = CATEGORY_COLORS[key] || CATEGORY_COLORS.all;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-150
                ${isActive ? colors.tab : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 bg-transparent"}`}
            >
              <Icon size={14} />
              {label}
              <span className={`text-xs px-2 py-0.5 rounded-md font-mono ${isActive ? "bg-white/15" : "bg-zinc-800 text-zinc-500"}`}>
                {getCount(key)}
              </span>
            </button>
          );
        })}
      </div>

      {/* TABLE */}
      <div className="px-8 py-6">
        {loading ? (
          <div className="py-24 text-center text-zinc-600">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin mx-auto mb-3" />
            Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <div className="py-24 text-center text-zinc-600">
            <Brain size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-base">No questions found.</p>
            <p className="text-sm mt-1">Click "Add Question" to get started.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800">
                  <th className="px-5 py-3.5 text-left text-xs text-zinc-500 font-semibold uppercase tracking-widest w-10">#</th>
                  <th className="px-5 py-3.5 text-left text-xs text-zinc-500 font-semibold uppercase tracking-widest">Question</th>
                  <th className="px-5 py-3.5 text-left text-xs text-zinc-500 font-semibold uppercase tracking-widest w-56">Options</th>
                  <th className="px-5 py-3.5 text-left text-xs text-zinc-500 font-semibold uppercase tracking-widest w-36">Answer</th>
                  <th className="px-5 py-3.5 text-left text-xs text-zinc-500 font-semibold uppercase tracking-widest w-28">Category</th>
                  <th className="px-5 py-3.5 text-center text-xs text-zinc-500 font-semibold uppercase tracking-widest w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {questions.map((q, index) => {
                  const colors = CATEGORY_COLORS[q.category];
                  return (
                    <tr key={q._id} className="bg-[#0a0a0a] hover:bg-zinc-900/50 transition-colors">

                      {/* INDEX */}
                      <td className="px-5 py-4 text-zinc-600 font-mono text-xs">{index + 1}</td>

                      {/* QUESTION */}
                      <td className="px-5 py-4">
                        <p className="text-zinc-100 text-sm leading-relaxed line-clamp-2 max-w-sm">{q.question}</p>
                      </td>

                      {/* OPTIONS — 2x2 grid */}
                      <td className="px-5 py-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {q.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="text-zinc-600 font-mono text-xs w-4 shrink-0">{OPTION_LABELS[i]}.</span>
                              <span className={`text-xs truncate ${opt === q.answer ? "text-green-400 font-medium" : "text-zinc-400"}`}>
                                {opt}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* ANSWER */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-800 px-2.5 py-1 rounded-md">
                          <CheckCircle2 size={11} />
                          {q.answer}
                        </span>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-md border capitalize font-medium ${colors?.badge || "border-zinc-700 text-zinc-400"}`}>
                          {q.category}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenModal(q)}
                            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(q._id)}
                            className="p-1.5 text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-md transition"
                          >
                            <Trash size={13} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 w-full max-w-xl rounded-2xl border border-zinc-800 shadow-2xl flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-800">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {isEditing ? "Edit Question" : "Add New Question"}
                </h2>
                <p className="text-zinc-500 text-xs mt-0.5">Fill in all fields below</p>
              </div>
              <button onClick={handleCloseModal} className="text-zinc-500 hover:text-white transition p-1">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 overflow-y-auto flex-1 space-y-6">

              {/* CATEGORY SELECTOR */}
              <div>
                <label className="block text-xs text-zinc-400 mb-2.5 uppercase tracking-widest font-semibold">Category</label>
                <div className="flex gap-2">
                  {CATEGORIES.filter(c => c.key !== "all").map(({ key, label, icon: Icon }) => {
                    const isSelected = form.category === key;
                    const colors = CATEGORY_COLORS[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setForm({ ...form, category: key })}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition
                          ${isSelected ? colors.tab : "border-zinc-700 text-zinc-500 hover:border-zinc-600"}`}
                      >
                        <Icon size={12} /> {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUESTION */}
              <div>
                <label className="block text-xs text-zinc-400 mb-2 uppercase tracking-widest font-semibold">Question</label>
                <textarea
                  rows="3"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="Type your aptitude question here..."
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 outline-none transition resize-none leading-relaxed"
                />
              </div>

              {/* OPTIONS — clean 2x2 grid */}
              <div>
                <label className="block text-xs text-zinc-400 mb-2.5 uppercase tracking-widest font-semibold">Options</label>
                <div className="grid grid-cols-2 gap-3">
                  {form.options.map((opt, i) => (
                    <div key={i} className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-xs font-bold">
                        {OPTION_LABELS[i]}
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(i, e.target.value)}
                        placeholder={`Option ${OPTION_LABELS[i]}`}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-7 pr-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 outline-none transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CORRECT ANSWER — click to select */}
              <div>
                <label className="block text-xs text-zinc-400 mb-2.5 uppercase tracking-widest font-semibold">
                  Correct Answer
                  {form.answer && (
                    <span className="ml-2 normal-case text-green-400 font-normal">— selected</span>
                  )}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {form.options.map((opt, i) => {
                    if (!opt.trim()) return null;
                    const isSelected = form.answer === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => setForm({ ...form, answer: opt })}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-left transition
                          ${isSelected
                            ? "border-green-600 bg-green-500/10 text-green-400"
                            : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
                          }`}
                      >
                        {isSelected
                          ? <CheckCircle2 size={14} className="shrink-0 text-green-400" />
                          : <Circle size={14} className="shrink-0 text-zinc-600" />
                        }
                        <span className="text-zinc-500 font-mono text-xs shrink-0">{OPTION_LABELS[i]}.</span>
                        <span className="truncate">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {!form.options.some(o => o.trim()) && (
                  <p className="text-zinc-600 text-xs mt-2">Fill in the options above to select an answer</p>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-zinc-800 flex justify-end gap-2.5">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-white text-black hover:bg-zinc-100 transition"
              >
                {isEditing ? "Update Question" : "Save Question"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}