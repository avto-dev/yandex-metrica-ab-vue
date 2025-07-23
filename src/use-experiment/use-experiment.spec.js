import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { useExperiment } from './use-experiment';

vi.mock('@/services/varioqub-ab-tests/load-script/load-script', () => ({
  loadScript: vi.fn(),
}));

describe('useExperiment', () => {
  let router;
  let routerBeforeEachMock;
  let ymabMock;

  beforeEach(() => {
    routerBeforeEachMock = vi.fn();
    router = { beforeEach: routerBeforeEachMock };
    ymabMock = vi.fn();
    window.ymab = ymabMock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializeVarioqub: должен зарегестрировать router хук', () => {
    const params = {
      clientId: 'test-client',
      param: 'test-param',
      config: {},
      clientFeatures: {},
    };
    const { initializeVarioqub } = useExperiment(params);
    initializeVarioqub(router);
    expect(routerBeforeEachMock).toHaveBeenCalled();
  });

  it('initializeVarioqub: Проверка корректности вызова ymab', () => {
    const params = {
      clientId: 'test-client',
      param: 'test-param',
      config: {},
      clientFeatures: {},
    };
    const { initializeVarioqub, ymabResponse, ymabReady } = useExperiment(params);
    routerBeforeEachMock.mockImplementation((cb) => {
      const next = vi.fn();
      cb({}, {}, next);
      const callback = ymabMock.mock.calls[0][0].callback;
      callback({ test: 'answer' });
    });
    initializeVarioqub(router);
    expect(ymabMock).toHaveBeenCalledWith(
      expect.objectContaining({
        clientId: 'test-client',
        clientFeatures: {},
        config: {},
        i: 'test-param',
        callback: expect.any(Function),
      })
    );
    expect(ymabResponse.value).toEqual({ test: 'answer' });
    expect(ymabReady.value).toBe(true);
  });
});
