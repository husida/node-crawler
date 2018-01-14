'use strict'

module.exports = {
    url: "mongodb://127.0.0.1:27017/crawler",
    options: {
        native_parser: true,
        poolSize: 5,
        useMongoClient: true
    }
}