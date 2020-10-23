export function getLangs(){
    return fetch("/api/languages/")
    .then(res => res.json());
}