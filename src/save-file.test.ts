import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import saveFile from './save-file';

describe('saveFile', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('downloads a Blob via a generated object URL', async () => {
    vi.useRealTimers();

    const a = document.createElement('a');
    const dispatchEventSpy = vi.spyOn(a, 'dispatchEvent');
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(a);

    const objectUrl = 'test';
    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue(objectUrl);

    const data = new Blob(['{}'], {type: 'application/json'});
    saveFile(data, 'test.json');

    expect(createObjectURLSpy).toHaveBeenCalledWith(data);
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(a.href).toEqual(`${location.href}${objectUrl}`);
    expect(a.download).toEqual('test.json');

    // The click is dispatched on the next animation frame.
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it('revokes the created object URL after the default timeout', () => {
    const a = document.createElement('a');
    vi.spyOn(a, 'dispatchEvent');
    vi.spyOn(document, 'createElement').mockReturnValue(a);

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('test');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');

    const data = new Blob(['{}'], {type: 'application/json'});
    saveFile(data, 'test.json');

    vi.advanceTimersByTime(10 * 1000);
    expect(revokeObjectURLSpy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(61 * 1000);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('test');
  });

  it('revokes the created object URL after a user-supplied timeout', () => {
    const a = document.createElement('a');
    vi.spyOn(a, 'dispatchEvent');
    vi.spyOn(document, 'createElement').mockReturnValue(a);

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('test');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');

    const data = new Blob(['{}'], {type: 'application/json'});
    saveFile(data, 'test.json', 10);

    vi.advanceTimersByTime(10);
    expect(revokeObjectURLSpy).toHaveBeenCalled();
  });

  it('works with an existing object URL and does not create a new one', () => {
    const a = document.createElement('a');
    vi.spyOn(a, 'dispatchEvent');
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(a);

    const data = 'test';
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

    saveFile(data, 'test.json');

    expect(createObjectURLSpy).not.toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(a.href).toEqual(`${location.href}${data}`);
    expect(a.download).toEqual('test.json');
  });
});
