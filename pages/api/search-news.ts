// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {NewsApiResponse} from "@/models/NewsArticle";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const searchQuery = req.query.q?.toString()

    if (!searchQuery) {
        res.status(400).json({error: 'Missing search query'})
        return
    }

    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`)
    const newsResponse: NewsApiResponse = await response.json()

    res.status(200).json(newsResponse.articles)
}
