const Subscription = require('../models/subscription');
const Parser = require('rss-parser');
const parser = new Parser();

exports.getUserSubscriptionUrls = async (userId) => {
    try {
        const subscriptions = await Subscription.find({ user: userId }).exec();
        return subscriptions.map(subscription => subscription.url);
    } catch (error) {
        console.error("Error fetching user subscriptions:", error);
        throw error;
    }
};

exports.fetchAndParseRSS = async (url) => {
    try {
        const feed = await parser.parseURL(url);
        const articles = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            contentSnippet: item.contentSnippet,
        }));
        return articles;
    } catch (error) {
        console.error(`Failed to fetch or parse RSS feed from ${url}:`, error);
        throw error;
    }
}


exports.updateFeed = async (req, res) => {
    try {
        const userId = req.user.userId; // Assumes `req.user.id` is set by your authentication middleware

        // Fetch user subscription URLs
        const urls = await exports.getUserSubscriptionUrls(userId);
        console.log('Subscription URLs:', urls);

        // Fetch and parse articles for each URL
        let articles = [];
        for (let url of urls) {
            const feedArticles = await exports.fetchAndParseRSS(url);
            console.log(`Articles for ${url}:`, feedArticles);
            articles.push(...feedArticles); // Accumulate articles from all feeds
        }

        // Since this is for testing, you're logging the articles. Later, you might want to send them back or save them
        res.send("Feed update process complete, check server console for output.");
    } catch (error) {
        console.error(`Failed to update feed: ${error}`);
        res.status(500).json({ message: "Failed to update feed", error: error.message });
    }
};
