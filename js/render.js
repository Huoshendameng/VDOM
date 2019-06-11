class Element{

    constructor(props){
        this.init(props)       
    }

    init(props){
        this.tagName = props.tagName || ''
        this.props = props.props || {}
        this.children = props.children || []
        let _child = []
        this.children = this.children.map((child) => {
            if(typeof child == "object" ){
                child = new Element(child)
            }
            return child
        })
    }
    
    render(){
     
        let ele = document.createElement(this.tagName)

        for (let propsName in this.props){
            ele.setAttribute(propsName, this.props[propsName])
        }

        this.children.forEach(function(item ,index){
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
let demoNode = {
    tagName: 'ul',
    props: {'class':'list'},
    children: [
        {
            tagName: 'li',
            props: {'class':'item'},
            children: ['Three Kindom']
        },
        {
            tagName: 'li',
            props: {'class':'item'},
            children: ['START GAME']
        }
    ]
}

let demoElement = new Element(demoNode)
document.body.appendChild(demoElement.render())