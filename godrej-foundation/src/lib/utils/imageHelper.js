export const getImageUrl = (url) => {
    if (!url) return '/images/placeholder.jpg';
    
    // For demo purposes, use local images instead of the CDN URLs
    const filename = url.split('/').pop();
    return `/images/${filename}`;
};

export const handleImageError = (event) => {
    event.target.src = '/images/placeholder.jpg';
};