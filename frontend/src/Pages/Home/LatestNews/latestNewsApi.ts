export interface NewsItem {
    id: number;
    title: string;
    tag: string;
    date_text: string;
    image: string;
}

export interface NewsResponse {
    items: NewsItem[];
    total: number;
}

export async function getLatestNews(limit: number, offset: number): Promise<NewsResponse> {
    // Обращаемся к нашей новой таблице latest_news (роут, который мы добавили на бэкенде)
    const res = await fetch(`http://localhost:5000/latest-news?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('Failed to load latest news');
    return res.json();
}