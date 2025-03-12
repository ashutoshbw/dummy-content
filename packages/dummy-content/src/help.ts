import { showVersion } from './version';
export function showHelp() {
  showVersion();
  const helpText = `
Description:
  dummy-content is both a cli dummy content generator and a library. This is the
  help page of the cli.

Usage:
  npx dummy-content [options]

Examples:

  npx dummy-content
  npx dummy-content --copy
  npx dummy-content --sections 5
  npx dummy-content --sections 1,10 --output dummy.html

When --copy or --output options are not used the generated content is printed to
the terminal.

Options:
  --copy
      Copies the generated text to the clipboard.

  --help, -h
      Displays this.

  --version, -v
      Displays the version information.

  --config <file>
      Specifies the configuration file. The file must have a .conf extension.
      See the Configuration File section for more details.

  --format <value>
      Specifies the output format. Accepted values are 'html' or 'md'. 
      The --output option takes precedence over this value.
      Default: 'md'

  --output <file>
      Specifies the output file where the generated content will be saved. 
      The file must have a .md, .mdx, or .html extension.

  --intro-words-per-sentence <value1>[,<value2>]
      Specifies the minimum and maximum number of words per sentence in the
      introduction section.
      Default: 4,12

  --intro-sentences-per-paragraph <value1>[,<value2>]
      Specifies the minimum and maximum number of sentences per paragraph in
      the introduction section.
      Default: 4,10

  --intro-paragraphs <value1>[,<value2>]
      Specifies the minimum and maximum number of paragraphs in the introduction
      section.
      Default: 1

  --sections <value1>[,<value2>]
      Specifies the minimum and maximum number of sections that follow the
      introduction section.
      Default: 0

  --words-per-sentence <value1>[,<value2>]
      Specifies the minimum and maximum number of words per sentence in the
      sections after the introduction.
      Default: 4,12

  --sentences-per-paragraph <value1>[,<value2>]
      Specifies the minimum and maximum number of sentences per paragraph in
      the sections after the introduction.
      Default: 4,10

  --paragraphs <value1>[,<value2>]
      Specifies the minimum and maximum number of paragraphs per section after
      the introduction.
      Default: 1,8

  --words-per-heading <value1>[,<value2>]
      Specifies the minimum and maximum number of words in the headings of
      sections.
      Default: 1,5

  --emptyness <value>
      A value between 0 and 1 (inclusive). The higher the value, the higher the
      chance of having no paragraphs in a parent section.
      Default: 0.4

  --deepness <value>
      A value between 0 and 1 (inclusive). The higher the value, the higher the
      chance of generating nested sections.
      Default: 0.4

  --start-h-level <value>
      A value between 1 and 6. Specifies the starting heading level.
      Default: 2

  --no-numbering
      Disables hierarchical numbering in front of section headings.
      By default it shows these numbering.

      In the .conf file you will need to use 'no-numbering: true' to have
      no numberings in the headings.

  --id <value>
      When the output format is HTML, this option can be used to wrap the
      dummy content inside an element with the specified id in the HTML file.

  --type <value>
      Specifies the type of dummy content. Available options are:
        - lorem-ipsum: Random Lorem Ipsum text
        - prio-bangla: Text made of random beautiful Bangla words
      Default: lorem-ipsum

Configuration file:
  If you use many options, you can put them in a .conf file and point
  dummy-content to it. Example usage:

  npx dummy-content --config dummy-content.conf

  Below is an example configuration file:

  format: html
  intro-paragraphs: 0
  paragraphs: 2
  sections: 4
  no-numbering: true

  Ensure each line starts with the option name, with no leading spaces.

Author:
  Written by Ashutosh Biswas.`;
  console.log(helpText);
}
