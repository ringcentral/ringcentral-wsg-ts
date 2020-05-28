import {WsgOptions} from 'ringcentral-unified/build/Wsg';
import Unified from 'ringcentral-unified';
import RingCentral, {AuthData} from '@ringcentral/sdk';
import {TokenInfo} from 'ringcentral-unified/build/definitions';
import {events} from '@ringcentral/sdk/lib/platform/Platform';

function authData2TokenInfo(authData: AuthData): TokenInfo {
  return {
    ...authData,
    expires_in: authData.expires_in ? parseInt(authData.expires_in) : undefined,
    refresh_token_expires_in: authData.refresh_token_expires_in
      ? parseInt(authData.refresh_token_expires_in)
      : undefined,
  };
}

export default class WSG {
  unified?: Unified;
  wsgOptions: WsgOptions;
  constructor(wsgOptions: WsgOptions) {
    this.wsgOptions = wsgOptions;
  }

  async initWithSDK(rc: RingCentral) {
    const server = rc
      .platform()
      .loginUrl()
      .split('/restapi/oauth/authorize')[0];
    const authData = await rc.platform().auth().data();
    this.unified = new Unified(
      {
        server,
        token: authData2TokenInfo(authData),
      },
      this.wsgOptions
    );
    rc.platform().on(events.loginSuccess, async () => {
      this.unified!.token = authData2TokenInfo(
        await rc.platform().auth().data()
      );
    });
    rc.platform().on(events.refreshSuccess, async () => {
      this.unified!.token = authData2TokenInfo(
        await rc.platform().auth().data()
      );
    });
    rc.platform().on(events.logoutSuccess, async () => {
      await this.revoke();
    });
  }

  async subscribe(eventFilters: string[], callback: (body: {}) => void) {
    await this.unified?.wsg?.subscribe(eventFilters, callback);
  }

  async revoke() {
    await this.unified?.revoke();
  }
}
