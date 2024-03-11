import React from 'react';

const Card = ({ feed }) => {
    // Use .slice(0, 10) to get only the first 10 articles
    const articlesToShow = feed.articles.slice(0, 10);

    return (
        <div className=" w-3/4 max-w-lg border mx-auto p-5 rounded-xl" style={{ fontFamily: "Times New Roman, Times, serif" }}>
            <h2 className="text-xl font-bold mb-1">{feed.title}</h2>
            <ul>
                {articlesToShow.map((article, index) => (
                    <li key={index} className="mb-2">
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                            {article.title}
                        </a>
                        <div className="text-gray-600 text-sm">{new Date(article.pubDate).toLocaleDateString()}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Card;
