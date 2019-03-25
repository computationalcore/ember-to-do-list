import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import showdown from 'showdown';

export function formatMarkdown(params) {
  return htmlSafe(new showdown.Converter().makeHtml(params[0]));
}

export default helper(formatMarkdown);
