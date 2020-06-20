# RingCentral WSG SDK

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-wsg-ts.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-wsg-ts)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)


## How does it work?

This SDK is powered by [RingCentral Extensible SDK](https://github.com/ringcentral/ringcentral-extensible).
RingCentral Extensible SDK has lots of extensions which could be combined to do various things.
The following two extensions are used:

- [RingCentral Extension](https://github.com/ringcentral/ringcentral-extensible/tree/master/src/extensions/ringCentral)
- [WebSocket Extension](https://github.com/ringcentral/ringcentral-extensible/tree/master/src/extensions/webSocket)

Instead of using this SDK, it is recommended to [use RingCentral Extensible SDK directly](https://github.com/ringcentral/ringcentral-extensible/blob/master/test/multiple_extensions.spec.ts).


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
  server: wsgServer,
  restOverWebSocket: true, // optional, default value: false
});
```

For `wsgServer`, there are two static constants:

- `WSG.sandboxServer`: `'wss://ws-api.devtest.ringcentral.com/ws'`
- `WSG.productionServer`: `'wss://ws-api.ringcentral.com/ws'`

You can also specify a different server URL if you are testing against a lab WSG environment.

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
