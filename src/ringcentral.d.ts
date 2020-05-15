declare module 'ringcentral' {
  class RingCentral {
    constructor(options: {});
    platform(): {
      login: (options: {}) => void;
      logout: () => void;
      auth: () => {data: () => {}};
      loginUrl: () => string;
      post: (endpoint: string, body: {}) => void;
    };
    createSubscription(): {};
    server: string;
  }
  export default RingCentral;
}
