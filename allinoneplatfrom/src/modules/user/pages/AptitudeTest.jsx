import { useState, useEffect } from "react";
import { getAptitudeQuestionsAPI } from "../../../services/AllAPI";


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

  // Fetch all questions from MongoDB on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await getAptitudeQuestionsAPI(); // no category = get all
        if (res.status === 200) {
          const data = res.data;
          // Group by category
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

  // Timer
  useEffect(() => {
    if (loading || !currentQuestion) return;
    if (timeLeft <= 0) { handleNext(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading]);

  useEffect(() => {
    setTimeLeft(45);
  }, [currentIndex, category]);

  const handleOptionSelect = (option) => {
    if (!currentQuestion) return;
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

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Result screen
  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="text-8xl mb-6">{percentage >= 70 ? "🎉" : "🏆"}</div>
          <h2 className="text-3xl font-bold mb-2">Test Completed!</h2>
          <p className="text-gray-500 mb-8">Here's how you performed</p>
          <div className="mb-8">
            <div className="text-7xl font-bold text-blue-600 mb-1">
              {score}<span className="text-3xl text-gray-400">/{totalQuestions}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-700">{percentage}%</p>
          </div>
          <div className={`inline-block px-8 py-3 rounded-2xl text-lg font-medium mb-8
            ${percentage >= 70 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {percentage >= 70 ? "Excellent! You're interview ready" : "Good effort! Keep practicing"}
          </div>
          <button
            onClick={restartTest}
            className="w-full py-4 bg-black hover:bg-gray-900 text-white font-semibold rounded-2xl transition"
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  // No questions in this category
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Aptitude Test</h1>
            <p className="text-gray-600 mt-3">Sharpen your skills for interviews</p>
          </div>
          <div className="flex justify-center gap-4 mb-12">
            {["quant", "logical", "verbal"].map((cat) => (
              <button key={cat} onClick={() => handleCategoryChange(cat)}
                className={`px-8 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  category === cat ? "bg-black text-white shadow-lg" : "bg-white border border-gray-200 text-gray-700"
                }`}>
                {cat === "quant" ? "Quantitative" : cat === "logical" ? "Logical Reasoning" : "Verbal Ability"}
              </button>
            ))}
          </div>
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No questions available in this category yet.</p>
            <p className="text-sm mt-2">Ask your admin to add questions.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Aptitude Test</h1>
          <p className="text-gray-600 mt-3">Sharpen your skills for interviews</p>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center gap-4 mb-12">
          {["quant", "logical", "verbal"].map((cat) => (
            <button key={cat} onClick={() => handleCategoryChange(cat)}
              className={`px-8 py-3 rounded-2xl font-medium transition-all duration-300 ${
                category === cat ? "bg-black text-white shadow-lg" : "bg-white border border-gray-200 hover:border-gray-300 text-gray-700"
              }`}>
              {cat === "quant" ? "Quantitative" : cat === "logical" ? "Logical Reasoning" : "Verbal Ability"}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2 px-1">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="font-mono flex items-center gap-1">
              ⏱ <span className={timeLeft < 10 ? "text-red-500" : ""}>{timeLeft}s</span>
            </span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="mb-10">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
              {category.toUpperCase()}
            </span>
            <h2 className="text-2xl leading-relaxed font-medium text-gray-800">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = currentQuestion.answer === option;
              return (
                <div key={index}
                  onClick={() => !showAnswer && handleOptionSelect(option)}
                  className={`p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 text-lg
                    ${showAnswer
                      ? isCorrect ? "border-green-500 bg-green-50"
                        : isSelected ? "border-red-500 bg-red-50"
                        : "border-gray-200 opacity-60"
                      : isSelected ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}>
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {showAnswer && (
                      <>
                        {isCorrect && <span className="text-green-600 font-bold">✔</span>}
                        {!isCorrect && isSelected && <span className="text-red-600 font-bold">✖</span>}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <button onClick={handlePrevious} disabled={currentIndex === 0}
              className="px-8 py-3.5 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 disabled:opacity-40 transition">
              ← Previous
            </button>
            <button onClick={handleNext} disabled={!selectedOption}
              className={`px-10 py-3.5 rounded-2xl font-semibold transition-all
                ${selectedOption ? "bg-black text-white hover:bg-gray-900" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
              {currentIndex === totalQuestions - 1 ? "Finish Test" : "Next Question →"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AptitudeTest;