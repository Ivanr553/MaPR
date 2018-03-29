// import * as  React from 'react'
// import { RouteComponentProps } from 'react-router'

// const s = require('./style')

// import Header from '../Header/Header'

// interface Props extends RouteComponentProps<any> {}
// export default class Studio extends React.Component<Props, any> {

//   constructor(props) {
//     super(props)

//     this.state = {
//       elementList: [

//       ],
//       customElements: [

//       ],
//       styles: [

//       ],
//       elementCount: 0,
//       zoom: 1,
//       prevHeight: null,
//       prevWidth: null
//     }
//   }

//   createInput(data) {
//     return (<input style={data.style} className="custom-input-box" id={data.id}
//       draggable="true" onDrag={(event) => {this.dragEvent(event)}} onDragEnd={(event) => {this.releaseCustomElement(event)}}>
//     </input>)
//   }

//   createLabel(data) {
//     return (<textarea style={data.style} className="custom-label" id={data.id}
//       draggable="true" onDrag={(event) => {this.dragEvent(event)}} onDragEnd={(event) => {this.releaseCustomElement(event)}}>
//     </textarea>)
//   }

//   createCheckBox(data) {
//     return (<input type="checkbox" style={data.style} className="custom-checkbox" id={data.id}
//       draggable="true" onDrag={(event) => {this.dragEvent(event)}} onDragEnd={(event) => {this.releaseCustomElement(event)}}>
//     </input>)
//   }

//   createSignature(data) {
//     return (<div style={data.style} className="custom-signature" id={data.id}
//       draggable="true" onDrag={(event) => {this.dragEvent(event)}} onDragEnd={(event) => {this.releaseCustomElement(event)}}>
//     </div>)
//   }

//   releaseCustomElement(event) {

//     let docBounds = document.getElementById('test-document').getBoundingClientRect();
//     if(event.clientX > docBounds.left && event.clientX < docBounds.right && event.clientY > docBounds.top && event.clientY < docBounds.bottom ) {

//       let newElement = null

//       let id = event.target.id

//       let xCoor = event.clientX - docBounds.left
//       let yCoor = event.clientY - docBounds.top

//       let docWidth = docBounds.right - docBounds.left
//       let docIncrement = docWidth / 8
//       let distance = docBounds.left;

//       for(let i = 0; i <= 8; i++) {
//         let testDistance = xCoor - (docIncrement * i)
//         console.log('x coor', xCoor)
//         console.log('doc increment', docIncrement * i)
//         console.log('distance', distance)
//         console.log('test distance', Math.abs(testDistance))
//         if(distance < Math.abs(testDistance) && i > 1) {
//           xCoor = docIncrement * (i-1)
//           console.log('SET XCOOR:', xCoor)
//           break
//         }
//         distance = testDistance
//       }

//       let newStyle = {
//         top: (yCoor-20) + 'px',
//         left: (xCoor) + 'px'
//       }

//       let currentStyles = this.state.styles
//       currentStyles[id] = newStyle

//       this.setState({styles: currentStyles}, ()=> {console.log(this.state.styles)})

//       let data = {
//         id: id,
//         style: newStyle
//       }

//       if(event.target.className === 'custom-input-box') {
//         newElement = this.createInput(data)
//       }
//       if(event.target.className === 'custom-label') {
//         newElement = this.createLabel(data)
//       }
//       if(event.target.className === 'custom-checkbox') {
//         newElement = this.createCheckBox(data)
//       }
//       if(event.target.className === 'custom-signature') {
//         newElement = this.createSignature(data)
//       }

//       let newCustomElements = this.state.customElements.slice()
//       newCustomElements[id] = newElement
//       this.setState({customElements: newCustomElements})
//     }

//     let trashBounds = document.getElementById('trash-can').getBoundingClientRect()
//     if(event.clientX > (trashBounds.left - (event.target.offsetWidth/2)) && event.clientX < (trashBounds.right - (event.target.offsetWidth/2)) && event.clientY > (trashBounds.top - (event.target.offsetHeight)) && event.clientY < (trashBounds.bottom + (event.target.offsetHeight)) ) {

//       let id = event.target.id

//       let currentStyles = this.state.styles
//       currentStyles.splice(id, 1)
//       this.setState({styles: currentStyles}, ()=> {console.log(this.state.styles)})

//       let currentElements = this.state.customElements
//       delete currentElements[id]
//       this.setState({customElements: currentElements}, ()=> {console.log(this.state.customElements)})

