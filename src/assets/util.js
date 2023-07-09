export function loadScriptTag(id, src, integrity) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) return resolve(); // was already loaded
        var scriptTag = document.createElement("script");
        scriptTag.src = src;
        scriptTag.id = id;
        scriptTag.integrity = integrity;
        scriptTag.crossOrigin = "anonymous";
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
        scriptTag.onload = function () {
            resolve(scriptTag);
        }
        scriptTag.onerror = function () {
            reject(scriptTag);
        }
    })
}
