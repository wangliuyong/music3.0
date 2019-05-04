/* eslint-disable */
export default function getData(el,name,val){
  if(val){
    return el.setAttribute(name,val)
  }else{
    return el.getAttribute(name)
  }

}
