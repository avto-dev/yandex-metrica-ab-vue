import { Ref, ref } from 'vue';
import type { Router } from 'vue-router';

import { loadScript } from '../load-script/load-script';
import { IYmabAnswer } from '../varioqub-ab-tests.types';
import { IUseExperimentsParams } from './use-experiment.types';

export function useExperiment(params: IUseExperimentsParams) {
  const ymabResponse: Ref<IYmabAnswer | null> = ref(null);
  const ymabReady: Ref<boolean> = ref(false);

  const { clientId, param: i, config, clientFeatures } = params;

  loadScript();

  function initializeVarioqub(router: Router): Promise<void> {
    return new Promise((resolve) => {
      router.beforeEach((to, from, next) => {
        window.ymab({
          clientId,
          clientFeatures,
          config,
          i,
          callback: (data) => {
            ymabResponse.value = data;
            ymabReady.value = true;
            resolve();
          },
        });
        next();
      });
    });
  }

  return { ymabResponse, ymabReady, initializeVarioqub };
}
