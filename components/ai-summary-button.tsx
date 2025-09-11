"use client";
import { useState } from "react";
import { Sparkles, X, Globe } from "lucide-react";

interface AISummaryButtonProps {
  content: string;
  className?: string;
}

export default function AISummaryButton({ 
  content, 
  className = "" 
}: AISummaryButtonProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const handleSummary = async (selectedLanguage?: 'english' | 'hindi') => {
    try {
      setLoading(true);
      setSummary(null);
      setShowSummary(true);

      const langToUse = selectedLanguage || language;

      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content: content,
          language: langToUse === 'hindi' ? 'hindi' : 'english'
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error('Summary generation error:', err);
      setSummary(
        language === 'hindi' 
          ? "⚠️ सारांश बनाने में त्रुटि हुई। कृपया पुनः प्रयास करें।"
          : "⚠️ Failed to generate summary. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage: 'english' | 'hindi') => {
    setLanguage(newLanguage);
    // If summary is already shown, regenerate it in the new language
    if (summary && showSummary) {
      handleSummary(newLanguage);
    }
  };

  const closeSummary = () => {
    setShowSummary(false);
    setSummary(null);
  };

  const getLanguageDisplayName = (lang: 'english' | 'hindi') => {
    return lang === "english" ? "English" : "हिंदी";
  };

  return (
    <>
      {/* AI Summary Button */}
      <button
        onClick={() => handleSummary()}
        disabled={loading}
        className={`group relative px-4 py-2 rounded-xl 
          bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 
          hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600
          text-white font-medium shadow-md hover:shadow-lg 
          transition-all duration-300 transform hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${className}`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="text-sm">
            {loading ? "Generating..." : "AI Summary"}
          </span>
        </div>
        <div className="absolute inset-0 rounded-xl 
          bg-gradient-to-r from-amber-300/40 to-yellow-300/40 
          opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </button>

      {/* AI Summary Popup */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-black/90 
            border border-amber-300/40 shadow-2xl rounded-2xl 
            max-w-2xl w-full max-h-[80vh] overflow-hidden 
            animate-in fade-in-0 zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 
              border-b border-amber-200/40 dark:border-amber-800/40 
              bg-gradient-to-r from-amber-50 to-yellow-50 
              dark:from-amber-900/20 dark:to-yellow-900/10">
              
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {language === 'hindi' ? 'AI सारांश' : 'AI Summary'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'hindi' 
                      ? 'लेख से त्वरित अंतर्दृष्टि' 
                      : 'Quick insights from the article'
                    }
                  </p>
                </div>
              </div>
              
              <button
                onClick={closeSummary}
                className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/40 
                  rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </button>
            </div>

            {/* Language Toggle */}
            <div className="p-4 border-b border-amber-200/40 dark:border-amber-800/40">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'hindi' ? 'भाषा:' : 'Language:'}
                </span>
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange("english")}
                  disabled={loading}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                    language === "english"
                      ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("hindi")}
                  disabled={loading}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                    language === "hindi"
                      ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 
                      rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 mb-4">
                      <Sparkles className="h-6 w-6 text-white animate-spin" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {language === 'hindi' 
                        ? 'AI लेख का विश्लेषण कर रहा है...' 
                        : 'AI is analyzing the article...'
                      }
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'hindi' 
                        ? 'इसमें कुछ सेकंड लग सकते हैं' 
                        : 'This may take a few seconds'
                      }
                    </p>
                  </div>
                </div>
              ) : summary ? (
                <div className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                      {summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-amber-200/40 dark:border-amber-800/40">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span>
                        {language === 'hindi' 
                          ? `AI द्वारा उत्पन्न • ${getLanguageDisplayName(language)}`
                          : `Generated by AI • ${getLanguageDisplayName(language)}`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'hindi' 
                      ? 'सारांश बनाने के लिए बटन दबाएं' 
                      : 'Click the button to generate a summary'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}