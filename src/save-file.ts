const GC_TIMEOUT = 1000 * 60; // 1 min


/**
 * Save a file from Blob or object url
 * We achieve this by using the HTML5 download attr of <a>.
 * Check https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Browser_compatibility
 * for browser compatibility.
 *
 * @param data
 * @param filename
 * @param gcTimeout - When to remove the data uri
 */
export default function saveFile(data: File | Blob | string, filename: string, gcTimeout: number = GC_TIMEOUT) {
    const isBlob = data instanceof Blob;
    const url = isBlob ? URL.createObjectURL(data) : data as string;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    const click = new MouseEvent('click');

    // Push the download operation on the next tick
    requestAnimationFrame(() => {
        a.dispatchEvent(click);
    });

    // Revoke the object url later in time
    // when the download of the file is completed (or so we assume)
    if (isBlob) {
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, gcTimeout);
    }
}
