
/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) => {
    return fetch(path, options)
        .then((res) => res.json())
        .catch((err) => console.warn(`API_ERROR: ${err}`))
}
const baseURL = 'http://127.0.0.1:9000/v1'
const makeAPIRequest = (path, options) => {
    return getJSON(`${baseURL}/${path}`, options)
}

export { makeAPIRequest }
