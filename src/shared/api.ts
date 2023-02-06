import wretch from 'wretch'

const api = wretch('/api')
    .catcher(401, async (error/*, request*/) => {
        throw error;
        // // Renew credentials
        // const token = await wretch("/renewtoken").get().text();
        // storeToken(token);
        // // Replay the original request with new credentials
        // return request.auth(token).fetch().unauthorized((err) => {
        //     throw err;
        // }).json();
    });
// .catcher(404, err => redirect("/routes/notfound", err.message))
// .catcher(500, err => flashMessage("internal.server.error"))

export function get(url: string) {
    return api.get(url)
}

export function post(url: string, body: unknown) {
    return api.post(body, url)
}
