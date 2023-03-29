import { renderTests, renderTestCallback } from './renderTests';
import { reconcileTestCallback, reconcileTests } from './reconcileTests';

const test = (tests, func) => 
    tests.forEach((test, index) => {
      try {
        func(test, index);
      } catch (err) {
        console.log(err);
        console.log("Error here: " + JSON.stringify(test));
      }
    });

export const testMain = (argv) => {
    switch (argv) {
        case 'render':
            test(renderTests, renderTestCallback);
            break;
        case 'reconcile':
            test(reconcileTests, reconcileTestCallback);
            break;
    }
};
