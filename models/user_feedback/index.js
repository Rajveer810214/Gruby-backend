// feedback.js (Model File)
class Feedback {
    constructor(feedback, rating, userId, createdAt) {
    //   this.feedbackId = feedbackId;
      this.feedback = feedback;
      this.rating = rating;
      this.userId = userId;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = Feedback;
  