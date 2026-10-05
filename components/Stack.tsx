import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const EMPTY_CARDS: React.ReactNode[] = [];

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab select-none"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="w-full h-full pointer-events-none rounded-2xl overflow-hidden" draggable={false}>
        {children}
      </div>
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = EMPTY_CARDS,
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [order, setOrder] = useState<number[]>(() => cards.map((_, index) => index + 1));
  const [prevCardCount, setPrevCardCount] = useState(cards.length);
  if (cards.length !== prevCardCount) {
    setPrevCardCount(cards.length);
    setOrder(cards.map((_, index) => index + 1));
  }
  const stack = order.map(id => ({ id, content: cards[id - 1] }));

  const sendToBack = (id: number) => {
    setOrder(prev => [id, ...prev.filter(cardId => cardId !== id)]);
  };

  // Deterministic pseudo-random tilt in [-5, 5) per card, stable across renders
  const getRotation = (id: number) => {
    if (!randomRotation) return 0;
    const seed = Math.sin(id * 12.9898) * 43758.5453;
    return (seed - Math.floor(seed)) * 10 - 5;
  };

  useEffect(() => {
    if (!autoplay || order.length <= 1) return;

    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        const topCardId = order[order.length - 1];
        setOrder(prev => [topCardId, ...prev.filter(cardId => cardId !== topCardId)]);
      }
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, order]);

  return (
    <div
      className="relative w-full h-full"
      style={{
        perspective: 600
      }}
      onMouseEnter={() => { if (pauseOnHover) isPausedRef.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) isPausedRef.current = false; }}
    >
      {stack.map((card, index) => {
        const randomRotate = getRotation(card.id);
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="rounded-2xl overflow-hidden w-full h-full"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 0.85 + index * 0.05 - stack.length * 0.05 + 0.05,
                transformOrigin: '50% 50%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
