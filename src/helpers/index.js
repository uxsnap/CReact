export const __RENDER_OUTLINE = '1px solid #e3e4e0';

let __SHOW_LOGS = false;

export const __RERENDER_HELPER = (dom, removeOutlineTime) => {
    if (dom && dom.style && removeOutlineTime) {
        const prevOutline = dom.style.outline || '';

        dom.style.outline = '1px solid #e3e4e0';
        setTimeout(() => {
            dom.style.outline = prevOutline; 
        }, removeOutlineTime);
    }
};


export const __LOG = (text) => {
    __SHOW_LOGS && console.log(text);
};