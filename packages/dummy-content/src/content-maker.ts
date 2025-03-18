import { type DummyContentConfig } from './config';
import { d, type HeadingMaker } from './lib/index';
import { contentTypes } from './content-types';

function rep(count: number | number[]) {
  if (Array.isArray(count)) {
    if (typeof count[0] !== 'number' && typeof count[0] !== 'number')
      throw new Error('Rep count is not given');
    return d.count(count[0], count[1]);
  } else {
    return d.count(count);
  }
}

export function dummyContentMaker(conf: Required<DummyContentConfig>) {
  const contentType = contentTypes[conf.type];
  if (!contentType) throw new Error(`Unknown content type: '${conf.type}'`);
  const { words, sentenceTerimnator, numberingMaker } = contentType;

  const introWordsMaker = d.newWordsMaker(
    d.newWordMaker(words),
    rep(conf['intro-words-per-sentence']),
  );
  const wordsMaker = d.newWordsMaker(
    d.newWordMaker(words),
    rep(conf['words-per-sentence']),
  );
  const headingWordsMaker = d.newWordsMaker(
    d.newWordMaker(words),
    rep(conf['words-per-heading']),
  );

  let introParagraphsMaker: undefined | (() => string);
  let paragraphsMaker: undefined | (() => string);
  let headingMaker: undefined | HeadingMaker;

  const resolvedNumberingMaker = conf['no-numbering']
    ? undefined
    : numberingMaker;

  if (conf.format == 'md') {
    introParagraphsMaker = d.newParagraphTextsMaker(
      d.newParagraphTextMaker(
        d.newSentenceMaker(introWordsMaker, sentenceTerimnator),
        rep(conf['intro-sentences-per-paragraph']),
      ),
      rep(conf['intro-paragraphs']),
    );
    paragraphsMaker = d.newParagraphTextsMaker(
      d.newParagraphTextMaker(
        d.newSentenceMaker(wordsMaker, sentenceTerimnator),
        rep(conf['sentences-per-paragraph']),
      ),
      rep(conf['paragraphs']),
    );

    headingMaker = d.newMarkdownHeadingMaker(
      headingWordsMaker,
      resolvedNumberingMaker,
    );
  } else if (conf.format == 'html') {
    introParagraphsMaker = d.newParagraphElementsMaker(
      d.newParagraphElementMaker(
        d.newParagraphTextMaker(
          d.newSentenceMaker(introWordsMaker, sentenceTerimnator),
          rep(conf['intro-sentences-per-paragraph']),
        ),
      ),
      rep(conf['intro-paragraphs']),
    );
    paragraphsMaker = d.newParagraphElementsMaker(
      d.newParagraphElementMaker(
        d.newParagraphTextMaker(
          d.newSentenceMaker(wordsMaker, sentenceTerimnator),
          rep(conf['sentences-per-paragraph']),
        ),
      ),
      rep(conf['paragraphs']),
    );
    headingMaker = d.newHtmlHeadingMaker(
      headingWordsMaker,
      d.idMaker,
      resolvedNumberingMaker,
    );
  }

  if (introParagraphsMaker && paragraphsMaker && headingMaker) {
    const contentMaker = d.newContentMaker(
      introParagraphsMaker,
      headingMaker,
      paragraphsMaker,
      rep(conf.sections),
      conf.emptyness,
      conf.deepness,
      conf['start-h-level'],
    );
    const content = contentMaker();
    return content;
  } else {
    throw new Error(`Unknown format ${conf.format}`);
  }
}
