import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'See it before you buy it',
    description: 'Visualize products in your actual space with photorealistic AR previews',
    gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
  },
  {
    title: 'True 1:1 scale',
    description: 'Every product rendered at exact real-world dimensions with precision measurements',
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
  },
  {
    title: 'Share your vision',
    description: 'Capture and share your AR designs with friends or save for later',
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} blur-3xl`}
          />
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-between px-6 py-12">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="self-end text-white/60 hover:text-white transition-colors text-sm tracking-wide"
        >
          Skip
        </button>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              {/* Illustration placeholder */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                className="w-64 h-64 mx-auto rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#185FA5]/30 to-transparent" />
                <div className="relative z-10 text-8xl">
                  {currentSlide === 0 && '🏠'}
                  {currentSlide === 1 && '📏'}
                  {currentSlide === 2 && '📸'}
                </div>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-lg text-white/70 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom section */}
        <div className="w-full max-w-md space-y-6">
          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-[#185FA5]'
                      : 'w-2 bg-white/30 group-hover:bg-white/50'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleNext}
            className="w-full bg-[#185FA5] hover:bg-[#1a6bb8] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#185FA5]/50"
          >
            {currentSlide < slides.length - 1 ? 'Continue' : 'Get Started'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
