const errorHandler = (err, req, res, next) => {
    // let status = err.status || 404;
    // let message = err.message || 'Somenthing went wrong'

    //add 404 page

    res.send('404')
}

module.exports = errorHandler