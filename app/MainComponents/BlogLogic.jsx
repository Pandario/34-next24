'use client'

import React, { useEffect, useReducer, useMemo, useState } from "react";
import axios from "axios";
import Articles from "./Articles";
import SearchBar from "./SearchBar";
import { getArticlesData, setArticlesData } from "../data/data";
import { initialState, reducer } from "./Reducer";

const BlogLogic = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const apiKey = `fb03640ebf9b46e681589c904b6cba0e`;
      const url = `https://newsapi.org/v2/top-headlines?country=nl&pageSize=30&apiKey=${apiKey}`;

      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const response = await axios.get(url);
        const articles = response.data.articles.map(article => {
          const date = new Date(article.publishedAt);
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
          return {
            date: `${formattedDate} ${formattedTime}`,
            timeSort: date.getTime(),
            title: article.title,
            url: article.url,
            urlToImage: article.urlToImage,
          };
        });

        dispatch({ type: 'SET_ARTICLES', payload: articles });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    };

    if (getArticlesData().length === 0) {
      getArticles();
    } else {
      dispatch({ type: 'SET_ARTICLES', payload: getArticlesData() });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !state.isLoading) {
        dispatch({ type: 'LOAD_MORE_ARTICLES' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state.isLoading]);

  const memoizedArticles = useMemo(() => {
    setArticlesData(state.displayedArticles);
    return state.displayedArticles;
  }, [state.displayedArticles]);

  return (
    <div>
      <SearchBar setSearchResults={setSearchResults} />
      <Articles articles={searchResults.length > 0 ? searchResults : memoizedArticles} isLoading={state.isLoading} errors={state.errors} />
    </div>
  );
};

export default BlogLogic;