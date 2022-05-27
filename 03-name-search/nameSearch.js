const template = document.createElement('template');
template.innerHTML = `
<style>
div{
  margin-top:20px;
  color:green;
}
  </style>


<div>
<p>The Google serch result of your name is 
<a target="_blank" rel="noopener">here</a>
</p>
</div>
`;

class NameSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('a').href = '';
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.shadowRoot.querySelector(
        'a'
      ).href = `https://www.google.com/search?q=${newValue}`;
    }
  }
}

window.customElements.define('name-search', NameSearch);
