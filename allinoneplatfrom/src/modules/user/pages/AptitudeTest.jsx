import { useState, useEffect } from "react";
import { getAptitudeQuestionsAPI } from "../../../services/AllAPI";

const CATEGORIES = [
  { key: "quant",   label: "Quantitative",     icon: "∑",  color: "#7c3aed", bg: "#f5f3ff", border: "#ede9fe" },
  { key: "logical", label: "Logical Reasoning", icon: "⬡",  color: "#0891b2", bg: "#ecfeff", border: "#cffafe" },
  { key: "verbal",  label: "Verbal Ability",    icon: "Aa", color: "#0f766e", bg: "#f0fdfa", border: "#ccfbf1" },
];

function AptitudeTest() {
  const [allQuestions, setAllQuestions] = useState({ quant: [], logical: [], verbal: [] });
  const [category, setCategory] = useState("quant");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await getAptitudeQuestionsAPI();
        if (res.status === 200) {
          const data = res.data;
          const grouped = {
            quant:   data.filter(q => q.category === "quant"),
            logical: data.filter(q => q.category === "logical"),
            verbal:  data.filter(q => q.category === "verbal"),
          };
          setAllQuestions(grouped);
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const currentCategoryQuestions = allQuestions[category] || [];
  const currentQuestion = currentCategoryQuestions[currentIndex];
  const totalQuestions = currentCategoryQuestions.length;
  const selectedOption = currentQuestion ? (answers[currentQuestion._id] || "") : "";
  const activeCat = CATEGORIES.find(c => c.key === category);

  useEffect(() => {
    if (loading || !currentQuestion) return;
    if (timeLeft <= 0) { handleNext(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading]);

  useEffect(() => { setTimeLeft(45); }, [currentIndex, category]);

  const handleOptionSelect = (option) => {
    if (!currentQuestion || showAnswer) return;
    setAnswers(prev => ({ ...prev, [currentQuestion._id]: option }));
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    const selected = answers[currentQuestion._id];
    if (selected === currentQuestion.answer) setScore(prev => prev + 1);
    setShowAnswer(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setShowAnswer(false);
    setTimeLeft(45);
  };

  const restartTest = () => {
    setCategory("quant");
    setCurrentIndex(0);
    setAnswers({});
    setScore(0);
    setShowResult(false);
    setTimeLeft(45);
  };

  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const timerPct = (timeLeft / 45) * 100;
  const timerColor = timeLeft < 10 ? "#ef4444" : timeLeft < 20 ? "#f97316" : activeCat?.color;

  const page = {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'Inter', 'DM Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "48px 20px 80px",
  };
  const wrap = { width: "100%", maxWidth: 660 };

  /* Loading */
  if (loading) {
    return (
      <div style={{ ...page, justifyContent: "center" }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            border: "3px solid #e2e8f0", borderTop: "3px solid #7c3aed",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
          }} />
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Loading questions…</p>
        </div>
      </div>
    );
  }

  /* Result */
  if (showResult) {
    const pct = Math.round((score / totalQuestions) * 100);
    const passed = pct >= 70;
    const accent = passed ? "#16a34a" : "#d97706";
    const accentBg = passed ? "#f0fdf4" : "#fffbeb";
    const accentBorder = passed ? "#bbf7d0" : "#fde68a";
    return (
      <div style={{ ...page, justifyContent: "center" }}>
        <div style={{
          width: "100%", maxWidth: 420,
          background: "#fff", border: "1px solid #e2e8f0",
          borderRadius: 24, padding: "48px 40px", textAlign: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 28px" }}>
            <svg viewBox="0 0 120 120" style={{ width: 120, height: 120, transform: "rotate(-90deg)" }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke={accent} strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 52 * pct / 100} ${2 * Math.PI * 52}`}
                strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }} />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#0f172a" }}>{pct}%</span>
            </div>
          </div>
          <p style={{ fontSize: 11, letterSpacing: 2, color: "#94a3b8", marginBottom: 8 }}>TEST COMPLETED</p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
            {passed ? "Well done!" : "Keep practising"}
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>
            You scored <span style={{ color: "#0f172a", fontWeight: 600 }}>{score}</span> out of {totalQuestions}
          </p>
          <div style={{
            display: "inline-block", padding: "8px 20px", borderRadius: 100,
            background: accentBg, border: `1px solid ${accentBorder}`,
            color: accent, fontSize: 13, fontWeight: 500, marginBottom: 32,
          }}>
            {passed ? "Interview ready 🎯" : "Room to grow — you've got this"}
          </div>
          <button onClick={restartTest} style={{
            width: "100%", padding: "14px",
            background: "#0f172a", color: "#fff",
            border: "none", borderRadius: 12,
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            transition: "opacity 0.15s",
          }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            Retake test
          </button>
        </div>
      </div>
    );
  }

  const Header = () => (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, letterSpacing: 2.5, color: "#94a3b8", marginBottom: 6 }}>APTITUDE TEST</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Sharpen your skills</h1>
      <p style={{ fontSize: 14, color: "#64748b" }}>Choose a category and answer every question</p>
    </div>
  );

  const CategoryTabs = () => (
    <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
      {CATEGORIES.map(cat => {
        const active = category === cat.key;
        return (
          <button key={cat.key} onClick={() => handleCategoryChange(cat.key)} style={{
            flex: 1, padding: "12px 8px",
            background: active ? cat.bg : "#fff",
            border: `1.5px solid ${active ? cat.color + "66" : "#e2e8f0"}`,
            borderRadius: 12,
            color: active ? cat.color : "#64748b",
            fontSize: 12, fontWeight: active ? 600 : 400,
            cursor: "pointer", transition: "all 0.2s",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          }}
            onMouseOver={e => { if (!active) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; } }}
            onMouseOut={e => { if (!active) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0"; } }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{cat.icon}</span>
            <span style={{ whiteSpace: "nowrap" }}>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );

  if (!currentQuestion) {
    return (
      <div style={page}>
        <div style={wrap}>
          <Header />
          <CategoryTabs />
          <div style={{
            background: "#fff", border: "1px solid #e2e8f0",
            borderRadius: 20, padding: "60px 40px", textAlign: "center",
          }}>
            <p style={{ fontSize: 36, marginBottom: 12 }}>📭</p>
            <p style={{ color: "#475569", fontSize: 15 }}>No questions yet in this category</p>
            <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 6 }}>Ask your admin to add some.</p>
          </div>
        </div>
      </div>
    );
  }

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div style={page}>
      <div style={wrap}>
        <Header />
        <CategoryTabs />

        {/* Progress + Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>
                Question <span style={{ color: "#0f172a", fontWeight: 600 }}>{currentIndex + 1}</span> / {totalQuestions}
              </span>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>
                Score: <span style={{ color: "#16a34a", fontWeight: 600 }}>{score}</span>
              </span>
            </div>
            <div style={{ height: 5, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progress}%`,
                background: activeCat?.color,
                borderRadius: 99, transition: "width 0.4s ease",
              }} />
            </div>
          </div>

          <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
            <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, transform: "rotate(-90deg)" }}>
              <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
              <circle cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="3.5"
                strokeDasharray={`${2 * Math.PI * 20 * timerPct / 100} ${2 * Math.PI * 20}`}
                strokeLinecap="round" style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.3s" }} />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: timerColor,
              fontVariantNumeric: "tabular-nums",
            }}>
              {timeLeft}
            </div>
          </div>
        </div>

        {/* Question card */}
        <div style={{
          background: "#fff", border: "1px solid #e2e8f0",
          borderRadius: 20, padding: "28px 32px", marginBottom: 14,
          boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: activeCat?.bg, border: `1px solid ${activeCat?.border}`,
            borderRadius: 100, padding: "4px 12px", marginBottom: 18,
          }}>
            <span style={{ fontSize: 12, color: activeCat?.color }}>{activeCat?.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: activeCat?.color, letterSpacing: 0.8 }}>
              {activeCat?.label.toUpperCase()}
            </span>
          </div>
          <h2 style={{ fontSize: 17, fontWeight: 500, color: "#1e293b", lineHeight: 1.65, margin: 0 }}>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 22 }}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = currentQuestion.answer === option;

            let bg = "#fff", border = "#e2e8f0";
            let labelBg = "#f1f5f9", labelColor = "#94a3b8";
            let textColor = "#334155", icon = null, opacity = 1;

            if (showAnswer) {
              if (isCorrect) {
                bg = "#f0fdf4"; border = "#86efac";
                labelBg = "#dcfce7"; labelColor = "#16a34a";
                textColor = "#15803d"; icon = "✓";
              } else if (isSelected) {
                bg = "#fef2f2"; border = "#fca5a5";
                labelBg = "#fee2e2"; labelColor = "#dc2626";
                textColor = "#b91c1c"; icon = "✕";
              } else {
                opacity = 0.45;
              }
            } else if (isSelected) {
              bg = activeCat?.bg; border = activeCat?.color + "66";
              labelBg = activeCat?.color + "18"; labelColor = activeCat?.color;
              textColor = activeCat?.color;
            }

            return (
              <div key={index}
                onClick={() => handleOptionSelect(option)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: bg, border: `1.5px solid ${border}`,
                  borderRadius: 14, padding: "15px 18px",
                  cursor: showAnswer ? "default" : "pointer",
                  opacity, transition: "all 0.18s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
                onMouseOver={e => { if (!showAnswer && !isSelected) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; } }}
                onMouseOut={e => { if (!showAnswer && !isSelected) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0"; } }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                  background: labelBg, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: labelColor, transition: "all 0.18s",
                }}>
                  {showAnswer && (isSelected || isCorrect) ? icon : optionLetters[index]}
                </div>
                <span style={{ fontSize: 14, color: textColor, lineHeight: 1.5, transition: "color 0.18s" }}>
                  {option}
                </span>
              </div>
            );
          })}
        </div>

        {/* Nav buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handlePrevious} disabled={currentIndex === 0} style={{
            padding: "13px 22px",
            background: "#fff", border: "1.5px solid #e2e8f0",
            borderRadius: 12,
            color: currentIndex === 0 ? "#cbd5e1" : "#475569",
            fontSize: 13, fontWeight: 500,
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            transition: "all 0.15s",
          }}
            onMouseOver={e => { if (currentIndex > 0) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; } }}
            onMouseOut={e => { if (currentIndex > 0) { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0"; } }}
          >
            ← Previous
          </button>

          <button onClick={handleNext} disabled={!selectedOption} style={{
            flex: 1, padding: "13px 22px",
            background: selectedOption ? "#0f172a" : "#f1f5f9",
            border: "none", borderRadius: 12,
            color: selectedOption ? "#fff" : "#94a3b8",
            fontSize: 13, fontWeight: 600,
            cursor: selectedOption ? "pointer" : "not-allowed",
            transition: "all 0.18s",
          }}
            onMouseOver={e => { if (selectedOption) e.currentTarget.style.opacity = "0.85"; }}
            onMouseOut={e => { e.currentTarget.style.opacity = "1"; }}
          >
            {currentIndex === totalQuestions - 1 ? "Finish test ✓" : "Next question →"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AptitudeTest;