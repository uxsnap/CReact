import { test } from './test';
import { renderTests, renderTestCallback } from './renderTests';
import { reconcileTestCallback, reconcileTests } from './reconcileTests';


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
