import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadScript } from './load-script';

describe('loadScript unit test', () => {
  let originalYmab;
  let createElementSpy;

  beforeEach(() => {
    originalYmab = window.ymab;
    window.ymab = vi.fn();
    createElementSpy = vi.spyOn(document, 'createElement');
  });

  afterEach(() => {
    if (originalYmab !== undefined) {
      window.ymab = originalYmab;
    } else {
      delete window.ymab;
    }
    createElementSpy.mockRestore();
  });

  it('не добавляет скрипт, если ymab уже есть в window', () => {
    loadScript();
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('добавляет скрипт, если ymab отсутствует', () => {
    delete window.ymab;
    const fakeParent = document.createElement('div');
    fakeParent.insertBefore = vi.fn();
    vi.spyOn(document, 'getElementsByTagName').mockImplementation((tag) => {
      if (tag === 'script') {
        return [{ parentNode: fakeParent }];
      }
      return [];
    });
    loadScript();
    expect(createElementSpy).toHaveBeenCalledWith('script');
  });
});
