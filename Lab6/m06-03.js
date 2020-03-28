const sendmail=require('sendmail')({silent:true,
    smtpHost: 'localhost',});
function send(x)
{
    sendmail({
        from:"romses2015@gmail.com",
        to:"nikavi@imaild.com",
        subject:'testSendmail',
        html:x
    },function(err,reply){
        console.log(err && err.stack);
        console.dir(reply);
    });
}
module.exports = {
    send: send
  }