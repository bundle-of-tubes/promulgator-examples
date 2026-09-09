'use strict';
import {PageController, PageControllerV2} from '@bundle-of-tubes/stateful-components';
import paginationStyle from './paginationStyle.css' with { type: "css" };

customElements.define("my-pagination-control", class extends PageController {
  DEFAULT_PAGE_SIZE = 27;
  PAGE_SIZE_OPTIONS = [8, 27, 64, 125, 216];
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [paginationStyle];
  }
});

customElements.define("my-pagination-control-v2", class extends PageControllerV2 {
  DEFAULT_PAGE_SIZE = 8;
  PAGE_SIZE_OPTIONS = [8, 16, 32, 64, 128, 256];
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [paginationStyle];
  }
});
