import {
  forgivingRandomInt,
  repeatAndJoin,
  count,
  idMaker,
  numberingMaker,
} from './utils';

export { idMaker, numberingMaker, count };

export function newWordMaker(words: string[]) {
  if (words.length == 0) throw new Error('No words found');
  return () => words[forgivingRandomInt(0, words.length - 1)] as string;
}

export function newWordsMaker(wordMaker: () => string, rep: () => number) {
  return () => repeatAndJoin(wordMaker, rep(), ' ');
}

export function newSentenceMaker(
  wordsMaker: () => string,
  sentenceTerminator: string,
) {
  return () => {
    const wordsString = wordsMaker();
    return (
      wordsString.charAt(0).toUpperCase() +
      wordsString.slice(1) +
      sentenceTerminator
    );
  };
}

export function newParagraphTextMaker(
  sentenceMaker: () => string,
  rep: () => number,
) {
  return () => repeatAndJoin(sentenceMaker, rep(), ' ');
}

export function newParagraphTextsMaker(
  paragraphTextMaker: () => string,
  rep: () => number,
) {
  return () => {
    const text = repeatAndJoin(paragraphTextMaker, rep(), '\n\n');
    return text + (text !== '' ? '\n\n' : '');
  };
}

export function newParagraphElementMaker(paragraphTextMaker: () => string) {
  return () => `<p>${paragraphTextMaker()}</p>`;
}

export function newParagraphElementsMaker(
  paragraphElementMaker: () => string,
  rep: () => number,
) {
  return () => repeatAndJoin(paragraphElementMaker, rep());
}

export type HeadingMaker = (level: number, orders: number[]) => string;

function newHtmlHeadingMaker(
  wordsMaker: () => string,
  idMaker?: (orders: number[]) => string,
  numberingMaker?: (orders: number[]) => string,
): HeadingMaker {
  return (level: number, orders: number[]) => {
    let content = wordsMaker();
    content = content.charAt(0).toUpperCase() + content.slice(1);
    const id = idMaker?.(orders);
    const numbering = numberingMaker?.(orders);
    return `<h${level}${id ? ` id="${id}"` : ''}>${numbering ? numbering + ' ' : ''}${content}</h${level}>`;
  };
}

function newMarkdownHeadingMaker(
  wordsMaker: () => string,
  numberingMaker?: (orders: number[]) => string,
): HeadingMaker {
  return (level: number, orders: number[]) => {
    let content = wordsMaker();
    content = content.charAt(0).toUpperCase() + content.slice(1);
    const numbering = numberingMaker?.(orders);
    return `${'#'.repeat(level)} ${numbering ? numbering + ' ' : ''}${content}\n\n`;
  };
}

function getNextHLevel(
  currentLevel: number,
  startHLevel: number,
  deepness: number,
) {
  if (Math.random() < deepness && currentLevel != 6) {
    return currentLevel + 1;
  } else {
    return forgivingRandomInt(startHLevel, currentLevel);
  }
}

export function newContentMaker(
  introParagraphsMaker: () => string,
  headingMaker: (level: number, orders: number[]) => string,
  paragraphsMaker: () => string,
  sectionsRep: () => number,
  emptyness: number,
  deepness: number,
  startHLevel: number,
) {
  return () => {
    const orders: number[] = [];
    let result: string = '';
    const sectionsCount = sectionsRep();

    let prevHLevel = startHLevel;
    let nextHLevel = -1; // just to mean that it's not reached or calculated yet

    result += introParagraphsMaker();

    for (let i = 0; i < sectionsCount; i++) {
      const curHLevel = i == 0 ? prevHLevel : nextHLevel;

      if (i == 0 || curHLevel > prevHLevel) {
        orders.push(1);
      } else {
        if (curHLevel < prevHLevel) {
          for (let j = 0; j < prevHLevel - curHLevel; j++) {
            orders.pop();
          }
        }

        const lastOrder = orders[orders.length - 1];
        if (typeof lastOrder !== 'undefined') {
          orders[orders.length - 1] = lastOrder + 1;
        }
      }

      nextHLevel = getNextHLevel(curHLevel, startHLevel, deepness);

      result += headingMaker(curHLevel, orders);

      if (
        !(
          nextHLevel > curHLevel &&
          i != sectionsCount - 1 &&
          Math.random() < emptyness
        )
      ) {
        result += paragraphsMaker();
      }

      prevHLevel = curHLevel;
    }
    return result;
  };
}

export const d = {
  newWordMaker,
  newWordsMaker,
  newSentenceMaker,
  newParagraphTextMaker,
  newParagraphTextsMaker,
  newParagraphElementMaker,
  newParagraphElementsMaker,
  newHtmlHeadingMaker,
  newMarkdownHeadingMaker,
  newContentMaker,
  count,
  idMaker,
  numberingMaker,
};
