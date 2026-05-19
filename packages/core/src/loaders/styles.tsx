import type { ReactElement } from "react";

export function OpenLoadingStyles(): ReactElement {
  return (
    <style>
      {`
        .ol-root {
          --ol-accent: #ffb22e;
          --ol-accent-2: #64e083;
          --ol-danger: #ff5c5c;
          --ol-text: #f7f3e8;
          --ol-muted: #aeb6bd;
          --ol-panel: rgba(13, 20, 24, 0.82);
          --ol-line: rgba(255, 255, 255, 0.16);
          align-items: center;
          color: var(--ol-text);
          display: inline-flex;
          flex-direction: column;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          gap: 0.75rem;
          justify-content: center;
          min-inline-size: 7rem;
          position: relative;
        }

        .ol-root[data-size="sm"] { font-size: 0.8125rem; }
        .ol-root[data-size="md"] { font-size: 0.9375rem; }
        .ol-root[data-size="lg"] { font-size: 1.0625rem; }
        .ol-root[data-tone="success"] { --ol-accent: #64e083; }
        .ol-root[data-tone="warning"] { --ol-accent: #ffb22e; }
        .ol-root[data-tone="danger"] { --ol-accent: #ff5c5c; }
        .ol-root[data-tone="neutral"] { --ol-accent: #d8dee6; }

        .ol-message {
          color: var(--ol-text);
          font-weight: 650;
          letter-spacing: 0;
          line-height: 1.35;
          margin: 0;
          text-align: center;
        }

        .ol-submessage {
          color: var(--ol-muted);
          font-size: 0.82em;
          line-height: 1.35;
          margin: -0.35rem 0 0;
          text-align: center;
        }

        .ol-error-text { color: #ffd5d5; }

        .ol-spinner {
          animation: ol-spin 0.9s linear infinite;
          border: 3px solid rgba(255, 255, 255, 0.22);
          border-block-start-color: var(--ol-accent);
          border-radius: 999px;
          block-size: 3rem;
          inline-size: 3rem;
        }

        .ol-root[data-size="sm"] .ol-spinner { block-size: 1.85rem; inline-size: 1.85rem; }
        .ol-root[data-size="lg"] .ol-spinner { block-size: 4rem; inline-size: 4rem; }

        .ol-dots {
          display: inline-flex;
          gap: 0.55rem;
        }

        .ol-dot {
          animation: ol-pop 1.05s ease-in-out infinite;
          background: var(--ol-accent);
          border-radius: 999px;
          block-size: 0.55rem;
          box-shadow: 0 0 18px rgba(255, 178, 46, 0.35);
          inline-size: 0.55rem;
        }

        .ol-dot:nth-child(2) { animation-delay: 0.16s; }
        .ol-dot:nth-child(3) { animation-delay: 0.32s; }

        .ol-progress-track {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          block-size: 0.58rem;
          inline-size: 11rem;
          overflow: hidden;
        }

        .ol-progress-bar {
          animation: ol-progress 2.3s ease-in-out infinite;
          background: linear-gradient(90deg, var(--ol-accent), #ffe1a5);
          block-size: 100%;
          border-radius: inherit;
          inline-size: 38%;
        }

        .ol-skeleton {
          display: grid;
          gap: 0.55rem;
          inline-size: min(17rem, 72vw);
        }

        .ol-skeleton-row {
          animation: ol-sheen 1.6s ease-in-out infinite;
          background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.2), rgba(255,255,255,0.08));
          background-size: 220% 100%;
          border-radius: 6px;
          block-size: 0.78rem;
        }

        .ol-skeleton-row:first-child {
          block-size: 2.6rem;
          inline-size: 100%;
        }

        .ol-skeleton-row:nth-child(2) { inline-size: 86%; }
        .ol-skeleton-row:nth-child(3) { inline-size: 68%; }

        .ol-stream {
          align-items: center;
          display: inline-flex;
          gap: 0.28rem;
        }

        .ol-stream-bar {
          animation: ol-wave 1.1s ease-in-out infinite;
          background: var(--ol-accent);
          border-radius: 999px;
          block-size: 1.2rem;
          inline-size: 0.22rem;
        }

        .ol-stream-bar:nth-child(2) { animation-delay: 0.08s; }
        .ol-stream-bar:nth-child(3) { animation-delay: 0.16s; }
        .ol-stream-bar:nth-child(4) { animation-delay: 0.24s; }
        .ol-stream-bar:nth-child(5) { animation-delay: 0.32s; }
        .ol-stream-bar:nth-child(6) { animation-delay: 0.4s; }
        .ol-stream-bar:nth-child(7) { animation-delay: 0.48s; }

        .ol-error-mark {
          align-items: center;
          border: 2px solid var(--ol-danger);
          border-radius: 7px;
          color: var(--ol-danger);
          display: inline-flex;
          font-size: 1.65rem;
          font-weight: 750;
          block-size: 3.4rem;
          justify-content: center;
          inline-size: 3.4rem;
          transform: rotate(45deg);
        }

        .ol-error-mark span {
          transform: rotate(-45deg);
        }

        .ol-orbit {
          block-size: 10rem;
          inline-size: 18rem;
          overflow: hidden;
          position: relative;
        }

        .ol-orbit-core {
          background: radial-gradient(circle, #fff6cd 0 17%, #ffbd3c 18% 32%, rgba(255, 178, 46, 0.22) 33% 58%, transparent 60%);
          border-radius: 999px;
          block-size: 3.2rem;
          box-shadow: 0 0 42px rgba(255, 178, 46, 0.55);
          inline-size: 6.2rem;
          inset-block-start: 3.35rem;
          inset-inline-start: 5.9rem;
          position: absolute;
        }

        .ol-orbit-ring {
          animation: ol-orbit-tilt 5s linear infinite;
          border: 1px solid rgba(255, 178, 46, 0.34);
          border-radius: 50%;
          inset: 50% auto auto 50%;
          position: absolute;
          transform: translate(-50%, -50%) rotateX(68deg);
        }

        .ol-orbit-ring:nth-child(1) { block-size: 4.2rem; inline-size: 10rem; }
        .ol-orbit-ring:nth-child(2) { animation-duration: 7s; block-size: 6.4rem; inline-size: 14.5rem; opacity: 0.78; }
        .ol-orbit-ring:nth-child(3) { animation-duration: 9s; block-size: 8.6rem; inline-size: 18rem; opacity: 0.55; }

        .ol-orbit-particle {
          animation: ol-particle 4.8s linear infinite;
          background: var(--ol-accent);
          border-radius: 999px;
          block-size: 0.82rem;
          box-shadow: 0 0 24px rgba(255, 178, 46, 0.9);
          inline-size: 0.82rem;
          inset-block-start: 4.55rem;
          inset-inline-start: 8.6rem;
          position: absolute;
          transform-origin: 0.45rem 0.45rem;
        }

        .ol-orbit-particle:nth-of-type(5) { animation-delay: -1.6s; animation-duration: 6.3s; }
        .ol-orbit-particle:nth-of-type(6) { animation-delay: -3.1s; animation-duration: 8s; }

        .ol-galaxy {
          block-size: 8rem;
          inline-size: 12rem;
          position: relative;
        }

        .ol-galaxy::before,
        .ol-galaxy::after {
          animation: ol-spin 7s linear infinite;
          border: 1px dotted rgba(111, 145, 255, 0.55);
          border-radius: 50%;
          content: "";
          inset: 1rem 0.5rem;
          position: absolute;
          transform: rotateX(62deg);
        }

        .ol-galaxy::after {
          animation-duration: 10s;
          border-color: rgba(255, 178, 46, 0.38);
          inset: 0.2rem 0;
        }

        .ol-galaxy-core {
          background: radial-gradient(circle, #e8ecff 0 10%, #6f91ff 11% 27%, rgba(111, 145, 255, 0.2) 28% 68%, transparent 70%);
          border-radius: 999px;
          block-size: 3rem;
          box-shadow: 0 0 36px rgba(111, 145, 255, 0.6);
          inline-size: 5.4rem;
          inset-block-start: 2.48rem;
          inset-inline-start: 3.3rem;
          position: absolute;
        }

        .ol-queue {
          block-size: 7rem;
          display: inline-block;
          inline-size: 10rem;
          position: relative;
        }

        .ol-queue-ring {
          animation: ol-queue-ping 2.4s ease-out infinite;
          border: 1px solid rgba(255, 178, 46, 0.38);
          border-radius: 999px;
          inset: 1.2rem 1.8rem;
          position: absolute;
        }

        .ol-queue-ring:nth-child(2) {
          animation-delay: 0.75s;
          inset: 0.55rem 1rem;
          opacity: 0.72;
        }

        .ol-queue-core {
          background:
            radial-gradient(circle, #fff7d8 0 15%, var(--ol-accent) 16% 38%, rgba(255, 178, 46, 0.18) 39% 70%, transparent 72%);
          border-radius: 999px;
          block-size: 3.1rem;
          box-shadow: 0 0 34px rgba(255, 178, 46, 0.42);
          inline-size: 3.1rem;
          inset-block-start: 1.95rem;
          inset-inline-start: 3.45rem;
          position: absolute;
        }

        .ol-queue-pip {
          animation: ol-queue-step 1.6s ease-in-out infinite;
          background: var(--ol-accent);
          border-radius: 999px;
          block-size: 0.42rem;
          box-shadow: 0 0 16px rgba(255, 178, 46, 0.56);
          inline-size: 0.42rem;
          inset-block-end: 0.7rem;
          position: absolute;
        }

        .ol-queue-pip:nth-of-type(4) { inset-inline-start: 3.55rem; }
        .ol-queue-pip:nth-of-type(5) { animation-delay: 0.18s; inset-inline-start: 4.75rem; }
        .ol-queue-pip:nth-of-type(6) { animation-delay: 0.36s; inset-inline-start: 5.95rem; }

        .ol-root[data-reduced-motion="true"] *,
        .ol-root[data-reduced-motion="true"] *::before,
        .ol-root[data-reduced-motion="true"] *::after {
          animation: none !important;
          transition: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .ol-root *,
          .ol-root *::before,
          .ol-root *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }

        @keyframes ol-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes ol-pop {
          0%, 80%, 100% { opacity: 0.42; transform: translateY(0) scale(0.82); }
          40% { opacity: 1; transform: translateY(-0.28rem) scale(1); }
        }

        @keyframes ol-progress {
          0% { transform: translateX(-70%); }
          55% { transform: translateX(125%); }
          100% { transform: translateX(250%); }
        }

        @keyframes ol-sheen {
          from { background-position: 180% 0; }
          to { background-position: -60% 0; }
        }

        @keyframes ol-wave {
          0%, 100% { transform: scaleY(0.42); }
          50% { transform: scaleY(1.45); }
        }

        @keyframes ol-orbit-tilt {
          from { transform: translate(-50%, -50%) rotateX(68deg) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotateX(68deg) rotateZ(360deg); }
        }

        @keyframes ol-particle {
          from { transform: rotate(0deg) translateX(6.6rem) rotate(0deg); }
          to { transform: rotate(360deg) translateX(6.6rem) rotate(-360deg); }
        }

        @keyframes ol-queue-ping {
          0% { opacity: 0.95; transform: scale(0.76); }
          70%, 100% { opacity: 0; transform: scale(1.18); }
        }

        @keyframes ol-queue-step {
          0%, 100% { opacity: 0.38; transform: translateY(0); }
          45% { opacity: 1; transform: translateY(-0.42rem); }
        }
      `}
    </style>
  );
}
