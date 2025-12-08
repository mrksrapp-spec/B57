import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  Share2, 
  X, 
  Mail, 
  MessageCircle, 
  CheckCircle2,
  ChevronRight,
  Play,
  Send,
  User,
  ChevronLeft,
  MoreHorizontal
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type MediaType = 'image' | 'video';

interface GalleryItem {
  id: string;
  type: MediaType;
  src: string;
  thumbnail?: string;
  title: string;
}

type ViewState = 'gallery' | 'zoom' | 'share-select' | 'keyboard' | 'sending' | 'success';

// --- Data ---

const ZOOM_IMAGE = './images/zoom.jpeg';

const INITIAL_ITEMS: GalleryItem[] = [
  {
    id: 'item-1',
    type: 'video',
    src: './images/video1.mp4',
    title: 'Video'
  },
  {
    id: 'item-neu1',
    type: 'image',
    src: './images/neu1.jpeg',
    title: 'Zusatzbild 1'
  },
  {
    id: 'item-neu2',
    type: 'image',
    src: './images/neu2.jpeg',
    title: 'Zusatzbild 2'
  },
  {
    id: 'item-neu3',
    type: 'image',
    src: './images/neu3.jpeg',
    title: 'Zusatzbild 3'
  },
  {
    id: 'item-neu4',
    type: 'image',
    src: './images/neu4.jpeg',
    title: 'Zusatzbild 4'
  },
  {
    id: 'item-neu5',
    type: 'image',
    src: './images/neu5.jpeg',
    title: 'Zusatzbild 5'
  },
  {
    id: 'item-neu6',
    type: 'image',
    src: './images/neu6.jpeg',
    title: 'Zusatzbild 6'
  },
  {
    id: 'item-2',
    type: 'image',
    src: './images/1.jpeg',
    title: 'Bild 1'
  },
  {
    id: 'item-3',
    type: 'image',
    src: './images/2.jpg',
    title: 'Bild 2'
  },
  {
    id: 'item-4',
    type: 'image',
    src: './images/3.jpg',
    title: 'Bild 3'
  },
  {
    id: 'item-5',
    type: 'image',
    src: './images/4.jpeg',
    title: 'Bild 4'
  },
];

const NEW_ITEMS: GalleryItem[] = [
  {
    id: 'item-12',
    type: 'image',
    src: './images/5.jpeg',
    title: 'Bild 5'
  },
  {
    id: 'item-13',
    type: 'image',
    src: './images/6.jpeg',
    title: 'Bild 6'
  }
];

const CONTACTS = [
  { id: 'c1', name: 'Lena Odenthal', role: '', type: 'person', image: './images/profiles/person1.png' },
  { id: 'c2', name: 'Nico Langenkamp', role: '', type: 'person', image: './images/profiles/person2.png' },
  { id: 'c3', name: 'Messenger', role: 'App', type: 'app', icon: MessageCircle, color: 'bg-green-600' },
  { id: 'c4', name: 'E-Mail', role: 'Senden', type: 'app', icon: Mail, color: 'bg-blue-600' },
  { id: 'c5', name: 'Weitere Kontakte', role: 'Auswählen', type: 'app', icon: MoreHorizontal, color: 'bg-stone-600' }
];

const TARGET_MESSAGE = "Wir sollten mit Fiona Markovic sprechen. Dringend!!!";

// --- Components ---

const KeyboardKey = ({ label, width = 1, onClick }: { label?: string, width?: number, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "h-12 rounded bg-stone-700/50 flex items-center justify-center text-white/90 font-medium shadow-sm text-lg select-none touch-none",
      // Removed all hover/active/focus states to prevent highlighting
      "outline-none ring-0"
    )}
    style={{ flex: width }}
  >
    {label}
  </button>
);

