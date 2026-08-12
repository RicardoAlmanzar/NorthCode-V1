import { useState, useEffect, useRef } from "react";

function parseBold(text) {
  if (!text.includes("**")) return text;
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-white/90 font-bold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function CmdText({ text }) {
  if (!text) return null;
  if (text.startsWith("./")) {
    return <span className="text-[#28c840] font-bold">{text}</span>;
  }
  if (/^(npm|npx|node)\b/.test(text)) {
    return <span className="text-[#5bc8f5] font-bold">{text}</span>;
  }
  return <span className="text-white">{text}</span>;
}

function OutputLine({ text }) {
  if (text === "") return <div className="h-[6px]" />;

  if (text.trimStart().startsWith("#")) {
    return <p className="text-white/30 ml-5">{text}</p>;
  }

  if (text.startsWith("✓") || text.startsWith("✔")) {
    return <p className="text-[#28c840] ml-5">{text}</p>;
  }

  const memberMatch = text.match(/^(.+?)\s{2,}→\s{2,}(.+)$/);
  if (memberMatch) {
    return (
      <p className="ml-5">
        <span className="text-white font-bold">{memberMatch[1].trim()}</span>
        <span className="text-white/25 mx-2">→</span>
        <span className="text-white/65 font-bold">{memberMatch[2].trim()}</span>
      </p>
    );
  }

  return <p className="text-white/50 ml-5">{parseBold(text)}</p>;
}

export function Terminal({
  commands = [],
  outputs = {},
  typingSpeed = 80,
  delayBetweenCommands = 1000,
  title = "terminal",
}) {
  const containerRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentTyped, setCurrentTyped] = useState("");
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentOutputTyped, setCurrentOutputTyped] = useState("");
  const [outputLineIdx, setOutputLineIdx] = useState(0);
  const [cmdIdx, setCmdIdx] = useState(0);
  const [phase, setPhase] = useState("typing-cmd");

  const CORAL = "var(--color-coral, #ff6b4a)";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || phase === "done") return;

    if (cmdIdx >= commands.length) {
      setPhase("done");
      return;
    }

    const cmd = commands[cmdIdx];
    const cmdOutputs = outputs[cmdIdx] ?? [];
    let timeout;

    if (phase === "typing-cmd") {
      if (currentTyped.length < cmd.length) {
        timeout = setTimeout(() => {
          setCurrentTyped(cmd.slice(0, currentTyped.length + 1));
        }, typingSpeed + (Math.random() * 20 - 10)); // Slight randomness for realism
      } else {
        if (cmdOutputs.length > 0) {
          timeout = setTimeout(() => {
            setPhase("typing-output");
            setVisibleLines([]);
            setOutputLineIdx(0);
            setCurrentOutputTyped("");
          }, 300);
        } else {
          setPhase("waiting");
        }
      }
    }

    if (phase === "typing-output") {
      if (outputLineIdx < cmdOutputs.length) {
        const currentLineStr = cmdOutputs[outputLineIdx];
        if (currentOutputTyped.length < currentLineStr.length) {
          timeout = setTimeout(() => {
            setCurrentOutputTyped(currentLineStr.slice(0, currentOutputTyped.length + 1));
          }, typingSpeed / 1.5); // Ligeramente más rápido que los comandos pero no tan rápido como antes
        } else {
          setVisibleLines((prev) => [...prev, currentLineStr]);
          setCurrentOutputTyped("");
          setOutputLineIdx((i) => i + 1);
        }
      } else {
        setPhase("waiting");
      }
    }

    if (phase === "waiting") {
      timeout = setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { cmd: commands[cmdIdx], lines: cmdOutputs },
        ]);
        setCurrentTyped("");
        setVisibleLines([]);
        setCurrentOutputTyped("");
        setOutputLineIdx(0);
        setCmdIdx((i) => i + 1);
        setPhase("typing-cmd");
      }, delayBetweenCommands);
    }

    return () => clearTimeout(timeout);
  }, [
    hasStarted,
    phase,
    currentTyped,
    currentOutputTyped,
    visibleLines,
    outputLineIdx,
    cmdIdx,
    commands,
    outputs,
    typingSpeed,
    delayBetweenCommands,
  ]);

  return (
    <div
      ref={containerRef}
      className="rounded-xl overflow-hidden border border-[var(--color-border,rgba(255,255,255,0.07))] dark:border-white/[.07] shadow-[0_24px_64px_rgba(0,0,0,.15)] dark:shadow-[0_24px_64px_rgba(0,0,0,.4)]"
      style={{ background: "#0b1622" }}
    >
      <div
        className="flex items-center gap-3 px-5 py-3 border-b border-white/[.05]"
        style={{ background: "rgba(255,255,255,.025)" }}
      >
        <div className="flex gap-[6px]">
          <span className="w-[13px] h-[13px] rounded-full bg-[#ff5f57]" />
          <span className="w-[13px] h-[13px] rounded-full bg-[#febc2e]" />
          <span className="w-[13px] h-[13px] rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-[.72rem] text-white/30 font-mono tracking-wide">
          {title}
        </span>
      </div>

      <div className="p-7 max-md:p-5 font-mono text-[.84rem] max-md:text-[.78rem] leading-[1.85] space-y-7 h-[470px] max-md:h-[500px] overflow-y-auto overflow-x-hidden">
        {history.map((entry, i) => (
          <div key={i}>
            <p>
              <span style={{ color: CORAL }}>→</span>{" "}
              <CmdText text={entry.cmd} />
            </p>
            {entry.lines.length > 0 && (
              <div className="mt-0.5 space-y-1.5">
                {entry.lines.map((line, j) => (
                  <OutputLine key={j} text={line} />
                ))}
              </div>
            )}
          </div>
        ))}

        {phase !== "done" && commands[cmdIdx] && (
          <div>
            <p>
              <span style={{ color: CORAL }}>→</span>{" "}
              <CmdText text={currentTyped} />
              {phase === "typing-cmd" && (
                <span
                  className="inline-block w-[9px] h-[15px] align-middle animate-pulse ml-0.5"
                  style={{ background: CORAL, borderRadius: "1px" }}
                />
              )}
            </p>
            {(visibleLines.length > 0 || currentOutputTyped) && (
              <div className="mt-0.5 space-y-1.5">
                {visibleLines.map((line, j) => (
                  <OutputLine key={j} text={line} />
                ))}
                {currentOutputTyped && (
                  <OutputLine text={currentOutputTyped} />
                )}
              </div>
            )}
          </div>
        )}

        {phase === "done" && (
          <p>
            <span style={{ color: CORAL }}>→</span>{" "}
            <span
              className="inline-block w-[9px] h-[17px] align-middle animate-pulse"
              style={{ background: CORAL, borderRadius: "1px" }}
            />
          </p>
        )}
      </div>
    </div>
  );
}