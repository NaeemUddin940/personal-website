import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, History, Package, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Custom Button Component
 */
const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center min-w-30 ${className}`}
  >
    {children}
  </button>
);

// --- Reusable SearchBox Component ---
export default function SearchBox({
  data = [],
  placeholder = "Product khujun...",
  onSearch = () => {},
  storageKey = "search_history",
  className = "",
  inputClassName = "", // New: input box override
  buttonClassName = "", // New: button override
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setHistory(savedHistory);
  }, [storageKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.category &&
            item.category.toLowerCase().includes(query.toLowerCase())),
      );
      setSuggestions(filtered);
    }
  }, [query, data]);

  const handleSearch = (searchTerm) => {
    const term = searchTerm || query;
    if (!term.trim()) return;
    const newHistory = [term, ...history.filter((h) => h !== term)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem(storageKey, JSON.stringify(newHistory));
    setQuery(term);
    setIsFocused(false);
    onSearch(term);
  };

  const clearHistory = (e) => {
    e.stopPropagation();
    setHistory([]);
    localStorage.removeItem(storageKey);
  };

  const removeHistoryItem = (item, e) => {
    e.stopPropagation();
    const updated = history.filter((h) => h !== item);
    setHistory(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleIconClick = () => {
    if (query) setQuery("");
    else handleSearch();
  };

  return (
    <div
      className={`relative flex items-center gap-3 w-full ${className}`}
      ref={containerRef}
    >
      {/* Search Input Divider */}
      <div
        className={`relative flex-1 flex items-center h-12 transition-all duration-300 bg-card border-2 rounded-full overflow-hidden ${
          isFocused ? "border-primary ring-4 ring-primary/10" : "border-border"
        } ${inputClassName}`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={placeholder}
          className="w-full h-full pl-6 pr-12 focus:outline-none bg-transparent text-foreground text-base placeholder:text-muted-foreground font-medium"
        />
        <button
          onClick={handleIconClick}
          className="absolute right-4 p-1 text-muted-foreground hover:text-primary hover:bg-accent rounded-full transition-colors"
        >
          {query ? <X size={20} /> : <Search size={20} />}
        </button>
      </div>

      <Button onClick={() => handleSearch()} className={buttonClassName}>
        Search
      </Button>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-3 bg-popover border border-border rounded-4xl shadow-2xl overflow-hidden z-50 max-h-100 overflow-y-auto"
          >
            {query.length === 0 && history.length > 0 && (
              <div className="p-4 border-b border-border">
                <div className="flex justify-between items-center mb-3 px-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <History size={12} /> Recent Searches
                  </span>
                  <button
                    onClick={clearHistory}
                    className="text-[10px] text-primary hover:underline uppercase font-bold"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 px-1">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSearch(item)}
                      className="group flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full cursor-pointer hover:bg-accent transition-all border border-transparent hover:border-border"
                    >
                      <span className="text-foreground text-xs font-medium">
                        {item}
                      </span>
                      <button
                        onClick={(e) => removeHistoryItem(item, e)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-2">
              <div className="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Package size={12} />{" "}
                {query.length > 0 ? "Suggestions" : "Trending Now"}
              </div>
              {(query.length > 0 ? suggestions : data.slice(0, 3)).map(
                (item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSearch(item.name)}
                    className="group flex items-center justify-between p-3 px-4 rounded-2xl hover:bg-accent cursor-pointer transition-all mb-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <Package size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">
                          {item.name}
                        </h4>
                        {item.category && (
                          <p className="text-[10px] text-muted-foreground">
                            {item.category}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      {item.price && (
                        <span className="font-bold text-primary text-sm">
                          {item.price}
                        </span>
                      )}
                      <ArrowRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary mt-1"
                      />
                    </div>
                  </div>
                ),
              )}
              {query.length > 0 && suggestions.length === 0 && (
                <div className="p-10 text-center">
                  <p className="text-muted-foreground italic text-sm">
                    No items match your search...
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
