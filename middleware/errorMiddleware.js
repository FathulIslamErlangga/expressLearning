export const notFound = (req, res, next) => {
    const error = new Error(`path not found ${req.originalUrl}`)
    res.status(400)
    next(error)
}

export const hendlerError = (err, req, res, next) => {
    let resStatusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;
    if(err.name === "ValidationError"){
        message = Object.values(err.errors)
        .map((item) => item.message)
        .join(',')
        resStatusCode = 400
    }
    res.status(resStatusCode).json({
        message,
        stack: err.stack
    })
}