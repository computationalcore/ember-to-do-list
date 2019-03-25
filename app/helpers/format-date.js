import { helper } from '@ember/component/helper';
import moment from 'moment';

export function formatDate(params) {
  return moment(params[0]).format('YYYY-MM-DD');
}

export default helper(formatDate);