const VideoPlayer = ({ src, poster, onNext, onPrev }: { src: string, poster?: string, onNext: () => void, onPrev: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    video.load();

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false; // Enable sound when user plays
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-black" onClick={handleVideoClick}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain cursor-pointer"
        muted
        playsInline
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-6">
            <Play className="w-16 h-16 text-white" style={{ paddingLeft: '4px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export function TabletGalleryAppV4() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_ITEMS);
  const [view, setView] = useState<ViewState>('gallery');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasShared, setHasShared] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [fullscreenAttempted, setFullscreenAttempted] = useState(false);

  useEffect(() => {
    setItems(INITIAL_ITEMS);
    setCurrentIndex(0);
  }, [JSON.stringify(INITIAL_ITEMS)]);

  const currentItem = items[currentIndex];

  // Request fullscreen on first user interaction
  const requestFullscreen = async () => {
    if (!fullscreenAttempted && document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
        setFullscreenAttempted(true);
      } catch (err) {
        // Fullscreen request failed - app continues to work normally
        console.log('Fullscreen not available:', err);
        setFullscreenAttempted(true);
      }
    }
  };

  const handleNext = () => {
    requestFullscreen(); // Try fullscreen on first tap
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleZoomEnter = () => {
    setView('zoom');
  };

  const handleZoomClose = () => {
    setView('gallery');
  };

  const handleShareStart = () => {
    setView('share-select');
  };

  const handleRecipientSelect = () => {
    setTypedText("");
    setView('keyboard');
  };

  const handleKeyClick = () => {
    if (typedText.length < TARGET_MESSAGE.length) {
      // Add exactly 1 character at a time
      const chunk = 1;
      const nextLen = Math.min(typedText.length + chunk, TARGET_MESSAGE.length);
      setTypedText(TARGET_MESSAGE.slice(0, nextLen));
    }
  };

  const handleSend = () => {
    setView('sending');
    setTimeout(() => {
      if (!hasShared) {
        setItems(prev => [...prev, ...NEW_ITEMS]);
        setHasShared(true);
      }
      setView('success');
      setTimeout(() => {
        setView('gallery');
        setCurrentIndex(0);
      }, 2000);
    }, 2000);
  };

  // Keyboard Layout
  const keysRow1 = ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'];
  const keysRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keysRow3 = ['Y', 'X', 'C', 'V', 'B', 'N', 'M'];

  return (
    <div className="w-full h-screen bg-stone-950 text-white overflow-hidden font-sans select-none relative">
       {/* Background Texture */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <AnimatePresence mode="wait">
        
        {/* VIEW: GALLERY (SINGLE ITEM) */}
        {view === 'gallery' && (
          <motion.div 
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center bg-black"
            onClick={handleNext} // Click anywhere to advance
          >
            <motion.div 
              key={currentItem.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {currentItem.type === 'video' ? (
                <VideoPlayer src={currentItem.src} poster={currentItem.thumbnail} onNext={handleNext} onPrev={handlePrev} />
              ) : (
                <img src={currentItem.src} alt={currentItem.title} className="w-full h-full object-contain" />
              )}
            </motion.div>

            {/* Controls Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-sm font-medium uppercase tracking-widest text-white/80">Galerie</span>
                    </div>
                </div>

                {/* Footer - Zoom Button */}
                <div className="pt-20 pb-4 px-4 flex justify-end items-end">
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleZoomEnter(); }}
                        className="pointer-events-auto bg-orange-500 hover:bg-orange-400 text-white p-4 rounded-full shadow-lg shadow-orange-500/20 transition-transform hover:scale-110 flex items-center gap-2"
                    >
                        <Maximize2 className="w-6 h-6" />
                        <span className="font-medium pr-2">Zoom</span>
                    </button>
                </div>
            </div>
          </motion.div>
        )}

        {/* VIEW: ZOOM */}
        {view === 'zoom' && (
          <motion.div 
            key="zoom"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              onClick={handleZoomClose}
              className="absolute top-8 right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <motion.img 
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="max-w-[150%] max-h-[150%] object-cover cursor-move"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    drag
                    dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                />
                
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-12"
                >
                    <button 
                        onClick={handleShareStart}
                        className="bg-orange-500 text-white px-10 py-4 rounded-full font-medium text-xl shadow-xl shadow-orange-500/30 hover:bg-orange-400 transition-all hover:scale-105 flex items-center gap-3"
                    >
                        <Share2 className="w-6 h-6" />
                        Teilen
                    </button>
                </motion.div>
            </div>
          </motion.div>
        )}

        {/* VIEW: SHARE SELECT */}
        {view === 'share-select' && (
          <motion.div 
            key="share-select"
            className="fixed inset-0 z-50 flex flex-col bg-stone-900"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
             <div className="p-6 border-b border-white/10 flex items-center">
                 <button onClick={() => setView('zoom')} className="p-2 -ml-2 text-white/60 hover:text-white">
                     <ChevronLeft className="w-8 h-8" />
                 </button>
                 <h2 className="ml-4 text-xl font-light text-white">Empfänger wählen</h2>
             </div>

            {/* Modified: Flex Column Vertical Stack */}
            <div className="flex-1 p-8 flex flex-col gap-4 max-w-md mx-auto w-full justify-center overflow-y-auto">
              {CONTACTS.map((contact, idx) => (
                <motion.button
                  key={contact.id}
                  onClick={handleRecipientSelect}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-stone-800 rounded-xl p-3 flex items-center gap-4 border border-white/5 hover:bg-stone-700 transition-colors w-full shrink-0"
                >
                   <div className={cn(
                    "w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white overflow-hidden shadow-lg",
                    contact.type === 'app' ? contact.color : "bg-stone-600"
                  )}>
                    {contact.type === 'person' ? (
                      <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" />
                    ) : (
                      <contact.icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                      <div className="text-lg font-medium text-white">{contact.name}</div>
                      <div className="text-sm text-white/50">{contact.role}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW: KEYBOARD (MAGIC TYPING) */}
        {view === 'keyboard' && (
            <motion.div
                key="keyboard"
                className="fixed inset-0 z-50 flex flex-col bg-stone-950"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Message Preview Area */}
                <div className="flex-1 p-8 flex flex-col max-w-3xl mx-auto w-full">
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={() => setView('share-select')} className="text-white/60 hover:text-white">Abbrechen</button>
                        <span className="text-white/40">Neue Nachricht</span>
                        <button 
                            onClick={handleSend}
                            disabled={typedText.length === 0}
                            className={cn(
                                "px-6 py-2 rounded-full font-medium transition-all",
                                typedText.length > 0 ? "bg-orange-500 text-white" : "bg-stone-800 text-white/20"
                            )}
                        >
                            Senden
                        </button>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                        {/* FIXED CURSOR IMPLEMENTATION */}
                        <div className="w-full text-3xl text-white font-light text-center leading-tight break-words">
                           {typedText}
                           {typedText.length < TARGET_MESSAGE.length && (
                               <motion.span 
                                   className="inline-block w-0.5 h-8 bg-orange-500 align-middle ml-1"
                                   animate={{ opacity: [1, 0] }}
                                   transition={{ repeat: Infinity, duration: 0.8 }}
                               />
                           )}
                        </div>
                    </div>
                </div>

                {/* Virtual Keyboard */}
                <div 
                    className="bg-stone-900 p-4 pb-8 pt-6 rounded-t-3xl shadow-2xl border-t border-white/10 select-none"
                    onClick={handleKeyClick} // MAGIC: Click anywhere on keyboard triggers typing
                >
                    <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                        <div className="flex gap-2 justify-center">
                            {keysRow1.map(k => <KeyboardKey key={k} label={k} onClick={() => {}} />)}
                        </div>
                        <div className="flex gap-2 justify-center px-4">
                            {keysRow2.map(k => <KeyboardKey key={k} label={k} onClick={() => {}} />)}
                        </div>
                        <div className="flex gap-2 justify-center px-12">
                            <KeyboardKey width={1.5} onClick={() => {}} /> {/* Shift */}
                            {keysRow3.map(k => <KeyboardKey key={k} label={k} onClick={() => {}} />)}
                            <KeyboardKey width={1.5} onClick={() => {}} /> {/* Backspace */}
                        </div>
                        <div className="flex gap-2 justify-center mt-2">
                            <KeyboardKey label="123" width={1.5} onClick={() => {}} />
                            <KeyboardKey label="space" width={5} onClick={() => {}} />
                            <KeyboardKey label="return" width={1.5} onClick={() => {}} />
                        </div>
                    </div>
                </div>
            </motion.div>
        )}

        {/* VIEW: SENDING & SUCCESS */}
        {(view === 'sending' || view === 'success') && (
          <motion.div 
            key="status"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                {view === 'sending' ? (
                    <motion.div 
                        className="w-20 h-20 border-4 border-white/20 border-t-orange-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                ) : (
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center"
                    >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                )}
            </div>
            <h3 className="text-2xl font-light text-white tracking-widest uppercase">
                {view === 'sending' ? 'Wird gesendet...' : 'Gesendet'}
            </h3>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default TabletGalleryAppV4;
