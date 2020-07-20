import SDK from '@ringcentral/sdk';
import RingCentral from '@rc-ex/core';
import RcSdkExtension from '@rc-ex/rcsdk';
import WebSocketExtension from '@rc-ex/ws';
import {WebSocketOptions} from '@rc-ex/ws/lib/types';

export default class WSG extends WebSocketExtension {
  sdk: SDK;

  constructor(sdk: SDK, options?: WebSocketOptions) {
    super(options);
    this.sdk = sdk;
  }

  async init() {
    const rc = new RingCentral();
    const rcSdkExtension = new RcSdkExtension(this.sdk);
    await rc.installExtension(rcSdkExtension);
    await rc.installExtension(this);
  }
}