//     }

//     document.getElementById('trash-can').style.opacity = '0'

//   }

//   dragEvent(event) {
//     document.getElementById('trash-can').style.opacity = '1'
//   }

//   releaseElement(event, type) {
//     var bounds = document.getElementById('test-document').getBoundingClientRect();
//     if(event.clientX > bounds.left && event.clientX < bounds.right && event.clientY > bounds.top && event.clientY < bounds.bottom ) {

//       let newElement = null

//       let newId = this.state.elementCount

//       let xCoor = event.clientX - bounds.left
//       let yCoor = event.clientY - bounds.top

//       let docWidth = bounds.right - bounds.left
//       let docIncrement = docWidth / 4
//       let distance = bounds.left;

//       for(let i = 1; i <= 8; i++) {
//         let testDistance = xCoor - (docIncrement * i)
//         if(distance < testDistance) {
//           xCoor = distance
//           break
//         }
//       }

//       let newStyle = {
//         top: (yCoor-20) + 'px',
//         left: (xCoor) + 'px'
//       }

//       let data = {
//         id: newId,
//         style: newStyle
//       }

//       let currentStyles = this.state.styles
//       currentStyles[newId] = newStyle

//       this.setState({
//         styles: currentStyles
//       })

//       if(event.target.className === 'input-box') {
//         newElement = this.createInput(data)
//       }
//       if(event.target.className === 'label') {
//         newElement = this.createLabel(data)
//       }
//       if(event.target.className === 'checkbox') {
//         newElement = this.createCheckBox(data)
//       }
//       if(event.target.className === 'signature') {
//         newElement = this.createSignature(data)
//       }

//       let newCustomElements = this.state.customElements.slice()
//       newCustomElements.push(newElement)
//       this.setState({customElements: newCustomElements})

//       let newCount = this.state.elementCount + 1
//       this.setState({elementCount: newCount})
//     }

//     document.getElementById('trash-can').style.opacity = '0'

//   }

//   zoomIn(event) {
//     let currentZoom = this.state.zoom
//     if(currentZoom == 1.5) {
//       return
//     } else {

//     currentZoom += 0.5

//     let currentHeight = document.getElementById('test-document').clientHeight
//     this.setState({prevHeight: currentHeight})
//     document.getElementById('test-document').style.height = currentHeight * currentZoom + 'px'

//     let currentWidth = document.getElementById('test-document').clientWidth
//     this.setState({prevWidth: currentWidth})
//     document.getElementById('test-document').style.width = currentWidth * currentZoom + 'px'

//     document.getElementById('document-container').scrollTop = document.getElementById('test-document').offsetTop

//     this.setState({zoom: currentZoom})
//     }
//   }

//   zoomOut(event) {
//     let currentZoom = this.state.zoom
//     if(currentZoom == 1) {
//       return
//     } else {

//     let height = this.state.prevHeight
//     document.getElementById('test-document').style.height = height + 'px'

//     let width = this.state.prevWidth
//     document.getElementById('test-document').style.width = width + 'px'

//     currentZoom -= 0.5

//     document.getElementById('document-container').scrollTop = 0

//     this.setState({zoom: currentZoom})
//     }
//   }

//   render() {

//     return(
//       <div className="Studio">

//         <Header />
        
//         <div className="body-container">

//           <div className="meta-bar">
//             <div className="custom-elements-label">Custom Fields</div>
//             <div className="custom-elements">
//               <div draggable="true" onDragEnd={(event) => {this.releaseElement(event)}} className="label">Label</div>
//               <div draggable="true" onDragEnd={(event) => {this.releaseElement(event)}} className="input-box">Input Field</div>
//               <div draggable="true" onDragEnd={(event) => {this.releaseElement(event)}} className="checkbox">Checkbox</div>
//               <div draggable="true" onDragEnd={(event) => {this.releaseElement(event)}} className="signature">Signature</div>
//             </div>
//           </div>

//           <div className="document-container" id="document-container">
//             <div className="test-document" id="test-document">
//               {this.state.customElements}
//             </div>
//           </div>

//         </div>

//         <div className="trash-can" id="trash-can"></div>
        
//         <footer className="footer">
//           <div onClick={(event) => {this.zoomIn(event)}} className="zoom zoom-in">+</div>
//           <div onClick={(event) => {this.zoomOut(event)}} className="zoom zoom-out">-</div>
//         </footer>
//       </div>
//     )
//   }

// }
