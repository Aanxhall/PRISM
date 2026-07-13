import { useEffect, useState, useRef } from "react";
import API from "../api/api";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

function AIChatbot() {
  const [reports, setReports] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to PRISM AI.\n\nAsk me about crime reports, trends, locations or recommendations.",
    },
  ]);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getReply = (question) => {
    const q = question.toLowerCase();

    if (q.includes("total")) {
      return `📄 Total reports in database: ${reports.length}`;
    }

    if (q.includes("location")) {
      const locations = {};

      reports.forEach((r) => {
        locations[r.location] =
          (locations[r.location] || 0) + 1;
      });

      const highest = Object.keys(locations).sort(
        (a, b) => locations[b] - locations[a]
      )[0];

      return `📍 Highest risk location is ${highest}.`;
    }

    if (
      q.includes("crime") ||
      q.includes("category")
    ) {
      const categories = {};

      reports.forEach((r) => {
        categories[r.category] =
          (categories[r.category] || 0) + 1;
      });

      const highest = Object.keys(categories).sort(
        (a, b) => categories[b] - categories[a]
      )[0];

      return `🚨 Most reported category is ${highest}.`;
    }

    if (
      q.includes("high") ||
      q.includes("critical")
    ) {
      const count = reports.filter(
        (r) =>
          r.priority === "High" ||
          r.priority === "Critical"
      ).length;

      return `⚠ ${count} reports require immediate attention.`;
    }

    if (q.includes("recommend")) {
      return `✅ Increase surveillance in high-risk locations, prioritize critical reports and monitor cybercrime activities continuously.`;
    }

    return `I can answer questions like:

• Total reports
• Highest risk location
• Most reported category
• High priority reports
• Recommendation`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
    };

    const botMsg = {
      sender: "bot",
      text: getReply(input),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-cyan-500 text-black shadow-2xl hover:scale-110 transition text-2xl z-50"
      >
        <FaRobot />
      </button>

      {/* Chat Window */}

      {open && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[520px] bg-[#111827] rounded-3xl shadow-2xl border border-cyan-500 flex flex-col overflow-hidden z-50">

          {/* Header */}

          <div className="bg-cyan-500 px-6 py-4 flex justify-between items-center">

            <div>

              <h2 className="text-black font-bold text-lg">
                🤖 PRISM AI
              </h2>

              <p className="text-sm text-black">
                Crime Intelligence Assistant
              </p>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-black text-xl"
            >
              <FaTimes />
            </button>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 whitespace-pre-line leading-7 ${
                    msg.sender === "user"
                      ? "bg-cyan-500 text-black"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>

          </div>

          {/* Input */}

          <div className="border-t border-slate-700 bg-[#0f172a] p-4 flex gap-3">

            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              placeholder="Ask PRISM AI..."
              className="flex-1 rounded-xl bg-slate-800 px-4 py-3 text-white outline-none border border-slate-700 focus:border-cyan-400"
            />

            <button
              onClick={sendMessage}
              className="bg-cyan-500 hover:bg-cyan-400 px-5 rounded-xl text-black"
            >
              <FaPaperPlane />
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default AIChatbot;