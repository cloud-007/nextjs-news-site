export interface NewsArticle {
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage?: string,
    publishedAt: Date,
    content: string,
}

export interface NewsApiResponse {
    articles: NewsArticle[],
}