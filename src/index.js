/**
 * index.js
 */

import { add, subtract } from './module';

import styles from './styles.css';

if (module.hot) {
  module.hot.accept();
}

const resultA = add(2, 3);
const resultB = subtract(5, 1);

console.log(`resultA --- ${resultA}`);
console.log(`resultB --- ${resultB}`);

console.log(process.env.APP_NAME);

console.log(styles.localClass); // _19OBmKu4X8SmIISJiYXz8U
console.log(styles.globalClass); // undefined
