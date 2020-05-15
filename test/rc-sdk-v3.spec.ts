/* eslint-env jest */
import SDK from 'ringcentral';
// import WSG from '../src/index';

jest.setTimeout(64000);

describe('WSG', () => {
  test('RingCentral SDK v3', async () => {
    const sdk = new SDK({
      appKey: process.env.RINGCENTRAL_CLIENT_ID,
      appSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
      server: process.env.RINGCENTRAL_SERVER_URL,
    });
    const platform = sdk.platform();
    await platform.login({
      username: process.env.RINGCENTRAL_USERNAME,
      extension: process.env.RINGCENTRAL_EXTENSION,
      password: process.env.RINGCENTRAL_PASSWORD,
    });
    // console.log(sdk);
    await platform.logout();
    // const wsg = new WSG(sdk, {
    //   server: process.env.RINGCENTRAL_WSG_SERVER_URL!,
    // });
  });
});
