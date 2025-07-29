import { IConfig } from '../varioqub-ab-tests.types';

export interface IUseExperimentsParams {
  /**
   * Идентификатор клиента Varioqub (metrika.XXXX)
   * Подробнее в документации (https://yandex.com/support/varioqub/en/objects/ymab)
   */
  clientId: string;
  /**
   * Идентификатор пользователя сайта.
   * "icookie" в документации (https://yandex.com/support/varioqub/en/objects/ymab)
   * Будет установлен и прочитан кодом экспериментов, если не указан
   */
  param?: string;
  /**
   * асширяет настройку эксперимента, а также включает возможность создания эксперимента в режиме JS визуального редактора.
   * https://yandex.com/support/varioqub/en/objects/set-config
   */
  config?: Partial<IConfig>;
  /**
   * Параметры пользователей*.
   * В параметрах можно передавать свойства пользователей вашего сайта. Например, признак авторизации на сайте.
   * https://yandex.ru/support/varioqub/ru/objects/init
   */
  clientFeatures?: Record<string, string>;
}
