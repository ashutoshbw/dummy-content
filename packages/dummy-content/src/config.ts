export interface DummyContentConfig {
  format?: string;
  'intro-words-per-sentence'?: number | number[];
  'intro-sentences-per-paragraph'?: number | number[];
  'intro-paragraphs'?: number | number[];
  'words-per-sentence'?: number | number[];
  'sentences-per-paragraph'?: number | number[];
  paragraphs?: number | number[];
  'words-per-heading'?: number | number[];
  sections?: number | number[];
  emptyness?: number;
  deepness?: number;
  'start-h-level'?: number;
  'no-numbering'?: boolean;
  id?: string;
  output?: string;
  type?: string;
}

export const countOptions = [
  'intro-words-per-sentence',
  'intro-sentences-per-paragraph',
  'intro-paragraphs',
  'words-per-sentences',
  'sentences-per-paragraph',
  'paragraphs',
  'sections',
  'words-per-heading',
];

export const defaultConfig: Required<DummyContentConfig> = {
  format: 'md',
  'intro-words-per-sentence': [4, 12],
  'intro-sentences-per-paragraph': [4, 10],
  'intro-paragraphs': 1,
  'words-per-sentence': [4, 12],
  'sentences-per-paragraph': [4, 10],
  paragraphs: [1, 8],
  'words-per-heading': [1, 5],
  sections: 0,
  emptyness: 0.4,
  deepness: 0.4,
  'start-h-level': 2,
  'no-numbering': false,
  id: '',
  output: '',
  type: 'lorem-ipsum',
};
