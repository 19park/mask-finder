const OPEN_API_URL = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1";

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {createProxyMiddleware} = require("http-proxy-middleware");

const indexRouter = require('./routes/index');
const areaRouter = require('./routes/area');

const app = express();
const history = require('connect-history-api-fallback');

// CORS 설정
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(
    createProxyMiddleware("/openapi", {
      target: OPEN_API_URL,
      secure: false,
      changeOrigin: true,
      cookiePathRewrite: "/",
      cookieDomainRewrite: "",
      logLevel: "debug",
      pathRewrite: {
        '^/openapi':''
      },
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      }
    })
);
app.use(history());
app.use('/', indexRouter);
app.use('/api', areaRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
