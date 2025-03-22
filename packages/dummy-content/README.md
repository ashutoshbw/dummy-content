<p align="center">
  <img alt="npm version" src="https://img.shields.io/npm/v/dummy-content?style=for-the-badge">
  <img alt="license" src="https://img.shields.io/github/license/ashutoshbw/dummy-content?style=for-the-badge">
  <img alt="downloads" src="https://img.shields.io/npm/dw/dummy-content?style=for-the-badge">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ashutoshbw/dummy-content?style=for-the-badge">
</p>

<h1 align="center">Dummy Content</h1>

`dummy-content` is a random dummy content generator. You can use it as a CLI tool or as a library for more specific purposes.

Please give it a [star on github](https://github.com/ashutoshbw/dummy-content) if you find it useful.

## Table of contents

- [The CLI](#the-cli)
  - [Features](#features)
  - [Get started](#get-started)
- [The library](#the-library)
  - [Installation from npm](#installation-from-npm)
  - [Usage](#usage)
    - [A word](#a-word)
    - [Multiple words](#multiple-words)
    - [A sentence](#a-sentence)
    - [A paragraph](#a-paragraph)
    - [Multiple paragraphs](#multiple-paragraphs)
    - [HTML paragraph](#html-paragraph)
    - [Multiple HTML paragraph elements](#multiple-html-paragraph-elements)
    - [HTML heading](#html-heading)
    - [Markdown heading](#markdown-heading)
    - [Article like content](#article-like-content)

## The CLI

### Features

- **Markdown** and **HTML** output support.
- Able to generate **from a sentence** to **entire article with headings**, having natural looking hierarchical structure.
- The **quantity** of different parts of the content is **customizable** through **various options**.

### Get started

To generate a random Lorem Ipsum paragraph run the following in your terminal:

```sh
npx dummy-content
```

It will print something like below to your terminal:

```
Ipsum do nostrud commodo id ut incididunt qui eiusmod do sit ipsum. Aute commodo …
```

What you are seeing is just the **tip of the iceberg** that `dummy-content` can generate. In other words, it's **just the introduction** with a single paragraph.

Run the following to print 2 paragraphs:

```sh
npx dummy-content --intro-paragraphs 2
```

```
Officia eiusmod exercitation laborum ut tempor occaecat sit deserunt excepteur. Ut nostrud …

Ex est consectetur cillum ea labore velit aliqua sit ea cupidatat ea. Minim minim non …
```

If want to print at least 1 paragraph and at most 3 of them or something in between, then run the following:

```sh
npx dummy-content --intro-paragraphs 1,3  # or
npx dummy-content --intro-paragraphs 3,1  # works the same as above
```

```
Lorem ut esse id labore. Ut dolore ea velit ex est voluptate. Veniam ut sunt ipsum nulla veniam. Esse …

Nisi Lorem mollit aliquip tempor. Occaecat commodo sunt eu labore reprehenderit qui ut ut. Voluptate …

Dolore sit sunt dolore fugiat mollit excepteur et est nulla ullamco elit. Deserunt voluptate aliquip …
```

To copy it pass the `--copy` flag:

```sh
npx dummy-content --intro-paragraphs 1,3 --copy
```

So far, we have been tweaking the introduction. Let's move on to creating the main part of the dummy article. It can also generate sections of text, each with a heading, possibly nesting them, imitating real article structure.

By default it prints no sections. So it only shows an introduction with a single paragraph. Let's output 2 sections after the default introduction setting:

```sh
npx dummy-content --sections 2
```

```
Qui ad non eu nostrud labore do aute. Sunt nisi ad sint. Nisi occaecat officia commodo exercitation …

## 1 Excepteur

Aliquip veniam duis voluptate ad sint officia. Sint Lorem incididunt eu ullamco aute laboris duis …

⋮


## 2 Pariatur officia laboris nisi do

Consectetur aliquip et aute irure nisi elit. Proident laboris eu deserunt deserunt elit. Ex ut cupidatat …

⋮
```

To save the file in a markdown, mdx or html file use the `--output` option:

```sh
npx dummy-content --sections 2,8 --output demo.md
npx dummy-content --sections 2,8 --output demo.mdx
npx dummy-content --sections 2,8 --output demo.html
```

Note that you can also sepeciy a range after the `--sections` option. For `.md` and `.mdx` files it outputs markdown content. And for the HTML file it generates a html web page having dummy content in its body.

In the next example we will see how to get other type of content than Lorem Ipsum. Currently there is one other variation. It called Kabbik Ipsum, it uses poetic Bengali words. To use it, after the `--type` option specify `kabbik-ipsum`:

```
npx dummy-content --type kabbik-ipsum
```

```
স্বর্গীয় ফুল প্রকৃতি শুভ্রতা চন্দ্রালোকিত রহস্য অব্যক্ত উজ্জীবন সকাল। অপরিসীম প্রতিধ্বনি স্বাধীনতা ধ্যান বন্ধন বনভূমি আকাশ আত্মা ভোর রহস্যময় …
```

There are many more options that you can tweak. You can also specify them in a configuration file and load it. But these are the basics. To learn about other possibilities see its help page:

```sh
npx dummy-content --help
```

## The library

`dummy-content` is also an ultralight(less than **1kb** minified + gzipped) and low level library of composable functions used to help you generate dummy content. It is used by the CLI under the hood to generate the dummy content.

### Installation from npm

```sh
npm install dummy-content    # npm
pnpm add dummy-content       # pnpm
yarn add dummy-content       # yarn
bun add dummy-content        # bun
```

### Usage

First import the object `d` from `dummy-content`. It holds all the functions:

```ts
import { d } from 'dummy-content';
```

It contains functions that can generate from a single random word to whole randomized article like content. Let's see how to call and compose these functions starting from the most basic one generate radomized text.

**Note**: Each of these functions are usually very small. And if you need something different you can easily replace one with your own written one. As long as it takes and returns the right kind of things, it will play nicely with other functions.

#### A word

```
const wordMaker = d.newWordMaker(["tic", "tac", "toe"]);

console.log(wordMaker());  // toe
console.log(wordMaker());  // tic
```

#### Multiple words

```
const wordsMaker = d.newWordsMaker(wordMaker, d.count(2, 8));
const wordsMaker1 = d.newWordsMaker(wordMaker, d.count(4));

console.log(wordsMaker()); // tac tac tic toe toe tac
console.log(wordsMaker1());  // tic tic tic toe
```

Note that `count` can be used specify a range for repetition or an exact number of repetition. The order of number doesn't matter.

#### A sentence

```ts
const sentenceMaker = d.newSentenceMaker(wordsMaker, '.');

console.log(sentenceMaker()); // Tac tic tic tac toe.
```

The second argument is the sentence terminator symbol.

#### A paragraph

```ts
const paragraphTextMaker = d.newParagraphTextMaker(
  sentenceMaker,
  d.count(8, 4),
);

console.log(paragraphTextMaker());
```

The paragraph text contains maximum 8 sentences and minimum 4.

#### Multiple paragraphs

```ts
const paragraphTextsMaker = d.newParagraphTextsMaker(
  paragraphTextMaker,
  d.count(3),
);

console.log(paragraphTextsMaker());
```

```
Tac tic. Tac tic. Tac tic. Tic toe tic. Tic toe tic tac tic. Tac tic tic tac tic tic toe tic. Tac tic tac.

Tac tac tac tac toe tac. Toe tic tac toe toe. Tac toe tic tac tac toe. Tic tic tac toe.

Tic toe tac tac toe tic. Toe tic toe tic tac tac toe tac. Tac tic. Tic toe tac tic toe toe. Tic toe toe tic tac tac tic tic.


```

Note that after a paragarph it always adds two newlines to make sure the next thing that comes after it keeps at least one blank line of distance.

#### HTML paragraph

```ts
const paragraphElementMaker = d.newParagraphElementMaker(paragraphTextMaker);

console.log(paragraphElementMaker());
```

```
<p>Tac tac toe tic tic tac. Toe tic toe toe. Tac tac tic toe. Toe tac tic tic toe. Tac tac toe toe toe tic tac. Toe tac tic.</p>
```

#### Multiple HTML paragraph elements

```ts
const paragraphElementsMaker = d.newParagraphElementsMaker(
  paragraphElementMaker,
  d.count(3),
);

console.log(paragraphElementsMaker());
```

```
<p>Toe tic. Tac tic tic tac tac toe. Tac tic. Tac toe toe tic. Tic tac.</p><p>Tic tac. Tac toe tic tac tac tic tac. Toe toe toe. Toe tac. Tic tic toe toe tac.</p><p>Toe toe toe toe. Toe tic tac tic tic toe. Toe tic tac tac. Toe tac tic toe tac tic tac tac. Tac tic tic tic tic tac tic. Tac tac. Tic tic tac tic tic tac.</p>
```

Note that `dummy-content` doesn't prettify the output. It just generates the dummy content in the simplest way possible.

#### HTML heading

```ts
const htmlHeadingMaker = d.newHtmlHeadingMaker(
  wordsMaker,
  d.idMaker,
  d.numberingMaker,
);

console.log(htmlHeadingMaker(2, [2, 1, 1])); // <h2 id="h-2-1-1">2.1.1 Tic tic tic</h2>
```

`newHtmlHeadingMaker` returns a function which is called internally by `d.newContentMaker` which we will see soon. This returned function should be called with the heading level and hierarchical numbering order in an array in its 1st and 2nd argument respectively.

Here `d.idMaker` function is responsible for producing the id part `h-2-1-1` and `d.numberingMaker` function is responsible for producing `2.1.1` string in front of the heading. These two functions are optional and takes only the hierarchical numbering order in an array and returns a string.

#### Markdown heading

```ts
const markdownHeadingMaker = d.newMarkdownHeadingMaker(
  wordsMaker,
  d.numberingMaker,
);

console.log(markdownHeadingMaker(2, [2, 1, 1]));
```

```
## 2.1.1 Toe tac tic toe

```

It's similar to previous function. It just doesn't require the `idMaker`. Note that returned heading has two newlines at the end to make sure the next comes with after at least one blank line of distance.

Also you can omit passing the numbering maker function to not have any numbering.

#### Article like content

Now we are ready to call the ultimate maker function to produce article like dummy content that takes previous maker functions to produce either markdown or HTML output. First make some dummy Markdown content:

```ts
const markdownContentMaker = new d.newContentMaker(
  paragraphTextsMaker,
  markdownHeadingMaker,
  paragraphTextsMaker,
  d.count(3),
  0.3,
  0.5,
  2,
);

console.log(markdownContentMaker());
```

```
Tac tac. Tac tac tac tic toe tac toe. Tic tic tic. Toe tac tac …

⋮

## 1 Tic toe

Tac toe tac tic tic tic tic. Tac tac. Tac tic toe. Toe tic tac …

⋮

## 2 Tic tic tic

Tic tac tac. Toe tic tic toe toe tic toe tic. Tic tac tac tac tac …

⋮

### 2.1 Tic toe tic toe

Tac tic tic. Tac toe toe toe tic tac tac tic. Toe toe tic. Toe toe …

⋮
```

Let's see its parameters one by one:

1. 1st parameter takes a paragraphs maker function to make the introduction paragraphs. You will need to pass a HTML paragraphs maker to function when generating HTML output.
2. 2nd parameter takes a heading maker function. You will need to pass a HTML heading maker function when generating HTML output.
3. 3rd parameter takes another paragraphs making function similar to the 1st parameter. This is responsible for generating paragraphs that comes after the introduction.
4. 4th parameter takes `d.count` return value to get random or exact repetition count for the number total sections. Note that each section comes with a heading and then may be paragraphs or sub sections.
5. 5th parameter takes a number value which should from 0(inclusive) to 1(inclusive). The higher the value the higher the chance, sometimes you will get no paragraphs in parent section.
6. 6th parameter takes a number value which should from 0(inclusive) to 1(inclusive). The higher the value the higher the chance, you will get neseted sections.

To get HTML output use HTML maker functions instead of markdown ones:

```ts
const htmlContentMaker = new d.newContentMaker(
  paragraphElementsMaker,
  htmlHeadingMaker,
  paragraphElementsMaker,
  d.count(3),
  0.3,
  0.5,
  2,
);
```
