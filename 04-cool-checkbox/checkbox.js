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
