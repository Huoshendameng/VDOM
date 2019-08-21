class Element {
    constructor (props) {
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
    render(){             
        let ele = document.createElement(this.tagName)        
        for (const propsName in this.props){            
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