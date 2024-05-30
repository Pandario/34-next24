import React from "react";
import Link from "next/link";
import Image from "next/image";

const Articles = ({ articles, isLoading, errors }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {!isLoading ? (
        articles.map(article => {
          const { date, title, url, urlToImage } = article;
          
          return (
            <div 
              key={title} 
              className="m-4 p-4 w-72 border rounded shadow-md flex flex-col justify-between bg-white">
              <div className="flex-grow">
                {urlToImage && (
                  <div className="h-40 mb-1">
                    <Image src={urlToImage} alt={title} width={300} height={200} className="object-cover w-full h-full rounded-t" />
                  </div>
                )}
                <h2 className="text-xl font-semibold mt-2 mb-2">{title}</h2>
                <p className="text-sm text-gray-600">{date}</p>
              </div>
              <div className="mt-2">
                <Link href={url} target="_blank">
                  <button className="w-full p-3 bg-slate-500 hover:bg-slate-600 text-white rounded">Read more</button>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      {errors && <p>Error: {errors.message}</p>}
    </div>
  );
};

export default Articles;