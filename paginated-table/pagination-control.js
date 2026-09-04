'use strict';
import {PageController} from '@bundle-of-tubes/stateful-components';
import paginationStyle from './paginationStyle.css' with { type: "css" };

customElements.define("my-pagination-control", class extends PageController {
  DEFAULT_PAGE_SIZE = 27;
  PAGE_SIZE_OPTIONS = [8, 27, 64, 125, 216];
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [paginationStyle];
  }
});
