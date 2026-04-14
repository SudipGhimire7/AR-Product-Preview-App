import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Download,
  Share2,
  Link2,
  Instagram,
  Facebook,
  Twitter,
  Tag,
  ShoppingCart,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const productsInScene = [
  { id: '1', name: 'Modern Lounge Chair', price: 899, position: { x: 40, y: 60 } },
  { id: '2', name: 'Arc Floor Lamp', price: 449, position: { x: 70, y: 50 } },
];

export default function RoomSnapshot() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showProductTags, setShowProductTags] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleDownload = () => {
    toast.success('Snapshot saved to camera roll');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://arpreview.app/scene/' + id);
    toast.success('Link copied to clipboard');
  };

  const handleShare = (platform: string) => {
    toast.success(`Shared to ${platform}`);
    setShowShareMenu(false);
  };

  return (
    <div className="h-screen bg-slate-950 relative overflow-hidden">
      {/* Snapshot image */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        {/* Room texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Products in scene */}
        <div className="absolute inset-0 flex items-center justify-center gap-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-8xl filter drop-shadow-2xl"
          >
            🪑
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-7xl filter drop-shadow-2xl"
          >
            💡
          </motion.div>
        </div>

        {/* Product tags */}
        <AnimatePresence>
          {showProductTags && productsInScene.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
              style={{
                position: 'absolute',
                left: `${product.position.x}%`,
                top: `${product.position.y}%`,
              }}
              className="cursor-pointer group"
            >
              {/* Tag pin */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-[#185FA5] border-4 border-white shadow-lg flex items-center justify-center"
                >
                  <Tag className="w-4 h-4 text-white" />
                </motion.div>

                {/* Product info popup */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 p-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-slate-900">{product.name}</div>
                    <div className="text-lg font-bold text-[#185FA5]">${product.price}</div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="w-3 h-3 bg-white rotate-45 border-r border-b border-slate-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Branded watermark */}
        <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#185FA5] flex items-center justify-center text-xs">
              AR
            </div>
            <span className="text-white text-sm font-semibold">AR Preview</span>
          </div>
        </div>
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

          <h1 className="text-lg font-semibold text-white">Room Snapshot</h1>

          <button
            onClick={() => setShowProductTags(!showProductTags)}
            className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
              showProductTags
                ? 'bg-[#185FA5] border-[#185FA5]'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <Tag className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Product strip */}
      <div className="absolute bottom-28 left-0 right-0 z-30 px-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4">
          <div className="flex items-center gap-3 mb-3">
            <ShoppingCart className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-semibold">Products in this scene</span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {productsInScene.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 flex items-center gap-3 hover:bg-white/20 transition-colors min-w-max"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-2xl">
                  {product.id === '1' ? '🪑' : '💡'}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{product.name}</div>
                  <div className="text-xs text-white/70">${product.price}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm">
        <div className="px-4 py-6 space-y-3">
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
            >
              <Download className="w-5 h-5" />
              Save
            </button>
            <button
              onClick={() => setShowShareMenu(true)}
              className="flex-1 py-4 bg-[#185FA5] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#1a6bb8] transition-all shadow-lg shadow-[#185FA5]/50"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
          <button
            onClick={handleCopyLink}
            className="w-full py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          >
            <Link2 className="w-4 h-4" />
            Copy Shoppable Link
          </button>
        </div>
      </div>

      {/* Share menu */}
      <AnimatePresence>
        {showShareMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareMenu(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl"
            >
              {/* Handle */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3" />

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Share to</h3>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500' },
                    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
                    { name: 'Twitter', icon: Twitter, color: 'bg-sky-500' },
                    { name: 'Link', icon: Link2, color: 'bg-slate-700' },
                  ].map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <button
                        key={platform.name}
                        onClick={() => handleShare(platform.name)}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={`w-16 h-16 rounded-2xl ${platform.color} flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-medium text-slate-700">{platform.name}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowShareMenu(false)}
                  className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
