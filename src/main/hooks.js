import { reconcile } from "./reconcile";

export const INSTANCE_MAP = new Map();

export let currentlyRenderingComponent = { current: null, hookIndex: 0 };

export function useState(defValue) {
  let instanceToken = currentlyRenderingComponent.current;

  const component = INSTANCE_MAP.get(instanceToken);
  
  if (component.__hooks[currentlyRenderingComponent.hookIndex] === undefined) {
    component.__hooks[currentlyRenderingComponent.hookIndex] = { 
      state: defValue
    };
  }
  
  let hookObj = component.__hooks[currentlyRenderingComponent.hookIndex];

  currentlyRenderingComponent.hookIndex++;

  return [
    hookObj.state,
    (newVal) => {    
      const { __dom } = component;
      const { __funcInstance } = __dom;
  
      hookObj.state = newVal;
      
      component.__dom = reconcile(__funcInstance, __dom);
      component.__dom.__funcInstance = __funcInstance;
    }
  ];
};