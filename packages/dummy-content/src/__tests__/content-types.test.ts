import { it, expect, describe } from 'vitest';
import { contentTypes } from '../content-types';

describe('Content types:', () => {
  for (const [typeName, data] of Object.entries(contentTypes)) {
    const words = data.words;
    const repeatedWords: string[] = [];
    const uniqueWords = [...new Set(words)];

    if (words.length != uniqueWords.length) {
      uniqueWords.forEach((uniqueWord) => {
        const index = words.indexOf(uniqueWord);
        const lastIndex = words.lastIndexOf(uniqueWord);
        if (index != lastIndex) {
          repeatedWords.push(uniqueWord);
        }
      });
    }

    describe(`${typeName}:`, () => {
      it('Words should not be repeated', () => {
        expect(repeatedWords).toHaveLength(0);
      });

      it('There should be at least 50 and at most 200 words', () => {
        expect(words.length).greaterThanOrEqual(50).lessThanOrEqual(200);
      });
    });
  }
});
