const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    user: String,
    goal: String,
    started: { type: Date, default: Date.now },
    logs: [new mongoose.Schema({
        details: String,
        link: String,
        day: Number,
        when: { type: Date, default: Date.now }
    }) ],
    round: { type: Number, default: 1 },
});
GoalSchema.virtual('days').get(function() {
    return date_diff(Date.now(), this.started) + 1;
})
GoalSchema.set('toJSON', {
   virtuals: true
});
GoalSchema.set('toObject', {
   virtuals: true
});

function date_diff(day, start_date) {
    const dt1 = new Date(start_date)
    const dt2 = new Date(day)
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
}

module.exports = mongoose.model('Goal', GoalSchema);
