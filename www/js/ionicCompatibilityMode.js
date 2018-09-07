(function() {

  let config = {

    // V4 component whitelist.: enter the tag names of the components you'd like to use.
    enabledV4Components: [
      'ion-checkbox',
      'ion-toggle'
    ]

  };

  function initialize() {

    let enabledV1Components = _.difference(v1Components, config.enabledV4Components);

    // Ionic 4 sets visibility:hidden on its components. Since some of the tag name conflict
    // it also sets v1 components we'd like to use to hidden. Need to override this for v1 components.
    let ionicCompatibilityStyleSheet = createCompatibilityStylesheet();
    enabledV1Components.forEach(setVisible.bind(null, ionicCompatibilityStyleSheet ));

    // This is where the heavy lifting takes place — for the v1 components we want to use,
    // we need to prevent Ionic 4 from registering the component/custom element again.
    // Likewise, for the v4 components we want to use, we want to override/unregister the
    // v1 version of that component that AngularJS knows about.
    enabledV1Components.forEach(registerCustomElement);
    config.enabledV4Components.forEach(unregisterAngularDirective);

  }

  let customElementClasses = [];

  // Do not change these. To enable the v4 version of one of these components, add it to the config.
  const v1Components = [
    'ion-app',
    'ion-checkbox',
    'ion-radio',
    'ion-toggle',
    'ion-header-bar',
    'ion-footer-bar',
    'ion-content',
    'ion-list',
    'ion-item',
    'ion-delete-button',
    'ion-reorder-button',
    'ion-option-button',
    'ion-modal-view',
    'ion-nav-view',
    'ion-view',
    'ion-nav-bar',
    'ion-nav-back-button',
    'ion-nav-buttons',
    'ion-nav-title',
    'ion-popover-view',
    'ion-scroll',
    'ion-infinite-scroll',
    'ion-side-menus',
    'ion-side-menu',
    'ion-side-menu-content',
    'ion-slides',
    'ion-slide-page',
    'ion-slide-box',
    'ion-slide',
    'ion-spinner',
    'ion-tabs',
    'ion-tab',
  ];

  function createCompatibilityStylesheet() {
    var styleTag = document.createElement("style");
    styleTag.appendChild(document.createTextNode(""));
    document.head.appendChild(styleTag);
    return styleTag.sheet;
  }

  // Prevents Ionic 4 from registering a custom element by registering an empty element with the same name.
  function registerCustomElement(tagName) {
    customElementClasses[tagName] = class extends HTMLElement {
      constructor() {
        super();
      }
    }

    customElements.define(tagName, customElementClasses[tagName]);
  }

  // Overrides the definition of a component passed to it.
  function unregisterAngularDirective(tagName) {
    let noopDirective = function() { return function () {}; };
    let serviceName = snakeToCamel(tagName) + 'Directive';
    angular.module('ionic').factory(serviceName, noopDirective);
  }

  function setVisible(stylesheet, tagName) {
    stylesheet.insertRule(tagName + " { visibility: visible; }");
  }

  function snakeToCamel(str){
    return str.replace(/(\-\w)/g, function(match){ return match[1].toUpperCase(); });
  }

  initialize();

})();
