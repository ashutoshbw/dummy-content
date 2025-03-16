import { showVersion } from './version';
import pc from 'picocolors';

export function showHelp() {
  showVersion();
  const helpText = `
${pc.bold('DESCRIPTION')}
  dummy-content is a CLI tool generate random dummy content ranging from a
  sentence to article like content possibly with nesting headings. Markdown and
  HTML output is supported.

  ${pc.bgBlack(`                                                                               `)}
  ${pc.bgBlack(`  ${pc.bold(pc.underline('Info') + ':')} dummy-content is also a low-level library to generate dummy contents.  `)}
  ${pc.bgBlack(`  See ${pc.blue(pc.underline('https://github.com/ashutoshbw/dummy-content#the-library'))} to learn more.   `)}
  ${pc.bgBlack(`                                                                               `)}

${pc.bold('USAGE')}
  ${pc.green('npx dummy-content [options]')}

${pc.bold('EXAMPLES')}

  ${pc.green(`npx dummy-content
  npx dummy-content --copy
  npx dummy-content --sections 5
  npx dummy-content --sections 1,10 --output dummy.html`)}

When --copy or --output options are not used the generated content is printed to
the terminal(stdout).

${pc.bold('OPTIONS')}
  ${pc.green('--copy')}
      Copies the generated text to the clipboard.

  ${pc.green('--help, -h')}
      Displays this.

  ${pc.green('--version, -v')}
      Displays the version information.

  ${pc.green('--config <file>')}
      Specifies the configuration file. The file must have a .conf extension.
      See the Configuration File section for more details.

  ${pc.green('--format <value>')}
      Specifies the output format. Accepted values are 'html' or 'md'. 
      The --output option takes precedence over this value.
      Default: 'md'

  ${pc.green('--output <file>')}
      Specifies the output file where the generated content will be saved. 
      The file must have a .md, .mdx, or .html extension.

  ${pc.green('--intro-words-per-sentence <value1>[,<value2>]')}
      Specifies the minimum and maximum number of words per sentence in the
      introduction section.
      Default: 4,12

  ${pc.green('--intro-sentences-per-paragraph <value1>[,<value2>]')}
      Specifies the minimum and maximum number of sentences per paragraph in
      the introduction section.
      Default: 4,10

  ${pc.green('--intro-paragraphs <value1>[,<value2>]')}
      Specifies the minimum and maximum number of paragraphs in the introduction
      section.
      Default: 1

  ${pc.green('--sections <value1>[,<value2>]')}
      Specifies the minimum and maximum number of sections that follow the
      introduction section.
      Default: 0

  ${pc.green('--words-per-sentence <value1>[,<value2>]')}
      Specifies the minimum and maximum number of words per sentence in the
      sections after the introduction.
      Default: 4,12

  ${pc.green('--sentences-per-paragraph <value1>[,<value2>]')}
      Specifies the minimum and maximum number of sentences per paragraph in
      the sections after the introduction.
      Default: 4,10

  ${pc.green('--paragraphs <value1>[,<value2>]')}
      Specifies the minimum and maximum number of paragraphs per section after
      the introduction.
      Default: 1,8

  ${pc.green('--words-per-heading <value1>[,<value2>]')}
      Specifies the minimum and maximum number of words in the headings of
      sections.
      Default: 1,5

  ${pc.green('--emptyness <value>')}
      A value between 0 and 1 (inclusive). The higher the value, the higher the
      chance of having no paragraphs in a parent section.
      Default: 0.4

  ${pc.green('--deepness <value>')}
      A value between 0 and 1 (inclusive). The higher the value, the higher the
      chance of generating nested sections.
      Default: 0.4

  ${pc.green('--start-h-level <value>')}
      A value between 1 and 6. Specifies the starting heading level.
      Default: 2

  ${pc.green('--no-numbering')}
      Disables hierarchical numbering in front of section headings.
      By default it shows these numbering.

      In the .conf file you will need to use 'no-numbering: true' to have
      no numberings in the headings.

  ${pc.green('--id <value>')}
      When the output format is HTML, this option can be used to wrap the
      dummy content inside an element with the specified id in the HTML file.

  ${pc.green('--type <value>')}
      Specifies the type of dummy content. Available options are:
        - lorem-ipsum: Random Lorem Ipsum text
        - prio-bangla: Text made of random beautiful Bangla words
      Default: lorem-ipsum

${pc.bold('CONFIGURATION FILE')}
  You can also write options(no leading '--' needed) in a .conf file and point
  dummy-content to it. Example usage:

  ${pc.green('npx dummy-content --config dummy-content.conf')}

  In this file options are specified like below:

  ${pc.yellow(`intro-paragraphs: 0
  paragraphs: 2
  sections: 4
  no-numbering: true`)}

  Ensure each line starts with the option name, with no leading spaces. Use
  : to separate option its value(s).

${pc.bold('AUTHOR')}
  Written by Ashutosh Biswas.

${pc.bold('PROBLEMS?')}
  Open an issue here: ${pc.blue(pc.underline('https://github.com/ashutoshbw/dummy-content/issues'))}

${pc.bold('LICENSE')}
  MIT
`;
  console.log(helpText);
}
