export function getPath(url: string) {
    const arr = url.split('/')
    return arr[arr.length-1];
}