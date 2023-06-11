import {Inter} from 'next/font/google'
import Head from "next/head";

const inter = Inter({subsets: ['latin']})

export default function BreakingNewsPage() {
    return (
        <>
            <Head>
                <title key="title">Breaking News - NextJS News App</title>
            </Head>
            <main>
                <h1>Hello world</h1>
            </main>
        </>
    )
}
