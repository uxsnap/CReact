import { reconcile } from "./reconcile";

export const INSTANCE_MAP = new Map();

export let currentlyRenderingComponent = { current: null, hookIndex: 0 };

export function useState(defValue) {
  let instanceToken = currentlyRenderingComponent.current;

  const component = INSTANCE_MAP.get(instanceToken);

  if (component.__hooks[currentlyRenderingComponent.hookIndex] === undefined) {
    component.__hooks[currentlyRenderingComponent.hookIndex] =  { state: defValue };
  }

  let hookObj = component.__hooks[currentlyRenderingComponent.hookIndex];
  
  function setState(newVal) {
    const { __instance, __dom } = component;

    hookObj.state = newVal;

    reconcile(__instance, __dom, __dom.parentNode);
  }

  currentlyRenderingComponent.hookIndex++;
  return [
    hookObj.state,
    setState
  ];
};