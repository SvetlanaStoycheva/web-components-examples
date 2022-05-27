const template = document.createElement('template');
template.innerHTML = `
<style>
label{
    color: hotpink
}
</style>

<input type="checkbox" id="checkbox" />
    <label for="checkbox"><slot></slot></label>`;

class CoolCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  //it is best to do all the initial DOM manipulations and set up in the connectedCallback. Because this function runs right after the custom element is defined and then placed in the DOM. So it is the ideal place to set up everything that the component needs at the beginning, it's initial state so to speak. So in this function we set the element's innerHTML to be the input.
  connectedCallback() {
    const templateContent = document.importNode(template.content, true);
    this.shadowRoot.appendChild(templateContent);
  }
}
customElements.define('cool-checkbox', CoolCheckbox);

//<slot> is a place in the template that we allow the user to fill with content. We can place it wherever we want in the template and then we put something between the custom tags. It can be text like in this case but it can be any valid html.

//////////////////////// Attributes and Properties
//If we want to set the name of the lables via attributes instead of slots
<cool-checkbox lable='Check mate'></cool-checkbox>;
//we don't get automatically property lable on the corresponding JS object. We need to get it with getAtttribute
connectedCallback() {
    ...
    
    this.label = this.getAttribute('label')
  }

//but the connectedCallback runs only once when the elemnt is incerted into the DOM. What if the user changes the attribute. That's why we need to set up:
static get observedAttributes(){
  return ['label']
}
//this methods fires when one of our observed attributes changes
attributeChangedCallback(attrName, oldValue, newValue){
  if(newValue !== oldValue){
    this[attrName]=newValue
  }
}

//but what about the other direction. If we use JS to change the property directly, we want the attribute in the html to change too. And then we want the text on the page to change. We use custom getter and setter for our property. After that the attributes and the properties are wired up, they stay in-synced and they behave as expected.

get label(){
  return this.getAttribute('label')
}

set label (newValue){
  if(newValue !== null){
    this.setAttribute('label', newValue);
    this.shadowRoot.querySelector('label').innerHTML = newValue;
  }else {
    this.removeAttribute('label');
  }
}

/////////////////// Piercing the shadow boundery
//Another way to let the user the change the content and behavior of our web component is via piercing the shadow boundary. The shadow DOM and the light DOM are separate but there are controlled ways to let information to leak through. 

//In <styles> we can use :host sudo selector, it targets the host element that in our case is our cool-checkbox custom tag. 


///////////////Sending information back up to the user via events
