function diff(oldTree,newTree){
    let patches = {}
    let index=0
    // 递归树 比较后的结果放到补丁包中
    walk(oldTree,newTree,index,patches)
    return patches
}

function diffAttr(oldAtrrs,newAttrs){
    let patch = {}
    // 判断老的属性中和新的属性的关系
    for(let key in oldAtrrs){
        if(oldAtrrs[key]!==newAttrs[key]){
            patch[key] = newAttrs[key]
        }
    }
    // 有可能老树中没有新节点的属性
    for(let key in newAttrs){
        if(!oldAtrrs.hasOwnProperty(key)){
            patch[key]= newAttrs[key]
        }
    }
    return patch
}

function diffChildren(oldChildren,newChildren){

}
const ATTRS = 'attrs'

function walk(oldNode,newNode,index,patches){
    let currentPath = [] // 每个元素都有一个补丁对象
    if(oldNode.type === newNode.type){
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props,newNode.props)
        if(Object.keys(attrs).length>0){
            currentPath.push({type:ATTRS,attrs})
        }
        // 如果有儿子节点，则遍历儿子
        diffChildren(oldNode.children,newNode.children)
    }
    console.log(currentPath)
}
export default diff