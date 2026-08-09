// jsdom does not implement the object-URL methods. Stub them so the tests can
// spy on them. See https://github.com/jsdom/jsdom/issues/1721.
URL.createObjectURL ??= () => '';
URL.revokeObjectURL ??= () => {};
