const sendmail=require('sendmail')({silent:true,
    smtpHost: 'localhost',});
function send(x)
{
    sendmail({
        from:"logen9956@gmail.com",
        to:"logen4@yandex.ru",
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