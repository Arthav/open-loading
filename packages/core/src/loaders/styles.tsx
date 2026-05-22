import { useInsertionEffect, type ReactElement } from "react";

const styleAttribute = "data-open-loading-styles";

export const openLoadingCss: string = `
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
        .ol-root[data-layout="inline"] {
          flex-direction: row;
          gap: 0.55rem;
          min-block-size: 2.5rem;
          min-inline-size: 8.75rem;
          padding-inline: 0.35rem;
          white-space: nowrap;
        }

        .ol-root[data-layout="inline"] .ol-submessage {
          display: none;
        }

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

        .ol-button-glyph {
          block-size: 1.15rem;
          display: inline-grid;
          flex: 0 0 auto;
          inline-size: 1.15rem;
          place-items: center;
          position: relative;
        }

        .ol-button-ring {
          animation: ol-button-spin 0.92s linear infinite;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-block-start-color: var(--ol-accent);
          border-radius: 999px;
          inset: 0;
          position: absolute;
        }

        .ol-button-core {
          animation: ol-button-pulse 1.2s ease-in-out infinite;
          background: var(--ol-accent);
          border-radius: 999px;
          block-size: 0.32rem;
          box-shadow: 0 0 12px rgba(255, 178, 46, 0.56);
          inline-size: 0.32rem;
        }

        .ol-root[data-size="sm"] .ol-button-glyph {
          block-size: 0.95rem;
          inline-size: 0.95rem;
        }

        .ol-root[data-size="lg"] .ol-button-glyph {
          block-size: 1.35rem;
          inline-size: 1.35rem;
        }

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

        .ol-import {
          block-size: 8.4rem;
          display: inline-grid;
          inline-size: 13.6rem;
          place-items: center;
          position: relative;
        }

        .ol-import-file {
          animation: ol-import-file 2.4s ease-in-out infinite;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035)),
            rgba(13, 20, 24, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 8px;
          box-shadow: 0 1rem 2.8rem rgba(0, 0, 0, 0.26);
          display: grid;
          gap: 0.45rem;
          inline-size: 4.75rem;
          inset-block-start: 1rem;
          inset-inline-start: 1.15rem;
          padding: 1.25rem 0.65rem 0.7rem;
          position: absolute;
        }

        .ol-import-fold {
          background: linear-gradient(135deg, rgba(255, 178, 46, 0.62) 0 48%, rgba(255, 255, 255, 0.08) 49%);
          border-bottom-left-radius: 5px;
          block-size: 1rem;
          inline-size: 1rem;
          inset-block-start: 0;
          inset-inline-end: 0;
          position: absolute;
        }

        .ol-import-line {
          animation: ol-import-line 1.8s ease-in-out infinite;
          background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.22), rgba(255,255,255,0.08));
          background-size: 220% 100%;
          border-radius: 999px;
          block-size: 0.44rem;
        }

        .ol-import-line:nth-child(3) {
          animation-delay: 0.14s;
          inline-size: 78%;
        }

        .ol-import-line:nth-child(4) {
          animation-delay: 0.28s;
          inline-size: 58%;
        }

        .ol-import-rail {
          background: linear-gradient(90deg, rgba(255, 178, 46, 0.02), rgba(255, 178, 46, 0.56), rgba(255, 178, 46, 0.08));
          block-size: 1px;
          inline-size: 6.8rem;
          inset-block-start: 4.15rem;
          inset-inline-start: 5.35rem;
          position: absolute;
        }

        .ol-import-step {
          animation: ol-import-step 1.7s ease-in-out infinite;
          background:
            radial-gradient(circle at 50% 50%, #fff7d7 0 14%, var(--ol-accent) 15% 46%, rgba(255, 178, 46, 0.16) 47% 72%, transparent 74%);
          border-radius: 999px;
          block-size: 1.45rem;
          box-shadow: 0 0 20px rgba(255, 178, 46, 0.24);
          inline-size: 1.45rem;
          position: absolute;
        }

        .ol-import-step:nth-of-type(3) {
          inset-block-start: 1.35rem;
          inset-inline-end: 1.15rem;
        }

        .ol-import-step:nth-of-type(4) {
          animation-delay: 0.18s;
          inset-block-start: 3.45rem;
          inset-inline-end: 0.65rem;
        }

        .ol-import-step:nth-of-type(5) {
          animation-delay: 0.36s;
          inset-block-start: 5.55rem;
          inset-inline-end: 1.15rem;
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

        .ol-table {
          display: grid;
          gap: 0.55rem;
          inline-size: min(19rem, 76vw);
        }

        .ol-table-toolbar {
          animation: ol-sheen 1.7s ease-in-out infinite;
          background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.22), rgba(255,255,255,0.08));
          background-size: 220% 100%;
          border-radius: 6px;
          block-size: 1.35rem;
          inline-size: 72%;
        }

        .ol-table-grid {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 7px;
          display: grid;
          grid-template-columns: 1.25fr 0.85fr 0.9fr 0.7fr;
          overflow: hidden;
        }

        .ol-table-cell {
          animation: ol-table-sheen 1.8s ease-in-out infinite;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.07), rgba(255,255,255,0.18), rgba(255,255,255,0.07)),
            rgba(255, 255, 255, 0.04);
          background-size: 240% 100%;
          block-size: 1.7rem;
          border-block-start: 1px solid rgba(255, 255, 255, 0.08);
          border-inline-start: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ol-table-cell:nth-child(-n + 4) {
          background-color: rgba(255, 178, 46, 0.11);
          border-block-start: 0;
        }

        .ol-table-cell:nth-child(4n + 1) {
          border-inline-start: 0;
        }

        .ol-empty {
          block-size: 8.2rem;
          display: inline-grid;
          inline-size: 12.6rem;
          place-items: center;
          position: relative;
        }

        .ol-empty-lens {
          animation: ol-empty-scan 2.2s ease-in-out infinite;
          border: 2px solid var(--ol-accent);
          border-radius: 999px;
          block-size: 3.2rem;
          box-shadow: 0 0 24px rgba(255, 178, 46, 0.22);
          inline-size: 3.2rem;
          inset-block-start: 0.85rem;
          inset-inline-start: 1.25rem;
          position: absolute;
        }

        .ol-empty-lens::after {
          background: var(--ol-accent);
          border-radius: 999px;
          block-size: 0.34rem;
          content: "";
          inline-size: 1.45rem;
          inset-block-end: -0.48rem;
          inset-inline-end: -1rem;
          position: absolute;
          transform: rotate(42deg);
          transform-origin: left center;
        }

        .ol-empty-list {
          display: grid;
          gap: 0.55rem;
          inline-size: 7.3rem;
          inset-block-start: 1.45rem;
          inset-inline-end: 0.8rem;
          position: absolute;
        }

        .ol-empty-row {
          animation: ol-empty-row 1.8s ease-in-out infinite;
          background: linear-gradient(90deg, rgba(255,255,255,0.07), rgba(255,255,255,0.2), rgba(255,255,255,0.07));
          background-size: 220% 100%;
          border-radius: 999px;
          block-size: 0.62rem;
        }

        .ol-empty-row:nth-child(2) {
          animation-delay: 0.14s;
          inline-size: 82%;
        }

        .ol-empty-row:nth-child(3) {
          animation-delay: 0.28s;
          inline-size: 56%;
        }

        .ol-empty-dot {
          animation: ol-empty-dot 1.8s ease-in-out infinite;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          block-size: 1.7rem;
          box-shadow: inset 0 0 0 0.35rem rgba(255, 255, 255, 0.05);
          inset-block-end: 0.8rem;
          inset-inline-start: 5.35rem;
          position: absolute;
          inline-size: 1.7rem;
        }

        .ol-route {
          block-size: 8.8rem;
          display: inline-grid;
          inline-size: 13.4rem;
          place-items: center;
          position: relative;
        }

        .ol-route-shell {
          animation: ol-route-lift 2.8s ease-in-out infinite;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
            rgba(13, 20, 24, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 8px;
          box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.26);
          display: grid;
          gap: 0.45rem;
          grid-template-columns: 2.4rem 1fr 1fr;
          grid-template-rows: 1.1rem repeat(3, 1fr);
          inline-size: 11.4rem;
          overflow: hidden;
          padding: 0.65rem;
        }

        .ol-route-topbar,
        .ol-route-sidebar,
        .ol-route-block {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 5px;
        }

        .ol-route-topbar {
          background: linear-gradient(90deg, var(--ol-accent), rgba(255, 255, 255, 0.18));
          grid-column: 1 / -1;
        }

        .ol-route-sidebar {
          grid-row: 2 / -1;
        }

        .ol-route-block:nth-child(3) {
          grid-column: 2 / -1;
        }

        .ol-route-block:nth-child(4),
        .ol-route-block:nth-child(5) {
          min-block-size: 2rem;
        }

        .ol-route-sweep {
          animation: ol-route-sweep 2.2s ease-in-out infinite;
          background: linear-gradient(90deg, transparent, rgba(255, 178, 46, 0.58), transparent);
          block-size: 1px;
          box-shadow: 0 0 18px rgba(255, 178, 46, 0.52);
          inline-size: 11.8rem;
          inset-block-start: 1.2rem;
          position: absolute;
        }

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

        .ol-tool {
          block-size: 7.7rem;
          display: inline-grid;
          inline-size: 14rem;
          place-items: center;
          position: relative;
        }

        .ol-tool-node {
          animation: ol-tool-node 1.8s ease-in-out infinite;
          background:
            radial-gradient(circle, #fff7d7 0 12%, var(--ol-accent) 13% 38%, rgba(255, 178, 46, 0.18) 39% 72%, transparent 74%);
          border-radius: 999px;
          block-size: 3.6rem;
          box-shadow: 0 0 32px rgba(255, 178, 46, 0.35);
          inline-size: 3.6rem;
          inset-block-start: 1.85rem;
          inset-inline-start: 0.95rem;
          position: absolute;
        }

        .ol-tool-line {
          background: linear-gradient(90deg, rgba(255, 178, 46, 0.04), rgba(255, 178, 46, 0.5), rgba(255, 178, 46, 0.08));
          block-size: 1px;
          inline-size: 7.2rem;
          inset-block-start: 3.65rem;
          inset-inline-start: 4.05rem;
          position: absolute;
        }

        .ol-tool-step {
          animation: ol-tool-step 1.8s ease-in-out infinite;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)),
            rgba(13, 20, 24, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-left-color: rgba(255, 178, 46, 0.72);
          border-radius: 6px;
          block-size: 1.15rem;
          box-shadow: 0 0 18px rgba(0, 0, 0, 0.18);
          inline-size: 4.6rem;
          inset-inline-end: 0.8rem;
          position: absolute;
        }

        .ol-tool-step:nth-of-type(3) {
          inset-block-start: 1.35rem;
        }

        .ol-tool-step:nth-of-type(4) {
          animation-delay: 0.18s;
          inset-block-start: 3.08rem;
          inline-size: 5.05rem;
        }

        .ol-tool-step:nth-of-type(5) {
          animation-delay: 0.36s;
          inset-block-start: 4.82rem;
          inline-size: 3.9rem;
        }

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

        @keyframes ol-button-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes ol-button-pulse {
          0%, 100% { opacity: 0.48; transform: scale(0.72); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes ol-progress {
          0% { transform: translateX(-70%); }
          55% { transform: translateX(125%); }
          100% { transform: translateX(250%); }
        }

        @keyframes ol-import-file {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.32rem); }
        }

        @keyframes ol-import-line {
          from { background-position: 180% 0; }
          to { background-position: -60% 0; }
        }

        @keyframes ol-import-step {
          0%, 100% { opacity: 0.48; transform: scale(0.88); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes ol-sheen {
          from { background-position: 180% 0; }
          to { background-position: -60% 0; }
        }

        @keyframes ol-table-sheen {
          from { background-position: 180% 0; }
          to { background-position: -80% 0; }
        }

        @keyframes ol-empty-scan {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0.65rem, 0.42rem); }
        }

        @keyframes ol-empty-row {
          from { background-position: 180% 0; opacity: 0.56; }
          50% { opacity: 1; }
          to { background-position: -60% 0; opacity: 0.56; }
        }

        @keyframes ol-empty-dot {
          0%, 100% { opacity: 0.42; transform: scale(0.86); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes ol-route-lift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.35rem); }
        }

        @keyframes ol-route-sweep {
          0% { opacity: 0; transform: translateY(0); }
          18%, 72% { opacity: 1; }
          100% { opacity: 0; transform: translateY(6.4rem); }
        }

        @keyframes ol-wave {
          0%, 100% { transform: scaleY(0.42); }
          50% { transform: scaleY(1.45); }
        }

        @keyframes ol-tool-node {
          0%, 100% { transform: scale(0.94); }
          50% { transform: scale(1.04); }
        }

        @keyframes ol-tool-step {
          0%, 100% { opacity: 0.48; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(-0.32rem); }
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
      `;

function ensureOpenLoadingStyles() {
  if (typeof document === "undefined") {
    return;
  }

  if (document.querySelector(`style[${styleAttribute}]`)) {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute(styleAttribute, "");
  style.textContent = openLoadingCss;
  document.head.append(style);
}

export function OpenLoadingStyles(): ReactElement | null {
  useInsertionEffect(() => {
    ensureOpenLoadingStyles();
  }, []);

  return null;
}
