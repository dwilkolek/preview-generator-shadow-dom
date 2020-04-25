import Resolver from './resolver';
import * as styles from './../styles/main.css';
import * as bulmaStyles from 'bulma/css/bulma.min.css';
import Translator from '../repos/translator'
import { SPINNER } from './html-elements-mapping';

class SelectionPreview extends HTMLElement {
    selectionPlan: any = null
    shadow: ShadowRoot;
    connectedCallback() {
        setTimeout(() => {
            let progressiveTranslations = this.getAttribute('progressive-translations') && true;
            try {
                const template: HTMLTemplateElement = this.children[0] as HTMLTemplateElement;
                const data = JSON.parse(template.content.textContent);
                this.shadow = this.attachShadow({ mode: 'open' });

                /*Styles*/
                let style = document.createElement('style');
                style.innerText = styles.toString();
                this.shadow.appendChild(style);

                let container = document.createElement('div');
                container.appendChild(Resolver.for(data[0], true))
                if (progressiveTranslations) {
                    let spinner = document.createElement(SPINNER.selector);
                    this.shadow.appendChild(spinner)
                    container.classList.add('in-progress');
                    Translator.allReadyPromise().then(() => {
                        container.classList.remove('in-progress');
                        this.shadow.removeChild(spinner);
                    });
                }

                this.shadow.appendChild(container);

            } catch (ex) {
                console.error(ex);
            }
        })
    }

    addStyling() {
        let style = document.createElement('style');
        style.innerText = styles.toString();
        this.shadow.appendChild(style);
    }
}

export default SelectionPreview