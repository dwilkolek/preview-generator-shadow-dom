import Resolver from './resolver';
import styles from './../styles/main.css';
import Translator from '../repos/translator'
import htmlElementsMapping from './html-elements-mapping';
console.log(styles.locals)
class SelectionPreview extends HTMLElement {
    constructor() {
        super();
        this.selectionPlan = null;
    }

    connectedCallback() {
        setTimeout(() => {
            let progressiveTranslations = this.getAttribute('progressive-translations') && true;
            try {
                const data = JSON.parse(this.children[0].content.textContent);
                this.shadow = this.attachShadow({mode: 'open'});
                
                /*Styles*/
                let style = document.createElement('style');
                style.innerText = styles.toString();
                this.shadow.appendChild(style);

                let container = document.createElement('div');
                container.appendChild(Resolver.for(data[0], true))
                if (progressiveTranslations) {
                    let spinner = document.createElement(htmlElementsMapping.SPINNER.selector);
                    this.shadow.appendChild(spinner)
                    container.classList.add(styles.locals['in-progress']);
                    Translator.allReadyPromise().then(() => {
                        container.classList.remove(styles.locals['in-progress']);
                        this.shadow.removeChild(spinner);
                    });
                }
                
                this.shadow.appendChild(container)

                // this.shadow.appendChild();
                
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