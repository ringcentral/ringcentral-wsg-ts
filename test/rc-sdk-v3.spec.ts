/* eslint-disable node/no-unpublished-import */
/* eslint-env jest */
import SDK from 'ringcentral';
import waitFor from 'wait-for-async';

import WSG from '../src/index';

jest.setTimeout(64000);

describe('WSG', () => {
  test('RingCentral SDK v3', async () => {
    const sdk = new SDK({
      appKey: process.env.RINGCENTRAL_CLIENT_ID,
      appSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
      server: process.env.RINGCENTRAL_SERVER_URL,
    });
    await sdk.platform().login({
      username: process.env.RINGCENTRAL_USERNAME,
      extension: process.env.RINGCENTRAL_EXTENSION,
      password: process.env.RINGCENTRAL_PASSWORD,
    });

    const wsg = new WSG({
      server: process.env.RINGCENTRAL_WSG_SERVER_URL!,
    });
    await wsg.initWithSDK(sdk);

    let eventCount = 0;
    await wsg.subscribe(
      ['/restapi/v1.0/account/~/extension/~/message-store'],
      event => {
        expect(event).toBeDefined();
        eventCount += 1;
      }
    );

    await sdk.platform().post('/account/~/extension/~/sms', {
      from: {phoneNumber: process.env.RINGCENTRAL_USERNAME},
      to: [{phoneNumber: process.env.RINGCENTRAL_RECEIVER}],
      text: 'Hello world',
    });

    const result = await waitFor(() => eventCount >= 1, 1000, 60);
    expect(result).toBeTruthy();
    await wsg.revoke();
    await sdk.platform().logout();
  });
});
