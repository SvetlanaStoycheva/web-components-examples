const template = document.createElement('template');
template.innerHTML = `
<link rel='stylesheet' href='style.css'/>
<div class="pet-card">
      <div class="avatar test">
        <img class="image" />
      </div>
      <div class="details">
        <h2></h2>
        <div class="info">
          <p>
            Breed:
            <slot name="breed" />
          </p>
          <p>
            Age:
            <slot name="age" />
          </p>
        </div>
        <div class="action">
          <button class="btn" id="greet">Say Hi!</button>
          <button class="btn" id="toggle">View Detailes</button>
        </div>
      </div>
  </div>
`;

class DogCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const templateContent = document.importNode(template.content, true);
    this.shadowRoot.appendChild(templateContent);

    this.showInfo = false;
  }

  static get observedAttributes() {
    return ['name', 'avatar'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector('.details h2').innerHTML = this.getAttribute(
      'name'
    );
    this.shadowRoot.querySelector('.avatar img').src = this.getAttribute(
      'avatar'
    );
    this.shadowRoot.querySelector('.avatar img').alt = this.getAttribute(
      'name'
    );
  }

  toggleInfo = () => {
    this.showInfo = !this.showInfo;
    this.shadowRoot.querySelector('.info').style.display = this.showInfo
      ? 'block'
      : 'none';

    this.shadowRoot.querySelector('#toggle').textContent = this.showInfo
      ? 'Hide Details'
      : 'View Details';
  };

  connectedCallback() {
    this.shadowRoot
      .querySelector('#toggle')
      .addEventListener('click', this.toggleInfo);
    this.shadowRoot.querySelector('#greet').addEventListener('click', () => {
      alert('HI there, my name is ' + this.getAttribute('name'));
    });
  }
  disconnectedCallback() {
    this.shadowRoot
      .querySelector('#toggle')
      .removeEventListener('click', this.toggleInfo);
    this.shadowRoot.querySelector('#greet').removeEventListener('click');
  }
}

window.customElements.define('dog-card', DogCard);
