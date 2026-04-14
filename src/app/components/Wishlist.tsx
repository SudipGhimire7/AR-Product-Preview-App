import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Share2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';

const savedProducts = [
  {
    id: '1',
    name: 'Modern Lounge Chair',
    brand: 'Copenhagen Design',
    price: 899,
    image: '🪑',
  },
  {
    id: '2',
    name: 'Arc Floor Lamp',
    brand: 'Lumina Studio',
    price: 449,
    image: '💡',
  },
  {
    id: '3',
    name: 'Abstract Wall Art',
    brand: 'Gallery Modern',
    price: 559,
    image: '🖼️',
  },
];

const roomScenes = [
  {
    id: '1',
    name: 'Living Room Setup',
    products: ['Modern Lounge Chair', 'Arc Floor Lamp'],
    totalValue: 1348,
    date: '2 days ago',
  },
  {
    id: '2',
    name: 'Bedroom Corner',
    products: ['Abstract Wall Art'],
    totalValue: 559,
    date: '1 week ago',
  },
];

export default function Wishlist() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'scenes'>('products');

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50 to-white overflow-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">My Saved Items</h1>
                <p className="text-sm text-slate-500">
                  {activeTab === 'products' ? `${savedProducts.length} products` : `${roomScenes.length} room scenes`}
                </p>
              </div>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'products'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'scenes'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Room Scenes
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        {/* Products tab */}
        {activeTab === 'products' && (
          <div className="space-y-3">
            {savedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 hover:shadow-lg hover:shadow-slate-900/5 transition-all"
              >
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-4xl flex-shrink-0">
                  {product.image}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.brand}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">${product.price}</span>
                    <button
                      onClick={() => navigate(`/ar/${product.id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#185FA5] text-white rounded-xl text-sm font-semibold hover:bg-[#1a6bb8] transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Try in AR
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Room scenes tab */}
        {activeTab === 'scenes' && (
          <div className="space-y-4">
            {roomScenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/snapshot/${scene.id}`)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-900/10 transition-all cursor-pointer group"
              >
                {/* Scene preview */}
                <div className="aspect-video bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-8">
                      {scene.products.map((_, i) => (
                        <div
                          key={i}
                          className="text-5xl filter drop-shadow-2xl group-hover:scale-110 transition-transform"
                        >
                          {i === 0 ? '🪑' : '💡'}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Product count badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-xs font-semibold text-white">
                      {scene.products.length} {scene.products.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>

                {/* Scene info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{scene.name}</h3>
                    <p className="text-sm text-slate-500">{scene.date}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500">Total value</div>
                      <div className="text-lg font-bold text-slate-900">${scene.totalValue}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Share functionality
                        }}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-slate-700" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Delete functionality
                        }}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-slate-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="wishlist" />
    </div>
  );
}
