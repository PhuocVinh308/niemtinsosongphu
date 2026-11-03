import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategorySelector from './components/CategorySelector';
import RegistrationModal from './components/RegistrationModal';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import Footer from './components/Footer';
import QRCodeModal from './components/QRCodeModal';
import quizData from './data/quiz_questions.json';
import { sounds } from './utils/audio';

// Helper to shuffle and select random questions
function getRandomQuestions(questionList, count = 10) {
  if (!questionList || questionList.length === 0) return [];
  const shuffled = [...questionList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nts_quiz_user');
      return saved ? JSON.parse(saved) : { fullName: '', unit: '', role: 'Học sinh' };
    } catch (e) {
      return { fullName: '', unit: '', role: 'Học sinh' };
    }
  });

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'quiz' | 'result'
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  // Sync user profile to localStorage
  useEffect(() => {
    try {
      if (user && user.fullName) {
        localStorage.setItem('nts_quiz_user', JSON.stringify(user));
      }
    } catch (e) {}
  }, [user]);

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleStartQuiz = (category) => {
    const questionsPool = (category && quizData.questionsByGroup[category.id]) 
      ? quizData.questionsByGroup[category.id] 
      : Object.values(quizData.questionsByGroup).flat();

    const selected = getRandomQuestions(questionsPool, 10);
    setActiveCategory(category || { title: "An toàn số Song Phú" });
    setCurrentQuestions(selected);
    setCurrentScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProfile = (newUserData) => {
    setUser(newUserData);
  };

  const handleFinishQuiz = (result) => {
    setQuizResult(result);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryQuiz = () => {
    handleStartQuiz(activeCategory);
  };

  const handleGoHome = () => {
    setCurrentScreen('home');
    setActiveCategory(null);
    setCurrentQuestions([]);
    setQuizResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Site Header: Song Phú & Only Đố vui */}
      <Navbar 
        user={user}
        onEditProfile={() => setIsRegModalOpen(true)}
        onOpenQR={() => setIsQRModalOpen(true)}
        onGoHome={handleGoHome}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Screen Content */}
      <main style={{ flex: 1 }}>
        {currentScreen === 'home' && (
          <CategorySelector 
            categories={quizData.categories}
            questionsByGroup={quizData.questionsByGroup}
            user={user}
            onSaveProfile={handleSaveProfile}
            onStartQuiz={handleStartQuiz}
            onOpenQR={() => setIsQRModalOpen(true)}
            onEditProfile={() => setIsRegModalOpen(true)}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen 
            category={activeCategory}
            questions={currentQuestions}
            user={user}
            onFinishQuiz={handleFinishQuiz}
            onExitQuiz={handleGoHome}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen 
            result={quizResult}
            user={user}
            onRetryQuiz={handleRetryQuiz}
            onGoHome={handleGoHome}
            onEditProfile={() => setIsRegModalOpen(true)}
          />
        )}
      </main>

      {/* Site Footer: Song Phú */}
      <Footer onGoHome={handleGoHome} onOpenQR={() => setIsQRModalOpen(true)} />

      {/* Profile Edit Modal */}
      <RegistrationModal 
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        initialData={user}
        onSave={(data) => {
          handleSaveProfile(data);
          setIsRegModalOpen(false);
        }}
        requiredToStart={false}
      />

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

    </div>
  );
}
