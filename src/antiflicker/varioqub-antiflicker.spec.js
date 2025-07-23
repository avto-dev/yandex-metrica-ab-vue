import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import VarioqubAntiflicker from './varioqub-antiflicker';

describe('VarioqubAntiflicker unit test', () => {
  it('скрывает слот до ready или истечения таймаута', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VarioqubAntiflicker, {
      props: { ready: false, timeout: 1000 },
      slots: { default: '<div class="test-slot">content</div>' },
    });

    // Пока не ready и не истёк таймаут — opacity: 0
    expect(wrapper.element.style.opacity).toBe('0');

    // Проп ready становится true — слот становится видимым
    await wrapper.setProps({ ready: true });
    vi.runAllTimers();

    expect(wrapper.element.style.opacity).not.toBe('0');
    vi.useRealTimers();
  });

  it('делает слот видимым после истечения таймаута', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VarioqubAntiflicker, {
      props: { ready: false, timeout: 1000 },
      slots: { default: '<div class="test-slot">content</div>' },
    });

    // Пролистываем время до истечения таймаута
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.style.opacity).not.toBe('0');
    vi.useRealTimers();
  });
});
