import {NewsArticle} from "@/models/NewsArticle";
import {Card} from "react-bootstrap";

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
                    <Card.Img
                        variant="top"
                        src={validImage}
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