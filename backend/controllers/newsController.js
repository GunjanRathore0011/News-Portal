exports.getNews = async (req, res) => {

    try {
        const url='https://newsapi.org/v2/everything?q=technology%20OR%20startup&language=en&sortBy=publishedAt&apiKey=58466d3569de42648edac4e6aa4da9e6';
        // const url = `https://newsapi.org/v2/top-headlines/sources?country=in&apiKey=58466d3569de42648edac4e6aa4da9e6`;

        const response = await fetch(url);
        const data = await response.json(); // parse JSON

        if (data.status === 'ok') {
            res.json(data.articles); // send articles to frontend
        } else {
            res.status(500).json({ message: 'Failed to fetch news from NewsAPI', error: data });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}