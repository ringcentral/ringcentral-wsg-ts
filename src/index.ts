import Wsg, {WsgOptions} from 'ringcentral-unified/build/Wsg';
import Unified from 'ringcentral-unified';
import RingCentral, {AuthData} from '@ringcentral/sdk';
import {TokenInfo} from 'ringcentral-unified/build/definitions';
import {events} from '@ringcentral/sdk/lib/platform/Platform';

export default class WSG {
  static sandboxServer = Wsg.sandboxServer;
  static productionServer = Wsg.productionServer;

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
        token: authData as TokenInfo,
      },
      this.wsgOptions
    );
    rc.platform().on(events.loginSuccess, async () => {
      this.token = await rc.platform().auth().data();
    });
    rc.platform().on(events.refreshSuccess, async () => {
      this.token = await rc.platform().auth().data();
    });
    rc.platform().on(events.logoutSuccess, async () => {
      await this.revoke();
    });
  }

  async subscribe(eventFilters: string[], callback: (body: {}) => void) {
    await this.unified?.wsg?.subscribe(eventFilters, callback);
  }

  async revoke() {
    await this.unified?.wsg?.revoke();
  }

  get token(): AuthData | undefined {
    return this.unified?.token as AuthData;
  }
  set token(authData: AuthData | undefined) {
    this.unified!.token = authData as TokenInfo;
  }
}
