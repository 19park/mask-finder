module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    outputDir: '../backend/public',
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/openapi/': {
                target: "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1",
                changeOrigin: true,
                pathRewrite: {
                    '^/openapi': ''
                }
            },
            '/api/': {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    //'^/api': ''
                }
            }
        }
    }
};
