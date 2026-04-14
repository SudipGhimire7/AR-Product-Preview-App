import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, Star, Ruler, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

const colors = [
  { name: 'Charcoal', value: '#2D2D2D', available: true },
  { name: 'Navy', value: '#1E3A5F', available: true },
  { name: 'Sage', value: '#8BA888', available: true },
  { name: 'Cream', value: '#F5F1E8', available: false },
];

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="h-screen bg-white overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-700'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3D Product viewer */}
      <div className="relative h-96 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center overflow-hidden">
        {/* AR Ready badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-6 right-6 z-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200/50">
            <div className="relative">
              <div className="w-2 h-2 bg-[#1D9E75] rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-[#1D9E75] rounded-full animate-ping" />
            </div>
            <span className="text-xs font-semibold text-slate-900">AR Ready</span>
          </div>
        </motion.div>

        {/* 3D Model placeholder */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-9xl cursor-move"
        >
          🪑
        </motion.div>

        {/* Rotate hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full">
          <span className="text-xs text-white">Drag to rotate</span>
        </div>
      </div>

      {/* Product info */}
      <div className="px-4 py-6 space-y-6">
        {/* Title & Price */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Modern Lounge Chair</h1>
              <p className="text-base text-slate-500 mt-1">Copenhagen Design</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-slate-900">4.8</span>
              <span className="text-sm text-slate-500">(124)</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-slate-900">$899</span>
            <span className="text-xl text-slate-400 line-through">$1,299</span>
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              31% OFF
            </span>
          </div>
        </div>

        {/* Color selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Color: {colors[selectedColor].name}
          </h3>
          <div className="flex gap-3">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => color.available && setSelectedColor(index)}
                disabled={!color.available}
                className="relative group"
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    selectedColor === index
                      ? 'border-[#185FA5] scale-110'
                      : 'border-slate-200 hover:border-slate-300'
                  } ${!color.available ? 'opacity-40 cursor-not-allowed' : ''}`}
                  style={{ backgroundColor: color.value }}
                />
                {!color.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-16 bg-red-500 rotate-45" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-900">Dimensions</h3>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Width</div>
              <div className="text-lg font-bold text-slate-900">76 cm</div>
              <div className="text-xs text-slate-400">30 in</div>
            </div>
            <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Depth</div>
              <div className="text-lg font-bold text-slate-900">82 cm</div>
              <div className="text-xs text-slate-400">32 in</div>
            </div>
            <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-xs text-slate-500 mb-1">Height</div>
              <div className="text-lg font-bold text-slate-900">71 cm</div>
              <div className="text-xs text-slate-400">28 in</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  selectedTab === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="min-h-32 text-sm text-slate-600 leading-relaxed">
            {selectedTab === 'description' && (
              <p>
                Experience ultimate comfort with our Modern Lounge Chair. Crafted with premium
                materials and timeless Scandinavian design, this chair combines ergonomic excellence
                with sophisticated aesthetics. Perfect for reading corners, home offices, or living
                rooms.
              </p>
            )}
            {selectedTab === 'specs' && (
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-500">Material</span>
                  <span className="font-medium text-slate-900">Premium Velvet</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-500">Frame</span>
                  <span className="font-medium text-slate-900">Solid Oak Wood</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-500">Weight Capacity</span>
                  <span className="font-medium text-slate-900">150 kg / 330 lbs</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Assembly</span>
                  <span className="font-medium text-slate-900">Required (15 min)</span>
                </div>
              </div>
            )}
            {selectedTab === 'reviews' && (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    "Absolutely love this chair! The AR preview helped me make sure it was the
                    perfect fit for my space."
                  </p>
                  <div className="text-xs font-medium text-slate-900">— Sarah M.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-4">
        <button
          onClick={() => navigate(`/ar/${id}`)}
          className="w-full bg-[#185FA5] hover:bg-[#1a6bb8] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#185FA5]/30"
        >
          Place in My Room
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
