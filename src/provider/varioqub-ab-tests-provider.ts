import { inject } from 'vue';
import type { App, InjectionKey, Ref } from 'vue';

import { IYmabAnswer } from '../varioqub-ab-tests.types';

const VARIOQUB_AB_TESTS_PROVIDE_KEY = Symbol('varioqub-ab-tests') as InjectionKey<IUseVarioqubAbTestsParams>;

export interface IUseVarioqubAbTestsParams {
  ymabResponse: Ref<IYmabAnswer | null>;
  ymabReady: Ref<boolean>;
}

export function setupVarioqubAbTests(app: App, data: IUseVarioqubAbTestsParams) {
  app.provide(VARIOQUB_AB_TESTS_PROVIDE_KEY, data);
}

export function useVarioqubAbTests() {
  return inject(VARIOQUB_AB_TESTS_PROVIDE_KEY) as IUseVarioqubAbTestsParams;
}
