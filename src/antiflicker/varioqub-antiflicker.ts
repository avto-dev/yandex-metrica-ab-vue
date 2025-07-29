import { defineComponent, ref, watch, h, PropType } from 'vue';

const DEFAULT_ANTIFLICKER_TIMEOUT = 3000;

export default defineComponent({
  name: 'VarioqubAntiflicker',
  props: {
    ready: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    timeout: {
      type: Number as PropType<number>,
      default: DEFAULT_ANTIFLICKER_TIMEOUT,
    },
  },
  setup(props, { slots }) {
    const internalReady = ref(false);
    const thresholdTimeout = setTimeout(() => {
      internalReady.value = true;
    }, props.timeout);

    watch(
      () => props.ready,
      (newValue) => {
        if (newValue) {
          internalReady.value = newValue;
          clearTimeout(thresholdTimeout);
        }
      },
      { immediate: true }
    );

    return () =>
      h(
        'div',
        {
          style: !internalReady.value ? { opacity: 0 } : {},
        },
        slots.default ? slots.default() : []
      );
  },
});
