'use client'

import React from "react";

import BlogLogic from "./MainComponents/BlogLogic";

const App = () => {

  return (
    <main>
      <div className="flex justify-center">
        <BlogLogic/>
      </div>
      <div className="text-center text-gray-600 bg-slate-400 py-4">
        © <a href="https://github.com/Pandario" className="hover:text-indigo-700">Pandario</a> 2024
      </div>
    </main>
  );
};

export default App;