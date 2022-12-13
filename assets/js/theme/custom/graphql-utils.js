/**
* Remove edges, node and __typename from graphql response
*
* @param {Object} input - The graphql response
* @returns {Object} Clean graphql response
*/
const cleanGraphQLResponse = function (input) {
    if (!input) return null
    const output = {}
    const isObject = obj => {
        return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
    }

    Object.keys(input).forEach(key => {
        if (input[key] && input[key].edges) {
            output[key] = input[key].edges.map(edge =>
                cleanGraphQLResponse(edge.node)
            )
        } else if (isObject(input[key])) {
            output[key] = cleanGraphQLResponse(input[key])
        } else if (key !== '__typename') {
            output[key] = input[key]
        }
    })

    return output
}

export default function graphQLFetch(token, body = {}, cb) {
    fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(request => {
        const data = cleanGraphQLResponse(request?.data?.site);
        return cb(data);
    })
    .catch(err => {
        return cb(err);
    });
}
