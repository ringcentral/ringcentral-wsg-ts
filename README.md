# RingCentral WSG SDK

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-wsg-ts.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-wsg-ts)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)


## Installation

```
yarn add ringcentral-wsg
```

or

```
npm install ringcentral-wsg --save
```

Then you should be able to import the SDK like this:

```ts
import WSG from 'ringcentral-wsg';
```

or

```js
const WSG = require('ringcentral-wsg').default;
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
const wsg = new WSG({server});
await wsg.initWithSDK(sdk);
```

For WSG server, there are two static constants:

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

This WSG SDK is powered by [RingCentral Unified SDK](https://github.com/ringcentral/ringcentral-unified-ts).

You can access the unified sdk by `wsg.unified`:

```ts
const rc = wsg.unified!;
const extInfo = await rc.restapi().account().extension().get();
```

For more detail, please check this [test case](./test/rest.spec.ts).


## RingCentral Unified SDK

[RingCentral Unified SDK](https://github.com/ringcentral/ringcentral-unified-ts) supports both WSG and HTTP Rest.
You can use it instead of this SDK if there are no historical reasons.
