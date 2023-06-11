import {NewsArticle} from "@/models/NewsArticle";
import {GetStaticPaths, GetStaticProps} from "next";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import {useRouter} from "next/router";
import Head from "next/head";
import {Alert} from "react-bootstrap";

interface CategoryNewsPageProps {
    newsArticles: NewsArticle[],
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {category: "business"}},
            {params: {category: "entertainment"}},
            {params: {category: "general"}},
            {params: {category: "health"}},
            {params: {category: "science"}},
            {params: {category: "sports"}},
            {params: {category: "technology"}},
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({params}) => {
    const category = params?.category?.toString() ?? ""
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
    const newsResponse = await response.json()
    const newsArticles: NewsArticle[] = newsResponse.articles

    return {
        props: {
            newsArticles
        },
        revalidate: 5 * 60
    }
}
const CategoryNewsPage = ({newsArticles}: CategoryNewsPageProps) => {

    const router = useRouter()
    const category = router.query.category?.toString() ?? ""
    const title = "Category: " + category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <>
            <Head>
                <title key="title">{`${title} - NextJS News APP`}</title>
            </Head>
            <main>
                <h1>{title}</h1>
                <Alert>
                    This page uses <strong>getStaticProps</strong>for very high page loading speed and
                    <strong>Incremental static regeneration</strong> to show data not older than <strong>5
                    minutes.</strong>
                </Alert>
                <NewsArticleGrid articles={newsArticles}/>
            </main>
        </>
    )
}

export default CategoryNewsPage;