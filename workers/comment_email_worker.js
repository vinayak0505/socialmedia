const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailers');

queue.process('emails',function (job,done) {
    console.log('emails worker is processing a job',job.data);

    commentsMailer.newComment(hob.data);

    done();
})