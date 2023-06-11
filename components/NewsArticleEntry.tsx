import {NewsArticle} from "@/models/NewsArticle";
import {Card} from "react-bootstrap";
import Image from "next/image";

import placeHolderImage from '@/assets/images/newspaper.jpg';
import styles from '@/styles/NewsArticleEntry.module.css';

interface NewsArticleEntryProps {
    article: NewsArticle,
}

const NewsArticleEntry = ({article: {title, description, url, urlToImage}}: NewsArticleEntryProps) => {

    const validImage = (urlToImage?.startsWith('http://')
        || urlToImage?.startsWith('https://')) ?
        urlToImage : undefined;

    return (
        <>
            <a href={url} target={"_blank"}>
                <Card className="h-100">
                    <Image
                        src={validImage || placeHolderImage}
                        width={500}
                        height={200}
                        alt="News article image"
                        className={`card-img-top ${styles.image}`}
                    />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                    </Card.Body>
                </Card>

            </a>
        </>
    )
}

export default NewsArticleEntry;