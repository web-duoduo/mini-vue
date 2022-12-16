/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-12-14 20:45:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-15 23:24:46
 */
function createComponentInstance(vnode) {
    var component = {
        vnode: vnode,
        type: vnode.type,
    };
    return component;
}
function setupComponent(instance) {
    // TODO
    // initProps()
    // initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    var component = instance.type;
    var setup = component.setup;
    if (setup) {
        var setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // setupResult
    // function | object
    // TODO function
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var Component = instance.type;
    if (Component.render) {
        instance.render = Component.render;
    }
}

/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-12-14 20:38:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-15 19:17:56
 */
function render(vnode, container) {
    // patch 为了递归处理
    patch(vnode);
}
function patch(vnode, container) {
    processComponent(vnode);
    // 判断是不是element类型
}
function processComponent(vnode, container) {
    var instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render();
    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree);
}

function createVnode(type, props, children) {
    var vnode = {
        type: type,
        props: props,
        children: children
    };
    return vnode;
}

/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-12-14 11:57:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-14 20:39:14
 */
function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            // 先vnode
            // component -> vnode
            // 所有操作都是基于vnode
            var vnode = createVnode(rootComponent);
            render(vnode);
        }
    };
}

/*
 * @Description:
 * @Version:
 * @Autor: jxj
 * @Date: 2022-12-15 22:57:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-15 22:59:29
 */
function h(type, props, children) {
    return createVnode(type, props, children);
}

export { createApp, h };
