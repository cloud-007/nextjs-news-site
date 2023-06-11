import Head from "next/head";
import {GetServerSideProps} from "next";
import {NewsApiResponse, NewsArticle} from "@/models/NewsArticle";

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
                <ul>
                    {newsArticles.map((article) => (
                        <li key={article.url}>
                            <a href={article.url}>{article.title}</a>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}
