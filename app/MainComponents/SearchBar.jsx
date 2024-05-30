import React, { useState, useEffect } from "react";
import { getArticlesData } from "../data/data";

const SearchBar = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearch = () => {
    const articles = getArticlesData();
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.date.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (searchQuery === '') {
      setFocused(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    }else{
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`sticky top-0 w-full py-2 z-50 ${isScrolled ? 'opacity-75' : ''}`}>
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={focused ? '' : 'Search articles...'}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="border rounded p-2 w-64"
          />
          <button 
          onClick={handleSearch} className="p-2 bg-slate-500 hover:bg-slate-600 text-white rounded"
          >Search</button>
          
        </div>
      </div>
    </div>
  );
};

export default SearchBar;