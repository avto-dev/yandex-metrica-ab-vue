import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import VarioqubAntiflicker from './varioqub-antiflicker';

describe('VarioqubAntiflicker unit test', () => {
  it('hides the slot until ready or timeout expires', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VarioqubAntiflicker, {
      props: { ready: false, timeout: 1000 },
      slots: { default: '<div class="test-slot">content</div>' },
    });

    expect(wrapper.element.style.opacity).toBe('0');

    await wrapper.setProps({ ready: true });
    vi.runAllTimers();

    expect(wrapper.element.style.opacity).not.toBe('0');
    vi.useRealTimers();
  });

  it('makes the slot visible after the timeout expires', async () => {
    vi.useFakeTimers();
    const wrapper = mount(VarioqubAntiflicker, {
      props: { ready: false, timeout: 1000 },
      slots: { default: '<div class="test-slot">content</div>' },
    });

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.element.style.opacity).not.toBe('0');
    vi.useRealTimers();
  });
});
