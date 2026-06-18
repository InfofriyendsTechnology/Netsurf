import './SkeletonLoader.scss';

// Generic shimmer base element
const Shimmer = ({ className = '', style = {} }) => (
    <div className={`shimmer-element ${className}`} style={style} />
);

// ─── STAT CARD skeleton (Dashboard) ───────────────────────────────────────────
export const StatCardSkeleton = ({ count = 4 }) => (
    <div className="skeleton-stat-grid">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="skeleton-stat-card">
                <Shimmer className="shimmer-stat-title" />
                <Shimmer className="shimmer-stat-number" />
                <Shimmer className="shimmer-stat-detail" />
            </div>
        ))}
    </div>
);

// ─── TABLE ROW skeleton (Admins, Companies, Subscriptions, Reviews, Plans, Inquiries) ─
export const TableSkeleton = ({ rows = 8, cols = 5 }) => (
    <div className="skeleton-table-container">
        <div className="skeleton-table-header">
            {Array.from({ length: cols }).map((_, i) => (
                <Shimmer key={i} className="shimmer-th" style={{ flex: i === 0 ? '0 0 36px' : 1 }} />
            ))}
        </div>
        {Array.from({ length: rows }).map((_, ri) => (
            <div key={ri} className="skeleton-table-row">
                {Array.from({ length: cols }).map((_, ci) => (
                    <div
                        key={ci}
                        className="skeleton-table-cell"
                        style={{ flex: ci === 0 ? '0 0 36px' : 1 }}
                    >
                        {ci === 1 ? (
                            <div className="shimmer-cell-double">
                                <Shimmer className="shimmer-cell-line" />
                                <Shimmer className="shimmer-cell-line-sm" />
                            </div>
                        ) : (
                            <Shimmer className="shimmer-cell-pill" />
                        )}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

// ─── ANALYTICS CARD skeleton ───────────────────────────────────────────────────
export const AnalyticsCardSkeleton = ({ count = 4 }) => (
    <div className="skeleton-analytics-grid">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="skeleton-analytics-card">
                <Shimmer className="shimmer-analytics-icon" />
                <div className="shimmer-analytics-text">
                    <Shimmer className="shimmer-analytics-label" />
                    <Shimmer className="shimmer-analytics-value" />
                </div>
            </div>
        ))}
    </div>
);

// ─── COMPANY DETAIL skeleton ──────────────────────────────────────────────────
export const DetailCardSkeleton = () => (
    <div className="skeleton-detail-card">
        <Shimmer className="shimmer-detail-title" />
        <div className="shimmer-detail-fields">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shimmer-detail-field">
                    <Shimmer className="shimmer-field-label" />
                    <Shimmer className="shimmer-field-value" />
                </div>
            ))}
        </div>
    </div>
);

// ─── PORTFOLIO GRID skeleton ──────────────────────────────────────────────────
export const GridCardSkeleton = ({ count = 6 }) => (
    <div className="skeleton-card-grid">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="skeleton-grid-card">
                <Shimmer className="shimmer-card-img" />
                <Shimmer className="shimmer-card-title" />
                <Shimmer className="shimmer-card-sub" />
            </div>
        ))}
    </div>
);

export default TableSkeleton;
