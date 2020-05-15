/* eslint-env jest */
import {SDK} from '@ringcentral/sdk';
// import WSG from '../src/index';

jest.setTimeout(64000);

describe('WSG', () => {
  test('RingCentral SDK v4', async () => {
    const sdk = new SDK({
      server: process.env.RINGCENTRAL_SERVER_URL,
      clientId: process.env.RINGCENTRAL_CLIENT_ID,
      clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
    });
    await sdk.login({
      username: process.env.RINGCENTRAL_USERNAME,
      extension: process.env.RINGCENTRAL_EXTENSION,
      password: process.env.RINGCENTRAL_PASSWORD,
    });
    // console.log(sdk);
    await sdk.logout();
    // const wsg = new WSG(sdk, {
    //   server: process.env.RINGCENTRAL_WSG_SERVER_URL!,
    // });
  });
});
