import { helper } from '@ember/component/helper';

export function isCurrentPage(params/*, hash*/) {
  let [arg1, arg2] = params;
  return arg1 === arg2;
}

export default helper(isCurrentPage);
