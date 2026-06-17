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

  const send = async () => {
  if (!input.trim()) return;

  const userMessage = input.trim();

  setMessages((prev) => [
    ...prev,
    {
      role: 'user',
      text: userMessage,
    },
  ]);

  setInput('');

  try {
    const response = await fetch(
      'https://yy-home-backend.onrender.com/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      }
    );

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: 'ai',
        text: data.reply,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        role: 'ai',
        text: '连接失败，请稍后再试。',
      },
    ]);

    console.error(error);
  }
};

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: palette.bg,
        color: palette.text,
        overflowX: 'hidden',
        fontFamily:
          'system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
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

      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            opacity: 0.05;
            transform: translate(-50%, -50%) scale(0.94);
          }
          8% {
            opacity: 0.22;
            transform: translate(-50%, -50%) scale(1.04);
          }
          16% {
            opacity: 0.09;
            transform: translate(-50%, -50%) scale(0.97);
          }
          24% {
            opacity: 0.16;
            transform: translate(-50%, -50%) scale(1.02);
          }
          34% {
            opacity: 0.05;
            transform: translate(-50%, -50%) scale(0.94);
          }
        }

        input::placeholder {
          color: ${palette.textDim};
        }
      `}</style>

      <div
        ref={listRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent:
                m.role === 'user'
                  ? 'flex-end'
                  : 'flex-start',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '10px 16px',
                borderRadius: '18px',
                fontSize: '15px',
                lineHeight: 1.6,
                background:
                  m.role === 'user'
                    ? palette.surfaceAlt
                    : palette.surface,
                color: palette.text,
                borderLeft:
                  m.role === 'ai'
                    ? `2px solid ${palette.jade}`
                    : 'none',
                wordBreak: 'break-word',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '12px 16px 20px',
          background: palette.bg,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: palette.surface,
            border: `1px solid ${palette.surfaceAlt}`,
            borderRadius: '999px',
            padding: '10px 16px',
            gap: '10px',
          }}
        >
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

          <button
            onClick={send}
            style={{
              background: palette.jade,
              color: palette.bg,
              border: 'none',
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 600,
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
