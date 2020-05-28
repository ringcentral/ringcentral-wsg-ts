/* eslint-disable node/no-unpublished-import */
/* eslint-env jest */
import {SDK} from '@ringcentral/sdk';
import WSG from '../src/index';
import waitFor from 'wait-for-async';

jest.setTimeout(64000);

describe('Subscription', () => {
  test('RingCentral SDK v4', async () => {
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

    await sdk.platform().post('/restapi/v1.0/account/~/extension/~/sms', {
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
