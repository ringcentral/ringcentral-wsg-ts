import {WsgOptions} from 'ringcentral-unified/build/Wsg';
import Unified from 'ringcentral-unified';
import {TokenInfo} from 'ringcentral-unified/build/definitions';

type RingCentral = {
  platform: () => {
    loginUrl: () => string;
    auth: () => {
      data: () => TokenInfo;
    };
  };
};

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
    const token = await rc.platform().auth().data();
    this.unified = new Unified(
      {
        server,
        token,
      },
      this.wsgOptions
    );
    // todo: auto set token if token updated
  }

  async subscribe(eventFilters: string[], callback: (body: {}) => void) {
    await this.unified?.wsg?.subscribe(eventFilters, callback);
  }

  async revoke() {
    await this.unified?.revoke();
  }
}
