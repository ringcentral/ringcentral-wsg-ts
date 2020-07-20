/* eslint-disable node/no-unpublished-import */
/* eslint-env jest */
import {SDK} from '@ringcentral/sdk';
import WSG from '../src/index';
import waitFor from 'wait-for-async';

jest.setTimeout(64000);

describe('Subscription', () => {
  test('default', async () => {
    const sdk = new SDK({
      server: process.env.RINGCENTRAL_SERVER_URL,
      clientId: process.env.RINGCENTRAL_CLIENT_ID,
      clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
    });
    await sdk.platform().login({
      username: process.env.RINGCENTRAL_USERNAME,
      extension: process.env.RINGCENTRAL_EXTENSION,
      password: process.env.RINGCENTRAL_PASSWORD,
    });

    const wsg = new WSG(sdk);
    await wsg.init();

    let eventCount = 0;
    await wsg.subscribe(
      ['/restapi/v1.0/account/~/extension/~/message-store'],
      event => {
        expect(event).toBeDefined();
        eventCount += 1;
      }
    );

    // send a sms to trigger an event
    await wsg.rc
      .restapi()
      .account()
      .extension()
      .sms()
      .post({
        from: {phoneNumber: process.env.RINGCENTRAL_USERNAME},
        to: [{phoneNumber: process.env.RINGCENTRAL_RECEIVER}],
        text: 'Hello world',
      });

    const result = await waitFor({
      condition: () => eventCount >= 1,
      interval: 1000,
      times: 60,
    });
    expect(result).toBeTruthy();

    await wsg.revoke();
    await sdk.platform().logout();
  });
});
