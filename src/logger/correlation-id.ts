import * as cls from 'cls-hooked';
import { v4 } from 'uuid';

const store = cls.createNamespace('correlation-id-namespace');

const CORRELATION_ID_KEY = 'correlation-id';

function withId(fn: () => void, id: string) {
  store.run(() => {
    store.set(CORRELATION_ID_KEY, id || v4());
    fn();
  });
}

function getId() {
  return store.get(CORRELATION_ID_KEY);
}

export default {
  withId,
  getId,
  bindEmitter: store.bindEmitter.bind(store),
  bind: store.bind.bind(store)
};
