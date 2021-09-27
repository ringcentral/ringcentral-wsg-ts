# Deprecated

Users should use [@rc-ex/ws](https://github.com/ringcentral/ringcentral-extensible/tree/master/packages/extensions/ws) instead.


# RingCentral WSG SDK

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)


## How does it work?

This SDK is powered by [RingCentral Extensible SDK](https://github.com/ringcentral/ringcentral-extensible).
RingCentral Extensible SDK has lots of extensions which could be combined to do various things.
The following two extensions are used:

- [RingCentral SDK Extension](https://github.com/ringcentral/ringcentral-extensible/tree/master/packages/extensions/rcsdk)
- [WebSocket Extension](https://github.com/ringcentral/ringcentral-extensible/tree/master/packages/extensions/ws)

**Instead of using this SDK, it is recommended to [use RingCentral Extensible SDK directly](https://github.com/ringcentral/ringcentral-extensible/blob/master/test/multiple-extensions.spec.ts)**.


## Installation

```
yarn add ringcentral-wsg
```

Then you should be able to import the SDK like this:

```ts
import WSG from 'ringcentral-wsg';
```


## Usage

### Install RingCentral SDK v4

```
yarn add @ringcentral/sdk
```

### Initialization

```ts
import {SDK} from '@ringcentral/sdk';
import WSG from 'ringcentral-wsg';

const sdk = new SDK({server, clientId, clientSecret});
await sdk.platform().login({username, extension, password});
const wsg = new WSG(sdk, {
  restOverWebSocket: true, // optional, default value: false
  debugMode: false; // optional, default value: false
  autoRecover: true; // optional, default value: true
});
await wsg.init(); // don't forget this!
```


### Subscription

```ts
await wsg.subscribe(
  ['/restapi/v1.0/account/~/extension/~/message-store'],
  event => { console.log(event); }
);
```

For more detail, please check this [test case](./test/subscription.spec.ts).


### Rest API

This WSG SDK is powered by [RingCentral Extensible SDK](https://github.com/ringcentral/ringcentral-extensible).

You can access the extensible sdk by `wsg.rc`:

```ts
const extInfo = await wsg.rc.restapi().account().extension().get();
```

For more detail, please check this [test case](./test/rest.spec.ts).
