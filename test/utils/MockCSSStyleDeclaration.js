import { forEach, isNaN, parseInt } from 'lodash';

export default function MockCSSStyleDeclaration(styleObj) {
  forEach(styleObj, (value, key) =>
    isNaN(parseInt(key)) ?
      this[key] = value :
      this.push(value)
  );
}

MockCSSStyleDeclaration.prototype = Object.create(Array.prototype);
