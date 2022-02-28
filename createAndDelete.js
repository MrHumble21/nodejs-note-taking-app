let fs = require('fs')


module.exports.getBooks = function (dbUrl) {
    return JSON.parse(fs.readFileSync(dbUrl))
}

module.exports.setBooks = function (dbUrl, updatedBookList) {
    fs.writeFileSync(dbUrl,JSON.stringify(updatedBookList))
}