const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    dateSubscribed: { type: Date, default: Date.now }
})

SubscriptionSchema.virtual("url").get(function() {
    return `/subscription/${this._id}`;
})

module.exports = mongoose.model("Subscription", SubscriptionSchema);