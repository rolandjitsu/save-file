import saveFile from './save-file';

beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
});
afterEach(() => {
    jest.useRealTimers();
});

it('should download a file', () => {
    const a = document.createElement('a');
    const dispatchEventSpy = jest.spyOn(a, 'dispatchEvent');

    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(a);

    const objectUrl = 'test';
    const createObjectURLSpy = jest.spyOn(URL, 'createObjectURL').mockReturnValue(objectUrl);

    const data = new Blob(['{}'], {type: 'application/json'});

    saveFile(data, 'test.json');

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalled();

    expect(a.href).toEqual(`${location.href}${objectUrl}`);
    expect(a.download).toEqual('test.json');

    jest.useRealTimers();

    setTimeout(() => {
        expect(dispatchEventSpy).toHaveBeenCalled();
    }, 100);
});

it('should revoke the created object url for the Blob after some time', () => {
    const a = document.createElement('a');
    jest.spyOn(a, 'dispatchEvent');
    jest.spyOn(document, 'createElement').mockReturnValue(a);

    const objectUrl = 'test';
    jest.spyOn(URL, 'createObjectURL').mockReturnValue(objectUrl);
    const revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL');

    const data = new Blob(['{}'], {type: 'application/json'});

    saveFile(data, 'test.json');

    jest.advanceTimersByTime(10 * 1000);
    expect(revokeObjectURLSpy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(61 * 1000);
    expect(revokeObjectURLSpy).toHaveBeenCalled();
});

it('should work with object urls', () => {
    const a = document.createElement('a');
    jest.spyOn(a, 'dispatchEvent');

    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(a);

    const data = 'test';
    const createObjectURLSpy = jest.spyOn(URL, 'createObjectURL');

    saveFile(data, 'test.json');

    expect(createObjectURLSpy).not.toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalled();

    expect(a.href).toEqual(`${location.href}${data}`);
    expect(a.download).toEqual('test.json');
});
