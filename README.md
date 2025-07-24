# yandex-metrica-ab-vue

> Vue библиотека для проведения АБ-тестов varioqub (yandex metrica)

**Документация varioqub:** https://yandex.com/support/varioqub/index.html

## Установка

```bash
npm install @avto-dev/yandex-metrica-ab-vue
```

---

## API

### useExperiment

**Описание:**
Композабл для инициализации и работы с экспериментом Varioqub.

**Аргументы:**

```typescript
useExperiment(params: IUseExperimentsParams)
```

**IUseExperimentsParams:**
```typescript
interface IUseExperimentsParams {
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
   * Расширяет настройку эксперимента, а также включает возможность создания эксперимента в режиме JS визуального редактора.
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
```

**Возвращает:**
- `ymabResponse: Ref<IYmabAnswer | null>` — ответ от Varioqub (флаги, эксперименты и т.д.)
- `ymabReady: Ref<boolean>` — признак готовности данных эксперимента
- `initializeVarioqub(router: Router): Promise<void>` — функция для инициализации (регистрирует хук роутера)

---

### setupVarioqubAbTests

**Описание:**
Функция для provide/inject — удобный способ шарить данные эксперимента через Vue приложение.

**Аргументы:**

```typescript
setupVarioqubAbTests(app: App, data: { ymabResponse: Ref<IYmabAnswer | null>, ymabReady: Ref<boolean> })
```
- `app: App` — экземпляр приложения Vue
- `data: { ymabResponse, ymabReady }` — реактивные данные эксперимента

---

### useVarioqubAbTests

**Описание:**
inject-хук для получения данных эксперимента в любом компоненте.

**Возвращает:**
Объект `{ ymabResponse, ymabReady }`

---

**Пример использования:**
```typescript
// main.ts
const ymClientId = 12345; // id счетчика yandex metrica

function initYourApp() {
  const app = createApp();
  const router = createRouter();

  const clientId = `metrika.${ymClientId}`;
  const { initializeVarioqub, ymabResponse, ymabReady } = useExperiment({ clientId });

  initializeVarioqub(router); // регистрирует хук для отправки ymab.init
  setupVarioqubAbTests(app, { ymabResponse, ymabReady });
}
```

### VarioqubAntiflicker

**Описание:**
Vue-компонент, который убирает мерцание до инициализации эксперимента.

**Пропсы:**
- `ready: boolean` (обязательный)
  Признак готовности эксперимента

- `timeout: number` (необязательный, по умолчанию 3000)
  Максимальное время ожидания (мс), после которого контент будет показан даже если ready=false

**Слоты:**
- `default` — основной контент, который будет скрыт до готовности

**Пример:**
```html
<VarioqubAntiflicker :ready="ymabReady">
  <App />
</VarioqubAntiflicker>
```

---

### Типы

#### IYmabAnswer

```typescript
interface IYmabAnswer {
  flags: Record<string, string[]>;
  i: string;
  experiments: string;
  testids: number[];
}
```

#### IConfig

```typescript
interface IConfig {
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
  cookieDomain?: string;
  storeReferer: boolean;
  removeAbRedirParam: boolean;
}
```
