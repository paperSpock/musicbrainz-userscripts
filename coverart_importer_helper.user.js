// ==UserScript==
// @name           Set Cover Art Type Automatically
// @description    Automatically open file picker and set cover art type when adding cover art
// @version        2020.12.17.1
// @namespace      https://github.com/paperSpock/musicbrainz-userscripts
// @downloadURL    https://raw.github.com/paperSpock/musicbrainz-userscripts/master/coverart_importer_helper.user.js
// @updateURL      https://raw.github.com/paperSpock/musicbrainz-userscripts/master/coverart_importer_helper.user.js
// @include        /^https?://musicbrainz.org/release/(?:.{36})/(:?add-cover-art)+$/
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @icon           https://raw.githubusercontent.com/paperSpock/musicbrainz-userscripts/master/assets/images/Musicbrainz_import_logo.png
// @grant          unsafeWindow
// ==/UserScript==

// prevent JQuery conflicts, see http://wiki.greasespot.net/@grant
this.$ = this.jQuery = jQuery.noConflict(true);

if (!unsafeWindow) unsafeWindow = window;

(function() {
  'use strict';

  $(document).ready(function () {
    var fileInputButton = document.querySelector("fileinput-button")
    if (fileInputButton) {
        fileInputButton.click();
        console.log("success!");
    }
    
    const targetNode = document.querySelector('table.with-formdata tbody');

    // Options for the observer (which mutations to observe)
    const config = {childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
       mutationsList.forEach(function(mutation) {
         for (var i = 0; i < mutation.addedNodes.length; i++)
           console.log("new cover art!");
       })

    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    observer.disconnect();
  })();
})();