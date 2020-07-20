/* eslint-disable node/no-unpublished-import */
/* eslint-env jest */
import {SDK} from '@ringcentral/sdk';
import WSG from '../src/index';

jest.setTimeout(64000);

describe('Rest API', () => {
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

    const wsg = new WSG(sdk, {
      restOverWebSocket: true,
    });
    await wsg.init();

    // You can invoke Rest API with unified
    const extInfo = await wsg.rc.restapi().account().extension().get();
    expect(extInfo.id).toBeDefined();

    await wsg.revoke();
    await sdk.platform().logout();
  });
});
