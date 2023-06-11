import Head from "next/head";
import {GetServerSideProps} from "next";
import {NewsApiResponse, NewsArticle} from "@/models/NewsArticle";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import {Alert} from "react-bootstrap";

interface BreakingNewsPageProps {
    newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' +
        process.env.NEWS_API_KEY,
    );
    const newsResponse: NewsApiResponse = await response.json();
    return {
        props: {
            newsArticles: newsResponse.articles,
        }
    }
}
export default function BreakingNewsPage({newsArticles}: BreakingNewsPageProps) {
    return (
        <>
            <Head>
                <title key="title">Breaking News - NextJS News App</title>
            </Head>
            <main>
                <h1>Breaking News</h1>
                <Alert>
                    This page uses <strong>getServerSideProps</strong> to fetch news articles on each request.
                    This allows search engine to crawl the page and <strong>improves SEO</strong>
                </Alert>
                <NewsArticleGrid articles={newsArticles}/>
            </main>
        </>
    )
}
