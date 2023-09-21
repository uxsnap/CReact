import { __SHALLOW_COMPARE } from "../helpers";
import { reconcile } from "./reconcile";

export const INSTANCE_MAP = new Map();

export let currentlyRenderingComponent = { current: null, stateHookIndex: 0, effectHookIndex: 0 };

const getComponent = () => {
  let instanceToken = currentlyRenderingComponent.current;

  return INSTANCE_MAP.get(instanceToken);
};

export function useState(defValue) {
  const component = getComponent();
  
  if (component.__states[currentlyRenderingComponent.stateHookIndex] === undefined) {
    component.__states[currentlyRenderingComponent.stateHookIndex] = { 
      state: defValue
    };
  }
  
  let stateObj = component.__states[currentlyRenderingComponent.stateHookIndex];

  currentlyRenderingComponent.stateHookIndex++;

  return [
    stateObj.state,
    (newVal) => {    
      const { __dom } = component;
      const { __funcInstance } = __dom;
  
      stateObj.state = newVal;
      
      component.__dom = reconcile(__funcInstance, __dom);
      component.__dom.__funcInstance = __funcInstance;
    }
  ];
};

export function useEffect(func, depArray) {
  const component = getComponent();
  
  if (component.__effects[currentlyRenderingComponent.effectHookIndex] === undefined) {
    component.__effects[currentlyRenderingComponent.effectHookIndex] = {
      func,
      depArray,
      called: false,
    }
  }

  let effectsObj = component.__effects[currentlyRenderingComponent.effectHookIndex];

  if (!effectsObj.depArray.length && !effectsObj.called) {
    effectsObj.func();
    effectsObj.called = true;
  } else if (!__SHALLOW_COMPARE(effectsObj.depArray, depArray)) {
    effectsObj.func = func;
    effectsObj.depArray = depArray;

    effectsObj.func();
  }

  currentlyRenderingComponent.effectHookIndex++;
}