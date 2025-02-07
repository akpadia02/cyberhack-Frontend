import { useEffect, useState } from "react";

const ScamNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_KEY = "70bac416f79942228fe6e70784a86c20";  // Replace with your actual NewsAPI key
    const API_URL = `https://newsapi.org/v2/everything?q=instagram%20scam&sortBy=publishedAt&apiKey=${API_KEY}`;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                if (data.articles) {
                    setNews(data.articles.slice(0, 10)); // Get only the latest 10 articles
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">📰 Latest Scam News</h2>
            {loading ? <p>Loading...</p> : (
                <ul className="space-y-4">
                    {news.map((article, index) => (
                        <li key={index} className="p-4 border rounded-lg shadow">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
                                {article.title}
                            </a>
                            <p className="text-gray-600">{article.description}</p>
                            <p className="text-sm text-gray-500">🗞 {article.source.name} | 📅 {new Date(article.publishedAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ScamNews;
