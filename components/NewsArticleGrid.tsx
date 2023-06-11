import {NewsArticle} from "@/models/NewsArticle";
import {Col, Row} from "react-bootstrap";
import NewsArticleEntry from "@/components/NewsArticleEntry";

interface NewsArticleGridProps {
    articles: NewsArticle[],
}

const NewsArticleGrid = ({articles}: NewsArticleGridProps) => {
    return (
        <>
            <Row xs={1} sm={2} xl={3} className="g-4">
                {articles.map((article, index) => (
                    <Col key={article.url}>
                        <NewsArticleEntry article={article}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default NewsArticleGrid;