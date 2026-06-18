import { useEffect } from 'react';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} | Netsurf` : 'Netsurf';
    }, [title]);
};

export default useDocumentTitle;
