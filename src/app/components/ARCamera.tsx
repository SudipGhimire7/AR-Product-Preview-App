import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Settings,
  RotateCw,
  Maximize2,
  Palette,
  Ruler,
  Camera,
  Info,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

type PlacementState = 'scanning' | 'surface-found' | 'placed' | 'measuring';

const colorVariants = [
  { name: 'Charcoal', value: '#2D2D2D' },
  { name: 'Navy', value: '#1E3A5F' },
  { name: 'Sage', value: '#8BA888' },
];

export default function ARCamera() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [placementState, setPlacementState] = useState<PlacementState>('scanning');
  const [selectedColor, setSelectedColor] = useState(0);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Simulate AR scanning
    const timer1 = setTimeout(() => {
      setPlacementState('surface-found');
    }, 2000);

    const timer2 = setTimeout(() => {
      setPlacementState('placed');
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleCapture = () => {
    navigate(`/snapshot/${id}`);
  };

  return (
    <div className="h-screen bg-[#0D0D0C] relative overflow-hidden">
      {/* Camera feed simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        {/* Simulated room texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-lg">
              🪑
            </div>
            <div>
              <div className="text-xs text-white/70">Placing</div>
              <div className="text-sm font-semibold text-white">Modern Lounge Chair</div>
            </div>
          </div>

          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* AR Scanning overlay */}
      <AnimatePresence>
        {placementState === 'scanning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30"
          >
            <div className="text-center space-y-6">
              {/* Scanning target */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="w-48 h-48 mx-auto relative"
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#185FA5] rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#185FA5] rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#185FA5] rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#185FA5] rounded-br-2xl" />

                {/* Center circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#185FA5] animate-pulse" />
                </div>
              </motion.div>

              <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/20">
                <p className="text-white font-medium">Move phone slowly to detect floor</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Surface detected indicator */}
      <AnimatePresence>
        {placementState === 'surface-found' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            {/* Grid plane indicator */}
            <div className="relative w-64 h-64">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                className="absolute inset-0 border-2 border-[#1D9E75]/50 rounded-2xl"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(29, 158, 117, 0.2) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(29, 158, 117, 0.2) 20px)',
                }}
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#1D9E75] rounded-full">
                <p className="text-white text-sm font-semibold">Surface Detected</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placed product */}
      <AnimatePresence>
        {placementState === 'placed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <motion.div
              animate={{ rotate: rotation }}
              className="relative"
            >
              {/* Product shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/40 blur-xl rounded-full" />

              {/* Product */}
              <div
                className="text-9xl filter drop-shadow-2xl"
                style={{
                  filter: `drop-shadow(0 25px 50px rgba(0,0,0,0.5)) hue-rotate(${selectedColor * 30}deg)`,
                }}
              >
                🪑
              </div>

              {/* Resize handles */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#185FA5] border-4 border-white rounded-full shadow-lg" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#185FA5] border-4 border-white rounded-full shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#185FA5] border-4 border-white rounded-full shadow-lg" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#185FA5] border-4 border-white rounded-full shadow-lg" />

              {/* Drag indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20"
              >
                <p className="text-white text-xs font-medium">Drag to move • Pinch to resize</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR Measurement overlay */}
      <AnimatePresence>
        {showMeasurements && placementState === 'placed' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-25 pointer-events-none"
          >
            {/* Measurement lines */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Left wall measurement */}
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1="20%"
                y1="50%"
                x2="35%"
                y2="50%"
                stroke="#BA7517"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              {/* Right wall measurement */}
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1="65%"
                y1="50%"
                x2="80%"
                y2="50%"
                stroke="#BA7517"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Measurement labels */}
            <div className="absolute left-[12%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#BA7517] rounded-full">
              <span className="text-white text-xs font-bold">42 cm from wall</span>
            </div>
            <div className="absolute right-[12%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#BA7517] rounded-full">
              <span className="text-white text-xs font-bold">58 cm from wall</span>
            </div>

            {/* Room fit indicator */}
            <div className="absolute top-24 right-6 px-4 py-2 bg-[#1D9E75]/90 backdrop-blur-md rounded-xl border border-white/20 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white text-sm font-semibold">Perfect Fit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left toolbar */}
      {placementState === 'placed' && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 space-y-3"
        >
          <button
            onClick={() => setRotation(rotation + 45)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <RotateCw className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setShowMeasurements(!showMeasurements)}
            className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
              showMeasurements
                ? 'bg-[#BA7517] border-[#BA7517]'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <Ruler className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setShowProductInfo(!showProductInfo)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
        </motion.div>
      )}

      {/* Bottom tray - Color variants */}
      {placementState === 'placed' && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-24 left-0 right-0 z-30 px-4"
        >
          <div className="max-w-md mx-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
            <p className="text-white/70 text-xs mb-3 text-center">Tap to change color</p>
            <div className="flex gap-3 justify-center">
              {colorVariants.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className="relative group"
                >
                  <div
                    className={`w-16 h-16 rounded-xl border-2 transition-all ${
                      selectedColor === index
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] font-medium">{color.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Capture button */}
      {placementState === 'placed' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute bottom-6 right-6 z-30"
        >
          <button
            onClick={handleCapture}
            className="w-16 h-16 rounded-full bg-white border-4 border-white/30 shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
          >
            <Camera className="w-7 h-7 text-slate-900" />
          </button>
        </motion.div>
      )}

      {/* Product Info Bottom Sheet */}
      <AnimatePresence>
        {showProductInfo && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl rounded-t-3xl border-t border-slate-200"
          >
            {/* Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3" />

            <div className="p-6 space-y-4 max-h-[60vh] overflow-auto">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-3xl flex-shrink-0">
                  🪑
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">Modern Lounge Chair</h3>
                  <p className="text-sm text-slate-500">Copenhagen Design</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-slate-900">$899</span>
                    <span className="text-sm text-slate-400 line-through">$1,299</span>
                  </div>
                </div>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs text-slate-500 mb-1">Dimensions</div>
                  <div className="text-sm font-bold text-slate-900">76 × 82 × 71 cm</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs text-slate-500 mb-1">Delivery</div>
                  <div className="text-sm font-bold text-slate-900">3-5 business days</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 border-2 border-slate-200 text-slate-900 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                  Save to Wishlist
                </button>
                <button className="flex-1 py-3 bg-[#185FA5] text-white rounded-xl font-semibold hover:bg-[#1a6bb8] transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
