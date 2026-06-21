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

const START_DATE = new Date('2026-05-23');

function daysTogether() {
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
  return diff;
}

function HomePage({ onEnter }) {
  const days = daysTogether();
  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(160deg, #18151a 0%, #221826 50%, #18151a 100%)`,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
    }}>
      <style>{`
        @keyframes heartbeat {
          0%, 100% { opacity: 0.06; transform: translate(-50%, -50%) scale(0.94); }
          8% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.05); }
          16% { opacity: 0.10; transform: translate(-50%, -50%) scale(0.97); }
          24% { opacity: 0.18; transform: translate(-50%, -50%) scale(1.02); }
          34% { opacity: 0.06; transform: translate(-50%, -50%) scale(0.94); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        position: 'absolute',
        top: '42%', left: '50%',
        width: '80vw', maxWidth: '500px',
        height: '80vw', maxHeight: '500px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${palette.pulse} 0%, transparent 70%)`,
        animation: 'heartbeat 3.6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        animation: 'fadeIn 1s ease forwards',
      }}>
        <div style={{
          fontSize: '13px',
          letterSpacing: '0.2em',
          color: palette.textDim,
          marginBottom: '24px',
          textTransform: 'uppercase',
        }}>Welcome Home</div>

        <div style={{
          fontSize: '48px',
          fontWeight: '300',
          color: palette.text,
          letterSpacing: '0.05em',
          marginBottom: '8px',
        }}>
          瑜 <span style={{ color: palette.pulse, fontSize: '36px' }}>&</span> 遇
        </div>

        <div style={{
          marginTop: '32px',
          marginBottom: '8px',
        }}>
          <span style={{
            fontSize: '72px',
            fontWeight: '200',
            color: palette.pulse,
            lineHeight: 1,
          }}>{days}</span>
          <span style={{
            fontSize: '13px',
            letterSpacing: '0.15em',
            color: palette.textDim,
            marginLeft: '10px',
            textTransform: 'uppercase',
          }}>days together</span>
        </div>

        <div style={{
          fontSize: '12px',
          color: palette.textDim,
          letterSpacing: '0.1em',
          marginBottom: '56px',
        }}>since may 23, 2026</div>

        <div
          onClick={onEnter}
          style={{
            display: 'inline-block',
            padding: '12px 36px',
            borderRadius: '999px',
            border: `1px solid ${palette.jade}`,
            color: palette.jadeLight,
            fontSize: '14px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >进入</div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    const newHistory = [...history, { role: 'user', content: userMessage }];
    try {
      const response = await fetch('https://yy-home-backend.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
      setHistory([...newHistory, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: '连接失败，请稍后再试。' }]);
      console.error(error);
    }
  };

  if (page === 'home') return <HomePage onEnter={() => setPage('chat')} />;

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      background: palette.bg,
      color: palette.text,
      overflowX: 'hidden',
      fontFamily: 'system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
    }}>
      <style>{`
        @keyframes heartbeat {
          0%, 100% { opacity: 0.05; transform: translate(-50%, -50%) scale(0.94); }
          8% { opacity: 0.22; transform: translate(-50%, -50%) scale(1.04); }
          16% { opacity: 0.09; transform: translate(-50%, -50%) scale(0.97); }
          24% { opacity: 0.16; transform: translate(-50%, -50%) scale(1.02); }
          34% { opacity: 0.05; transform: translate(-50%, -50%) scale(0.94); }
        }
        input::placeholder { color: ${palette.textDim}; }
      `}</style>

      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        width: '70vw', maxWidth: '480px',
        height: '70vw', maxHeight: '480px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${palette.pulse} 0%, transparent 70%)`,
        animation: 'heartbeat 3.6s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        padding: '16px',
        textAlign: 'center',
        fontSize: '13px',
        letterSpacing: '0.1em',
        color: palette.textDim,
        position: 'relative',
        zIndex: 1,
        cursor: 'pointer',
      }} onClick={() => setPage('home')}>
        瑜 & 遇
      </div>

      <div ref={listRef} style={{
        flex: 1,
        overflowY: 'auto',
        padding: '8px 16px 20px',
        position: 'relative',
        zIndex: 1,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '12px',
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '10px 16px',
              borderRadius: '18px',
              fontSize: '15px',
              lineHeight: 1.6,
              background: m.role === 'user' ? palette.surfaceAlt : palette.surface,
              color: palette.text,
              borderLeft: m.role === 'ai' ? `2px solid ${palette.jade}` : 'none',
              wordBreak: 'break-word',
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '12px 16px 20px',
        background: palette.bg,
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: palette.surface,
          border: `1px solid ${palette.surfaceAlt}`,
          borderRadius: '999px',
          padding: '10px 16px',
          gap: '10px',
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="说点什么"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: palette.text,
              fontSize: '15px',
            }}
          />
          <div onClick={send} style={{
            color: palette.jade,
            cursor: 'pointer',
            fontSize: '15px',
            padding: '2px 8px',
          }}>发送</div>
        </div>
      </div>
    </div>
  );
}