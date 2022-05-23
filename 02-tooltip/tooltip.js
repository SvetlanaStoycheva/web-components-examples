const template = document.createElement('template');
//we could link to a separate css file with <link rel="stylesheet" href="style.css" />
template.innerHTML = `
<style>
.alert {
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
  cursor: pointer;
}
.cancel {
    width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  display: none;
}
.tooltip-container {
  display: inline-block;
  position: relative;
  z-index: 2;
}
.notify-container {
  position: absolute;
  bottom: 63%;
  left: 30%;
  z-index: 9;
  width: 300px;
  background: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  border-radius: 6px;
  padding: 1rem;
  transform: scale(0);
  transition: transform 0.5s;
}

</style>

<div class-"tooltip-container">
    <img class="alert" src="./warning.png" alt="" />
    <img class="cancel" src="./delete.png" alt="" />
</div>
<div class="notify-container">
<slot name="message"></slot>
</div>
`;

class ToolTip extends HTMLElement {
  constructor() {
    super();
    //mode:open allows us to access the shadow DOM via the shadow root
    this.attachShadow({ mode: 'open' });
    //we attach the template to the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  showAlert(expandState) {
    const notifyContainerEl = this.shadowRoot.querySelector(
      '.notify-container'
    );
    const alertEl = this.shadowRoot.querySelector('.alert');
    const cancelEl = this.shadowRoot.querySelector('.cancel');

    if (expandState) {
      notifyContainerEl.style.transform = 'scale(1)';
      alertEl.style.display = 'none';
      cancelEl.style.display = 'block';
      expandState = false;
    } else {
      notifyContainerEl.style.transform = 'scale(0)';
      alertEl.style.display = 'block';
      cancelEl.style.display = 'none';
      expandState = true;
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
      this.showAlert(true);
    });
    this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
      this.showAlert(false);
    });

    if (this.getAttribute('tip_background')) {
      this.shadowRoot.querySelector(
        '.notify-container'
      ).style.background = this.getAttribute('tip_background');
    }
    if (this.getAttribute('tip_color')) {
      this.shadowRoot.querySelector(
        '.notify-container'
      ).style.color = this.getAttribute('tip_color');
    }
  }
}

window.customElements.define('tool-tip', ToolTip);
//window.customElements.define('user-card', UserCard);
