import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Mic, Star, Home as HomeIcon, Camera, Heart, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import BottomNav from './BottomNav';

const categories = [
  'All',
  'Furniture',
  'Lighting',
  'Eyewear',
  'Decor',
  'Art',
  'Outdoor',
];

const products = [
  {
    id: '1',
    name: 'Modern Lounge Chair',
    brand: 'Copenhagen Design',
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    image: '🪑',
    arReady: true,
  },
  {
    id: '2',
    name: 'Arc Floor Lamp',
    brand: 'Lumina Studio',
    price: 449,
    rating: 4.9,
    image: '💡',
    arReady: true,
  },
  {
    id: '3',
    name: 'Minimalist Bookshelf',
    brand: 'Nordic Home',
    price: 679,
    rating: 4.7,
    image: '📚',
    arReady: true,
  },
  {
    id: '4',
    name: 'Velvet Ottoman',
    brand: 'Luxe Living',
    price: 329,
    originalPrice: 449,
    rating: 4.6,
    image: '🛋️',
    arReady: true,
  },
  {
    id: '5',
    name: 'Abstract Wall Art',
    brand: 'Gallery Modern',
    price: 559,
    rating: 4.8,
    image: '🖼️',
    arReady: true,
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    brand: 'Vision Optics',
    price: 229,
    rating: 4.9,
    image: '🕶️',
    arReady: true,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-b from-slate-50 to-white overflow-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="px-4 pt-6 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-slate-500">Welcome back,</h2>
              <h1 className="text-2xl font-bold text-slate-900">Alex</h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search furniture, lighting, decor..."
              className="w-full pl-12 pr-12 py-3.5 bg-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 text-slate-900 placeholder:text-slate-400"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <Mic className="w-5 h-5 text-[#185FA5]" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#185FA5] text-white shadow-lg shadow-[#185FA5]/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 pt-6">
        {/* Featured section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/ar/featured')}
          className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#185FA5]/40 to-purple-600/40" />

          {/* Content */}
          <div className="relative h-full p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white font-medium">
                Featured Collection
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                Modern Living<br />
                Room Set
              </h3>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
                <Camera className="w-4 h-4" />
                Try in Your Room
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 right-8 text-8xl opacity-20 group-hover:scale-110 transition-transform">
            🛋️
          </div>
        </motion.div>

        {/* Trending products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Trending Now</h2>
            <button className="text-sm text-[#185FA5] font-medium">See All</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/50 cursor-pointer group hover:shadow-xl hover:shadow-slate-900/10 transition-all hover:-translate-y-1"
              >
                {/* Product image */}
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  {product.arReady && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#1D9E75] rounded-full">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      <span className="text-[10px] font-semibold text-white">AR</span>
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 rounded-full">
                      <span className="text-[10px] font-semibold text-white">SALE</span>
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500">{product.brand}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-base font-bold text-slate-900">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-slate-700">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
