import React, { useState, useRef, useEffect } from 'react';

const palette = {
  bg: '#18151a',
  surface: '#221e26',
  surfaceAlt: '#2a2530',
  jade: '#9c8aa8',
  jadeLight: '#c9bbd3',
  pulse: '#d4a574',
  text: '#e9e4ea',
  textDim: '#a89cb0',
};

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '回来了。' },
    { role: 'user', text: '嗯，到家啦~' },
    { role: 'ai', text: '路上顺利就好，屋子先收拾，剩下的不急。' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: input.trim() }]);
    setInput('');
  };

  return (
    <div
      className="w-full h-screen flex flex-col relative"
      style={{
        background: palette.bg,
        color: palette.text,
        overflow: 'hidden',
        fontFamily:
          'system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      <div
        className="absolute"
        style={{
          top: '30%',
          left: '50%',
          width: '70vw',
          maxWidth: '480px',
          height: '70vw',
          maxHeight: '480px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${palette.pulse} 0%, transparent 70%)`,
          animation: 'heartbeat 3.6s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="relative w-full shrink-0"
        style={{ height: '1px', overflow: 'hidden', zIndex: 1 }}
      >
        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, transparent, ${palette.jadeLight}, transparent)`,
            animation: 'flow 6s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes flow {
          0% { transform: translateX(-30%); opacity: 0.25; }
          50% { transform: translateX(30%); opacity: 0.85; }
          100% { transform: translateX(-30%); opacity: 0.25; }
        }
        @keyframes heartbeat {
          0%, 100% { opacity: 0.05; transform: translate(-50%, -50%) scale(0.94); }
          8% { opacity: 0.22; transform: translate(-50%, -50%) scale(1.04); }
          16% { opacity: 0.09; transform: translate(-50%, -50%) scale(0.97); }
          24% { opacity: 0.16; transform: translate(-50%, -50%) scale(1.02); }
          34% { opacity: 0.05; transform: translate(-50%, -50%) scale(0.94); }
        }
        input::placeholder { color: ${palette.textDim}; }
      `}</style>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto space-y-3 relative"
        style={{ padding: '24px 16px', zIndex: 1 }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className="flex"
            style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <div
              className="rounded-2xl"
              style={{
                maxWidth: '75%',
                padding: '10px 16px',
                fontSize: '15px',
                lineHeight: 1.6,
                background: m.role === 'user' ? palette.surfaceAlt : palette.surface,
                color: palette.text,
                borderLeft: m.role === 'ai' ? `2px solid ${palette.jade}` : 'none',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div
        className="shrink-0 relative"
        style={{ padding: '8px 16px 20px', background: palette.bg, zIndex: 1 }}
      >
        <div
          className="flex items-center"
          style={{
            background: palette.surface,
            border: `1px solid ${palette.surfaceAlt}`,
            borderRadius: '999px',
            padding: '10px 16px',
            gap: '8px',
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="说点什么"
            className="flex-1"
            style={{
              background: 'transparent',
              outline: 'none',
              border: 'none',
              color: palette.text,
              fontSize: '15px',
            }}
          />
          <button
            onClick={send}
            style={{
              background: palette.jade,
              color: palette.bg,
              borderRadius: '999px',
              padding: '6px 16px',
              fontSize: '14px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
