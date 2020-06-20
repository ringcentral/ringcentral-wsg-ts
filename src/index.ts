import SDK from '@ringcentral/sdk';
import RingCentral from 'ringcentral-extensible';
import RingCentralExtension from 'ringcentral-extensible/build/extensions/ringCentral';
import WebSocketExtension, {
  WebSocketOptions,
} from 'ringcentral-extensible/build/extensions/webSocket';

export default class WSG extends WebSocketExtension {
  constructor(sdk: SDK, options: WebSocketOptions) {
    super(options);
    const rc = new RingCentral();
    const ringCentralExtension = new RingCentralExtension(sdk);
    rc.installExtension(ringCentralExtension);
    rc.installExtension(this);
  }
}
