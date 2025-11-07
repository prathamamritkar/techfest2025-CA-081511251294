// Task 4: Pure CSS/SVG Micro-Illustration - "Thoughts Bloom into Gardens"
// Concept: Brain's neural activity transforms into flowering garden growth
export function BrainIllustration() {
  return (
    <div className="neuro-garden-illustration">
      {/* Main brain-to-garden container */}
      <div className="brain-garden-wrapper">
        
        {/* LAYER 1: Neural Brain Base - Unified Structure */}
        <div className="brain-core">
          {/* Unified brain base - creating connected shape */}
          <div className="brain-unified">
            {/* Left hemisphere */}
            <div className="hemisphere hemisphere-left">
              <div className="cortex-fold fold-1"></div>
              <div className="cortex-fold fold-2"></div>
              <div className="cortex-fold fold-3"></div>
            </div>
            
            {/* Right hemisphere */}
            <div className="hemisphere hemisphere-right">
              <div className="cortex-fold fold-4"></div>
              <div className="cortex-fold fold-5"></div>
              <div className="cortex-fold fold-6"></div>
            </div>

            {/* Longitudinal fissure - the dividing line */}
            <div className="brain-fissure"></div>
            
            {/* Corpus callosum - visible connector */}
            <div className="neural-bridge"></div>
          </div>
        </div>

        {/* LAYER 2: Thought Streams - SVG Paths showing ideas flowing upward */}
        <svg className="thought-streams" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gradients for flowing thoughts */}
            <linearGradient id="thoughtFlow1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8">
                <animate attributeName="offset" values="0;0.3;0" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#00ccff" stopOpacity="0.6">
                <animate attributeName="offset" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#ff00ff" stopOpacity="0">
                <animate attributeName="offset" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            <linearGradient id="thoughtFlow2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00ccff" stopOpacity="0.8">
                <animate attributeName="offset" values="0;0.3;0" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6">
                <animate attributeName="offset" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0">
                <animate attributeName="offset" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            {/* Radial gradient for blooming effect */}
            <radialGradient id="bloomGradient">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00ccff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff00ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Flowing thought paths from brain to flowers */}
          <path 
            className="thought-path path-1" 
            d="M 150 350 Q 120 280, 100 200 Q 90 150, 120 100"
            fill="none" 
            stroke="url(#thoughtFlow1)" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path 
            className="thought-path path-2" 
            d="M 250 360 Q 250 280, 250 180 Q 250 120, 250 80"
            fill="none" 
            stroke="url(#thoughtFlow2)" 
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path 
            className="thought-path path-3" 
            d="M 350 350 Q 380 280, 400 200 Q 410 150, 380 100"
            fill="none" 
            stroke="url(#thoughtFlow1)" 
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Synaptic connections - intricate web */}
          <path 
            className="synapse-web web-1"
            d="M 180 300 Q 220 280, 250 290 Q 280 300, 320 285"
            fill="none"
            stroke="rgba(0, 255, 136, 0.3)"
            strokeWidth="1"
          />
          <path 
            className="synapse-web web-2"
            d="M 160 320 Q 200 310, 250 320 Q 300 330, 340 315"
            fill="none"
            stroke="rgba(0, 204, 255, 0.3)"
            strokeWidth="1"
          />
        </svg>

        {/* LAYER 3: Blooming Flowers - Ideas coming to life */}
        <div className="flower-garden">
          {/* Flower 1 - Large center bloom */}
          <div className="flower flower-center">
            <div className="flower-stem"></div>
            <div className="flower-head">
              <div className="petal petal-1"></div>
              <div className="petal petal-2"></div>
              <div className="petal petal-3"></div>
              <div className="petal petal-4"></div>
              <div className="petal petal-5"></div>
              <div className="flower-center-dot"></div>
            </div>
            <div className="leaf-set">
              <div className="flower-leaf leaf-left"></div>
              <div className="flower-leaf leaf-right"></div>
            </div>
          </div>

          {/* Flower 2 - Left bloom */}
          <div className="flower flower-left">
            <div className="flower-stem"></div>
            <div className="flower-head small">
              <div className="petal petal-1"></div>
              <div className="petal petal-2"></div>
              <div className="petal petal-3"></div>
              <div className="petal petal-4"></div>
              <div className="flower-center-dot"></div>
            </div>
          </div>

          {/* Flower 3 - Right bloom */}
          <div className="flower flower-right">
            <div className="flower-stem"></div>
            <div className="flower-head small">
              <div className="petal petal-1"></div>
              <div className="petal petal-2"></div>
              <div className="petal petal-3"></div>
              <div className="petal petal-4"></div>
              <div className="flower-center-dot"></div>
            </div>
          </div>
        </div>

        {/* LAYER 4: Thought Bubbles - Ideas floating up */}
        <div className="idea-bubble bubble-1">
          <div className="bubble-glow"></div>
        </div>
        <div className="idea-bubble bubble-2">
          <div className="bubble-glow"></div>
        </div>
        <div className="idea-bubble bubble-3">
          <div className="bubble-glow"></div>
        </div>
        <div className="idea-bubble bubble-4">
          <div className="bubble-glow"></div>
        </div>
        <div className="idea-bubble bubble-5">
          <div className="bubble-glow"></div>
        </div>
        <div className="idea-bubble bubble-6">
          <div className="bubble-glow"></div>
        </div>

        {/* LAYER 5: Energy particles - Neural sparks */}
        <div className="energy-spark spark-1"></div>
        <div className="energy-spark spark-2"></div>
        <div className="energy-spark spark-3"></div>
        <div className="energy-spark spark-4"></div>
        <div className="energy-spark spark-5"></div>
        <div className="energy-spark spark-6"></div>
        <div className="energy-spark spark-7"></div>
        <div className="energy-spark spark-8"></div>

        {/* LAYER 6: Pulsing aura - Overall energy field */}
        <div className="consciousness-aura aura-1"></div>
        <div className="consciousness-aura aura-2"></div>
        <div className="consciousness-aura aura-3"></div>
      </div>

      <style>{`
        /* Task 4: CSS Custom Properties */
        .neuro-garden-illustration {
          --primary-glow: #00ff88;
          --secondary-glow: #00ccff;
          --accent-glow: #ff00ff;
          --bloom-time: 3s;
          --flow-time: 4s;
          --spark-time: 2s;
        }

        .neuro-garden-illustration {
          width: 100%;
          height: 100%;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 40px 20px;
        }

        .brain-garden-wrapper {
          position: relative;
          width: 100%;
          max-width: 450px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ========== LAYER 1: BRAIN CORE (UNIFIED & RECOGNIZABLE) ========== */
        .brain-core {
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 75%;
          max-width: 340px;
          height: 40%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Unified brain container - creates the overall brain shape */
        .brain-unified {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.15) 0%, 
            rgba(0, 204, 255, 0.12) 50%,
            rgba(255, 0, 255, 0.1) 100%);
          border-radius: 48% 48% 45% 45% / 55% 55% 42% 42%;
          border: 2.5px solid rgba(0, 255, 136, 0.3);
          box-shadow: 
            inset 0 0 40px rgba(0, 255, 136, 0.2),
            0 0 50px rgba(0, 255, 136, 0.25),
            0 15px 40px rgba(0, 0, 0, 0.4);
          animation: brainBreathing 6s ease-in-out infinite;
        }

        /* Individual hemispheres - overlap in the middle */
        .hemisphere {
          position: absolute;
          top: 0;
          width: 52%;
          height: 100%;
          border-radius: 50% 45% 45% 50% / 60% 55% 45% 60%;
          background: linear-gradient(120deg, 
            rgba(0, 255, 136, 0.08) 0%, 
            rgba(0, 204, 255, 0.05) 60%,
            transparent 100%);
          overflow: visible;
          animation: hemispherePulse 6s ease-in-out infinite;
        }

        .hemisphere-left {
          left: -2%;
          border-radius: 50% 45% 45% 50% / 60% 55% 45% 60%;
          animation-delay: 0s;
          transform-origin: right center;
        }

        .hemisphere-right {
          right: -2%;
          border-radius: 45% 50% 50% 45% / 55% 60% 60% 45%;
          animation-delay: 3s;
          transform-origin: left center;
        }

        /* Longitudinal fissure - the central dividing line */
        .brain-fissure {
          position: absolute;
          top: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 72%;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(0, 255, 136, 0.35) 15%,
            rgba(0, 255, 136, 0.5) 50%,
            rgba(0, 255, 136, 0.35) 85%,
            transparent 100%);
          box-shadow: 
            0 0 8px rgba(0, 255, 136, 0.4),
            inset 0 0 4px rgba(0, 0, 0, 0.5);
          z-index: 20;
          border-radius: 1px;
          animation: fissureGlow 4s ease-in-out infinite;
        }

        /* Cortex folds - creating brain texture (gyri) */
        .cortex-fold {
          position: absolute;
          background: linear-gradient(110deg, 
            rgba(0, 255, 136, 0.18), 
            rgba(0, 204, 255, 0.12),
            rgba(0, 255, 136, 0.18));
          border-radius: 50%;
          box-shadow: 
            inset 0 1px 2px rgba(0, 0, 0, 0.3),
            0 0 8px rgba(0, 255, 136, 0.2);
          animation: cortexPulse 5s ease-in-out infinite;
        }

        /* Left hemisphere folds */
        .fold-1 { 
          top: 15%; 
          left: 15%; 
          width: 55%; 
          height: 18%;
          transform: rotate(-12deg);
          animation-delay: 0s; 
        }
        .fold-2 { 
          top: 40%; 
          left: 10%; 
          width: 60%; 
          height: 15%;
          transform: rotate(8deg);
          animation-delay: 0.8s; 
        }
        .fold-3 { 
          bottom: 18%; 
          left: 18%; 
          width: 52%; 
          height: 16%;
          transform: rotate(-5deg);
          animation-delay: 1.6s; 
        }

        /* Right hemisphere folds */
        .fold-4 { 
          top: 15%; 
          right: 15%; 
          width: 55%; 
          height: 18%;
          transform: rotate(12deg);
          animation-delay: 0.4s; 
        }
        .fold-5 { 
          top: 40%; 
          right: 10%; 
          width: 60%; 
          height: 15%;
          transform: rotate(-8deg);
          animation-delay: 1.2s; 
        }
        .fold-6 { 
          bottom: 18%; 
          right: 18%; 
          width: 52%; 
          height: 16%;
          transform: rotate(5deg);
          animation-delay: 2s; 
        }

        /* Corpus callosum - neural bridge visible in center */
        .neural-bridge {
          position: absolute;
          top: 42%;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 22%;
          background: linear-gradient(180deg,
            rgba(0, 204, 255, 0.3),
            rgba(0, 255, 136, 0.45),
            rgba(0, 204, 255, 0.3));
          border-radius: 3px;
          box-shadow: 
            0 0 12px rgba(0, 255, 136, 0.5),
            inset 0 0 4px rgba(0, 204, 255, 0.3);
          animation: bridgePulse 3s ease-in-out infinite;
          z-index: 19;
        }

        /* ========== LAYER 2: THOUGHT STREAMS ========== */
        .thought-streams {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.9;
          z-index: 2;
        }

        .thought-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: thoughtRising 6s ease-in-out infinite;
        }

        .path-1 { animation-delay: 0s; }
        .path-2 { animation-delay: 1s; }
        .path-3 { animation-delay: 2s; }

        .synapse-web {
          stroke-dasharray: 10 5;
          animation: synapseFlow 3s linear infinite;
        }

        .web-1 { animation-delay: 0s; }
        .web-2 { animation-delay: 1.5s; }

        /* ========== LAYER 3: BLOOMING FLOWERS ========== */
        .flower-garden {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .flower {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .flower-center {
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
        }

        .flower-left {
          top: 8%;
          left: 18%;
        }

        .flower-right {
          top: 8%;
          right: 18%;
        }

        /* Flower stems */
        .flower-stem {
          width: 3px;
          height: 80px;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(0, 255, 136, 0.4) 30%,
            rgba(0, 255, 136, 0.7) 100%);
          border-radius: 2px;
          animation: stemGrow 2s ease-out forwards;
          transform-origin: bottom;
          position: relative;
          z-index: 1;
        }

        .flower-left .flower-stem,
        .flower-right .flower-stem {
          height: 60px;
        }

        /* Flower heads */
        .flower-head {
          position: relative;
          width: 60px;
          height: 60px;
          margin-top: -8px;
          z-index: 3;
          animation: flowerBloom 3s ease-out forwards;
          animation-delay: 1.5s;
          transform: scale(0);
        }

        .flower-head.small {
          width: 45px;
          height: 45px;
        }

        /* Petals - arranged in a circle */
        .petal {
          position: absolute;
          width: 24px;
          height: 32px;
          background: linear-gradient(135deg,
            rgba(0, 255, 136, 0.8),
            rgba(0, 204, 255, 0.6));
          border-radius: 50% 50% 50% 0;
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
          animation: petalDance 4s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
        }

        .flower-head.small .petal {
          width: 18px;
          height: 24px;
        }

        .petal-1 { transform: translate(-50%, -50%) rotate(0deg); animation-delay: 0s; }
        .petal-2 { transform: translate(-50%, -50%) rotate(72deg); animation-delay: 0.2s; }
        .petal-3 { transform: translate(-50%, -50%) rotate(144deg); animation-delay: 0.4s; }
        .petal-4 { transform: translate(-50%, -50%) rotate(216deg); animation-delay: 0.6s; }
        .petal-5 { transform: translate(-50%, -50%) rotate(288deg); animation-delay: 0.8s; }

        .flower-center-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle,
            rgba(255, 255, 136, 0.9),
            rgba(255, 200, 100, 0.7));
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px rgba(255, 255, 100, 0.8);
          animation: centerGlow 2s ease-in-out infinite;
          z-index: 5;
        }

        /* Flower leaves */
        .leaf-set {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 40%;
        }

        .flower-leaf {
          position: absolute;
          width: 20px;
          height: 28px;
          background: linear-gradient(120deg,
            rgba(0, 255, 136, 0.7),
            rgba(0, 204, 255, 0.5));
          border-radius: 50% 0 50% 0;
          animation: leafSway 3s ease-in-out infinite;
        }

        .leaf-left {
          left: -15px;
          transform: rotate(-30deg);
          animation-delay: 0s;
        }

        .leaf-right {
          right: -15px;
          transform: rotate(30deg) scaleX(-1);
          animation-delay: 1.5s;
        }

        /* ========== LAYER 4: THOUGHT BUBBLES ========== */
        .idea-bubble {
          position: absolute;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle,
            rgba(0, 204, 255, 0.6),
            rgba(0, 204, 255, 0.2),
            transparent);
          border-radius: 50%;
          border: 1px solid rgba(0, 204, 255, 0.4);
          animation: bubbleRise 8s ease-in-out infinite;
          opacity: 0;
        }

        .bubble-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(0, 204, 255, 0.3);
          filter: blur(4px);
          animation: glowPulse 2s ease-in-out infinite;
        }

        .bubble-1 { bottom: 20%; left: 25%; animation-delay: 0s; }
        .bubble-2 { bottom: 18%; left: 55%; animation-delay: 1.5s; }
        .bubble-3 { bottom: 22%; left: 70%; animation-delay: 3s; }
        .bubble-4 { bottom: 19%; left: 40%; animation-delay: 4.5s; }
        .bubble-5 { bottom: 21%; left: 85%; animation-delay: 6s; }
        .bubble-6 { bottom: 20%; left: 10%; animation-delay: 7.5s; }

        /* ========== LAYER 5: ENERGY SPARKS ========== */
        .energy-spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--primary-glow);
          border-radius: 50%;
          box-shadow: 0 0 12px var(--primary-glow);
          animation: sparkTwinkle 3s ease-in-out infinite;
        }

        .spark-1 { top: 40%; left: 20%; animation-delay: 0s; }
        .spark-2 { top: 35%; right: 25%; animation-delay: 0.4s; }
        .spark-3 { top: 50%; left: 15%; animation-delay: 0.8s; }
        .spark-4 { top: 45%; right: 18%; animation-delay: 1.2s; }
        .spark-5 { top: 55%; left: 30%; animation-delay: 1.6s; }
        .spark-6 { top: 52%; right: 32%; animation-delay: 2s; }
        .spark-7 { top: 60%; left: 22%; animation-delay: 2.4s; }
        .spark-8 { top: 58%; right: 20%; animation-delay: 2.8s; }

        /* ========== LAYER 6: CONSCIOUSNESS AURA ========== */
        .consciousness-aura {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          opacity: 0;
          animation: auraExpand 6s ease-out infinite;
        }

        .aura-1 {
          width: 60%;
          height: 60%;
          top: 20%;
          left: 20%;
          border-color: rgba(0, 255, 136, 0.3);
          animation-delay: 0s;
        }

        .aura-2 {
          width: 50%;
          height: 50%;
          top: 25%;
          left: 25%;
          border-color: rgba(0, 204, 255, 0.3);
          animation-delay: 2s;
        }

        .aura-3 {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
          border-color: rgba(255, 0, 255, 0.3);
          animation-delay: 4s;
        }

        /* ========== KEYFRAME ANIMATIONS ========== */
        @keyframes brainBreathing {
          0%, 100% {
            transform: scale(1);
            box-shadow: 
              inset 0 0 40px rgba(0, 255, 136, 0.2),
              0 0 50px rgba(0, 255, 136, 0.25),
              0 15px 40px rgba(0, 0, 0, 0.4);
          }
          50% {
            transform: scale(1.03);
            box-shadow: 
              inset 0 0 55px rgba(0, 255, 136, 0.3),
              0 0 70px rgba(0, 255, 136, 0.4),
              0 15px 50px rgba(0, 0, 0, 0.5);
          }
        }

        @keyframes hemispherePulse {
          0%, 100% { 
            opacity: 0.8;
          }
          50% { 
            opacity: 1;
          }
        }

        @keyframes fissureGlow {
          0%, 100% {
            opacity: 0.7;
            box-shadow: 0 0 8px rgba(0, 255, 136, 0.4);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 16px rgba(0, 255, 136, 0.7);
          }
        }

        @keyframes cortexPulse {
          0%, 100% { 
            opacity: 0.65;
            transform: scaleY(1);
          }
          50% { 
            opacity: 0.95;
            transform: scaleY(1.05);
          }
        }

        @keyframes bridgePulse {
          0%, 100% { 
            opacity: 0.8;
            box-shadow: 0 0 12px rgba(0, 255, 136, 0.5);
          }
          50% { 
            opacity: 1;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.8);
          }
        }

        @keyframes thoughtRising {
          0% {
            stroke-dashoffset: 400;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        @keyframes synapseFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 30; }
        }

        @keyframes stemGrow {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes flowerBloom {
          0% {
            transform: scale(0) rotate(-90deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes petalDance {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
        }

        @keyframes centerGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 100, 0.8);
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            box-shadow: 0 0 35px rgba(255, 255, 100, 1);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes leafSway {
          0%, 100% { transform: rotate(-30deg); }
          50% { transform: rotate(-35deg); }
        }

        .leaf-right {
          animation-name: leafSwayRight;
        }

        @keyframes leafSwayRight {
          0%, 100% { transform: rotate(30deg) scaleX(-1); }
          50% { transform: rotate(35deg) scaleX(-1); }
        }

        @keyframes bubbleRise {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translateY(-300px) scale(1.2);
          }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes sparkTwinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
            box-shadow: 0 0 12px var(--primary-glow);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
            box-shadow: 0 0 24px var(--primary-glow);
          }
        }

        @keyframes auraExpand {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .neuro-garden-illustration {
            min-height: 400px;
            padding: 20px 10px;
          }

          .brain-garden-wrapper {
            max-width: 350px;
          }

          .brain-core {
            width: 80%;
            max-width: 290px;
            height: 38%;
          }

          .brain-unified {
            border-width: 2px;
          }

          .brain-fissure {
            width: 1.5px;
          }

          .neural-bridge {
            width: 5px;
          }

          .cortex-fold {
            height: 12% !important;
          }

          .flower-head {
            width: 50px;
            height: 50px;
          }

          .flower-head.small {
            width: 35px;
            height: 35px;
          }

          .petal {
            width: 20px;
            height: 26px;
          }

          .flower-head.small .petal {
            width: 14px;
            height: 18px;
          }

          .flower-stem {
            height: 60px;
          }

          .flower-left .flower-stem,
          .flower-right .flower-stem {
            height: 45px;
          }
        }

        @media (max-width: 480px) {
          .brain-garden-wrapper {
            max-width: 280px;
          }

          .brain-core {
            width: 85%;
            max-width: 240px;
          }

          .brain-fissure {
            width: 1px;
          }

          .neural-bridge {
            width: 4px;
          }

          .flower-head {
            width: 40px;
            height: 40px;
          }

          .flower-head.small {
            width: 28px;
            height: 28px;
          }
        }

        /* Accessibility: Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .brain-unified,
          .hemisphere,
          .brain-fissure,
          .cortex-fold,
          .neural-bridge,
          .thought-path,
          .synapse-web,
          .flower-stem,
          .flower-head,
          .petal,
          .flower-center-dot,
          .flower-leaf,
          .idea-bubble,
          .bubble-glow,
          .energy-spark,
          .consciousness-aura {
            animation: none !important;
          }

          .flower-head {
            transform: scale(1);
            opacity: 1;
          }

          .flower-stem {
            transform: scaleY(1);
            opacity: 1;
          }

          .hemisphere {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
