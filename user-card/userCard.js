//create template
const template = document.createElement('template');
template.innerHTML = `
    <style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}

	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
	}
  </style>
  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

//create a custom Element
class UserCard extends HTMLElement {
  constructor() {
    //call supper method in order to call the constructor method of the class that we are extending, the HTMLElement class
    super();

    this.showInfo = true;

    //in order to encapsulate our web component we create a shadow DOM
    this.attachShadow({ mode: 'open' });
    //we add our template to the shadow root
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    //from now on to select elements from our web component we use shadowRoot
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText - 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText - 'Show Info';
    }
  }

  //add eventListener to the toggle button to hide info; We put it in the lifecicle method called connectedCallback. It is called every time an element is inserted into the DOM.
  connectedCallback() {
    this.shadowRoot
      .querySelector('#toggle-info')
      .addEventListener('click', () => this.toggleInfo());
  }
  //remove the eventListener
  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

//define the custom Element; it takes in the name of the tag and the class that we want to cannect it to.
window.customElements.define('user-card', UserCard);
