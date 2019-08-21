#   实现 Virtual DOM
闲的没事儿，研究了一下虚拟DOM渲染相关的东西，后来自己试着用ES6实现了一下。
### 题目：
给定一个树形结构的JSON，实现VDOM
```
let NodeData = {
            tagName: 'ul',
            props: {'class':'list'},
            children: []
        }

for (let i =0; i< 5; i++) {
    NodeData.children.push({
            tagName: 'li',
            props: {'class':'item'},
            children: [`I am node${i}`,{
                tagName: 'p',
                props: {'class':'child'},
                children: ['I am child']
            }]
    })
}
```  
### 思路：    

1.定义一个父类，将树结构里面可以生成DOM的元素实例化为子类。  
2.定义父类的render函数，来将VDOM渲染成真实的DOM。    
  
___

接下来我们用代码一步一步实现它。首先定义一个Element类，然后定义他的构造函数
```
class Element {

    constructor(props){
  
    }
}
```
接下来我们定义他的初始化方法，也就是实例化为子类的方法。  
（ 这里可能有人会问为什么要实例化为子类？）  
（ 因为子类也要用到render函数来渲染自己，所以要通过二叉树深度优先的遍历方式去把 “子类-->子类的子类-->最后一个子类“  都要实例化为Element的子类。通过__proto__去继承父类的方法。也就是render方法。）
```
class Element {

    constructor(props){
      this.init(props)
    }

    init(props){
        this.tagName = props.tagName || ''
        this.props = props.props || {}
        this.children = props.children || []
        this.children = this.children.map(child => {
            if(typeof child === "object" ){
                child = new Element(child)
            }
            return child
        })
    }

}
```
再来我们定义他的render方法。  
1.创建当前节点  
2.将属性赋值到当前节点上  
3.遍历他的子节点。  
（1）如果是Element的子类，则证明是可以生成DOM的VDOM。然后去递归render方法去创建以及初始化他。  
（2）如果不是Element的子类，则证明是最后节点的值。直接赋值即可。
```
class Element(){

    constructor(props){...}

    init(props){...}

    render(){             
        let ele = document.createElement(this.tagName)        
        for (let propsName in this.props){            
            ele.setAttribute(propsName, this.props[propsName])        
        }        
        this.children.forEach(item => {            
            let childELement = null 
            if( item instanceof Element){
                childELement = item.render()
            }else{
                childELement = document.createTextNode(item)
            }
            ele.appendChild(childELement)
        })
        
        return ele
    }
}
```  
通过定义以上的类，我们的虚拟DOM渲染功能就做完了。可以运行试一下。  

```
let VirtualElement = new Element(NodeData)；

document.body.appendChild(VirtualElement.render())；
```