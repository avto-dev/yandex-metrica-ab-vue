// https://yandex.ru/support/varioqub/ru/objects/set-config
export interface IConfig {
  nonce?: string;
  enableVisual: boolean;
  enableHTML: boolean;
  enableJS: boolean;
  enableRedir: boolean;
  enableWatch: boolean;
  storeRedirParam: boolean | 'localstorage' | 'cookie' | 'get';
  metrikaTimeout: number;
  enableAdv: boolean;
  enableSendYmUid: boolean;
  enableSetYmUid: boolean;
  cookieDomain?: string | undefined;
  storeReferer: boolean;
  removeAbRedirParam: boolean;
}

// https://yandex.ru/support/varioqub/ru/objects/init#response-format
export interface IYmabAnswer {
  flags: Record<string, string[]>;
  i: string;
  experiments: string;
  testids: number[];
}

// https://yandex.ru/support/varioqub/ru/objects/init
interface IInitParams {
  clientId: string;
  i?: string;
  cuid?: string;
  clientFeatures?: Record<string, string>;
  config?: Partial<IConfig>;
  callback?: (data: IYmabAnswer) => void;
}

export interface IVarioqub {
  ymab: (params: IInitParams) => void;
}
