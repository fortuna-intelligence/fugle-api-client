import { Fugle } from '../src/fugle';
import axios from 'axios';
import WebSocket from 'isomorphic-ws';

jest.mock('axios');
jest.mock('isomorphic-ws');

describe('Fugle', () => {
  describe('#constructor', () => {
    it('should be instantiated', () => {
      const fugle = new Fugle();
      expect(fugle).toBeInstanceOf(Fugle);
    });

    it('should be instantiated by passing options with apiToken', () => {
      const fugle = new Fugle({ apiToken: 'demo' });
      expect(fugle).toBeInstanceOf(Fugle);
      expect(fugle.apiToken).toBe('demo');
    });

    it('should get/set apiToken', () => {
      const fugle = new Fugle();
      expect(fugle.apiToken).toBe('');

      fugle.apiToken = 'demo';
      expect(fugle.apiToken).toBe('demo');
    });
  });

  describe('#api', () => {
    it('should invoke axios with compiled url', () => {
      const fugle = new Fugle({ apiToken: 'demo' });
      const url = 'https://api.fugle.tw/realtime/v0/intraday/quote?apiToken=demo&symbolId=2884';
      fugle.api('/intraday/quote', { symbolId: '2884' });
      expect(axios).toBeCalledWith(url);
    });
  });

  describe('#ws', () => {
    it('should invoke ws with compiled url', () => {
      const fugle = new Fugle({ apiToken: 'demo' });
      const url = 'https://api.fugle.tw/realtime/v0/intraday/quote?apiToken=demo&symbolId=2884';
      fugle.ws('/intraday/quote', { symbolId: '2884' });
      expect(WebSocket).toBeCalledWith(url);
    });
  });
});
