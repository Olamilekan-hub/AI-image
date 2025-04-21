import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { IoRefresh } from "react-icons/io5";

const ConversationHistory = ({ history, onRestart, promptCount }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-lg shadow-xl transition-all duration-300 overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 border-b border-purple-500/20 cursor-pointer bg-purple-900/20"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-white font-medium text-lg flex items-center">
          <span className="mr-2">Conversation History</span>
          <span className="text-xs bg-purple-500/30 px-2 py-1 rounded-full">
            {promptCount}/10 questions
          </span>
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-3 py-1 rounded-lg flex items-center transition-colors duration-300"
          >
            <IoRefresh className="mr-1" />
            Restart
          </button>
          <button
            className="text-white bg-white/10 hover:bg-white/20 rounded-lg h-6 w-6 flex items-center justify-center"
          >
            {expanded ? "−" : "+"}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-3 max-h-[50vh] overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                item.role === "user"
                  ? "bg-indigo-900/20 border border-indigo-500/20"
                  : "bg-purple-900/20 border border-purple-500/20"
              }`}
            >
              <div className="flex items-center mb-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                    item.role === "user"
                      ? "bg-indigo-500"
                      : "bg-purple-500"
                  }`}
                >
                  {item.role === "user" ? "U" : "AI"}
                </div>
                <span className="text-white/80 text-sm">
                  {item.role === "user" ? "You" : "SpectraAI"}
                </span>
              </div>
              
              <div className="text-white prose prose-invert max-w-none">
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;