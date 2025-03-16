import { numberingMaker } from './lib/index';
import words from './words';

interface ContentType {
  words: string[];
  sentenceTerimnator: string;
  numberingMaker: (orders: number[]) => string;
  description?: string;
}

interface ContentTypes {
  [typeName: string]: ContentType;
}

export const contentTypes: ContentTypes = {
  'lorem-ipsum': {
    words: words.loremIpsum,
    sentenceTerimnator: '.',
    numberingMaker,
    description: 'Random Lorem Ipsum text',
  },
  'kabbik-ipsum': {
    words: words.kabbikIpsum,
    sentenceTerimnator: '।',
    numberingMaker(orders) {
      const formatter = new Intl.NumberFormat('bn', {
        numberingSystem: 'beng',
        useGrouping: false,
      });
      return orders.map((n) => formatter.format(n)).join('.');
    },
    description: 'Text made of random poetic Bengali words',
  },
};
