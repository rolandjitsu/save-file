const GC_TIMEOUT = 1000 * 60; // 1 min

/**
 * Save a file to disk from a Blob or an existing object URL, driving the HTML5
 * `download` attribute of an `<a>` element. See
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#browser_compatibility
 * for browser compatibility.
 *
 * @param data - A File/Blob to download, or an existing object URL string.
 * @param filename - The name to save the file as. Optional when `data` is a
 *   File; defaults to the File's own `name`.
 * @param gcTimeout - How long to wait, in ms, before revoking a created object
 *   URL. Only used when `data` is a Blob. Bump it for large downloads that may
 *   outlast the default.
 */
export default function saveFile(
  data: File | Blob | string,
  filename?: string,
  gcTimeout: number = GC_TIMEOUT
): void {
  const isBlob = data instanceof Blob;
  const url = isBlob ? URL.createObjectURL(data) : (data as string);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename ?? (data instanceof File ? data.name : '');
  const click = new MouseEvent('click');

  // Defer the click to the next frame so the download fires after the current
  // call stack unwinds, not synchronously during setup.
  requestAnimationFrame(() => {
    a.dispatchEvent(click);
  });

  // Revoke the object URL once the download has (we assume) finished.
  if (isBlob) {
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, gcTimeout);
  }
}
