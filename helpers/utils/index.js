const paginate = require('express-paginate');

exports.listResponse = ({list, request}) => {
    if(Array.isArray(list) && request) {
        const itemCount = list.length
        const pageCount = Math.ceil(itemCount / (request.query.limit ?? 10));
        const currentPage = request.query.page ?? 1
        const pagination = {
            itemCount,
            pageCount,
            currentPage
        }
        return {
            items: list,
            pagination
        }
    }
    else {
        return '[LIST_RESPONSE] list or pagination is not valid'
    }
}

exports.actionResponse = ({model}) => {
    if(model) {
        return model
    }
}
exports.errorResponse = ({error}) => {
    return {
        message: error.message,
        error: error.error
    }
}