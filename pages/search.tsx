import {FormEvent, useState} from "react";
import {NewsArticle} from "@/models/NewsArticle";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import Head from "next/head";

const SearchNewsPage = () => {

    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null)
    const [searchResultsLoading, setSearchResultsLoading] = useState(false)
    const [searchResultsLoadingError, setSearchResultsLoadingError] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const searchQuery = form.searchQuery.value.toString().trim()

        if (searchQuery.length === 0) {
            return
        }

        setSearchResults(null)
        setSearchResultsLoading(true)
        setSearchResultsLoadingError(false)

        try {
            const response = await fetch(`/api/search-news/?q=${searchQuery}`)
            const articles: NewsArticle[] = await response.json()

            setSearchResults(articles)
        } catch (e) {
            setSearchResultsLoadingError(true)
        } finally {
            setSearchResultsLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title key="title">Search News</title>
            </Head>
            <main>
                <h1>Search News</h1>
                <Alert>
                    This site uses <strong><a href="https://newsapi.org/">News API</a></strong> to fetch news articles.
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="search-input">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control type="text" name="searchQuery" placeholder="Enter search query"/>
                    </Form.Group>
                    <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
                </Form>
                <div className="d-flex flex-column align-items-center">
                    {searchResultsLoading && <Spinner animation="border"/>}
                    {searchResultsLoadingError &&
                        <p className="text-danger">Something went wrong. Please try again...</p>}
                    {searchResults && searchResults.length === 0 && <p>No results found. Try a different query.</p>}
                    {searchResults && searchResults.length > 0 && NewsArticleGrid({articles: searchResults})}
                </div>
            </main>
        </>
    )
}

export default SearchNewsPage