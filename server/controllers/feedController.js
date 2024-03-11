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
        // Include the feed title (company name)
        return {
            feedTitle: feed.title,
            articles: articles
        };
    } catch (error) {
        console.error(`Failed to fetch or parse RSS feed from ${url}:`, error);
        throw error;
    }
};


exports.updateFeed = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch user subscription URLs
        const subscriptions = await Subscription.find({ user: userId }).exec();

        // Initialize an array to hold each subscription's latest articles
        let subscriptionFeeds = [];

        for (let subscription of subscriptions) {
            const { url, title } = subscription;
            const feedData = await exports.fetchAndParseRSS(url);

            // Combine the feed title with its articles
            subscriptionFeeds.push({
                title: title || feedData.feedTitle, // Use the subscription title if available, otherwise use the feed title
                articles: feedData.articles,
            });
        }

        // Here you might want to send them back to the client instead of logging
        res.json(subscriptionFeeds);
    } catch (error) {
        console.error(`Failed to update feed: ${error}`);
        res.status(500).json({ message: "Failed to update feed", error: error.message });
    }
};
