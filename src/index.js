import { reconcileTestCallback, reconcileTests } from "./reconcileTests";
import { renderTests, renderTestCallback } from './renderTests';
import { test } from './test';

// test(renderTests, renderTestCallback);
test(reconcileTests, reconcileTestCallback);