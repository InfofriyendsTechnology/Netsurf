import { useParams, Link } from 'react-router-dom';
import { useGetPublicProductByIdQuery } from '../../services/publicProductApi';
import { MdArrowBack, MdPlayCircle, MdMessage } from 'react-icons/md';
import './ProductDetail.scss';

const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const ProductDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetPublicProductByIdQuery(id);

    const product = data?.data;

    if (isLoading) {
        return (
            <div className="detail-page">
                <div className="detail-skeleton">
                    <div className="skeleton-img" />
                    <div className="skeleton-info">
                        <div className="skeleton-line wide" />
                        <div className="skeleton-line medium" />
                        <div className="skeleton-line" />
                        <div className="skeleton-line" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="detail-page">
                <div className="not-found">
                    <h2>Product Not Found</h2>
                    <Link to="/catalog" className="back-link"><MdArrowBack /> Back to Catalog</Link>
                </div>
            </div>
        );
    }

    const embedUrl = getYoutubeEmbedUrl(product.youtubeUrl);

    return (
        <div className="detail-page">
            <Link to="/catalog" className="back-link">
                <MdArrowBack /> Back to Catalog
            </Link>

            <div className="detail-grid">
                <div className="detail-image">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=Netsurf'; e.target.onerror = null; }}
                    />
                </div>

                <div className="detail-info">
                    <span className="detail-category">{product.category}</span>
                    <h1 className="detail-title">{product.title}</h1>
                    <p className="detail-price">₹{product.price}</p>
                    <p className="detail-description">{product.description}</p>

                    {product.resultDescription && (
                        <div className="result-section">
                            <h3>Product Results</h3>
                            <p>{product.resultDescription}</p>
                        </div>
                    )}

                    {product.youtubeUrl && (
                        <a
                            href={product.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="youtube-btn"
                        >
                            <MdPlayCircle /> Watch Results on YouTube
                        </a>
                    )}

                    <a
                        href={`https://wa.me/918553535342?text=I am interested in ${product.title} (₹${product.price})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-btn"
                    >
                        <MdMessage /> Contact on WhatsApp
                    </a>
                </div>
            </div>

            {embedUrl && (
                <div className="video-section">
                    <h2 className="video-title">Product Results Video</h2>
                    <div className="video-container">
                        <iframe
                            src={embedUrl}
                            title={`${product.title} Results`}
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
