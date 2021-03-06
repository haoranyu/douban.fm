var consoler = require('consoler'),
    optimist = require('optimist'),
    prompt = require('prompt'),
    argv = optimist.argv,
    Fm = require('./fm');

exports = module.exports = function() {
    var home = argv.h ? argv.h : null;
    var argument = argv._,
        fm = new Fm(home);

    var promptSchema = {
      properties: {
        email: {
          //via: https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
          pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: '电子邮箱格式有错误',
          required: true
        },
        password: {
          hidden: true,
          required: true
        }
      }
    };

    var ready = function() {
        consoler.loading('正在加载...');
    };
    if (!argv.m) {
      return fm.init(ready);
    } else {

      prompt.start();

      prompt.get(promptSchema, function (err, result) {
        fm.auth({
          email: result.email,
          password: result.password
        }, function (err, configs) {
          if (err) return consoler.error(err);
          var user = configs.account;
          consoler.success('欢迎你，' + user.user_name + '。您的豆瓣账户已经成功修改为：' + user.email);
          fm.init(ready);
        });
      });
    }
};
