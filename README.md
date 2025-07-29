[Русский](#yandex-metrica-ab-vue-ru) | [English](#yandex-metrica-ab-vue-en)

<a name="ru"></a>

# yandex-metrica-ab-vue ru

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

<a name="en"></a>

# yandex-metrica-ab-vue en

> Vue library for running A/B tests with varioqub (yandex metrica)

**Varioqub documentation:** https://yandex.com/support/varioqub/index.html

## Installation

```bash
npm install @avto-dev/yandex-metrica-ab-vue
```

---

## API

### useExperiment

**Description:**
Composable for initializing and working with a Varioqub experiment.

**Arguments:**

```typescript
useExperiment(params: IUseExperimentsParams)
```

**IUseExperimentsParams:**
```typescript
interface IUseExperimentsParams {
  /**
   * Varioqub client identifier (metrika.XXXX)
   * More details in the documentation (https://yandex.com/support/varioqub/en/objects/ymab)
   */
  clientId: string;
  /**
   * Website user identifier.
   * "icookie" in the documentation (https://yandex.com/support/varioqub/en/objects/ymab)
   * Will be set and read by the experiment code if not specified
   */
  param?: string;
  /**
   * Extends the experiment configuration and enables the ability to create an experiment in JS visual editor mode.
   * https://yandex.com/support/varioqub/en/objects/set-config
   */
  config?: Partial<IConfig>;
  /**
   * User parameters*.
   * You can pass your website user's properties in the parameters. For example, the sign of user authorization on the site.
   * https://yandex.ru/support/varioqub/ru/objects/init
   */
  clientFeatures?: Record<string, string>;
}
```

**Returns:**
- `ymabResponse: Ref<IYmabAnswer | null>` — response from Varioqub (flags, experiments, etc.)
- `ymabReady: Ref<boolean>` — experiment data readiness flag
- `initializeVarioqub(router: Router): Promise<void>` — initialization function (registers router hook)

---

### setupVarioqubAbTests

**Description:**
Function for provide/inject — a convenient way to share experiment data through the Vue application.

**Arguments:**

```typescript
setupVarioqubAbTests(app: App, data: { ymabResponse: Ref<IYmabAnswer | null>, ymabReady: Ref<boolean> })
```
- `app: App` — Vue application instance
- `data: { ymabResponse, ymabReady }` — reactive experiment data

---

### useVarioqubAbTests

**Description:**
Inject hook to get experiment data in any component.

**Returns:**
Object `{ ymabResponse, ymabReady }`

---

**Usage example:**
```typescript
// main.ts
const ymClientId = 12345; // yandex metrica counter id

function initYourApp() {
  const app = createApp();
  const router = createRouter();

  const clientId = `metrika.${ymClientId}`;
  const { initializeVarioqub, ymabResponse, ymabReady } = useExperiment({ clientId });

  initializeVarioqub(router); // registers hook for sending ymab.init
  setupVarioqubAbTests(app, { ymabResponse, ymabReady });
}
```

### VarioqubAntiflicker

**Description:**
Vue component that removes flicker before the experiment is initialized.

**Props:**
- `ready: boolean` (required)
  Experiment readiness flag

- `timeout: number` (optional, default 3000)
  Maximum waiting time (ms) after which the content will be shown even if ready=false

**Slots:**
- `default` — main content that will be hidden until ready

**Example:**
```html
<VarioqubAntiflicker :ready="ymabReady">
  <App />
</VarioqubAntiflicker>
```

---

### Types

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
