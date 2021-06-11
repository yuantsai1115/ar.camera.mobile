
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
  typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
  (global = global || self, factory(global.bimU = {}, global.THREE));
}(this, (function (exports, THREE$1) { 'use strict';

  var version = "0.0.23-alpha6";

  /**
   * @author mrdoob / http://mrdoob.com/
   */

  var Stats = function () {

  	var mode = 0;

  	var container = document.createElement( 'div' );
  	container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
  	container.addEventListener( 'click', function ( event ) {

  		event.preventDefault();
  		showPanel( ++ mode % container.children.length );

  	}, false );

  	//

  	function addPanel( panel ) {

  		container.appendChild( panel.dom );
  		return panel;

  	}

  	function showPanel( id ) {

  		for ( var i = 0; i < container.children.length; i ++ ) {

  			container.children[ i ].style.display = i === id ? 'block' : 'none';

  		}

  		mode = id;

  	}

  	//

  	var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;

  	var fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );
  	var msPanel = addPanel( new Stats.Panel( 'MS', '#0f0', '#020' ) );

  	if ( self.performance && self.performance.memory ) {

  		var memPanel = addPanel( new Stats.Panel( 'MB', '#f08', '#201' ) );

  	}

  	showPanel( 0 );

  	return {

  		REVISION: 16,

  		dom: container,

  		addPanel: addPanel,
  		showPanel: showPanel,

  		begin: function () {

  			beginTime = ( performance || Date ).now();

  		},

  		end: function () {

  			frames ++;

  			var time = ( performance || Date ).now();

  			msPanel.update( time - beginTime, 200 );

  			if ( time >= prevTime + 1000 ) {

  				fpsPanel.update( ( frames * 1000 ) / ( time - prevTime ), 100 );

  				prevTime = time;
  				frames = 0;

  				if ( memPanel ) {

  					var memory = performance.memory;
  					memPanel.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );

  				}

  			}

  			return time;

  		},

  		update: function () {

  			beginTime = this.end();

  		},

  		// Backwards Compatibility

  		domElement: container,
  		setMode: showPanel

  	};

  };

  Stats.Panel = function ( name, fg, bg ) {

  	var min = Infinity, max = 0, round = Math.round;
  	var PR = round( window.devicePixelRatio || 1 );

  	var WIDTH = 80 * PR, HEIGHT = 48 * PR,
  			TEXT_X = 3 * PR, TEXT_Y = 2 * PR,
  			GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR,
  			GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;

  	var canvas = document.createElement( 'canvas' );
  	canvas.width = WIDTH;
  	canvas.height = HEIGHT;
  	canvas.style.cssText = 'width:80px;height:48px';

  	var context = canvas.getContext( '2d' );
  	context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
  	context.textBaseline = 'top';

  	context.fillStyle = bg;
  	context.fillRect( 0, 0, WIDTH, HEIGHT );

  	context.fillStyle = fg;
  	context.fillText( name, TEXT_X, TEXT_Y );
  	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

  	context.fillStyle = bg;
  	context.globalAlpha = 0.9;
  	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

  	return {

  		dom: canvas,

  		update: function ( value, maxValue ) {

  			min = Math.min( min, value );
  			max = Math.max( max, value );

  			context.fillStyle = bg;
  			context.globalAlpha = 1;
  			context.fillRect( 0, 0, WIDTH, GRAPH_Y );
  			context.fillStyle = fg;
  			context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );

  			context.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );

  			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );

  			context.fillStyle = bg;
  			context.globalAlpha = 0.9;
  			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );

  		}

  	};

  };

  var defaultBaseUrl = "https://viewer.bimu.io/rest/api/v1";
  var minThreeJsVersion = 113;
  var maxThreeJsVersion = 113;
  var minContainerSize = 300;
  var materializeScriptPath = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js";
  var materializeCssPath = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
  var materialIconsPath = "https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css";
  var defaultButtonColor = "#1565C0";
  var maxNumOfPropertySelector = 5;
  var GLOBAL_CONFIGS = {
  	defaultBaseUrl: defaultBaseUrl,
  	minThreeJsVersion: minThreeJsVersion,
  	maxThreeJsVersion: maxThreeJsVersion,
  	minContainerSize: minContainerSize,
  	materializeScriptPath: materializeScriptPath,
  	materializeCssPath: materializeCssPath,
  	materialIconsPath: materialIconsPath,
  	defaultButtonColor: defaultButtonColor,
  	maxNumOfPropertySelector: maxNumOfPropertySelector
  };

  var materializeCssString = "/* This file only includes CSS classes used by bimU.io */\n/*!\n * Materialize v1.0.0 (http://materializecss.com)\n * Copyright 2014-2017 Materialize\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\n */\n  /* 2dp elevation modified*/\n  .z-depth-1, nav, .card-panel, .card, .toast, .btn, .btn-large, .btn-small, .btn-floating, .dropdown-content, .collapsible, .sidenav {\n    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\n            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);\n  }\n  \n  .z-depth-1-half, .btn:hover, .btn-large:hover, .btn-small:hover, .btn-floating:hover {\n    -webkit-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);\n            box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);\n  }\n  \n  /* 24dp elevation */\n  .z-depth-5, .modal {\n    -webkit-box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);\n            box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);\n  }\n\n  .divider {\n    height: 1px;\n    overflow: hidden;\n    background-color: #e0e0e0;\n  }\n  \n  .bimU-table {\n    width: 100%;\n    display: table;\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n  \n  .bimU-table.striped tr {\n    border-bottom: none;\n  }\n  \n  .bimU-table.striped > tbody > tr:nth-child(odd) {\n    background-color: rgba(242, 242, 242, 0.5);\n  }\n  \n  .bimU-table.striped > tbody > tr > td {\n    border-radius: 0;\n  }\n  \n  .bimU-table.highlight > tbody > tr {\n    -webkit-transition: background-color .25s ease;\n    transition: background-color .25s ease;\n  }\n  \n  .bimU-table.highlight > tbody > tr:hover {\n    background-color: rgba(242, 242, 242, 0.5);\n  }\n  \n  .bimU-table.centered thead tr th, .bimU-table.centered tbody tr td {\n    text-align: center;\n  }\n  \n  .bimU-table tr {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n  }\n  \n  .bimU-table td, .bimU-table th {\n    padding: 10px 5px;\n    display: table-cell;\n    text-align: left;\n    vertical-align: middle;\n    border-radius: 2px;\n  }\n\n  .bimU-table th {\n    font-weight: 500;\n  }\n\n  .property-group-header {\n    background: grey !important;\n    color: white !important;\n  }\n  \n  .material-tooltip {\n    padding: 10px 8px;\n    font-size: 1rem;\n    z-index: 2000;\n    background-color: transparent;\n    border-radius: 2px;\n    color: #fff;\n    min-height: 36px;\n    line-height: 120%;\n    opacity: 0;\n    position: absolute;\n    text-align: center;\n    max-width: calc(100% - 4px);\n    overflow: hidden;\n    left: 0;\n    top: 0;\n    pointer-events: none;\n    visibility: hidden;\n    background-color: #323232;\n    box-sizing: border-box; /* Added by bimU.io */\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif; /* Added by bimU.io */\n  }\n  \n  .btn, .btn-large, .btn-small,\n  .btn-flat {\n    border: none;\n    border-radius: 2px;\n    display: inline-block;\n    height: 36px;\n    line-height: 36px;\n    padding: 0 16px;\n    text-transform: uppercase;\n    vertical-align: middle;\n    -webkit-tap-highlight-color: transparent;\n  }\n  \n  .btn, .btn-large, .btn-small,\n  .btn-floating,\n  .btn-large,\n  .btn-small,\n  .btn-flat {\n    font-size: 14px;\n    outline: 0;\n  }\n  \n  .btn i, .btn-large i, .btn-small i,\n  .btn-floating i,\n  .btn-large i,\n  .btn-small i,\n  .btn-flat i {\n    font-size: 1.3rem;\n    line-height: inherit;\n  }\n  \n  .btn:focus, .btn-large:focus, .btn-small:focus,\n  .btn-floating:focus {\n    background-color: #1d7d74;\n  }\n  \n  .btn-floating {\n    display: inline-block;\n    color: #fff;\n    position: relative;\n    overflow: hidden;\n    z-index: 1;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    padding: 0;\n    background-color: #26a69a;\n    border-radius: 50%;\n    -webkit-transition: background-color .3s;\n    transition: background-color .3s;\n    cursor: pointer;\n    vertical-align: middle;\n  }\n  \n  .btn-floating:hover {\n    background-color: #26a69a;\n  }\n  \n  .btn-floating:before {\n    border-radius: 0;\n  }\n  \n  .btn-floating.btn-large {\n    width: 56px;\n    height: 56px;\n    padding: 0;\n  }\n  \n  .btn-floating.btn-large.halfway-fab {\n    bottom: -28px;\n  }\n  \n  .btn-floating.btn-large i {\n    line-height: 56px;\n  }\n  \n  .btn-floating.btn-small {\n    width: 32.4px;\n    height: 32.4px;\n  }\n  \n  .btn-floating.btn-small.halfway-fab {\n    bottom: -16.2px;\n  }\n  \n  .btn-floating.btn-small i {\n    line-height: 32.4px;\n  }\n  \n  .btn-floating.halfway-fab {\n    position: absolute;\n    right: 24px;\n    bottom: -20px;\n  }\n  \n  .btn-floating.halfway-fab.left {\n    right: auto;\n    left: 24px;\n  }\n  \n  .btn-floating i {\n    width: inherit;\n    display: inline-block;\n    text-align: center;\n    color: #fff;\n    font-size: 1.6rem;\n    line-height: 40px;\n  }\n  \n  button.btn-floating {\n    border: none;\n  }\n  \n  .btn-flat {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    background-color: transparent;\n    color: #343434;\n    cursor: pointer;\n    -webkit-transition: background-color .2s;\n    transition: background-color .2s;\n  }\n  \n  .btn-flat:focus, .btn-flat:hover {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n  \n  .btn-flat:focus {\n    background-color: rgba(0, 0, 0, 0.1);\n  }\n  \n  .btn-flat.disabled, .btn-flat.btn-flat[disabled] {\n    background-color: transparent !important;\n    color: #b3b2b2 !important;\n    cursor: default;\n  }\n  \n  .dropdown-content {\n    background-color: #fff;\n    margin: 0;\n    display: none;\n    min-width: 100px;\n    overflow-y: auto;\n    opacity: 0;\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 9999;\n    -webkit-transform-origin: 0 0;\n            transform-origin: 0 0;\n    list-style-type: none; /* Added by bimU.io */\n    padding-left: 0; /* Added by bimU.io */\n  }\n  \n  .dropdown-content:focus {\n    outline: 0;\n  }\n  \n  .dropdown-content li {\n    clear: both;\n    color: rgba(0, 0, 0, 0.87);\n    cursor: pointer;\n    min-height: 20px; /* Modified by bimU.io */\n    line-height: 1.5rem;\n    width: 100%;\n    text-align: left;\n    list-style-type: none; /* Added by bimU.io */    \n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif; /* Added by bimU.io */\n  }\n  \n  .dropdown-content li:hover, .dropdown-content li.active {\n    background-color: #eee;\n  }\n  \n  .dropdown-content li:focus {\n    outline: none;\n  }\n  \n  .dropdown-content li.divider {\n    min-height: 0;\n    height: 1px;\n  }\n  \n  .dropdown-content li > a, .dropdown-content li > span {\n    font-size: 16px;\n    color: #000000; /* Modified by bimU.io */\n    display: block;\n    line-height: 22px;\n    padding: 10px 16px; /* Modified by bimU.io */\n    text-decoration: none; /* Added by bimU.io */\n  }\n  \n  .dropdown-content li > span > label {\n    top: 1px;\n    left: 0;\n    height: 18px;\n  }\n  \n  .dropdown-content li > a > i {\n    height: inherit;\n    line-height: inherit;\n    float: left;\n    margin: 0 24px 0 0;\n    width: 24px;\n  }\n  \n  .dropdown-trigger {\n    cursor: pointer;\n  }\n  \n  .modal {\n    display: none;\n    position: fixed;\n    left: 0;\n    right: 0;\n    background-color: #fafafa;\n    padding: 0;\n    max-height: 70%;\n    width: 55%;\n    margin: auto;\n    overflow-y: auto;\n    border-radius: 2px;\n    will-change: top, opacity;\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif; /* Added by bimU.io */\n  }\n  \n  .modal:focus {\n    outline: none;\n  }\n  \n  @media only screen and (max-width: 992px) {\n    .modal {\n      width: 80%;\n    }\n  }\n  \n  .modal h1, .modal h2, .modal h3, .modal h4 {\n    margin-top: 0;\n  }\n  \n  .modal .modal-content {\n    padding: 24px;\n  }\n  \n  .modal .modal-close {\n    cursor: pointer;    \n  }\n\n  .modal .btn-flat { /* Added by bimU.io */\n    text-decoration: none;\n  }\n  \n  .modal .modal-footer {\n    border-radius: 0 0 2px 2px;\n    background-color: #fafafa;\n    padding: 4px 6px;\n    height: 56px;\n    width: 100%;\n    text-align: right;\n    box-sizing: border-box; /* Added by bimU.io */\n  }\n  \n  .modal .modal-footer .btn, .modal .modal-footer .btn-large, .modal .modal-footer .btn-small, .modal .modal-footer .btn-flat {\n    margin: 6px 0;\n  }\n  \n  .modal-overlay {\n    position: fixed;\n    z-index: 999;\n    top: -25%;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    height: 125%;\n    width: 100%;\n    background: #000;\n    display: none;\n    will-change: opacity;\n  }\n  \n  .modal.modal-fixed-footer {\n    padding: 0;\n    height: 70%;\n  }\n  \n  .modal.modal-fixed-footer .modal-content {\n    position: absolute;\n    height: calc(100% - 56px);\n    max-height: 100%;\n    width: 100%;\n    overflow-y: auto;\n  }\n  \n  .modal.modal-fixed-footer .modal-footer {\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    position: absolute;\n    bottom: 0;\n  }\n  \n  .modal.bottom-sheet {\n    top: auto;\n    bottom: -100%;\n    margin: 0;\n    width: 100%;\n    max-height: 45%;\n    border-radius: 0;\n    will-change: bottom, opacity;\n  }\n  \n  .pulse {\n    overflow: visible;\n    position: relative;\n  }\n  \n  .pulse::before {\n    content: '';\n    display: block;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    background-color: inherit;\n    border-radius: inherit;\n    -webkit-transition: opacity .3s, -webkit-transform .3s;\n    transition: opacity .3s, -webkit-transform .3s;\n    transition: opacity .3s, transform .3s;\n    transition: opacity .3s, transform .3s, -webkit-transform .3s;\n    -webkit-animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n            animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n    z-index: -1;\n  }\n  \n  @-webkit-keyframes pulse-animation {\n    0% {\n      opacity: 1;\n      -webkit-transform: scale(1);\n              transform: scale(1);\n    }\n    50% {\n      opacity: 0;\n      -webkit-transform: scale(1.5);\n              transform: scale(1.5);\n    }\n    100% {\n      opacity: 0;\n      -webkit-transform: scale(1.5);\n              transform: scale(1.5);\n    }\n  }\n  \n  @keyframes pulse-animation {\n    0% {\n      opacity: 1;\n      -webkit-transform: scale(1);\n              transform: scale(1);\n    }\n    50% {\n      opacity: 0;\n      -webkit-transform: scale(1.5);\n              transform: scale(1.5);\n    }\n    100% {\n      opacity: 0;\n      -webkit-transform: scale(1.5);\n              transform: scale(1.5);\n    }\n  }";

  /**
   * Enum for events.
   * @readonly
   * @class EventsEnum
   * @property {string} ON_MODEL_LOADED - .
   * @property {string} ON_MODEL_PROGRESS - .
   * @property {string} ON_MODEL_ERROR - .
   * @property {string} ON_VIEWER_INITIALIZED - .
   * @property {string} ON_VIEWER_STATUS_CHANGED - .
   * @property {string} ON_VIEWER_ERROR - .
   * @property {string} ON_SELECTION_CHANGED - .
   * @property {string} ON_FULL_SCREEN_ENABLED - .
   * @property {string} ON_FULL_SCREEN_DISABLED - .
   * @property {string} FULL_SCREEN_UNSUPPORTED - .
   * @property {string} ON_AR_EXTENTS_UPDATED - .
   * @property {string} ON_AR_HIT_TEST_RESULT_FOUND - .
   * @property {string} ON_AR_HIT_TEST_RESULT_LOST - .
   */
  const EventsEnum = Object.freeze({
      ON_MODEL_LOADED: "onModelLoaded",
      ON_MODEL_PROGRESS: "onModelProgress",
      ON_MODEL_ERROR: "onModelError",
      ON_VIEWER_INITIALIZED: "onViewerInitialized",
      ON_VIEWER_STATUS_CHANGED: "onViewerStatusChanged",
      ON_VIEWER_ERROR: "onViewerError",
      ON_SELECTION_CHANGED: "onSelectionChanged",
      ON_FULL_SCREEN_ENABLED: "onFullScreenEnabled",
      ON_FULL_SCREEN_DISABLED: "onFullScreenDisabled",
      FULL_SCREEN_UNSUPPORTED: "onFullScreenUnsupported",
      ON_AR_EXTENTS_UPDATED: "onARExtentsUpdated",
      ON_AR_HIT_TEST_RESULT_FOUND: "onARHitTestResultFound",
      ON_AR_HIT_TEST_RESULT_LOST: "onARHitTestResult",
  });

  const CameraTypesEnum = Object.freeze({
      PERSPECTIVE: "perspective",
      ORTHOGRAPHIC: "orthographic"
  });

  /**
   * Enum for aggregate functions that perform a calculation on property values and return a single value.
   * @readonly
   * @class AggregateFunctionsEnum
   * @property {string} AVG - Calculate the average value of a numeric property.
   * @property {string} COUNT - Get the number of matching elements.
   * @property {string} MAX - Get the largest value of a numeric property.
   * @property {string} MIN - Get the smallest value of a numeric property.
   * @property {string} SUM - Calculate the total sum of a numeric property.
   */
  const AggregateFunctionsEnum = Object.freeze({
      AVG: "AVG",
      COUNT: "COUNT",
      MAX: "MAX",
      MIN: "MIN",
      SUM: "SUM",
  });

  class MiscHelper {
      // https://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
      // https://benohead.com/blog/2017/12/06/cross-domain-cross-browser-web-workers/#Cross_domain_workers
      static createWorkerFromString(javaScriptString) {
          // URL.createObjectURL
          window.URL = window.URL || window.webkitURL;

          var blob;
          try {
              blob = new Blob([javaScriptString], {type: 'application/javascript'});
          } catch (e) { // Backwards-compatibility
              window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
              blob = new BlobBuilder();
              blob.append(response);
              blob = blob.getBlob();
          }
          return new Worker(URL.createObjectURL(blob));
      }

      static isFullScreen() {
          return document.fullscreenElement != null || document.webkitFullscreenElement != null;
      }

      static addExternalScript(filename, onLoaded) {
          var head = document.getElementsByTagName('head')[0];
          
          var script = document.createElement('script');
          script.onload = onLoaded;
          script.src = filename;
          script.type = 'text/javascript';
          
          head.append(script);
      }

      static addExternalCss(filename, isIcon){
          var head = document.getElementsByTagName('head')[0];
          
          var style = document.createElement('link');
          style.href = filename;
          if(!isIcon) style.type = 'text/css';
          style.rel = 'stylesheet';
          head.append(style);
      }

      static addCssText(css){
          var head = document.getElementsByTagName('head')[0];
          
          var styleSheet = document.createElement("style");
          styleSheet.type = "text/css";
          styleSheet.innerText = css;
          head.appendChild(styleSheet);
      }
      
      static parseJwt (token) {
          var base64Url = token.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      
          return JSON.parse(jsonPayload);
      }

      static isMobileDevice() {
          return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
      }

      static isSafariMobile() {
          return this.isSafari() && this.isIOS;
      }

      // This somehow doesn't work in our codebase on iOS 
      static isIOS() {
          let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          return iOS;
      }

      static isMacOS() {
          let macOS = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
          return macOS;
      }

      static isSafari() {
          let isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
          return isSafari;
      }

      static arrayGroupBy(array, prop) {
          return array.reduce((groups, item) => {
              let val = item[prop];
              groups[val] = groups[val] || [];
              groups[val].push(item);
              return groups;
          }, {});
      }

      static isFunction(obj) {
          return !!(obj && obj.constructor && obj.call && obj.apply);
      };
  }

  // This file has been edited by HTC to work around importing UMD into ESM
  // Modified from https://github.com/gkjohnson/three-mesh-bvh

  // (function (global, factory) {
  // 	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
  // 	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
  // 	(global = global || self, factory(global.MeshBVHLib = global.MeshBVHLib || {}, global.THREE));
  // }(this, function (exports, THREE) { 'use strict';

  // Above are commented by HTC

  	// Split strategy constants
  	const CENTER = 0;
  	const AVERAGE = 1;
  	const SAH = 2;

  	class MeshBVHNode {

  		constructor() {

  			// internal nodes have boundingData, left, right, and splitAxis
  			// leaf nodes have offset and count (referring to primitives in the mesh geometry)

  		}

  	}

  	// Returns a Float32Array representing the bounds data for box.
  	function boxToArray( bx ) {

  		const arr = new Float32Array( 6 );

  		arr[ 0 ] = bx.min.x;
  		arr[ 1 ] = bx.min.y;
  		arr[ 2 ] = bx.min.z;

  		arr[ 3 ] = bx.max.x;
  		arr[ 4 ] = bx.max.y;
  		arr[ 5 ] = bx.max.z;

  		return arr;

  	}

  	function arrayToBox( arr, target ) {

  		target.min.x = arr[ 0 ];
  		target.min.y = arr[ 1 ];
  		target.min.z = arr[ 2 ];

  		target.max.x = arr[ 3 ];
  		target.max.y = arr[ 4 ];
  		target.max.z = arr[ 5 ];

  		return target;

  	}

  	function getLongestEdgeIndex( bounds ) {

  		let splitDimIdx = - 1;
  		let splitDist = - Infinity;

  		for ( let i = 0; i < 3; i ++ ) {

  			const dist = bounds[ i + 3 ] - bounds[ i ];
  			if ( dist > splitDist ) {

  				splitDist = dist;
  				splitDimIdx = i;

  			}

  		}

  		return splitDimIdx;

  	}

  	const xyzFields = [ 'x', 'y', 'z' ];
  	const boxTemp = new THREE.Box3();

  	function ensureIndex( geo ) {

  		if ( ! geo.index ) {

  			const vertexCount = geo.attributes.position.count;
  			const index = new ( vertexCount > 65535 ? Uint32Array : Uint16Array )( vertexCount );
  			geo.setIndex( new THREE.BufferAttribute( index, 1 ) );

  			for ( let i = 0; i < vertexCount; i ++ ) {

  				index[ i ] = i;

  			}

  		}

  	}

  	// Computes the set of { offset, count } ranges which need independent BVH roots. Each
  	// region in the geometry index that belongs to a different set of material groups requires
  	// a separate BVH root, so that triangles indices belonging to one group never get swapped
  	// with triangle indices belongs to another group. For example, if the groups were like this:
  	//
  	// [-------------------------------------------------------------]
  	// |__________________|
  	//   g0 = [0, 20]  |______________________||_____________________|
  	//                      g1 = [16, 40]           g2 = [41, 60]
  	//
  	// we would need four BVH roots: [0, 15], [16, 20], [21, 40], [41, 60].
  	function getRootIndexRanges( geo ) {

  		if ( ! geo.groups || ! geo.groups.length ) {

  			return [ { offset: 0, count: geo.index.count / 3 } ];

  		}

  		const ranges = [];
  		const rangeBoundaries = new Set();
  		for ( const group of geo.groups ) {

  			rangeBoundaries.add( group.start );
  			rangeBoundaries.add( group.start + group.count );

  		}

  		// note that if you don't pass in a comparator, it sorts them lexicographically as strings :-(
  		const sortedBoundaries = Array.from( rangeBoundaries.values() ).sort( ( a, b ) => a - b );
  		for ( let i = 0; i < sortedBoundaries.length - 1; i ++ ) {

  			const start = sortedBoundaries[ i ], end = sortedBoundaries[ i + 1 ];
  			ranges.push( { offset: ( start / 3 ), count: ( end - start ) / 3 } );

  		}
  		return ranges;

  	}

  	// computes the union of the bounds of all of the given triangles and puts the resulting box in target. If
  	// centroidTarget is provided then a bounding box is computed for the centroids of the triangles, as well.
  	// These are computed together to avoid redundant accesses to bounds array.
  	function getBounds( triangleBounds, offset, count, target, centroidTarget = null ) {

  		let minx = Infinity;
  		let miny = Infinity;
  		let minz = Infinity;
  		let maxx = - Infinity;
  		let maxy = - Infinity;
  		let maxz = - Infinity;

  		let cminx = Infinity;
  		let cminy = Infinity;
  		let cminz = Infinity;
  		let cmaxx = - Infinity;
  		let cmaxy = - Infinity;
  		let cmaxz = - Infinity;

  		const includeCentroid = centroidTarget !== null;
  		for ( let i = offset * 6, end = ( offset + count ) * 6; i < end; i += 6 ) {

  			const cx = triangleBounds[ i + 0 ];
  			const hx = triangleBounds[ i + 1 ];
  			const lx = cx - hx;
  			const rx = cx + hx;
  			if ( lx < minx ) minx = lx;
  			if ( rx > maxx ) maxx = rx;
  			if ( includeCentroid && cx < cminx ) cminx = cx;
  			if ( includeCentroid && cx > cmaxx ) cmaxx = cx;

  			const cy = triangleBounds[ i + 2 ];
  			const hy = triangleBounds[ i + 3 ];
  			const ly = cy - hy;
  			const ry = cy + hy;
  			if ( ly < miny ) miny = ly;
  			if ( ry > maxy ) maxy = ry;
  			if ( includeCentroid && cy < cminy ) cminy = cy;
  			if ( includeCentroid && cy > cmaxy ) cmaxy = cy;

  			const cz = triangleBounds[ i + 4 ];
  			const hz = triangleBounds[ i + 5 ];
  			const lz = cz - hz;
  			const rz = cz + hz;
  			if ( lz < minz ) minz = lz;
  			if ( rz > maxz ) maxz = rz;
  			if ( includeCentroid && cz < cminz ) cminz = cz;
  			if ( includeCentroid && cz > cmaxz ) cmaxz = cz;

  		}

  		target[ 0 ] = minx;
  		target[ 1 ] = miny;
  		target[ 2 ] = minz;

  		target[ 3 ] = maxx;
  		target[ 4 ] = maxy;
  		target[ 5 ] = maxz;

  		if ( includeCentroid ) {

  			centroidTarget[ 0 ] = cminx;
  			centroidTarget[ 1 ] = cminy;
  			centroidTarget[ 2 ] = cminz;

  			centroidTarget[ 3 ] = cmaxx;
  			centroidTarget[ 4 ] = cmaxy;
  			centroidTarget[ 5 ] = cmaxz;

  		}

  	}

  	// A stand alone function for retrieving the centroid bounds.
  	function getCentroidBounds( triangleBounds, offset, count, centroidTarget ) {

  		let cminx = Infinity;
  		let cminy = Infinity;
  		let cminz = Infinity;
  		let cmaxx = - Infinity;
  		let cmaxy = - Infinity;
  		let cmaxz = - Infinity;

  		for ( let i = offset * 6, end = ( offset + count ) * 6; i < end; i += 6 ) {

  			const cx = triangleBounds[ i + 0 ];
  			if ( cx < cminx ) cminx = cx;
  			if ( cx > cmaxx ) cmaxx = cx;

  			const cy = triangleBounds[ i + 2 ];
  			if ( cy < cminy ) cminy = cy;
  			if ( cy > cmaxy ) cmaxy = cy;

  			const cz = triangleBounds[ i + 4 ];
  			if ( cz < cminz ) cminz = cz;
  			if ( cz > cmaxz ) cmaxz = cz;

  		}

  		centroidTarget[ 0 ] = cminx;
  		centroidTarget[ 1 ] = cminy;
  		centroidTarget[ 2 ] = cminz;

  		centroidTarget[ 3 ] = cmaxx;
  		centroidTarget[ 4 ] = cmaxy;
  		centroidTarget[ 5 ] = cmaxz;

  	}


  	// reorders `tris` such that for `count` elements after `offset`, elements on the left side of the split
  	// will be on the left and elements on the right side of the split will be on the right. returns the index
  	// of the first element on the right side, or offset + count if there are no elements on the right side.
  	function partition( index, triangleBounds, sahPlanes, offset, count, split ) {

  		let left = offset;
  		let right = offset + count - 1;
  		const pos = split.pos;
  		const axisOffset = split.axis * 2;

  		// hoare partitioning, see e.g. https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme
  		while ( true ) {

  			while ( left <= right && triangleBounds[ left * 6 + axisOffset ] < pos ) {

  				left ++;

  			}

  			while ( left <= right && triangleBounds[ right * 6 + axisOffset ] >= pos ) {

  				right --;

  			}

  			if ( left < right ) {

  				// we need to swap all of the information associated with the triangles at index
  				// left and right; that's the verts in the geometry index, the bounds,
  				// and perhaps the SAH planes

  				for ( let i = 0; i < 3; i ++ ) {

  					let t0 = index[ left * 3 + i ];
  					index[ left * 3 + i ] = index[ right * 3 + i ];
  					index[ right * 3 + i ] = t0;

  					let t1 = triangleBounds[ left * 6 + i * 2 + 0 ];
  					triangleBounds[ left * 6 + i * 2 + 0 ] = triangleBounds[ right * 6 + i * 2 + 0 ];
  					triangleBounds[ right * 6 + i * 2 + 0 ] = t1;

  					let t2 = triangleBounds[ left * 6 + i * 2 + 1 ];
  					triangleBounds[ left * 6 + i * 2 + 1 ] = triangleBounds[ right * 6 + i * 2 + 1 ];
  					triangleBounds[ right * 6 + i * 2 + 1 ] = t2;

  				}

  				if ( sahPlanes ) {

  					for ( let i = 0; i < 3; i ++ ) {

  						let t = sahPlanes[ i ][ left ];
  						sahPlanes[ i ][ left ] = sahPlanes[ i ][ right ];
  						sahPlanes[ i ][ right ] = t;

  					}

  				}

  				left ++;
  				right --;

  			} else {

  				return left;

  			}

  		}

  	}

  	function getOptimalSplit( nodeBoundingData, centroidBoundingData, triangleBounds, sahPlanes, offset, count, strategy ) {

  		let axis = - 1;
  		let pos = 0;

  		// Center
  		if ( strategy === CENTER ) {

  			axis = getLongestEdgeIndex( centroidBoundingData );
  			if ( axis !== - 1 ) {

  				pos = ( centroidBoundingData[ axis ] + centroidBoundingData[ axis + 3 ] ) / 2;

  			}

  		} else if ( strategy === AVERAGE ) {

  			axis = getLongestEdgeIndex( nodeBoundingData );
  			if ( axis !== - 1 ) {

  				pos = getAverage( triangleBounds, offset, count, axis );

  			}

  		} else if ( strategy === SAH ) {

  			// Surface Area Heuristic
  			// In order to make this code more terse, the x, y, and z
  			// variables of various structures have been stuffed into
  			// 0, 1, and 2 array indices so they can be easily computed
  			// and accessed within array iteration

  			// Cost values defineed for operations. We're using bounds for traversal, so
  			// the cost of traversing one more layer is more than intersecting a triangle.
  			const TRAVERSAL_COST = 3;
  			const INTERSECTION_COST = 1;
  			const bb = arrayToBox( nodeBoundingData, boxTemp );

  			// Define the width, height, and depth of the bounds as a box
  			const dim = [
  				bb.max.x - bb.min.x,
  				bb.max.y - bb.min.y,
  				bb.max.z - bb.min.z
  			];
  			const sa = 2 * ( dim[ 0 ] * dim[ 1 ] + dim[ 0 ] * dim[ 2 ] + dim[ 1 ] * dim[ 2 ] );

  			// Get the precalculated planes based for the triangles we're
  			// testing here
  			const filteredLists = [[], [], []];
  			for ( let i = offset, end = offset + count; i < end; i ++ ) {

  				for ( let v = 0; v < 3; v ++ ) {

  					filteredLists[ v ].push( sahPlanes[ v ][ i ] );

  				}

  			}
  			filteredLists.forEach( planes => planes.sort( ( a, b ) => a.p - b.p ) );

  			// this bounds surface area, left bound SA, left triangles, right bound SA, right triangles
  			const getCost = ( sa, sal, nl, sar, nr ) =>
  				  TRAVERSAL_COST + INTERSECTION_COST * ( ( sal / sa ) * nl + ( sar / sa ) * nr );

  			// the cost of _not_ splitting into smaller bounds
  			const noSplitCost = INTERSECTION_COST * count;

  			axis = - 1;
  			let bestCost = noSplitCost;
  			for ( let i = 0; i < 3; i ++ ) {

  				// o1 and o2 represent the _other_ two axes in the
  				// the space. So if we're checking the x (0) dimension,
  				// then o1 and o2 would be y and z (1 and 2)
  				const o1 = ( i + 1 ) % 3;
  				const o2 = ( i + 2 ) % 3;

  				const bmin = bb.min[ xyzFields[ i ] ];
  				const bmax = bb.max[ xyzFields[ i ] ];
  				const planes = filteredLists[ i ];

  				// The number of left and right triangles on either side
  				// given the current split
  				let nl = 0;
  				let nr = count;
  				for ( let p = 0; p < planes.length; p ++ ) {

  					const pinfo = planes[ p ];

  					// As the plane moves, we have to increment or decrement the
  					// number of triangles on either side of the plane
  					nl ++;
  					nr --;

  					// the distance from the plane to the edge of the broader bounds
  					const ldim = pinfo.p - bmin;
  					const rdim = bmax - pinfo.p;

  					// same for the other two dimensions
  					let ldimo1 = dim[ o1 ], rdimo1 = dim[ o1 ];
  					let ldimo2 = dim[ o2 ], rdimo2 = dim[ o2 ];

  					/*
  					// compute the other bounding planes for the box
  					// if only the current triangles are considered to
  					// be in the box
  					// This is really slow and probably not really worth it
  					const o1planes = sahPlanes[o1];
  					const o2planes = sahPlanes[o2];
  					let lmin = Infinity, lmax = -Infinity;
  					let rmin = Infinity, rmax = -Infinity;
  					planes.forEach((p, i) => {
  					const tri2 = p.tri * 2;
  					const inf1 = o1planes[tri2 + 0];
  					const inf2 = o1planes[tri2 + 1];
  					if (i <= nl) {
  					lmin = Math.min(inf1.p, inf2.p, lmin);
  					lmax = Math.max(inf1.p, inf2.p, lmax);
  					}
  					if (i >= nr) {
  					rmin = Math.min(inf1.p, inf2.p, rmin);
  					rmax = Math.max(inf1.p, inf2.p, rmax);
  					}
  					})
  					ldimo1 = Math.min(lmax - lmin, ldimo1);
  					rdimo1 = Math.min(rmax - rmin, rdimo1);

  					planes.forEach((p, i) => {
  					const tri2 = p.tri * 2;
  					const inf1 = o2planes[tri2 + 0];
  					const inf2 = o2planes[tri2 + 1];
  					if (i <= nl) {
  					lmin = Math.min(inf1.p, inf2.p, lmin);
  					lmax = Math.max(inf1.p, inf2.p, lmax);
  					}
  					if (i >= nr) {
  					rmin = Math.min(inf1.p, inf2.p, rmin);
  					rmax = Math.max(inf1.p, inf2.p, rmax);
  					}
  					})
  					ldimo2 = Math.min(lmax - lmin, ldimo2);
  					rdimo2 = Math.min(rmax - rmin, rdimo2);
  					*/

  					// surface areas and cost
  					const sal = 2 * ( ldimo1 * ldimo2 + ldimo1 * ldim + ldimo2 * ldim );
  					const sar = 2 * ( rdimo1 * rdimo2 + rdimo1 * rdim + rdimo2 * rdim );
  					const cost = getCost( sa, sal, nl, sar, nr );

  					if ( cost < bestCost ) {

  						axis = i;
  						pos = pinfo.p;
  						bestCost = cost;

  					}

  				}

  			}

  		}

  		return { axis, pos };

  	}

  	// returns the average coordinate on the specified axis of the all the provided triangles
  	function getAverage( triangleBounds, offset, count, axis ) {

  		let avg = 0;
  		for ( let i = offset, end = offset + count; i < end; i ++ ) {

  			avg += triangleBounds[ i * 6 + axis * 2 ];

  		}

  		return avg / count;

  	}

  	function computeSAHPlanes( triangleBounds ) {

  		const triCount = triangleBounds.length / 6;
  		const sahPlanes = [ new Array( triCount ), new Array( triCount ), new Array( triCount ) ];
  		for ( let tri = 0; tri < triCount; tri ++ ) {

  			for ( let el = 0; el < 3; el ++ ) {

  				sahPlanes[ el ][ tri ] = { p: triangleBounds[ tri * 6 + el * 2 ], tri };

  			}

  		}

  		return sahPlanes;

  	}

  	// precomputes the bounding box for each triangle; required for quickly calculating tree splits.
  	// result is an array of size tris.length * 6 where triangle i maps to a
  	// [x_center, x_delta, y_center, y_delta, z_center, z_delta] tuple starting at index i * 6,
  	// representing the center and half-extent in each dimension of triangle i
  	function computeTriangleBounds( geo ) {

  		const verts = geo.attributes.position.array;
  		const index = geo.index.array;
  		const triCount = index.length / 3;
  		const triangleBounds = new Float32Array( triCount * 6 );

  		for ( let tri = 0; tri < triCount; tri ++ ) {

  			const tri3 = tri * 3;
  			const tri6 = tri * 6;
  			const ai = index[ tri3 + 0 ] * 3;
  			const bi = index[ tri3 + 1 ] * 3;
  			const ci = index[ tri3 + 2 ] * 3;

  			for ( let el = 0; el < 3; el ++ ) {

  				const a = verts[ ai + el ];
  				const b = verts[ bi + el ];
  				const c = verts[ ci + el ];

  				let min = a;
  				if ( b < min ) min = b;
  				if ( c < min ) min = c;

  				let max = a;
  				if ( b > max ) max = b;
  				if ( c > max ) max = c;

  				const halfExtents = ( max - min ) / 2;
  				const el2 = el * 2;
  				triangleBounds[ tri6 + el2 + 0 ] = min + halfExtents;
  				triangleBounds[ tri6 + el2 + 1 ] = halfExtents;

  			}

  		}

  		return triangleBounds;

  	}

  	function buildTree( geo, options ) {

  		// either recursively splits the given node, creating left and right subtrees for it, or makes it a leaf node,
  		// recording the offset and count of its triangles and writing them into the reordered geometry index.
  		function splitNode( node, offset, count, centroidBoundingData = null, depth = 0 ) {

  			if ( ! reachedMaxDepth && depth >= maxDepth ) {

  				reachedMaxDepth = true;
  				if ( verbose ) {

  					console.warn( `MeshBVH: Max depth of ${ maxDepth } reached when generating BVH. Consider increasing maxDepth.` );
  					console.warn( this, geo );

  				}

  			}

  			// early out if we've met our capacity
  			if ( count <= maxLeafTris || depth >= maxDepth ) {

  				node.offset = offset;
  				node.count = count;
  				return node;

  			}

  			// Find where to split the volume
  			const split = getOptimalSplit( node.boundingData, centroidBoundingData, triangleBounds, sahPlanes, offset, count, strategy );
  			if ( split.axis === - 1 ) {

  				node.offset = offset;
  				node.count = count;
  				return node;

  			}

  			const splitOffset = partition( indexArray, triangleBounds, sahPlanes, offset, count, split );

  			// create the two new child nodes
  			if ( splitOffset === offset || splitOffset === offset + count ) {

  				node.offset = offset;
  				node.count = count;

  			} else {

  				node.splitAxis = split.axis;

  				// create the left child and compute its bounding box
  				const left = new MeshBVHNode();
  				const lstart = offset;
  				const lcount = splitOffset - offset;
  				node.left = left;
  				left.boundingData = new Float32Array( 6 );

  				if ( lazyGeneration ) {

  					getBounds( triangleBounds, lstart, lcount, left.boundingData );
  					left.continueGeneration = function () {

  						delete this.continueGeneration;
  						getCentroidBounds( triangleBounds, lstart, lcount, cacheCentroidBoundingData );
  						splitNode( left, lstart, lcount, cacheCentroidBoundingData, depth + 1 );

  					};

  				} else {

  					getBounds( triangleBounds, lstart, lcount, left.boundingData, cacheCentroidBoundingData );
  					splitNode( left, lstart, lcount, cacheCentroidBoundingData, depth + 1 );

  				}

  				// repeat for right
  				const right = new MeshBVHNode();
  				const rstart = splitOffset;
  				const rcount = count - lcount;
  				node.right = right;
  				right.boundingData = new Float32Array( 6 );

  				if ( lazyGeneration ) {

  					getBounds( triangleBounds, rstart, rcount, right.boundingData );
  					right.continueGeneration = function () {

  						delete this.continueGeneration;
  						getCentroidBounds( triangleBounds, rstart, rcount, cacheCentroidBoundingData );
  						splitNode( right, rstart, rcount, cacheCentroidBoundingData, depth + 1 );

  					};

  				} else {

  					getBounds( triangleBounds, rstart, rcount, right.boundingData, cacheCentroidBoundingData );
  					splitNode( right, rstart, rcount, cacheCentroidBoundingData, depth + 1 );

  				}

  			}

  			return node;

  		}

  		ensureIndex( geo );

  		const cacheCentroidBoundingData = new Float32Array( 6 );
  		const triangleBounds = computeTriangleBounds( geo );
  		const sahPlanes = options.strategy === SAH ? computeSAHPlanes( triangleBounds ) : null;
  		const indexArray = geo.index.array;
  		const maxDepth = options.maxDepth;
  		const verbose = options.verbose;
  		const maxLeafTris = options.maxLeafTris;
  		const strategy = options.strategy;
  		const lazyGeneration = options.lazyGeneration;
  		let reachedMaxDepth = false;

  		const roots = [];
  		const ranges = getRootIndexRanges( geo );

  		if ( ranges.length === 1 ) {

  			const root = new MeshBVHNode();
  			const range = ranges[ 0 ];

  			if ( geo.boundingBox != null ) {

  				root.boundingData = boxToArray( geo.boundingBox );
  				getCentroidBounds( triangleBounds, range.offset, range.count, cacheCentroidBoundingData );

  			} else {

  				root.boundingData = new Float32Array( 6 );
  				getBounds( triangleBounds, range.offset, range.count, root.boundingData, cacheCentroidBoundingData );

  			}

  			splitNode( root, range.offset, range.count, cacheCentroidBoundingData );
  			roots.push( root );

  		} else {

  			for ( let range of ranges ) {

  				const root = new MeshBVHNode();
  				root.boundingData = new Float32Array( 6 );
  				getBounds( triangleBounds, range.offset, range.count, root.boundingData, cacheCentroidBoundingData );

  				splitNode( root, range.offset, range.count, cacheCentroidBoundingData );
  				roots.push( root );

  			}

  		}

  		// if the geometry doesn't have a bounding box, then let's politely populate it using
  		// the work we did to determine the BVH root bounds
  		if ( geo.boundingBox == null ) {

  			const rootBox = new THREE.Box3();
  			geo.boundingBox = new THREE.Box3();

  			for ( let root of roots ) {

  				geo.boundingBox.union( arrayToBox( root.boundingData, rootBox ) );

  			}

  		}

  		return roots;

  	}

  	class SeparatingAxisBounds {

  		constructor() {

  			this.min = Infinity;
  			this.max = - Infinity;

  		}

  		setFromPointsField( points, field ) {

  			let min = Infinity;
  			let max = - Infinity;
  			for ( let i = 0, l = points.length; i < l; i ++ ) {

  				const p = points[ i ];
  				const val = p[ field ];
  				min = Math.min( val, min );
  				max = Math.max( val, max );

  			}

  			this.min = min;
  			this.max = max;


  		}

  		setFromPoints( axis, points ) {

  			let min = Infinity;
  			let max = - Infinity;
  			for ( let i = 0, l = points.length; i < l; i ++ ) {

  				const p = points[ i ];
  				const val = axis.dot( p );
  				min = Math.min( val, min );
  				max = Math.max( val, max );

  			}

  			this.min = min;
  			this.max = max;

  		}

  		isSeparated( other ) {

  			return this.min > other.max || other.min > this.max;

  		}

  	}

  	SeparatingAxisBounds.prototype.setFromBox = ( function () {

  		const p = new THREE.Vector3();
  		return function setFromBox( axis, box ) {

  			const boxMin = box.min;
  			const boxMax = box.max;
  			let min = Infinity;
  			let max = - Infinity;
  			for ( let x = 0; x <= 1; x ++ ) {

  				for ( let y = 0; y <= 1; y ++ ) {

  					for ( let z = 0; z <= 1; z ++ ) {

  						p.x = boxMin.x * x + boxMax.x * ( 1 - x );
  						p.y = boxMin.y * y + boxMax.y * ( 1 - y );
  						p.z = boxMin.z * z + boxMax.z * ( 1 - z );

  						const val = axis.dot( p );
  						min = Math.min( val, min );
  						max = Math.max( val, max );

  					}

  				}

  			}

  			this.min = min;
  			this.max = max;

  		};

  	} )();

  	const closestPointLineToLine = ( function () {

  		// https://github.com/juj/MathGeoLib/blob/master/src/Geometry/Line.cpp#L56
  		const dir1 = new THREE.Vector3();
  		const dir2 = new THREE.Vector3();
  		const v02 = new THREE.Vector3();
  		return function closestPointLineToLine( l1, l2, result ) {

  			const v0 = l1.start;
  			const v10 = dir1;
  			const v2 = l2.start;
  			const v32 = dir2;

  			v02.subVectors( v0, v2 );
  			dir1.subVectors( l1.end, l2.start );
  			dir2.subVectors( l2.end, l2.start );

  			// float d0232 = v02.Dot(v32);
  			const d0232 = v02.dot( v32 );

  			// float d3210 = v32.Dot(v10);
  			const d3210 = v32.dot( v10 );

  			// float d3232 = v32.Dot(v32);
  			const d3232 = v32.dot( v32 );

  			// float d0210 = v02.Dot(v10);
  			const d0210 = v02.dot( v10 );

  			// float d1010 = v10.Dot(v10);
  			const d1010 = v10.dot( v10 );

  			// float denom = d1010*d3232 - d3210*d3210;
  			const denom = d1010 * d3232 - d3210 * d3210;

  			let d, d2;
  			if ( denom !== 0 ) {

  				d = ( d0232 * d3210 - d0210 * d3232 ) / denom;

  			} else {

  				d = 0;

  			}

  			d2 = ( d0232 + d * d3210 ) / d3232;

  			result.x = d;
  			result.y = d2;

  		};

  	} )();

  	const closestPointsSegmentToSegment = ( function () {

  		// https://github.com/juj/MathGeoLib/blob/master/src/Geometry/LineSegment.cpp#L187
  		const paramResult = new THREE.Vector2();
  		const temp1 = new THREE.Vector3();
  		const temp2 = new THREE.Vector3();
  		return function closestPointsSegmentToSegment( l1, l2, target1, target2 ) {

  			closestPointLineToLine( l1, l2, paramResult );

  			let d = paramResult.x;
  			let d2 = paramResult.y;
  			if ( d >= 0 && d <= 1 && d2 >= 0 && d2 <= 1 ) {

  				l1.at( d, target1 );
  				l2.at( d2, target2 );

  				return;

  			} else if ( d >= 0 && d <= 1 ) {

  				// Only d2 is out of bounds.
  				if ( d2 < 0 ) {

  					l2.at( 0, target2 );

  				} else {

  					l2.at( 1, target2 );

  				}

  				l1.closestPointToPoint( target2, true, target1 );
  				return;

  			} else if ( d2 >= 0 && d2 <= 1 ) {

  				// Only d is out of bounds.
  				if ( d < 0 ) {

  					l1.at( 0, target1 );

  				} else {

  					l1.at( 1, target1 );

  				}

  				l2.closestPointToPoint( target1, true, target2 );
  				return;

  			} else {

  				// Both u and u2 are out of bounds.
  				let p;
  				if ( d < 0 ) {

  					p = l1.start;

  				} else {

  					p = l1.end;

  				}

  				let p2;
  				if ( d2 < 0 ) {

  					p2 = l2.start;

  				} else {

  					p2 = l2.end;

  				}

  				const closestPoint = temp1;
  				const closestPoint2 = temp2;
  				l1.closestPointToPoint( p2, true, temp1 );
  				l2.closestPointToPoint( p, true, temp2 );

  				if ( closestPoint.distanceToSquared( p2 ) <= closestPoint2.distanceToSquared( p ) ) {

  					target1.copy( closestPoint );
  					target2.copy( p2 );
  					return;

  				} else {

  					target1.copy( p );
  					target2.copy( closestPoint2 );
  					return;

  				}

  			}

  		};

  	} )();


  	const sphereIntersectTriangle = ( function () {

  		// https://stackoverflow.com/questions/34043955/detect-collision-between-sphere-and-triangle-in-three-js
  		const closestPointTemp = new THREE.Vector3();
  		const projectedPointTemp = new THREE.Vector3();
  		const planeTemp = new THREE.Plane();
  		const lineTemp = new THREE.Line3();
  		return function sphereIntersectTriangle( sphere, triangle ) {

  			const { radius, center } = sphere;
  			const { a, b, c } = triangle;

  			// phase 1
  			lineTemp.start = a;
  			lineTemp.end = b;
  			const closestPoint1 = lineTemp.closestPointToPoint( center, true, closestPointTemp );
  			if ( closestPoint1.distanceTo( center ) <= radius ) return true;

  			lineTemp.start = a;
  			lineTemp.end = c;
  			const closestPoint2 = lineTemp.closestPointToPoint( center, true, closestPointTemp );
  			if ( closestPoint2.distanceTo( center ) <= radius ) return true;

  			lineTemp.start = b;
  			lineTemp.end = c;
  			const closestPoint3 = lineTemp.closestPointToPoint( center, true, closestPointTemp );
  			if ( closestPoint3.distanceTo( center ) <= radius ) return true;

  			// phase 2
  			const plane = triangle.getPlane( planeTemp );
  			const dp = Math.abs( plane.distanceToPoint( center ) );
  			if ( dp <= radius ) {

  				const pp = plane.projectPoint( center, projectedPointTemp );
  				const cp = triangle.containsPoint( pp );
  				if ( cp ) return true;

  			}

  			return false;

  		};

  	} )();

  	class SeparatingAxisTriangle extends THREE.Triangle {

  		constructor( ...args ) {

  			super( ...args );

  			this.isSeparatingAxisTriangle = true;
  			this.satAxes = new Array( 4 ).fill().map( () => new THREE.Vector3() );
  			this.satBounds = new Array( 4 ).fill().map( () => new SeparatingAxisBounds() );
  			this.points = [ this.a, this.b, this.c ];
  			this.sphere = new THREE.Sphere();

  		}

  	}

  	SeparatingAxisTriangle.prototype.update = ( function () {

  		const arr = new Array( 3 );
  		return function update( ) {

  			const a = this.a;
  			const b = this.b;
  			const c = this.c;

  			arr[ 0 ] = this.a;
  			arr[ 1 ] = this.b;
  			arr[ 2 ] = this.c;

  			const satAxes = this.satAxes;
  			const satBounds = this.satBounds;

  			const axis0 = satAxes[ 0 ];
  			const sab0 = satBounds[ 0 ];
  			this.getNormal( axis0 );
  			sab0.setFromPoints( axis0, arr );

  			const axis1 = satAxes[ 1 ];
  			const sab1 = satBounds[ 1 ];
  			axis1.subVectors( a, b );
  			sab1.setFromPoints( axis1, arr );

  			const axis2 = satAxes[ 2 ];
  			const sab2 = satBounds[ 2 ];
  			axis2.subVectors( b, c );
  			sab2.setFromPoints( axis2, arr );

  			const axis3 = satAxes[ 3 ];
  			const sab3 = satBounds[ 3 ];
  			axis3.subVectors( c, a );
  			sab3.setFromPoints( axis3, arr );

  			this.sphere.setFromPoints( this.points );

  		};

  	} )();

  	SeparatingAxisTriangle.prototype.intersectsTriangle = ( function () {

  		const saTri2 = new SeparatingAxisTriangle();
  		const arr1 = new Array( 3 );
  		const arr2 = new Array( 3 );
  		const cachedSatBounds = new SeparatingAxisBounds();
  		const cachedSatBounds2 = new SeparatingAxisBounds();
  		const cachedAxis = new THREE.Vector3();
  		return function intersectsTriangle( other ) {

  			if ( ! other.isSeparatingAxisTriangle ) {

  				saTri2.copy( other );
  				saTri2.update();
  				other = saTri2;

  			}

  			const satBounds1 = this.satBounds;
  			const satAxes1 = this.satAxes;
  			arr2[ 0 ] = other.a;
  			arr2[ 1 ] = other.b;
  			arr2[ 2 ] = other.c;
  			for ( let i = 0; i < 4; i ++ ) {

  				const sb = satBounds1[ i ];
  				const sa = satAxes1[ i ];
  				cachedSatBounds.setFromPoints( sa, arr2 );
  				if ( sb.isSeparated( cachedSatBounds ) ) return false;

  			}

  			const satBounds2 = other.satBounds;
  			const satAxes2 = other.satAxes;
  			arr1[ 0 ] = this.a;
  			arr1[ 1 ] = this.b;
  			arr1[ 2 ] = this.c;
  			for ( let i = 0; i < 4; i ++ ) {

  				const sb = satBounds2[ i ];
  				const sa = satAxes2[ i ];
  				cachedSatBounds.setFromPoints( sa, arr1 );
  				if ( sb.isSeparated( cachedSatBounds ) ) return false;

  			}

  			// check crossed axes
  			for ( let i = 0; i < 4; i ++ ) {

  				const sa1 = satAxes1[ i ];
  				for ( let i2 = 0; i2 < 4; i2 ++ ) {

  					const sa2 = satAxes2[ i2 ];
  					cachedAxis.crossVectors( sa1, sa2 );
  					cachedSatBounds.setFromPoints( cachedAxis, arr1 );
  					cachedSatBounds2.setFromPoints( cachedAxis, arr2 );
  					if ( cachedSatBounds.isSeparated( cachedSatBounds2 ) ) return false;

  				}

  			}

  			return true;

  		};

  	} )();


  	SeparatingAxisTriangle.prototype.distanceToPoint = ( function () {

  		const target = new THREE.Vector3();
  		return function distanceToPoint( point ) {

  			this.closestPointToPoint( point, target );
  			return point.distanceTo( target );

  		};

  	} )();


  	SeparatingAxisTriangle.prototype.distanceToTriangle = ( function () {

  		const point = new THREE.Vector3();
  		const point2 = new THREE.Vector3();
  		const cornerFields = [ 'a', 'b', 'c' ];
  		const line1 = new THREE.Line3();
  		const line2 = new THREE.Line3();

  		return function distanceToTriangle( other, target1 = null, target2 = null ) {

  			if ( this.intersectsTriangle( other ) ) {

  				// TODO: This will not result in a point that lies on
  				// the intersection line of the triangles
  				if ( target1 || target2 ) {

  					this.getMidpoint( point );
  					other.closestPointToPoint( point, point2 );
  					this.closestPointToPoint( point2, point );

  					if ( target1 ) target1.copy( point );
  					if ( target2 ) target2.copy( point2 );

  				}

  				return 0;

  			}

  			let closestDistanceSq = Infinity;

  			// check all point distances
  			for ( let i = 0; i < 3; i ++ ) {

  				let dist;
  				const field = cornerFields[ i ];
  				const otherVec = other[ field ];
  				this.closestPointToPoint( otherVec, point );

  				dist = otherVec.distanceToSquared( point );

  				if ( dist < closestDistanceSq ) {

  					closestDistanceSq = dist;
  					if ( target1 ) target1.copy( point );
  					if ( target2 ) target2.copy( otherVec );

  				}


  				const thisVec = this[ field ];
  				other.closestPointToPoint( thisVec, point );

  				dist = thisVec.distanceToSquared( point );

  				if ( dist < closestDistanceSq ) {

  					closestDistanceSq = dist;
  					if ( target1 ) target1.copy( thisVec );
  					if ( target2 ) target2.copy( point );

  				}

  			}

  			for ( let i = 0; i < 3; i ++ ) {

  				const f11 = cornerFields[ i ];
  				const f12 = cornerFields[ ( i + 1 ) % 3 ];
  				line1.set( this[ f11 ], this[ f12 ] );
  				for ( let i2 = 0; i2 < 3; i2 ++ ) {

  					const f21 = cornerFields[ i2 ];
  					const f22 = cornerFields[ ( i2 + 1 ) % 3 ];
  					line2.set( other[ f21 ], other[ f22 ] );

  					closestPointsSegmentToSegment( line1, line2, point, point2 );

  					const dist = point.distanceToSquared( point2 );
  					if ( dist < closestDistanceSq ) {

  						closestDistanceSq = dist;
  						if ( target1 ) target1.copy( point );
  						if ( target2 ) target2.copy( point2 );

  					}

  				}

  			}

  			return Math.sqrt( closestDistanceSq );

  		};

  	} )();

  	class OrientedBox extends THREE.Box3 {

  		constructor( ...args ) {

  			super( ...args );

  			this.isOrientedBox = true;
  			this.matrix = new THREE.Matrix4();
  			this.invMatrix = new THREE.Matrix4();
  			this.points = new Array( 8 ).fill().map( () => new THREE.Vector3() );
  			this.satAxes = new Array( 3 ).fill().map( () => new THREE.Vector3() );
  			this.satBounds = new Array( 3 ).fill().map( () => new SeparatingAxisBounds() );
  			this.alignedSatBounds = new Array( 3 ).fill().map( () => new SeparatingAxisBounds() );
  			this.sphere = new THREE.Sphere();

  		}

  		set( min, max, matrix ) {

  			super.set( min, max );
  			this.matrix = matrix;

  		}

  		copy( other ) {

  			super.copy( other );
  			this.matrix.copy( other.matrix );

  		}

  	}

  	OrientedBox.prototype.update = ( function () {

  		return function update() {

  			const matrix = this.matrix;
  			const min = this.min;
  			const max = this.max;

  			const points = this.points;
  			for ( let x = 0; x <= 1; x ++ ) {

  				for ( let y = 0; y <= 1; y ++ ) {

  					for ( let z = 0; z <= 1; z ++ ) {

  						const i = ( ( 1 << 0 ) * x ) | ( ( 1 << 1 ) * y ) | ( ( 1 << 2 ) * z );
  						const v = points[ i ];
  						v.x = x ? max.x : min.x;
  						v.y = y ? max.y : min.y;
  						v.z = z ? max.z : min.z;

  						v.applyMatrix4( matrix );

  					}

  				}

  			}

  			this.sphere.setFromPoints( this.points );

  			const satBounds = this.satBounds;
  			const satAxes = this.satAxes;
  			const minVec = points[ 0 ];
  			for ( let i = 0; i < 3; i ++ ) {

  				const axis = satAxes[ i ];
  				const sb = satBounds[ i ];
  				const index = 1 << i;
  				const pi = points[ index ];

  				axis.subVectors( minVec, pi );
  				sb.setFromPoints( axis, points );

  			}

  			const alignedSatBounds = this.alignedSatBounds;
  			alignedSatBounds[ 0 ].setFromPointsField( points, 'x' );
  			alignedSatBounds[ 1 ].setFromPointsField( points, 'y' );
  			alignedSatBounds[ 2 ].setFromPointsField( points, 'z' );

  			this.invMatrix.getInverse( this.matrix );

  		};

  	} )();

  	OrientedBox.prototype.intersectsBox = ( function () {

  		const aabbBounds = new SeparatingAxisBounds();
  		return function intersectsBox( box ) {

  			if ( ! box.intersectsSphere( this.sphere ) ) return false;

  			const min = box.min;
  			const max = box.max;
  			const satBounds = this.satBounds;
  			const satAxes = this.satAxes;
  			const alignedSatBounds = this.alignedSatBounds;

  			aabbBounds.min = min.x;
  			aabbBounds.max = max.x;
  			if ( alignedSatBounds[ 0 ].isSeparated( aabbBounds ) ) return false;

  			aabbBounds.min = min.y;
  			aabbBounds.max = max.y;
  			if ( alignedSatBounds[ 1 ].isSeparated( aabbBounds ) ) return false;

  			aabbBounds.min = min.z;
  			aabbBounds.max = max.z;
  			if ( alignedSatBounds[ 2 ].isSeparated( aabbBounds ) ) return false;

  			for ( let i = 0; i < 3; i ++ ) {

  				const axis = satAxes[ i ];
  				const sb = satBounds[ i ];
  				aabbBounds.setFromBox( axis, box );
  				if ( sb.isSeparated( aabbBounds ) ) return false;

  			}

  			return true;

  		};

  	} )();

  	OrientedBox.prototype.intersectsTriangle = ( function () {

  		const saTri = new SeparatingAxisTriangle();
  		const pointsArr = new Array( 3 );
  		const cachedSatBounds = new SeparatingAxisBounds();
  		const cachedSatBounds2 = new SeparatingAxisBounds();
  		const cachedAxis = new THREE.Vector3();
  		return function intersectsTriangle( triangle ) {

  			if ( ! triangle.isSeparatingAxisTriangle ) {

  				saTri.copy( triangle );
  				saTri.update();
  				triangle = saTri;

  			}

  			const satBounds = this.satBounds;
  			const satAxes = this.satAxes;

  			pointsArr[ 0 ] = triangle.a;
  			pointsArr[ 1 ] = triangle.b;
  			pointsArr[ 2 ] = triangle.c;

  			for ( let i = 0; i < 3; i ++ ) {

  				const sb = satBounds[ i ];
  				const sa = satAxes[ i ];
  				cachedSatBounds.setFromPoints( sa, pointsArr );
  				if ( sb.isSeparated( cachedSatBounds ) ) return false;

  			}

  			const triSatBounds = triangle.satBounds;
  			const triSatAxes = triangle.satAxes;
  			const points = this.points;
  			for ( let i = 0; i < 3; i ++ ) {

  				const sb = triSatBounds[ i ];
  				const sa = triSatAxes[ i ];
  				cachedSatBounds.setFromPoints( sa, points );
  				if ( sb.isSeparated( cachedSatBounds ) ) return false;

  			}

  			// check crossed axes
  			for ( let i = 0; i < 3; i ++ ) {

  				const sa1 = satAxes[ i ];
  				for ( let i2 = 0; i2 < 4; i2 ++ ) {

  					const sa2 = triSatAxes[ i2 ];
  					cachedAxis.crossVectors( sa1, sa2 );
  					cachedSatBounds.setFromPoints( cachedAxis, pointsArr );
  					cachedSatBounds2.setFromPoints( cachedAxis, points );
  					if ( cachedSatBounds.isSeparated( cachedSatBounds2 ) ) return false;

  				}

  			}

  			return true;

  		};

  	} )();

  	OrientedBox.prototype.closestPointToPoint = ( function () {

  		return function closestPointToPoint( point, target1 ) {

  			target1
  				.copy( point )
  				.applyMatrix4( this.invMatrix )
  				.clamp( this.min, this.max )
  				.applyMatrix4( this.matrix );

  			return target1;

  		};

  	} )();

  	OrientedBox.prototype.distanceToPoint = ( function () {

  		const target = new THREE.Vector3();
  		return function distanceToPoint( point ) {

  			this.closestPointToPoint( point, target );
  			return point.distanceTo( target );

  		};

  	} )();


  	OrientedBox.prototype.distanceToBox = ( function () {

  		const xyzFields = [ 'x', 'y', 'z' ];
  		const segments1 = new Array( 12 ).fill().map( () => new THREE.Line3() );
  		const segments2 = new Array( 12 ).fill().map( () => new THREE.Line3() );

  		const point1 = new THREE.Vector3();
  		const point2 = new THREE.Vector3();

  		return function distanceToBox( box, threshold = 0, target1 = null, target2 = null ) {

  			if ( this.intersectsBox( box ) ) {

  				if ( target1 || target2 ) {

  					box.getCenter( point2 );
  					this.closestPointToPoint( point2, point1 );
  					box.closestPointToPoint( point1, point2 );

  					if ( target1 ) target1.copy( point1 );
  					if ( target2 ) target2.copy( point2 );

  				}
  				return 0;

  			}

  			const threshold2 = threshold * threshold;
  			const min = box.min;
  			const max = box.max;
  			const points = this.points;


  			// iterate over every edge and compare distances
  			let closestDistanceSq = Infinity;

  			// check over all these points
  			for ( let i = 0; i < 8; i ++ ) {

  				const p = points[ i ];
  				point2.copy( p ).clamp( min, max );

  				const dist = p.distanceToSquared( point2 );
  				if ( dist < closestDistanceSq ) {

  					closestDistanceSq = dist;
  					if ( target1 ) target1.copy( p );
  					if ( target2 ) target2.copy( point2 );

  					if ( dist < threshold2 ) return Math.sqrt( dist );

  				}

  			}

  			// generate and check all line segment distances
  			let count = 0;
  			for ( let i = 0; i < 3; i ++ ) {

  				for ( let i1 = 0; i1 <= 1; i1 ++ ) {

  					for ( let i2 = 0; i2 <= 1; i2 ++ ) {

  						const nextIndex = ( i + 1 ) % 3;
  						const nextIndex2 = ( i + 2 ) % 3;

  						// get obb line segments
  						const index = i1 << nextIndex | i2 << nextIndex2;
  						const index2 = 1 << i | i1 << nextIndex | i2 << nextIndex2;
  						const p1 = points[ index ];
  						const p2 = points[ index2 ];
  						const line1 = segments1[ count ];
  						line1.set( p1, p2 );


  						// get aabb line segments
  						const f1 = xyzFields[ i ];
  						const f2 = xyzFields[ nextIndex ];
  						const f3 = xyzFields[ nextIndex2 ];
  						const line2 = segments2[ count ];
  						const start = line2.start;
  						const end = line2.end;

  						start[ f1 ] = min[ f1 ];
  						start[ f2 ] = i1 ? min[ f2 ] : max[ f2 ];
  						start[ f3 ] = i2 ? min[ f3 ] : max[ f2 ];

  						end[ f1 ] = max[ f1 ];
  						end[ f2 ] = i1 ? min[ f2 ] : max[ f2 ];
  						end[ f3 ] = i2 ? min[ f3 ] : max[ f2 ];

  						count ++;

  					}

  				}

  			}

  			// check all the other boxes point
  			for ( let x = 0; x <= 1; x ++ ) {

  				for ( let y = 0; y <= 1; y ++ ) {

  					for ( let z = 0; z <= 1; z ++ ) {

  						point2.x = x ? max.x : min.x;
  						point2.y = y ? max.y : min.y;
  						point2.z = z ? max.z : min.z;

  						this.closestPointToPoint( point2, point1 );
  						const dist = point2.distanceToSquared( point1 );
  						if ( dist < closestDistanceSq ) {

  							closestDistanceSq = dist;
  							if ( target1 ) target1.copy( point1 );
  							if ( target2 ) target2.copy( point2 );

  							if ( dist < threshold2 ) return Math.sqrt( dist );

  						}

  					}

  				}

  			}

  			for ( let i = 0; i < 12; i ++ ) {

  				const l1 = segments1[ i ];
  				for ( let i2 = 0; i2 < 12; i2 ++ ) {

  					const l2 = segments2[ i2 ];
  					closestPointsSegmentToSegment( l1, l2, point1, point2 );
  					const dist = point1.distanceToSquared( point2 );
  					if ( dist < closestDistanceSq ) {

  						closestDistanceSq = dist;
  						if ( target1 ) target1.copy( point1 );
  						if ( target2 ) target2.copy( point2 );

  						if ( dist < threshold2 ) return Math.sqrt( dist );

  					}

  				}

  			}

  			return Math.sqrt( closestDistanceSq );

  		};

  	} )();

  	// sets the vertices of triangle `tri` with the 3 vertices after i
  	function setTriangle( tri, i, index, pos ) {

  		const ta = tri.a;
  		const tb = tri.b;
  		const tc = tri.c;

  		let i3 = index.getX( i );
  		ta.x = pos.getX( i3 );
  		ta.y = pos.getY( i3 );
  		ta.z = pos.getZ( i3 );

  		i3 = index.getX( i + 1 );
  		tb.x = pos.getX( i3 );
  		tb.y = pos.getY( i3 );
  		tb.z = pos.getZ( i3 );

  		i3 = index.getX( i + 2 );
  		tc.x = pos.getX( i3 );
  		tc.y = pos.getY( i3 );
  		tc.z = pos.getZ( i3 );

  	}

  	// Ripped and modified From THREE.js Mesh raycast
  	// https://github.com/mrdoob/three.js/blob/0aa87c999fe61e216c1133fba7a95772b503eddf/src/objects/Mesh.js#L115
  	var vA = new THREE.Vector3();
  	var vB = new THREE.Vector3();
  	var vC = new THREE.Vector3();

  	var uvA = new THREE.Vector2();
  	var uvB = new THREE.Vector2();
  	var uvC = new THREE.Vector2();

  	var intersectionPoint = new THREE.Vector3();
  	var intersectionPointWorld = new THREE.Vector3();

  	function checkIntersection( object, material, raycaster, ray, pA, pB, pC, point ) {

  		var intersect;
  		if ( material.side === THREE.BackSide ) {

  			intersect = ray.intersectTriangle( pC, pB, pA, true, point );

  		} else {

  			intersect = ray.intersectTriangle( pA, pB, pC, material.side !== THREE.DoubleSide, point );

  		}

  		if ( intersect === null ) return null;

  		intersectionPointWorld.copy( point );
  		intersectionPointWorld.applyMatrix4( object.matrixWorld );

  		var distance = raycaster.ray.origin.distanceTo( intersectionPointWorld );

  		if ( distance < raycaster.near || distance > raycaster.far ) return null;

  		return {
  			distance: distance,
  			point: intersectionPointWorld.clone(),
  			object: object
  		};

  	}

  	function checkBufferGeometryIntersection( object, raycaster, ray, position, uv, a, b, c ) {

  		vA.fromBufferAttribute( position, a );
  		vB.fromBufferAttribute( position, b );
  		vC.fromBufferAttribute( position, c );

  		var intersection = checkIntersection( object, object.material, raycaster, ray, vA, vB, vC, intersectionPoint );

  		if ( intersection ) {

  			if ( uv ) {

  				uvA.fromBufferAttribute( uv, a );
  				uvB.fromBufferAttribute( uv, b );
  				uvC.fromBufferAttribute( uv, c );

  				intersection.uv = THREE.Triangle.getUV( intersectionPoint, vA, vB, vC, uvA, uvB, uvC, new THREE.Vector2( ) );

  			}

  			var normal = new THREE.Vector3();
  			intersection.face = new THREE.Face3( a, b, c, THREE.Triangle.getNormal( vA, vB, vC, normal ) );
  			intersection.faceIndex = a;

  		}

  		return intersection;

  	}

  	// https://github.com/mrdoob/three.js/blob/0aa87c999fe61e216c1133fba7a95772b503eddf/src/objects/Mesh.js#L258
  	function intersectTri( mesh, geo, raycaster, ray, tri, intersections ) {

  		const triOffset = tri * 3;
  		const a = geo.index.getX( triOffset );
  		const b = geo.index.getX( triOffset + 1 );
  		const c = geo.index.getX( triOffset + 2 );

  		const intersection = checkBufferGeometryIntersection( mesh, raycaster, ray, geo.attributes.position, geo.attributes.uv, a, b, c );

  		if ( intersection ) {

  			intersection.faceIndex = tri;
  			if ( intersections ) intersections.push( intersection );
  			return intersection;

  		}

  		return null;

  	}

  	function intersectTris( mesh, geo, raycaster, ray, offset, count, intersections ) {

  		for ( let i = offset, end = offset + count; i < end; i ++ ) {

  			intersectTri( mesh, geo, raycaster, ray, i, intersections );

  		}

  	}

  	function intersectClosestTri( mesh, geo, raycaster, ray, offset, count ) {

  		let dist = Infinity;
  		let res = null;
  		for ( let i = offset, end = offset + count; i < end; i ++ ) {

  			const intersection = intersectTri( mesh, geo, raycaster, ray, i );
  			if ( intersection && intersection.distance < dist ) {

  				res = intersection;
  				dist = intersection.distance;

  			}

  		}

  		return res;

  	}

  	const boundingBox = new THREE.Box3();
  	const boxIntersection = new THREE.Vector3();
  	const xyzFields$1 = [ 'x', 'y', 'z' ];

  	function intersectRay( node, ray, target ) {

  		arrayToBox( node.boundingData, boundingBox );

  		return ray.intersectBox( boundingBox, target );

  	}

  	function raycast( node, mesh, raycaster, ray, intersects ) {

  		if ( node.continueGeneration ) {

  			node.continueGeneration();

  		}

  		const isLeaf = ! ! node.count;
  		if ( isLeaf ) {

  			intersectTris( mesh, mesh.geometry, raycaster, ray, node.offset, node.count, intersects );

  		} else {

  			if ( intersectRay( node.left, ray, boxIntersection ) ) {

  				raycast( node.left, mesh, raycaster, ray, intersects );

  			}

  			if ( intersectRay( node.right, ray, boxIntersection ) ) {

  				raycast( node.right, mesh, raycaster, ray, intersects );

  			}

  		}

  	}

  	function raycastFirst( node, mesh, raycaster, ray ) {

  		if ( node.continueGeneration ) {

  			node.continueGeneration();

  		}

  		const isLeaf = ! ! node.count;
  		if ( isLeaf ) {

  			return intersectClosestTri( mesh, mesh.geometry, raycaster, ray, node.offset, node.count );

  		} else {


  			// consider the position of the split plane with respect to the oncoming ray; whichever direction
  			// the ray is coming from, look for an intersection among that side of the tree first
  			const splitAxis = node.splitAxis;
  			const xyzAxis = xyzFields$1[ splitAxis ];
  			const rayDir = ray.direction[ xyzAxis ];
  			const leftToRight = rayDir >= 0;

  			// c1 is the child to check first
  			let c1, c2;
  			if ( leftToRight ) {

  				c1 = node.left;
  				c2 = node.right;

  			} else {

  				c1 = node.right;
  				c2 = node.left;

  			}

  			const c1Intersection = intersectRay( c1, ray, boxIntersection );
  			const c1Result = c1Intersection ? raycastFirst( c1, mesh, raycaster, ray ) : null;

  			// if we got an intersection in the first node and it's closer than the second node's bounding
  			// box, we don't need to consider the second node because it couldn't possibly be a better result
  			if ( c1Result ) {

  				// check only along the split axis
  				const rayOrig = ray.origin[ xyzAxis ];
  				const toPoint = rayOrig - c1Result.point[ xyzAxis ];
  				const toChild1 = rayOrig - c2.boundingData[ splitAxis ];
  				const toChild2 = rayOrig - c2.boundingData[ splitAxis + 3 ];

  				const toPointSq = toPoint * toPoint;
  				if ( toPointSq <= toChild1 * toChild1 && toPointSq <= toChild2 * toChild2 ) {

  					return c1Result;

  				}

  			}

  			// either there was no intersection in the first node, or there could still be a closer
  			// intersection in the second, so check the second node and then take the better of the two
  			const c2Intersection = intersectRay( c2, ray, boxIntersection );
  			const c2Result = c2Intersection ? raycastFirst( c2, mesh, raycaster, ray ) : null;

  			if ( c1Result && c2Result ) {

  				return c1Result.distance <= c2Result.distance ? c1Result : c2Result;

  			} else {

  				return c1Result || c2Result || null;

  			}

  		}

  	}

  	const shapecast = ( function () {

  		const triangle = new SeparatingAxisTriangle();
  		const cachedBox1 = new THREE.Box3();
  		const cachedBox2 = new THREE.Box3();
  		return function shapecast( node, mesh, intersectsBoundsFunc, intersectsTriangleFunc = null, nodeScoreFunc = null ) {

  			if ( node.continueGeneration ) {

  				node.continueGeneration();

  			}

  			const isLeaf = ! ! node.count;
  			if ( isLeaf && intersectsTriangleFunc ) {

  				const geometry = mesh.geometry;
  				const index = geometry.index;
  				const pos = geometry.attributes.position;
  				const offset = node.offset;
  				const count = node.count;

  				for ( let i = offset * 3, l = ( count + offset ) * 3; i < l; i += 3 ) {

  					setTriangle( triangle, i, index, pos );
  					triangle.update();

  					if ( intersectsTriangleFunc( triangle, i, i + 1, i + 2 ) ) {

  						return true;

  					}

  				}

  				return false;

  			} else {

  				const left = node.left;
  				const right = node.right;
  				let c1 = left;
  				let c2 = right;

  				let score1, score2;
  				let box1, box2;
  				if ( nodeScoreFunc ) {

  					box1 = cachedBox1;
  					box2 = cachedBox2;

  					arrayToBox( c1.boundingData, box1 );
  					arrayToBox( c2.boundingData, box2 );

  					score1 = nodeScoreFunc( box1 );
  					score2 = nodeScoreFunc( box2 );

  					if ( score2 < score1 ) {

  						c1 = right;
  						c2 = left;

  						const temp = score1;
  						score1 = score2;
  						score2 = temp;

  						const tempBox = box1;
  						box1 = box2;
  						box2 = tempBox;

  					}

  				}

  				if ( ! box1 ) {

  					box1 = cachedBox1;
  					arrayToBox( c1.boundingData, box1 );

  				}

  				const isC1Leaf = ! ! c1.count;
  				const c1Intersection =
  					intersectsBoundsFunc( box1, isC1Leaf, score1 ) &&
  					shapecast( c1, mesh, intersectsBoundsFunc, intersectsTriangleFunc, nodeScoreFunc );

  				if ( c1Intersection ) return true;


  				if ( ! box2 ) {

  					box2 = cachedBox2;
  					arrayToBox( c2.boundingData, box2 );

  				}

  				const isC2Leaf = ! ! c2.count;
  				const c2Intersection =
  					intersectsBoundsFunc( box2, isC2Leaf, score2 ) &&
  					shapecast( c2, mesh, intersectsBoundsFunc, intersectsTriangleFunc, nodeScoreFunc );

  				if ( c2Intersection ) return true;

  				return false;

  			}

  		};

  	} )();

  	const intersectsGeometry = ( function () {

  		const triangle = new SeparatingAxisTriangle();
  		const triangle2 = new SeparatingAxisTriangle();
  		const cachedMesh = new THREE.Mesh();
  		const invertedMat = new THREE.Matrix4();

  		const obb = new OrientedBox();
  		const obb2 = new OrientedBox();

  		return function intersectsGeometry( node, mesh, geometry, geometryToBvh, cachedObb = null ) {

  			if ( node.continueGeneration ) {

  				node.continueGeneration();

  			}

  			if ( cachedObb === null ) {

  				if ( ! geometry.boundingBox ) {

  					geometry.computeBoundingBox();

  				}

  				obb.set( geometry.boundingBox.min, geometry.boundingBox.max, geometryToBvh );
  				obb.update();
  				cachedObb = obb;

  			}

  			const isLeaf = ! ! node.count;
  			if ( isLeaf ) {

  				const thisGeometry = mesh.geometry;
  				const thisIndex = thisGeometry.index;
  				const thisPos = thisGeometry.attributes.position;

  				const index = geometry.index;
  				const pos = geometry.attributes.position;

  				const offset = node.offset;
  				const count = node.count;

  				// get the inverse of the geometry matrix so we can transform our triangles into the
  				// geometry space we're trying to test. We assume there are fewer triangles being checked
  				// here.
  				invertedMat.getInverse( geometryToBvh );

  				if ( geometry.boundsTree ) {

  					arrayToBox( node.boundingData, obb2 );
  					obb2.matrix.copy( invertedMat );
  					obb2.update();

  					cachedMesh.geometry = geometry;
  					const res = geometry.boundsTree.shapecast( cachedMesh, box => obb2.intersectsBox( box ), function ( tri ) {

  						tri.a.applyMatrix4( geometryToBvh );
  						tri.b.applyMatrix4( geometryToBvh );
  						tri.c.applyMatrix4( geometryToBvh );
  						tri.update();

  						for ( let i = offset * 3, l = ( count + offset ) * 3; i < l; i += 3 ) {

  							// this triangle needs to be transformed into the current BVH coordinate frame
  							setTriangle( triangle2, i, thisIndex, thisPos );
  							triangle2.update();
  							if ( tri.intersectsTriangle( triangle2 ) ) {

  								return true;

  							}

  						}

  						return false;

  					} );
  					cachedMesh.geometry = null;

  					return res;

  				} else {

  					for ( let i = offset * 3, l = ( count + offset * 3 ); i < l; i += 3 ) {

  						// this triangle needs to be transformed into the current BVH coordinate frame
  						setTriangle( triangle, i, thisIndex, thisPos );
  						triangle.a.applyMatrix4( invertedMat );
  						triangle.b.applyMatrix4( invertedMat );
  						triangle.c.applyMatrix4( invertedMat );
  						triangle.update();

  						for ( let i2 = 0, l2 = index.count; i2 < l2; i2 += 3 ) {

  							setTriangle( triangle2, i2, index, pos );
  							triangle2.update();

  							if ( triangle.intersectsTriangle( triangle2 ) ) {

  								return true;

  							}

  						}

  					}

  				}

  			} else {

  				const left = node.left;
  				const right = node.right;

  				arrayToBox( left.boundingData, boundingBox );
  				const leftIntersection =
  					cachedObb.intersectsBox( boundingBox ) &&
  					intersectsGeometry( left, mesh, geometry, geometryToBvh, cachedObb );

  				if ( leftIntersection ) return true;


  				arrayToBox( right.boundingData, boundingBox );
  				const rightIntersection =
  					cachedObb.intersectsBox( boundingBox ) &&
  					intersectsGeometry( right, mesh, geometry, geometryToBvh, cachedObb );

  				if ( rightIntersection ) return true;

  				return false;

  			}

  		};

  	} )();

  	const boundingBox$1 = new THREE.Box3();
  	const boxIntersection$1 = new THREE.Vector3();
  	const xyzFields$2 = [ 'x', 'y', 'z' ];



  	function raycastBuffer( stride4Offset, mesh, raycaster, ray, intersects ) {

  		const stride2Offset = stride4Offset * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

  		const isLeaf = /* node count */ uint16Array[ stride2Offset + 15 ] === 0xffff;
  		if ( isLeaf ) {

  			intersectTris( mesh, mesh.geometry, raycaster, ray, /* node offset */ uint32Array[ stride4Offset + 6 ], /* node count */ uint16Array[ stride2Offset + 14 ], intersects );

  		} else {

  			if ( intersectRayBuffer( /* node left */ stride4Offset + 8, float32Array, ray, boxIntersection$1 ) ) {

  				raycastBuffer( /* node left */ stride4Offset + 8, mesh, raycaster, ray, intersects );

  			}

  			if ( intersectRayBuffer( /* node right */ uint32Array[ stride4Offset + 6 ], float32Array, ray, boxIntersection$1 ) ) {

  				raycastBuffer( /* node right */ uint32Array[ stride4Offset + 6 ], mesh, raycaster, ray, intersects );

  			}

  		}

  	}

  	function raycastFirstBuffer( stride4Offset, mesh, raycaster, ray ) {

  		const stride2Offset = stride4Offset * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

  		const isLeaf = /* node count */ uint16Array[ stride2Offset + 15 ] === 0xffff;
  		if ( isLeaf ) {

  			return intersectClosestTri( mesh, mesh.geometry, raycaster, ray, /* node offset */ uint32Array[ stride4Offset + 6 ], /* node count */ uint16Array[ stride2Offset + 14 ] );

  		} else {


  			// consider the position of the split plane with respect to the oncoming ray; whichever direction
  			// the ray is coming from, look for an intersection among that side of the tree first
  			const splitAxis = /* node splitAxis */ uint32Array[ stride4Offset + 7 ];
  			const xyzAxis = xyzFields$2[ splitAxis ];
  			const rayDir = ray.direction[ xyzAxis ];
  			const leftToRight = rayDir >= 0;

  			// c1 is the child to check first
  			let c1, c2;
  			if ( leftToRight ) {

  				c1 = /* node left */ stride4Offset + 8;
  				c2 = /* node right */ uint32Array[ stride4Offset + 6 ];

  			} else {

  				c1 = /* node right */ uint32Array[ stride4Offset + 6 ];
  				c2 = /* node left */ stride4Offset + 8;

  			}

  			const c1Intersection = intersectRayBuffer( c1, float32Array, ray, boxIntersection$1 );
  			const c1Result = c1Intersection ? raycastFirstBuffer( c1, mesh, raycaster, ray ) : null;

  			// if we got an intersection in the first node and it's closer than the second node's bounding
  			// box, we don't need to consider the second node because it couldn't possibly be a better result
  			if ( c1Result ) {

  				// check only along the split axis
  				const rayOrig = ray.origin[ xyzAxis ];
  				const toPoint = rayOrig - c1Result.point[ xyzAxis ];
  				const toChild1 = rayOrig - /* c2 boundingData */ float32Array[ c2 + splitAxis ];
  				const toChild2 = rayOrig - /* c2 boundingData */ float32Array[ c2 + splitAxis + 3 ];

  				const toPointSq = toPoint * toPoint;
  				if ( toPointSq <= toChild1 * toChild1 && toPointSq <= toChild2 * toChild2 ) {

  					return c1Result;

  				}

  			}

  			// either there was no intersection in the first node, or there could still be a closer
  			// intersection in the second, so check the second node and then take the better of the two
  			const c2Intersection = intersectRayBuffer( c2, float32Array, ray, boxIntersection$1 );
  			const c2Result = c2Intersection ? raycastFirstBuffer( c2, mesh, raycaster, ray ) : null;

  			if ( c1Result && c2Result ) {

  				return c1Result.distance <= c2Result.distance ? c1Result : c2Result;

  			} else {

  				return c1Result || c2Result || null;

  			}

  		}

  	}

  	const shapecastBuffer = ( function () {

  		const triangle = new SeparatingAxisTriangle();
  		const cachedBox1 = new THREE.Box3();
  		const cachedBox2 = new THREE.Box3();
  		return function shapecastBuffer( stride4Offset, mesh, intersectsBoundsFunc, intersectsTriangleFunc = null, nodeScoreFunc = null ) {

  			const stride2Offset = stride4Offset * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

  			const isLeaf = /* node count */ uint16Array[ stride2Offset + 15 ] === 0xffff;
  			if ( isLeaf && intersectsTriangleFunc ) {

  				const geometry = mesh.geometry;
  				const index = geometry.index;
  				const pos = geometry.attributes.position;
  				const offset = /* node offset */ uint32Array[ stride4Offset + 6 ];
  				const count = /* node count */ uint16Array[ stride2Offset + 14 ];

  				for ( let i = offset * 3, l = ( count + offset ) * 3; i < l; i += 3 ) {

  					setTriangle( triangle, i, index, pos );
  					triangle.update();

  					if ( intersectsTriangleFunc( triangle, i, i + 1, i + 2 ) ) {

  						return true;

  					}

  				}

  				return false;

  			} else {

  				const left = /* node left */ stride4Offset + 8;
  				const right = /* node right */ uint32Array[ stride4Offset + 6 ];
  				let c1 = left;
  				let c2 = right;

  				let score1, score2;
  				let box1, box2;
  				if ( nodeScoreFunc ) {

  					box1 = cachedBox1;
  					box2 = cachedBox2;

  					arrayToBoxBuffer( /* c1 boundingData */ c1, float32Array, box1 );
  					arrayToBoxBuffer( /* c2 boundingData */ c2, float32Array, box2 );

  					score1 = nodeScoreFunc( box1 );
  					score2 = nodeScoreFunc( box2 );

  					if ( score2 < score1 ) {

  						c1 = right;
  						c2 = left;

  						const temp = score1;
  						score1 = score2;
  						score2 = temp;

  						const tempBox = box1;
  						box1 = box2;
  						box2 = tempBox;

  					}

  				}

  				if ( ! box1 ) {

  					box1 = cachedBox1;
  					arrayToBoxBuffer( /* c1 boundingData */ c1, float32Array, box1 );

  				}

  				const isC1Leaf = /* c1 count */ uint16Array[ c1 + 15 ] === 0xffff;
  				const c1Intersection =
  					intersectsBoundsFunc( box1, isC1Leaf, score1 ) &&
  					shapecastBuffer( c1, mesh, intersectsBoundsFunc, intersectsTriangleFunc, nodeScoreFunc );

  				if ( c1Intersection ) return true;


  				if ( ! box2 ) {

  					box2 = cachedBox2;
  					arrayToBoxBuffer( /* c2 boundingData */ c2, float32Array, box2 );

  				}

  				const isC2Leaf = /* c2 count */ uint16Array[ c2 + 15 ] === 0xffff;
  				const c2Intersection =
  					intersectsBoundsFunc( box2, isC2Leaf, score2 ) &&
  					shapecastBuffer( c2, mesh, intersectsBoundsFunc, intersectsTriangleFunc, nodeScoreFunc );

  				if ( c2Intersection ) return true;

  				return false;

  			}

  		};

  	} )();

  	const intersectsGeometryBuffer = ( function () {

  		const triangle = new SeparatingAxisTriangle();
  		const triangle2 = new SeparatingAxisTriangle();
  		const cachedMesh = new THREE.Mesh();
  		const invertedMat = new THREE.Matrix4();

  		const obb = new OrientedBox();
  		const obb2 = new OrientedBox();

  		return function intersectsGeometryBuffer( stride4Offset, mesh, geometry, geometryToBvh, cachedObb = null ) {

  			const stride2Offset = stride4Offset * 2, float32Array = _float32Array, uint16Array = _uint16Array, uint32Array = _uint32Array;

  			if ( cachedObb === null ) {

  				if ( ! geometry.boundingBox ) {

  					geometry.computeBoundingBox();

  				}

  				obb.set( geometry.boundingBox.min, geometry.boundingBox.max, geometryToBvh );
  				obb.update();
  				cachedObb = obb;

  			}

  			const isLeaf = /* node count */ uint16Array[ stride2Offset + 15 ] === 0xffff;
  			if ( isLeaf ) {

  				const thisGeometry = mesh.geometry;
  				const thisIndex = thisGeometry.index;
  				const thisPos = thisGeometry.attributes.position;

  				const index = geometry.index;
  				const pos = geometry.attributes.position;

  				const offset = /* node offset */ uint32Array[ stride4Offset + 6 ];
  				const count = /* node count */ uint16Array[ stride2Offset + 14 ];

  				// get the inverse of the geometry matrix so we can transform our triangles into the
  				// geometry space we're trying to test. We assume there are fewer triangles being checked
  				// here.
  				invertedMat.getInverse( geometryToBvh );

  				if ( geometry.boundsTree ) {

  					arrayToBoxBuffer( /* node boundingData */ stride4Offset, float32Array, obb2 );
  					obb2.matrix.copy( invertedMat );
  					obb2.update();

  					cachedMesh.geometry = geometry;
  					const res = geometry.boundsTree.shapecast( cachedMesh, box => obb2.intersectsBox( box ), function ( tri ) {

  						tri.a.applyMatrix4( geometryToBvh );
  						tri.b.applyMatrix4( geometryToBvh );
  						tri.c.applyMatrix4( geometryToBvh );
  						tri.update();

  						for ( let i = offset * 3, l = ( count + offset ) * 3; i < l; i += 3 ) {

  							// this triangle needs to be transformed into the current BVH coordinate frame
  							setTriangle( triangle2, i, thisIndex, thisPos );
  							triangle2.update();
  							if ( tri.intersectsTriangle( triangle2 ) ) {

  								return true;

  							}

  						}

  						return false;

  					} );
  					cachedMesh.geometry = null;

  					return res;

  				} else {

  					for ( let i = offset * 3, l = ( count + offset * 3 ); i < l; i += 3 ) {

  						// this triangle needs to be transformed into the current BVH coordinate frame
  						setTriangle( triangle, i, thisIndex, thisPos );
  						triangle.a.applyMatrix4( invertedMat );
  						triangle.b.applyMatrix4( invertedMat );
  						triangle.c.applyMatrix4( invertedMat );
  						triangle.update();

  						for ( let i2 = 0, l2 = index.count; i2 < l2; i2 += 3 ) {

  							setTriangle( triangle2, i2, index, pos );
  							triangle2.update();

  							if ( triangle.intersectsTriangle( triangle2 ) ) {

  								return true;

  							}

  						}

  					}

  				}

  			} else {

  				const left = /* node left */ stride4Offset + 8;
  				const right = /* node right */ uint32Array[ stride4Offset + 6 ];

  				arrayToBoxBuffer( /* left boundingData */ left, float32Array, boundingBox$1 );
  				const leftIntersection =
  					cachedObb.intersectsBox( boundingBox$1 ) &&
  					intersectsGeometryBuffer( left, mesh, geometry, geometryToBvh, cachedObb );

  				if ( leftIntersection ) return true;


  				arrayToBoxBuffer( /* right boundingData */ right, float32Array, boundingBox$1 );
  				const rightIntersection =
  					cachedObb.intersectsBox( boundingBox$1 ) &&
  					intersectsGeometryBuffer( right, mesh, geometry, geometryToBvh, cachedObb );

  				if ( rightIntersection ) return true;

  				return false;

  			}

  		};

  	} )();


  	function intersectRayBuffer( stride4Offset, array, ray, target ) {

  		arrayToBoxBuffer( stride4Offset, array, boundingBox$1 );
  		return ray.intersectBox( boundingBox$1, target );

  	}

  	const bufferStack = [];
  	let _prevBuffer;
  	let _float32Array;
  	let _uint16Array;
  	let _uint32Array;
  	function setBuffer( buffer ) {

  		if ( _prevBuffer ) {

  			bufferStack.push( _prevBuffer );

  		}

  		_prevBuffer = buffer;
  		_float32Array = new Float32Array( buffer );
  		_uint16Array = new Uint16Array( buffer );
  		_uint32Array = new Uint32Array( buffer );

  	}

  	function clearBuffer() {

  		_prevBuffer = null;
  		_float32Array = null;
  		_uint16Array = null;
  		_uint32Array = null;

  		if ( bufferStack.length ) {

  			setBuffer( bufferStack.pop() );

  		}

  	}

  	function arrayToBoxBuffer( stride4Offset, array, target ) {

  		target.min.x = array[ stride4Offset ];
  		target.min.y = array[ stride4Offset + 1 ];
  		target.min.z = array[ stride4Offset + 2 ];

  		target.max.x = array[ stride4Offset + 3 ];
  		target.max.y = array[ stride4Offset + 4 ];
  		target.max.z = array[ stride4Offset + 5 ];

  	}

  	// boundingData  				: 6 float32
  	// right / offset 				: 1 uint32
  	// splitAxis / isLeaf + count 	: 1 uint32 / 2 uint16
  	const BYTES_PER_NODE = 6 * 4 + 4 + 4;
  	const IS_LEAFNODE_FLAG = 0xFFFF;
  	const SKIP_GENERATION = Symbol( 'skip tree generation' );

  	const obb = new OrientedBox();
  	const temp = new THREE.Vector3();
  	const tri2 = new SeparatingAxisTriangle();
  	const temp1 = new THREE.Vector3();
  	const temp2 = new THREE.Vector3();

  	class MeshBVH {

  		static serialize( bvh, geometry, copyIndexBuffer = true ) {

  			function finishTree( node ) {

  				if ( node.continueGeneration ) {

  					node.continueGeneration();

  				}

  				if ( ! node.count ) {

  					finishTree( node.left );
  					finishTree( node.right );

  				}

  			}

  			function countNodes( node ) {

  				if ( node.count ) {

  					return 1;

  				} else {

  					return 1 + countNodes( node.left ) + countNodes( node.right );

  				}

  			}

  			function populateBuffer( byteOffset, node ) {

  				const stride4Offset = byteOffset / 4;
  				const stride2Offset = byteOffset / 2;
  				const isLeaf = ! ! node.count;
  				const boundingData = node.boundingData;
  				for ( let i = 0; i < 6; i ++ ) {

  					float32Array[ stride4Offset + i ] = boundingData[ i ];

  				}

  				if ( isLeaf ) {

  					const offset = node.offset;
  					const count = node.count;
  					uint32Array[ stride4Offset + 6 ] = offset;
  					uint16Array[ stride2Offset + 14 ] = count;
  					uint16Array[ stride2Offset + 15 ] = IS_LEAFNODE_FLAG;
  					return byteOffset + BYTES_PER_NODE;

  				} else {

  					const left = node.left;
  					const right = node.right;
  					const splitAxis = node.splitAxis;

  					let nextUnusedPointer;
  					nextUnusedPointer = populateBuffer( byteOffset + BYTES_PER_NODE, left );

  					uint32Array[ stride4Offset + 6 ] = nextUnusedPointer / 4;
  					nextUnusedPointer = populateBuffer( nextUnusedPointer, right );

  					uint32Array[ stride4Offset + 7 ] = splitAxis;
  					return nextUnusedPointer;

  				}

  			}

  			let float32Array;
  			let uint32Array;
  			let uint16Array;

  			const roots = bvh._roots;
  			let rootData;

  			if ( bvh._isPacked ) {

  				rootData = roots;

  			} else {

  				rootData = [];
  				for ( let i = 0; i < roots.length; i ++ ) {

  					const root = roots[ i ];
  					finishTree( root );
  					let nodeCount = countNodes( root );

  					const buffer = new ArrayBuffer( BYTES_PER_NODE * nodeCount );
  					float32Array = new Float32Array( buffer );
  					uint32Array = new Uint32Array( buffer );
  					uint16Array = new Uint16Array( buffer );
  					populateBuffer( 0, root );
  					rootData.push( buffer );

  				}

  			}

  			const indexAttribute = geometry.getIndex();
  			const result = {
  				roots: rootData,
  				index: copyIndexBuffer ? indexAttribute.array.slice() : indexAttribute.array,
  			};

  			return result;

  		}

  		static deserialize( data, geometry, setIndex = true ) {

  			// function setData( byteOffset, node ) {

  			// 	const stride4Offset = byteOffset / 4;
  			// 	const stride2Offset = byteOffset / 2;
  			// 	const boundingData = new Float32Array( 6 );
  			// 	for ( let i = 0; i < 6; i ++ ) {

  			// 		boundingData[ i ] = float32Array[ stride4Offset + i ];

  			// 	}
  			// 	node.boundingData = boundingData;

  			// 	const isLeaf = uint16Array[ stride2Offset + 15 ] === IS_LEAFNODE_FLAG;
  			// 	if ( isLeaf ) {

  			// 		node.offset = uint32Array[ stride4Offset + 6 ];
  			// 		node.count = uint16Array[ stride2Offset + 14 ];

  			// 	} else {

  			// 		const left = new MeshBVHNode();
  			// 		const right = new MeshBVHNode();
  			// 		const leftOffset = stride4Offset + BYTES_PER_NODE / 4;
  			// 		const rightOffset = uint32Array[ stride4Offset + 6 ];

  			// 		setData( leftOffset * 4, left );
  			// 		setData( rightOffset * 4, right );

  			// 		node.left = left;
  			// 		node.right = right;
  			// 		node.splitAxis = uint32Array[ stride4Offset + 7 ];

  			// 	}

  			// }

  			// let float32Array;
  			// let uint32Array;
  			// let uint16Array;

  			// const { index, roots } = data;
  			// const bvh = new MeshBVH( geometry, { [ SKIP_GENERATION ]: true } );
  			// bvh._roots = [];
  			// for ( let i = 0; i < roots.length; i ++ ) {

  			// 	const buffer = roots[ i ];
  			// 	float32Array = new Float32Array( buffer );
  			// 	uint32Array = new Uint32Array( buffer );
  			// 	uint16Array = new Uint16Array( buffer );

  			// 	const root = new MeshBVHNode();
  			// 	setData( 0, root );
  			// 	bvh._roots.push( root );

  			// }

  			const { index, roots } = data;
  			const bvh = new MeshBVH( geometry, { [ SKIP_GENERATION ]: true } );
  			bvh._roots = roots;
  			bvh._isPacked = true;

  			if ( setIndex ) {

  				const indexAttribute = geometry.getIndex();
  				if ( indexAttribute === null ) {

  					const newIndex = new THREE.BufferAttribute( data.index, 1, false );
  					geometry.setIndex( newIndex );

  				} else if ( indexAttribute.array !== index ) {

  					indexAttribute.array.set( index );
  					indexAttribute.needsUpdate = true;

  				}

  			}

  			return bvh;

  		}

  		constructor( geo, options = {} ) {

  			if ( ! geo.isBufferGeometry ) {

  				throw new Error( 'MeshBVH: Only BufferGeometries are supported.' );

  			} else if ( geo.attributes.position.isInterleavedBufferAttribute ) {

  				throw new Error( 'MeshBVH: InterleavedBufferAttribute is not supported for the position attribute.' );

  			} else if ( geo.index && geo.index.isInterleavedBufferAttribute ) {

  				throw new Error( 'MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.' );

  			}

  			// default options
  			options = Object.assign( {

  				strategy: CENTER,
  				maxDepth: 40,
  				maxLeafTris: 10,
  				verbose: true,
  				lazyGeneration: true,

  				// undocumented options

  				// whether to the pack the data as a buffer or not. The data
  				// will not be packed if lazyGeneration is true.
  				packData: true,

  				// Whether to skip generating the tree. Used for deserialization.
  				[ SKIP_GENERATION ]: false

  			}, options );
  			options.strategy = Math.max( 0, Math.min( 2, options.strategy ) );

  			this._isPacked = false;
  			this._roots = null;
  			if ( ! options[ SKIP_GENERATION ] ) {

  				this._roots = buildTree( geo, options );
  				if ( ! options.lazyGeneration && options.packData ) {

  					this._roots = MeshBVH.serialize( this, geo, false ).roots;
  					this._isPacked = true;

  				}

  			}

  		}

  		traverse( callback, rootIndex = 0 ) {

  			if ( this._isPacked ) {

  				const buffer = this._roots[ rootIndex ];
  				const uint32Array = new Uint32Array( buffer );
  				const uint16Array = new Uint16Array( buffer );
  				_traverseBuffer( 0 );

  				function _traverseBuffer( stride4Offset, depth = 0 ) {

  					const stride2Offset = stride4Offset * 2;
  					const isLeaf = uint16Array[ stride2Offset + 15 ];
  					if ( isLeaf ) {

  						const offset = uint32Array[ stride4Offset + 6 ];
  						const count = uint16Array[ stride2Offset + 14 ];
  						callback( depth, isLeaf, new Float32Array( buffer, stride4Offset * 4, 6 ), offset, count );

  					} else {

  						const left = stride4Offset + BYTES_PER_NODE / 4;
  						const right = uint32Array[ stride4Offset + 6 ];
  						const splitAxis = uint32Array[ stride4Offset + 7 ];
  						callback( depth, isLeaf, new Float32Array( buffer, stride4Offset * 4, 6 ), splitAxis, false );

  						_traverseBuffer( left, depth + 1 );
  						_traverseBuffer( right, depth + 1 );

  					}

  				}

  			} else {

  				_traverseNode( this._roots[ rootIndex ] );

  				function _traverseNode( node, depth = 0 ) {

  					const isLeaf = ! ! node.count;
  					if ( isLeaf ) {

  						callback( depth, isLeaf, node.boundingData, node.offset, node.count );

  					} else {

  						callback( depth, isLeaf, node.boundingData, node.splitAxis, ! ! node.continueGeneration );
  						if ( node.left ) _traverseNode( node.left, depth + 1 );
  						if ( node.right ) _traverseNode( node.right, depth + 1 );

  					}

  				}

  			}

  		}

  		/* Core Cast Functions */
  		raycast( mesh, raycaster, ray, intersects ) {

  			const isPacked = this._isPacked;
  			for ( const root of this._roots ) {

  				if ( isPacked ) {

  					setBuffer( root );
  					raycastBuffer( 0, mesh, raycaster, ray, intersects );

  				} else {

  					raycast( root, mesh, raycaster, ray, intersects );

  				}

  			}

  			isPacked && clearBuffer();

  		}

  		raycastFirst( mesh, raycaster, ray ) {

  			const isPacked = this._isPacked;
  			let closestResult = null;
  			for ( const root of this._roots ) {

  				let result;
  				if ( isPacked ) {

  					setBuffer( root );
  					result = raycastFirstBuffer( 0, mesh, raycaster, ray );

  				} else {

  					result = raycastFirst( root, mesh, raycaster, ray );

  				}

  				if ( result != null && ( closestResult == null || result.distance < closestResult.distance ) ) {

  					closestResult = result;

  				}

  			}

  			isPacked && clearBuffer();

  			return closestResult;

  		}

  		intersectsGeometry( mesh, geometry, geomToMesh ) {

  			const isPacked = this._isPacked;
  			let result = false;
  			for ( const root of this._roots ) {

  				if ( isPacked ) {

  					setBuffer( root );
  					result = intersectsGeometryBuffer( 0, mesh, geometry, geomToMesh );

  				} else {

  					result = intersectsGeometry( root, mesh, geometry, geomToMesh );

  				}

  				if ( result ) {

  					break;

  				}

  			}

  			isPacked && clearBuffer();

  			return result;

  		}

  		shapecast( mesh, intersectsBoundsFunc, intersectsTriangleFunc = null, orderNodesFunc = null ) {

  			const isPacked = this._isPacked;
  			let result = false;
  			for ( const root of this._roots ) {

  				if ( isPacked ) {

  					setBuffer( root );
  					result = shapecastBuffer( 0, mesh, intersectsBoundsFunc, intersectsTriangleFunc, orderNodesFunc );

  				} else {

  					result = shapecast( root, mesh, intersectsBoundsFunc, intersectsTriangleFunc, orderNodesFunc );

  				}

  				if ( result ) {

  					break;

  				}

  			}

  			isPacked && clearBuffer();

  			return result;

  		}

  		/* Derived Cast Functions */
  		intersectsBox( mesh, box, boxToMesh ) {

  			obb.set( box.min, box.max, boxToMesh );
  			obb.update();

  			return this.shapecast(
  				mesh,
  				box => obb.intersectsBox( box ),
  				tri => obb.intersectsTriangle( tri )
  			);

  		}

  		intersectsSphere( mesh, sphere ) {

  			return this.shapecast(
  				mesh,
  				box => sphere.intersectsBox( box ),
  				tri => sphereIntersectTriangle( sphere, tri )
  			);

  		}

  		closestPointToGeometry( mesh, geom, geometryToBvh, target1 = null, target2 = null, minThreshold = 0, maxThreshold = Infinity ) {

  			if ( ! geom.boundingBox ) {

  				geom.computeBoundingBox();

  			}

  			obb.set( geom.boundingBox.min, geom.boundingBox.max, geometryToBvh );
  			obb.update();

  			const pos = geom.attributes.position;
  			const index = geom.index;

  			let tempTarget1 = null;
  			let tempTarget2 = null;
  			if ( target1 ) {

  				tempTarget1 = temp1;

  			}

  			if ( target2 ) {

  				tempTarget2 = temp2;

  			}

  			let closestDistance = Infinity;
  			this.shapecast(
  				mesh,
  				( box, isLeaf, score ) => score < closestDistance && score < maxThreshold,
  				tri => {

  					const sphere1 = tri.sphere;
  					for ( let i2 = 0, l2 = index.count; i2 < l2; i2 += 3 ) {

  						setTriangle( tri2, i2, index, pos );
  						tri2.a.applyMatrix4( geometryToBvh );
  						tri2.b.applyMatrix4( geometryToBvh );
  						tri2.c.applyMatrix4( geometryToBvh );
  						tri2.sphere.setFromPoints( tri2.points );

  						const sphere2 = tri2.sphere;
  						const sphereDist = sphere2.center.distanceTo( sphere1.center ) - sphere2.radius - sphere1.radius;
  						if ( sphereDist > closestDistance ) {

  							continue;

  						}

  						tri2.update();

  						const dist = tri.distanceToTriangle( tri2, tempTarget1, tempTarget2 );
  						if ( dist < closestDistance ) {

  							if ( target1 ) {

  								target1.copy( tempTarget1 );

  							}

  							if ( target2 ) {

  								target2.copy( tempTarget2 );

  							}

  							closestDistance = dist;

  						}
  						if ( dist < minThreshold ) return true;

  					}

  					return false;

  				},
  				box => obb.distanceToBox( box, Math.min( closestDistance, maxThreshold ) )

  			);

  			return closestDistance;

  		}

  		distanceToGeometry( mesh, geom, matrix, minThreshold, maxThreshold ) {

  			return this.closestPointToGeometry( mesh, geom, matrix, null, null, minThreshold, maxThreshold );

  		}

  		closestPointToPoint( mesh, point, target, minThreshold = 0, maxThreshold = Infinity ) {

  			// early out if under minThreshold
  			// skip checking if over maxThreshold
  			// set minThreshold = maxThreshold to quickly check if a point is within a threshold
  			// returns Infinity if no value found
  			let closestDistance = Infinity;
  			this.shapecast(

  				mesh,
  				( box, isLeaf, score ) => score < closestDistance && score < maxThreshold,
  				tri => {

  					tri.closestPointToPoint( point, temp );
  					const dist = point.distanceTo( temp );
  					if ( dist < closestDistance ) {

  						if ( target ) {

  							target.copy( temp );

  						}
  						closestDistance = dist;

  					}

  					if ( dist < minThreshold ) {

  						return true;

  					} else {

  						return false;

  					}

  				},
  				box => box.distanceToPoint( point )

  			);

  			return closestDistance;

  		}

  		distanceToPoint( mesh, point, minThreshold, maxThreshold ) {

  			return this.closestPointToPoint( mesh, point, null, minThreshold, maxThreshold );

  		}

  	}

  	const wiremat = new THREE.LineBasicMaterial( { color: 0x00FF88, transparent: true, opacity: 0.3 } );
  	const boxGeom = new THREE.Box3Helper().geometry;
  	let boundingBox$2 = new THREE.Box3();

  	class MeshBVHRootVisualizer extends THREE.Group {

  		constructor( mesh, depth = 10, group = 0 ) {

  			super( 'MeshBVHRootVisualizer' );

  			this.depth = depth;
  			this._oldDepth = - 1;
  			this._mesh = mesh;
  			this._boundsTree = null;
  			this._group = group;

  			this.update();

  		}

  		update() {

  			this._oldDepth = this.depth;
  			this._boundsTree = this._mesh.geometry.boundsTree;

  			let requiredChildren = 0;
  			if ( this._boundsTree ) {

  				this._boundsTree.traverse( ( depth, isLeaf, boundingData, offsetOrSplit, countOrIsUnfinished ) => {

  					let isTerminal = isLeaf || countOrIsUnfinished;

  					if ( depth >= this.depth ) return;

  					if ( depth === this.depth - 1 || isTerminal ) {

  						let m = requiredChildren < this.children.length ? this.children[ requiredChildren ] : null;
  						if ( ! m ) {

  							m = new THREE.LineSegments( boxGeom, wiremat );
  							m.raycast = () => [];
  							this.add( m );

  						}
  						requiredChildren ++;
  						arrayToBox( boundingData, boundingBox$2 );
  						boundingBox$2.getCenter( m.position );
  						m.scale.subVectors( boundingBox$2.max, boundingBox$2.min ).multiplyScalar( 0.5 );

  						if ( m.scale.x === 0 ) m.scale.x = Number.EPSILON;
  						if ( m.scale.y === 0 ) m.scale.y = Number.EPSILON;
  						if ( m.scale.z === 0 ) m.scale.z = Number.EPSILON;

  					}

  				} );

  			}

  			while ( this.children.length > requiredChildren ) this.remove( this.children.pop() );

  		}

  	}

  	class MeshBVHVisualizer extends THREE.Group {

  		constructor( mesh, depth = 10 ) {

  			super( 'MeshBVHVisualizer' );

  			this.depth = depth;
  			this._mesh = mesh;
  			this._roots = [];

  			this.update();

  		}

  		update() {

  			const bvh = this._mesh.geometry.boundsTree;
  			const totalRoots = bvh ? bvh._roots.length : 0;
  			while ( this._roots.length > totalRoots ) {

  				this._roots.pop();

  			}

  			for ( let i = 0; i < totalRoots; i ++ ) {

  				if ( i >= this._roots.length ) {

  					const root = new MeshBVHRootVisualizer( this._mesh, this.depth, i );
  					this.add( root );
  					this._roots.push( root );

  				} else {

  					let root = this._roots[ i ];
  					root.depth = this.depth;
  					root.update();

  				}

  			}

  			this.position.copy( this._mesh.position );
  			this.rotation.copy( this._mesh.rotation );
  			this.scale.copy( this._mesh.scale );

  		}

  	}

  	const ray = new THREE.Ray();
  	const tmpInverseMatrix = new THREE.Matrix4();
  	const origMeshRaycastFunc = THREE.Mesh.prototype.raycast;

  	function acceleratedRaycast( raycaster, intersects ) {

  		if ( this.geometry.boundsTree ) {

  			if ( this.material === undefined ) return;

  			tmpInverseMatrix.getInverse( this.matrixWorld );
  			ray.copy( raycaster.ray ).applyMatrix4( tmpInverseMatrix );

  			if ( raycaster.firstHitOnly === true ) {

  				const res = this.geometry.boundsTree.raycastFirst( this, raycaster, ray );
  				if ( res ) intersects.push( res );

  			} else {

  				this.geometry.boundsTree.raycast( this, raycaster, ray, intersects );

  			}

  		} else {

  			origMeshRaycastFunc.call( this, raycaster, intersects );

  		}

  	}

  	function computeBoundsTree( options ) {

  		this.boundsTree = new MeshBVH( this, options );
  		return this.boundsTree;

  	}

  	function disposeBoundsTree() {

  		this.boundsTree = null;

      }
  // Below are commented by HTC

  // 	exports.MeshBVH = MeshBVH;
  // 	exports.Visualizer = MeshBVHVisualizer;
  // 	exports.acceleratedRaycast = acceleratedRaycast;
  // 	exports.computeBoundsTree = computeBoundsTree;
  // 	exports.disposeBoundsTree = disposeBoundsTree;
  // 	exports.CENTER = CENTER;
  // 	exports.AVERAGE = AVERAGE;
  // 	exports.SAH = SAH;
  // 	exports.estimateMemoryInBytes = estimateMemoryInBytes;
  // 	exports.getBVHExtremes = getBVHExtremes;

  // 	Object.defineProperty(exports, '__esModule', { value: true });

  // }));

  // This file has been edited by HTC to work around importing CJS into ESM
  // This is just decompreesion part rather than the full LZMA-JS
  // Repo is here: https://github.com/LZMA-JS/LZMA-JS

  ///NOTE: This file was generated by minify.js from lzma_worker.js. Do not modify.

  /// © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT
  /// See LICENSE for more details.

  /* jshint noarg:true, boss:true, unused:strict, strict:true, undef:true, noarg: true, forin:true, evil:true, newcap:false, -W041, -W021, worker:true, browser:true, node:true */

  /* global setImmediate, setTimeout, window, onmessage */



  var LZMA = (function () {
      
      var 
          /** ds */
          action_decompress = 2,
          /** de */
          action_progress   = 3,
          wait = typeof setImmediate == "function" ? setImmediate : setTimeout,
          __4294967296 = 4294967296,
          N1_longLit = [4294967295, -__4294967296],
          
          P0_longLit = [0, 0],
          P1_longLit = [1, 0];
      
      function update_progress(percent, cbn) {
          postMessage({
              action: action_progress,
              cbn: cbn,
              result: percent
          });
      }
      
      function initDim(len) {
          ///NOTE: This is MUCH faster than "new Array(len)" in newer versions of v8 (starting with Node.js 0.11.15, which uses v8 3.28.73).
          var a = [];
          a[len - 1] = undefined;
          return a;
      }
      
      function add(a, b) {
          return create(a[0] + b[0], a[1] + b[1]);
      }
      
      
      
      function compare(a, b) {
          var nega, negb;
          if (a[0] == b[0] && a[1] == b[1]) {
              return 0;
          }
          nega = a[1] < 0;
          negb = b[1] < 0;
          if (nega && !negb) {
              return -1;
          }
          if (!nega && negb) {
              return 1;
          }
          if (sub(a, b)[1] < 0) {
              return -1;
          }
          return 1;
      }
      
      function create(valueLow, valueHigh) {
          var diffHigh, diffLow;
          valueHigh %= 1.8446744073709552E19;
          valueLow %= 1.8446744073709552E19;
          diffHigh = valueHigh % __4294967296;
          diffLow = Math.floor(valueLow / __4294967296) * __4294967296;
          valueHigh = valueHigh - diffHigh + diffLow;
          valueLow = valueLow - diffLow + diffHigh;
          while (valueLow < 0) {
              valueLow += __4294967296;
              valueHigh -= __4294967296;
          }
          while (valueLow > 4294967295) {
              valueLow -= __4294967296;
              valueHigh += __4294967296;
          }
          valueHigh = valueHigh % 1.8446744073709552E19;
          while (valueHigh > 9223372032559808512) {
              valueHigh -= 1.8446744073709552E19;
          }
          while (valueHigh < -9223372036854775808) {
              valueHigh += 1.8446744073709552E19;
          }
          return [valueLow, valueHigh];
      }
      
      
      function fromInt(value) {
          if (value >= 0) {
              return [value, 0];
          } else {
              return [value + __4294967296, -__4294967296];
          }
      }
      
      function lowBits_0(a) {
          if (a[0] >= 2147483648) {
              return ~~Math.max(Math.min(a[0] - __4294967296, 2147483647), -2147483648);
          } else {
              return ~~Math.max(Math.min(a[0], 2147483647), -2147483648);
          }
      }
      
      
      function sub(a, b) {
          return create(a[0] - b[0], a[1] - b[1]);
      }
      
      function $ByteArrayInputStream(this$static, buf) {
          this$static.buf = buf;
          this$static.pos = 0;
          this$static.count = buf.length;
          return this$static;
      }
      
      /** ds */
      function $read(this$static) {
          if (this$static.pos >= this$static.count)
              return -1;
          return this$static.buf[this$static.pos++] & 255;
      }
      /** de */
      
      
      function $ByteArrayOutputStream(this$static) {
          this$static.buf = initDim(32);
          this$static.count = 0;
          return this$static;
      }
      
      function $toByteArray(this$static) {
          var data = this$static.buf;
          data.length = this$static.count;
          return data;
      }
      
      
      
      function $write_0(this$static, buf, off, len) {
          arraycopy(buf, off, this$static.buf, this$static.count, len);
          this$static.count += len;
      }
      
      
      
      function arraycopy(src, srcOfs, dest, destOfs, len) {
          for (var i = 0; i < len; ++i) {
              dest[destOfs + i] = src[srcOfs + i];
          }
      }
      
      
      
      /** ds */
      function $init_0(this$static, input, output) {
          var decoder,
              hex_length = "",
              i,
              properties = [],
              r,
              tmp_length;
          
          for (i = 0; i < 5; ++i) {
              r = $read(input);
              if (r == -1)
                  throw new Error("truncated input");
              properties[i] = r << 24 >> 24;
          }
          
          decoder = $Decoder({});
          if (!$SetDecoderProperties(decoder, properties)) {
              throw new Error("corrupted input");
          }
          for (i = 0; i < 64; i += 8) {
              r = $read(input);
              if (r == -1)
                  throw new Error("truncated input");
              r = r.toString(16);
              if (r.length == 1) r = "0" + r;
              hex_length = r + "" + hex_length;
          }
          
          /// Was the length set in the header (if it was compressed from a stream, the length is all f"s).
          if (/^0+$|^f+$/i.test(hex_length)) {
              /// The length is unknown, so set to -1.
              this$static.length_0 = N1_longLit;
          } else {
              ///NOTE: If there is a problem with the decoder because of the length, you can always set the length to -1 (N1_longLit) which means unknown.
              tmp_length = parseInt(hex_length, 16);
              /// If the length is too long to handle, just set it to unknown.
              if (tmp_length > 4294967295) {
                  this$static.length_0 = N1_longLit;
              } else {
                  this$static.length_0 = fromInt(tmp_length);
              }
          }
          
          this$static.chunker = $CodeInChunks(decoder, input, output, this$static.length_0);
      }
      
      function $LZMAByteArrayDecompressor(this$static, data) {
          this$static.output = $ByteArrayOutputStream({});
          $init_0(this$static, $ByteArrayInputStream({}, data), this$static.output);
          return this$static;
      }
      /** de */
      
      /** ds */
      function $CopyBlock(this$static, distance, len) {
          var pos = this$static._pos - distance - 1;
          if (pos < 0) {
              pos += this$static._windowSize;
          }
          for (; len != 0; --len) {
              if (pos >= this$static._windowSize) {
                  pos = 0;
              }
              this$static._buffer[this$static._pos++] = this$static._buffer[pos++];
              if (this$static._pos >= this$static._windowSize) {
                  $Flush_0(this$static);
              }
          }
      }
      
      function $Create_5(this$static, windowSize) {
          if (this$static._buffer == null || this$static._windowSize != windowSize) {
              this$static._buffer = initDim(windowSize);
          }
          this$static._windowSize = windowSize;
          this$static._pos = 0;
          this$static._streamPos = 0;
      }
      
      function $Flush_0(this$static) {
          var size = this$static._pos - this$static._streamPos;
          if (!size) {
              return;
          }
          $write_0(this$static._stream, this$static._buffer, this$static._streamPos, size);
          if (this$static._pos >= this$static._windowSize) {
              this$static._pos = 0;
          }
          this$static._streamPos = this$static._pos;
      }
      
      function $GetByte(this$static, distance) {
          var pos = this$static._pos - distance - 1;
          if (pos < 0) {
              pos += this$static._windowSize;
          }
          return this$static._buffer[pos];
      }
      
      function $PutByte(this$static, b) {
          this$static._buffer[this$static._pos++] = b;
          if (this$static._pos >= this$static._windowSize) {
              $Flush_0(this$static);
          }
      }
      
      function $ReleaseStream(this$static) {
          $Flush_0(this$static);
          this$static._stream = null;
      }
      /** de */
      
      function GetLenToPosState(len) {
          len -= 2;
          if (len < 4) {
              return len;
          }
          return 3;
      }
      
      function StateUpdateChar(index) {
          if (index < 4) {
              return 0;
          }
          if (index < 10) {
              return index - 3;
          }
          return index - 6;
      }
      
      
      /** ds */
      function $Chunker(this$static, decoder) {
          this$static.decoder = decoder;
          this$static.encoder = null;
          this$static.alive = 1;
          return this$static;
      }
      /** de */
      
      function $processChunk(this$static) {
          if (!this$static.alive) {
              throw new Error("bad state");
          }
          
          if (this$static.encoder) {
              throw new Error("No encoding");
              
          } else {
              /// co:throw new Error("No decoding");
              /** ds */
              $processDecoderChunk(this$static);
              /** de */
          }
          return this$static.alive;
      }
      
      /** ds */
      function $processDecoderChunk(this$static) {
          var result = $CodeOneChunk(this$static.decoder);
          if (result == -1) {
              throw new Error("corrupted input");
          }
          this$static.inBytesProcessed = N1_longLit;
          this$static.outBytesProcessed = this$static.decoder.nowPos64;
          if (result || compare(this$static.decoder.outSize, P0_longLit) >= 0 && compare(this$static.decoder.nowPos64, this$static.decoder.outSize) >= 0) {
              $Flush_0(this$static.decoder.m_OutWindow);
              $ReleaseStream(this$static.decoder.m_OutWindow);
              this$static.decoder.m_RangeDecoder.Stream = null;
              this$static.alive = 0;
          }
      }
      /** de */
      
      
      /** ds */
      function $CodeInChunks(this$static, inStream, outStream, outSize) {
          this$static.m_RangeDecoder.Stream = inStream;
          $ReleaseStream(this$static.m_OutWindow);
          this$static.m_OutWindow._stream = outStream;
          $Init_1(this$static);
          this$static.state = 0;
          this$static.rep0 = 0;
          this$static.rep1 = 0;
          this$static.rep2 = 0;
          this$static.rep3 = 0;
          this$static.outSize = outSize;
          this$static.nowPos64 = P0_longLit;
          this$static.prevByte = 0;
          return $Chunker({}, this$static);
      }
      
      function $CodeOneChunk(this$static) {
          var decoder2, distance, len, numDirectBits, posSlot, posState;
          posState = lowBits_0(this$static.nowPos64) & this$static.m_PosStateMask;
          if (!$DecodeBit(this$static.m_RangeDecoder, this$static.m_IsMatchDecoders, (this$static.state << 4) + posState)) {
              decoder2 = $GetDecoder(this$static.m_LiteralDecoder, lowBits_0(this$static.nowPos64), this$static.prevByte);
              if (this$static.state < 7) {
                  this$static.prevByte = $DecodeNormal(decoder2, this$static.m_RangeDecoder);
              } else {
                  this$static.prevByte = $DecodeWithMatchByte(decoder2, this$static.m_RangeDecoder, $GetByte(this$static.m_OutWindow, this$static.rep0));
              }
              $PutByte(this$static.m_OutWindow, this$static.prevByte);
              this$static.state = StateUpdateChar(this$static.state);
              this$static.nowPos64 = add(this$static.nowPos64, P1_longLit);
          } else {
              if ($DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepDecoders, this$static.state)) {
                  len = 0;
                  if (!$DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG0Decoders, this$static.state)) {
                      if (!$DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRep0LongDecoders, (this$static.state << 4) + posState)) {
                          this$static.state = this$static.state < 7?9:11;
                          len = 1;
                      }
                  } else {
                      if (!$DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG1Decoders, this$static.state)) {
                          distance = this$static.rep1;
                      } else {
                          if (!$DecodeBit(this$static.m_RangeDecoder, this$static.m_IsRepG2Decoders, this$static.state)) {
                              distance = this$static.rep2;
                          } else {
                              distance = this$static.rep3;
                              this$static.rep3 = this$static.rep2;
                          }
                          this$static.rep2 = this$static.rep1;
                      }
                      this$static.rep1 = this$static.rep0;
                      this$static.rep0 = distance;
                  }
                  if (!len) {
                      len = $Decode(this$static.m_RepLenDecoder, this$static.m_RangeDecoder, posState) + 2;
                      this$static.state = this$static.state < 7?8:11;
                  }
              } else {
                  this$static.rep3 = this$static.rep2;
                  this$static.rep2 = this$static.rep1;
                  this$static.rep1 = this$static.rep0;
                  len = 2 + $Decode(this$static.m_LenDecoder, this$static.m_RangeDecoder, posState);
                  this$static.state = this$static.state < 7?7:10;
                  posSlot = $Decode_0(this$static.m_PosSlotDecoder[GetLenToPosState(len)], this$static.m_RangeDecoder);
                  if (posSlot >= 4) {
                      numDirectBits = (posSlot >> 1) - 1;
                      this$static.rep0 = (2 | posSlot & 1) << numDirectBits;
                      if (posSlot < 14) {
                          this$static.rep0 += ReverseDecode(this$static.m_PosDecoders, this$static.rep0 - posSlot - 1, this$static.m_RangeDecoder, numDirectBits);
                      } else {
                          this$static.rep0 += $DecodeDirectBits(this$static.m_RangeDecoder, numDirectBits - 4) << 4;
                          this$static.rep0 += $ReverseDecode(this$static.m_PosAlignDecoder, this$static.m_RangeDecoder);
                          if (this$static.rep0 < 0) {
                              if (this$static.rep0 == -1) {
                                  return 1;
                              }
                              return -1;
                          }
                      }
                  } else 
                      this$static.rep0 = posSlot;
              }
              if (compare(fromInt(this$static.rep0), this$static.nowPos64) >= 0 || this$static.rep0 >= this$static.m_DictionarySizeCheck) {
                  return -1;
              }
              $CopyBlock(this$static.m_OutWindow, this$static.rep0, len);
              this$static.nowPos64 = add(this$static.nowPos64, fromInt(len));
              this$static.prevByte = $GetByte(this$static.m_OutWindow, 0);
          }
          return 0;
      }
      
      function $Decoder(this$static) {
          this$static.m_OutWindow = {};
          this$static.m_RangeDecoder = {};
          this$static.m_IsMatchDecoders = initDim(192);
          this$static.m_IsRepDecoders = initDim(12);
          this$static.m_IsRepG0Decoders = initDim(12);
          this$static.m_IsRepG1Decoders = initDim(12);
          this$static.m_IsRepG2Decoders = initDim(12);
          this$static.m_IsRep0LongDecoders = initDim(192);
          this$static.m_PosSlotDecoder = initDim(4);
          this$static.m_PosDecoders = initDim(114);
          this$static.m_PosAlignDecoder = $BitTreeDecoder({}, 4);
          this$static.m_LenDecoder = $Decoder$LenDecoder({});
          this$static.m_RepLenDecoder = $Decoder$LenDecoder({});
          this$static.m_LiteralDecoder = {};
          for (var i = 0; i < 4; ++i) {
              this$static.m_PosSlotDecoder[i] = $BitTreeDecoder({}, 6);
          }
          return this$static;
      }
      
      function $Init_1(this$static) {
          this$static.m_OutWindow._streamPos = 0;
          this$static.m_OutWindow._pos = 0;
          InitBitModels(this$static.m_IsMatchDecoders);
          InitBitModels(this$static.m_IsRep0LongDecoders);
          InitBitModels(this$static.m_IsRepDecoders);
          InitBitModels(this$static.m_IsRepG0Decoders);
          InitBitModels(this$static.m_IsRepG1Decoders);
          InitBitModels(this$static.m_IsRepG2Decoders);
          InitBitModels(this$static.m_PosDecoders);
          $Init_0(this$static.m_LiteralDecoder);
          for (var i = 0; i < 4; ++i) {
              InitBitModels(this$static.m_PosSlotDecoder[i].Models);
          }
          $Init(this$static.m_LenDecoder);
          $Init(this$static.m_RepLenDecoder);
          InitBitModels(this$static.m_PosAlignDecoder.Models);
          $Init_8(this$static.m_RangeDecoder);
      }
      
      function $SetDecoderProperties(this$static, properties) {
          var dictionarySize, i, lc, lp, pb, remainder, val;
          if (properties.length < 5)
              return 0;
          val = properties[0] & 255;
          lc = val % 9;
          remainder = ~~(val / 9);
          lp = remainder % 5;
          pb = ~~(remainder / 5);
          dictionarySize = 0;
          for (i = 0; i < 4; ++i) {
              dictionarySize += (properties[1 + i] & 255) << i * 8;
          }
          ///NOTE: If the input is bad, it might call for an insanely large dictionary size, which would crash the script.
          if (dictionarySize > 99999999 || !$SetLcLpPb(this$static, lc, lp, pb)) {
              return 0;
          }
          return $SetDictionarySize(this$static, dictionarySize);
      }
      
      function $SetDictionarySize(this$static, dictionarySize) {
          if (dictionarySize < 0) {
              return 0;
          }
          if (this$static.m_DictionarySize != dictionarySize) {
              this$static.m_DictionarySize = dictionarySize;
              this$static.m_DictionarySizeCheck = Math.max(this$static.m_DictionarySize, 1);
              $Create_5(this$static.m_OutWindow, Math.max(this$static.m_DictionarySizeCheck, 4096));
          }
          return 1;
      }
      
      function $SetLcLpPb(this$static, lc, lp, pb) {
          if (lc > 8 || lp > 4 || pb > 4) {
              return 0;
          }
          $Create_0(this$static.m_LiteralDecoder, lp, lc);
          var numPosStates = 1 << pb;
          $Create(this$static.m_LenDecoder, numPosStates);
          $Create(this$static.m_RepLenDecoder, numPosStates);
          this$static.m_PosStateMask = numPosStates - 1;
          return 1;
      }
      
      function $Create(this$static, numPosStates) {
          for (; this$static.m_NumPosStates < numPosStates; ++this$static.m_NumPosStates) {
              this$static.m_LowCoder[this$static.m_NumPosStates] = $BitTreeDecoder({}, 3);
              this$static.m_MidCoder[this$static.m_NumPosStates] = $BitTreeDecoder({}, 3);
          }
      }
      
      function $Decode(this$static, rangeDecoder, posState) {
          if (!$DecodeBit(rangeDecoder, this$static.m_Choice, 0)) {
              return $Decode_0(this$static.m_LowCoder[posState], rangeDecoder);
          }
          var symbol = 8;
          if (!$DecodeBit(rangeDecoder, this$static.m_Choice, 1)) {
              symbol += $Decode_0(this$static.m_MidCoder[posState], rangeDecoder);
          } else {
              symbol += 8 + $Decode_0(this$static.m_HighCoder, rangeDecoder);
          }
          return symbol;
      }
      
      function $Decoder$LenDecoder(this$static) {
          this$static.m_Choice = initDim(2);
          this$static.m_LowCoder = initDim(16);
          this$static.m_MidCoder = initDim(16);
          this$static.m_HighCoder = $BitTreeDecoder({}, 8);
          this$static.m_NumPosStates = 0;
          return this$static;
      }
      
      function $Init(this$static) {
          InitBitModels(this$static.m_Choice);
          for (var posState = 0; posState < this$static.m_NumPosStates; ++posState) {
              InitBitModels(this$static.m_LowCoder[posState].Models);
              InitBitModels(this$static.m_MidCoder[posState].Models);
          }
          InitBitModels(this$static.m_HighCoder.Models);
      }
      
      
      function $Create_0(this$static, numPosBits, numPrevBits) {
          var i, numStates;
          if (this$static.m_Coders != null && this$static.m_NumPrevBits == numPrevBits && this$static.m_NumPosBits == numPosBits)
              return;
          this$static.m_NumPosBits = numPosBits;
          this$static.m_PosMask = (1 << numPosBits) - 1;
          this$static.m_NumPrevBits = numPrevBits;
          numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
          this$static.m_Coders = initDim(numStates);
          for (i = 0; i < numStates; ++i)
              this$static.m_Coders[i] = $Decoder$LiteralDecoder$Decoder2({});
      }
      
      function $GetDecoder(this$static, pos, prevByte) {
          return this$static.m_Coders[((pos & this$static.m_PosMask) << this$static.m_NumPrevBits) + ((prevByte & 255) >>> 8 - this$static.m_NumPrevBits)];
      }
      
      function $Init_0(this$static) {
          var i, numStates;
          numStates = 1 << this$static.m_NumPrevBits + this$static.m_NumPosBits;
          for (i = 0; i < numStates; ++i) {
              InitBitModels(this$static.m_Coders[i].m_Decoders);
          }
      }
      
      
      function $DecodeNormal(this$static, rangeDecoder) {
          var symbol = 1;
          do {
              symbol = symbol << 1 | $DecodeBit(rangeDecoder, this$static.m_Decoders, symbol);
          } while (symbol < 256);
          return symbol << 24 >> 24;
      }
      
      function $DecodeWithMatchByte(this$static, rangeDecoder, matchByte) {
          var bit, matchBit, symbol = 1;
          do {
              matchBit = matchByte >> 7 & 1;
              matchByte <<= 1;
              bit = $DecodeBit(rangeDecoder, this$static.m_Decoders, (1 + matchBit << 8) + symbol);
              symbol = symbol << 1 | bit;
              if (matchBit != bit) {
                  while (symbol < 256) {
                      symbol = symbol << 1 | $DecodeBit(rangeDecoder, this$static.m_Decoders, symbol);
                  }
              break;
              }
          } while (symbol < 256);
          return symbol << 24 >> 24;
      }
      
      function $Decoder$LiteralDecoder$Decoder2(this$static) {
          this$static.m_Decoders = initDim(768);
          return this$static;
      }
      
      /** de */
      
      /** ds */
      function $BitTreeDecoder(this$static, numBitLevels) {
          this$static.NumBitLevels = numBitLevels;
          this$static.Models = initDim(1 << numBitLevels);
          return this$static;
      }
      
      function $Decode_0(this$static, rangeDecoder) {
          var bitIndex, m = 1;
          for (bitIndex = this$static.NumBitLevels; bitIndex != 0; --bitIndex) {
              m = (m << 1) + $DecodeBit(rangeDecoder, this$static.Models, m);
          }
          return m - (1 << this$static.NumBitLevels);
      }
      
      function $ReverseDecode(this$static, rangeDecoder) {
          var bit, bitIndex, m = 1, symbol = 0;
          for (bitIndex = 0; bitIndex < this$static.NumBitLevels; ++bitIndex) {
              bit = $DecodeBit(rangeDecoder, this$static.Models, m);
              m <<= 1;
              m += bit;
              symbol |= bit << bitIndex;
          }
          return symbol;
      }
      
      function ReverseDecode(Models, startIndex, rangeDecoder, NumBitLevels) {
          var bit, bitIndex, m = 1, symbol = 0;
          for (bitIndex = 0; bitIndex < NumBitLevels; ++bitIndex) {
              bit = $DecodeBit(rangeDecoder, Models, startIndex + m);
              m <<= 1;
              m += bit;
              symbol |= bit << bitIndex;
          }
          return symbol;
      }
      /** de */
      
      /** ds */
      function $DecodeBit(this$static, probs, index) {
          var newBound, prob = probs[index];
          newBound = (this$static.Range >>> 11) * prob;
          if ((this$static.Code ^ -2147483648) < (newBound ^ -2147483648)) {
              this$static.Range = newBound;
              probs[index] = prob + (2048 - prob >>> 5) << 16 >> 16;
              if (!(this$static.Range & -16777216)) {
                  this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
                  this$static.Range <<= 8;
              }
              return 0;
          } else {
              this$static.Range -= newBound;
              this$static.Code -= newBound;
              probs[index] = prob - (prob >>> 5) << 16 >> 16;
              if (!(this$static.Range & -16777216)) {
                  this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
                  this$static.Range <<= 8;
              }
              return 1;
          }
      }
      
      function $DecodeDirectBits(this$static, numTotalBits) {
          var i, t, result = 0;
          for (i = numTotalBits; i != 0; --i) {
              this$static.Range >>>= 1;
              t = this$static.Code - this$static.Range >>> 31;
              this$static.Code -= this$static.Range & t - 1;
              result = result << 1 | 1 - t;
              if (!(this$static.Range & -16777216)) {
                  this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
                  this$static.Range <<= 8;
              }
          }
          return result;
      }
      
      function $Init_8(this$static) {
          this$static.Code = 0;
          this$static.Range = -1;
          for (var i = 0; i < 5; ++i) {
              this$static.Code = this$static.Code << 8 | $read(this$static.Stream);
          }
      }
      /** de */
      
      function InitBitModels(probs) {
          for (var i = probs.length - 1; i >= 0; --i) {
              probs[i] = 1024;
          }
      }
      
      /** ds */
      function decode(utf) {
          var i = 0, j = 0, x, y, z, l = utf.length, buf = [], charCodes = [];
          for (; i < l; ++i, ++j) {
              x = utf[i] & 255;
              if (!(x & 128)) {
                  if (!x) {
                      /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                      return utf;
                  }
                  charCodes[j] = x;
              } else if ((x & 224) == 192) {
                  if (i + 1 >= l) {
                      /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                      return utf;
                  }
                  y = utf[++i] & 255;
                  if ((y & 192) != 128) {
                      /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                      return utf;
                  }
                  charCodes[j] = ((x & 31) << 6) | (y & 63);
              } else if ((x & 240) == 224) {
                  if (i + 2 >= l) {
                      /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                      return utf;
                  }
                  y = utf[++i] & 255;
                  if ((y & 192) != 128) {
                      /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                      return utf;
                  }
                  z = utf[++i] & 255;
                  if ((z & 192) != 128) {
                      /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                      return utf;
                  }
                  charCodes[j] = ((x & 15) << 12) | ((y & 63) << 6) | (z & 63);
              } else {
                  /// It appears that this is binary data, so it cannot be converted to a string, so just send it back.
                  return utf;
              }
              if (j == 16383) {
                  buf.push(String.fromCharCode.apply(String, charCodes));
                  j = -1;
              }
          }
          if (j > 0) {
              charCodes.length = j;
              buf.push(String.fromCharCode.apply(String, charCodes));
          }
          return buf.join("");
      }
      /** de */
      
      
      function toDouble(a) {
          return a[1] + a[0];
      }
      
      
      /** ds */
      function decompress(byte_arr, on_finish, on_progress) {
          var this$static = {},
              percent,
              cbn, /// A callback number should be supplied instead of on_finish() if we are using Web Workers.
              has_progress,
              len,
              sync = typeof on_finish == "undefined" && typeof on_progress == "undefined";

          if (typeof on_finish != "function") {
              cbn = on_finish;
              on_finish = on_progress = 0;
          }
          
          on_progress = on_progress || function(percent) {
              if (typeof cbn == "undefined")
                  return;
              
              return update_progress(has_progress ? percent : -1, cbn);
          };
          
          on_finish = on_finish || function(res, err) {
              if (typeof cbn == "undefined")
                  return;
              
              return postMessage({
                  action: action_decompress,
                  cbn: cbn,
                  result: res,
                  error: err
              });
          };

          if (sync) {
              this$static.d = $LZMAByteArrayDecompressor({}, byte_arr);
              while ($processChunk(this$static.d.chunker));
              return decode($toByteArray(this$static.d.output));
          }
          
          try {
              this$static.d = $LZMAByteArrayDecompressor({}, byte_arr);
              
              len = toDouble(this$static.d.length_0);
              
              ///NOTE: If the data was created via a stream, it will not have a length value, and therefore we can't calculate the progress.
              has_progress = len > -1;
              
              on_progress(0);
          } catch (err) {
              return on_finish(null, err);
          }
          
          function do_action() {
              try {
                  var res, i = 0, start = (new Date()).getTime();
                  while ($processChunk(this$static.d.chunker)) {
                      if (++i % 1000 == 0 && (new Date()).getTime() - start > 200) {
                          if (has_progress) {
                              percent = toDouble(this$static.d.chunker.decoder.nowPos64) / len;
                              /// If about 200 miliseconds have passed, update the progress.
                              on_progress(percent);
                          }
                          
                          ///NOTE: This allows other code to run, like the browser to update.
                          wait(do_action, 0);
                          return 0;
                      }
                  }
                  
                  on_progress(1);
                  
                  res = decode($toByteArray(this$static.d.output));
                  
                  /// delay so we don’t catch errors from the on_finish handler
                  wait(on_finish.bind(null, res), 0);
              } catch (err) {
                  on_finish(null, err);
              }
          }
          
          ///NOTE: We need to wait to make sure it is always async.
          wait(do_action, 0);
      }
      /** de */
      
      
      /// If we're in a Web Worker, create the onmessage() communication channel.
      ///NOTE: This seems to be the most reliable way to detect this.
      if (typeof onmessage != "undefined" && (typeof window == "undefined" || typeof window.document == "undefined")) {
          (function () {
              /* jshint -W020 */
              /// Create the global onmessage function.
              onmessage = function (e) {
                  if (e && e.data) {
                      
                      /// co:if (e.data.action == action_compress) {
                      /// co:    LZMA.compress(e.data.data, e.data.mode, e.data.cbn);
                      /// co:}
                      if (e.data.action == action_decompress) {
                          LZMA.decompress(e.data.data, e.data.cbn);
                      }
                  }
              };
          }());
      }
          
      return {
          
          /// co:compress:   compress
          decompress: decompress
      };
  }());
  // Below are commented by HTC

  /// This is used by browsers that do not support web workers (and possibly Node.js).
  //this.LZMA = this.LZMA_WORKER = LZMA;

  /* pako 1.0.10 nodeca/pako */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.pako = f();}})(function(){return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


      var zlib_deflate = require('./zlib/deflate');
      var utils        = require('./utils/common');
      var strings      = require('./utils/strings');
      var msg          = require('./zlib/messages');
      var ZStream      = require('./zlib/zstream');
      
      var toString = Object.prototype.toString;
      
      /* Public constants ==========================================================*/
      /* ===========================================================================*/
      
      var Z_NO_FLUSH      = 0;
      var Z_FINISH        = 4;
      
      var Z_OK            = 0;
      var Z_STREAM_END    = 1;
      var Z_SYNC_FLUSH    = 2;
      
      var Z_DEFAULT_COMPRESSION = -1;
      
      var Z_DEFAULT_STRATEGY    = 0;
      
      var Z_DEFLATED  = 8;
      
      /* ===========================================================================*/
      
      
      /**
       * class Deflate
       *
       * Generic JS-style wrapper for zlib calls. If you don't need
       * streaming behaviour - use more simple functions: [[deflate]],
       * [[deflateRaw]] and [[gzip]].
       **/
      
      /* internal
       * Deflate.chunks -> Array
       *
       * Chunks of output data, if [[Deflate#onData]] not overridden.
       **/
      
      /**
       * Deflate.result -> Uint8Array|Array
       *
       * Compressed result, generated by default [[Deflate#onData]]
       * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
       * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
       * push a chunk with explicit flush (call [[Deflate#push]] with
       * `Z_SYNC_FLUSH` param).
       **/
      
      /**
       * Deflate.err -> Number
       *
       * Error code after deflate finished. 0 (Z_OK) on success.
       * You will not need it in real life, because deflate errors
       * are possible only on wrong options or bad `onData` / `onEnd`
       * custom handlers.
       **/
      
      /**
       * Deflate.msg -> String
       *
       * Error message, if [[Deflate.err]] != 0
       **/
      
      
      /**
       * new Deflate(options)
       * - options (Object): zlib deflate options.
       *
       * Creates new deflator instance with specified params. Throws exception
       * on bad params. Supported options:
       *
       * - `level`
       * - `windowBits`
       * - `memLevel`
       * - `strategy`
       * - `dictionary`
       *
       * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
       * for more information on these.
       *
       * Additional options, for internal needs:
       *
       * - `chunkSize` - size of generated data chunks (16K by default)
       * - `raw` (Boolean) - do raw deflate
       * - `gzip` (Boolean) - create gzip wrapper
       * - `to` (String) - if equal to 'string', then result will be "binary string"
       *    (each char code [0..255])
       * - `header` (Object) - custom header for gzip
       *   - `text` (Boolean) - true if compressed data believed to be text
       *   - `time` (Number) - modification time, unix timestamp
       *   - `os` (Number) - operation system code
       *   - `extra` (Array) - array of bytes with extra data (max 65536)
       *   - `name` (String) - file name (binary string)
       *   - `comment` (String) - comment (binary string)
       *   - `hcrc` (Boolean) - true if header crc should be added
       *
       * ##### Example:
       *
       * ```javascript
       * var pako = require('pako')
       *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
       *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
       *
       * var deflate = new pako.Deflate({ level: 3});
       *
       * deflate.push(chunk1, false);
       * deflate.push(chunk2, true);  // true -> last chunk
       *
       * if (deflate.err) { throw new Error(deflate.err); }
       *
       * console.log(deflate.result);
       * ```
       **/
      function Deflate(options) {
        if (!(this instanceof Deflate)) return new Deflate(options);
      
        this.options = utils.assign({
          level: Z_DEFAULT_COMPRESSION,
          method: Z_DEFLATED,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: Z_DEFAULT_STRATEGY,
          to: ''
        }, options || {});
      
        var opt = this.options;
      
        if (opt.raw && (opt.windowBits > 0)) {
          opt.windowBits = -opt.windowBits;
        }
      
        else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
          opt.windowBits += 16;
        }
      
        this.err    = 0;      // error code, if happens (0 = Z_OK)
        this.msg    = '';     // error message
        this.ended  = false;  // used to avoid multiple onEnd() calls
        this.chunks = [];     // chunks of compressed data
      
        this.strm = new ZStream();
        this.strm.avail_out = 0;
      
        var status = zlib_deflate.deflateInit2(
          this.strm,
          opt.level,
          opt.method,
          opt.windowBits,
          opt.memLevel,
          opt.strategy
        );
      
        if (status !== Z_OK) {
          throw new Error(msg[status]);
        }
      
        if (opt.header) {
          zlib_deflate.deflateSetHeader(this.strm, opt.header);
        }
      
        if (opt.dictionary) {
          var dict;
          // Convert data if needed
          if (typeof opt.dictionary === 'string') {
            // If we need to compress text, change encoding to utf8.
            dict = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
            dict = new Uint8Array(opt.dictionary);
          } else {
            dict = opt.dictionary;
          }
      
          status = zlib_deflate.deflateSetDictionary(this.strm, dict);
      
          if (status !== Z_OK) {
            throw new Error(msg[status]);
          }
      
          this._dict_set = true;
        }
      }
      
      /**
       * Deflate#push(data[, mode]) -> Boolean
       * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
       *   converted to utf8 byte sequence.
       * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
       *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
       *
       * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
       * new compressed chunks. Returns `true` on success. The last data block must have
       * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
       * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
       * can use mode Z_SYNC_FLUSH, keeping the compression context.
       *
       * On fail call [[Deflate#onEnd]] with error code and return false.
       *
       * We strongly recommend to use `Uint8Array` on input for best speed (output
       * array format is detected automatically). Also, don't skip last param and always
       * use the same type in your code (boolean or number). That will improve JS speed.
       *
       * For regular `Array`-s make sure all elements are [0..255].
       *
       * ##### Example
       *
       * ```javascript
       * push(chunk, false); // push one of data chunks
       * ...
       * push(chunk, true);  // push last chunk
       * ```
       **/
      Deflate.prototype.push = function (data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var status, _mode;
      
        if (this.ended) { return false; }
      
        _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);
      
        // Convert data if needed
        if (typeof data === 'string') {
          // If we need to compress text, change encoding to utf8.
          strm.input = strings.string2buf(data);
        } else if (toString.call(data) === '[object ArrayBuffer]') {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
      
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
      
        do {
          if (strm.avail_out === 0) {
            strm.output = new utils.Buf8(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */
      
          if (status !== Z_STREAM_END && status !== Z_OK) {
            this.onEnd(status);
            this.ended = true;
            return false;
          }
          if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
            if (this.options.to === 'string') {
              this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
            } else {
              this.onData(utils.shrinkBuf(strm.output, strm.next_out));
            }
          }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
      
        // Finalize on the last chunk.
        if (_mode === Z_FINISH) {
          status = zlib_deflate.deflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === Z_OK;
        }
      
        // callback interim results if Z_SYNC_FLUSH.
        if (_mode === Z_SYNC_FLUSH) {
          this.onEnd(Z_OK);
          strm.avail_out = 0;
          return true;
        }
      
        return true;
      };
      
      
      /**
       * Deflate#onData(chunk) -> Void
       * - chunk (Uint8Array|Array|String): output data. Type of array depends
       *   on js engine support. When string output requested, each chunk
       *   will be string.
       *
       * By default, stores data blocks in `chunks[]` property and glue
       * those in `onEnd`. Override this handler, if you need another behaviour.
       **/
      Deflate.prototype.onData = function (chunk) {
        this.chunks.push(chunk);
      };
      
      
      /**
       * Deflate#onEnd(status) -> Void
       * - status (Number): deflate status. 0 (Z_OK) on success,
       *   other if not.
       *
       * Called once after you tell deflate that the input stream is
       * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
       * or if an error happened. By default - join collected chunks,
       * free memory and fill `results` / `err` properties.
       **/
      Deflate.prototype.onEnd = function (status) {
        // On success - join
        if (status === Z_OK) {
          if (this.options.to === 'string') {
            this.result = this.chunks.join('');
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      
      
      /**
       * deflate(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to compress.
       * - options (Object): zlib deflate options.
       *
       * Compress `data` with deflate algorithm and `options`.
       *
       * Supported options are:
       *
       * - level
       * - windowBits
       * - memLevel
       * - strategy
       * - dictionary
       *
       * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
       * for more information on these.
       *
       * Sugar (options):
       *
       * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
       *   negative windowBits implicitly.
       * - `to` (String) - if equal to 'string', then result will be "binary string"
       *    (each char code [0..255])
       *
       * ##### Example:
       *
       * ```javascript
       * var pako = require('pako')
       *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
       *
       * console.log(pako.deflate(data));
       * ```
       **/
      function deflate(input, options) {
        var deflator = new Deflate(options);
      
        deflator.push(input, true);
      
        // That will never happens, if you don't cheat with options :)
        if (deflator.err) { throw deflator.msg || msg[deflator.err]; }
      
        return deflator.result;
      }
      
      
      /**
       * deflateRaw(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to compress.
       * - options (Object): zlib deflate options.
       *
       * The same as [[deflate]], but creates raw data, without wrapper
       * (header and adler32 crc).
       **/
      function deflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return deflate(input, options);
      }
      
      
      /**
       * gzip(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to compress.
       * - options (Object): zlib deflate options.
       *
       * The same as [[deflate]], but create gzip wrapper instead of
       * deflate one.
       **/
      function gzip(input, options) {
        options = options || {};
        options.gzip = true;
        return deflate(input, options);
      }
      
      
      exports.Deflate = Deflate;
      exports.deflate = deflate;
      exports.deflateRaw = deflateRaw;
      exports.gzip = gzip;
      
      },{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(require,module,exports){
      
      
      var zlib_inflate = require('./zlib/inflate');
      var utils        = require('./utils/common');
      var strings      = require('./utils/strings');
      var c            = require('./zlib/constants');
      var msg          = require('./zlib/messages');
      var ZStream      = require('./zlib/zstream');
      var GZheader     = require('./zlib/gzheader');
      
      var toString = Object.prototype.toString;
      
      /**
       * class Inflate
       *
       * Generic JS-style wrapper for zlib calls. If you don't need
       * streaming behaviour - use more simple functions: [[inflate]]
       * and [[inflateRaw]].
       **/
      
      /* internal
       * inflate.chunks -> Array
       *
       * Chunks of output data, if [[Inflate#onData]] not overridden.
       **/
      
      /**
       * Inflate.result -> Uint8Array|Array|String
       *
       * Uncompressed result, generated by default [[Inflate#onData]]
       * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
       * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
       * push a chunk with explicit flush (call [[Inflate#push]] with
       * `Z_SYNC_FLUSH` param).
       **/
      
      /**
       * Inflate.err -> Number
       *
       * Error code after inflate finished. 0 (Z_OK) on success.
       * Should be checked if broken data possible.
       **/
      
      /**
       * Inflate.msg -> String
       *
       * Error message, if [[Inflate.err]] != 0
       **/
      
      
      /**
       * new Inflate(options)
       * - options (Object): zlib inflate options.
       *
       * Creates new inflator instance with specified params. Throws exception
       * on bad params. Supported options:
       *
       * - `windowBits`
       * - `dictionary`
       *
       * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
       * for more information on these.
       *
       * Additional options, for internal needs:
       *
       * - `chunkSize` - size of generated data chunks (16K by default)
       * - `raw` (Boolean) - do raw inflate
       * - `to` (String) - if equal to 'string', then result will be converted
       *   from utf8 to utf16 (javascript) string. When string output requested,
       *   chunk length can differ from `chunkSize`, depending on content.
       *
       * By default, when no options set, autodetect deflate/gzip data format via
       * wrapper header.
       *
       * ##### Example:
       *
       * ```javascript
       * var pako = require('pako')
       *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
       *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
       *
       * var inflate = new pako.Inflate({ level: 3});
       *
       * inflate.push(chunk1, false);
       * inflate.push(chunk2, true);  // true -> last chunk
       *
       * if (inflate.err) { throw new Error(inflate.err); }
       *
       * console.log(inflate.result);
       * ```
       **/
      function Inflate(options) {
        if (!(this instanceof Inflate)) return new Inflate(options);
      
        this.options = utils.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ''
        }, options || {});
      
        var opt = this.options;
      
        // Force window size for `raw` data, if not set directly,
        // because we have no header for autodetect.
        if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
          opt.windowBits = -opt.windowBits;
          if (opt.windowBits === 0) { opt.windowBits = -15; }
        }
      
        // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
        if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
            !(options && options.windowBits)) {
          opt.windowBits += 32;
        }
      
        // Gzip header has no info about windows size, we can do autodetect only
        // for deflate. So, if window size not set, force it to max when gzip possible
        if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
          // bit 3 (16) -> gzipped data
          // bit 4 (32) -> autodetect gzip/deflate
          if ((opt.windowBits & 15) === 0) {
            opt.windowBits |= 15;
          }
        }
      
        this.err    = 0;      // error code, if happens (0 = Z_OK)
        this.msg    = '';     // error message
        this.ended  = false;  // used to avoid multiple onEnd() calls
        this.chunks = [];     // chunks of compressed data
      
        this.strm   = new ZStream();
        this.strm.avail_out = 0;
      
        var status  = zlib_inflate.inflateInit2(
          this.strm,
          opt.windowBits
        );
      
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
      
        this.header = new GZheader();
      
        zlib_inflate.inflateGetHeader(this.strm, this.header);
      
        // Setup dictionary
        if (opt.dictionary) {
          // Convert data if needed
          if (typeof opt.dictionary === 'string') {
            opt.dictionary = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
            opt.dictionary = new Uint8Array(opt.dictionary);
          }
          if (opt.raw) { //In raw mode we need to set the dictionary early
            status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
            if (status !== c.Z_OK) {
              throw new Error(msg[status]);
            }
          }
        }
      }
      
      /**
       * Inflate#push(data[, mode]) -> Boolean
       * - data (Uint8Array|Array|ArrayBuffer|String): input data
       * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
       *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
       *
       * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
       * new output chunks. Returns `true` on success. The last data block must have
       * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
       * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
       * can use mode Z_SYNC_FLUSH, keeping the decompression context.
       *
       * On fail call [[Inflate#onEnd]] with error code and return false.
       *
       * We strongly recommend to use `Uint8Array` on input for best speed (output
       * format is detected automatically). Also, don't skip last param and always
       * use the same type in your code (boolean or number). That will improve JS speed.
       *
       * For regular `Array`-s make sure all elements are [0..255].
       *
       * ##### Example
       *
       * ```javascript
       * push(chunk, false); // push one of data chunks
       * ...
       * push(chunk, true);  // push last chunk
       * ```
       **/
      Inflate.prototype.push = function (data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var dictionary = this.options.dictionary;
        var status, _mode;
        var next_out_utf8, tail, utf8str;
      
        // Flag to properly process Z_BUF_ERROR on testing inflate call
        // when we check that all output data was flushed.
        var allowBufError = false;
      
        if (this.ended) { return false; }
        _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);
      
        // Convert data if needed
        if (typeof data === 'string') {
          // Only binary strings can be decompressed on practice
          strm.input = strings.binstring2buf(data);
        } else if (toString.call(data) === '[object ArrayBuffer]') {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
      
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
      
        do {
          if (strm.avail_out === 0) {
            strm.output = new utils.Buf8(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
      
          status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */
      
          if (status === c.Z_NEED_DICT && dictionary) {
            status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
          }
      
          if (status === c.Z_BUF_ERROR && allowBufError === true) {
            status = c.Z_OK;
            allowBufError = false;
          }
      
          if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
            this.onEnd(status);
            this.ended = true;
            return false;
          }
      
          if (strm.next_out) {
            if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {
      
              if (this.options.to === 'string') {
      
                next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
      
                tail = strm.next_out - next_out_utf8;
                utf8str = strings.buf2string(strm.output, next_out_utf8);
      
                // move tail
                strm.next_out = tail;
                strm.avail_out = chunkSize - tail;
                if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }
      
                this.onData(utf8str);
      
              } else {
                this.onData(utils.shrinkBuf(strm.output, strm.next_out));
              }
            }
          }
      
          // When no more input data, we should check that internal inflate buffers
          // are flushed. The only way to do it when avail_out = 0 - run one more
          // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
          // Here we set flag to process this error properly.
          //
          // NOTE. Deflate does not return error in this case and does not needs such
          // logic.
          if (strm.avail_in === 0 && strm.avail_out === 0) {
            allowBufError = true;
          }
      
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
      
        if (status === c.Z_STREAM_END) {
          _mode = c.Z_FINISH;
        }
      
        // Finalize on the last chunk.
        if (_mode === c.Z_FINISH) {
          status = zlib_inflate.inflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === c.Z_OK;
        }
      
        // callback interim results if Z_SYNC_FLUSH.
        if (_mode === c.Z_SYNC_FLUSH) {
          this.onEnd(c.Z_OK);
          strm.avail_out = 0;
          return true;
        }
      
        return true;
      };
      
      
      /**
       * Inflate#onData(chunk) -> Void
       * - chunk (Uint8Array|Array|String): output data. Type of array depends
       *   on js engine support. When string output requested, each chunk
       *   will be string.
       *
       * By default, stores data blocks in `chunks[]` property and glue
       * those in `onEnd`. Override this handler, if you need another behaviour.
       **/
      Inflate.prototype.onData = function (chunk) {
        this.chunks.push(chunk);
      };
      
      
      /**
       * Inflate#onEnd(status) -> Void
       * - status (Number): inflate status. 0 (Z_OK) on success,
       *   other if not.
       *
       * Called either after you tell inflate that the input stream is
       * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
       * or if an error happened. By default - join collected chunks,
       * free memory and fill `results` / `err` properties.
       **/
      Inflate.prototype.onEnd = function (status) {
        // On success - join
        if (status === c.Z_OK) {
          if (this.options.to === 'string') {
            // Glue & convert here, until we teach pako to send
            // utf8 aligned strings to onData
            this.result = this.chunks.join('');
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      
      
      /**
       * inflate(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to decompress.
       * - options (Object): zlib inflate options.
       *
       * Decompress `data` with inflate/ungzip and `options`. Autodetect
       * format via wrapper header by default. That's why we don't provide
       * separate `ungzip` method.
       *
       * Supported options are:
       *
       * - windowBits
       *
       * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
       * for more information.
       *
       * Sugar (options):
       *
       * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
       *   negative windowBits implicitly.
       * - `to` (String) - if equal to 'string', then result will be converted
       *   from utf8 to utf16 (javascript) string. When string output requested,
       *   chunk length can differ from `chunkSize`, depending on content.
       *
       *
       * ##### Example:
       *
       * ```javascript
       * var pako = require('pako')
       *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
       *   , output;
       *
       * try {
       *   output = pako.inflate(input);
       * } catch (err)
       *   console.log(err);
       * }
       * ```
       **/
      function inflate(input, options) {
        var inflator = new Inflate(options);
      
        inflator.push(input, true);
      
        // That will never happens, if you don't cheat with options :)
        if (inflator.err) { throw inflator.msg || msg[inflator.err]; }
      
        return inflator.result;
      }
      
      
      /**
       * inflateRaw(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to decompress.
       * - options (Object): zlib inflate options.
       *
       * The same as [[inflate]], but creates raw data, without wrapper
       * (header and adler32 crc).
       **/
      function inflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return inflate(input, options);
      }
      
      
      /**
       * ungzip(data[, options]) -> Uint8Array|Array|String
       * - data (Uint8Array|Array|String): input data to decompress.
       * - options (Object): zlib inflate options.
       *
       * Just shortcut to [[inflate]], because it autodetects format
       * by header.content. Done for convenience.
       **/
      
      
      exports.Inflate = Inflate;
      exports.inflate = inflate;
      exports.inflateRaw = inflateRaw;
      exports.ungzip  = inflate;
      
      },{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(require,module,exports){
      
      
      var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                      (typeof Uint16Array !== 'undefined') &&
                      (typeof Int32Array !== 'undefined');
      
      function _has(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
      
      exports.assign = function (obj /*from1, from2, from3, ...*/) {
        var sources = Array.prototype.slice.call(arguments, 1);
        while (sources.length) {
          var source = sources.shift();
          if (!source) { continue; }
      
          if (typeof source !== 'object') {
            throw new TypeError(source + 'must be non-object');
          }
      
          for (var p in source) {
            if (_has(source, p)) {
              obj[p] = source[p];
            }
          }
        }
      
        return obj;
      };
      
      
      // reduce buffer size, avoiding mem copy
      exports.shrinkBuf = function (buf, size) {
        if (buf.length === size) { return buf; }
        if (buf.subarray) { return buf.subarray(0, size); }
        buf.length = size;
        return buf;
      };
      
      
      var fnTyped = {
        arraySet: function (dest, src, src_offs, len, dest_offs) {
          if (src.subarray && dest.subarray) {
            dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
            return;
          }
          // Fallback to ordinary array
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        // Join array of chunks to single array.
        flattenChunks: function (chunks) {
          var i, l, len, pos, chunk, result;
      
          // calculate data length
          len = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            len += chunks[i].length;
          }
      
          // join chunks
          result = new Uint8Array(len);
          pos = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            chunk = chunks[i];
            result.set(chunk, pos);
            pos += chunk.length;
          }
      
          return result;
        }
      };
      
      var fnUntyped = {
        arraySet: function (dest, src, src_offs, len, dest_offs) {
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        // Join array of chunks to single array.
        flattenChunks: function (chunks) {
          return [].concat.apply([], chunks);
        }
      };
      
      
      // Enable/Disable typed arrays use, for testing
      //
      exports.setTyped = function (on) {
        if (on) {
          exports.Buf8  = Uint8Array;
          exports.Buf16 = Uint16Array;
          exports.Buf32 = Int32Array;
          exports.assign(exports, fnTyped);
        } else {
          exports.Buf8  = Array;
          exports.Buf16 = Array;
          exports.Buf32 = Array;
          exports.assign(exports, fnUntyped);
        }
      };
      
      exports.setTyped(TYPED_OK);
      
      },{}],4:[function(require,module,exports){
      
      
      var utils = require('./common');
      
      
      // Quick check if we can use fast array to bin string conversion
      //
      // - apply(Array) can fail on Android 2.2
      // - apply(Uint8Array) can fail on iOS 5.1 Safari
      //
      var STR_APPLY_OK = true;
      var STR_APPLY_UIA_OK = true;
      
      try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
      try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }
      
      
      // Table with utf8 lengths (calculated by first byte of sequence)
      // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
      // because max possible codepoint is 0x10ffff
      var _utf8len = new utils.Buf8(256);
      for (var q = 0; q < 256; q++) {
        _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
      }
      _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start
      
      
      // convert string to array (typed, when possible)
      exports.string2buf = function (str) {
        var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
      
        // count binary size
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
        }
      
        // allocate buffer
        buf = new utils.Buf8(buf_len);
      
        // convert
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 0xfc00) === 0xdc00) {
              c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
              m_pos++;
            }
          }
          if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
          } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
          } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
          } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
          }
        }
      
        return buf;
      };
      
      // Helper (used in 2 places)
      function buf2binstring(buf, len) {
        // On Chrome, the arguments in a function call that are allowed is `65534`.
        // If the length of the buffer is smaller than that, we can use this optimization,
        // otherwise we will take a slower path.
        if (len < 65534) {
          if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
            return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
          }
        }
      
        var result = '';
        for (var i = 0; i < len; i++) {
          result += String.fromCharCode(buf[i]);
        }
        return result;
      }
      
      
      // Convert byte array to binary string
      exports.buf2binstring = function (buf) {
        return buf2binstring(buf, buf.length);
      };
      
      
      // Convert binary string (typed, when possible)
      exports.binstring2buf = function (str) {
        var buf = new utils.Buf8(str.length);
        for (var i = 0, len = buf.length; i < len; i++) {
          buf[i] = str.charCodeAt(i);
        }
        return buf;
      };
      
      
      // convert array to string
      exports.buf2string = function (buf, max) {
        var i, out, c, c_len;
        var len = max || buf.length;
      
        // Reserve max possible length (2 words per char)
        // NB: by unknown reasons, Array is significantly faster for
        //     String.fromCharCode.apply than Uint16Array.
        var utf16buf = new Array(len * 2);
      
        for (out = 0, i = 0; i < len;) {
          c = buf[i++];
          // quick process ascii
          if (c < 0x80) { utf16buf[out++] = c; continue; }
      
          c_len = _utf8len[c];
          // skip 5 & 6 byte codes
          if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }
      
          // apply mask on first byte
          c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
          // join the rest
          while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
          }
      
          // terminated by end of string?
          if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }
      
          if (c < 0x10000) {
            utf16buf[out++] = c;
          } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
          }
        }
      
        return buf2binstring(utf16buf, out);
      };
      
      
      // Calculate max possible position in utf8 buffer,
      // that will not break sequence. If that's not possible
      // - (very small limits) return max size as is.
      //
      // buf[] - utf8 bytes array
      // max   - length limit (mandatory);
      exports.utf8border = function (buf, max) {
        var pos;
      
        max = max || buf.length;
        if (max > buf.length) { max = buf.length; }
      
        // go back from last position, until start of sequence found
        pos = max - 1;
        while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }
      
        // Very small and broken sequence,
        // return max, because we should return something anyway.
        if (pos < 0) { return max; }
      
        // If we came to start of buffer - that means buffer is too small,
        // return max too.
        if (pos === 0) { return max; }
      
        return (pos + _utf8len[buf[pos]] > max) ? pos : max;
      };
      
      },{"./common":3}],5:[function(require,module,exports){
      
      // Note: adler32 takes 12% for level 0 and 2% for level 6.
      // It isn't worth it to make additional optimizations as in original.
      // Small size is preferable.
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      function adler32(adler, buf, len, pos) {
        var s1 = (adler & 0xffff) |0,
            s2 = ((adler >>> 16) & 0xffff) |0,
            n = 0;
      
        while (len !== 0) {
          // Set limit ~ twice less than 5552, to keep
          // s2 in 31-bits, because we force signed ints.
          // in other case %= will fail.
          n = len > 2000 ? 2000 : len;
          len -= n;
      
          do {
            s1 = (s1 + buf[pos++]) |0;
            s2 = (s2 + s1) |0;
          } while (--n);
      
          s1 %= 65521;
          s2 %= 65521;
        }
      
        return (s1 | (s2 << 16)) |0;
      }
      
      
      module.exports = adler32;
      
      },{}],6:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      module.exports = {
      
        /* Allowed flush values; see deflate() and inflate() below for details */
        Z_NO_FLUSH:         0,
        Z_PARTIAL_FLUSH:    1,
        Z_SYNC_FLUSH:       2,
        Z_FULL_FLUSH:       3,
        Z_FINISH:           4,
        Z_BLOCK:            5,
        Z_TREES:            6,
      
        /* Return codes for the compression/decompression functions. Negative values
        * are errors, positive values are used for special but normal events.
        */
        Z_OK:               0,
        Z_STREAM_END:       1,
        Z_NEED_DICT:        2,
        Z_ERRNO:           -1,
        Z_STREAM_ERROR:    -2,
        Z_DATA_ERROR:      -3,
        //Z_MEM_ERROR:     -4,
        Z_BUF_ERROR:       -5,
        //Z_VERSION_ERROR: -6,
      
        /* compression levels */
        Z_NO_COMPRESSION:         0,
        Z_BEST_SPEED:             1,
        Z_BEST_COMPRESSION:       9,
        Z_DEFAULT_COMPRESSION:   -1,
      
      
        Z_FILTERED:               1,
        Z_HUFFMAN_ONLY:           2,
        Z_RLE:                    3,
        Z_FIXED:                  4,
        Z_DEFAULT_STRATEGY:       0,
      
        /* Possible values of the data_type field (though see inflate()) */
        Z_BINARY:                 0,
        Z_TEXT:                   1,
        //Z_ASCII:                1, // = Z_TEXT (deprecated)
        Z_UNKNOWN:                2,
      
        /* The deflate compression method */
        Z_DEFLATED:               8
        //Z_NULL:                 null // Use -1 or null inline, depending on var type
      };
      
      },{}],7:[function(require,module,exports){
      
      // Note: we can't get significant speed boost here.
      // So write code to minimize size - no pregenerated tables
      // and array tools dependencies.
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      // Use ordinary array, since untyped makes no boost here
      function makeTable() {
        var c, table = [];
      
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
          }
          table[n] = c;
        }
      
        return table;
      }
      
      // Create table on load. Just 255 signed longs. Not a problem.
      var crcTable = makeTable();
      
      
      function crc32(crc, buf, len, pos) {
        var t = crcTable,
            end = pos + len;
      
        crc ^= -1;
      
        for (var i = pos; i < end; i++) {
          crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
        }
      
        return (crc ^ (-1)); // >>> 0;
      }
      
      
      module.exports = crc32;
      
      },{}],8:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      var utils   = require('../utils/common');
      var trees   = require('./trees');
      var adler32 = require('./adler32');
      var crc32   = require('./crc32');
      var msg     = require('./messages');
      
      /* Public constants ==========================================================*/
      /* ===========================================================================*/
      
      
      /* Allowed flush values; see deflate() and inflate() below for details */
      var Z_NO_FLUSH      = 0;
      var Z_PARTIAL_FLUSH = 1;
      //var Z_SYNC_FLUSH    = 2;
      var Z_FULL_FLUSH    = 3;
      var Z_FINISH        = 4;
      var Z_BLOCK         = 5;
      //var Z_TREES         = 6;
      
      
      /* Return codes for the compression/decompression functions. Negative values
       * are errors, positive values are used for special but normal events.
       */
      var Z_OK            = 0;
      var Z_STREAM_END    = 1;
      //var Z_NEED_DICT     = 2;
      //var Z_ERRNO         = -1;
      var Z_STREAM_ERROR  = -2;
      var Z_DATA_ERROR    = -3;
      //var Z_MEM_ERROR     = -4;
      var Z_BUF_ERROR     = -5;
      //var Z_VERSION_ERROR = -6;
      
      
      /* compression levels */
      //var Z_NO_COMPRESSION      = 0;
      //var Z_BEST_SPEED          = 1;
      //var Z_BEST_COMPRESSION    = 9;
      var Z_DEFAULT_COMPRESSION = -1;
      
      
      var Z_FILTERED            = 1;
      var Z_HUFFMAN_ONLY        = 2;
      var Z_RLE                 = 3;
      var Z_FIXED               = 4;
      var Z_DEFAULT_STRATEGY    = 0;
      
      /* Possible values of the data_type field (though see inflate()) */
      //var Z_BINARY              = 0;
      //var Z_TEXT                = 1;
      //var Z_ASCII               = 1; // = Z_TEXT
      var Z_UNKNOWN             = 2;
      
      
      /* The deflate compression method */
      var Z_DEFLATED  = 8;
      
      /*============================================================================*/
      
      
      var MAX_MEM_LEVEL = 9;
      /* Maximum value for memLevel in deflateInit2 */
      var MAX_WBITS = 15;
      /* 32K LZ77 window */
      var DEF_MEM_LEVEL = 8;
      
      
      var LENGTH_CODES  = 29;
      /* number of length codes, not counting the special END_BLOCK code */
      var LITERALS      = 256;
      /* number of literal bytes 0..255 */
      var L_CODES       = LITERALS + 1 + LENGTH_CODES;
      /* number of Literal or Length codes, including the END_BLOCK code */
      var D_CODES       = 30;
      /* number of distance codes */
      var BL_CODES      = 19;
      /* number of codes used to transfer the bit lengths */
      var HEAP_SIZE     = 2 * L_CODES + 1;
      /* maximum heap size */
      var MAX_BITS  = 15;
      /* All codes must not exceed MAX_BITS bits */
      
      var MIN_MATCH = 3;
      var MAX_MATCH = 258;
      var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);
      
      var PRESET_DICT = 0x20;
      
      var INIT_STATE = 42;
      var EXTRA_STATE = 69;
      var NAME_STATE = 73;
      var COMMENT_STATE = 91;
      var HCRC_STATE = 103;
      var BUSY_STATE = 113;
      var FINISH_STATE = 666;
      
      var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
      var BS_BLOCK_DONE     = 2; /* block flush performed */
      var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
      var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */
      
      var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.
      
      function err(strm, errorCode) {
        strm.msg = msg[errorCode];
        return errorCode;
      }
      
      function rank(f) {
        return ((f) << 1) - ((f) > 4 ? 9 : 0);
      }
      
      function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }
      
      
      /* =========================================================================
       * Flush as much pending output as possible. All deflate() output goes
       * through this function so some applications may wish to modify it
       * to avoid allocating a large strm->output buffer and copying into it.
       * (See also read_buf()).
       */
      function flush_pending(strm) {
        var s = strm.state;
      
        //_tr_flush_bits(s);
        var len = s.pending;
        if (len > strm.avail_out) {
          len = strm.avail_out;
        }
        if (len === 0) { return; }
      
        utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
        strm.next_out += len;
        s.pending_out += len;
        strm.total_out += len;
        strm.avail_out -= len;
        s.pending -= len;
        if (s.pending === 0) {
          s.pending_out = 0;
        }
      }
      
      
      function flush_block_only(s, last) {
        trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
        s.block_start = s.strstart;
        flush_pending(s.strm);
      }
      
      
      function put_byte(s, b) {
        s.pending_buf[s.pending++] = b;
      }
      
      
      /* =========================================================================
       * Put a short in the pending buffer. The 16-bit value is put in MSB order.
       * IN assertion: the stream state is correct and there is enough room in
       * pending_buf.
       */
      function putShortMSB(s, b) {
      //  put_byte(s, (Byte)(b >> 8));
      //  put_byte(s, (Byte)(b & 0xff));
        s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
        s.pending_buf[s.pending++] = b & 0xff;
      }
      
      
      /* ===========================================================================
       * Read a new buffer from the current input stream, update the adler32
       * and total number of bytes read.  All deflate() input goes through
       * this function so some applications may wish to modify it to avoid
       * allocating a large strm->input buffer and copying from it.
       * (See also flush_pending()).
       */
      function read_buf(strm, buf, start, size) {
        var len = strm.avail_in;
      
        if (len > size) { len = size; }
        if (len === 0) { return 0; }
      
        strm.avail_in -= len;
      
        // zmemcpy(buf, strm->next_in, len);
        utils.arraySet(buf, strm.input, strm.next_in, len, start);
        if (strm.state.wrap === 1) {
          strm.adler = adler32(strm.adler, buf, len, start);
        }
      
        else if (strm.state.wrap === 2) {
          strm.adler = crc32(strm.adler, buf, len, start);
        }
      
        strm.next_in += len;
        strm.total_in += len;
      
        return len;
      }
      
      
      /* ===========================================================================
       * Set match_start to the longest match starting at the given string and
       * return its length. Matches shorter or equal to prev_length are discarded,
       * in which case the result is equal to prev_length and match_start is
       * garbage.
       * IN assertions: cur_match is the head of the hash chain for the current
       *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
       * OUT assertion: the match length is not greater than s->lookahead.
       */
      function longest_match(s, cur_match) {
        var chain_length = s.max_chain_length;      /* max hash chain length */
        var scan = s.strstart; /* current string */
        var match;                       /* matched string */
        var len;                           /* length of current match */
        var best_len = s.prev_length;              /* best match length so far */
        var nice_match = s.nice_match;             /* stop if match long enough */
        var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
            s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;
      
        var _win = s.window; // shortcut
      
        var wmask = s.w_mask;
        var prev  = s.prev;
      
        /* Stop when cur_match becomes <= limit. To simplify the code,
         * we prevent matches with the string of window index 0.
         */
      
        var strend = s.strstart + MAX_MATCH;
        var scan_end1  = _win[scan + best_len - 1];
        var scan_end   = _win[scan + best_len];
      
        /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
         * It is easy to get rid of this optimization if necessary.
         */
        // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");
      
        /* Do not waste too much time if we already have a good match: */
        if (s.prev_length >= s.good_match) {
          chain_length >>= 2;
        }
        /* Do not look for matches beyond the end of the input. This is necessary
         * to make deflate deterministic.
         */
        if (nice_match > s.lookahead) { nice_match = s.lookahead; }
      
        // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");
      
        do {
          // Assert(cur_match < s->strstart, "no future");
          match = cur_match;
      
          /* Skip to next match if the match length cannot increase
           * or if the match length is less than 2.  Note that the checks below
           * for insufficient lookahead only occur occasionally for performance
           * reasons.  Therefore uninitialized memory will be accessed, and
           * conditional jumps will be made that depend on those values.
           * However the length of the match is limited to the lookahead, so
           * the output of deflate is not affected by the uninitialized values.
           */
      
          if (_win[match + best_len]     !== scan_end  ||
              _win[match + best_len - 1] !== scan_end1 ||
              _win[match]                !== _win[scan] ||
              _win[++match]              !== _win[scan + 1]) {
            continue;
          }
      
          /* The check at best_len-1 can be removed because it will be made
           * again later. (This heuristic is not always a win.)
           * It is not necessary to compare scan[2] and match[2] since they
           * are always equal when the other bytes match, given that
           * the hash keys are equal and that HASH_BITS >= 8.
           */
          scan += 2;
          match++;
          // Assert(*scan == *match, "match[2]?");
      
          /* We check for insufficient lookahead only every 8th comparison;
           * the 256th check will be made at strstart+258.
           */
          do {
            /*jshint noempty:false*/
          } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                   _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                   _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                   _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
                   scan < strend);
      
          // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");
      
          len = MAX_MATCH - (strend - scan);
          scan = strend - MAX_MATCH;
      
          if (len > best_len) {
            s.match_start = cur_match;
            best_len = len;
            if (len >= nice_match) {
              break;
            }
            scan_end1  = _win[scan + best_len - 1];
            scan_end   = _win[scan + best_len];
          }
        } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
      
        if (best_len <= s.lookahead) {
          return best_len;
        }
        return s.lookahead;
      }
      
      
      /* ===========================================================================
       * Fill the window when the lookahead becomes insufficient.
       * Updates strstart and lookahead.
       *
       * IN assertion: lookahead < MIN_LOOKAHEAD
       * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
       *    At least one byte has been read, or avail_in == 0; reads are
       *    performed for at least two bytes (required for the zip translate_eol
       *    option -- not supported here).
       */
      function fill_window(s) {
        var _w_size = s.w_size;
        var p, n, m, more, str;
      
        //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");
      
        do {
          more = s.window_size - s.lookahead - s.strstart;
      
          // JS ints have 32 bit, block below not needed
          /* Deal with !@#$% 64K limit: */
          //if (sizeof(int) <= 2) {
          //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
          //        more = wsize;
          //
          //  } else if (more == (unsigned)(-1)) {
          //        /* Very unlikely, but possible on 16 bit machine if
          //         * strstart == 0 && lookahead == 1 (input done a byte at time)
          //         */
          //        more--;
          //    }
          //}
      
      
          /* If the window is almost full and there is insufficient lookahead,
           * move the upper half to the lower one to make room in the upper half.
           */
          if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      
            utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
            s.match_start -= _w_size;
            s.strstart -= _w_size;
            /* we now have strstart >= MAX_DIST */
            s.block_start -= _w_size;
      
            /* Slide the hash table (could be avoided with 32 bit values
             at the expense of memory usage). We slide even when level == 0
             to keep the hash table consistent if we switch back to level > 0
             later. (Using level 0 permanently is not an optimal usage of
             zlib, so we don't care about this pathological case.)
             */
      
            n = s.hash_size;
            p = n;
            do {
              m = s.head[--p];
              s.head[p] = (m >= _w_size ? m - _w_size : 0);
            } while (--n);
      
            n = _w_size;
            p = n;
            do {
              m = s.prev[--p];
              s.prev[p] = (m >= _w_size ? m - _w_size : 0);
              /* If n is not on any hash chain, prev[n] is garbage but
               * its value will never be used.
               */
            } while (--n);
      
            more += _w_size;
          }
          if (s.strm.avail_in === 0) {
            break;
          }
      
          /* If there was no sliding:
           *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
           *    more == window_size - lookahead - strstart
           * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
           * => more >= window_size - 2*WSIZE + 2
           * In the BIG_MEM or MMAP case (not yet supported),
           *   window_size == input_size + MIN_LOOKAHEAD  &&
           *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
           * Otherwise, window_size == 2*WSIZE so more >= 2.
           * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
           */
          //Assert(more >= 2, "more < 2");
          n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
          s.lookahead += n;
      
          /* Initialize the hash value now that we have some input: */
          if (s.lookahead + s.insert >= MIN_MATCH) {
            str = s.strstart - s.insert;
            s.ins_h = s.window[str];
      
            /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
      //#if MIN_MATCH != 3
      //        Call update_hash() MIN_MATCH-3 more times
      //#endif
            while (s.insert) {
              /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
      
              s.prev[str & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = str;
              str++;
              s.insert--;
              if (s.lookahead + s.insert < MIN_MATCH) {
                break;
              }
            }
          }
          /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
           * but this is not important since only literal bytes will be emitted.
           */
      
        } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
      
        /* If the WIN_INIT bytes after the end of the current data have never been
         * written, then zero those bytes in order to avoid memory check reports of
         * the use of uninitialized (or uninitialised as Julian writes) bytes by
         * the longest match routines.  Update the high water mark for the next
         * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
         * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
         */
      //  if (s.high_water < s.window_size) {
      //    var curr = s.strstart + s.lookahead;
      //    var init = 0;
      //
      //    if (s.high_water < curr) {
      //      /* Previous high water mark below current data -- zero WIN_INIT
      //       * bytes or up to end of window, whichever is less.
      //       */
      //      init = s.window_size - curr;
      //      if (init > WIN_INIT)
      //        init = WIN_INIT;
      //      zmemzero(s->window + curr, (unsigned)init);
      //      s->high_water = curr + init;
      //    }
      //    else if (s->high_water < (ulg)curr + WIN_INIT) {
      //      /* High water mark at or above current data, but below current data
      //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
      //       * to end of window, whichever is less.
      //       */
      //      init = (ulg)curr + WIN_INIT - s->high_water;
      //      if (init > s->window_size - s->high_water)
      //        init = s->window_size - s->high_water;
      //      zmemzero(s->window + s->high_water, (unsigned)init);
      //      s->high_water += init;
      //    }
      //  }
      //
      //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
      //    "not enough room for search");
      }
      
      /* ===========================================================================
       * Copy without compression as much as possible from the input stream, return
       * the current block state.
       * This function does not insert new strings in the dictionary since
       * uncompressible data is probably not useful. This function is used
       * only for the level=0 compression option.
       * NOTE: this function should be optimized to avoid extra copying from
       * window to pending_buf.
       */
      function deflate_stored(s, flush) {
        /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
         * to pending_buf_size, and each stored block has a 5 byte header:
         */
        var max_block_size = 0xffff;
      
        if (max_block_size > s.pending_buf_size - 5) {
          max_block_size = s.pending_buf_size - 5;
        }
      
        /* Copy as much as possible from input to output: */
        for (;;) {
          /* Fill the window as much as possible: */
          if (s.lookahead <= 1) {
      
            //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
            //  s->block_start >= (long)s->w_size, "slide too late");
      //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
      //        s.block_start >= s.w_size)) {
      //        throw  new Error("slide too late");
      //      }
      
            fill_window(s);
            if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
      
            if (s.lookahead === 0) {
              break;
            }
            /* flush the current block */
          }
          //Assert(s->block_start >= 0L, "block gone");
      //    if (s.block_start < 0) throw new Error("block gone");
      
          s.strstart += s.lookahead;
          s.lookahead = 0;
      
          /* Emit a stored block if pending_buf will be full: */
          var max_start = s.block_start + max_block_size;
      
          if (s.strstart === 0 || s.strstart >= max_start) {
            /* strstart == 0 is possible when wraparound on 16-bit machine */
            s.lookahead = s.strstart - max_start;
            s.strstart = max_start;
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
            /***/
      
      
          }
          /* Flush if we may have to slide, otherwise block_start may become
           * negative and the data will be gone:
           */
          if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
            /***/
          }
        }
      
        s.insert = 0;
      
        if (flush === Z_FINISH) {
          /*** FLUSH_BLOCK(s, 1); ***/
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          /***/
          return BS_FINISH_DONE;
        }
      
        if (s.strstart > s.block_start) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      
        return BS_NEED_MORE;
      }
      
      /* ===========================================================================
       * Compress as much as possible from the input stream, return the current
       * block state.
       * This function does not perform lazy evaluation of matches and inserts
       * new strings in the dictionary only for unmatched strings or for short
       * matches. It is used only for the fast compression options.
       */
      function deflate_fast(s, flush) {
        var hash_head;        /* head of the hash chain */
        var bflush;           /* set if current block must be flushed */
      
        for (;;) {
          /* Make sure that we always have enough lookahead, except
           * at the end of the input file. We need MAX_MATCH bytes
           * for the next match, plus MIN_MATCH bytes to insert the
           * string following the next match.
           */
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break; /* flush the current block */
            }
          }
      
          /* Insert the string window[strstart .. strstart+2] in the
           * dictionary, and set hash_head to the head of the hash chain:
           */
          hash_head = 0/*NIL*/;
          if (s.lookahead >= MIN_MATCH) {
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
          }
      
          /* Find the longest match, discarding those <= prev_length.
           * At this point we have always match_length < MIN_MATCH
           */
          if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
            /* To simplify the code, we prevent matches with the string
             * of window index 0 (in particular we have to avoid a match
             * of the string with itself at the start of the input file).
             */
            s.match_length = longest_match(s, hash_head);
            /* longest_match() sets match_start */
          }
          if (s.match_length >= MIN_MATCH) {
            // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only
      
            /*** _tr_tally_dist(s, s.strstart - s.match_start,
                           s.match_length - MIN_MATCH, bflush); ***/
            bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      
            s.lookahead -= s.match_length;
      
            /* Insert new strings in the hash table only if the match length
             * is not too large. This saves time but degrades compression.
             */
            if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
              s.match_length--; /* string at strstart already in table */
              do {
                s.strstart++;
                /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
                /***/
                /* strstart never exceeds WSIZE-MAX_MATCH, so there are
                 * always MIN_MATCH bytes ahead.
                 */
              } while (--s.match_length !== 0);
              s.strstart++;
            } else
            {
              s.strstart += s.match_length;
              s.match_length = 0;
              s.ins_h = s.window[s.strstart];
              /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;
      
      //#if MIN_MATCH != 3
      //                Call UPDATE_HASH() MIN_MATCH-3 more times
      //#endif
              /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
               * matter since it will be recomputed at next deflate call.
               */
            }
          } else {
            /* No match, output a literal byte */
            //Tracevv((stderr,"%c", s.window[s.strstart]));
            /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
            /***/
          }
        }
        s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
        if (flush === Z_FINISH) {
          /*** FLUSH_BLOCK(s, 1); ***/
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          /***/
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
        return BS_BLOCK_DONE;
      }
      
      /* ===========================================================================
       * Same as above, but achieves better compression. We use a lazy
       * evaluation for matches: a match is finally adopted only if there is
       * no better match at the next window position.
       */
      function deflate_slow(s, flush) {
        var hash_head;          /* head of hash chain */
        var bflush;              /* set if current block must be flushed */
      
        var max_insert;
      
        /* Process the input block. */
        for (;;) {
          /* Make sure that we always have enough lookahead, except
           * at the end of the input file. We need MAX_MATCH bytes
           * for the next match, plus MIN_MATCH bytes to insert the
           * string following the next match.
           */
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) { break; } /* flush the current block */
          }
      
          /* Insert the string window[strstart .. strstart+2] in the
           * dictionary, and set hash_head to the head of the hash chain:
           */
          hash_head = 0/*NIL*/;
          if (s.lookahead >= MIN_MATCH) {
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
          }
      
          /* Find the longest match, discarding those <= prev_length.
           */
          s.prev_length = s.match_length;
          s.prev_match = s.match_start;
          s.match_length = MIN_MATCH - 1;
      
          if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
              s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
            /* To simplify the code, we prevent matches with the string
             * of window index 0 (in particular we have to avoid a match
             * of the string with itself at the start of the input file).
             */
            s.match_length = longest_match(s, hash_head);
            /* longest_match() sets match_start */
      
            if (s.match_length <= 5 &&
               (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {
      
              /* If prev_match is also MIN_MATCH, match_start is garbage
               * but we will ignore the current match anyway.
               */
              s.match_length = MIN_MATCH - 1;
            }
          }
          /* If there was a match at the previous step and the current
           * match is not better, output the previous match:
           */
          if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
            max_insert = s.strstart + s.lookahead - MIN_MATCH;
            /* Do not insert strings in hash table beyond this. */
      
            //check_match(s, s.strstart-1, s.prev_match, s.prev_length);
      
            /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                           s.prev_length - MIN_MATCH, bflush);***/
            bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
            /* Insert in hash table all strings up to the end of the match.
             * strstart-1 and strstart are already inserted. If there is not
             * enough lookahead, the last two strings are not inserted in
             * the hash table.
             */
            s.lookahead -= s.prev_length - 1;
            s.prev_length -= 2;
            do {
              if (++s.strstart <= max_insert) {
                /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
                /***/
              }
            } while (--s.prev_length !== 0);
            s.match_available = 0;
            s.match_length = MIN_MATCH - 1;
            s.strstart++;
      
            if (bflush) {
              /*** FLUSH_BLOCK(s, 0); ***/
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
              }
              /***/
            }
      
          } else if (s.match_available) {
            /* If there was no match at the previous position, output a
             * single literal. If there was a match but the current match
             * is longer, truncate the previous match to a single literal.
             */
            //Tracevv((stderr,"%c", s->window[s->strstart-1]));
            /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
            bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      
            if (bflush) {
              /*** FLUSH_BLOCK_ONLY(s, 0) ***/
              flush_block_only(s, false);
              /***/
            }
            s.strstart++;
            s.lookahead--;
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          } else {
            /* There is no previous match to compare with, wait for
             * the next step to decide.
             */
            s.match_available = 1;
            s.strstart++;
            s.lookahead--;
          }
        }
        //Assert (flush != Z_NO_FLUSH, "no flush?");
        if (s.match_available) {
          //Tracevv((stderr,"%c", s->window[s->strstart-1]));
          /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
          bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
      
          s.match_available = 0;
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH) {
          /*** FLUSH_BLOCK(s, 1); ***/
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          /***/
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
      
        return BS_BLOCK_DONE;
      }
      
      
      /* ===========================================================================
       * For Z_RLE, simply look for runs of bytes, generate matches only of distance
       * one.  Do not maintain a hash table.  (It will be regenerated if this run of
       * deflate switches away from Z_RLE.)
       */
      function deflate_rle(s, flush) {
        var bflush;            /* set if current block must be flushed */
        var prev;              /* byte at distance one to match */
        var scan, strend;      /* scan goes up to strend for length of run */
      
        var _win = s.window;
      
        for (;;) {
          /* Make sure that we always have enough lookahead, except
           * at the end of the input file. We need MAX_MATCH bytes
           * for the longest run, plus one for the unrolled loop.
           */
          if (s.lookahead <= MAX_MATCH) {
            fill_window(s);
            if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) { break; } /* flush the current block */
          }
      
          /* See how many times the previous byte repeats */
          s.match_length = 0;
          if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
            scan = s.strstart - 1;
            prev = _win[scan];
            if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
              strend = s.strstart + MAX_MATCH;
              do {
                /*jshint noempty:false*/
              } while (prev === _win[++scan] && prev === _win[++scan] &&
                       prev === _win[++scan] && prev === _win[++scan] &&
                       prev === _win[++scan] && prev === _win[++scan] &&
                       prev === _win[++scan] && prev === _win[++scan] &&
                       scan < strend);
              s.match_length = MAX_MATCH - (strend - scan);
              if (s.match_length > s.lookahead) {
                s.match_length = s.lookahead;
              }
            }
            //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
          }
      
          /* Emit match if have run of MIN_MATCH or longer, else emit literal */
          if (s.match_length >= MIN_MATCH) {
            //check_match(s, s.strstart, s.strstart - 1, s.match_length);
      
            /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
            bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
      
            s.lookahead -= s.match_length;
            s.strstart += s.match_length;
            s.match_length = 0;
          } else {
            /* No match, output a literal byte */
            //Tracevv((stderr,"%c", s->window[s->strstart]));
            /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
      
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
            /***/
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          /*** FLUSH_BLOCK(s, 1); ***/
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          /***/
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
        return BS_BLOCK_DONE;
      }
      
      /* ===========================================================================
       * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
       * (It will be regenerated if this run of deflate switches away from Huffman.)
       */
      function deflate_huff(s, flush) {
        var bflush;             /* set if current block must be flushed */
      
        for (;;) {
          /* Make sure that we have a literal to write. */
          if (s.lookahead === 0) {
            fill_window(s);
            if (s.lookahead === 0) {
              if (flush === Z_NO_FLUSH) {
                return BS_NEED_MORE;
              }
              break;      /* flush the current block */
            }
          }
      
          /* Output a literal byte */
          s.match_length = 0;
          //Tracevv((stderr,"%c", s->window[s->strstart]));
          /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
          bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
          if (bflush) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
            /***/
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          /*** FLUSH_BLOCK(s, 1); ***/
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          /***/
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/
        }
        return BS_BLOCK_DONE;
      }
      
      /* Values for max_lazy_match, good_match and max_chain_length, depending on
       * the desired pack level (0..9). The values given below have been tuned to
       * exclude worst case performance for pathological files. Better values may be
       * found for specific files.
       */
      function Config(good_length, max_lazy, nice_length, max_chain, func) {
        this.good_length = good_length;
        this.max_lazy = max_lazy;
        this.nice_length = nice_length;
        this.max_chain = max_chain;
        this.func = func;
      }
      
      var configuration_table;
      
      configuration_table = [
        /*      good lazy nice chain */
        new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
        new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
        new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
        new Config(4, 6, 32, 32, deflate_fast),          /* 3 */
      
        new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
        new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
        new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
        new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
        new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
        new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
      ];
      
      
      /* ===========================================================================
       * Initialize the "longest match" routines for a new zlib stream
       */
      function lm_init(s) {
        s.window_size = 2 * s.w_size;
      
        /*** CLEAR_HASH(s); ***/
        zero(s.head); // Fill with NIL (= 0);
      
        /* Set the default configuration parameters:
         */
        s.max_lazy_match = configuration_table[s.level].max_lazy;
        s.good_match = configuration_table[s.level].good_length;
        s.nice_match = configuration_table[s.level].nice_length;
        s.max_chain_length = configuration_table[s.level].max_chain;
      
        s.strstart = 0;
        s.block_start = 0;
        s.lookahead = 0;
        s.insert = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        s.ins_h = 0;
      }
      
      
      function DeflateState() {
        this.strm = null;            /* pointer back to this zlib stream */
        this.status = 0;            /* as the name implies */
        this.pending_buf = null;      /* output still pending */
        this.pending_buf_size = 0;  /* size of pending_buf */
        this.pending_out = 0;       /* next pending byte to output to the stream */
        this.pending = 0;           /* nb of bytes in the pending buffer */
        this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
        this.gzhead = null;         /* gzip header information to write */
        this.gzindex = 0;           /* where in extra, name, or comment */
        this.method = Z_DEFLATED; /* can only be DEFLATED */
        this.last_flush = -1;   /* value of flush param for previous deflate call */
      
        this.w_size = 0;  /* LZ77 window size (32K by default) */
        this.w_bits = 0;  /* log2(w_size)  (8..16) */
        this.w_mask = 0;  /* w_size - 1 */
      
        this.window = null;
        /* Sliding window. Input bytes are read into the second half of the window,
         * and move to the first half later to keep a dictionary of at least wSize
         * bytes. With this organization, matches are limited to a distance of
         * wSize-MAX_MATCH bytes, but this ensures that IO is always
         * performed with a length multiple of the block size.
         */
      
        this.window_size = 0;
        /* Actual size of window: 2*wSize, except when the user input buffer
         * is directly used as sliding window.
         */
      
        this.prev = null;
        /* Link to older string with same hash index. To limit the size of this
         * array to 64K, this link is maintained only for the last 32K strings.
         * An index in this array is thus a window index modulo 32K.
         */
      
        this.head = null;   /* Heads of the hash chains or NIL. */
      
        this.ins_h = 0;       /* hash index of string to be inserted */
        this.hash_size = 0;   /* number of elements in hash table */
        this.hash_bits = 0;   /* log2(hash_size) */
        this.hash_mask = 0;   /* hash_size-1 */
      
        this.hash_shift = 0;
        /* Number of bits by which ins_h must be shifted at each input
         * step. It must be such that after MIN_MATCH steps, the oldest
         * byte no longer takes part in the hash key, that is:
         *   hash_shift * MIN_MATCH >= hash_bits
         */
      
        this.block_start = 0;
        /* Window position at the beginning of the current output block. Gets
         * negative when the window is moved backwards.
         */
      
        this.match_length = 0;      /* length of best match */
        this.prev_match = 0;        /* previous match */
        this.match_available = 0;   /* set if previous match exists */
        this.strstart = 0;          /* start of string to insert */
        this.match_start = 0;       /* start of matching string */
        this.lookahead = 0;         /* number of valid bytes ahead in window */
      
        this.prev_length = 0;
        /* Length of the best match at previous step. Matches not greater than this
         * are discarded. This is used in the lazy match evaluation.
         */
      
        this.max_chain_length = 0;
        /* To speed up deflation, hash chains are never searched beyond this
         * length.  A higher limit improves compression ratio but degrades the
         * speed.
         */
      
        this.max_lazy_match = 0;
        /* Attempt to find a better match only when the current match is strictly
         * smaller than this value. This mechanism is used only for compression
         * levels >= 4.
         */
        // That's alias to max_lazy_match, don't use directly
        //this.max_insert_length = 0;
        /* Insert new strings in the hash table only if the match length is not
         * greater than this length. This saves time but degrades compression.
         * max_insert_length is used only for compression levels <= 3.
         */
      
        this.level = 0;     /* compression level (1..9) */
        this.strategy = 0;  /* favor or force Huffman coding*/
      
        this.good_match = 0;
        /* Use a faster search when the previous match is longer than this */
      
        this.nice_match = 0; /* Stop searching when current match exceeds this */
      
                    /* used by trees.c: */
      
        /* Didn't use ct_data typedef below to suppress compiler warning */
      
        // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
        // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
        // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */
      
        // Use flat array of DOUBLE size, with interleaved fata,
        // because JS does not support effective
        this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
        this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
        this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
        zero(this.dyn_ltree);
        zero(this.dyn_dtree);
        zero(this.bl_tree);
      
        this.l_desc   = null;         /* desc. for literal tree */
        this.d_desc   = null;         /* desc. for distance tree */
        this.bl_desc  = null;         /* desc. for bit length tree */
      
        //ush bl_count[MAX_BITS+1];
        this.bl_count = new utils.Buf16(MAX_BITS + 1);
        /* number of codes at each bit length for an optimal tree */
      
        //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
        this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
        zero(this.heap);
      
        this.heap_len = 0;               /* number of elements in the heap */
        this.heap_max = 0;               /* element of largest frequency */
        /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
         * The same heap array is used to build all trees.
         */
      
        this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
        zero(this.depth);
        /* Depth of each subtree used as tie breaker for trees of equal frequency
         */
      
        this.l_buf = 0;          /* buffer index for literals or lengths */
      
        this.lit_bufsize = 0;
        /* Size of match buffer for literals/lengths.  There are 4 reasons for
         * limiting lit_bufsize to 64K:
         *   - frequencies can be kept in 16 bit counters
         *   - if compression is not successful for the first block, all input
         *     data is still in the window so we can still emit a stored block even
         *     when input comes from standard input.  (This can also be done for
         *     all blocks if lit_bufsize is not greater than 32K.)
         *   - if compression is not successful for a file smaller than 64K, we can
         *     even emit a stored file instead of a stored block (saving 5 bytes).
         *     This is applicable only for zip (not gzip or zlib).
         *   - creating new Huffman trees less frequently may not provide fast
         *     adaptation to changes in the input data statistics. (Take for
         *     example a binary file with poorly compressible code followed by
         *     a highly compressible string table.) Smaller buffer sizes give
         *     fast adaptation but have of course the overhead of transmitting
         *     trees more frequently.
         *   - I can't count above 4
         */
      
        this.last_lit = 0;      /* running index in l_buf */
      
        this.d_buf = 0;
        /* Buffer index for distances. To simplify the code, d_buf and l_buf have
         * the same number of elements. To use different lengths, an extra flag
         * array would be necessary.
         */
      
        this.opt_len = 0;       /* bit length of current block with optimal trees */
        this.static_len = 0;    /* bit length of current block with static trees */
        this.matches = 0;       /* number of string matches in current block */
        this.insert = 0;        /* bytes at end of window left to insert */
      
      
        this.bi_buf = 0;
        /* Output buffer. bits are inserted starting at the bottom (least
         * significant bits).
         */
        this.bi_valid = 0;
        /* Number of valid bits in bi_buf.  All bits above the last valid bit
         * are always zero.
         */
      
        // Used for window memory init. We safely ignore it for JS. That makes
        // sense only for pointers and memory check tools.
        //this.high_water = 0;
        /* High water mark offset in window for initialized bytes -- bytes above
         * this are set to zero in order to avoid memory check warnings when
         * longest match routines access bytes past the input.  This is then
         * updated to the new high water mark.
         */
      }
      
      
      function deflateResetKeep(strm) {
        var s;
      
        if (!strm || !strm.state) {
          return err(strm, Z_STREAM_ERROR);
        }
      
        strm.total_in = strm.total_out = 0;
        strm.data_type = Z_UNKNOWN;
      
        s = strm.state;
        s.pending = 0;
        s.pending_out = 0;
      
        if (s.wrap < 0) {
          s.wrap = -s.wrap;
          /* was made negative by deflate(..., Z_FINISH); */
        }
        s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
        strm.adler = (s.wrap === 2) ?
          0  // crc32(0, Z_NULL, 0)
        :
          1; // adler32(0, Z_NULL, 0)
        s.last_flush = Z_NO_FLUSH;
        trees._tr_init(s);
        return Z_OK;
      }
      
      
      function deflateReset(strm) {
        var ret = deflateResetKeep(strm);
        if (ret === Z_OK) {
          lm_init(strm.state);
        }
        return ret;
      }
      
      
      function deflateSetHeader(strm, head) {
        if (!strm || !strm.state) { return Z_STREAM_ERROR; }
        if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
        strm.state.gzhead = head;
        return Z_OK;
      }
      
      
      function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
        if (!strm) { // === Z_NULL
          return Z_STREAM_ERROR;
        }
        var wrap = 1;
      
        if (level === Z_DEFAULT_COMPRESSION) {
          level = 6;
        }
      
        if (windowBits < 0) { /* suppress zlib wrapper */
          wrap = 0;
          windowBits = -windowBits;
        }
      
        else if (windowBits > 15) {
          wrap = 2;           /* write gzip wrapper instead */
          windowBits -= 16;
        }
      
      
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
          windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
          strategy < 0 || strategy > Z_FIXED) {
          return err(strm, Z_STREAM_ERROR);
        }
      
      
        if (windowBits === 8) {
          windowBits = 9;
        }
        /* until 256-byte window bug fixed */
      
        var s = new DeflateState();
      
        strm.state = s;
        s.strm = strm;
      
        s.wrap = wrap;
        s.gzhead = null;
        s.w_bits = windowBits;
        s.w_size = 1 << s.w_bits;
        s.w_mask = s.w_size - 1;
      
        s.hash_bits = memLevel + 7;
        s.hash_size = 1 << s.hash_bits;
        s.hash_mask = s.hash_size - 1;
        s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
      
        s.window = new utils.Buf8(s.w_size * 2);
        s.head = new utils.Buf16(s.hash_size);
        s.prev = new utils.Buf16(s.w_size);
      
        // Don't need mem init magic for JS.
        //s.high_water = 0;  /* nothing written to s->window yet */
      
        s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */
      
        s.pending_buf_size = s.lit_bufsize * 4;
      
        //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
        //s->pending_buf = (uchf *) overlay;
        s.pending_buf = new utils.Buf8(s.pending_buf_size);
      
        // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
        //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
        s.d_buf = 1 * s.lit_bufsize;
      
        //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
        s.l_buf = (1 + 2) * s.lit_bufsize;
      
        s.level = level;
        s.strategy = strategy;
        s.method = method;
      
        return deflateReset(strm);
      }
      
      function deflateInit(strm, level) {
        return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
      }
      
      
      function deflate(strm, flush) {
        var old_flush, s;
        var beg, val; // for gzip header write only
      
        if (!strm || !strm.state ||
          flush > Z_BLOCK || flush < 0) {
          return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
        }
      
        s = strm.state;
      
        if (!strm.output ||
            (!strm.input && strm.avail_in !== 0) ||
            (s.status === FINISH_STATE && flush !== Z_FINISH)) {
          return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
        }
      
        s.strm = strm; /* just in case */
        old_flush = s.last_flush;
        s.last_flush = flush;
      
        /* Write the header */
        if (s.status === INIT_STATE) {
      
          if (s.wrap === 2) { // GZIP header
            strm.adler = 0;  //crc32(0L, Z_NULL, 0);
            put_byte(s, 31);
            put_byte(s, 139);
            put_byte(s, 8);
            if (!s.gzhead) { // s->gzhead == Z_NULL
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, s.level === 9 ? 2 :
                          (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                           4 : 0));
              put_byte(s, OS_CODE);
              s.status = BUSY_STATE;
            }
            else {
              put_byte(s, (s.gzhead.text ? 1 : 0) +
                          (s.gzhead.hcrc ? 2 : 0) +
                          (!s.gzhead.extra ? 0 : 4) +
                          (!s.gzhead.name ? 0 : 8) +
                          (!s.gzhead.comment ? 0 : 16)
              );
              put_byte(s, s.gzhead.time & 0xff);
              put_byte(s, (s.gzhead.time >> 8) & 0xff);
              put_byte(s, (s.gzhead.time >> 16) & 0xff);
              put_byte(s, (s.gzhead.time >> 24) & 0xff);
              put_byte(s, s.level === 9 ? 2 :
                          (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                           4 : 0));
              put_byte(s, s.gzhead.os & 0xff);
              if (s.gzhead.extra && s.gzhead.extra.length) {
                put_byte(s, s.gzhead.extra.length & 0xff);
                put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
              }
              if (s.gzhead.hcrc) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
              }
              s.gzindex = 0;
              s.status = EXTRA_STATE;
            }
          }
          else // DEFLATE header
          {
            var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
            var level_flags = -1;
      
            if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
              level_flags = 0;
            } else if (s.level < 6) {
              level_flags = 1;
            } else if (s.level === 6) {
              level_flags = 2;
            } else {
              level_flags = 3;
            }
            header |= (level_flags << 6);
            if (s.strstart !== 0) { header |= PRESET_DICT; }
            header += 31 - (header % 31);
      
            s.status = BUSY_STATE;
            putShortMSB(s, header);
      
            /* Save the adler32 of the preset dictionary: */
            if (s.strstart !== 0) {
              putShortMSB(s, strm.adler >>> 16);
              putShortMSB(s, strm.adler & 0xffff);
            }
            strm.adler = 1; // adler32(0L, Z_NULL, 0);
          }
        }
      
      //#ifdef GZIP
        if (s.status === EXTRA_STATE) {
          if (s.gzhead.extra/* != Z_NULL*/) {
            beg = s.pending;  /* start of bytes to update crc */
      
            while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  break;
                }
              }
              put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
              s.gzindex++;
            }
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (s.gzindex === s.gzhead.extra.length) {
              s.gzindex = 0;
              s.status = NAME_STATE;
            }
          }
          else {
            s.status = NAME_STATE;
          }
        }
        if (s.status === NAME_STATE) {
          if (s.gzhead.name/* != Z_NULL*/) {
            beg = s.pending;  /* start of bytes to update crc */
            //int val;
      
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  val = 1;
                  break;
                }
              }
              // JS specific: little magic to add zero terminator to end of string
              if (s.gzindex < s.gzhead.name.length) {
                val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
      
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (val === 0) {
              s.gzindex = 0;
              s.status = COMMENT_STATE;
            }
          }
          else {
            s.status = COMMENT_STATE;
          }
        }
        if (s.status === COMMENT_STATE) {
          if (s.gzhead.comment/* != Z_NULL*/) {
            beg = s.pending;  /* start of bytes to update crc */
            //int val;
      
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  val = 1;
                  break;
                }
              }
              // JS specific: little magic to add zero terminator to end of string
              if (s.gzindex < s.gzhead.comment.length) {
                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
      
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (val === 0) {
              s.status = HCRC_STATE;
            }
          }
          else {
            s.status = HCRC_STATE;
          }
        }
        if (s.status === HCRC_STATE) {
          if (s.gzhead.hcrc) {
            if (s.pending + 2 > s.pending_buf_size) {
              flush_pending(strm);
            }
            if (s.pending + 2 <= s.pending_buf_size) {
              put_byte(s, strm.adler & 0xff);
              put_byte(s, (strm.adler >> 8) & 0xff);
              strm.adler = 0; //crc32(0L, Z_NULL, 0);
              s.status = BUSY_STATE;
            }
          }
          else {
            s.status = BUSY_STATE;
          }
        }
      //#endif
      
        /* Flush as much pending output as possible */
        if (s.pending !== 0) {
          flush_pending(strm);
          if (strm.avail_out === 0) {
            /* Since avail_out is 0, deflate will be called again with
             * more output space, but possibly with both pending and
             * avail_in equal to zero. There won't be anything to do,
             * but this is not an error situation so make sure we
             * return OK instead of BUF_ERROR at next call of deflate:
             */
            s.last_flush = -1;
            return Z_OK;
          }
      
          /* Make sure there is something to do and avoid duplicate consecutive
           * flushes. For repeated and useless calls with Z_FINISH, we keep
           * returning Z_STREAM_END instead of Z_BUF_ERROR.
           */
        } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
          flush !== Z_FINISH) {
          return err(strm, Z_BUF_ERROR);
        }
      
        /* User must not provide more input after the first FINISH: */
        if (s.status === FINISH_STATE && strm.avail_in !== 0) {
          return err(strm, Z_BUF_ERROR);
        }
      
        /* Start a new block or continue the current one.
         */
        if (strm.avail_in !== 0 || s.lookahead !== 0 ||
          (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
          var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
            (s.strategy === Z_RLE ? deflate_rle(s, flush) :
              configuration_table[s.level].func(s, flush));
      
          if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
            s.status = FINISH_STATE;
          }
          if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
            if (strm.avail_out === 0) {
              s.last_flush = -1;
              /* avoid BUF_ERROR next call, see above */
            }
            return Z_OK;
            /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
             * of deflate should use the same flush parameter to make sure
             * that the flush is complete. So we don't have to output an
             * empty block here, this will be done at next call. This also
             * ensures that for a very small output buffer, we emit at most
             * one empty block.
             */
          }
          if (bstate === BS_BLOCK_DONE) {
            if (flush === Z_PARTIAL_FLUSH) {
              trees._tr_align(s);
            }
            else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */
      
              trees._tr_stored_block(s, 0, 0, false);
              /* For a full flush, this empty block will be recognized
               * as a special marker by inflate_sync().
               */
              if (flush === Z_FULL_FLUSH) {
                /*** CLEAR_HASH(s); ***/             /* forget history */
                zero(s.head); // Fill with NIL (= 0);
      
                if (s.lookahead === 0) {
                  s.strstart = 0;
                  s.block_start = 0;
                  s.insert = 0;
                }
              }
            }
            flush_pending(strm);
            if (strm.avail_out === 0) {
              s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
              return Z_OK;
            }
          }
        }
        //Assert(strm->avail_out > 0, "bug2");
        //if (strm.avail_out <= 0) { throw new Error("bug2");}
      
        if (flush !== Z_FINISH) { return Z_OK; }
        if (s.wrap <= 0) { return Z_STREAM_END; }
      
        /* Write the trailer */
        if (s.wrap === 2) {
          put_byte(s, strm.adler & 0xff);
          put_byte(s, (strm.adler >> 8) & 0xff);
          put_byte(s, (strm.adler >> 16) & 0xff);
          put_byte(s, (strm.adler >> 24) & 0xff);
          put_byte(s, strm.total_in & 0xff);
          put_byte(s, (strm.total_in >> 8) & 0xff);
          put_byte(s, (strm.total_in >> 16) & 0xff);
          put_byte(s, (strm.total_in >> 24) & 0xff);
        }
        else
        {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 0xffff);
        }
      
        flush_pending(strm);
        /* If avail_out is zero, the application will call deflate again
         * to flush the rest.
         */
        if (s.wrap > 0) { s.wrap = -s.wrap; }
        /* write the trailer only once! */
        return s.pending !== 0 ? Z_OK : Z_STREAM_END;
      }
      
      function deflateEnd(strm) {
        var status;
      
        if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
          return Z_STREAM_ERROR;
        }
      
        status = strm.state.status;
        if (status !== INIT_STATE &&
          status !== EXTRA_STATE &&
          status !== NAME_STATE &&
          status !== COMMENT_STATE &&
          status !== HCRC_STATE &&
          status !== BUSY_STATE &&
          status !== FINISH_STATE
        ) {
          return err(strm, Z_STREAM_ERROR);
        }
      
        strm.state = null;
      
        return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
      }
      
      
      /* =========================================================================
       * Initializes the compression dictionary from the given byte
       * sequence without producing any compressed output.
       */
      function deflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
      
        var s;
        var str, n;
        var wrap;
        var avail;
        var next;
        var input;
        var tmpDict;
      
        if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
          return Z_STREAM_ERROR;
        }
      
        s = strm.state;
        wrap = s.wrap;
      
        if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
          return Z_STREAM_ERROR;
        }
      
        /* when using zlib wrappers, compute Adler-32 for provided dictionary */
        if (wrap === 1) {
          /* adler32(strm->adler, dictionary, dictLength); */
          strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
        }
      
        s.wrap = 0;   /* avoid computing Adler-32 in read_buf */
      
        /* if dictionary would fill window, just replace the history */
        if (dictLength >= s.w_size) {
          if (wrap === 0) {            /* already empty otherwise */
            /*** CLEAR_HASH(s); ***/
            zero(s.head); // Fill with NIL (= 0);
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
          /* use the tail */
          // dictionary = dictionary.slice(dictLength - s.w_size);
          tmpDict = new utils.Buf8(s.w_size);
          utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
          dictionary = tmpDict;
          dictLength = s.w_size;
        }
        /* insert dictionary into window and hash */
        avail = strm.avail_in;
        next = strm.next_in;
        input = strm.input;
        strm.avail_in = dictLength;
        strm.next_in = 0;
        strm.input = dictionary;
        fill_window(s);
        while (s.lookahead >= MIN_MATCH) {
          str = s.strstart;
          n = s.lookahead - (MIN_MATCH - 1);
          do {
            /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
            s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
      
            s.prev[str & s.w_mask] = s.head[s.ins_h];
      
            s.head[s.ins_h] = str;
            str++;
          } while (--n);
          s.strstart = str;
          s.lookahead = MIN_MATCH - 1;
          fill_window(s);
        }
        s.strstart += s.lookahead;
        s.block_start = s.strstart;
        s.insert = s.lookahead;
        s.lookahead = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        strm.next_in = next;
        strm.input = input;
        strm.avail_in = avail;
        s.wrap = wrap;
        return Z_OK;
      }
      
      
      exports.deflateInit = deflateInit;
      exports.deflateInit2 = deflateInit2;
      exports.deflateReset = deflateReset;
      exports.deflateResetKeep = deflateResetKeep;
      exports.deflateSetHeader = deflateSetHeader;
      exports.deflate = deflate;
      exports.deflateEnd = deflateEnd;
      exports.deflateSetDictionary = deflateSetDictionary;
      exports.deflateInfo = 'pako deflate (from Nodeca project)';
      
      /* Not implemented
      exports.deflateBound = deflateBound;
      exports.deflateCopy = deflateCopy;
      exports.deflateParams = deflateParams;
      exports.deflatePending = deflatePending;
      exports.deflatePrime = deflatePrime;
      exports.deflateTune = deflateTune;
      */
      
      },{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      function GZheader() {
        /* true if compressed data believed to be text */
        this.text       = 0;
        /* modification time */
        this.time       = 0;
        /* extra flags (not used when writing a gzip file) */
        this.xflags     = 0;
        /* operating system */
        this.os         = 0;
        /* pointer to extra field or Z_NULL if none */
        this.extra      = null;
        /* extra field length (valid if extra != Z_NULL) */
        this.extra_len  = 0; // Actually, we don't need it in JS,
                             // but leave for few code modifications
      
        //
        // Setup limits is not necessary because in js we should not preallocate memory
        // for inflate use constant limit in 65536 bytes
        //
      
        /* space at extra (only when reading header) */
        // this.extra_max  = 0;
        /* pointer to zero-terminated file name or Z_NULL */
        this.name       = '';
        /* space at name (only when reading header) */
        // this.name_max   = 0;
        /* pointer to zero-terminated comment or Z_NULL */
        this.comment    = '';
        /* space at comment (only when reading header) */
        // this.comm_max   = 0;
        /* true if there was or will be a header crc */
        this.hcrc       = 0;
        /* true when done reading gzip header (not used when writing a gzip file) */
        this.done       = false;
      }
      
      module.exports = GZheader;
      
      },{}],10:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      // See state defs from inflate.js
      var BAD = 30;       /* got a data error -- remain here until reset */
      var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
      
      /*
         Decode literal, length, and distance codes and write out the resulting
         literal and match bytes until either not enough input or output is
         available, an end-of-block is encountered, or a data error is encountered.
         When large enough input and output buffers are supplied to inflate(), for
         example, a 16K input buffer and a 64K output buffer, more than 95% of the
         inflate execution time is spent in this routine.
      
         Entry assumptions:
      
              state.mode === LEN
              strm.avail_in >= 6
              strm.avail_out >= 258
              start >= strm.avail_out
              state.bits < 8
      
         On return, state.mode is one of:
      
              LEN -- ran out of enough output space or enough available input
              TYPE -- reached end of block code, inflate() to interpret next block
              BAD -- error in block data
      
         Notes:
      
          - The maximum input bits used by a length/distance pair is 15 bits for the
            length code, 5 bits for the length extra, 15 bits for the distance code,
            and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
            Therefore if strm.avail_in >= 6, then there is enough input to avoid
            checking for available input while decoding.
      
          - The maximum bytes that a single length/distance pair can output is 258
            bytes, which is the maximum length that can be coded.  inflate_fast()
            requires strm.avail_out >= 258 for each loop to avoid checking for
            output space.
       */
      module.exports = function inflate_fast(strm, start) {
        var state;
        var _in;                    /* local strm.input */
        var last;                   /* have enough input while in < last */
        var _out;                   /* local strm.output */
        var beg;                    /* inflate()'s initial strm.output */
        var end;                    /* while out < end, enough space available */
      //#ifdef INFLATE_STRICT
        var dmax;                   /* maximum distance from zlib header */
      //#endif
        var wsize;                  /* window size or zero if not using window */
        var whave;                  /* valid bytes in the window */
        var wnext;                  /* window write index */
        // Use `s_window` instead `window`, avoid conflict with instrumentation tools
        var s_window;               /* allocated sliding window, if wsize != 0 */
        var hold;                   /* local strm.hold */
        var bits;                   /* local strm.bits */
        var lcode;                  /* local strm.lencode */
        var dcode;                  /* local strm.distcode */
        var lmask;                  /* mask for first level of length codes */
        var dmask;                  /* mask for first level of distance codes */
        var here;                   /* retrieved table entry */
        var op;                     /* code bits, operation, extra bits, or */
                                    /*  window position, window bytes to copy */
        var len;                    /* match length, unused bytes */
        var dist;                   /* match distance */
        var from;                   /* where to copy match from */
        var from_source;
      
      
        var input, output; // JS specific, because we have no pointers
      
        /* copy state to local variables */
        state = strm.state;
        //here = state.here;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
      //#ifdef INFLATE_STRICT
        dmax = state.dmax;
      //#endif
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;
      
      
        /* decode literals and length/distances until end-of-block or not enough
           input data or output space */
      
        top:
        do {
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
      
          here = lcode[hold & lmask];
      
          dolen:
          for (;;) { // Goto emulation
            op = here >>> 24/*here.bits*/;
            hold >>>= op;
            bits -= op;
            op = (here >>> 16) & 0xff/*here.op*/;
            if (op === 0) {                          /* literal */
              //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
              //        "inflate:         literal '%c'\n" :
              //        "inflate:         literal 0x%02x\n", here.val));
              output[_out++] = here & 0xffff/*here.val*/;
            }
            else if (op & 16) {                     /* length base */
              len = here & 0xffff/*here.val*/;
              op &= 15;                           /* number of extra bits */
              if (op) {
                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                len += hold & ((1 << op) - 1);
                hold >>>= op;
                bits -= op;
              }
              //Tracevv((stderr, "inflate:         length %u\n", len));
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = dcode[hold & dmask];
      
              dodist:
              for (;;) { // goto emulation
                op = here >>> 24/*here.bits*/;
                hold >>>= op;
                bits -= op;
                op = (here >>> 16) & 0xff/*here.op*/;
      
                if (op & 16) {                      /* distance base */
                  dist = here & 0xffff/*here.val*/;
                  op &= 15;                       /* number of extra bits */
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & ((1 << op) - 1);
      //#ifdef INFLATE_STRICT
                  if (dist > dmax) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD;
                    break top;
                  }
      //#endif
                  hold >>>= op;
                  bits -= op;
                  //Tracevv((stderr, "inflate:         distance %u\n", dist));
                  op = _out - beg;                /* max distance in output */
                  if (dist > op) {                /* see if copy from window */
                    op = dist - op;               /* distance back in window */
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = 'invalid distance too far back';
                        state.mode = BAD;
                        break top;
                      }
      
      // (!) This block is disabled in zlib defaults,
      // don't enable it for binary compatibility
      //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
      //                if (len <= op - whave) {
      //                  do {
      //                    output[_out++] = 0;
      //                  } while (--len);
      //                  continue top;
      //                }
      //                len -= op - whave;
      //                do {
      //                  output[_out++] = 0;
      //                } while (--op > whave);
      //                if (op === 0) {
      //                  from = _out - dist;
      //                  do {
      //                    output[_out++] = output[from++];
      //                  } while (--len);
      //                  continue top;
      //                }
      //#endif
                    }
                    from = 0; // window index
                    from_source = s_window;
                    if (wnext === 0) {           /* very common case */
                      from += wsize - op;
                      if (op < len) {         /* some from window */
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;  /* rest from output */
                        from_source = output;
                      }
                    }
                    else if (wnext < op) {      /* wrap around window */
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {         /* some from end of window */
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {  /* some from start of window */
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;      /* rest from output */
                          from_source = output;
                        }
                      }
                    }
                    else {                      /* contiguous in window */
                      from += wnext - op;
                      if (op < len) {         /* some from window */
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;  /* rest from output */
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  }
                  else {
                    from = _out - dist;          /* copy direct from output */
                    do {                        /* minimum length is three */
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                }
                else if ((op & 64) === 0) {          /* 2nd level distance code */
                  here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
                  continue dodist;
                }
                else {
                  strm.msg = 'invalid distance code';
                  state.mode = BAD;
                  break top;
                }
      
                break; // need to emulate goto via "continue"
              }
            }
            else if ((op & 64) === 0) {              /* 2nd level length code */
              here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
              continue dolen;
            }
            else if (op & 32) {                     /* end-of-block */
              //Tracevv((stderr, "inflate:         end of block\n"));
              state.mode = TYPE;
              break top;
            }
            else {
              strm.msg = 'invalid literal/length code';
              state.mode = BAD;
              break top;
            }
      
            break; // need to emulate goto via "continue"
          }
        } while (_in < last && _out < end);
      
        /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;
      
        /* update state and return */
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
        strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
        state.hold = hold;
        state.bits = bits;
        return;
      };
      
      },{}],11:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      var utils         = require('../utils/common');
      var adler32       = require('./adler32');
      var crc32         = require('./crc32');
      var inflate_fast  = require('./inffast');
      var inflate_table = require('./inftrees');
      
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      
      /* Public constants ==========================================================*/
      /* ===========================================================================*/
      
      
      /* Allowed flush values; see deflate() and inflate() below for details */
      //var Z_NO_FLUSH      = 0;
      //var Z_PARTIAL_FLUSH = 1;
      //var Z_SYNC_FLUSH    = 2;
      //var Z_FULL_FLUSH    = 3;
      var Z_FINISH        = 4;
      var Z_BLOCK         = 5;
      var Z_TREES         = 6;
      
      
      /* Return codes for the compression/decompression functions. Negative values
       * are errors, positive values are used for special but normal events.
       */
      var Z_OK            = 0;
      var Z_STREAM_END    = 1;
      var Z_NEED_DICT     = 2;
      //var Z_ERRNO         = -1;
      var Z_STREAM_ERROR  = -2;
      var Z_DATA_ERROR    = -3;
      var Z_MEM_ERROR     = -4;
      var Z_BUF_ERROR     = -5;
      //var Z_VERSION_ERROR = -6;
      
      /* The deflate compression method */
      var Z_DEFLATED  = 8;
      
      
      /* STATES ====================================================================*/
      /* ===========================================================================*/
      
      
      var    HEAD = 1;       /* i: waiting for magic header */
      var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
      var    TIME = 3;       /* i: waiting for modification time (gzip) */
      var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
      var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
      var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
      var    NAME = 7;       /* i: waiting for end of file name (gzip) */
      var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
      var    HCRC = 9;       /* i: waiting for header crc (gzip) */
      var    DICTID = 10;    /* i: waiting for dictionary check value */
      var    DICT = 11;      /* waiting for inflateSetDictionary() call */
      var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
      var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
      var        STORED = 14;    /* i: waiting for stored size (length and complement) */
      var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
      var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
      var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
      var        LENLENS = 18;   /* i: waiting for code length code lengths */
      var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
      var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
      var            LEN = 21;       /* i: waiting for length/lit/eob code */
      var            LENEXT = 22;    /* i: waiting for length extra bits */
      var            DIST = 23;      /* i: waiting for distance code */
      var            DISTEXT = 24;   /* i: waiting for distance extra bits */
      var            MATCH = 25;     /* o: waiting for output space to copy string */
      var            LIT = 26;       /* o: waiting for output space to write literal */
      var    CHECK = 27;     /* i: waiting for 32-bit check value */
      var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
      var    DONE = 29;      /* finished check, done -- remain here until reset */
      var    BAD = 30;       /* got a data error -- remain here until reset */
      var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
      var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */
      
      /* ===========================================================================*/
      
      
      
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      //var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);
      
      var MAX_WBITS = 15;
      /* 32K LZ77 window */
      var DEF_WBITS = MAX_WBITS;
      
      
      function zswap32(q) {
        return  (((q >>> 24) & 0xff) +
                ((q >>> 8) & 0xff00) +
                ((q & 0xff00) << 8) +
                ((q & 0xff) << 24));
      }
      
      
      function InflateState() {
        this.mode = 0;             /* current inflate mode */
        this.last = false;          /* true if processing last block */
        this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
        this.havedict = false;      /* true if dictionary provided */
        this.flags = 0;             /* gzip header method and flags (0 if zlib) */
        this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
        this.check = 0;             /* protected copy of check value */
        this.total = 0;             /* protected copy of output count */
        // TODO: may be {}
        this.head = null;           /* where to save gzip header information */
      
        /* sliding window */
        this.wbits = 0;             /* log base 2 of requested window size */
        this.wsize = 0;             /* window size or zero if not using window */
        this.whave = 0;             /* valid bytes in the window */
        this.wnext = 0;             /* window write index */
        this.window = null;         /* allocated sliding window, if needed */
      
        /* bit accumulator */
        this.hold = 0;              /* input bit accumulator */
        this.bits = 0;              /* number of bits in "in" */
      
        /* for string and stored block copying */
        this.length = 0;            /* literal or length of data to copy */
        this.offset = 0;            /* distance back to copy string from */
      
        /* for table and code decoding */
        this.extra = 0;             /* extra bits needed */
      
        /* fixed and dynamic code tables */
        this.lencode = null;          /* starting table for length/literal codes */
        this.distcode = null;         /* starting table for distance codes */
        this.lenbits = 0;           /* index bits for lencode */
        this.distbits = 0;          /* index bits for distcode */
      
        /* dynamic table building */
        this.ncode = 0;             /* number of code length code lengths */
        this.nlen = 0;              /* number of length code lengths */
        this.ndist = 0;             /* number of distance code lengths */
        this.have = 0;              /* number of code lengths in lens[] */
        this.next = null;              /* next available space in codes[] */
      
        this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
        this.work = new utils.Buf16(288); /* work area for code table building */
      
        /*
         because we don't have pointers in js, we use lencode and distcode directly
         as buffers so we don't need codes
        */
        //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
        this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
        this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
        this.sane = 0;                   /* if false, allow invalid distance too far */
        this.back = 0;                   /* bits back of last unprocessed length/lit */
        this.was = 0;                    /* initial length of match */
      }
      
      function inflateResetKeep(strm) {
        var state;
      
        if (!strm || !strm.state) { return Z_STREAM_ERROR; }
        state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = ''; /*Z_NULL*/
        if (state.wrap) {       /* to support ill-conceived Java test suite */
          strm.adler = state.wrap & 1;
        }
        state.mode = HEAD;
        state.last = 0;
        state.havedict = 0;
        state.dmax = 32768;
        state.head = null/*Z_NULL*/;
        state.hold = 0;
        state.bits = 0;
        //state.lencode = state.distcode = state.next = state.codes;
        state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
        state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
      
        state.sane = 1;
        state.back = -1;
        //Tracev((stderr, "inflate: reset\n"));
        return Z_OK;
      }
      
      function inflateReset(strm) {
        var state;
      
        if (!strm || !strm.state) { return Z_STREAM_ERROR; }
        state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep(strm);
      
      }
      
      function inflateReset2(strm, windowBits) {
        var wrap;
        var state;
      
        /* get the state */
        if (!strm || !strm.state) { return Z_STREAM_ERROR; }
        state = strm.state;
      
        /* extract wrap request from windowBits parameter */
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        }
        else {
          wrap = (windowBits >> 4) + 1;
          if (windowBits < 48) {
            windowBits &= 15;
          }
        }
      
        /* set number of window bits, free window if different */
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
          return Z_STREAM_ERROR;
        }
        if (state.window !== null && state.wbits !== windowBits) {
          state.window = null;
        }
      
        /* update state and reset the rest of it */
        state.wrap = wrap;
        state.wbits = windowBits;
        return inflateReset(strm);
      }
      
      function inflateInit2(strm, windowBits) {
        var ret;
        var state;
      
        if (!strm) { return Z_STREAM_ERROR; }
        //strm.msg = Z_NULL;                 /* in case we return an error */
      
        state = new InflateState();
      
        //if (state === Z_NULL) return Z_MEM_ERROR;
        //Tracev((stderr, "inflate: allocated\n"));
        strm.state = state;
        state.window = null/*Z_NULL*/;
        ret = inflateReset2(strm, windowBits);
        if (ret !== Z_OK) {
          strm.state = null/*Z_NULL*/;
        }
        return ret;
      }
      
      function inflateInit(strm) {
        return inflateInit2(strm, DEF_WBITS);
      }
      
      
      /*
       Return state with length and distance decoding tables and index sizes set to
       fixed code decoding.  Normally this returns fixed tables from inffixed.h.
       If BUILDFIXED is defined, then instead this routine builds the tables the
       first time it's called, and returns those tables the first time and
       thereafter.  This reduces the size of the code by about 2K bytes, in
       exchange for a little execution time.  However, BUILDFIXED should not be
       used for threaded applications, since the rewriting of the tables and virgin
       may not be thread-safe.
       */
      var virgin = true;
      
      var lenfix, distfix; // We have no pointers in JS, so keep tables separate
      
      function fixedtables(state) {
        /* build fixed huffman tables if first call (may not be thread safe) */
        if (virgin) {
          var sym;
      
          lenfix = new utils.Buf32(512);
          distfix = new utils.Buf32(32);
      
          /* literal/length table */
          sym = 0;
          while (sym < 144) { state.lens[sym++] = 8; }
          while (sym < 256) { state.lens[sym++] = 9; }
          while (sym < 280) { state.lens[sym++] = 7; }
          while (sym < 288) { state.lens[sym++] = 8; }
      
          inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });
      
          /* distance table */
          sym = 0;
          while (sym < 32) { state.lens[sym++] = 5; }
      
          inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });
      
          /* do this just once */
          virgin = false;
        }
      
        state.lencode = lenfix;
        state.lenbits = 9;
        state.distcode = distfix;
        state.distbits = 5;
      }
      
      
      /*
       Update the window with the last wsize (normally 32K) bytes written before
       returning.  If window does not exist yet, create it.  This is only called
       when a window is already in use, or when output has been written during this
       inflate call, but the end of the deflate stream has not been reached yet.
       It is also called to create a window for dictionary data when a dictionary
       is loaded.
      
       Providing output buffers larger than 32K to inflate() should provide a speed
       advantage, since only the last 32K of output is copied to the sliding window
       upon return from inflate(), and since all distances after the first 32K of
       output will fall in the output data, making match copies simpler and faster.
       The advantage may be dependent on the size of the processor's data caches.
       */
      function updatewindow(strm, src, end, copy) {
        var dist;
        var state = strm.state;
      
        /* if it hasn't been done already, allocate space for the window */
        if (state.window === null) {
          state.wsize = 1 << state.wbits;
          state.wnext = 0;
          state.whave = 0;
      
          state.window = new utils.Buf8(state.wsize);
        }
      
        /* copy state->wsize or less output bytes into the circular window */
        if (copy >= state.wsize) {
          utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
          state.wnext = 0;
          state.whave = state.wsize;
        }
        else {
          dist = state.wsize - state.wnext;
          if (dist > copy) {
            dist = copy;
          }
          //zmemcpy(state->window + state->wnext, end - copy, dist);
          utils.arraySet(state.window, src, end - copy, dist, state.wnext);
          copy -= dist;
          if (copy) {
            //zmemcpy(state->window, end - copy, copy);
            utils.arraySet(state.window, src, end - copy, copy, 0);
            state.wnext = copy;
            state.whave = state.wsize;
          }
          else {
            state.wnext += dist;
            if (state.wnext === state.wsize) { state.wnext = 0; }
            if (state.whave < state.wsize) { state.whave += dist; }
          }
        }
        return 0;
      }
      
      function inflate(strm, flush) {
        var state;
        var input, output;          // input/output buffers
        var next;                   /* next input INDEX */
        var put;                    /* next output INDEX */
        var have, left;             /* available input and output */
        var hold;                   /* bit buffer */
        var bits;                   /* bits in bit buffer */
        var _in, _out;              /* save starting available input and output */
        var copy;                   /* number of stored or match bytes to copy */
        var from;                   /* where to copy match bytes from */
        var from_source;
        var here = 0;               /* current decoding table entry */
        var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
        //var last;                   /* parent table entry */
        var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
        var len;                    /* length to copy for repeats, bits to drop */
        var ret;                    /* return code */
        var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
        var opts;
      
        var n; // temporary var for NEED_BITS
      
        var order = /* permutation of code lengths */
          [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];
      
      
        if (!strm || !strm.state || !strm.output ||
            (!strm.input && strm.avail_in !== 0)) {
          return Z_STREAM_ERROR;
        }
      
        state = strm.state;
        if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */
      
      
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---
      
        _in = have;
        _out = left;
        ret = Z_OK;
      
        inf_leave: // goto emulation
        for (;;) {
          switch (state.mode) {
            case HEAD:
              if (state.wrap === 0) {
                state.mode = TYPEDO;
                break;
              }
              //=== NEEDBITS(16);
              while (bits < 16) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
                state.check = 0/*crc32(0L, Z_NULL, 0)*/;
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                //===//
      
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
                state.mode = FLAGS;
                break;
              }
              state.flags = 0;           /* expect zlib header */
              if (state.head) {
                state.head.done = false;
              }
              if (!(state.wrap & 1) ||   /* check if zlib header allowed */
                (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
                strm.msg = 'incorrect header check';
                state.mode = BAD;
                break;
              }
              if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
                strm.msg = 'unknown compression method';
                state.mode = BAD;
                break;
              }
              //--- DROPBITS(4) ---//
              hold >>>= 4;
              bits -= 4;
              //---//
              len = (hold & 0x0f)/*BITS(4)*/ + 8;
              if (state.wbits === 0) {
                state.wbits = len;
              }
              else if (len > state.wbits) {
                strm.msg = 'invalid window size';
                state.mode = BAD;
                break;
              }
              state.dmax = 1 << len;
              //Tracev((stderr, "inflate:   zlib header ok\n"));
              strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
              state.mode = hold & 0x200 ? DICTID : TYPE;
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              break;
            case FLAGS:
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.flags = hold;
              if ((state.flags & 0xff) !== Z_DEFLATED) {
                strm.msg = 'unknown compression method';
                state.mode = BAD;
                break;
              }
              if (state.flags & 0xe000) {
                strm.msg = 'unknown header flags set';
                state.mode = BAD;
                break;
              }
              if (state.head) {
                state.head.text = ((hold >> 8) & 1);
              }
              if (state.flags & 0x0200) {
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                //===//
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = TIME;
              /* falls through */
            case TIME:
              //=== NEEDBITS(32); */
              while (bits < 32) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if (state.head) {
                state.head.time = hold;
              }
              if (state.flags & 0x0200) {
                //=== CRC4(state.check, hold)
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                hbuf[2] = (hold >>> 16) & 0xff;
                hbuf[3] = (hold >>> 24) & 0xff;
                state.check = crc32(state.check, hbuf, 4, 0);
                //===
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = OS;
              /* falls through */
            case OS:
              //=== NEEDBITS(16); */
              while (bits < 16) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if (state.head) {
                state.head.xflags = (hold & 0xff);
                state.head.os = (hold >> 8);
              }
              if (state.flags & 0x0200) {
                //=== CRC2(state.check, hold);
                hbuf[0] = hold & 0xff;
                hbuf[1] = (hold >>> 8) & 0xff;
                state.check = crc32(state.check, hbuf, 2, 0);
                //===//
              }
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = EXLEN;
              /* falls through */
            case EXLEN:
              if (state.flags & 0x0400) {
                //=== NEEDBITS(16); */
                while (bits < 16) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.length = hold;
                if (state.head) {
                  state.head.extra_len = hold;
                }
                if (state.flags & 0x0200) {
                  //=== CRC2(state.check, hold);
                  hbuf[0] = hold & 0xff;
                  hbuf[1] = (hold >>> 8) & 0xff;
                  state.check = crc32(state.check, hbuf, 2, 0);
                  //===//
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
              }
              else if (state.head) {
                state.head.extra = null/*Z_NULL*/;
              }
              state.mode = EXTRA;
              /* falls through */
            case EXTRA:
              if (state.flags & 0x0400) {
                copy = state.length;
                if (copy > have) { copy = have; }
                if (copy) {
                  if (state.head) {
                    len = state.head.extra_len - state.length;
                    if (!state.head.extra) {
                      // Use untyped array for more convenient processing later
                      state.head.extra = new Array(state.head.extra_len);
                    }
                    utils.arraySet(
                      state.head.extra,
                      input,
                      next,
                      // extra field is limited to 65536 bytes
                      // - no need for additional size check
                      copy,
                      /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                      len
                    );
                    //zmemcpy(state.head.extra + len, next,
                    //        len + copy > state.head.extra_max ?
                    //        state.head.extra_max - len : copy);
                  }
                  if (state.flags & 0x0200) {
                    state.check = crc32(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  state.length -= copy;
                }
                if (state.length) { break inf_leave; }
              }
              state.length = 0;
              state.mode = NAME;
              /* falls through */
            case NAME:
              if (state.flags & 0x0800) {
                if (have === 0) { break inf_leave; }
                copy = 0;
                do {
                  // TODO: 2 or 1 bytes?
                  len = input[next + copy++];
                  /* use constant limit because in js we should not preallocate memory */
                  if (state.head && len &&
                      (state.length < 65536 /*state.head.name_max*/)) {
                    state.head.name += String.fromCharCode(len);
                  }
                } while (len && copy < have);
      
                if (state.flags & 0x0200) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) { break inf_leave; }
              }
              else if (state.head) {
                state.head.name = null;
              }
              state.length = 0;
              state.mode = COMMENT;
              /* falls through */
            case COMMENT:
              if (state.flags & 0x1000) {
                if (have === 0) { break inf_leave; }
                copy = 0;
                do {
                  len = input[next + copy++];
                  /* use constant limit because in js we should not preallocate memory */
                  if (state.head && len &&
                      (state.length < 65536 /*state.head.comm_max*/)) {
                    state.head.comment += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 0x0200) {
                  state.check = crc32(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) { break inf_leave; }
              }
              else if (state.head) {
                state.head.comment = null;
              }
              state.mode = HCRC;
              /* falls through */
            case HCRC:
              if (state.flags & 0x0200) {
                //=== NEEDBITS(16); */
                while (bits < 16) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                if (hold !== (state.check & 0xffff)) {
                  strm.msg = 'header crc mismatch';
                  state.mode = BAD;
                  break;
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
              }
              if (state.head) {
                state.head.hcrc = ((state.flags >> 9) & 1);
                state.head.done = true;
              }
              strm.adler = state.check = 0;
              state.mode = TYPE;
              break;
            case DICTID:
              //=== NEEDBITS(32); */
              while (bits < 32) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              strm.adler = state.check = zswap32(hold);
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = DICT;
              /* falls through */
            case DICT:
              if (state.havedict === 0) {
                //--- RESTORE() ---
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                //---
                return Z_NEED_DICT;
              }
              strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
              state.mode = TYPE;
              /* falls through */
            case TYPE:
              if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
              /* falls through */
            case TYPEDO:
              if (state.last) {
                //--- BYTEBITS() ---//
                hold >>>= bits & 7;
                bits -= bits & 7;
                //---//
                state.mode = CHECK;
                break;
              }
              //=== NEEDBITS(3); */
              while (bits < 3) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.last = (hold & 0x01)/*BITS(1)*/;
              //--- DROPBITS(1) ---//
              hold >>>= 1;
              bits -= 1;
              //---//
      
              switch ((hold & 0x03)/*BITS(2)*/) {
                case 0:                             /* stored block */
                  //Tracev((stderr, "inflate:     stored block%s\n",
                  //        state.last ? " (last)" : ""));
                  state.mode = STORED;
                  break;
                case 1:                             /* fixed block */
                  fixedtables(state);
                  //Tracev((stderr, "inflate:     fixed codes block%s\n",
                  //        state.last ? " (last)" : ""));
                  state.mode = LEN_;             /* decode codes */
                  if (flush === Z_TREES) {
                    //--- DROPBITS(2) ---//
                    hold >>>= 2;
                    bits -= 2;
                    //---//
                    break inf_leave;
                  }
                  break;
                case 2:                             /* dynamic block */
                  //Tracev((stderr, "inflate:     dynamic codes block%s\n",
                  //        state.last ? " (last)" : ""));
                  state.mode = TABLE;
                  break;
                case 3:
                  strm.msg = 'invalid block type';
                  state.mode = BAD;
              }
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break;
            case STORED:
              //--- BYTEBITS() ---// /* go to byte boundary */
              hold >>>= bits & 7;
              bits -= bits & 7;
              //---//
              //=== NEEDBITS(32); */
              while (bits < 32) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
                strm.msg = 'invalid stored block lengths';
                state.mode = BAD;
                break;
              }
              state.length = hold & 0xffff;
              //Tracev((stderr, "inflate:       stored length %u\n",
              //        state.length));
              //=== INITBITS();
              hold = 0;
              bits = 0;
              //===//
              state.mode = COPY_;
              if (flush === Z_TREES) { break inf_leave; }
              /* falls through */
            case COPY_:
              state.mode = COPY;
              /* falls through */
            case COPY:
              copy = state.length;
              if (copy) {
                if (copy > have) { copy = have; }
                if (copy > left) { copy = left; }
                if (copy === 0) { break inf_leave; }
                //--- zmemcpy(put, next, copy); ---
                utils.arraySet(output, input, next, copy, put);
                //---//
                have -= copy;
                next += copy;
                left -= copy;
                put += copy;
                state.length -= copy;
                break;
              }
              //Tracev((stderr, "inflate:       stored end\n"));
              state.mode = TYPE;
              break;
            case TABLE:
              //=== NEEDBITS(14); */
              while (bits < 14) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
              //--- DROPBITS(5) ---//
              hold >>>= 5;
              bits -= 5;
              //---//
              state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
              //--- DROPBITS(5) ---//
              hold >>>= 5;
              bits -= 5;
              //---//
              state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
              //--- DROPBITS(4) ---//
              hold >>>= 4;
              bits -= 4;
              //---//
      //#ifndef PKZIP_BUG_WORKAROUND
              if (state.nlen > 286 || state.ndist > 30) {
                strm.msg = 'too many length or distance symbols';
                state.mode = BAD;
                break;
              }
      //#endif
              //Tracev((stderr, "inflate:       table sizes ok\n"));
              state.have = 0;
              state.mode = LENLENS;
              /* falls through */
            case LENLENS:
              while (state.have < state.ncode) {
                //=== NEEDBITS(3);
                while (bits < 3) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
                //--- DROPBITS(3) ---//
                hold >>>= 3;
                bits -= 3;
                //---//
              }
              while (state.have < 19) {
                state.lens[order[state.have++]] = 0;
              }
              // We have separate tables & no pointers. 2 commented lines below not needed.
              //state.next = state.codes;
              //state.lencode = state.next;
              // Switch to use dynamic table
              state.lencode = state.lendyn;
              state.lenbits = 7;
      
              opts = { bits: state.lenbits };
              ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
      
              if (ret) {
                strm.msg = 'invalid code lengths set';
                state.mode = BAD;
                break;
              }
              //Tracev((stderr, "inflate:       code lengths ok\n"));
              state.have = 0;
              state.mode = CODELENS;
              /* falls through */
            case CODELENS:
              while (state.have < state.nlen + state.ndist) {
                for (;;) {
                  here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
                  here_bits = here >>> 24;
                  here_op = (here >>> 16) & 0xff;
                  here_val = here & 0xffff;
      
                  if ((here_bits) <= bits) { break; }
                  //--- PULLBYTE() ---//
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                  //---//
                }
                if (here_val < 16) {
                  //--- DROPBITS(here.bits) ---//
                  hold >>>= here_bits;
                  bits -= here_bits;
                  //---//
                  state.lens[state.have++] = here_val;
                }
                else {
                  if (here_val === 16) {
                    //=== NEEDBITS(here.bits + 2);
                    n = here_bits + 2;
                    while (bits < n) {
                      if (have === 0) { break inf_leave; }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    //===//
                    //--- DROPBITS(here.bits) ---//
                    hold >>>= here_bits;
                    bits -= here_bits;
                    //---//
                    if (state.have === 0) {
                      strm.msg = 'invalid bit length repeat';
                      state.mode = BAD;
                      break;
                    }
                    len = state.lens[state.have - 1];
                    copy = 3 + (hold & 0x03);//BITS(2);
                    //--- DROPBITS(2) ---//
                    hold >>>= 2;
                    bits -= 2;
                    //---//
                  }
                  else if (here_val === 17) {
                    //=== NEEDBITS(here.bits + 3);
                    n = here_bits + 3;
                    while (bits < n) {
                      if (have === 0) { break inf_leave; }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    //===//
                    //--- DROPBITS(here.bits) ---//
                    hold >>>= here_bits;
                    bits -= here_bits;
                    //---//
                    len = 0;
                    copy = 3 + (hold & 0x07);//BITS(3);
                    //--- DROPBITS(3) ---//
                    hold >>>= 3;
                    bits -= 3;
                    //---//
                  }
                  else {
                    //=== NEEDBITS(here.bits + 7);
                    n = here_bits + 7;
                    while (bits < n) {
                      if (have === 0) { break inf_leave; }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    //===//
                    //--- DROPBITS(here.bits) ---//
                    hold >>>= here_bits;
                    bits -= here_bits;
                    //---//
                    len = 0;
                    copy = 11 + (hold & 0x7f);//BITS(7);
                    //--- DROPBITS(7) ---//
                    hold >>>= 7;
                    bits -= 7;
                    //---//
                  }
                  if (state.have + copy > state.nlen + state.ndist) {
                    strm.msg = 'invalid bit length repeat';
                    state.mode = BAD;
                    break;
                  }
                  while (copy--) {
                    state.lens[state.have++] = len;
                  }
                }
              }
      
              /* handle error breaks in while */
              if (state.mode === BAD) { break; }
      
              /* check for end-of-block code (better have one) */
              if (state.lens[256] === 0) {
                strm.msg = 'invalid code -- missing end-of-block';
                state.mode = BAD;
                break;
              }
      
              /* build code tables -- note: do not change the lenbits or distbits
                 values here (9 and 6) without reading the comments in inftrees.h
                 concerning the ENOUGH constants, which depend on those values */
              state.lenbits = 9;
      
              opts = { bits: state.lenbits };
              ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
              // We have separate tables & no pointers. 2 commented lines below not needed.
              // state.next_index = opts.table_index;
              state.lenbits = opts.bits;
              // state.lencode = state.next;
      
              if (ret) {
                strm.msg = 'invalid literal/lengths set';
                state.mode = BAD;
                break;
              }
      
              state.distbits = 6;
              //state.distcode.copy(state.codes);
              // Switch to use dynamic table
              state.distcode = state.distdyn;
              opts = { bits: state.distbits };
              ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
              // We have separate tables & no pointers. 2 commented lines below not needed.
              // state.next_index = opts.table_index;
              state.distbits = opts.bits;
              // state.distcode = state.next;
      
              if (ret) {
                strm.msg = 'invalid distances set';
                state.mode = BAD;
                break;
              }
              //Tracev((stderr, 'inflate:       codes ok\n'));
              state.mode = LEN_;
              if (flush === Z_TREES) { break inf_leave; }
              /* falls through */
            case LEN_:
              state.mode = LEN;
              /* falls through */
            case LEN:
              if (have >= 6 && left >= 258) {
                //--- RESTORE() ---
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                //---
                inflate_fast(strm, _out);
                //--- LOAD() ---
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                //---
      
                if (state.mode === TYPE) {
                  state.back = -1;
                }
                break;
              }
              state.back = 0;
              for (;;) {
                here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;
      
                if (here_bits <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              if (here_op && (here_op & 0xf0) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (;;) {
                  here = state.lencode[last_val +
                          ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = (here >>> 16) & 0xff;
                  here_val = here & 0xffff;
      
                  if ((last_bits + here_bits) <= bits) { break; }
                  //--- PULLBYTE() ---//
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                  //---//
                }
                //--- DROPBITS(last.bits) ---//
                hold >>>= last_bits;
                bits -= last_bits;
                //---//
                state.back += last_bits;
              }
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              state.back += here_bits;
              state.length = here_val;
              if (here_op === 0) {
                //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
                //        "inflate:         literal '%c'\n" :
                //        "inflate:         literal 0x%02x\n", here.val));
                state.mode = LIT;
                break;
              }
              if (here_op & 32) {
                //Tracevv((stderr, "inflate:         end of block\n"));
                state.back = -1;
                state.mode = TYPE;
                break;
              }
              if (here_op & 64) {
                strm.msg = 'invalid literal/length code';
                state.mode = BAD;
                break;
              }
              state.extra = here_op & 15;
              state.mode = LENEXT;
              /* falls through */
            case LENEXT:
              if (state.extra) {
                //=== NEEDBITS(state.extra);
                n = state.extra;
                while (bits < n) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
                //--- DROPBITS(state.extra) ---//
                hold >>>= state.extra;
                bits -= state.extra;
                //---//
                state.back += state.extra;
              }
              //Tracevv((stderr, "inflate:         length %u\n", state.length));
              state.was = state.length;
              state.mode = DIST;
              /* falls through */
            case DIST:
              for (;;) {
                here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
                here_bits = here >>> 24;
                here_op = (here >>> 16) & 0xff;
                here_val = here & 0xffff;
      
                if ((here_bits) <= bits) { break; }
                //--- PULLBYTE() ---//
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
                //---//
              }
              if ((here_op & 0xf0) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (;;) {
                  here = state.distcode[last_val +
                          ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = (here >>> 16) & 0xff;
                  here_val = here & 0xffff;
      
                  if ((last_bits + here_bits) <= bits) { break; }
                  //--- PULLBYTE() ---//
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                  //---//
                }
                //--- DROPBITS(last.bits) ---//
                hold >>>= last_bits;
                bits -= last_bits;
                //---//
                state.back += last_bits;
              }
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              state.back += here_bits;
              if (here_op & 64) {
                strm.msg = 'invalid distance code';
                state.mode = BAD;
                break;
              }
              state.offset = here_val;
              state.extra = (here_op) & 15;
              state.mode = DISTEXT;
              /* falls through */
            case DISTEXT:
              if (state.extra) {
                //=== NEEDBITS(state.extra);
                n = state.extra;
                while (bits < n) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
                //--- DROPBITS(state.extra) ---//
                hold >>>= state.extra;
                bits -= state.extra;
                //---//
                state.back += state.extra;
              }
      //#ifdef INFLATE_STRICT
              if (state.offset > state.dmax) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD;
                break;
              }
      //#endif
              //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
              state.mode = MATCH;
              /* falls through */
            case MATCH:
              if (left === 0) { break inf_leave; }
              copy = _out - left;
              if (state.offset > copy) {         /* copy from window */
                copy = state.offset - copy;
                if (copy > state.whave) {
                  if (state.sane) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD;
                    break;
                  }
      // (!) This block is disabled in zlib defaults,
      // don't enable it for binary compatibility
      //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
      //          Trace((stderr, "inflate.c too far\n"));
      //          copy -= state.whave;
      //          if (copy > state.length) { copy = state.length; }
      //          if (copy > left) { copy = left; }
      //          left -= copy;
      //          state.length -= copy;
      //          do {
      //            output[put++] = 0;
      //          } while (--copy);
      //          if (state.length === 0) { state.mode = LEN; }
      //          break;
      //#endif
                }
                if (copy > state.wnext) {
                  copy -= state.wnext;
                  from = state.wsize - copy;
                }
                else {
                  from = state.wnext - copy;
                }
                if (copy > state.length) { copy = state.length; }
                from_source = state.window;
              }
              else {                              /* copy from output */
                from_source = output;
                from = put - state.offset;
                copy = state.length;
              }
              if (copy > left) { copy = left; }
              left -= copy;
              state.length -= copy;
              do {
                output[put++] = from_source[from++];
              } while (--copy);
              if (state.length === 0) { state.mode = LEN; }
              break;
            case LIT:
              if (left === 0) { break inf_leave; }
              output[put++] = state.length;
              left--;
              state.mode = LEN;
              break;
            case CHECK:
              if (state.wrap) {
                //=== NEEDBITS(32);
                while (bits < 32) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  // Use '|' instead of '+' to make sure that result is signed
                  hold |= input[next++] << bits;
                  bits += 8;
                }
                //===//
                _out -= left;
                strm.total_out += _out;
                state.total += _out;
                if (_out) {
                  strm.adler = state.check =
                      /*UPDATE(state.check, put - _out, _out);*/
                      (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));
      
                }
                _out = left;
                // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
                if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                  strm.msg = 'incorrect data check';
                  state.mode = BAD;
                  break;
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
                //Tracev((stderr, "inflate:   check matches trailer\n"));
              }
              state.mode = LENGTH;
              /* falls through */
            case LENGTH:
              if (state.wrap && state.flags) {
                //=== NEEDBITS(32);
                while (bits < 32) {
                  if (have === 0) { break inf_leave; }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                //===//
                if (hold !== (state.total & 0xffffffff)) {
                  strm.msg = 'incorrect length check';
                  state.mode = BAD;
                  break;
                }
                //=== INITBITS();
                hold = 0;
                bits = 0;
                //===//
                //Tracev((stderr, "inflate:   length matches trailer\n"));
              }
              state.mode = DONE;
              /* falls through */
            case DONE:
              ret = Z_STREAM_END;
              break inf_leave;
            case BAD:
              ret = Z_DATA_ERROR;
              break inf_leave;
            case MEM:
              return Z_MEM_ERROR;
            case SYNC:
              /* falls through */
            default:
              return Z_STREAM_ERROR;
          }
        }
      
        // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"
      
        /*
           Return from inflate(), updating the total counts and the check value.
           If there was no progress during the inflate() call, return a buffer
           error.  Call updatewindow() to create and/or update the window state.
           Note: a memory error from inflate() is non-recoverable.
         */
      
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
      
        if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                            (state.mode < CHECK || flush !== Z_FINISH))) {
          if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap && _out) {
          strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
            (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) +
                          (state.mode === TYPE ? 128 : 0) +
                          (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
        if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
          ret = Z_BUF_ERROR;
        }
        return ret;
      }
      
      function inflateEnd(strm) {
      
        if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
          return Z_STREAM_ERROR;
        }
      
        var state = strm.state;
        if (state.window) {
          state.window = null;
        }
        strm.state = null;
        return Z_OK;
      }
      
      function inflateGetHeader(strm, head) {
        var state;
      
        /* check state */
        if (!strm || !strm.state) { return Z_STREAM_ERROR; }
        state = strm.state;
        if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }
      
        /* save header structure */
        state.head = head;
        head.done = false;
        return Z_OK;
      }
      
      function inflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
      
        var state;
        var dictid;
        var ret;
      
        /* check state */
        if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
        state = strm.state;
      
        if (state.wrap !== 0 && state.mode !== DICT) {
          return Z_STREAM_ERROR;
        }
      
        /* check for correct dictionary identifier */
        if (state.mode === DICT) {
          dictid = 1; /* adler32(0, null, 0)*/
          /* dictid = adler32(dictid, dictionary, dictLength); */
          dictid = adler32(dictid, dictionary, dictLength, 0);
          if (dictid !== state.check) {
            return Z_DATA_ERROR;
          }
        }
        /* copy dictionary to window using updatewindow(), which will amend the
         existing dictionary if appropriate */
        ret = updatewindow(strm, dictionary, dictLength, dictLength);
        if (ret) {
          state.mode = MEM;
          return Z_MEM_ERROR;
        }
        state.havedict = 1;
        // Tracev((stderr, "inflate:   dictionary set\n"));
        return Z_OK;
      }
      
      exports.inflateReset = inflateReset;
      exports.inflateReset2 = inflateReset2;
      exports.inflateResetKeep = inflateResetKeep;
      exports.inflateInit = inflateInit;
      exports.inflateInit2 = inflateInit2;
      exports.inflate = inflate;
      exports.inflateEnd = inflateEnd;
      exports.inflateGetHeader = inflateGetHeader;
      exports.inflateSetDictionary = inflateSetDictionary;
      exports.inflateInfo = 'pako inflate (from Nodeca project)';
      
      /* Not implemented
      exports.inflateCopy = inflateCopy;
      exports.inflateGetDictionary = inflateGetDictionary;
      exports.inflateMark = inflateMark;
      exports.inflatePrime = inflatePrime;
      exports.inflateSync = inflateSync;
      exports.inflateSyncPoint = inflateSyncPoint;
      exports.inflateUndermine = inflateUndermine;
      */
      
      },{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      var utils = require('../utils/common');
      
      var MAXBITS = 15;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);
      
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      
      var lbase = [ /* Length codes 257..285 base */
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
        35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
      ];
      
      var lext = [ /* Length codes 257..285 extra */
        16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
        19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
      ];
      
      var dbase = [ /* Distance codes 0..29 base */
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
        257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
        8193, 12289, 16385, 24577, 0, 0
      ];
      
      var dext = [ /* Distance codes 0..29 extra */
        16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
        23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
        28, 28, 29, 29, 64, 64
      ];
      
      module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
      {
        var bits = opts.bits;
            //here = opts.here; /* table entry for duplication */
      
        var len = 0;               /* a code's length in bits */
        var sym = 0;               /* index of code symbols */
        var min = 0, max = 0;          /* minimum and maximum code lengths */
        var root = 0;              /* number of index bits for root table */
        var curr = 0;              /* number of index bits for current table */
        var drop = 0;              /* code bits to drop for sub-table */
        var left = 0;                   /* number of prefix codes available */
        var used = 0;              /* code entries in table used */
        var huff = 0;              /* Huffman code */
        var incr;              /* for incrementing code, index */
        var fill;              /* index for replicating entries */
        var low;               /* low bits for current root entry */
        var mask;              /* mask for low root bits */
        var next;             /* next available space in table */
        var base = null;     /* base value table to use */
        var base_index = 0;
      //  var shoextra;    /* extra bits table to use */
        var end;                    /* use base and extra for symbol > end */
        var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
        var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
        var extra = null;
        var extra_index = 0;
      
        var here_bits, here_op, here_val;
      
        /*
         Process a set of code lengths to create a canonical Huffman code.  The
         code lengths are lens[0..codes-1].  Each length corresponds to the
         symbols 0..codes-1.  The Huffman code is generated by first sorting the
         symbols by length from short to long, and retaining the symbol order
         for codes with equal lengths.  Then the code starts with all zero bits
         for the first code of the shortest length, and the codes are integer
         increments for the same length, and zeros are appended as the length
         increases.  For the deflate format, these bits are stored backwards
         from their more natural integer increment ordering, and so when the
         decoding tables are built in the large loop below, the integer codes
         are incremented backwards.
      
         This routine assumes, but does not check, that all of the entries in
         lens[] are in the range 0..MAXBITS.  The caller must assure this.
         1..MAXBITS is interpreted as that code length.  zero means that that
         symbol does not occur in this code.
      
         The codes are sorted by computing a count of codes for each length,
         creating from that a table of starting indices for each length in the
         sorted table, and then entering the symbols in order in the sorted
         table.  The sorted table is work[], with that space being provided by
         the caller.
      
         The length counts are used for other purposes as well, i.e. finding
         the minimum and maximum length codes, determining if there are any
         codes at all, checking for a valid set of lengths, and looking ahead
         at length counts to determine sub-table sizes when building the
         decoding tables.
         */
      
        /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
        for (len = 0; len <= MAXBITS; len++) {
          count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
          count[lens[lens_index + sym]]++;
        }
      
        /* bound code lengths, force root to be within code lengths */
        root = bits;
        for (max = MAXBITS; max >= 1; max--) {
          if (count[max] !== 0) { break; }
        }
        if (root > max) {
          root = max;
        }
        if (max === 0) {                     /* no symbols to code at all */
          //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
          //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
          //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
          table[table_index++] = (1 << 24) | (64 << 16) | 0;
      
      
          //table.op[opts.table_index] = 64;
          //table.bits[opts.table_index] = 1;
          //table.val[opts.table_index++] = 0;
          table[table_index++] = (1 << 24) | (64 << 16) | 0;
      
          opts.bits = 1;
          return 0;     /* no symbols, but wait for decoding to report error */
        }
        for (min = 1; min < max; min++) {
          if (count[min] !== 0) { break; }
        }
        if (root < min) {
          root = min;
        }
      
        /* check for an over-subscribed or incomplete set of lengths */
        left = 1;
        for (len = 1; len <= MAXBITS; len++) {
          left <<= 1;
          left -= count[len];
          if (left < 0) {
            return -1;
          }        /* over-subscribed */
        }
        if (left > 0 && (type === CODES || max !== 1)) {
          return -1;                      /* incomplete set */
        }
      
        /* generate offsets into symbol table for each length for sorting */
        offs[1] = 0;
        for (len = 1; len < MAXBITS; len++) {
          offs[len + 1] = offs[len] + count[len];
        }
      
        /* sort symbols by length, by symbol order within each length */
        for (sym = 0; sym < codes; sym++) {
          if (lens[lens_index + sym] !== 0) {
            work[offs[lens[lens_index + sym]]++] = sym;
          }
        }
      
        /*
         Create and fill in decoding tables.  In this loop, the table being
         filled is at next and has curr index bits.  The code being used is huff
         with length len.  That code is converted to an index by dropping drop
         bits off of the bottom.  For codes where len is less than drop + curr,
         those top drop + curr - len bits are incremented through all values to
         fill the table with replicated entries.
      
         root is the number of index bits for the root table.  When len exceeds
         root, sub-tables are created pointed to by the root entry with an index
         of the low root bits of huff.  This is saved in low to check for when a
         new sub-table should be started.  drop is zero when the root table is
         being filled, and drop is root when sub-tables are being filled.
      
         When a new sub-table is needed, it is necessary to look ahead in the
         code lengths to determine what size sub-table is needed.  The length
         counts are used for this, and so count[] is decremented as codes are
         entered in the tables.
      
         used keeps track of how many table entries have been allocated from the
         provided *table space.  It is checked for LENS and DIST tables against
         the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
         the initial root table size constants.  See the comments in inftrees.h
         for more information.
      
         sym increments through all symbols, and the loop terminates when
         all codes of length max, i.e. all codes, have been processed.  This
         routine permits incomplete codes, so another loop after this one fills
         in the rest of the decoding tables with invalid code markers.
         */
      
        /* set up for code type */
        // poor man optimization - use if-else instead of switch,
        // to avoid deopts in old v8
        if (type === CODES) {
          base = extra = work;    /* dummy value--not used */
          end = 19;
      
        } else if (type === LENS) {
          base = lbase;
          base_index -= 257;
          extra = lext;
          extra_index -= 257;
          end = 256;
      
        } else {                    /* DISTS */
          base = dbase;
          extra = dext;
          end = -1;
        }
      
        /* initialize opts for loop */
        huff = 0;                   /* starting code */
        sym = 0;                    /* starting code symbol */
        len = min;                  /* starting code length */
        next = table_index;              /* current table to fill in */
        curr = root;                /* current table index bits */
        drop = 0;                   /* current bits to drop from code for index */
        low = -1;                   /* trigger new sub-table when len > root */
        used = 1 << root;          /* use root table entries */
        mask = used - 1;            /* mask for comparing low */
      
        /* check available table space */
        if ((type === LENS && used > ENOUGH_LENS) ||
          (type === DISTS && used > ENOUGH_DISTS)) {
          return 1;
        }
      
        /* process all codes and make table entries */
        for (;;) {
          /* create table entry */
          here_bits = len - drop;
          if (work[sym] < end) {
            here_op = 0;
            here_val = work[sym];
          }
          else if (work[sym] > end) {
            here_op = extra[extra_index + work[sym]];
            here_val = base[base_index + work[sym]];
          }
          else {
            here_op = 32 + 64;         /* end of block */
            here_val = 0;
          }
      
          /* replicate for those indices with low len bits equal to huff */
          incr = 1 << (len - drop);
          fill = 1 << curr;
          min = fill;                 /* save offset to next table */
          do {
            fill -= incr;
            table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
          } while (fill !== 0);
      
          /* backwards increment the len-bit code huff */
          incr = 1 << (len - 1);
          while (huff & incr) {
            incr >>= 1;
          }
          if (incr !== 0) {
            huff &= incr - 1;
            huff += incr;
          } else {
            huff = 0;
          }
      
          /* go to next symbol, update count, len */
          sym++;
          if (--count[len] === 0) {
            if (len === max) { break; }
            len = lens[lens_index + work[sym]];
          }
      
          /* create new sub-table if needed */
          if (len > root && (huff & mask) !== low) {
            /* if first time, transition to sub-tables */
            if (drop === 0) {
              drop = root;
            }
      
            /* increment past last table */
            next += min;            /* here min is 1 << curr */
      
            /* determine length of next table */
            curr = len - drop;
            left = 1 << curr;
            while (curr + drop < max) {
              left -= count[curr + drop];
              if (left <= 0) { break; }
              curr++;
              left <<= 1;
            }
      
            /* check for enough space */
            used += 1 << curr;
            if ((type === LENS && used > ENOUGH_LENS) ||
              (type === DISTS && used > ENOUGH_DISTS)) {
              return 1;
            }
      
            /* point entry in root table to sub-table */
            low = huff & mask;
            /*table.op[low] = curr;
            table.bits[low] = root;
            table.val[low] = next - opts.table_index;*/
            table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
          }
        }
      
        /* fill in remaining table entry if code is incomplete (guaranteed to have
         at most one remaining entry, since if the code is incomplete, the
         maximum code length that was allowed to get this far is one bit) */
        if (huff !== 0) {
          //table.op[next + huff] = 64;            /* invalid code marker */
          //table.bits[next + huff] = len - drop;
          //table.val[next + huff] = 0;
          table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
        }
      
        /* set return parameters */
        //opts.table_index += used;
        opts.bits = root;
        return 0;
      };
      
      },{"../utils/common":3}],13:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      module.exports = {
        2:      'need dictionary',     /* Z_NEED_DICT       2  */
        1:      'stream end',          /* Z_STREAM_END      1  */
        0:      '',                    /* Z_OK              0  */
        '-1':   'file error',          /* Z_ERRNO         (-1) */
        '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
        '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
        '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
        '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
        '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
      };
      
      },{}],14:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      /* eslint-disable space-unary-ops */
      
      var utils = require('../utils/common');
      
      /* Public constants ==========================================================*/
      /* ===========================================================================*/
      
      
      //var Z_FILTERED          = 1;
      //var Z_HUFFMAN_ONLY      = 2;
      //var Z_RLE               = 3;
      var Z_FIXED               = 4;
      //var Z_DEFAULT_STRATEGY  = 0;
      
      /* Possible values of the data_type field (though see inflate()) */
      var Z_BINARY              = 0;
      var Z_TEXT                = 1;
      //var Z_ASCII             = 1; // = Z_TEXT
      var Z_UNKNOWN             = 2;
      
      /*============================================================================*/
      
      
      function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }
      
      // From zutil.h
      
      var STORED_BLOCK = 0;
      var STATIC_TREES = 1;
      var DYN_TREES    = 2;
      /* The three kinds of block type */
      
      var MIN_MATCH    = 3;
      var MAX_MATCH    = 258;
      /* The minimum and maximum match lengths */
      
      // From deflate.h
      /* ===========================================================================
       * Internal compression state.
       */
      
      var LENGTH_CODES  = 29;
      /* number of length codes, not counting the special END_BLOCK code */
      
      var LITERALS      = 256;
      /* number of literal bytes 0..255 */
      
      var L_CODES       = LITERALS + 1 + LENGTH_CODES;
      /* number of Literal or Length codes, including the END_BLOCK code */
      
      var D_CODES       = 30;
      /* number of distance codes */
      
      var BL_CODES      = 19;
      /* number of codes used to transfer the bit lengths */
      
      var HEAP_SIZE     = 2 * L_CODES + 1;
      /* maximum heap size */
      
      var MAX_BITS      = 15;
      /* All codes must not exceed MAX_BITS bits */
      
      var Buf_size      = 16;
      /* size of bit buffer in bi_buf */
      
      
      /* ===========================================================================
       * Constants
       */
      
      var MAX_BL_BITS = 7;
      /* Bit length codes must not exceed MAX_BL_BITS bits */
      
      var END_BLOCK   = 256;
      /* end of block literal code */
      
      var REP_3_6     = 16;
      /* repeat previous bit length 3-6 times (2 bits of repeat count) */
      
      var REPZ_3_10   = 17;
      /* repeat a zero length 3-10 times  (3 bits of repeat count) */
      
      var REPZ_11_138 = 18;
      /* repeat a zero length 11-138 times  (7 bits of repeat count) */
      
      /* eslint-disable comma-spacing,array-bracket-spacing */
      var extra_lbits =   /* extra bits for each length code */
        [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];
      
      var extra_dbits =   /* extra bits for each distance code */
        [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
      
      var extra_blbits =  /* extra bits for each bit length code */
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];
      
      var bl_order =
        [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
      /* eslint-enable comma-spacing,array-bracket-spacing */
      
      /* The lengths of the bit length codes are sent in order of decreasing
       * probability, to avoid transmitting the lengths for unused bit length codes.
       */
      
      /* ===========================================================================
       * Local data. These are initialized only once.
       */
      
      // We pre-fill arrays with 0 to avoid uninitialized gaps
      
      var DIST_CODE_LEN = 512; /* see definition of array dist_code below */
      
      // !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
      var static_ltree  = new Array((L_CODES + 2) * 2);
      zero(static_ltree);
      /* The static literal tree. Since the bit lengths are imposed, there is no
       * need for the L_CODES extra codes used during heap construction. However
       * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
       * below).
       */
      
      var static_dtree  = new Array(D_CODES * 2);
      zero(static_dtree);
      /* The static distance tree. (Actually a trivial tree since all codes use
       * 5 bits.)
       */
      
      var _dist_code    = new Array(DIST_CODE_LEN);
      zero(_dist_code);
      /* Distance codes. The first 256 values correspond to the distances
       * 3 .. 258, the last 256 values correspond to the top 8 bits of
       * the 15 bit distances.
       */
      
      var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
      zero(_length_code);
      /* length code for each normalized match length (0 == MIN_MATCH) */
      
      var base_length   = new Array(LENGTH_CODES);
      zero(base_length);
      /* First normalized length for each code (0 = MIN_MATCH) */
      
      var base_dist     = new Array(D_CODES);
      zero(base_dist);
      /* First normalized distance for each code (0 = distance of 1) */
      
      
      function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
      
        this.static_tree  = static_tree;  /* static tree or NULL */
        this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
        this.extra_base   = extra_base;   /* base index for extra_bits */
        this.elems        = elems;        /* max number of elements in the tree */
        this.max_length   = max_length;   /* max bit length for the codes */
      
        // show if `static_tree` has data or dummy - needed for monomorphic objects
        this.has_stree    = static_tree && static_tree.length;
      }
      
      
      var static_l_desc;
      var static_d_desc;
      var static_bl_desc;
      
      
      function TreeDesc(dyn_tree, stat_desc) {
        this.dyn_tree = dyn_tree;     /* the dynamic tree */
        this.max_code = 0;            /* largest code with non zero frequency */
        this.stat_desc = stat_desc;   /* the corresponding static tree */
      }
      
      
      
      function d_code(dist) {
        return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
      }
      
      
      /* ===========================================================================
       * Output a short LSB first on the stream.
       * IN assertion: there is enough room in pendingBuf.
       */
      function put_short(s, w) {
      //    put_byte(s, (uch)((w) & 0xff));
      //    put_byte(s, (uch)((ush)(w) >> 8));
        s.pending_buf[s.pending++] = (w) & 0xff;
        s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
      }
      
      
      /* ===========================================================================
       * Send a value on a given number of bits.
       * IN assertion: length <= 16 and value fits in length bits.
       */
      function send_bits(s, value, length) {
        if (s.bi_valid > (Buf_size - length)) {
          s.bi_buf |= (value << s.bi_valid) & 0xffff;
          put_short(s, s.bi_buf);
          s.bi_buf = value >> (Buf_size - s.bi_valid);
          s.bi_valid += length - Buf_size;
        } else {
          s.bi_buf |= (value << s.bi_valid) & 0xffff;
          s.bi_valid += length;
        }
      }
      
      
      function send_code(s, c, tree) {
        send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
      }
      
      
      /* ===========================================================================
       * Reverse the first len bits of a code, using straightforward code (a faster
       * method would use a table)
       * IN assertion: 1 <= len <= 15
       */
      function bi_reverse(code, len) {
        var res = 0;
        do {
          res |= code & 1;
          code >>>= 1;
          res <<= 1;
        } while (--len > 0);
        return res >>> 1;
      }
      
      
      /* ===========================================================================
       * Flush the bit buffer, keeping at most 7 bits in it.
       */
      function bi_flush(s) {
        if (s.bi_valid === 16) {
          put_short(s, s.bi_buf);
          s.bi_buf = 0;
          s.bi_valid = 0;
      
        } else if (s.bi_valid >= 8) {
          s.pending_buf[s.pending++] = s.bi_buf & 0xff;
          s.bi_buf >>= 8;
          s.bi_valid -= 8;
        }
      }
      
      
      /* ===========================================================================
       * Compute the optimal bit lengths for a tree and update the total bit length
       * for the current block.
       * IN assertion: the fields freq and dad are set, heap[heap_max] and
       *    above are the tree nodes sorted by increasing frequency.
       * OUT assertions: the field len is set to the optimal bit length, the
       *     array bl_count contains the frequencies for each bit length.
       *     The length opt_len is updated; static_len is also updated if stree is
       *     not null.
       */
      function gen_bitlen(s, desc)
      //    deflate_state *s;
      //    tree_desc *desc;    /* the tree descriptor */
      {
        var tree            = desc.dyn_tree;
        var max_code        = desc.max_code;
        var stree           = desc.stat_desc.static_tree;
        var has_stree       = desc.stat_desc.has_stree;
        var extra           = desc.stat_desc.extra_bits;
        var base            = desc.stat_desc.extra_base;
        var max_length      = desc.stat_desc.max_length;
        var h;              /* heap index */
        var n, m;           /* iterate over the tree elements */
        var bits;           /* bit length */
        var xbits;          /* extra bits */
        var f;              /* frequency */
        var overflow = 0;   /* number of elements with bit length too large */
      
        for (bits = 0; bits <= MAX_BITS; bits++) {
          s.bl_count[bits] = 0;
        }
      
        /* In a first pass, compute the optimal bit lengths (which may
         * overflow in the case of the bit length tree).
         */
        tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */
      
        for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
          n = s.heap[h];
          bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }
          tree[n * 2 + 1]/*.Len*/ = bits;
          /* We overwrite tree[n].Dad which is no longer needed */
      
          if (n > max_code) { continue; } /* not a leaf node */
      
          s.bl_count[bits]++;
          xbits = 0;
          if (n >= base) {
            xbits = extra[n - base];
          }
          f = tree[n * 2]/*.Freq*/;
          s.opt_len += f * (bits + xbits);
          if (has_stree) {
            s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
          }
        }
        if (overflow === 0) { return; }
      
        // Trace((stderr,"\nbit length overflow\n"));
        /* This happens for example on obj2 and pic of the Calgary corpus */
      
        /* Find the first bit length which could increase: */
        do {
          bits = max_length - 1;
          while (s.bl_count[bits] === 0) { bits--; }
          s.bl_count[bits]--;      /* move one leaf down the tree */
          s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
          s.bl_count[max_length]--;
          /* The brother of the overflow item also moves one step up,
           * but this does not affect bl_count[max_length]
           */
          overflow -= 2;
        } while (overflow > 0);
      
        /* Now recompute all bit lengths, scanning in increasing frequency.
         * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
         * lengths instead of fixing only the wrong ones. This idea is taken
         * from 'ar' written by Haruhiko Okumura.)
         */
        for (bits = max_length; bits !== 0; bits--) {
          n = s.bl_count[bits];
          while (n !== 0) {
            m = s.heap[--h];
            if (m > max_code) { continue; }
            if (tree[m * 2 + 1]/*.Len*/ !== bits) {
              // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
              s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
              tree[m * 2 + 1]/*.Len*/ = bits;
            }
            n--;
          }
        }
      }
      
      
      /* ===========================================================================
       * Generate the codes for a given tree and bit counts (which need not be
       * optimal).
       * IN assertion: the array bl_count contains the bit length statistics for
       * the given tree and the field len is set for all tree elements.
       * OUT assertion: the field code is set for all tree elements of non
       *     zero code length.
       */
      function gen_codes(tree, max_code, bl_count)
      //    ct_data *tree;             /* the tree to decorate */
      //    int max_code;              /* largest code with non zero frequency */
      //    ushf *bl_count;            /* number of codes at each bit length */
      {
        var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
        var code = 0;              /* running code value */
        var bits;                  /* bit index */
        var n;                     /* code index */
      
        /* The distribution counts are first used to generate the code values
         * without bit reversal.
         */
        for (bits = 1; bits <= MAX_BITS; bits++) {
          next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
        }
        /* Check that the bit counts in bl_count are consistent. The last code
         * must be all ones.
         */
        //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
        //        "inconsistent bit counts");
        //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));
      
        for (n = 0;  n <= max_code; n++) {
          var len = tree[n * 2 + 1]/*.Len*/;
          if (len === 0) { continue; }
          /* Now reverse the bits */
          tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);
      
          //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
          //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
        }
      }
      
      
      /* ===========================================================================
       * Initialize the various 'constant' tables.
       */
      function tr_static_init() {
        var n;        /* iterates over tree elements */
        var bits;     /* bit counter */
        var length;   /* length value */
        var code;     /* code value */
        var dist;     /* distance index */
        var bl_count = new Array(MAX_BITS + 1);
        /* number of codes at each bit length for an optimal tree */
      
        // do check in _tr_init()
        //if (static_init_done) return;
      
        /* For some embedded targets, global variables are not initialized: */
      /*#ifdef NO_INIT_GLOBAL_POINTERS
        static_l_desc.static_tree = static_ltree;
        static_l_desc.extra_bits = extra_lbits;
        static_d_desc.static_tree = static_dtree;
        static_d_desc.extra_bits = extra_dbits;
        static_bl_desc.extra_bits = extra_blbits;
      #endif*/
      
        /* Initialize the mapping length (0..255) -> length code (0..28) */
        length = 0;
        for (code = 0; code < LENGTH_CODES - 1; code++) {
          base_length[code] = length;
          for (n = 0; n < (1 << extra_lbits[code]); n++) {
            _length_code[length++] = code;
          }
        }
        //Assert (length == 256, "tr_static_init: length != 256");
        /* Note that the length 255 (match length 258) can be represented
         * in two different ways: code 284 + 5 bits or code 285, so we
         * overwrite length_code[255] to use the best encoding:
         */
        _length_code[length - 1] = code;
      
        /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
        dist = 0;
        for (code = 0; code < 16; code++) {
          base_dist[code] = dist;
          for (n = 0; n < (1 << extra_dbits[code]); n++) {
            _dist_code[dist++] = code;
          }
        }
        //Assert (dist == 256, "tr_static_init: dist != 256");
        dist >>= 7; /* from now on, all distances are divided by 128 */
        for (; code < D_CODES; code++) {
          base_dist[code] = dist << 7;
          for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
            _dist_code[256 + dist++] = code;
          }
        }
        //Assert (dist == 256, "tr_static_init: 256+dist != 512");
      
        /* Construct the codes of the static literal tree */
        for (bits = 0; bits <= MAX_BITS; bits++) {
          bl_count[bits] = 0;
        }
      
        n = 0;
        while (n <= 143) {
          static_ltree[n * 2 + 1]/*.Len*/ = 8;
          n++;
          bl_count[8]++;
        }
        while (n <= 255) {
          static_ltree[n * 2 + 1]/*.Len*/ = 9;
          n++;
          bl_count[9]++;
        }
        while (n <= 279) {
          static_ltree[n * 2 + 1]/*.Len*/ = 7;
          n++;
          bl_count[7]++;
        }
        while (n <= 287) {
          static_ltree[n * 2 + 1]/*.Len*/ = 8;
          n++;
          bl_count[8]++;
        }
        /* Codes 286 and 287 do not exist, but we must include them in the
         * tree construction to get a canonical Huffman tree (longest code
         * all ones)
         */
        gen_codes(static_ltree, L_CODES + 1, bl_count);
      
        /* The static distance tree is trivial: */
        for (n = 0; n < D_CODES; n++) {
          static_dtree[n * 2 + 1]/*.Len*/ = 5;
          static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
        }
      
        // Now data ready and we can init static trees
        static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
        static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
        static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);
      
        //static_init_done = true;
      }
      
      
      /* ===========================================================================
       * Initialize a new block.
       */
      function init_block(s) {
        var n; /* iterates over tree elements */
      
        /* Initialize the trees. */
        for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
        for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
        for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }
      
        s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
        s.opt_len = s.static_len = 0;
        s.last_lit = s.matches = 0;
      }
      
      
      /* ===========================================================================
       * Flush the bit buffer and align the output on a byte boundary
       */
      function bi_windup(s)
      {
        if (s.bi_valid > 8) {
          put_short(s, s.bi_buf);
        } else if (s.bi_valid > 0) {
          //put_byte(s, (Byte)s->bi_buf);
          s.pending_buf[s.pending++] = s.bi_buf;
        }
        s.bi_buf = 0;
        s.bi_valid = 0;
      }
      
      /* ===========================================================================
       * Copy a stored block, storing first the length and its
       * one's complement if requested.
       */
      function copy_block(s, buf, len, header)
      //DeflateState *s;
      //charf    *buf;    /* the input data */
      //unsigned len;     /* its length */
      //int      header;  /* true if block header must be written */
      {
        bi_windup(s);        /* align on byte boundary */
      
        if (header) {
          put_short(s, len);
          put_short(s, ~len);
        }
      //  while (len--) {
      //    put_byte(s, *buf++);
      //  }
        utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
        s.pending += len;
      }
      
      /* ===========================================================================
       * Compares to subtrees, using the tree depth as tie breaker when
       * the subtrees have equal frequency. This minimizes the worst case length.
       */
      function smaller(tree, n, m, depth) {
        var _n2 = n * 2;
        var _m2 = m * 2;
        return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
               (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
      }
      
      /* ===========================================================================
       * Restore the heap property by moving down the tree starting at node k,
       * exchanging a node with the smallest of its two sons if necessary, stopping
       * when the heap property is re-established (each father smaller than its
       * two sons).
       */
      function pqdownheap(s, tree, k)
      //    deflate_state *s;
      //    ct_data *tree;  /* the tree to restore */
      //    int k;               /* node to move down */
      {
        var v = s.heap[k];
        var j = k << 1;  /* left son of k */
        while (j <= s.heap_len) {
          /* Set j to the smallest of the two sons: */
          if (j < s.heap_len &&
            smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
            j++;
          }
          /* Exit if v is smaller than both sons */
          if (smaller(tree, v, s.heap[j], s.depth)) { break; }
      
          /* Exchange v with the smallest son */
          s.heap[k] = s.heap[j];
          k = j;
      
          /* And continue down the tree, setting j to the left son of k */
          j <<= 1;
        }
        s.heap[k] = v;
      }
      
      
      // inlined manually
      // var SMALLEST = 1;
      
      /* ===========================================================================
       * Send the block data compressed using the given Huffman trees
       */
      function compress_block(s, ltree, dtree)
      //    deflate_state *s;
      //    const ct_data *ltree; /* literal tree */
      //    const ct_data *dtree; /* distance tree */
      {
        var dist;           /* distance of matched string */
        var lc;             /* match length or unmatched char (if dist == 0) */
        var lx = 0;         /* running index in l_buf */
        var code;           /* the code to send */
        var extra;          /* number of extra bits to send */
      
        if (s.last_lit !== 0) {
          do {
            dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
            lc = s.pending_buf[s.l_buf + lx];
            lx++;
      
            if (dist === 0) {
              send_code(s, lc, ltree); /* send a literal byte */
              //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
            } else {
              /* Here, lc is the match length - MIN_MATCH */
              code = _length_code[lc];
              send_code(s, code + LITERALS + 1, ltree); /* send the length code */
              extra = extra_lbits[code];
              if (extra !== 0) {
                lc -= base_length[code];
                send_bits(s, lc, extra);       /* send the extra length bits */
              }
              dist--; /* dist is now the match distance - 1 */
              code = d_code(dist);
              //Assert (code < D_CODES, "bad d_code");
      
              send_code(s, code, dtree);       /* send the distance code */
              extra = extra_dbits[code];
              if (extra !== 0) {
                dist -= base_dist[code];
                send_bits(s, dist, extra);   /* send the extra distance bits */
              }
            } /* literal or match pair ? */
      
            /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
            //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
            //       "pendingBuf overflow");
      
          } while (lx < s.last_lit);
        }
      
        send_code(s, END_BLOCK, ltree);
      }
      
      
      /* ===========================================================================
       * Construct one Huffman tree and assigns the code bit strings and lengths.
       * Update the total bit length for the current block.
       * IN assertion: the field freq is set for all tree elements.
       * OUT assertions: the fields len and code are set to the optimal bit length
       *     and corresponding code. The length opt_len is updated; static_len is
       *     also updated if stree is not null. The field max_code is set.
       */
      function build_tree(s, desc)
      //    deflate_state *s;
      //    tree_desc *desc; /* the tree descriptor */
      {
        var tree     = desc.dyn_tree;
        var stree    = desc.stat_desc.static_tree;
        var has_stree = desc.stat_desc.has_stree;
        var elems    = desc.stat_desc.elems;
        var n, m;          /* iterate over heap elements */
        var max_code = -1; /* largest code with non zero frequency */
        var node;          /* new node being created */
      
        /* Construct the initial heap, with least frequent element in
         * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
         * heap[0] is not used.
         */
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE;
      
        for (n = 0; n < elems; n++) {
          if (tree[n * 2]/*.Freq*/ !== 0) {
            s.heap[++s.heap_len] = max_code = n;
            s.depth[n] = 0;
      
          } else {
            tree[n * 2 + 1]/*.Len*/ = 0;
          }
        }
      
        /* The pkzip format requires that at least one distance code exists,
         * and that at least one bit should be sent even if there is only one
         * possible code. So to avoid special checks later on we force at least
         * two codes of non zero frequency.
         */
        while (s.heap_len < 2) {
          node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
          tree[node * 2]/*.Freq*/ = 1;
          s.depth[node] = 0;
          s.opt_len--;
      
          if (has_stree) {
            s.static_len -= stree[node * 2 + 1]/*.Len*/;
          }
          /* node is 0 or 1 so it does not have extra bits */
        }
        desc.max_code = max_code;
      
        /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
         * establish sub-heaps of increasing lengths:
         */
        for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }
      
        /* Construct the Huffman tree by repeatedly combining the least two
         * frequent nodes.
         */
        node = elems;              /* next internal node of the tree */
        do {
          //pqremove(s, tree, n);  /* n = node of least frequency */
          /*** pqremove ***/
          n = s.heap[1/*SMALLEST*/];
          s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
          pqdownheap(s, tree, 1/*SMALLEST*/);
          /***/
      
          m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */
      
          s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
          s.heap[--s.heap_max] = m;
      
          /* Create a new node father of n and m */
          tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
          s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
          tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;
      
          /* and insert the new node in the heap */
          s.heap[1/*SMALLEST*/] = node++;
          pqdownheap(s, tree, 1/*SMALLEST*/);
      
        } while (s.heap_len >= 2);
      
        s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];
      
        /* At this point, the fields freq and dad are set. We can now
         * generate the bit lengths.
         */
        gen_bitlen(s, desc);
      
        /* The field len is now set, we can generate the bit codes */
        gen_codes(tree, max_code, s.bl_count);
      }
      
      
      /* ===========================================================================
       * Scan a literal or distance tree to determine the frequencies of the codes
       * in the bit length tree.
       */
      function scan_tree(s, tree, max_code)
      //    deflate_state *s;
      //    ct_data *tree;   /* the tree to be scanned */
      //    int max_code;    /* and its largest code of non zero frequency */
      {
        var n;                     /* iterates over all tree elements */
        var prevlen = -1;          /* last emitted length */
        var curlen;                /* length of current code */
      
        var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */
      
        var count = 0;             /* repeat count of the current code */
        var max_count = 7;         /* max repeat count */
        var min_count = 4;         /* min repeat count */
      
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */
      
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;
      
          if (++count < max_count && curlen === nextlen) {
            continue;
      
          } else if (count < min_count) {
            s.bl_tree[curlen * 2]/*.Freq*/ += count;
      
          } else if (curlen !== 0) {
      
            if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
            s.bl_tree[REP_3_6 * 2]/*.Freq*/++;
      
          } else if (count <= 10) {
            s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;
      
          } else {
            s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
          }
      
          count = 0;
          prevlen = curlen;
      
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
      
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
      
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      
      
      /* ===========================================================================
       * Send a literal or distance tree in compressed form, using the codes in
       * bl_tree.
       */
      function send_tree(s, tree, max_code)
      //    deflate_state *s;
      //    ct_data *tree; /* the tree to be scanned */
      //    int max_code;       /* and its largest code of non zero frequency */
      {
        var n;                     /* iterates over all tree elements */
        var prevlen = -1;          /* last emitted length */
        var curlen;                /* length of current code */
      
        var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */
      
        var count = 0;             /* repeat count of the current code */
        var max_count = 7;         /* max repeat count */
        var min_count = 4;         /* min repeat count */
      
        /* tree[max_code+1].Len = -1; */  /* guard already set */
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
      
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;
      
          if (++count < max_count && curlen === nextlen) {
            continue;
      
          } else if (count < min_count) {
            do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);
      
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              send_code(s, curlen, s.bl_tree);
              count--;
            }
            //Assert(count >= 3 && count <= 6, " 3_6?");
            send_code(s, REP_3_6, s.bl_tree);
            send_bits(s, count - 3, 2);
      
          } else if (count <= 10) {
            send_code(s, REPZ_3_10, s.bl_tree);
            send_bits(s, count - 3, 3);
      
          } else {
            send_code(s, REPZ_11_138, s.bl_tree);
            send_bits(s, count - 11, 7);
          }
      
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
      
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
      
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      
      
      /* ===========================================================================
       * Construct the Huffman tree for the bit lengths and return the index in
       * bl_order of the last bit length code to send.
       */
      function build_bl_tree(s) {
        var max_blindex;  /* index of last bit length code of non zero freq */
      
        /* Determine the bit length frequencies for literal and distance trees */
        scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
        scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
      
        /* Build the bit length tree: */
        build_tree(s, s.bl_desc);
        /* opt_len now includes the length of the tree representations, except
         * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
         */
      
        /* Determine the number of bit length codes to send. The pkzip format
         * requires that at least 4 bit length codes be sent. (appnote.txt says
         * 3 but the actual value used is 4.)
         */
        for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
          if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
            break;
          }
        }
        /* Update opt_len to include the bit length tree and counts */
        s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
        //        s->opt_len, s->static_len));
      
        return max_blindex;
      }
      
      
      /* ===========================================================================
       * Send the header for a block using dynamic Huffman trees: the counts, the
       * lengths of the bit length codes, the literal tree and the distance tree.
       * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
       */
      function send_all_trees(s, lcodes, dcodes, blcodes)
      //    deflate_state *s;
      //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
      {
        var rank;                    /* index in bl_order */
      
        //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
        //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
        //        "too many codes");
        //Tracev((stderr, "\nbl counts: "));
        send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
        send_bits(s, dcodes - 1,   5);
        send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
        for (rank = 0; rank < blcodes; rank++) {
          //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
          send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
        }
        //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));
      
        send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
        //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));
      
        send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
        //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
      }
      
      
      /* ===========================================================================
       * Check if the data type is TEXT or BINARY, using the following algorithm:
       * - TEXT if the two conditions below are satisfied:
       *    a) There are no non-portable control characters belonging to the
       *       "black list" (0..6, 14..25, 28..31).
       *    b) There is at least one printable character belonging to the
       *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
       * - BINARY otherwise.
       * - The following partially-portable control characters form a
       *   "gray list" that is ignored in this detection algorithm:
       *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
       * IN assertion: the fields Freq of dyn_ltree are set.
       */
      function detect_data_type(s) {
        /* black_mask is the bit mask of black-listed bytes
         * set bits 0..6, 14..25, and 28..31
         * 0xf3ffc07f = binary 11110011111111111100000001111111
         */
        var black_mask = 0xf3ffc07f;
        var n;
      
        /* Check for non-textual ("black-listed") bytes. */
        for (n = 0; n <= 31; n++, black_mask >>>= 1) {
          if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
            return Z_BINARY;
          }
        }
      
        /* Check for textual ("white-listed") bytes. */
        if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
            s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
          return Z_TEXT;
        }
        for (n = 32; n < LITERALS; n++) {
          if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
            return Z_TEXT;
          }
        }
      
        /* There are no "black-listed" or "white-listed" bytes:
         * this stream either is empty or has tolerated ("gray-listed") bytes only.
         */
        return Z_BINARY;
      }
      
      
      var static_init_done = false;
      
      /* ===========================================================================
       * Initialize the tree data structures for a new zlib stream.
       */
      function _tr_init(s)
      {
      
        if (!static_init_done) {
          tr_static_init();
          static_init_done = true;
        }
      
        s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
        s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
        s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
      
        s.bi_buf = 0;
        s.bi_valid = 0;
      
        /* Initialize the first block of the first file: */
        init_block(s);
      }
      
      
      /* ===========================================================================
       * Send a stored block
       */
      function _tr_stored_block(s, buf, stored_len, last)
      //DeflateState *s;
      //charf *buf;       /* input block */
      //ulg stored_len;   /* length of input block */
      //int last;         /* one if this is the last block for a file */
      {
        send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
        copy_block(s, buf, stored_len, true); /* with header */
      }
      
      
      /* ===========================================================================
       * Send one empty static block to give enough lookahead for inflate.
       * This takes 10 bits, of which 7 may remain in the bit buffer.
       */
      function _tr_align(s) {
        send_bits(s, STATIC_TREES << 1, 3);
        send_code(s, END_BLOCK, static_ltree);
        bi_flush(s);
      }
      
      
      /* ===========================================================================
       * Determine the best encoding for the current block: dynamic trees, static
       * trees or store, and output the encoded block to the zip file.
       */
      function _tr_flush_block(s, buf, stored_len, last)
      //DeflateState *s;
      //charf *buf;       /* input block, or NULL if too old */
      //ulg stored_len;   /* length of input block */
      //int last;         /* one if this is the last block for a file */
      {
        var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
        var max_blindex = 0;        /* index of last bit length code of non zero freq */
      
        /* Build the Huffman trees unless a stored block is forced */
        if (s.level > 0) {
      
          /* Check if the file is binary or text */
          if (s.strm.data_type === Z_UNKNOWN) {
            s.strm.data_type = detect_data_type(s);
          }
      
          /* Construct the literal and distance trees */
          build_tree(s, s.l_desc);
          // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
          //        s->static_len));
      
          build_tree(s, s.d_desc);
          // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
          //        s->static_len));
          /* At this point, opt_len and static_len are the total bit lengths of
           * the compressed block data, excluding the tree representations.
           */
      
          /* Build the bit length tree for the above two trees, and get the index
           * in bl_order of the last bit length code to send.
           */
          max_blindex = build_bl_tree(s);
      
          /* Determine the best encoding. Compute the block lengths in bytes. */
          opt_lenb = (s.opt_len + 3 + 7) >>> 3;
          static_lenb = (s.static_len + 3 + 7) >>> 3;
      
          // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
          //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
          //        s->last_lit));
      
          if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }
      
        } else {
          // Assert(buf != (char*)0, "lost buf");
          opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
        }
      
        if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
          /* 4: two words for the lengths */
      
          /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
           * Otherwise we can't have processed more than WSIZE input bytes since
           * the last block flush, because compression would have been
           * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
           * transform a block into a stored block.
           */
          _tr_stored_block(s, buf, stored_len, last);
      
        } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
      
          send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
          compress_block(s, static_ltree, static_dtree);
      
        } else {
          send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
          send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
          compress_block(s, s.dyn_ltree, s.dyn_dtree);
        }
        // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
        /* The above check is made mod 2^32, for files larger than 512 MB
         * and uLong implemented on 32 bits.
         */
        init_block(s);
      
        if (last) {
          bi_windup(s);
        }
        // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
        //       s->compressed_len-7*last));
      }
      
      /* ===========================================================================
       * Save the match info and tally the frequency counts. Return true if
       * the current block must be flushed.
       */
      function _tr_tally(s, dist, lc)
      //    deflate_state *s;
      //    unsigned dist;  /* distance of matched string */
      //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
      {
        //var out_length, in_length, dcode;
      
        s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
        s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;
      
        s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
        s.last_lit++;
      
        if (dist === 0) {
          /* lc is the unmatched char */
          s.dyn_ltree[lc * 2]/*.Freq*/++;
        } else {
          s.matches++;
          /* Here, lc is the match length - MIN_MATCH */
          dist--;             /* dist = match distance - 1 */
          //Assert((ush)dist < (ush)MAX_DIST(s) &&
          //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
          //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");
      
          s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
          s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
        }
      
      // (!) This block is disabled in zlib defaults,
      // don't enable it for binary compatibility
      
      //#ifdef TRUNCATE_BLOCK
      //  /* Try to guess if it is profitable to stop the current block here */
      //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
      //    /* Compute an upper bound for the compressed length */
      //    out_length = s.last_lit*8;
      //    in_length = s.strstart - s.block_start;
      //
      //    for (dcode = 0; dcode < D_CODES; dcode++) {
      //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
      //    }
      //    out_length >>>= 3;
      //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
      //    //       s->last_lit, in_length, out_length,
      //    //       100L - out_length*100L/in_length));
      //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
      //      return true;
      //    }
      //  }
      //#endif
      
        return (s.last_lit === s.lit_bufsize - 1);
        /* We avoid equality with lit_bufsize because of wraparound at 64K
         * on 16 bit machines and because stored blocks are restricted to
         * 64K-1 bytes.
         */
      }
      
      exports._tr_init  = _tr_init;
      exports._tr_stored_block = _tr_stored_block;
      exports._tr_flush_block  = _tr_flush_block;
      exports._tr_tally = _tr_tally;
      exports._tr_align = _tr_align;
      
      },{"../utils/common":3}],15:[function(require,module,exports){
      
      // (C) 1995-2013 Jean-loup Gailly and Mark Adler
      // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
      //
      // This software is provided 'as-is', without any express or implied
      // warranty. In no event will the authors be held liable for any damages
      // arising from the use of this software.
      //
      // Permission is granted to anyone to use this software for any purpose,
      // including commercial applications, and to alter it and redistribute it
      // freely, subject to the following restrictions:
      //
      // 1. The origin of this software must not be misrepresented; you must not
      //   claim that you wrote the original software. If you use this software
      //   in a product, an acknowledgment in the product documentation would be
      //   appreciated but is not required.
      // 2. Altered source versions must be plainly marked as such, and must not be
      //   misrepresented as being the original software.
      // 3. This notice may not be removed or altered from any source distribution.
      
      function ZStream() {
        /* next input byte */
        this.input = null; // JS specific, because we have no pointers
        this.next_in = 0;
        /* number of bytes available at input */
        this.avail_in = 0;
        /* total number of input bytes read so far */
        this.total_in = 0;
        /* next output byte should be put there */
        this.output = null; // JS specific, because we have no pointers
        this.next_out = 0;
        /* remaining free space at output */
        this.avail_out = 0;
        /* total number of bytes output so far */
        this.total_out = 0;
        /* last error message, NULL if no error */
        this.msg = ''/*Z_NULL*/;
        /* not visible by applications */
        this.state = null;
        /* best guess about the data type: binary or text */
        this.data_type = 2/*Z_UNKNOWN*/;
        /* adler32 value of the uncompressed data */
        this.adler = 0;
      }
      
      module.exports = ZStream;
      
      },{}],"/":[function(require,module,exports){
      
      var assign    = require('./lib/utils/common').assign;
      
      var deflate   = require('./lib/deflate');
      var inflate   = require('./lib/inflate');
      var constants = require('./lib/zlib/constants');
      
      var pako = {};
      
      assign(pako, deflate, inflate, constants);
      
      module.exports = pako;
      
      },{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")
      });

  /**
   * @author bimU.io
   */

  var modelShader = {

  	uniforms: THREE.UniformsUtils.merge( [

  		THREE.UniformsLib[ "common" ],
  		THREE.UniformsLib[ "aomap" ],
  		THREE.UniformsLib[ "lightmap" ],
  		THREE.UniformsLib[ "emissivemap" ],
  		THREE.UniformsLib[ "bumpmap" ],
  		THREE.UniformsLib[ "normalmap" ],
  		THREE.UniformsLib[ "displacementmap" ],
  		THREE.UniformsLib[ "fog" ],
  		THREE.UniformsLib[ "lights" ],

  		{
  			"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
  			"specular" : { type: "c", value: new THREE.Color( 0x111111 ) },
  			"shininess": { type: "f", value: 30 }
  		}

  	] ),
  	
  	vertexShader: [

  		`
#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif`,

  		THREE.ShaderChunk[ "common" ],
  		THREE.ShaderChunk[ "uv_pars_vertex" ],
  		THREE.ShaderChunk[ "uv2_pars_vertex" ],
  		THREE.ShaderChunk[ "displacementmap_pars_vertex" ],
  		THREE.ShaderChunk[ "envmap_pars_vertex" ],
  		THREE.ShaderChunk[ "color_pars_vertex" ],
  		THREE.ShaderChunk[ "fog_pars_vertex" ],
  		THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
  		THREE.ShaderChunk[ "skinning_pars_vertex" ],
  		THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
  		THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],
  		THREE.ShaderChunk[ "clipping_planes_pars_vertex" ],

  		`
varying vec4 worldPosition;

attribute vec4 color;
varying vec4 vColor;

attribute float visible; // 'attribute' : cannot be bool or int
// attribute float selected;
attribute float colorOverriden;
varying float vVisible;
varying float vSelected;
varying float vColorOverriden;
		
void main() {
	worldPosition = modelMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	// if( bool(selected) ) { vColor = vec4( 0.5, 0.62, 0.87, 0.55 ); }
	/*else*/ if( bool(colorOverriden) )  { vColor = color; }

	vVisible = visible;
	// vSelected = selected;
	vColorOverriden = colorOverriden;`,

  		THREE.ShaderChunk[ "uv_vertex" ],
  		THREE.ShaderChunk[ "uv2_vertex" ],
  		THREE.ShaderChunk[ "color_vertex" ],

  		THREE.ShaderChunk[ "beginnormal_vertex" ],
  		THREE.ShaderChunk[ "morphnormal_vertex" ],
  		THREE.ShaderChunk[ "skinbase_vertex" ],
  		THREE.ShaderChunk[ "skinnormal_vertex" ],
  		THREE.ShaderChunk[ "defaultnormal_vertex" ],

  		`
	#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif`,

  		THREE.ShaderChunk[ "begin_vertex" ],
  		THREE.ShaderChunk[ "displacementmap_vertex" ],
  		THREE.ShaderChunk[ "morphtarget_vertex" ],
  		THREE.ShaderChunk[ "skinning_vertex" ],
  		THREE.ShaderChunk[ "project_vertex" ],
  		THREE.ShaderChunk[ "logdepthbuf_vertex" ],
  		THREE.ShaderChunk[ "clipping_planes_vertex" ],

  		`
	vViewPosition = - mvPosition.xyz;`,

  		THREE.ShaderChunk[ "worldpos_vertex" ],
  		THREE.ShaderChunk[ "envmap_vertex" ],
  		// THREE.ShaderChunk[ "lights_phong_vertex" ],
  		THREE.ShaderChunk[ "shadowmap_vertex" ],
  		THREE.ShaderChunk[ "fog_vertex" ],

  		`
}`

  	].join( "\n" ),

  	fragmentShader: [

  		`
#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

varying vec4 worldPosition;
varying vec4 vColor;
varying float vVisible;
// varying float vSelected;
varying float vColorOverriden;`,

  		THREE.ShaderChunk[ "common" ],
  		THREE.ShaderChunk[ "packing" ],
  		THREE.ShaderChunk[ "color_pars_fragment" ],
  		THREE.ShaderChunk[ "uv_pars_fragment" ],
  		THREE.ShaderChunk[ "uv2_pars_fragment" ],
  		THREE.ShaderChunk[ "map_pars_fragment" ],
  		THREE.ShaderChunk[ "alphamap_pars_fragment" ],
  		THREE.ShaderChunk[ "aomap_pars_fragment" ],
  		THREE.ShaderChunk[ "lightmap_pars_fragment" ],
  		THREE.ShaderChunk[ "emissivemap_pars_fragment" ],
  		THREE.ShaderChunk[ "envmap_pars_fragment" ],
  		THREE.ShaderChunk[ "gradientmap_pars_fragment" ],
  		THREE.ShaderChunk[ "fog_pars_fragment" ],
  		THREE.ShaderChunk[ "bsdfs" ],
  		THREE.ShaderChunk[ "lights_pars_begin" ],
  		THREE.ShaderChunk[ "envmap_physical_pars_fragment" ],
  		THREE.ShaderChunk[ "lights_phong_pars_fragment" ],
  		THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
  		THREE.ShaderChunk[ "bumpmap_pars_fragment" ],
  		THREE.ShaderChunk[ "normalmap_pars_fragment" ],
  		THREE.ShaderChunk[ "specularmap_pars_fragment" ],
  		THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],
  		THREE.ShaderChunk[ "clipping_planes_pars_fragment" ],

  		`
void main() {`,

  		THREE.ShaderChunk[ "clipping_planes_fragment" ],

  		`
	vec4 diffuseColor;
	if( bool(vVisible) ) {
		if ( bool(vColorOverriden) /*|| bool(vSelected)*/ ) { diffuseColor = vColor; }
		else { diffuseColor = vec4( diffuse, opacity ); }
	} else { discard; }
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
 	vec3 totalEmissiveRadiance = emissive;`,

  		THREE.ShaderChunk[ "logdepthbuf_fragment" ],
  		THREE.ShaderChunk[ "map_fragment" ],
  		THREE.ShaderChunk[ "color_fragment" ],
  		THREE.ShaderChunk[ "alphamap_fragment" ],
  		THREE.ShaderChunk[ "alphatest_fragment" ],
  		THREE.ShaderChunk[ "specularmap_fragment" ],
  		THREE.ShaderChunk[ "normal_flip" ],
  		THREE.ShaderChunk[ "normal_fragment_begin" ],	
  		THREE.ShaderChunk[ "normal_fragment_maps" ],	
  		THREE.ShaderChunk[ "emissivemap_fragment" ],

  		THREE.ShaderChunk[ "lights_phong_fragment" ],
  		THREE.ShaderChunk[ "lights_fragment_begin" ],
  		THREE.ShaderChunk[ "lights_fragment_maps" ],
  		THREE.ShaderChunk[ "lights_fragment_end" ],

  		THREE.ShaderChunk[ "aomap_fragment" ],

  		`
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;`,

  		THREE.ShaderChunk[ "envmap_fragment" ],

  	`
	if ( gl_FrontFacing ) {
		gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	} else {
		gl_FragColor = diffuseColor;
	}
	`,

  		THREE.ShaderChunk[ "premultiplied_alpha_fragment" ],
  		THREE.ShaderChunk[ "tonemapping_fragment" ],
  		THREE.ShaderChunk[ "encodings_fragment" ],
  		THREE.ShaderChunk[ "fog_fragment" ],

  		`
}`

  	].join( "\n" )

  };

  var CustomShaderMaterial = function( params ) {

  	THREE.ShaderMaterial.call(this);

  	this.maxPt = new THREE.Vector3(100000, 10000, 10000);
    	this.minPt = new THREE.Vector3(-100000, -10000, -10000);

  	// Material
  	this.lights = true;
  	this.fog = true;
  	this.clipping = true;
  	this.clipShadows = true;
  	// this.clipIntersection = true; 
  	this.side = THREE.FrontSide;
  	// this.shading = THREE.FlatShading // default: THREE.SmoothShading	
  	this.params = params;

  	var shader = modelShader;
  	this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);
  	// if(params) {
  	this.uniforms.diffuse.value = params[ 'color' ];
  	if(typeof params['transparent'] != 'undefined') {
  		this.transparent = true;
  		this.uniforms.opacity.value = params['opacity'] ? params['opacity'] : 1;
  	}
  	// }
  	// else { this.transparent = true; }

  	this.vertexShader = shader.vertexShader;
  	this.fragmentShader = shader.fragmentShader;
  };

  CustomShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype); // required
  CustomShaderMaterial.prototype.constructor = CustomShaderMaterial;

  /**
   * Loads a Wavefront .mtl file specifying materials
   *
   * @author angelxuanchang
   */
  /**
   * Modified for bimU.io
   */

  var MaterialLoader = function( manager ) {

  	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

  };

  MaterialLoader.prototype = {

  	constructor: MaterialLoader,

  	load: function ( mtlData, onLoad, onProgress, onError ) {
  		var scope = this;
  		onLoad( scope.parse( mtlData ) );
  	},

  	setPath: function ( value ) {

  		this.path = value;

  	},

  	setBaseUrl: function( value ) {

  		// TODO: Merge with setPath()? Or rename to setTexturePath?

  		this.baseUrl = value;

  	},

  	setCrossOrigin: function ( value ) {

  		this.crossOrigin = value;

  	},

  	setMaterialOptions: function ( value ) {

  		this.materialOptions = value;

  	},

  	/**
  	 * Parses loaded MTL file
  	 * @param text - Content of MTL file
  	 * @return {MaterialLoader.MaterialCreator}
  	 */
  	parse: function ( text ) {

  		var lines = text.split( "\n" );
  		var info = {};
  		var delimiter_pattern = /\s+/;
  		var materialsInfo = {};

  		for ( var i = 0; i < lines.length; i ++ ) {

  			var line = lines[ i ];
  			line = line.trim();

  			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

  				// Blank line or comment ignore
  				continue;

  			}

  			var pos = line.indexOf( ' ' );

  			var key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
  			key = key.toLowerCase();

  			var value = ( pos >= 0 ) ? line.substring( pos + 1 ) : "";
  			value = value.trim();

  			if ( key === "newmtl" ) {

  				// New material

  				info = { name: value };
  				materialsInfo[ value ] = info;

  			} else if ( info ) {

  				if ( key === "ka" || key === "kd" || key === "ks" ) {

  					var ss = value.split( delimiter_pattern, 3 );
  					info[ key ] = [ parseFloat( ss[ 0 ] ), parseFloat( ss[ 1 ] ), parseFloat( ss[ 2 ] ) ];

  				} else {

  					info[ key ] = value;

  				}

  			}

  		}

  		var materialCreator = new MaterialLoader.MaterialCreator( this.baseUrl, this.materialOptions );
  		materialCreator.setCrossOrigin( this.crossOrigin );
  		materialCreator.setManager( this.manager );
  		materialCreator.setMaterials( materialsInfo );
  		return materialCreator;

  	}

  };

  /**
   * Create a new THREE-MTLLoader.MaterialCreator
   * @param baseUrl - Url relative to which textures are loaded
   * @param options - Set of options on how to construct the materials
   *                  side: Which side to apply the material
   *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
   *                  wrap: What type of wrapping to apply for textures
   *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
   *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
   *                                Default: false, assumed to be already normalized
   *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
   *                                  Default: false
   * @constructor
   */

  MaterialLoader.MaterialCreator = function( baseUrl, options ) {

  	this.baseUrl = baseUrl;
  	this.options = options;
  	this.materialsInfo = {};
  	this.materials = {};
  	this.materialsArray = [];
  	this.nameLookup = {};

  	this.side = ( this.options && this.options.side ) ? this.options.side : THREE.FrontSide;
  	this.wrap = ( this.options && this.options.wrap ) ? this.options.wrap : THREE.RepeatWrapping;

  };

  MaterialLoader.MaterialCreator.prototype = {

  	constructor: MaterialLoader.MaterialCreator,

  	setCrossOrigin: function ( value ) {

  		this.crossOrigin = value;

  	},

  	setManager: function ( value ) {

  		this.manager = value;

  	},

  	setMaterials: function( materialsInfo ) {

  		this.materialsInfo = this.convert( materialsInfo );
  		this.materials = {};
  		this.materialsArray = [];
  		this.nameLookup = {};

  	},

  	convert: function( materialsInfo ) {

  		if ( ! this.options ) return materialsInfo;

  		var converted = {};

  		for ( var mn in materialsInfo ) {

  			// Convert materials info into normalized form based on options

  			var mat = materialsInfo[ mn ];

  			var covmat = {};

  			converted[ mn ] = covmat;

  			for ( var prop in mat ) {

  				var save = true;
  				var value = mat[ prop ];
  				var lprop = prop.toLowerCase();

  				switch ( lprop ) {

  					case 'kd':
  					case 'ka':
  					case 'ks':

  						// Diffuse color (color under white light) using RGB values

  						if ( this.options && this.options.normalizeRGB ) {

  							value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

  						}

  						if ( this.options && this.options.ignoreZeroRGBs ) {

  							if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 1 ] === 0 ) {

  								// ignore

  								save = false;

  							}

  						}

  						break;
  				}

  				if ( save ) {

  					covmat[ lprop ] = value;

  				}

  			}

  		}

  		return converted;

  	},

  	preload: function () {

  		for ( var mn in this.materialsInfo ) {

  			this.create( mn );

  		}

  	},

  	getIndex: function( materialName ) {

  		return this.nameLookup[ materialName ];

  	},

  	getAsArray: function() {

  		var index = 0;

  		for ( var mn in this.materialsInfo ) {

  			this.materialsArray[ index ] = this.create( mn );
  			this.nameLookup[ mn ] = index;
  			index ++;

  		}

  		return this.materialsArray;

  	},

  	create: function ( materialName ) {

  		if ( this.materials[ materialName ] === undefined ) {

  			this.createMaterial_( materialName );

  		}

  		return this.materials[ materialName ];

  	},

  	createMaterial_: function ( materialName ) {

  		// Create material

  		var mat = this.materialsInfo[ materialName ];
  		var params = {

  			name: materialName,
  			side: this.side

  		};

  		for ( var prop in mat ) {

  			var value = mat[ prop ];

  			if ( value === '' ) continue;

  			switch ( prop.toLowerCase() ) {

  				// Ns is material specular exponent

  				case 'kd':

  					// Diffuse color (color under white light) using RGB values

  					params[ 'color' ] = new THREE.Color().fromArray( value );

  					break;

  				case 'ks':

  					// Specular color (color when light is reflected from shiny surface) using RGB values
  					params[ 'specular' ] = new THREE.Color().fromArray( value );

  					break;

  				case 'map_kd':

  					// Diffuse texture map

  					params[ 'map' ] = this.loadTexture( this.baseUrl + value );
  					params[ 'map' ].wrapS = this.wrap;
  					params[ 'map' ].wrapT = this.wrap;

  					break;

  				case 'ns':

  					// The specular exponent (defines the focus of the specular highlight)
  					// A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

  					params[ 'shininess' ] = parseFloat( value );

  					break;

  				case 'd':

  					if ( value < 1 ) {

  						params[ 'opacity' ] = value;
  						params[ 'transparent' ] = true;

  					}

  					break;

  				case 'Tr':

  					if ( value > 0 ) {

  						params[ 'opacity' ] = 1 - value;
  						params[ 'transparent' ] = true;

  					}

  					break;

  				case 'map_bump':
  				case 'bump':

  					// Bump texture map

  					if ( params[ 'bumpMap' ] ) break; // Avoid loading twice.

  					params[ 'bumpMap' ] = this.loadTexture( this.baseUrl + value );
  					params[ 'bumpMap' ].wrapS = this.wrap;
  					params[ 'bumpMap' ].wrapT = this.wrap;

  					break;

  			}

  		}

  		// Temporary workaround for WebXR performance improvement
  		if(window.disableCustomMaterial){
  			this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
  		}else{
  			this.materials[ materialName ] = new CustomShaderMaterial( params );
  		}

  		return this.materials[ materialName ];
  	},


  	loadTexture: function ( url, mapping, onLoad, onProgress, onError ) {

  		var texture;
  		var loader = THREE.Loader.Handlers.get( url );
  		var manager = ( this.manager !== undefined ) ? this.manager : THREE.DefaultLoadingManager;

  		if ( loader === null ) {

  			loader = new THREE.TextureLoader( manager );

  		}

  		if ( loader.setCrossOrigin ) loader.setCrossOrigin( this.crossOrigin );
  		texture = loader.load( url, onLoad, onProgress, onError );

  		if ( mapping !== undefined ) texture.mapping = mapping;

  		return texture;

  	}

  };

  var workerString = "var bimU={VERSION:\"beta\",io:{}};bimU.io.CompressionMethod={RAW:5718354,MG1:3229517,MG2:3295053},bimU.io.Flags={NORMALS:1},bimU.io.File=function(e){this.load(e)},bimU.io.File.prototype.load=function(e){this.header=new bimU.io.FileHeader(e),this.body=new bimU.io.FileBody(this.header),this.getReader().read(e,this.body)},bimU.io.File.prototype.getReader=function(){var e;switch(this.header.compressionMethod){case bimU.io.CompressionMethod.RAW:e=new bimU.io.ReaderRAW;break;case bimU.io.CompressionMethod.MG1:e=new bimU.io.ReaderMG1;break;case bimU.io.CompressionMethod.MG2:e=new bimU.io.ReaderMG2}return e},bimU.io.FileHeader=function(e){e.readInt32(),this.fileFormat=e.readInt32(),this.compressionMethod=e.readInt32(),this.vertexCount=e.readInt32(),this.triangleCount=e.readInt32(),this.uvMapCount=e.readInt32(),this.attrMapCount=e.readInt32(),this.flags=e.readInt32(),this.comment=e.readString()},bimU.io.FileHeader.prototype.hasNormals=function(){return this.flags&bimU.io.Flags.NORMALS},bimU.io.FileBody=function(e){var t=3*e.triangleCount,i=3*e.vertexCount,r=e.hasNormals()?3*e.vertexCount:0,o=2*e.vertexCount,s=4*e.vertexCount,n=0,a=new ArrayBuffer(4*(t+i+r+o*e.uvMapCount+s*e.attrMapCount));if(this.indices=new Uint32Array(a,0,t),this.vertices=new Float32Array(a,4*t,i),e.hasNormals()&&(this.normals=new Float32Array(a,4*(t+i),r)),e.uvMapCount)for(this.uvMaps=[],n=0;n<e.uvMapCount;++n)this.uvMaps[n]={uv:new Float32Array(a,4*(t+i+r+n*o),o)};if(e.attrMapCount)for(this.attrMaps=[],n=0;n<e.attrMapCount;++n)this.attrMaps[n]={attr:new Float32Array(a,4*(t+i+r+o*e.uvMapCount+n*s),s)}},bimU.io.FileMG2Header=function(e){e.readInt32(),this.vertexPrecision=e.readFloat32(),this.normalPrecision=e.readFloat32(),this.lowerBoundx=e.readFloat32(),this.lowerBoundy=e.readFloat32(),this.lowerBoundz=e.readFloat32(),this.higherBoundx=e.readFloat32(),this.higherBoundy=e.readFloat32(),this.higherBoundz=e.readFloat32(),this.divx=e.readInt32(),this.divy=e.readInt32(),this.divz=e.readInt32(),this.sizex=(this.higherBoundx-this.lowerBoundx)/this.divx,this.sizey=(this.higherBoundy-this.lowerBoundy)/this.divy,this.sizez=(this.higherBoundz-this.lowerBoundz)/this.divz},bimU.io.ReaderRAW=function(){},bimU.io.ReaderRAW.prototype.read=function(e,t){this.readIndices(e,t.indices),this.readVertices(e,t.vertices),t.normals&&this.readNormals(e,t.normals),t.uvMaps&&this.readUVMaps(e,t.uvMaps),t.attrMaps&&this.readAttrMaps(e,t.attrMaps)},bimU.io.ReaderRAW.prototype.readIndices=function(e,t){e.readInt32(),e.readArrayInt32(t)},bimU.io.ReaderRAW.prototype.readVertices=function(e,t){e.readInt32(),e.readArrayFloat32(t)},bimU.io.ReaderRAW.prototype.readNormals=function(e,t){e.readInt32(),e.readArrayFloat32(t)},bimU.io.ReaderRAW.prototype.readUVMaps=function(e,t){for(var i=0;i<t.length;++i)e.readInt32(),t[i].name=e.readString(),t[i].filename=e.readString(),e.readArrayFloat32(t[i].uv)},bimU.io.ReaderRAW.prototype.readAttrMaps=function(e,t){for(var i=0;i<t.length;++i)e.readInt32(),t[i].name=e.readString(),e.readArrayFloat32(t[i].attr)},bimU.io.ReaderMG1=function(){},bimU.io.ReaderMG1.prototype.read=function(e,t){this.readIndices(e,t.indices),this.readVertices(e,t.vertices),t.normals&&this.readNormals(e,t.normals),t.uvMaps&&this.readUVMaps(e,t.uvMaps),t.attrMaps&&this.readAttrMaps(e,t.attrMaps)},bimU.io.ReaderMG1.prototype.readIndices=function(e,t){e.readInt32();var i=e.readInt32(),r=new bimU.io.InterleavedStream(t,3);bimU.io.decompress(e,i,r),bimU.io.restoreIndices(t,t.length)},bimU.io.ReaderMG1.prototype.readVertices=function(e,t){e.readInt32();var i=e.readInt32(),r=new bimU.io.InterleavedStream(t,1);bimU.io.decompress(e,i,r)},bimU.io.ReaderMG1.prototype.readNormals=function(e,t){e.readInt32();var i=e.readInt32(),r=new bimU.io.InterleavedStream(t,3);bimU.io.decompress(e,i,r)},bimU.io.ReaderMG1.prototype.readUVMaps=function(e,t){for(var i=0;i<t.length;++i){e.readInt32(),t[i].name=e.readString(),t[i].filename=e.readString();var r=e.readInt32(),o=new bimU.io.InterleavedStream(t[i].uv,2);bimU.io.decompress(e,r,o)}},bimU.io.ReaderMG1.prototype.readAttrMaps=function(e,t){for(var i=0;i<t.length;++i){e.readInt32(),t[i].name=e.readString();var r=e.readInt32(),o=new bimU.io.InterleavedStream(t[i].attr,4);bimU.io.decompress(e,r,o)}},bimU.io.ReaderMG2=function(){},bimU.io.ReaderMG2.prototype.read=function(e,t){this.MG2Header=new bimU.io.FileMG2Header(e),this.readVertices(e,t.vertices),this.readIndices(e,t.indices),t.normals&&this.readNormals(e,t),t.uvMaps&&this.readUVMaps(e,t.uvMaps),t.attrMaps&&this.readAttrMaps(e,t.attrMaps)},bimU.io.ReaderMG2.prototype.readVertices=function(e,t){e.readInt32();var i=e.readInt32(),r=new bimU.io.InterleavedStream(t,3);bimU.io.decompress(e,i,r);var o=this.readGridIndices(e,t);bimU.io.restoreVertices(t,this.MG2Header,o,this.MG2Header.vertexPrecision)},bimU.io.ReaderMG2.prototype.readGridIndices=function(e,t){e.readInt32();var i=e.readInt32(),r=new Uint32Array(t.length/3),o=new bimU.io.InterleavedStream(r,1);return bimU.io.decompress(e,i,o),bimU.io.restoreGridIndices(r,r.length),r},bimU.io.ReaderMG2.prototype.readIndices=function(e,t){e.readInt32();var i=e.readInt32(),r=new bimU.io.InterleavedStream(t,3);bimU.io.decompress(e,i,r),bimU.io.restoreIndices(t,t.length)},bimU.io.ReaderMG2.prototype.readNormals=function(e,t){e.readInt32();var i=e.readInt32(),r=new bimU.io.InterleavedStream(t.normals,3);bimU.io.decompress(e,i,r);var o=bimU.io.calcSmoothNormals(t.indices,t.vertices);bimU.io.restoreNormals(t.normals,o,this.MG2Header.normalPrecision)},bimU.io.ReaderMG2.prototype.readUVMaps=function(e,t){for(var i=0;i<t.length;++i){e.readInt32(),t[i].name=e.readString(),t[i].filename=e.readString();var r=e.readFloat32(),o=e.readInt32(),s=new bimU.io.InterleavedStream(t[i].uv,2);bimU.io.decompress(e,o,s),bimU.io.restoreMap(t[i].uv,2,r)}},bimU.io.ReaderMG2.prototype.readAttrMaps=function(e,t){for(var i=0;i<t.length;++i){e.readInt32(),t[i].name=e.readString();var r=e.readFloat32(),o=e.readInt32(),s=new bimU.io.InterleavedStream(t[i].attr,4);bimU.io.decompress(e,o,s),bimU.io.restoreMap(t[i].attr,4,r)}},bimU.io.decompress=function(e,t,i){var r=e.offset;LZMA.decompress(e,e,i,i.data.length),e.offset=r+5+t},bimU.io.restoreIndices=function(e,t){var i=3;for(t>0&&(e[2]+=e[0],e[1]+=e[0]);i<t;i+=3)e[i]+=e[i-3],e[i]===e[i-3]?e[i+1]+=e[i-2]:e[i+1]+=e[i],e[i+2]+=e[i]},bimU.io.restoreGridIndices=function(e,t){for(var i=1;i<t;++i)e[i]+=e[i-1]},bimU.io.restoreVertices=function(e,t,i,r){for(var o,s,n,a,d,h=new Uint32Array(e.buffer,e.byteOffset,e.length),c=t.divx,p=c*t.divy,m=2147483647,u=0,f=0,_=0,l=i.length;f<l;_+=3)n=o=i[f++],d=~~(n/p),n-=~~(d*p),a=~~(n/c),n-=~~(a*c),s=h[_],o===m&&(s+=u),e[_]=t.lowerBoundx+n*t.sizex+r*s,e[_+1]=t.lowerBoundy+a*t.sizey+r*h[_+1],e[_+2]=t.lowerBoundz+d*t.sizez+r*h[_+2],m=o,u=s},bimU.io.restoreNormals=function(e,t,i){for(var r,o,s,n,a,d,h,c,p,m,u=new Uint32Array(e.buffer,e.byteOffset,e.length),f=0,_=e.length,l=1.5707963267948966;f<_;f+=3)r=u[f]*i,o=u[f+1],0===o?(e[f]=t[f]*r,e[f+1]=t[f+1]*r,e[f+2]=t[f+2]*r):(s=o<=4?(u[f+2]-2)*l:(4*u[f+2]/o-2)*l,o*=i*l,n=r*Math.sin(o),a=n*Math.cos(s),d=n*Math.sin(s),h=r*Math.cos(o),p=t[f+1],c=t[f]-t[f+2],m=Math.sqrt(2*p*p+c*c),m>1e-20&&(c/=m,p/=m),e[f]=t[f]*h+(t[f+1]*p-t[f+2]*c)*d-p*a,e[f+1]=t[f+1]*h-(t[f+2]+t[f])*p*d+c*a,e[f+2]=t[f+2]*h+(t[f]*c+t[f+1]*p)*d+p*a)},bimU.io.restoreMap=function(e,t,i){for(var r,o,s,n=new Uint32Array(e.buffer,e.byteOffset,e.length),a=0,d=e.length;a<t;++a)for(r=0,s=a;s<d;s+=t)o=n[s],r+=1&o?-(o+1>>1):o>>1,e[s]=r*i},bimU.io.calcSmoothNormals=function(e,t){var i,r,o,s,n,a,d,h,c,p,m,u,f,_,l,M=new Float32Array(t.length);for(_=0,l=e.length;_<l;)i=3*e[_++],r=3*e[_++],o=3*e[_++],d=t[r]-t[i],p=t[o]-t[i],h=t[r+1]-t[i+1],m=t[o+1]-t[i+1],c=t[r+2]-t[i+2],u=t[o+2]-t[i+2],s=h*u-c*m,n=c*p-d*u,a=d*m-h*p,f=Math.sqrt(s*s+n*n+a*a),f>1e-10&&(s/=f,n/=f,a/=f),M[i]+=s,M[i+1]+=n,M[i+2]+=a,M[r]+=s,M[r+1]+=n,M[r+2]+=a,M[o]+=s,M[o+1]+=n,M[o+2]+=a;for(_=0,l=M.length;_<l;_+=3)(f=Math.sqrt(M[_]*M[_]+M[_+1]*M[_+1]+M[_+2]*M[_+2]))>1e-10&&(M[_]/=f,M[_+1]/=f,M[_+2]/=f);return M},bimU.io.isLittleEndian=function(){var e=new ArrayBuffer(2),t=new Uint8Array(e),i=new Uint16Array(e);return t[0]=1,1===i[0]}(),bimU.io.InterleavedStream=function(e,t){this.data=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),this.offset=bimU.io.isLittleEndian?3:0,this.count=4*t,this.len=this.data.length},bimU.io.InterleavedStream.prototype.writeByte=function(e){this.data[this.offset]=e,this.offset+=this.count,this.offset>=this.len&&(this.offset-=this.len-4,this.offset>=this.count&&(this.offset-=this.count+(bimU.io.isLittleEndian?1:-1)))},bimU.io.Stream=function(e){this.data=e,this.offset=0},bimU.io.Stream.prototype.TWO_POW_MINUS23=Math.pow(2,-23),bimU.io.Stream.prototype.TWO_POW_MINUS126=Math.pow(2,-126),bimU.io.Stream.prototype.readByte=function(){return 255&this.data[this.offset++]},bimU.io.Stream.prototype.readInt32=function(){var e=this.readByte();return e|=this.readByte()<<8,(e|=this.readByte()<<16)|this.readByte()<<24},bimU.io.Stream.prototype.readFloat32=function(){var e=this.readByte();e+=this.readByte()<<8;var t=this.readByte(),i=this.readByte();e+=(127&t)<<16;var r=(127&i)<<1|(128&t)>>>7,o=128&i?-1:1;return 255===r?0!==e?NaN:o*(1/0):r>0?o*(1+e*this.TWO_POW_MINUS23)*Math.pow(2,r-127):0!==e?o*e*this.TWO_POW_MINUS126:0*o},bimU.io.Stream.prototype.readString=function(){var e=this.readInt32();return this.offset+=e,String.fromCharCode.apply(null,this.data.subarray(this.offset-e,this.offset))},bimU.io.Stream.prototype.readArrayInt32=function(e){for(var t=0,i=e.length;t<i;)e[t++]=this.readInt32();return e},bimU.io.Stream.prototype.readArrayFloat32=function(e){for(var t=0,i=e.length;t<i;)e[t++]=this.readFloat32();return e};var LZMA=LZMA||{};LZMA.OutWindow=function(){this._windowSize=0},LZMA.OutWindow.prototype.create=function(e){this._buffer&&this._windowSize===e||(this._buffer=[]),this._windowSize=e,this._pos=0,this._streamPos=0},LZMA.OutWindow.prototype.flush=function(){var e=this._pos-this._streamPos;if(0!==e){for(;e--;)this._stream.writeByte(this._buffer[this._streamPos++]);this._pos>=this._windowSize&&(this._pos=0),this._streamPos=this._pos}},LZMA.OutWindow.prototype.releaseStream=function(){this.flush(),this._stream=null},LZMA.OutWindow.prototype.setStream=function(e){this.releaseStream(),this._stream=e},LZMA.OutWindow.prototype.init=function(e){e||(this._streamPos=0,this._pos=0)},LZMA.OutWindow.prototype.copyBlock=function(e,t){var i=this._pos-e-1;for(i<0&&(i+=this._windowSize);t--;)i>=this._windowSize&&(i=0),this._buffer[this._pos++]=this._buffer[i++],this._pos>=this._windowSize&&this.flush()},LZMA.OutWindow.prototype.putByte=function(e){this._buffer[this._pos++]=e,this._pos>=this._windowSize&&this.flush()},LZMA.OutWindow.prototype.getByte=function(e){var t=this._pos-e-1;return t<0&&(t+=this._windowSize),this._buffer[t]},LZMA.RangeDecoder=function(){},LZMA.RangeDecoder.prototype.setStream=function(e){this._stream=e},LZMA.RangeDecoder.prototype.releaseStream=function(){this._stream=null},LZMA.RangeDecoder.prototype.init=function(){var e=5;for(this._code=0,this._range=-1;e--;)this._code=this._code<<8|this._stream.readByte()},LZMA.RangeDecoder.prototype.decodeDirectBits=function(e){for(var t,i=0,r=e;r--;)this._range>>>=1,t=this._code-this._range>>>31,this._code-=this._range&t-1,i=i<<1|1-t,0==(4278190080&this._range)&&(this._code=this._code<<8|this._stream.readByte(),this._range<<=8);return i},LZMA.RangeDecoder.prototype.decodeBit=function(e,t){var i=e[t],r=(this._range>>>11)*i;return(2147483648^this._code)<(2147483648^r)?(this._range=r,e[t]+=2048-i>>>5,0==(4278190080&this._range)&&(this._code=this._code<<8|this._stream.readByte(),this._range<<=8),0):(this._range-=r,this._code-=r,e[t]-=i>>>5,0==(4278190080&this._range)&&(this._code=this._code<<8|this._stream.readByte(),this._range<<=8),1)},LZMA.initBitModels=function(e,t){for(;t--;)e[t]=1024},LZMA.BitTreeDecoder=function(e){this._models=[],this._numBitLevels=e},LZMA.BitTreeDecoder.prototype.init=function(){LZMA.initBitModels(this._models,1<<this._numBitLevels)},LZMA.BitTreeDecoder.prototype.decode=function(e){for(var t=1,i=this._numBitLevels;i--;)t=t<<1|e.decodeBit(this._models,t);return t-(1<<this._numBitLevels)},LZMA.BitTreeDecoder.prototype.reverseDecode=function(e){for(var t,i=1,r=0,o=0;o<this._numBitLevels;++o)t=e.decodeBit(this._models,i),i=i<<1|t,r|=t<<o;return r},LZMA.reverseDecode2=function(e,t,i,r){for(var o,s=1,n=0,a=0;a<r;++a)o=i.decodeBit(e,t+s),s=s<<1|o,n|=o<<a;return n},LZMA.LenDecoder=function(){this._choice=[],this._lowCoder=[],this._midCoder=[],this._highCoder=new LZMA.BitTreeDecoder(8),this._numPosStates=0},LZMA.LenDecoder.prototype.create=function(e){for(;this._numPosStates<e;++this._numPosStates)this._lowCoder[this._numPosStates]=new LZMA.BitTreeDecoder(3),this._midCoder[this._numPosStates]=new LZMA.BitTreeDecoder(3)},LZMA.LenDecoder.prototype.init=function(){var e=this._numPosStates;for(LZMA.initBitModels(this._choice,2);e--;)this._lowCoder[e].init(),this._midCoder[e].init();this._highCoder.init()},LZMA.LenDecoder.prototype.decode=function(e,t){return 0===e.decodeBit(this._choice,0)?this._lowCoder[t].decode(e):0===e.decodeBit(this._choice,1)?8+this._midCoder[t].decode(e):16+this._highCoder.decode(e)},LZMA.Decoder2=function(){this._decoders=[]},LZMA.Decoder2.prototype.init=function(){LZMA.initBitModels(this._decoders,768)},LZMA.Decoder2.prototype.decodeNormal=function(e){var t=1;do{t=t<<1|e.decodeBit(this._decoders,t)}while(t<256);return 255&t},LZMA.Decoder2.prototype.decodeWithMatchByte=function(e,t){var i,r,o=1;do{if(i=t>>7&1,t<<=1,r=e.decodeBit(this._decoders,(1+i<<8)+o),o=o<<1|r,i!==r){for(;o<256;)o=o<<1|e.decodeBit(this._decoders,o);break}}while(o<256);return 255&o},LZMA.LiteralDecoder=function(){},LZMA.LiteralDecoder.prototype.create=function(e,t){var i;if(!this._coders||this._numPrevBits!==t||this._numPosBits!==e)for(this._numPosBits=e,this._posMask=(1<<e)-1,this._numPrevBits=t,this._coders=[],i=1<<this._numPrevBits+this._numPosBits;i--;)this._coders[i]=new LZMA.Decoder2},LZMA.LiteralDecoder.prototype.init=function(){for(var e=1<<this._numPrevBits+this._numPosBits;e--;)this._coders[e].init()},LZMA.LiteralDecoder.prototype.getDecoder=function(e,t){return this._coders[((e&this._posMask)<<this._numPrevBits)+((255&t)>>>8-this._numPrevBits)]},LZMA.Decoder=function(){this._outWindow=new LZMA.OutWindow,this._rangeDecoder=new LZMA.RangeDecoder,this._isMatchDecoders=[],this._isRepDecoders=[],this._isRepG0Decoders=[],this._isRepG1Decoders=[],this._isRepG2Decoders=[],this._isRep0LongDecoders=[],this._posSlotDecoder=[],this._posDecoders=[],this._posAlignDecoder=new LZMA.BitTreeDecoder(4),this._lenDecoder=new LZMA.LenDecoder,this._repLenDecoder=new LZMA.LenDecoder,this._literalDecoder=new LZMA.LiteralDecoder,this._dictionarySize=-1,this._dictionarySizeCheck=-1,this._posSlotDecoder[0]=new LZMA.BitTreeDecoder(6),this._posSlotDecoder[1]=new LZMA.BitTreeDecoder(6),this._posSlotDecoder[2]=new LZMA.BitTreeDecoder(6),this._posSlotDecoder[3]=new LZMA.BitTreeDecoder(6)},LZMA.Decoder.prototype.setDictionarySize=function(e){return!(e<0)&&(this._dictionarySize!==e&&(this._dictionarySize=e,this._dictionarySizeCheck=Math.max(this._dictionarySize,1),this._outWindow.create(Math.max(this._dictionarySizeCheck,4096))),!0)},LZMA.Decoder.prototype.setLcLpPb=function(e,t,i){var r=1<<i;return!(e>8||t>4||i>4)&&(this._literalDecoder.create(t,e),this._lenDecoder.create(r),this._repLenDecoder.create(r),this._posStateMask=r-1,!0)},LZMA.Decoder.prototype.init=function(){var e=4;for(this._outWindow.init(!1),LZMA.initBitModels(this._isMatchDecoders,192),LZMA.initBitModels(this._isRep0LongDecoders,192),LZMA.initBitModels(this._isRepDecoders,12),LZMA.initBitModels(this._isRepG0Decoders,12),LZMA.initBitModels(this._isRepG1Decoders,12),LZMA.initBitModels(this._isRepG2Decoders,12),LZMA.initBitModels(this._posDecoders,114),this._literalDecoder.init();e--;)this._posSlotDecoder[e].init();this._lenDecoder.init(),this._repLenDecoder.init(),this._posAlignDecoder.init(),this._rangeDecoder.init()},LZMA.Decoder.prototype.decode=function(e,t,i){var r,o,s,n,a,d,h=0,c=0,p=0,m=0,u=0,f=0,_=0;for(this._rangeDecoder.setStream(e),this._outWindow.setStream(t),this.init();i<0||f<i;)if(r=f&this._posStateMask,0===this._rangeDecoder.decodeBit(this._isMatchDecoders,(h<<4)+r))o=this._literalDecoder.getDecoder(f++,_),_=h>=7?o.decodeWithMatchByte(this._rangeDecoder,this._outWindow.getByte(c)):o.decodeNormal(this._rangeDecoder),this._outWindow.putByte(_),h=h<4?0:h-(h<10?3:6);else{if(1===this._rangeDecoder.decodeBit(this._isRepDecoders,h))s=0,0===this._rangeDecoder.decodeBit(this._isRepG0Decoders,h)?0===this._rangeDecoder.decodeBit(this._isRep0LongDecoders,(h<<4)+r)&&(h=h<7?9:11,s=1):(0===this._rangeDecoder.decodeBit(this._isRepG1Decoders,h)?n=p:(0===this._rangeDecoder.decodeBit(this._isRepG2Decoders,h)?n=m:(n=u,u=m),m=p),p=c,c=n),0===s&&(s=2+this._repLenDecoder.decode(this._rangeDecoder,r),h=h<7?8:11);else if(u=m,m=p,p=c,s=2+this._lenDecoder.decode(this._rangeDecoder,r),h=h<7?7:10,(a=this._posSlotDecoder[s<=5?s-2:3].decode(this._rangeDecoder))>=4){if(d=(a>>1)-1,c=(2|1&a)<<d,a<14)c+=LZMA.reverseDecode2(this._posDecoders,c-a-1,this._rangeDecoder,d);else if(c+=this._rangeDecoder.decodeDirectBits(d-4)<<4,(c+=this._posAlignDecoder.reverseDecode(this._rangeDecoder))<0){if(-1===c)break;return!1}}else c=a;if(c>=f||c>=this._dictionarySizeCheck)return!1;this._outWindow.copyBlock(c,s),f+=s,_=this._outWindow.getByte(0)}return this._outWindow.flush(),this._outWindow.releaseStream(),this._rangeDecoder.releaseStream(),!0},LZMA.Decoder.prototype.setDecoderProperties=function(e){var t,i,r,o,s;return!(e.size<5)&&(t=e.readByte(),i=t%9,t=~~(t/9),r=t%5,o=~~(t/5),!!this.setLcLpPb(i,r,o)&&(s=e.readByte(),s|=e.readByte()<<8,s|=e.readByte()<<16,s+=16777216*e.readByte(),this.setDictionarySize(s)))},LZMA.decompress=function(e,t,i,r){var o=new LZMA.Decoder;if(!o.setDecoderProperties(e))throw\"Incorrect stream properties\";if(!o.decode(t,i,r))throw\"Error in data stream\";return!0},self.onmessage=function(e){for(var t=[],i=0;i<e.data.offsets.length;i++){var r=new bimU.io.Stream(e.data.data);r.offset=e.data.offsets[i],t[i]=new bimU.io.File(r)}self.postMessage(t),self.close()};";

  /**
   * Loader for CTM encoded models generated by OpenCTM tools:
   *	http://openctm.sourceforge.net/
   *
   * Uses js-openctm library by Juan Mellado
   *
   * @author alteredq / http://alteredqualia.com/
   */

  var GeometryLoader = function ( showStatus ) {

  	THREE.Loader.call( this, showStatus );

  	this.materials = null;

  };

  GeometryLoader.prototype = Object.create( THREE.Loader.prototype );

  GeometryLoader.prototype.setMaterials = function( materials ) {

  	this.materials = materials;

  },

  // Load CMGLoader compressed models
  //  - parameters
  //		- url (required)
  //		- callback (required)

  GeometryLoader.prototype.load = function( binaryData, callback, parameters ) {

  	var scope = this;

  	var offsets = parameters.offsets !== undefined ? parameters.offsets : [ 0 ];
  	var useBuffers = parameters.useBuffers !== undefined ? parameters.useBuffers : true;

  	var s = Date.now();

  	if ( parameters.useWorker ) {

  		var worker = MiscHelper.createWorkerFromString(workerString);

  		worker.onmessage = function( event ) {

  			var files = event.data;

  			for ( var i = 0; i < files.length; i ++ ) {

  				var ctmFile = files[ i ];

  				if ( useBuffers ) {

  					scope.createModel( ctmFile, scope.materials , callback );

  				} else {

  					scope.createModel( ctmFile, scope.materials , callback );

  				}

  			}

  			var e = Date.now();
  			console.log( "Worker parse time: " + (e-s) + " ms" );

  		};

  		worker.postMessage( { "data": binaryData, "offsets": offsets } );

  	} else {

  		for ( var i = 0; i < offsets.length; i ++ ) {

  			var stream = new bimU.io.Stream( binaryData );
  			stream.offset = offsets[ i ];

  			var ctmFile = new bimU.io.File( stream );

  			if ( useBuffers ) {

  				scope.createModel( ctmFile, scope.materials , callback );

  			} else {

  				scope.createModel( ctmFile, scope.materials , callback );

  			}

  		}

  		//var e = Date.now();
  		//console.log( "CTM data parse time [inline]: " + (e-s) + " ms" );

  	}

  };

  GeometryLoader.prototype.createModel = function ( file, materials, callback ) {

      var Model = function () {

          THREE.BufferGeometry.call( this );

          this.materialArray = null;

  		var indices = file.body.indices,
              positions = file.body.vertices,
  			normals = file.body.normals;

  		var uvs, attributeData;
          var uvMaps = file.body.uvMaps;

          if ( uvMaps !== undefined && uvMaps.length > 0 ) {

              uvs = uvMaps[ 0 ].uv;

          }

          var attrMaps = file.body.attrMaps;

          if ( attrMaps !== undefined && attrMaps.length > 0) {

  			attributeData = attrMaps[ 0 ];

          }

  		//add temporary groups to reorder indices
  		this.clearGroups();
  		var materialIndex = attrMaps[0].attr[indices[0]*4];
  		var startCount = 0;
  		for(var i=0; i<indices.length; i++)
  		{
  			if(materialIndex != attrMaps[0].attr[indices[i]*4])
  			{
  				this.addGroup(startCount, i-startCount, materialIndex);
  				materialIndex = attrMaps[0].attr[indices[i]*4];
  				startCount = i;
  			}
  			if(i == (indices.length-1))
  			{
  				materialIndex = attrMaps[0].attr[indices[i]*4];
  				// add the last group
  				this.addGroup(startCount, i-startCount+1, materialIndex);
  			}
  		}

  		//reorder indices by material indices
  		var newIndices = [];
  		for(var j=0; j<materials.getAsArray().length; j++)
  		{
  			for(var k=0; k<this.groups.length; k++)
  			{
  				if(this.groups[k].materialIndex==j)
  				{
  					for(var l=0; l<this.groups[k].count; l++)
  					{
  						newIndices.push(indices[this.groups[k].start+l]);
  					}
  				}
  			}
  		}

  		//release old indices
  		indices = [];

  		//add new groups with new indices to show different materials
  		this.clearGroups();
  		materialIndex = attrMaps[0].attr[newIndices[0]*4];
  		startCount = 0;
  		for(var i=0; i<newIndices.length; i++)
  		{
  			if(materialIndex != attrMaps[0].attr[newIndices[i]*4])
  			{
  				this.addGroup(startCount, i-startCount, materialIndex);
  				materialIndex = attrMaps[0].attr[newIndices[i]*4];
  				startCount = i;
  			}
  			if(i == (newIndices.length-1))
  			{
  				materialIndex = attrMaps[0].attr[newIndices[i]*4];
  				// add the last group
  				this.addGroup(startCount, i-startCount+1, materialIndex);
  			}
  		}

  		//create materials
  		this.materialArray = materials.getAsArray();

  		//set indices and attributes
  		var newIndicesUint32Array = new Uint32Array(newIndices);
          this.setIndex( new THREE.BufferAttribute( newIndicesUint32Array, 1 ) );
          this.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
          this.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( newIndices.length * 4 ), 4 ) ); 
          this.setAttribute( 'colorOverriden', new THREE.BufferAttribute( new Uint8Array( newIndices.length ).fill(0), 1 ) );
          this.setAttribute( 'visible', new THREE.BufferAttribute( new Uint8Array( newIndices.length ).fill(1), 1 ) );
  		// this.setAttribute( 'selected', new THREE.BufferAttribute( new Uint8Array( newIndices.length ).fill(0), 1 ) );
  		
          if ( normals !== undefined ) {

              this.setAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

          }

          if ( uvs !== undefined ) {

              this.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

          }

          if ( attributeData !== undefined ) {

              this.setAttribute( 'attributeData', new THREE.BufferAttribute( attributeData, 4 ) );

          }

      };

      Model.prototype = Object.create( THREE.BufferGeometry.prototype );
      Model.prototype.constructor = Model;

      var geometry = new Model();

      // compute vertex normals if not present in the CTM model
      if ( geometry.attributes.normal === undefined ) {
          geometry.computeVertexNormals();
      }

      callback( geometry );
  };

  // TODO:
  // test pako conflict

  const MODEL_SCALE = 1.0;

  class Model extends THREE$1.EventDispatcher {
      constructor(configs, onGeometryDownloaded, onLoaded) {
          super();

          // TODO: options should include transform, scale, rotation, offset, etc.
          // TODO: handle global shift and offset
          if(configs == null){
              throw new Error("Model configuration cannot be null.");
          }
          if(configs.modelId == null){
              throw new Error("Model ID cannot be null.");
          }
          if(configs.accessToken == null && configs.password == null){
              throw new Error("Either Access token or password must be used for authentication.");
          }
          this.modelConfigs = configs;
          this.modelConfigs.baseUrl = configs.baseUrl || GLOBAL_CONFIGS.defaultBaseUrl;
          this.modelConfigs.modelId = configs.modelId;
          this.modelConfigs.accessToken = configs.accessToken;
          this.modelConfigs.password = configs.password;

          this.onGeometryDownloaded = onGeometryDownloaded;
          this.onLoaded = onLoaded;

          // Add the extension functions
          if(!window.disableCustomRaycaster){
              window.THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
              window.THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
              window.THREE.Mesh.prototype.raycast = acceleratedRaycast;
          }

          this.meshGroup = new THREE$1.Group();
          this.meshGroup.matrixAutoUpdate = false;
          this.globalShiftVector = null;
          this.numOfParts = 0;
          this.progresses = null; // Save loading progress individually for model parts
          this.isDoubleSide = true;
          this.scale = MODEL_SCALE;

          // request token on user's behalf
          if(this.modelConfigs.password != undefined){
              const { baseUrl, modelId, password } = this.modelConfigs;
              let tokenRequestUrl = `${baseUrl}/token`;
          
              let requestHeaders = new Headers();
              requestHeaders.append("Authorization", `Basic ${btoa(modelId + ":" + password)}`);
              requestHeaders.append("bimU_API_Version", version);

              let requestOptions = {
                  method: 'POST',
                  headers: requestHeaders
              };

              fetch(tokenRequestUrl, requestOptions)
              .then(response => {
                  if(!response.ok){
                      throw Error(`Failed to request access token. Status: ${response.statusText}. Status code: ${response.status}.`);
                  } 
                  return response.json()
              })
              .then(result => {
                  this.modelConfigs.accessToken = result.token;
                  this.modelConfigs.channelId = MiscHelper.parseJwt(result.token).channelId;
                  this.fetchBlobMetadata();
              })
              .catch(error => {
                  this.dispatchEvent({type: EventsEnum.ON_MODEL_ERROR, error: error});
                  console.error(error);
              });
          }else if(this.modelConfigs.accessToken != undefined){
              this.modelConfigs.channelId = MiscHelper.parseJwt(this.modelConfigs.accessToken).channelId;
              this.fetchBlobMetadata();
          }else{
              throw Error("Either access token or model password must be specified in the model configuration.");
          }
      }

      fetchBlobMetadata() {
          const { baseUrl, channelId, modelId, accessToken } = this.modelConfigs;
          let modelPath = `${baseUrl}/channels/${channelId}/models/${modelId}/blob`;
          
          let requestHeaders = new Headers();
          requestHeaders.append("Authorization", `Bearer ${accessToken}`);

          let requestOptions = {
              method: 'GET',
              headers: requestHeaders,
              redirect: 'follow'
          };

          fetch(modelPath, requestOptions)
          .then(response => {
              if(!response.ok){
                  throw Error(`Failed to fetch blob metadata. Status: ${response.statusText}. Status code: ${response.status}.`);
              } 
              return response.json()
          })
          .then(result => {
              this.numOfParts = result.urls.length;
              this.globalShiftVector = new THREE$1.Vector3(result.shift[0], result.shift[1], result.shift[2]);
              console.log("Global Shift: ", this.globalShiftVector);
              this.progresses = result.urls.map(x => 0.0);
              result.urls.forEach((url, i) => this.downloadBlob(url, i));
          })
          .catch(error => {
              this.dispatchEvent({type: EventsEnum.ON_MODEL_ERROR, error: error});
              console.error(error);
          });
      }

      // For debugging purpose
      loadLocalFile(filePath) {
          this.numOfParts = 1;
          this.downloadBlob(filePath, 0);
          this.progresses = [0.0];
      }

      downloadBlob(url, index) {
          let scope = this;
          // download model blob using XHR
          let xhr = new XMLHttpRequest();
          // let length = 0;
          xhr.onreadystatechange = function() {
              if ( xhr.readyState === 4 ) {
                  if ( xhr.status === 200 || xhr.status === 0 ) {

                      // parse header data
                      let header = String.fromCharCode.apply(null, new Uint8Array(xhr.response.slice(0, 30)));
                      let indexOfDelimiter1 = header.indexOf('created');
                      let mtlOffset = header.substring(7, indexOfDelimiter1) - 5978;                    

                      // decompress mtl
                      LZMA.decompress(new Uint8Array(xhr.response.slice(30, mtlOffset+30)), function on_finish(mtlData, error) {
                          // pass mtl data to mtl loader
                          let mtlLoader = new MaterialLoader();
                          mtlLoader.load( mtlData, function( materials ) {
                              // preload materials
                              materials.preload();
                              // prepare to load Compressed Model Geometry (CMG)
                              let loader = new GeometryLoader();
                              // set materials
                              loader.setMaterials( materials );
                              // pass ctmData to ctm loader
                              loader.load( new Uint8Array(xhr.response.slice(mtlOffset+30)) ,  function( geometry ) {
                                  scope.generateMesh( geometry, geometry.materialArray, 0, 0, 0, 0, 0 );
                              }, { useWorker: true } );

                          });

                      }, function on_progress(percent) {});

                  } else {
                      let errorMsg = "Failed to download model. Status code: " + xhr.status;
                      scope.dispatchEvent({type: EventsEnum.ON_MODEL_ERROR, error: errorMsg});
                      console.error(errorMsg);
                  }

              }
          };
          xhr.responseType = "arraybuffer";
          xhr.addEventListener("progress", function updateProgress (oEvent) {
              if (oEvent.lengthComputable) {
                  let percentComplete = oEvent.loaded / oEvent.total * 100;
                  scope.progresses[index] = percentComplete / scope.numOfParts;
                  let totalProgress = 0.0;
                  scope.progresses.forEach(p => totalProgress += p);
                  scope.dispatchEvent({type: EventsEnum.ON_MODEL_PROGRESS, progress: totalProgress.toFixed(0)});
              }
          });
          xhr.open( "GET", url, true );
          xhr.send( null );
      }

      generateMesh(geometry, materialArray, x, y, z, rx, rz){
          /*
          // add "visible" attr
          let len = geometry.attributes.attributeData.array.attr.length / 4;
          let arrVisible = new Float32Array(len);
          for(let i = 0; i < len; i++) {
              arrVisible[i] = 1.0;
          }
          // for controlling element visibility
          geometry.setAttribute('visible', new THREE.BufferAttribute(arrVisible, 1));
          */

          let mesh = new THREE$1.Mesh( geometry, materialArray );

          mesh.position.set( x, y, z );
          mesh.scale.set( this.scale, this.scale, this.scale );
          mesh.rotation.x = rx;
          mesh.rotation.z = rz;
          mesh.matrixAutoUpdate = false;

          // apply mesh BVH
          if(!window.disableCustomRaycaster){
              geometry.computeBoundsTree();
          }

          //mesh.castShadow = false;
          //mesh.receiveShadow = false;

          //add mesh edge
          // TODO: can we show edge for a much smaller model?
          //let eGeometry = new THREE.EdgesGeometry( geometry, 45 );
          //let eMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 0.5 } );
          //let edges = new THREE.LineSegments( eGeometry, eMaterial );
          //mesh.add( edges );

          // add to mesh group
          this.meshGroup.add(mesh);

          // finally check if all parts are loaded
          if(this.meshGroup.children.length == this.numOfParts){
              this.onGeometryDownloaded(this);
          }
      }

      callbacksExist(onSuccess, onError){
          if(!onSuccess){
              console.error("onSuccess callback is required.");
              return false;
          }
          if(!onError){
              console.error("onError callback is required.");
              return false;
          }
          return true;
      }

      checkAccessToken(accessToken){
          if(accessToken == null || accessToken == ""){
              throw Error("Call this function when model is fully loaded or use a valid access token.");
          }
      }

      getFileProperties(onSuccess, onError){
          if(!this.callbacksExist(onSuccess, onError)) return;

          const { baseUrl, channelId, modelId, accessToken } = this.modelConfigs;
          let filePath = `${baseUrl}/channels/${channelId}/attachments/${modelId}`;
          
          this.checkAccessToken(accessToken);
          let requestHeaders = new Headers();
          requestHeaders.append("Authorization", `Bearer ${accessToken}`);

          let requestOptions = {
              method: 'GET',
              headers: requestHeaders,
              redirect: 'follow'
          };

          fetch(filePath, requestOptions)
          .then(response => {
              if(!response.ok){
                  throw Error(`Failed to load file properties. Status: ${response.statusText}. Status code: ${response.status}.`);
              } 
              return response.json()
          })
          .then(result => {
              let formattedData = {
                  modelId: result.id,
                  filename: result.fn,
                  source: result.sr ? result.sr : (result.fn.endsWith(".ifc") ? "IFC" : null),
                  size: result.sz,
                  updated: result.u,
                  created: result.c,
                  isShared: result.ss == 1
              };
              onSuccess(formattedData);
          })
          .catch(error => {
              onError({type: EventsEnum.ON_MODEL_ERROR, error: error});
              console.error(error);
          });
      }

      getModelMetadata(onSuccess, onError){
          if(!this.callbacksExist(onSuccess, onError)) return;

          const { baseUrl, channelId, modelId, accessToken } = this.modelConfigs;
          let url = `${baseUrl}/channels/${channelId}/models/${modelId}`;

          this.checkAccessToken(accessToken);

          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
              if ( xhr.readyState === 4 ) {
                  if ( xhr.status === 200 || xhr.status === 0 ) {
                      let jsonString = pako.inflateRaw(new Uint8Array(xhr.response), {to: 'string'});
                      let data  = JSON.parse(jsonString.trim());
                      let formattedData = {
                          modelId: modelId,
                          originatingSystem: data.os,
                          metadata: data.m.map(param => ({group: param.g, name: param.n, value: param.v}))
                      };
                      onSuccess(formattedData);
                  } else {
                      let errorMsg = "Failed to load model metadata. Status code: " + xhr.status;
                      onError({type: EventsEnum.ON_MODEL_ERROR, error: errorMsg});
                      console.error(errorMsg);
                  }
              }
          };
          xhr.responseType = "arraybuffer";        
          xhr.open( "GET", url, true );
          xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
          xhr.send( null );
      }

      getElementDataByIndex(_elementIndex, onSuccess, onError) {
          if(!this.callbacksExist(onSuccess, onError)) return;

          const { baseUrl, channelId, modelId, accessToken } = this.modelConfigs;
          let url = `${baseUrl}/channels/${channelId}/models/${modelId}/elements/${_elementIndex}`;

          this.checkAccessToken(accessToken);

          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
              if ( xhr.readyState === 4 ) {
                  if ( xhr.status === 200 || xhr.status === 0 ) {
                      let jsonString = pako.inflateRaw(new Uint8Array(xhr.response), {to: 'string'});                    
                      let data  = JSON.parse(jsonString.trim());
                      let formattedData = {
                          elementIndex: _elementIndex,
                          elementId: data.eId,
                          uniqueId: data.uId,
                          properties: data.p.map(param => ({group: param.g, name: param.n, value: param.v}))
                      };
                      
                      if(onSuccess){
                          onSuccess(formattedData);
                      }                    
                  } else {
                      let errorMsg = "Failed to load model element data. Status code: " + xhr.status;
                      onError({type: EventsEnum.ON_MODEL_ERROR, error: errorMsg});
                      console.error(errorMsg);
                  }

              }
          };
          xhr.responseType = "arraybuffer";        
          xhr.open( "GET", url, true );
          xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
          xhr.send( null );
      }

      runModelDataQuery(sqlStatement, onSuccess, onError){
          if(!this.callbacksExist(onSuccess, onError)) return;

          const { baseUrl, channelId, modelId, accessToken } = this.modelConfigs;
          let url = `${baseUrl}/channels/${channelId}/models/${modelId}/query`;
          
          this.checkAccessToken(accessToken);
          let requestHeaders = new Headers();
          requestHeaders.append("Authorization", `Bearer ${accessToken}`);
          requestHeaders.append("Content-Type", "application/json");

          let requestOptions = {
              method: 'POST',
              headers: requestHeaders,
              body: JSON.stringify({query: sqlStatement}),
              redirect: 'follow'
          };

          fetch(url, requestOptions)
          .then(response => {
              if(response.status == 408){
                  throw Error(`Request Timeout. Please simplify your query. Status: ${response.statusText}. Status code: ${response.status}.`);
              }else if(response.status == 413){
                  throw Error(`Response too large to return. Please simplify your query. Status: ${response.statusText}. Status code: ${response.status}.`);
              }else if(!response.ok){
                  throw Error(`Failed to query model data. Make sure query expressions are valid. Status: ${response.statusText}. Status code: ${response.status}.`);
              }
              return response.text();
          })
          .then(result => {
              result = result.trim();
              if(result.length == 0){
                  onSuccess([]);
                  return;
              }
              let json = result.includes("\n") ? result.split("\n").map(s => JSON.parse(s)) : [JSON.parse(result)];
              onSuccess(json);
          })
          .catch(error => {
              onError({type: EventsEnum.ON_MODEL_ERROR, error: error});
              console.error(error);
          });
      }

      // Toggle state when argument is undefined
      setDoubleSide(isDoubleSide) {
          let scope = this;
          this.isDoubleSide = isDoubleSide != undefined ? isDoubleSide : !this.isDoubleSide;
          this.meshGroup.children.forEach(mesh => {
              mesh.material.forEach(function(mat) {
                  if(mat.uniforms.opacity.value >= 1.0){
                      mat.side = scope.isDoubleSide ? THREE$1.DoubleSide : THREE$1.FrontSide;
                  }else{
                      // Translucent material should always remain single side
                      mat.side = THREE$1.FrontSide;
                  }
              });
          });
      }

      dispose() {
          // TODO
      }
  }

  /**
   * Enum for comparison and pattern matching operators.
   * @readonly
   * @class OperatorsEnum
   * @property {string} EQUAL_TO - Equal to a value. Can be text, number or null.
   * @property {string} NOT_EQUAL_TO - Not equal to a value. Can be text, number or null.
   * @property {string} IN - Matches any value in a list of values. Can be text or number.
   * @property {string} NOT_IN - Does not match any value in a list of values. Can be text or number.
   * @property {string} STARTS_WITH - Starts with a text string.
   * @property {string} DOES_NOT_START_WITH - Does not start with a text string.
   * @property {string} ENDS_WITH - Ends with a text string.
   * @property {string} DOES_NOT_END_WITH - Does not end with a text string.
   * @property {string} CONTAINS - Contains a text string.
   * @property {string} DOES_NOT_CONTAIN - Does not contain a text string.
   * @property {string} GREATER_THAN - Greater than a numeric value.
   * @property {string} GREATER_THAN_OR_EQUAL_TO - Greater than or equal to a numeric value.
   * @property {string} LESS_THAN - Less than a numeric value.
   * @property {string} LESS_THAN_OR_EQUAL_TO - Less than or equal to a numeric value.
   * @property {string} BETWEEN - Between two numeric values.
   */
  const OperatorsEnum = Object.freeze({
      // Generic operators
      // Property value is treated as text string.
      // IS NULL and IS NOT NULL have to be handled specifically.
      EQUAL_TO: "EQUAL_TO",
      NOT_EQUAL_TO: "NOT_EQUAL_TO",
      IN: "IN",
      NOT_IN: "NOT_IN",

      // Text operators
      STARTS_WITH: "STARTS_WITH",
      DOES_NOT_START_WITH: "DOES_NOT_START_WITH",
      ENDS_WITH: "ENDS_WITH",
      DOES_NOT_END_WITH: "DOES_NOT_END_WITH",
      CONTAINS: "CONTAINS",
      DOES_NOT_CONTAIN: "DOES_NOT_CONTAIN",

      // Number operators
      GREATER_THAN: "GREATER_THAN",
      GREATER_THAN_OR_EQUAL_TO: "GREATER_THAN_OR_EQUAL_TO",
      LESS_THAN: "LESS_THAN",
      LESS_THAN_OR_EQUAL_TO: "LESS_THAN_OR_EQUAL_TO",
      BETWEEN: "BETWEEN",
  });

  const getJoinedString = (valuesArray) => valuesArray.map(v => `'${v}'`).join(", ");

  /**
   * This class is used to find elements by a property that satisfies the specified condition. It is similar to the SQL WHERE clause.
   * @class PropertyFilter
   * @param {string} groupName - Property group name.
   * @param {string} propertyName - Property name.
   * @param {string} propertyValue - Property value.
   * @example
  // Filter out elements that have a property called "Top Constrant" in a "Constraints" group and its value is equal to "Level 1".
  let propertyFilter1 = new bimU.PropertyFilter("Constraints", "Top Constrant", "Level 1");
  // Filter out elements that have a property called "Height" in a "Dimension" group and its value is greater than 12.34.
  let propertyFilter2 = new bimU.PropertyFilter("Dimension", "Height", 12.34);
  // Default operator is EQUAL_TO.
  propertyFilter2.operator = bimU.OperatorsEnum.GREATER_THAN;
   */
  class PropertyFilter {
      constructor(groupName, propertyName, propertyValue) {
          if(arguments.length != 3){
              throw new Error('All arguments are required.');
          }

          /** @member {OperatorsEnum} - An operator that determines how the property value is compared. Default is bimU.OperatorsEnum.EQUAL_TO. */
          this.operator = OperatorsEnum.EQUAL_TO;
          
          /** @member {string} - Property group name */
          this.groupName = groupName;

          /** @member {string} - Property name. */
          this.propertyName = propertyName;

          /** @member {string|string[]|number|number[]} - Property value. Use Array along with IN, NOT_IN, or BETWEEN operators. */
          this.propertyValue = propertyValue;
      }

      /**
       * This method returns a SQL equivalent expression for the underlying filter.
       * @returns {string} SQL filter expression.
       */
      getExpressionString() {
          if(this.propertyName == null){
              throw new Error('propertyName is required.');
          }
          if(!Object.keys(OperatorsEnum).includes(this.operator)){
              throw new Error(`Invalid operator: ${this.operator}`);
          }

          let columnName = this.groupName ? `"${this.groupName}:${this.propertyName}"` : this.propertyName;
          // Handle reserved character in Parquet format
          columnName.replace(",", "");

          // Handle null value
          if(this.propertyValue == null){
              if(this.operator == OperatorsEnum.EQUAL_TO){
                  return `${columnName} IS NULL`;
              }else if(this.operator == OperatorsEnum.NOT_EQUAL_TO){
                  return `${columnName} IS NOT NULL`;
              }else{
                  throw new Error("Null value must be used along with EQUAL_TO or NOT_EQUAL_TO operator.");
              }            
          // Handle array value
          }else if(Array.isArray(this.propertyValue)){            
              if(this.operator == OperatorsEnum.IN){
                  return `${columnName} IN (${getJoinedString(this.propertyValue)})`;
              }else if(this.operator == OperatorsEnum.NOT_IN){
                  return `${columnName} NOT IN (${getJoinedString(this.propertyValue)})`;
              }else if(this.operator == OperatorsEnum.BETWEEN){
                  if(this.propertyValue.length == 2 && this.propertyValue.every(v => Number.isFinite(v))){
                      return `CAST(${columnName} AS FLOAT) BETWEEN ${this.propertyValue[0]} AND ${this.propertyValue[1]}`;
                  }else{
                      throw new Error("Array must have exactly two numeric values when BETWEEN operator is used.");
                  }                
              }else{
                  throw new Error("Array value must be used along with IN, NOT_IN or BETWEEN operator.");
              }            
          }else{
              // Handle equality operators
              if(this.operator == OperatorsEnum.EQUAL_TO){
                  return `${columnName} = '${this.propertyValue}'`;
              }else if(this.operator == OperatorsEnum.NOT_EQUAL_TO){
                  return `${columnName} != '${this.propertyValue}'`;
              // Handle string operators
              }else if(this.operator == OperatorsEnum.STARTS_WITH){
                  return `${columnName} LIKE '${this.propertyValue}%'`;
              }else if(this.operator == OperatorsEnum.DOES_NOT_START_WITH){
                  return `${columnName} NOT LIKE '${this.propertyValue}%'`;
              }else if(this.operator == OperatorsEnum.ENDS_WITH){
                  return `${columnName} LIKE '%${this.propertyValue}'`;
              }else if(this.operator == OperatorsEnum.DOES_NOT_END_WITH){
                  return `${columnName} NOT LIKE '%${this.propertyValue}'`;
              }else if(this.operator == OperatorsEnum.CONTAINS){
                  return `${columnName} LIKE '%${this.propertyValue}%'`;
              }else if(this.operator == OperatorsEnum.DOES_NOT_CONTAIN){
                  return `${columnName} NOT LIKE '%${this.propertyValue}%'`;
              // Handle numeric operators
              }else if(this.operator == OperatorsEnum.GREATER_THAN || 
                  this.operator == OperatorsEnum.GREATER_THAN_OR_EQUAL_TO ||
                  this.operator == OperatorsEnum.LESS_THAN ||
                  this.operator == OperatorsEnum.LESS_THAN_OR_EQUAL_TO
              ){
                  let sqlOperator = this.operator == OperatorsEnum.GREATER_THAN ? ">" :
                      this.operator == OperatorsEnum.GREATER_THAN_OR_EQUAL_TO ? ">=" :
                      this.operator == OperatorsEnum.LESS_THAN ? "<" : "<=";
                  if(Number.isFinite(this.propertyValue)){                    
                      return `CAST(${columnName} AS FLOAT) ${sqlOperator} ${this.propertyValue}`;
                  }else{
                      throw new Error(`Property value must be a number when ${this.operator} operator is used.`);
                  }                
              }
          }        

          throw new Error("Unable to evaluate the underlying filter expression.");
      }
  }

  /**
   * Enum for SQL compatible data types.
   * @readonly
   * @class DataTypesEnum
   * @property {string} BOOLEAN - TRUE or FALSE.
   * @property {string} INTEGER - Signed integer.
   * @property {string} STRING - UTF8-encoded variable-length string.
   * @property {string} FLOAT - Floating point number.
   * @property {string} TIMESTAMP - W3C date and time formats.
   */
  const DataTypesEnum = Object.freeze({
      BOOLEAN: "BOOLEAN",
      INTEGER: "INTEGER",
      STRING: "STRING",
      FLOAT: "FLOAT",
      TIMESTAMP: "TIMESTAMP",
  });

  /**
   * This class is used to specify or restrict properties to return. It is similar to the SQL SELECT clause.
   * @class PropertySelector
   * @param {string} groupName - Property group name.
   * @param {string} propertyName - Property name.
   * @example
  // Return a property called "Top Offset" in a "Constraints" group.
  let propertySelector1 = new bimU.PropertySelector("Constraints", "Top Offset");
  // Default data type is STRING.
  propertySelector1.type = bimU.DataTypesEnum.FLOAT;
  // Return a property called "Mark" in a "Text" group.
  let propertySelector2 = new bimU.PropertySelector("Text", "Mark");
  // Rename the property name to "Wall Mark" when data is returned.
  propertySelector2.alias = "Wall Mark";
   */
  class PropertySelector {
      constructor(groupName, propertyName) {
          if(arguments.length != 2){
              throw new Error('All arguments are required.');
          }

          /** @member {DataTypesEnum} - Data type casting/conversion. Default is bimU.DataTypesEnum.STRING. */
          this.dataType = DataTypesEnum.STRING;        
          
          /** @member {string} - Property group name */
          this.groupName = groupName;

          /** @member {string} - Property name. */
          this.propertyName = propertyName;

          /** @member {string} - Alias for renaming the property name. It is similar to the SQL AS command. Default is the same as the property name.*/
          this.alias = propertyName;
      }

      /**
       * This method returns a SQL equivalent expression for the underlying selector.
       * @returns {string} SQL select expression.
       */
      getExpressionString(aggregateFunction) {
          if(this.propertyName == null){
              throw new Error('propertyName is required.');
          }

          let columnName = this.groupName ? `"${this.groupName}:${this.propertyName}"` : this.propertyName;
          // Handle reserved character in Parquet format
          columnName.replace(",", "");

          // Handle casting
          if(this.dataType == DataTypesEnum.BOOLEAN){
              columnName = `CAST(${columnName} AS BOOL)`;
          }else if(this.dataType == DataTypesEnum.FLOAT){
              columnName = `CAST(${columnName} AS FLOAT)`;
          }else if(this.dataType == DataTypesEnum.INTEGER){
              columnName = `CAST(${columnName} AS INTEGER)`;
          }else if(this.dataType == DataTypesEnum.TIMESTAMP){
              columnName = `CAST(${columnName} AS TIMESTAMP)`;
          }

          // Handle aggregation
          if(Object.keys(AggregateFunctionsEnum).includes(aggregateFunction)){
              columnName = `${aggregateFunction}(${columnName})`;
          }else if(aggregateFunction != null){
              throw new Error(`Invalid aggregate function: ${aggregateFunction}`);
          }

          // Handle alias
          if((typeof this.alias === 'string' || this.alias instanceof String) && this.alias.length > 0){
              columnName += ` AS "${this.alias}"`;
          }

          return columnName;
      }
  }

  /**
   * zoomTo functions grabbed from Potree.js (FIXME)
   **/
  const attachZoomToFunctions = function () {
  	THREE.PerspectiveCamera.prototype.zoomTo = function (node, factor) {
  		if (!node.geometry && !node.boundingSphere && !node.boundingBox) {
  			return;
  		}
  	
  		if (node.geometry && node.geometry.boundingSphere === null) {
  			node.geometry.computeBoundingSphere();
  		}
  	
  		node.updateMatrixWorld();
  	
  		let bs;
  	
  		if (node.boundingSphere) {
  			bs = node.boundingSphere;
  		} else if (node.geometry && node.geometry.boundingSphere) {
  			bs = node.geometry.boundingSphere;
  		} else {
  			bs = new THREE.Sphere();
  			node.boundingBox.getBoundingSphere(bs);
  		}
  	
  		let _factor = factor || 1;
  	
  		bs = bs.clone().applyMatrix4(node.matrixWorld);
  		let radius = bs.radius;
  		let fovr = this.fov * Math.PI / 180;
  	
  		if (this.aspect < 1) {
  			fovr = fovr * this.aspect;
  		}
  	
  		let distanceFactor = Math.abs(radius / Math.sin(fovr / 2)) * _factor;
  	
  		let worldDirection = new THREE.Vector3();
  		this.getWorldDirection(worldDirection);
  		let offset = worldDirection.multiplyScalar(-distanceFactor);
  		this.position.copy(bs.center.clone().add(offset));
  		this.updateProjectionMatrix();
  	};
  	
  	
  	THREE.OrthographicCamera.prototype.zoomTo = function( node, factor = 1){
  	
  		if (!node.geometry && !node.boundingSphere && !node.boundingBox) {
  			return;
  		}
  	
  		if (node.geometry && node.geometry.boundingSphere === null) {
  			node.geometry.computeBoundingSphere();
  		}
  	
  		node.updateMatrixWorld();
  	
  		let bs;
  	
  		if (node.boundingSphere) {
  			bs = node.boundingSphere;
  		} else if (node.geometry && node.geometry.boundingSphere) {
  			bs = node.geometry.boundingSphere;
  		} else {
  			bs = new THREE.Sphere();
  			node.boundingBox.getBoundingSphere(bs);
  		}
  	
  		let _factor = factor || 1;
  	
  		bs = bs.clone().applyMatrix4(node.matrixWorld);
  		let radius = bs.radius;
  		this.zoom = Math.abs(this.top - this.bottom) / ( radius * 2 ) * _factor; // since aspect ratio > 1
  		let worldDirection = new THREE.Vector3();
  		this.getWorldDirection(worldDirection);
  		let offset = worldDirection.multiplyScalar(-_factor);
  		this.position.copy(bs.center.clone().add(offset));
  		this.updateProjectionMatrix();
  	};
  };

  /**
   *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
   *
   *	A general perpose camera, for setting FOV, Lens Focal Length,
   *		and switching between perspective and orthographic views easily.
   *		Use this only if you do not wish to manage
   *		both a Orthographic and Perspective Camera
   *
   */


  var CombinedCamera = function ( width, height, fov, near, far, orthoNear, orthoFar ) {

  	attachZoomToFunctions();

  	THREE.Camera.call( this );

  	this.fov = fov;

  	this.left = - width / 2;
  	this.right = width / 2;
  	this.top = height / 2;
  	this.bottom = - height / 2;

  	// We could also handle the projectionMatrix internally, but just wanted to test nested camera objects

  	this.cameraO = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 	orthoNear, orthoFar );
  	this.cameraP = new THREE.PerspectiveCamera( fov, width / height, near, far );

  	this.zoom = 1;

  	this.toPerspective();

  };

  CombinedCamera.prototype = Object.create( THREE.Camera.prototype );
  CombinedCamera.prototype.constructor = CombinedCamera;

  CombinedCamera.prototype.toPerspective = function () {

  	// Switches to the Perspective Camera

  	this.near = this.cameraP.near;
  	this.far = this.cameraP.far;

  	this.cameraP.fov =  this.fov / this.zoom ;

  	this.cameraP.updateProjectionMatrix();

  	this.projectionMatrix = this.cameraP.projectionMatrix;

  	this.isPerspectiveMode = true;
  	this.inOrthographicMode = false;

  };

  CombinedCamera.prototype.toOrthographic = function () {

  	// Switches to the Orthographic camera estimating viewport from Perspective

  	var fov = this.fov;
  	var aspect = this.cameraP.aspect;
  	var near = this.cameraP.near;
  	var far = this.cameraP.far;

  	// The size that we set is the mid plane of the viewing frustum

  	var hyperfocus = ( near + far ) / 2;

  	var halfHeight = Math.tan( fov * Math.PI / 180 / 2 ) * hyperfocus;
  	var halfWidth = halfHeight * aspect;

  	halfHeight /= this.zoom;
  	halfWidth /= this.zoom;

  	this.cameraO.left = - halfWidth;
  	this.cameraO.right = halfWidth;
  	this.cameraO.top = halfHeight;
  	this.cameraO.bottom = - halfHeight;

  	// this.cameraO.left = -farHalfWidth;
  	// this.cameraO.right = farHalfWidth;
  	// this.cameraO.top = farHalfHeight;
  	// this.cameraO.bottom = -farHalfHeight;

  	// this.cameraO.left = this.left / this.zoom;
  	// this.cameraO.right = this.right / this.zoom;
  	// this.cameraO.top = this.top / this.zoom;
  	// this.cameraO.bottom = this.bottom / this.zoom;

  	this.cameraO.updateProjectionMatrix();

  	this.near = this.cameraO.near;
  	this.far = this.cameraO.far;
  	this.projectionMatrix = this.cameraO.projectionMatrix;

  	this.isPerspectiveMode = false;
  	this.inOrthographicMode = true;

  };


  CombinedCamera.prototype.setSize = function( width, height ) {

  	this.cameraP.aspect = width / height;
  	this.left = - width / 2;
  	this.right = width / 2;
  	this.top = height / 2;
  	this.bottom = - height / 2;

  };


  CombinedCamera.prototype.setFov = function( fov ) {

  	this.fov = fov;

  	if ( this.isPerspectiveMode ) {

  		this.toPerspective();

  	} else {

  		this.toOrthographic();

  	}

  };

  // For maintaining similar API with PerspectiveCamera

  CombinedCamera.prototype.updateProjectionMatrix = function() {

  	if ( this.isPerspectiveMode ) {

  		this.toPerspective();

  	} else {

  		this.toPerspective();
  		this.toOrthographic();

  	}

  };

  /*
  * Uses Focal Length (in mm) to estimate and set FOV
  * 35mm (full frame) camera is used if frame size is not specified;
  * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
  */
  CombinedCamera.prototype.setLens = function ( focalLength, filmGauge ) {

  	if ( filmGauge === undefined ) filmGauge = 35;

  	var vExtentSlope = 0.5 * filmGauge /
  			( focalLength * Math.max( this.cameraP.aspect, 1 ) );

  	var fov = THREE.MathUtils.RAD2DEG * 2 * Math.atan( vExtentSlope );

  	this.setFov( fov );

  	return fov;

  };


  CombinedCamera.prototype.setZoom = function( zoom ) {

  	this.zoom = zoom;

  	if ( this.isPerspectiveMode ) {

  		this.toPerspective();

  	} else {

  		this.toOrthographic();

  	}

  };

  CombinedCamera.prototype.toFrontView = function() {

  	this.rotation.x = 0;
  	this.rotation.y = 0;
  	this.rotation.z = 0;

  	// should we be modifing the matrix instead?

  };

  CombinedCamera.prototype.toBackView = function() {

  	this.rotation.x = 0;
  	this.rotation.y = Math.PI;
  	this.rotation.z = 0;

  };

  CombinedCamera.prototype.toLeftView = function() {

  	this.rotation.x = 0;
  	this.rotation.y = - Math.PI / 2;
  	this.rotation.z = 0;

  };

  CombinedCamera.prototype.toRightView = function() {

  	this.rotation.x = 0;
  	this.rotation.y = Math.PI / 2;
  	this.rotation.z = 0;

  };

  CombinedCamera.prototype.toTopView = function() {

  	this.rotation.x = - Math.PI / 2;
  	this.rotation.y = 0;
  	this.rotation.z = 0;

  };

  CombinedCamera.prototype.toBottomView = function() {

  	this.rotation.x = Math.PI / 2;
  	this.rotation.y = 0;
  	this.rotation.z = 0;

  };

  /**
   * @author qiao / https://github.com/qiao
   * @author mrdoob / http://mrdoob.com
   * @author alteredq / http://alteredqualia.com/
   * @author WestLangley / http://github.com/WestLangley
   * @author erich666 / http://erichaines.com
   */

  // This set of controls performs orbiting, dollying (zooming), and panning.
  // Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
  //
  //    Orbit - left mouse / touch: one-finger move
  //    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
  //    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

  var OrbitControls = function ( object, domElement ) {

  	this.object = object;

  	this.domElement = ( domElement !== undefined ) ? domElement : document;

  	// Set to false to disable this control
  	this.enabled = true;

  	// "target" sets the location of focus, where the object orbits around
  	this.target = new THREE.Vector3();

  	// "previousTarget" is where the camera is looking at (by default the same as target)
  	this.previousTarget = new THREE.Vector3();

  	// Whether the camera should be locked to the orbit center
  	this.coupleCenters = true;

  	// How far you can dolly in and out ( PerspectiveCamera only )
  	this.minDistance = 0;
  	this.maxDistance = Infinity;

  	// How far you can zoom in and out ( OrthographicCamera only )
  	this.minZoom = 0;
  	this.maxZoom = Infinity;

  	// How far you can orbit vertically, upper and lower limits.
  	this.minPolarAngle = -Infinity; // radians
  	this.maxPolarAngle = Infinity; // radians

  	// How far you can orbit horizontally, upper and lower limits.
  	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
  	this.minAzimuthAngle = -Infinity; // radians
  	this.maxAzimuthAngle = Infinity; // radians

  	// For camera up vector and orbit phi/theta direction toggle
  	this.phiDirectionToggle = 1;
  	this.thetaDirectionToggle = 1;
  	this.thetaChangeCounter = 0;

  	// Set to true to enable damping (inertia)
  	// If damping is enabled, you must call controls.update() in your animation loop
  	this.enableDamping = false;
  	this.dampingFactor = 0.25;

  	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  	// Set to false to disable zooming
  	this.enableZoom = true; // Mouse and touch
  	this.enableMouseZoom = true; // Only mouse
  	this.zoomSpeed = 1.0;

  	// Set to false to disable rotating
  	this.enableRotate = true;
  	this.rotateSpeed = 1.0;

  	// Set to false to disable panning
  	this.enablePan = true;
  	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

  	// Set to true to automatically rotate around the target
  	// If auto-rotate is enabled, you must call controls.update() in your animation loop
  	this.autoRotate = false;
  	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

  	// Set to false to disable use of the keys
  	this.enableKeys = true;

  	// The four arrow keys
  	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

  	// Mouse buttons
  	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT, PAN_ALTERNATIVE: THREE.MOUSE.MIDDLE };

  	// for reset
  	this.target0 = this.target.clone();
  	this.position0 = this.object.position.clone();
  	this.zoom0 = this.object.zoom;

  	//
  	// public methods
  	//

  	this.getPolarAngle = function () {

  		return spherical.phi;

  	};

  	this.getAzimuthalAngle = function () {

  		return spherical.theta;

  	};

  	this.reset = function () {

  		scope.target.copy( scope.target0 );
  		scope.object.position.copy( scope.position0 );
  		scope.object.zoom = scope.zoom0;

  		scope.object.updateProjectionMatrix();
  		scope.dispatchEvent( changeEvent );

  		scope.update();

  		state = STATE.NONE;

  	};

  	// this method is exposed, but perhaps it would be better if we can make it private...
  	this.update = function () {

  		var offset = new THREE.Vector3();
  		var previousTargetOffset = new THREE.Vector3();

  		var cameraDirection = new THREE.Vector3();
  		var cameraPlaneNormal = new THREE.Vector3();
  		var cameraPlane = new THREE.Plane();
  		var projectedVector = new THREE.Vector3();
  		var inclinationCenter = new THREE.Vector3();

  		// so camera.up is the orbit axis
  		var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
  		var quatInverse = quat.clone().inverse();

  		var lastPosition = new THREE.Vector3();
  		var lastQuaternion = new THREE.Quaternion();

  		// TODO: should avoid unnecessary update based on mode (i.e., pan/rotate/zoom)?
  		return function update() {

  			var position = scope.object.position;
  			var previousTarget = scope.previousTarget;

  			if(!previousTarget.equals(scope.target)){
  				// STEP 1: HANDLE INCLINATION (VERTICAL MOUSE MOVEMENT)

  				// vector from camera position to camera target			
  				//cameraDirection.subVectors(previousTarget, position);
  				scope.object.getWorldDirection( cameraDirection );

  				// determine rotation center of inclination
  				cameraPlaneNormal.crossVectors(scope.object.up, cameraDirection).normalize();
  				cameraPlane.setFromNormalAndCoplanarPoint(cameraPlaneNormal, position);
  				cameraPlane.projectPoint(scope.target, inclinationCenter);					

  				// see if inclination center is outside camera direction vector
  				projectedVector.subVectors(inclinationCenter, position).projectOnVector(cameraDirection);
  				var isOutside = projectedVector.lengthSq() > cameraDirection.lengthSq();

  				// rotate around inclination center
  				offset.copy( position ).sub( inclinationCenter );
  				previousTargetOffset.copy( previousTarget ).sub( inclinationCenter );
  				
  				// limit inclination rotation
  				var originalAngle = cameraDirection.angleTo(scope.object.up);			
  				var newAngle = originalAngle - sphericalDelta.phi;
  				if (newAngle > this.minPolarAngle && newAngle < this.maxPolarAngle) {
  					if(newAngle < 0 || newAngle > Math.PI){
  						scope.phiDirectionToggle *= -1;
  						scope.thetaChangeCounter++;
  						scope.object.up.set( 0, 0, scope.phiDirectionToggle );
  					}
  					offset.applyAxisAngle(cameraPlane.normal, -sphericalDelta.phi);				
  					previousTargetOffset.applyAxisAngle(cameraPlane.normal, isOutside ? -sphericalDelta.phi : sphericalDelta.phi);
  				}

  				// get camera position and target
  				position.copy( inclinationCenter ).add( offset );
  				previousTarget.copy( inclinationCenter ).add( previousTargetOffset );			

  				// STEP 2: HANDLE AZIMUTH (HORIZONTAL MOUSE MOVEMENT)

  				offset.copy( position ).sub( scope.target );
  				previousTargetOffset.copy( previousTarget ).sub( scope.target );

  				// rotate offset to "y-axis-is-up" space
  				offset.applyQuaternion( quat );
  				previousTargetOffset.applyQuaternion( quat );

  				// angle from z-axis around y-axis
  				spherical.setFromVector3( offset );
  				previousTargetSpherical.setFromVector3( previousTargetOffset );

  				// grab theta only
  				spherical.theta += sphericalDelta.theta * scope.thetaDirectionToggle;			
  				previousTargetSpherical.theta += sphericalDelta.theta * scope.thetaDirectionToggle;

  				// this is probably useless since we handle zooming separately
  				spherical.radius *= scale;
  				previousTargetSpherical.radius *= scale;

  				// restrict radius to be between desired limits
  				spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );
  				previousTargetSpherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, previousTargetSpherical.radius ) );

  				// move target to panned location
  				scope.target.add( panOffset );
  				previousTarget.add( panOffset );

  				offset.setFromSpherical( spherical );
  				previousTargetOffset.setFromSpherical( previousTargetSpherical );

  				// rotate offset back to "camera-up-vector-is-up" space
  				offset.applyQuaternion( quatInverse );
  				previousTargetOffset.applyQuaternion( quatInverse );

  				position.copy( scope.target ).add( offset );
  				previousTarget.copy( scope.target ).add( previousTargetOffset );

  				/*// vector from camera position to camera target			
  				cameraDirection.subVectors(previousTarget, position);

  				// determine rotation center of inclination
  				cameraPlaneNormal.crossVectors(scope.object.up, cameraDirection).normalize();
  				cameraPlane.setFromNormalAndCoplanarPoint(cameraPlaneNormal, position);
  				cameraPlane.projectPoint(scope.target, inclinationCenter);*/
  			}else{
  				offset.copy( position ).sub( scope.target );

  				// rotate offset to "y-axis-is-up" space
  				offset.applyQuaternion( quat );

  				// angle from z-axis around y-axis
  				spherical.setFromVector3( offset );

  				// handle polar angle (phi) flip beyond 0 - 180 degrees
  				var phiAfterOrbit = spherical.phi + sphericalDelta.phi * scope.phiDirectionToggle;
  				if(phiAfterOrbit < 0 || phiAfterOrbit > Math.PI){
  					if(phiAfterOrbit <= 0){
  						spherical.phi = Math.abs(phiAfterOrbit);
  					}else if(phiAfterOrbit >= Math.PI){
  						spherical.phi = 2 * Math.PI - phiAfterOrbit;					
  					}
  					spherical.theta += sphericalDelta.theta * scope.thetaDirectionToggle + Math.PI;
  					scope.phiDirectionToggle *= -1;
  					scope.thetaChangeCounter++;
  					scope.object.up.set( 0, 0, scope.phiDirectionToggle );
  				}else{
  					spherical.phi += sphericalDelta.phi * scope.phiDirectionToggle;
  					spherical.theta += sphericalDelta.theta * scope.thetaDirectionToggle;				
  				}

  				// restrict theta to be between desired limits
  				spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

  				// restrict phi to be between desired limits
  				spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

  				//spherical.makeSafe();

  				// move target to panned location
  				scope.target.add( panOffset );

  				offset.setFromSpherical( spherical );

  				// rotate offset back to "camera-up-vector-is-up" space				
  				offset.applyQuaternion( quatInverse );				

  				position.copy( scope.target ).add( offset );		
  			}			

  			// STEP 3: SET CAMERA TARGET BASED ON MODE (PAN OR ROTATE)

  			if( scope.coupleCenters ){				
  				scope.object.lookAt( scope.target );				
  			}else{
  				scope.object.lookAt( previousTarget );
  			}

  			if ( scope.enableDamping === true ) {

  				sphericalDelta.theta *= ( 1 - scope.dampingFactor );
  				sphericalDelta.phi *= ( 1 - scope.dampingFactor );

  			} else {

  				sphericalDelta.set( 0, 0, 0 );

  			}

  			scale = 1;
  			panOffset.set( 0, 0, 0 );

  			// update condition is:
  			// min(camera displacement, camera rotation in radians)^2 > EPS
  			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

  			if ( zoomChanged ||
  				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
  				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

  				scope.dispatchEvent( changeEvent );

  				lastPosition.copy( scope.object.position );
  				lastQuaternion.copy( scope.object.quaternion );
  				zoomChanged = false;

  				return true;

  			}

  			return false;

  		};

  	}();

  	this.dispose = function () {

  		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
  		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
  		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

  		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
  		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
  		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

  		document.removeEventListener( 'mousemove', onMouseMove, false );
  		document.removeEventListener( 'mouseup', onMouseUp, false );

  		window.removeEventListener( 'keydown', onKeyDown, false );

  		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

  	};

  	//
  	// internals
  	//

  	var scope = this;

  	var changeEvent = { type: 'change' };
  	var startEvent = { type: 'start' };
  	var endEvent = { type: 'end' };

  	var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 };

  	var state = STATE.NONE;

  	var EPS = 0.000001;

  	// current position in spherical coordinates
  	var spherical = new THREE.Spherical();
  	var previousTargetSpherical = new THREE.Spherical();
  	var sphericalDelta = new THREE.Spherical();

  	var scale = 1;
  	var panOffset = new THREE.Vector3();
  	var zoomChanged = false;

  	var rotateStart = new THREE.Vector2();
  	var rotateEnd = new THREE.Vector2();
  	var rotateDelta = new THREE.Vector2();

  	var panStart = new THREE.Vector2();
  	var panEnd = new THREE.Vector2();
  	var panDelta = new THREE.Vector2();

  	var dollyStart = new THREE.Vector2();
  	var dollyEnd = new THREE.Vector2();
  	var dollyDelta = new THREE.Vector2();

  	function getZoomScale() {

  		return Math.pow( 0.95, scope.zoomSpeed );

  	}

  	function rotateLeft( angle ) {

  		sphericalDelta.theta -= angle;

  	}

  	function rotateUp( angle ) {

  		sphericalDelta.phi -= angle;

  	}

  	var panLeft = function () {

  		var v = new THREE.Vector3();

  		return function panLeft( distance, objectMatrix ) {

  			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
  			v.multiplyScalar( - distance );

  			panOffset.add( v );

  		};

  	}();

  	var panUp = function () {

  		var v = new THREE.Vector3();

  		return function panUp( distance, objectMatrix ) {

  			v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
  			v.multiplyScalar( distance );

  			panOffset.add( v );

  		};

  	}();

  	// deltaX and deltaY are in pixels; right and down are positive
  	var pan = function () {

  		var offset = new THREE.Vector3();

  		return function pan( deltaX, deltaY ) {

  			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

  			if ( scope.object instanceof THREE.PerspectiveCamera ) {

  				// perspective
  				var position = scope.object.position;
  				offset.copy( position ).sub( scope.target );
  				var targetDistance = offset.length();

  				// half of the fov is center to top of screen
  				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

  				// we actually don't use screenWidth, since perspective camera is fixed to screen height
  				panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
  				panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

  			} else if ( scope.object instanceof THREE.OrthographicCamera ) {

  				// orthographic
  				panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
  				panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

  			} else {

  				// camera neither orthographic nor perspective
  				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
  				scope.enablePan = false;

  			}

  		};

  	}();

  	function dollyIn( dollyScale ) {

  		if ( scope.object instanceof THREE.PerspectiveCamera ) {

  			scale /= dollyScale;

  		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

  			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
  			scope.object.updateProjectionMatrix();
  			zoomChanged = true;

  		} else {

  			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
  			scope.enableZoom = false;

  		}

  	}

  	function dollyOut( dollyScale ) {

  		if ( scope.object instanceof THREE.PerspectiveCamera ) {

  			scale *= dollyScale;

  		} else if ( scope.object instanceof THREE.OrthographicCamera ) {

  			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
  			scope.object.updateProjectionMatrix();
  			zoomChanged = true;

  		} else {

  			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
  			scope.enableZoom = false;

  		}

  	}

  	//
  	// event callbacks - update the object state
  	//

  	function handleMouseDownRotate( event ) {

  		//console.log( 'handleMouseDownRotate' );
  		scope.thetaChangeCounter = 0;

  		rotateStart.set( event.clientX, event.clientY );

  	}

  	function handleMouseDownDolly( event ) {

  		//console.log( 'handleMouseDownDolly' );

  		dollyStart.set( event.clientX, event.clientY );

  	}

  	function handleMouseDownPan( event ) {

  		//console.log( 'handleMouseDownPan' );

  		panStart.set( event.clientX, event.clientY );

  	}

  	function handleMouseMoveRotate( event ) {

  		//console.log( 'handleMouseMoveRotate' );

  		rotateEnd.set( event.clientX, event.clientY );
  		rotateDelta.subVectors( rotateEnd, rotateStart );

  		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

  		// rotating across whole screen goes 360 degrees around
  		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

  		// rotating up and down along whole screen attempts to go 360, but limited to 180
  		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

  		rotateStart.copy( rotateEnd );

  		scope.update();

  	}

  	function handleMouseMoveDolly( event ) {

  		//console.log( 'handleMouseMoveDolly' );

  		dollyEnd.set( event.clientX, event.clientY );

  		dollyDelta.subVectors( dollyEnd, dollyStart );

  		if ( dollyDelta.y > 0 ) {

  			dollyIn( getZoomScale() );

  		} else if ( dollyDelta.y < 0 ) {

  			dollyOut( getZoomScale() );

  		}

  		dollyStart.copy( dollyEnd );

  		scope.update();

  	}

  	function handleMouseMovePan( event ) {

  		//console.log( 'handleMouseMovePan' );

  		panEnd.set( event.clientX, event.clientY );

  		panDelta.subVectors( panEnd, panStart );

  		pan( panDelta.x, panDelta.y );

  		panStart.copy( panEnd );

  		scope.update();

  	}

  	function handleMouseUp( event ) {

  		//console.log( 'handleMouseUp' );
  		
  		var thetaDirectionNeedsChange = (scope.thetaChangeCounter % 2) == 1;
  		if(thetaDirectionNeedsChange){
  			scope.thetaDirectionToggle *= -1;
  		}

  	}

  	function handleMouseWheel( event ) {

  		// console.log( 'handleMouseWheel' );

  		if ( event.deltaY < 0 ) {

  			dollyOut( getZoomScale() );

  		} else if ( event.deltaY > 0 ) {

  			dollyIn( getZoomScale() );

  		}

  		scope.update();

  	}

  	function handleKeyDown( event ) {

  		//console.log( 'handleKeyDown' );

  		switch ( event.keyCode ) {

  			case scope.keys.UP:
  				pan( 0, scope.keyPanSpeed );
  				scope.update();
  				break;

  			case scope.keys.BOTTOM:
  				pan( 0, - scope.keyPanSpeed );
  				scope.update();
  				break;

  			case scope.keys.LEFT:
  				pan( scope.keyPanSpeed, 0 );
  				scope.update();
  				break;

  			case scope.keys.RIGHT:
  				pan( - scope.keyPanSpeed, 0 );
  				scope.update();
  				break;

  		}

  	}

  	function handleTouchStartRotate( event ) {

  		//console.log( 'handleTouchStartRotate' );

  		rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

  	}

  	function handleTouchStartDollyPan( event ) {

  		//console.log( 'handleTouchStartDollyPan' );

  		if ( scope.enableZoom ) {

  			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
  			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

  			var distance = Math.sqrt( dx * dx + dy * dy );

  			dollyStart.set( 0, distance );

  		}

  		if ( scope.enablePan ) {

  			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
  			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

  			panStart.set( x, y );

  		}

  	}

  	function handleTouchMoveRotate( event ) {

  		//console.log( 'handleTouchMoveRotate' );

  		rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

  		rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

  		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

  		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

  		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

  		rotateStart.copy( rotateEnd );

  		scope.update();

  	}

  	function handleTouchMoveDollyPan( event ) {

  		//console.log( 'handleTouchMoveDollyPan' );

  		if ( scope.enableZoom ) {

  			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
  			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

  			var distance = Math.sqrt( dx * dx + dy * dy );

  			dollyEnd.set( 0, distance );

  			dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

  			dollyIn( dollyDelta.y );

  			dollyStart.copy( dollyEnd );

  		}

  		if ( scope.enablePan ) {

  			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
  			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

  			panEnd.set( x, y );

  			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

  			pan( panDelta.x, panDelta.y );

  			panStart.copy( panEnd );

  		}

  		scope.update();

  	}

  	//
  	// event handlers - FSM: listen for events and reset state
  	//

  	function onMouseDown( event ) {

  		if ( scope.enabled === false ) return;

  		event.preventDefault();

  		if ( event.button === scope.mouseButtons.ORBIT ) {

  			if ( scope.enableRotate === false ) return;

  			handleMouseDownRotate( event );

  			state = STATE.ROTATE;

  		} else if ( event.button === scope.mouseButtons.PAN || event.button === scope.mouseButtons.PAN_ALTERNATIVE ) {

  			if ( scope.enablePan === false ) return;

  			handleMouseDownPan( event );

  			state = STATE.PAN;
   
  		} else if ( event.button === scope.mouseButtons.ZOOM ) {

  			if ( scope.enableZoom === false || scope.enableMouseZoom === false ) return;

  			handleMouseDownDolly( event );

  			state = STATE.DOLLY;

  		}

  		if ( state !== STATE.NONE ) {

  			document.addEventListener( 'mousemove', onMouseMove, false );
  			document.addEventListener( 'mouseup', onMouseUp, false );

  			scope.dispatchEvent( startEvent );

  		}

  	}

  	function onMouseMove( event ) {

  		if ( scope.enabled === false ) return;

  		event.preventDefault();

  		if ( state === STATE.ROTATE ) {

  			if ( scope.enableRotate === false ) return;

  			handleMouseMoveRotate( event );

  		} else if ( state === STATE.DOLLY ) {

  			if ( scope.enableZoom === false || scope.enableMouseZoom === false ) return;

  			handleMouseMoveDolly( event );

  		} else if ( state === STATE.PAN ) {

  			if ( scope.enablePan === false ) return;

  			handleMouseMovePan( event );

  		}

  	}

  	function onMouseUp( event ) {

  		if ( scope.enabled === false ) return;

  		handleMouseUp();

  		document.removeEventListener( 'mousemove', onMouseMove, false );
  		document.removeEventListener( 'mouseup', onMouseUp, false );

  		scope.dispatchEvent( endEvent );

  		state = STATE.NONE;

  	}

  	function onMouseWheel( event ) {

  		if ( scope.enabled === false || scope.enableZoom === false || scope.enableMouseZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

  		event.preventDefault();
  		event.stopPropagation();

  		handleMouseWheel( event );

  		scope.dispatchEvent( startEvent ); // not sure why these are here...
  		scope.dispatchEvent( endEvent );

  	}

  	function onKeyDown( event ) {

  		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

  		handleKeyDown( event );

  	}

  	function onTouchStart( event ) {

  		if ( scope.enabled === false ) return;

  		event.preventDefault();

  		switch ( event.touches.length ) {

  			case 1:	// one-fingered touch: rotate

  				if ( scope.enableRotate === false ) return;

  				handleTouchStartRotate( event );

  				state = STATE.TOUCH_ROTATE;

  				break;

  			case 2:	// two-fingered touch: dolly-pan

  				if ( scope.enableZoom === false && scope.enablePan === false ) return;

  				handleTouchStartDollyPan( event );

  				state = STATE.TOUCH_DOLLY_PAN;

  				break;

  			default:

  				state = STATE.NONE;

  		}

  		if ( state !== STATE.NONE ) {

  			scope.dispatchEvent( startEvent );

  		}

  	}

  	function onTouchMove( event ) {

  		if ( scope.enabled === false ) return;

  		event.preventDefault();
  		event.stopPropagation();

  		switch ( event.touches.length ) {

  			case 1: // one-fingered touch: rotate

  				if ( scope.enableRotate === false ) return;
  				if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?

  				handleTouchMoveRotate( event );

  				break;

  			case 2: // two-fingered touch: dolly-pan

  				if ( scope.enableZoom === false && scope.enablePan === false ) return;
  				if ( state !== STATE.TOUCH_DOLLY_PAN ) return; // is this needed?

  				handleTouchMoveDollyPan( event );

  				break;

  			default:

  				state = STATE.NONE;

  		}

  	}

  	function onTouchEnd( event ) {

  		if ( scope.enabled === false ) return;

  		scope.dispatchEvent( endEvent );

  		state = STATE.NONE;

  	}

  	function onContextMenu( event ) {

  		event.preventDefault();

  	}

  	//

  	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

  	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
  	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

  	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
  	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
  	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

  	window.addEventListener( 'keydown', onKeyDown, false );

  	// force an update at start

  	this.update();

  };

  OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
  OrbitControls.prototype.constructor = OrbitControls;

  Object.defineProperties( OrbitControls.prototype, {

  	center: {

  		get: function () {

  			console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
  			return this.target;

  		}

  	},

  	// backward compatibility

  	noZoom: {

  		get: function () {

  			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
  			return ! this.enableZoom;

  		},

  		set: function ( value ) {

  			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
  			this.enableZoom = ! value;

  		}

  	},

  	noRotate: {

  		get: function () {

  			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
  			return ! this.enableRotate;

  		},

  		set: function ( value ) {

  			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
  			this.enableRotate = ! value;

  		}

  	},

  	noPan: {

  		get: function () {

  			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
  			return ! this.enablePan;

  		},

  		set: function ( value ) {

  			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
  			this.enablePan = ! value;

  		}

  	},

  	noKeys: {

  		get: function () {

  			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
  			return ! this.enableKeys;

  		},

  		set: function ( value ) {

  			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
  			this.enableKeys = ! value;

  		}

  	},

  	staticMoving: {

  		get: function () {

  			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
  			return ! this.enableDamping;

  		},

  		set: function ( value ) {

  			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
  			this.enableDamping = ! value;

  		}

  	},

  	dynamicDampingFactor: {

  		get: function () {

  			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
  			return this.dampingFactor;

  		},

  		set: function ( value ) {

  			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
  			this.dampingFactor = value;

  		}

  	}

  } );

  /**
   * @author arodic / https://github.com/arodic
   */
  /**
   * Modified for bimU.io
   */
   /*jshint sub:true*/

  var GizmoMaterial = function ( parameters ) {

      THREE.MeshBasicMaterial.call( this );

      this.depthTest = false;
      this.depthWrite = false;
      this.side = THREE.FrontSide;
      this.transparent = true;

      this.setValues( parameters );

      this.oldColor = this.color.clone();
      this.oldOpacity = this.opacity;

      this.highlight = function( highlighted ) {

          if ( highlighted ) {

              this.color.setRGB( 1, 1, 0 );
              this.opacity = 1;

          } else {

              this.color.copy( this.oldColor );
              this.opacity = this.oldOpacity;

          }

      };

  };

  GizmoMaterial.prototype = Object.create( THREE.MeshBasicMaterial.prototype );
  GizmoMaterial.prototype.constructor = GizmoMaterial;


  var GizmoLineMaterial = function ( parameters ) {

      THREE.LineBasicMaterial.call( this );

      this.depthTest = false;
      this.depthWrite = false;
      this.transparent = true;
      this.linewidth = 1;

      this.setValues( parameters );

      this.oldColor = this.color.clone();
      this.oldOpacity = this.opacity;

      this.highlight = function( highlighted ) {

          if ( highlighted ) {

              this.color.setRGB( 1, 1, 0 );
              this.opacity = 1;

          } else {

              this.color.copy( this.oldColor );
              this.opacity = this.oldOpacity;

          }

      };

  };

  GizmoLineMaterial.prototype = Object.create( THREE.LineBasicMaterial.prototype );
  GizmoLineMaterial.prototype.constructor = GizmoLineMaterial;


  var pickerMaterial = new GizmoMaterial( { visible: false, transparent: false } );


  THREE.TransformGizmo = function () {

      this.init = function () {

          THREE.Object3D.call( this );

          this.handles = new THREE.Object3D();
          this.pickers = new THREE.Object3D();
          this.planes = new THREE.Object3D();

          this.add( this.handles );
          this.add( this.pickers );
          this.add( this.planes );

          //// PLANES

          var planeGeometry = new THREE.PlaneBufferGeometry( 50, 50, 2, 2 );
          var planeMaterial = new THREE.MeshBasicMaterial( { visible: false, side: THREE.DoubleSide } );

          var planes = {
              "XY":   new THREE.Mesh( planeGeometry, planeMaterial ),
              "YZ":   new THREE.Mesh( planeGeometry, planeMaterial ),
              "XZ":   new THREE.Mesh( planeGeometry, planeMaterial ),
              "XYZE": new THREE.Mesh( planeGeometry, planeMaterial )
          };

          this.activePlane = planes[ "XYZE" ];

          planes[ "YZ" ].rotation.set( 0, Math.PI / 2, 0 );
          planes[ "XZ" ].rotation.set( - Math.PI / 2, 0, 0 );

          for ( var i in planes ) {

              planes[ i ].name = i;
              this.planes.add( planes[ i ] );
              this.planes[ i ] = planes[ i ];

          }

          //// HANDLES AND PICKERS

          var setupGizmos = function( gizmoMap, parent ) {

              for ( var name in gizmoMap ) {

                  for ( i = gizmoMap[ name ].length; i --; ) {

                      var object = gizmoMap[ name ][ i ][ 0 ];
                      var position = gizmoMap[ name ][ i ][ 1 ];
                      var rotation = gizmoMap[ name ][ i ][ 2 ];

                      object.name = name;

                      if ( position ) object.position.set( position[ 0 ], position[ 1 ], position[ 2 ] );
                      if ( rotation ) object.rotation.set( rotation[ 0 ], rotation[ 1 ], rotation[ 2 ] );

                      parent.add( object );

                  }

              }

          };

          setupGizmos( this.handleGizmos, this.handles );
          setupGizmos( this.pickerGizmos, this.pickers );

          // reset Transformations

          this.traverse( function ( child ) {

              if ( child instanceof THREE.Mesh ) {

                  child.updateMatrix();

                  var tempGeometry = child.geometry.clone();
                  tempGeometry.applyMatrix4( child.matrix );
                  child.geometry = tempGeometry;

                  child.position.set( 0, 0, 0 );
                  child.rotation.set( 0, 0, 0 );
                  child.scale.set( 1, 1, 1 );

              }

          } );

      };

      this.highlight = function ( axis ) {

          this.traverse( function( child ) {

              if ( child.material && child.material.highlight ) {

                  if ( child.name === axis ) {

                      child.material.highlight( true );

                  } else {

                      child.material.highlight( false );

                  }

              }

          } );

      };

  };

  THREE.TransformGizmo.prototype = Object.create( THREE.Object3D.prototype );
  THREE.TransformGizmo.prototype.constructor = THREE.TransformGizmo;

  THREE.TransformGizmo.prototype.update = function ( rotation, eye ) {

      var vec1 = new THREE.Vector3( 0, 0, 0 );
      var vec2 = new THREE.Vector3( 0, 1, 0 );
      var lookAtMatrix = new THREE.Matrix4();

      this.traverse( function( child ) {

          if ( child.name.search( "E" ) !== - 1 ) {

              child.quaternion.setFromRotationMatrix( lookAtMatrix.lookAt( eye, vec1, vec2 ) );

          } else if ( child.name.search( "X" ) !== - 1 || child.name.search( "Y" ) !== - 1 || child.name.search( "Z" ) !== - 1 ) {

              child.quaternion.setFromEuler( rotation );

          }

      } );

  };

  THREE.TransformGizmoTranslate = function () {

      THREE.TransformGizmo.call( this );

      var arrowGeometry = new THREE.Geometry();
      var mesh = new THREE.Mesh( new THREE.CylinderGeometry( 0, 0.05, 0.2, 12, 1, false ) );
      mesh.position.y = 0.5;
      mesh.updateMatrix();

      arrowGeometry.merge( mesh.geometry, mesh.matrix );

      var lineXGeometry = new THREE.BufferGeometry();
      lineXGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  1, 0, 0 ], 3 ) );

      var lineYGeometry = new THREE.BufferGeometry();
      lineYGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 1, 0 ], 3 ) );

      var lineZGeometry = new THREE.BufferGeometry();
      lineZGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 0, 1 ], 3 ) );

      this.handleGizmos = {

          X: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xff0000 } ) ), [ 0.5, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ],
              [ new THREE.Line( lineXGeometry, new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
          ],

          Y: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x00ff00 } ) ), [ 0, 0.5, 0 ] ],
              [	new THREE.Line( lineYGeometry, new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
          ],

          Z: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, 0.5 ], [ Math.PI / 2, 0, 0 ] ],
              [ new THREE.Line( lineZGeometry, new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
          ],

          XYZ: [
              [ new THREE.Mesh( new THREE.OctahedronGeometry( 0.1, 0 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ), [ 0, 0, 0 ], [ 0, 0, 0 ] ]
          ],

          XY: [
              [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.29, 0.29 ), new GizmoMaterial( { color: 0xffff00, opacity: 0.25 } ) ), [ 0.15, 0.15, 0 ] ]
          ],

          YZ: [
              [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.29, 0.29 ), new GizmoMaterial( { color: 0x00ffff, opacity: 0.25 } ) ), [ 0, 0.15, 0.15 ], [ 0, Math.PI / 2, 0 ] ]
          ],

          XZ: [
              [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.29, 0.29 ), new GizmoMaterial( { color: 0xff00ff, opacity: 0.25 } ) ), [ 0.15, 0, 0.15 ], [ - Math.PI / 2, 0, 0 ] ]
          ]

      };

      this.pickerGizmos = {

          X: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0.6, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ]
          ],

          Y: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0.6, 0 ] ]
          ],

          Z: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0, 0.6 ], [ Math.PI / 2, 0, 0 ] ]
          ],

          XYZ: [
              [ new THREE.Mesh( new THREE.OctahedronGeometry( 0.2, 0 ), pickerMaterial ) ]
          ],

          XY: [
              [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), pickerMaterial ), [ 0.2, 0.2, 0 ] ]
          ],

          YZ: [
              [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), pickerMaterial ), [ 0, 0.2, 0.2 ], [ 0, Math.PI / 2, 0 ] ]
          ],

          XZ: [
              [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), pickerMaterial ), [ 0.2, 0, 0.2 ], [ - Math.PI / 2, 0, 0 ] ]
          ]

      };

      this.setActivePlane = function ( axis, eye ) {

          var tempMatrix = new THREE.Matrix4();
          eye.applyMatrix4( tempMatrix.getInverse( tempMatrix.extractRotation( this.planes[ "XY" ].matrixWorld ) ) );

          if ( axis === "X" ) {

              this.activePlane = this.planes[ "XY" ];

              if ( Math.abs( eye.y ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "XZ" ];

          }

          if ( axis === "Y" ) {

              this.activePlane = this.planes[ "XY" ];

              if ( Math.abs( eye.x ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "YZ" ];

          }

          if ( axis === "Z" ) {

              this.activePlane = this.planes[ "XZ" ];

              if ( Math.abs( eye.x ) > Math.abs( eye.y ) ) this.activePlane = this.planes[ "YZ" ];

          }

          if ( axis === "XYZ" ) this.activePlane = this.planes[ "XYZE" ];

          if ( axis === "XY" ) this.activePlane = this.planes[ "XY" ];

          if ( axis === "YZ" ) this.activePlane = this.planes[ "YZ" ];

          if ( axis === "XZ" ) this.activePlane = this.planes[ "XZ" ];

      };

      this.init();

  };

  THREE.TransformGizmoTranslate.prototype = Object.create( THREE.TransformGizmo.prototype );
  THREE.TransformGizmoTranslate.prototype.constructor = THREE.TransformGizmoTranslate;

  THREE.TransformGizmoRotate = function () {

      THREE.TransformGizmo.call( this );

      var CircleGeometry = function ( radius, facing, arc ) {

          var geometry = new THREE.BufferGeometry();
          var vertices = [];
          arc = arc ? arc : 1;

          for ( var i = 0; i <= 64 * arc; ++ i ) {

              if ( facing === 'x' ) vertices.push( 0, Math.cos( i / 32 * Math.PI ) * radius, Math.sin( i / 32 * Math.PI ) * radius );
              if ( facing === 'y' ) vertices.push( Math.cos( i / 32 * Math.PI ) * radius, 0, Math.sin( i / 32 * Math.PI ) * radius );
              if ( facing === 'z' ) vertices.push( Math.sin( i / 32 * Math.PI ) * radius, Math.cos( i / 32 * Math.PI ) * radius, 0 );

          }

          geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
          return geometry;

      };

      this.handleGizmos = {

          X: [
              [ new THREE.Line( new CircleGeometry( 1, 'x', 0.5 ), new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
          ],

          Y: [
              [ new THREE.Line( new CircleGeometry( 1, 'y', 0.5 ), new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
          ],

          Z: [
              [ new THREE.Line( new CircleGeometry( 1, 'z', 0.5 ), new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
          ],

          E: [
              [ new THREE.Line( new CircleGeometry( 1.25, 'z', 1 ), new GizmoLineMaterial( { color: 0xcccc00 } ) ) ]
          ],

          XYZE: [
              [ new THREE.Line( new CircleGeometry( 1, 'z', 1 ), new GizmoLineMaterial( { color: 0x787878 } ) ) ]
          ]

      };

      this.pickerGizmos = {

          X: [
              [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), pickerMaterial ), [ 0, 0, 0 ], [ 0, - Math.PI / 2, - Math.PI / 2 ] ]
          ],

          Y: [
              [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), pickerMaterial ), [ 0, 0, 0 ], [ Math.PI / 2, 0, 0 ] ]
          ],

          Z: [
              [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), pickerMaterial ), [ 0, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ]
          ],

          E: [
              [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1.25, 0.12, 2, 24 ), pickerMaterial ) ]
          ],

          XYZE: [
              [ new THREE.Mesh() ]// TODO
          ]

      };

      this.setActivePlane = function ( axis ) {

          if ( axis === "E" ) this.activePlane = this.planes[ "XYZE" ];

          if ( axis === "X" ) this.activePlane = this.planes[ "YZ" ];

          if ( axis === "Y" ) this.activePlane = this.planes[ "XZ" ];

          if ( axis === "Z" ) this.activePlane = this.planes[ "XY" ];

      };

      this.update = function ( rotation, eye2 ) {

          THREE.TransformGizmo.prototype.update.apply( this, arguments );

          var group = {

              handles: this[ "handles" ],
              pickers: this[ "pickers" ]

          };

          var tempMatrix = new THREE.Matrix4();
          var worldRotation = new THREE.Euler( 0, 0, 1 );
          var tempQuaternion = new THREE.Quaternion();
          var unitX = new THREE.Vector3( 1, 0, 0 );
          var unitY = new THREE.Vector3( 0, 1, 0 );
          var unitZ = new THREE.Vector3( 0, 0, 1 );
          var quaternionX = new THREE.Quaternion();
          var quaternionY = new THREE.Quaternion();
          var quaternionZ = new THREE.Quaternion();
          var eye = eye2.clone();

          worldRotation.copy( this.planes[ "XY" ].rotation );
          tempQuaternion.setFromEuler( worldRotation );

          tempMatrix.makeRotationFromQuaternion( tempQuaternion ).getInverse( tempMatrix );
          eye.applyMatrix4( tempMatrix );

          this.traverse( function( child ) {

              tempQuaternion.setFromEuler( worldRotation );

              if ( child.name === "X" ) {

                  quaternionX.setFromAxisAngle( unitX, Math.atan2( - eye.y, eye.z ) );
                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
                  child.quaternion.copy( tempQuaternion );

              }

              if ( child.name === "Y" ) {

                  quaternionY.setFromAxisAngle( unitY, Math.atan2( eye.x, eye.z ) );
                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
                  child.quaternion.copy( tempQuaternion );

              }

              if ( child.name === "Z" ) {

                  quaternionZ.setFromAxisAngle( unitZ, Math.atan2( eye.y, eye.x ) );
                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );
                  child.quaternion.copy( tempQuaternion );

              }

          } );

      };

      this.init();

  };

  THREE.TransformGizmoRotate.prototype = Object.create( THREE.TransformGizmo.prototype );
  THREE.TransformGizmoRotate.prototype.constructor = THREE.TransformGizmoRotate;

  THREE.TransformGizmoScale = function () {

      THREE.TransformGizmo.call( this );

      var arrowGeometry = new THREE.Geometry();
      var mesh = new THREE.Mesh( new THREE.BoxGeometry( 0.125, 0.125, 0.125 ) );
      mesh.position.y = 0.5;
      mesh.updateMatrix();

      arrowGeometry.merge( mesh.geometry, mesh.matrix );

      var lineXGeometry = new THREE.BufferGeometry();
      lineXGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  1, 0, 0 ], 3 ) );

      var lineYGeometry = new THREE.BufferGeometry();
      lineYGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 1, 0 ], 3 ) );

      var lineZGeometry = new THREE.BufferGeometry();
      lineZGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 0, 1 ], 3 ) );

      this.handleGizmos = {

          X: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xff0000 } ) ), [ 0.5, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ],
              [ new THREE.Line( lineXGeometry, new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
          ],

          Y: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x00ff00 } ) ), [ 0, 0.5, 0 ] ],
              [ new THREE.Line( lineYGeometry, new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
          ],

          Z: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, 0.5 ], [ Math.PI / 2, 0, 0 ] ],
              [ new THREE.Line( lineZGeometry, new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
          ],

          XYZ: [
              [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.125, 0.125, 0.125 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ) ]
          ]

      };

      this.pickerGizmos = {

          X: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0.6, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ]
          ],

          Y: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0.6, 0 ] ]
          ],

          Z: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0, 0.6 ], [ Math.PI / 2, 0, 0 ] ]
          ],

          XYZ: [
              [ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.4, 0.4, 0.4 ), pickerMaterial ) ]
          ]

      };

      this.setActivePlane = function ( axis, eye ) {

          var tempMatrix = new THREE.Matrix4();
          eye.applyMatrix4( tempMatrix.getInverse( tempMatrix.extractRotation( this.planes[ "XY" ].matrixWorld ) ) );

          if ( axis === "X" ) {

              this.activePlane = this.planes[ "XY" ];
              if ( Math.abs( eye.y ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "XZ" ];

          }

          if ( axis === "Y" ) {

              this.activePlane = this.planes[ "XY" ];
              if ( Math.abs( eye.x ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "YZ" ];

          }

          if ( axis === "Z" ) {

              this.activePlane = this.planes[ "XZ" ];
              if ( Math.abs( eye.x ) > Math.abs( eye.y ) ) this.activePlane = this.planes[ "YZ" ];

          }

          if ( axis === "XYZ" ) this.activePlane = this.planes[ "XYZE" ];

      };

      this.init();

  };

  THREE.TransformGizmoScale.prototype = Object.create( THREE.TransformGizmo.prototype );
  THREE.TransformGizmoScale.prototype.constructor = THREE.TransformGizmoScale;

  THREE.TransformGizmoCustom = function () {

      THREE.TransformGizmo.call( this );

      var arrowGeometry = new THREE.Geometry();
      var mesh = new THREE.Mesh( new THREE.CylinderGeometry( 0, 0.1, 0.4, 12, 1, false ) );
      mesh.position.y = 0.5;
      mesh.updateMatrix();

      arrowGeometry.merge( mesh.geometry, mesh.matrix );

      var lineXGeometry = new THREE.BufferGeometry();
      lineXGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  1, 0, 0 ], 3 ) );

      var lineYGeometry = new THREE.BufferGeometry();
      lineYGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 1, 0 ], 3 ) );

      var lineZGeometry = new THREE.BufferGeometry();
      lineZGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 0, 1 ], 3 ) );

      var lineNegXGeometry = new THREE.BufferGeometry();
      lineNegXGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  -1, 0, 0 ], 3 ) );

      var lineNegYGeometry = new THREE.BufferGeometry();
      lineNegYGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, -1, 0 ], 3 ) );

      var lineNegZGeometry = new THREE.BufferGeometry();
      lineNegZGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 0, -1 ], 3 ) );

      this.handleGizmos = {

          X: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xff0000 } ) ), [ 0.5, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ],
              [ new THREE.Line( lineXGeometry, new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
          ],

          Y: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x00ff00 } ) ), [ 0, 0.5, 0 ] ],
              [ new THREE.Line( lineYGeometry, new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
          ],

          Z: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, 0.5 ], [ Math.PI / 2, 0, 0 ] ],
              [ new THREE.Line( lineZGeometry, new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
          ],

          // XYZ: [
          // 	[ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ) ]
          // ],

          negX: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xff0000 } ) ), [ -0.5, 0, 0 ], [ 0, 0, Math.PI / 2 ] ],
              [ new THREE.Line( lineNegXGeometry, new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
          ],

          negY: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x00ff00 } ) ), [ 0, -0.5, 0 ], [Math.PI, 0, 0] ],
              [ new THREE.Line( lineNegYGeometry, new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
          ],

          negZ: [
              [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, -0.5 ], [ - Math.PI / 2, 0, 0 ] ],
              [ new THREE.Line( lineNegZGeometry, new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
          ]

      };

      this.pickerGizmos = {

          X: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0.6, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ]
          ],

          Y: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0.6, 0 ] ]
          ],

          Z: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0, 0.6 ], [ Math.PI / 2, 0, 0 ] ]
          ],

          // XYZ: [
          // 	[ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.4, 0.4, 0.4 ), pickerMaterial ) ]
          // ],

          negX: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ -0.6, 0, 0 ], [ 0, 0, Math.PI / 2 ] ]
          ],

          negY: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, -0.6, 0 ], [ Math.PI, 0, 0 ] ]
          ],

          negZ: [
              [ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0, -0.6 ], [ -Math.PI / 2, 0, 0 ] ]
          ]

      };

      this.setActivePlane = function ( axis, eye ) {

          var tempMatrix = new THREE.Matrix4();
          eye.applyMatrix4( tempMatrix.getInverse( tempMatrix.extractRotation( this.planes[ "XY" ].matrixWorld ) ) );

          if ( axis === "X" || axis === "negX" ) {

              this.activePlane = this.planes[ "XY" ];
              if ( Math.abs( eye.y ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "XZ" ];

          }

          if ( axis === "Y" || axis === "negY" ) {

              this.activePlane = this.planes[ "XY" ];
              if ( Math.abs( eye.x ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "YZ" ];

          }

          if ( axis === "Z" || axis === "negZ" ) {

              this.activePlane = this.planes[ "XZ" ];
              if ( Math.abs( eye.x ) > Math.abs( eye.y ) ) this.activePlane = this.planes[ "YZ" ];

          }

          if ( axis === "XYZ" ) this.activePlane = this.planes[ "XYZE" ];
      };

      this.init();

  };

  THREE.TransformGizmoCustom.prototype = Object.create( THREE.TransformGizmo.prototype );
  THREE.TransformGizmoCustom.prototype.constructor = THREE.TransformGizmoCustom;

  var TransformControls = function ( camera, domElement ) {

      // TODO: Make non-uniform scale and rotate play nice in hierarchies
      // TODO: ADD RXYZ contol

      THREE.Object3D.call( this );

      domElement = ( domElement !== undefined ) ? domElement : document;

      this.object = undefined;
      this.visible = false;
      this.translationSnap = null;
      this.rotationSnap = null;
      // this.space = "world";
      this.space = "local";
      this.size = 1;
      this.axis = null;

      this.scaleSpeed = 500; // tmp

      var scope = this;

      var _mode = "custom";
      var _dragging = false;
      var _gizmo = {
          "translate": new THREE.TransformGizmoTranslate(),
          "rotate": new THREE.TransformGizmoRotate(),
          "scale": new THREE.TransformGizmoScale(),
          "custom": new THREE.TransformGizmoCustom()
      };

      for ( var type in _gizmo ) {

          var gizmoObj = _gizmo[ type ];

          gizmoObj.visible = ( type === _mode );
          this.add( gizmoObj );

      }

      var changeEvent = { type: "change" };
      var touchStartEvent = { type: "touchStart" };
      var touchEndEvent = { type: "touchEnd" };
      var mouseDownEvent = { type: "mouseDown" };
      var mouseUpEvent = { type: "mouseUp", mode: _mode };
      var objectChangeEvent = { type: "objectChange" };

      var ray = new THREE.Raycaster();
      var pointerVector = new THREE.Vector2();

      var point = new THREE.Vector3();
      var offset = new THREE.Vector3();

      var rotation = new THREE.Vector3();
      var offsetRotation = new THREE.Vector3();
      var scale = 1;

      var lookAtMatrix = new THREE.Matrix4();
      var eye = new THREE.Vector3();

      var tempMatrix = new THREE.Matrix4();
      var tempVector = new THREE.Vector3();
      var tempQuaternion = new THREE.Quaternion();
      var unitX = new THREE.Vector3( 1, 0, 0 );
      var unitY = new THREE.Vector3( 0, 1, 0 );
      var unitZ = new THREE.Vector3( 0, 0, 1 );

      var quaternionXYZ = new THREE.Quaternion();
      var quaternionX = new THREE.Quaternion();
      var quaternionY = new THREE.Quaternion();
      var quaternionZ = new THREE.Quaternion();
      var quaternionE = new THREE.Quaternion();

      var oldPosition = new THREE.Vector3();
      var oldScale = new THREE.Vector3();
      var oldRotationMatrix = new THREE.Matrix4();

      var parentRotationMatrix  = new THREE.Matrix4();
      var parentScale = new THREE.Vector3();

      var worldPosition = new THREE.Vector3();
      var worldRotation = new THREE.Euler();
      var worldRotationMatrix  = new THREE.Matrix4();
      var camPosition = new THREE.Vector3();
      var camRotation = new THREE.Euler();

      domElement.addEventListener( "mousedown", onPointerDown, false );
      domElement.addEventListener( "touchstart", onPointerDown, false );

      domElement.addEventListener( "mousemove", onPointerHover, false );
      domElement.addEventListener( "touchmove", onPointerHover, false );

      domElement.addEventListener( "mousemove", onPointerMove, false );
      domElement.addEventListener( "touchmove", onPointerMove, false );

      domElement.addEventListener( "mouseup", onPointerUp, false );
      domElement.addEventListener( "mouseout", onPointerUp, false );
      domElement.addEventListener( "touchend", onPointerUp, false );
      domElement.addEventListener( "touchcancel", onPointerUp, false );
      domElement.addEventListener( "touchleave", onPointerUp, false );

      this.dispose = function () {

          domElement.removeEventListener( "mousedown", onPointerDown );
          domElement.removeEventListener( "touchstart", onPointerDown );

          domElement.removeEventListener( "mousemove", onPointerHover );
          domElement.removeEventListener( "touchmove", onPointerHover );

          domElement.removeEventListener( "mousemove", onPointerMove );
          domElement.removeEventListener( "touchmove", onPointerMove );

          domElement.removeEventListener( "mouseup", onPointerUp );
          domElement.removeEventListener( "mouseout", onPointerUp );
          domElement.removeEventListener( "touchend", onPointerUp );
          domElement.removeEventListener( "touchcancel", onPointerUp );
          domElement.removeEventListener( "touchleave", onPointerUp );

      };

      this.attach = function ( object ) {

          this.object = object;
          this.visible = true;
          this.update();

          // bimU stuff
          this.oriY = scope.object.geometry.vertices[5].y;
          this.oriNegY = scope.object.geometry.vertices[2].y;
          this.oriZ = scope.object.geometry.vertices[7].z;
          this.oriNegZ = scope.object.geometry.vertices[6].z;
          this.oriX = scope.object.geometry.vertices[0].x;
          this.oriNegX = scope.object.geometry.vertices[4].x;

      };

      this.detach = function () {

          this.object = undefined;
          this.visible = false;
          this.axis = null;

      };

      this.getMode = function () {

          return _mode;

      };

      this.setMode = function ( mode ) {

          _mode = mode ? mode : _mode;

          if ( _mode === "scale" ) scope.space = "local";

          for ( var type in _gizmo ) _gizmo[ type ].visible = ( type === _mode );

          this.update();
          scope.dispatchEvent( changeEvent );

      };

      this.setTranslationSnap = function ( translationSnap ) {

          scope.translationSnap = translationSnap;

      };

      this.setRotationSnap = function ( rotationSnap ) {

          scope.rotationSnap = rotationSnap;

      };

      this.setSize = function ( size ) {

          scope.size = size;
          this.update();
          scope.dispatchEvent( changeEvent );

      };

      this.setSpace = function ( space ) {

          scope.space = space;
          this.update();
          scope.dispatchEvent( changeEvent );

      };

      this.update = function () {

          if ( scope.object === undefined ) return;

          scope.object.updateMatrixWorld();
          worldPosition.setFromMatrixPosition( scope.object.matrixWorld );
          worldRotation.setFromRotationMatrix( tempMatrix.extractRotation( scope.object.matrixWorld ) );

          camera.updateMatrixWorld();
          camPosition.setFromMatrixPosition( camera.matrixWorld );
          camRotation.setFromRotationMatrix( tempMatrix.extractRotation( camera.matrixWorld ) );

          if ( camera instanceof THREE.PerspectiveCamera ) scale = worldPosition.distanceTo( camPosition ) / 6 * scope.size;
          else if ( camera instanceof THREE.OrthographicCamera ) scale = scope.size / camera.zoom / 6; // FIXME!!
          this.position.copy( worldPosition );
          this.scale.set( scale, scale, scale );

          if ( camera instanceof THREE.PerspectiveCamera ) {

              eye.copy( camPosition ).sub( worldPosition ).normalize();

          } else if ( camera instanceof THREE.OrthographicCamera ) {

              eye.copy( camPosition ).normalize();

          }

          if ( scope.space === "local" ) {

              _gizmo[ _mode ].update( worldRotation, eye );

          } else if ( scope.space === "world" ) {

              _gizmo[ _mode ].update( new THREE.Euler(), eye );

          }

          _gizmo[ _mode ].highlight( scope.axis );

      };

      function onPointerHover( event ) {

          if ( scope.object === undefined || _dragging === true || ( event.button !== undefined && event.button !== 0 ) ) return;

          var pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;

          var intersect = intersectObjects( pointer, _gizmo[ _mode ].pickers.children );

          var axis = null;

          if ( intersect ) {

              axis = intersect.object.name;

              event.preventDefault();

          }

          if ( scope.axis !== axis ) {

              scope.axis = axis;
              scope.update();
              scope.dispatchEvent( changeEvent );

          }

      }

      function onPointerDown( event ) {

          if ( scope.object === undefined || _dragging === true || ( event.button !== undefined && event.button !== 0 ) ) return;

          var pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;

          if ( pointer.button === 0 || pointer.button === undefined ) {

              var intersect = intersectObjects( pointer, _gizmo[ _mode ].pickers.children );

              if ( intersect ) {

                  if(event.changedTouches){
                      scope.dispatchEvent( touchStartEvent );
                  }					

                  event.preventDefault();
                  event.stopPropagation();

                  scope.dispatchEvent( mouseDownEvent );

                  scope.axis = intersect.object.name;

                  scope.update();

                  eye.copy( camPosition ).sub( worldPosition ).normalize();

                  _gizmo[ _mode ].setActivePlane( scope.axis, eye );

                  var planeIntersect = intersectObjects( pointer, [ _gizmo[ _mode ].activePlane ] );

                  if ( planeIntersect ) {

                      oldPosition.copy( scope.object.position );
                      oldScale.copy( scope.object.scale );

                      oldRotationMatrix.extractRotation( scope.object.matrix );
                      worldRotationMatrix.extractRotation( scope.object.matrixWorld );

                      parentRotationMatrix.extractRotation( scope.object.parent.matrixWorld );
                      parentScale.setFromMatrixScale( tempMatrix.getInverse( scope.object.parent.matrixWorld ) );

                      offset.copy( planeIntersect.point );

                  }

              }

          }

          _dragging = true;

      }

      function onPointerMove( event ) {

          if ( scope.object === undefined || scope.axis === null || _dragging === false || ( event.button !== undefined && event.button !== 0 ) ) return;

          var pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;

          var planeIntersect = intersectObjects( pointer, [ _gizmo[ _mode ].activePlane ] );

          if ( planeIntersect === false ) return;

          event.preventDefault();
          event.stopPropagation();

          point.copy( planeIntersect.point );

          if ( _mode === "translate" ) {

              point.sub( offset );
              point.multiply( parentScale );

              if ( scope.space === "local" ) {

                  point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                  if ( scope.axis.search( "X" ) === - 1 ) point.x = 0;
                  if ( scope.axis.search( "Y" ) === - 1 ) point.y = 0;

                  point.applyMatrix4( oldRotationMatrix );

                  scope.object.position.copy( oldPosition );
                  scope.object.position.add( point );

              }

              if ( scope.space === "world" || scope.axis.search( "XYZ" ) !== - 1 ) {

                  if ( scope.axis.search( "X" ) === - 1 ) point.x = 0;
                  if ( scope.axis.search( "Y" ) === - 1 ) point.y = 0;
                  if ( scope.axis.search( "Z" ) === - 1 ) point.z = 0;

                  point.applyMatrix4( tempMatrix.getInverse( parentRotationMatrix ) );

                  scope.object.position.copy( oldPosition );
                  scope.object.position.add( point );

              }

              if ( scope.translationSnap !== null ) {

                  if ( scope.space === "local" ) {

                      scope.object.position.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                  }

                  if ( scope.axis.search( "X" ) !== - 1 ) scope.object.position.x = Math.round( scope.object.position.x / scope.translationSnap ) * scope.translationSnap;
                  if ( scope.axis.search( "Y" ) !== - 1 ) scope.object.position.y = Math.round( scope.object.position.y / scope.translationSnap ) * scope.translationSnap;
                  if ( scope.axis.search( "Z" ) !== - 1 ) scope.object.position.z = Math.round( scope.object.position.z / scope.translationSnap ) * scope.translationSnap;

                  if ( scope.space === "local" ) {

                      scope.object.position.applyMatrix4( worldRotationMatrix );

                  }

              }

          } else if ( _mode === "scale" ) {

              point.sub( offset );
              point.multiply( parentScale );

              if ( scope.space === "local" ) {

                  if ( scope.axis === "XYZ" ) {

                      scale = 1 + ( ( point.y ) / Math.max( oldScale.x, oldScale.y, oldScale.z ) );

                      scope.object.scale.x = oldScale.x * scale;
                      scope.object.scale.y = oldScale.y * scale;
                      scope.object.scale.z = oldScale.z * scale;

                  } else {

                      point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                      if ( scope.axis === "X" ) scope.object.scale.x = oldScale.x * ( 1 + point.x / oldScale.x );
                      if ( scope.axis === "Y" ) scope.object.scale.y = oldScale.y * ( 1 + point.y / oldScale.y );
                      if ( scope.axis === "Z" ) scope.object.scale.z = oldScale.z * ( 1 + point.z / oldScale.z );

                  }

              }

          } else if ( _mode === "rotate" ) {

              point.sub( worldPosition );
              point.multiply( parentScale );
              tempVector.copy( offset ).sub( worldPosition );
              tempVector.multiply( parentScale );

              if ( scope.axis === "E" ) {

                  point.applyMatrix4( tempMatrix.getInverse( lookAtMatrix ) );
                  tempVector.applyMatrix4( tempMatrix.getInverse( lookAtMatrix ) );

                  rotation.set( Math.atan2( point.z, point.y ), Math.atan2( point.x, point.z ), Math.atan2( point.y, point.x ) );
                  offsetRotation.set( Math.atan2( tempVector.z, tempVector.y ), Math.atan2( tempVector.x, tempVector.z ), Math.atan2( tempVector.y, tempVector.x ) );

                  tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );

                  quaternionE.setFromAxisAngle( eye, rotation.z - offsetRotation.z );
                  quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionE );
                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

                  scope.object.quaternion.copy( tempQuaternion );

              } else if ( scope.axis === "XYZE" ) {

                  quaternionE.setFromEuler( point.clone().cross( tempVector ).normalize() ); // rotation axis

                  tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );
                  quaternionX.setFromAxisAngle( quaternionE, - point.clone().angleTo( tempVector ) );
                  quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

                  scope.object.quaternion.copy( tempQuaternion );

              } else if ( scope.space === "local" ) {

                  point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                  tempVector.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                  rotation.set( Math.atan2( point.z, point.y ), Math.atan2( point.x, point.z ), Math.atan2( point.y, point.x ) );
                  offsetRotation.set( Math.atan2( tempVector.z, tempVector.y ), Math.atan2( tempVector.x, tempVector.z ), Math.atan2( tempVector.y, tempVector.x ) );

                  quaternionXYZ.setFromRotationMatrix( oldRotationMatrix );

                  if ( scope.rotationSnap !== null ) {

                      quaternionX.setFromAxisAngle( unitX, Math.round( ( rotation.x - offsetRotation.x ) / scope.rotationSnap ) * scope.rotationSnap );
                      quaternionY.setFromAxisAngle( unitY, Math.round( ( rotation.y - offsetRotation.y ) / scope.rotationSnap ) * scope.rotationSnap );
                      quaternionZ.setFromAxisAngle( unitZ, Math.round( ( rotation.z - offsetRotation.z ) / scope.rotationSnap ) * scope.rotationSnap );

                  } else {

                      quaternionX.setFromAxisAngle( unitX, rotation.x - offsetRotation.x );
                      quaternionY.setFromAxisAngle( unitY, rotation.y - offsetRotation.y );
                      quaternionZ.setFromAxisAngle( unitZ, rotation.z - offsetRotation.z );

                  }

                  if ( scope.axis === "X" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionX );
                  if ( scope.axis === "Y" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionY );
                  if ( scope.axis === "Z" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionZ );

                  scope.object.quaternion.copy( quaternionXYZ );

              } else if ( scope.space === "world" ) {

                  rotation.set( Math.atan2( point.z, point.y ), Math.atan2( point.x, point.z ), Math.atan2( point.y, point.x ) );
                  offsetRotation.set( Math.atan2( tempVector.z, tempVector.y ), Math.atan2( tempVector.x, tempVector.z ), Math.atan2( tempVector.y, tempVector.x ) );

                  tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );

                  if ( scope.rotationSnap !== null ) {

                      quaternionX.setFromAxisAngle( unitX, Math.round( ( rotation.x - offsetRotation.x ) / scope.rotationSnap ) * scope.rotationSnap );
                      quaternionY.setFromAxisAngle( unitY, Math.round( ( rotation.y - offsetRotation.y ) / scope.rotationSnap ) * scope.rotationSnap );
                      quaternionZ.setFromAxisAngle( unitZ, Math.round( ( rotation.z - offsetRotation.z ) / scope.rotationSnap ) * scope.rotationSnap );

                  } else {

                      quaternionX.setFromAxisAngle( unitX, rotation.x - offsetRotation.x );
                      quaternionY.setFromAxisAngle( unitY, rotation.y - offsetRotation.y );
                      quaternionZ.setFromAxisAngle( unitZ, rotation.z - offsetRotation.z );

                  }

                  quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

                  if ( scope.axis === "X" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
                  if ( scope.axis === "Y" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
                  if ( scope.axis === "Z" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );

                  tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

                  scope.object.quaternion.copy( tempQuaternion );

              }

          } else if ( _mode === "custom" ) {

              // modified from "translate" and "scale" modes

              point.sub( offset );
              point.multiply( parentScale );

              if ( scope.space === "local" ) {

                  point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                  if ( scope.axis.search( "X" ) === - 1 ) point.x = 0;
                  if ( scope.axis.search( "Y" ) === - 1 ) point.y = 0;
                  if ( scope.axis.search( "Z" ) === - 1 ) point.z = 0;

                  point.applyMatrix4( oldRotationMatrix );

                  scope.object.position.copy( oldPosition );
                  scope.object.position.add( point.divideScalar(2) );

                  if ( scope.axis === "XYZ" ) {

                      scale = 1 + ( ( point.y ) / scope.scaleSpeed );

                      scope.object.scale.x = oldScale.x * scale;
                      scope.object.scale.y = oldScale.y * scale;
                      scope.object.scale.z = oldScale.z * scale;

                  } else {

                      // var width = scope.object.geometry.parameters.width;						

                      if ( scope.axis === "X" ) {

                          for (var i = 0; i < scope.object.geometry.vertices.length - 4; i++)
                              scope.object.geometry.vertices[i].setX(scope.oriX + point.x);
                          for (var i = 4; i < scope.object.geometry.vertices.length; i++)
                              scope.object.geometry.vertices[i].setX(scope.oriNegX - point.x);

                      }
                      if ( scope.axis === "negX" ) {

                          for (var i = 4; i < scope.object.geometry.vertices.length; i++)
                              scope.object.geometry.vertices[i].setX(scope.oriNegX + point.x);
                          for (var i = 0; i < scope.object.geometry.vertices.length - 4; i++)
                              scope.object.geometry.vertices[i].setX(scope.oriX - point.x);

                      }

                      // var height = scope.object.geometry.parameters.height;

                      if ( scope.axis === "Y" ) {

                          scope.object.geometry.vertices[0].setY(scope.oriY + point.y);
                          scope.object.geometry.vertices[1].setY(scope.oriY + point.y);
                          scope.object.geometry.vertices[4].setY(scope.oriY + point.y);
                          scope.object.geometry.vertices[5].setY(scope.oriY + point.y);

                          scope.object.geometry.vertices[2].setY(scope.oriNegY - point.y);
                          scope.object.geometry.vertices[3].setY(scope.oriNegY - point.y);
                          scope.object.geometry.vertices[6].setY(scope.oriNegY - point.y);
                          scope.object.geometry.vertices[7].setY(scope.oriNegY - point.y);

                      }

                      if ( scope.axis === "negY" ) {

                          scope.object.geometry.vertices[2].setY(scope.oriNegY + point.y);
                          scope.object.geometry.vertices[3].setY(scope.oriNegY + point.y);
                          scope.object.geometry.vertices[6].setY(scope.oriNegY + point.y);
                          scope.object.geometry.vertices[7].setY(scope.oriNegY + point.y);

                          scope.object.geometry.vertices[0].setY(scope.oriY - point.y);
                          scope.object.geometry.vertices[1].setY(scope.oriY - point.y);
                          scope.object.geometry.vertices[4].setY(scope.oriY - point.y);
                          scope.object.geometry.vertices[5].setY(scope.oriY - point.y);

                      }

                      // var depth = scope.object.geometry.parameters.depth;

                      if ( scope.axis === "Z" ) {

                          scope.object.geometry.vertices[0].setZ(scope.oriZ + point.z);
                          scope.object.geometry.vertices[2].setZ(scope.oriZ + point.z);
                          scope.object.geometry.vertices[5].setZ(scope.oriZ + point.z);
                          scope.object.geometry.vertices[7].setZ(scope.oriZ + point.z);

                          scope.object.geometry.vertices[1].setZ(scope.oriNegZ - point.z);
                          scope.object.geometry.vertices[3].setZ(scope.oriNegZ - point.z);
                          scope.object.geometry.vertices[4].setZ(scope.oriNegZ - point.z);
                          scope.object.geometry.vertices[6].setZ(scope.oriNegZ - point.z);

                      }
                      if ( scope.axis === "negZ" ) {
                          
                          scope.object.geometry.vertices[1].setZ(scope.oriNegZ + point.z);
                          scope.object.geometry.vertices[3].setZ(scope.oriNegZ + point.z);
                          scope.object.geometry.vertices[4].setZ(scope.oriNegZ + point.z);
                          scope.object.geometry.vertices[6].setZ(scope.oriNegZ + point.z);

                          scope.object.geometry.vertices[0].setZ(scope.oriZ - point.z);
                          scope.object.geometry.vertices[2].setZ(scope.oriZ - point.z);
                          scope.object.geometry.vertices[5].setZ(scope.oriZ - point.z);
                          scope.object.geometry.vertices[7].setZ(scope.oriZ - point.z);

                      }

                      scope.object.geometry.verticesNeedUpdate = true;

                  }

              }

          }

          scope.update();
          scope.dispatchEvent( changeEvent );
          scope.dispatchEvent( objectChangeEvent );

      }

      function onPointerUp( event ) {

          event.preventDefault(); // Prevent MouseEvent on mobile

          if ( event.button !== undefined && event.button !== 0 ) return;

          if ( _dragging && ( scope.axis !== null ) ) {

              mouseUpEvent.mode = _mode;
              scope.dispatchEvent( mouseUpEvent );

          }

          // bimU stuff
          if( scope.object != undefined) {

              scope.oriY = scope.object.geometry.vertices[5].y;
              scope.oriNegY = scope.object.geometry.vertices[2].y;
              scope.oriZ = scope.object.geometry.vertices[7].z;
              scope.oriNegZ = scope.object.geometry.vertices[6].z;
              scope.oriX = scope.object.geometry.vertices[0].x;
              scope.oriNegX = scope.object.geometry.vertices[4].x;

          }

          _dragging = false;

          if ( 'TouchEvent' in window && event instanceof TouchEvent ) {

              // Force "rollover"

              scope.axis = null;
              scope.update();
              scope.dispatchEvent( changeEvent );
              scope.dispatchEvent( touchEndEvent );

          } else {

              onPointerHover( event );

          }

      }

      function intersectObjects( pointer, objects ) {

          var rect = domElement.getBoundingClientRect();
          var x = ( pointer.clientX - rect.left ) / rect.width;
          var y = ( pointer.clientY - rect.top ) / rect.height;

          pointerVector.set( ( x * 2 ) - 1, - ( y * 2 ) + 1 );
          ray.setFromCamera( pointerVector, camera );

          var intersections = ray.intersectObjects( objects, true );
          return intersections[ 0 ] ? intersections[ 0 ] : false;

      }

  };

  TransformControls.prototype = Object.create( THREE.Object3D.prototype );
  TransformControls.prototype.constructor = TransformControls;

  /**
   * adopted Potree and from http://stemkoski.github.io/Three.js/Sprite-Text-Labels.html
   */

  class TextSprite extends THREE.Object3D {
  	
  	constructor(text){
  		super();

  		let texture = new THREE.Texture();
  		texture.minFilter = THREE.LinearFilter;
  		texture.magFilter = THREE.LinearFilter;
  		let spriteMaterial = new THREE.SpriteMaterial({
  			map: texture,
  			depthTest: false,
  			depthWrite: false});

  		this.material = spriteMaterial;
  		this.sprite = new THREE.Sprite(spriteMaterial);
  		this.add(this.sprite);

  		this.borderThickness = 2;
  		this.fontface = 'Tahoma';
  		this.fontsize = 18;
  		this.borderColor = { r: 0, g: 0, b: 0, a: 0.0 }; // HTC: turn off border
  		this.backgroundColor = { r: 255, g: 23, b: 68, a: 1.0 };
  		this.textColor = {r: 255, g: 255, b: 255, a: 1.0};
  		this.text = '';

  		this.setText(text);
  	}

  	setText(text){
  		if (this.text !== text){
  			this.text = text;

  			this.update();
  		}
  	};

  	// HTC: disable setting colors from outside

  	setTextColor(color){
  		//this.textColor = color;

  		//this.update();
  	};

  	setBorderColor(color){
  		//this.borderColor = color;

  		//this.update();
  	};

  	setBackgroundColor(color){
  		//this.backgroundColor = color;

  		//this.update();
  	};

  	update(){
  		let canvas = document.createElement('canvas');
  		let context = canvas.getContext('2d');
  		context.font = 'Bold ' + this.fontsize + 'px ' + this.fontface;

  		// get size data (height depends only on font size)
  		let metrics = context.measureText(this.text);
  		let textWidth = metrics.width;
  		let margin = 5;
  		let spriteWidth = 2 * margin + textWidth + 2 * this.borderThickness;
  		let spriteHeight = this.fontsize * 1.4 + 2 * this.borderThickness;

  		context.canvas.width = spriteWidth;
  		context.canvas.height = spriteHeight;
  		context.font = 'Bold ' + this.fontsize + 'px ' + this.fontface;

  		// background color
  		context.fillStyle = 'rgba(' + this.backgroundColor.r + ',' + this.backgroundColor.g + ',' +
  			this.backgroundColor.b + ',' + this.backgroundColor.a + ')';
  		
  		// border color
  		context.strokeStyle = 'rgba(' + this.borderColor.r + ',' + this.borderColor.g + ',' +
  			this.borderColor.b + ',' + this.borderColor.a + ')';

  		context.lineWidth = this.borderThickness;
  		this.roundRect(context, this.borderThickness / 2, this.borderThickness / 2,
  			textWidth + this.borderThickness + 2 * margin, this.fontsize * 1.4 + this.borderThickness, 6);

  		// text color
  		// HTC: disable text border
  		//context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
  		//context.strokeText(this.text, this.borderThickness + margin, this.fontsize + this.borderThickness);

  		context.fillStyle = 'rgba(' + this.textColor.r + ',' + this.textColor.g + ',' +
  			this.textColor.b + ',' + this.textColor.a + ')';
  		context.fillText(this.text, this.borderThickness + margin, this.fontsize + this.borderThickness);

  		let texture = new THREE.Texture(canvas);
  		texture.minFilter = THREE.LinearFilter;
  		texture.magFilter = THREE.LinearFilter;
  		texture.needsUpdate = true;

  		this.sprite.material.map = texture;

  		this.sprite.scale.set(spriteWidth * 0.01 * 0.9, spriteHeight * 0.01 * 0.9, 1.0);
  	};

  	roundRect(ctx, x, y, w, h, r){
  		ctx.beginPath();
  		ctx.moveTo(x + r, y);
  		ctx.lineTo(x + w - r, y);
  		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  		ctx.lineTo(x + w, y + h - r);
  		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  		ctx.lineTo(x + r, y + h);
  		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  		ctx.lineTo(x, y + r);
  		ctx.quadraticCurveTo(x, y, x + r, y);
  		ctx.closePath();
  		ctx.fill();
  		ctx.stroke();
  	};

  }

  /**
   * adopted from Potree
   */

  class MeasureUtils {
  	static loadShapefileFeatures (file, callback) {
  		let features = [];

  		let handleFinish = () => {
  			callback(features);
  		};

  		shapefile.open(file)
  			.then(source => {
  				source.read()
  					.then(function log (result) {
  						if (result.done) {
  							handleFinish();
  							return;
  						}

  						// console.log(result.value);

  						if (result.value && result.value.type === 'Feature' && result.value.geometry !== undefined) {
  							features.push(result.value);
  						}

  						return source.read().then(log);
  					});
  			});
  	}

  	static toString (value) {
  		if (value instanceof THREE.Vector3) {
  			return value.x.toFixed(2) + ', ' + value.y.toFixed(2) + ', ' + value.z.toFixed(2);
  		} else {
  			return '' + value + '';
  		}
  	}

  	static normalizeURL (url) {
  		let u = new URL(url);

  		return u.protocol + '//' + u.hostname + u.pathname.replace(/\/+/g, '/');
  	};

  	// HTC: comment out this part since it might not be used
  	/*static pathExists (url) {
  		let req = Potree.XHRFactory.createXMLHttpRequest();
  		req.open('GET', url, false);
  		req.send(null);
  		if (req.status !== 200) {
  			return false;
  		}
  		return true;
  	};*/

  	static debugSphere(parent, position, scale, color){
  		let geometry = new THREE.SphereGeometry(1, 8, 8);
  		let material;

  		if(color !== undefined){
  			material = new THREE.MeshBasicMaterial({color: color});
  		}else{
  			material = new THREE.MeshNormalMaterial();
  		}
  		let sphere = new THREE.Mesh(geometry, material);
  		sphere.position.copy(position);
  		sphere.scale.set(scale, scale, scale);
  		parent.add(sphere);
  	}

  	static debugLine(parent, start, end, color){
  		let material = new THREE.LineBasicMaterial({ color: color }); 
  		let geometry = new THREE.Geometry(); 
  		geometry.vertices.push( start, end); 
  		let tl = new THREE.Line( geometry, material ); 
  		parent.add(tl);
  	}

  	/**
  	 * adapted from mhluska at https://github.com/mrdoob/three.js/issues/1561
  	 */
  	static computeTransformedBoundingBox (box, transform) {
  		let vertices = [
  			new THREE.Vector3(box.min.x, box.min.y, box.min.z).applyMatrix4(transform),
  			new THREE.Vector3(box.min.x, box.min.y, box.min.z).applyMatrix4(transform),
  			new THREE.Vector3(box.max.x, box.min.y, box.min.z).applyMatrix4(transform),
  			new THREE.Vector3(box.min.x, box.max.y, box.min.z).applyMatrix4(transform),
  			new THREE.Vector3(box.min.x, box.min.y, box.max.z).applyMatrix4(transform),
  			new THREE.Vector3(box.min.x, box.max.y, box.max.z).applyMatrix4(transform),
  			new THREE.Vector3(box.max.x, box.max.y, box.min.z).applyMatrix4(transform),
  			new THREE.Vector3(box.max.x, box.min.y, box.max.z).applyMatrix4(transform),
  			new THREE.Vector3(box.max.x, box.max.y, box.max.z).applyMatrix4(transform)
  		];

  		let boundingBox = new THREE.Box3();
  		boundingBox.setFromPoints(vertices);

  		return boundingBox;
  	};

  	/**
  	 * add separators to large numbers
  	 *
  	 * @param nStr
  	 * @returns
  	 */
  	static addCommas (nStr) {
  		nStr += '';
  		let x = nStr.split('.');
  		let x1 = x[0];
  		let x2 = x.length > 1 ? '.' + x[1] : '';
  		let rgx = /(\d+)(\d{3})/;
  		while (rgx.test(x1)) {
  			x1 = x1.replace(rgx, '$1' + ',' + '$2');
  		}
  		return x1 + x2;
  	};

  	static removeCommas (str) {
  		return str.replace(/,/g, '');
  	}

  	/**
  	 * create worker from a string
  	 *
  	 * code from http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
  	 */
  	static createWorker (code) {
  		let blob = new Blob([code], {type: 'application/javascript'});
  		let worker = new Worker(URL.createObjectURL(blob));

  		return worker;
  	};

  	static moveTo(scene, endPosition, endTarget){

  		let view = scene.view;
  		let camera = scene.getActiveCamera();
  		let animationDuration = 500;
  		let easing = TWEEN.Easing.Quartic.Out;

  		{ // animate camera position
  			let tween = new TWEEN.Tween(view.position).to(endPosition, animationDuration);
  			tween.easing(easing);
  			tween.start();
  		}

  		{ // animate camera target
  			let camTargetDistance = camera.position.distanceTo(endTarget);
  			let camWorldDir = new THREE.Vector3();
  			camera.getWorldDirection(camWorldDir);
  			let target = new THREE.Vector3().addVectors(
  				camera.position,
  				camWorldDir.multiplyScalar(camTargetDistance)
  			);
  			let tween = new TWEEN.Tween(target).to(endTarget, animationDuration);
  			tween.easing(easing);
  			tween.onUpdate(() => {
  				view.lookAt(target);
  			});
  			tween.onComplete(() => {
  				view.lookAt(target);
  			});
  			tween.start();
  		}

  	}

  	static loadSkybox (path) {
  		let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);
  		camera.up.set(0, 0, 1);
  		let scene = new THREE.Scene();

  		let format = '.jpg';
  		let urls = [
  			path + 'px' + format, path + 'nx' + format,
  			path + 'py' + format, path + 'ny' + format,
  			path + 'pz' + format, path + 'nz' + format
  		];

  		let materialArray = [];
  		{
  			for (let i = 0; i < 6; i++) {
  				let material = new THREE.MeshBasicMaterial({
  					map: null,
  					side: THREE.BackSide,
  					depthTest: false,
  					depthWrite: false,
  					color: 0x424556
  				});

  				materialArray.push(material);

  				let loader = new THREE.TextureLoader();
  				loader.load(urls[i],
  					function loaded (texture) {
  						material.map = texture;
  						material.needsUpdate = true;
  						material.color.setHex(0xffffff);
  					}, function progress (xhr) {
  						// console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  					}, function error (xhr) {
  						console.log('An error happened', xhr);
  					}
  				);
  			}
  		}

  		let skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
  		let skybox = new THREE.Mesh(skyGeometry, materialArray);

  		scene.add(skybox);

  		// z up
  		scene.rotation.x = Math.PI / 2;

  		return {'camera': camera, 'scene': scene};
  	};

  	static createGrid (width, length, spacing, color) {
  		let material = new THREE.LineBasicMaterial({
  			color: color || 0x888888
  		});

  		let geometry = new THREE.Geometry();
  		for (let i = 0; i <= length; i++) {
  			geometry.vertices.push(new THREE.Vector3(-(spacing * width) / 2, i * spacing - (spacing * length) / 2, 0));
  			geometry.vertices.push(new THREE.Vector3(+(spacing * width) / 2, i * spacing - (spacing * length) / 2, 0));
  		}

  		for (let i = 0; i <= width; i++) {
  			geometry.vertices.push(new THREE.Vector3(i * spacing - (spacing * width) / 2, -(spacing * length) / 2, 0));
  			geometry.vertices.push(new THREE.Vector3(i * spacing - (spacing * width) / 2, +(spacing * length) / 2, 0));
  		}

  		let line = new THREE.LineSegments(geometry, material, THREE.LinePieces);
  		line.receiveShadow = true;
  		return line;
      };

  	static createBackgroundTexture (width, height) {
  		function gauss (x, y) {
  			return (1 / (2 * Math.PI)) * Math.exp(-(x * x + y * y) / 2);
  		}
  		// map.magFilter = THREE.NearestFilter;
  		let size = width * height;
  		let data = new Uint8Array(3 * size);

  		let chroma = [1, 1.5, 1.7];
  		let max = gauss(0, 0);

  		for (let x = 0; x < width; x++) {
  			for (let y = 0; y < height; y++) {
  				let u = 2 * (x / width) - 1;
  				let v = 2 * (y / height) - 1;

  				let i = x + width * y;
  				let d = gauss(2 * u, 2 * v) / max;
  				let r = (Math.random() + Math.random() + Math.random()) / 3;
  				r = (d * 0.5 + 0.5) * r * 0.03;
  				r = r * 0.4;

  				// d = Math.pow(d, 0.6);

  				data[3 * i + 0] = 255 * (d / 15 + 0.05 + r) * chroma[0];
  				data[3 * i + 1] = 255 * (d / 15 + 0.05 + r) * chroma[1];
  				data[3 * i + 2] = 255 * (d / 15 + 0.05 + r) * chroma[2];
  			}
  		}

  		let texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
  		texture.needsUpdate = true;

  		return texture;
  	};

  	static getMousePointCloudIntersection (mouse, camera, viewer, pointclouds, params = {}) {
  		
  		let renderer = viewer.renderer;
  		
  		let nmouse = {
  			x: (mouse.x / renderer.domElement.clientWidth) * 2 - 1,
  			y: -(mouse.y / renderer.domElement.clientHeight) * 2 + 1
  		};

  		let pickParams = {};

  		if(params.pickClipped){
  			pickParams.pickClipped = params.pickClipped;
  		}

  		pickParams.x = mouse.x;
  		pickParams.y = renderer.domElement.clientHeight - mouse.y;

  		let raycaster = new THREE.Raycaster();
  		raycaster.setFromCamera(nmouse, camera);
  		let ray = raycaster.ray;

  		let selectedPointcloud = null;
  		let closestDistance = Infinity;
  		let closestIntersection = null;
  		let closestPoint = null;
  		
  		for(let pointcloud of pointclouds){
  			let point = pointcloud.pick(viewer, camera, ray, pickParams);
  			
  			if(!point){
  				continue;
  			}

  			let distance = camera.position.distanceTo(point.position);

  			if (distance < closestDistance) {
  				closestDistance = distance;
  				selectedPointcloud = pointcloud;
  				closestIntersection = point.position;
  				closestPoint = point;
  			}
  		}

  		if (selectedPointcloud) {
  			return {
  				location: closestIntersection,
  				distance: closestDistance,
  				pointcloud: selectedPointcloud,
  				point: closestPoint
  			};
  		} else {
  			return null;
  		}
  	};

  	static pixelsArrayToImage (pixels, width, height) {
  		let canvas = document.createElement('canvas');
  		canvas.width = width;
  		canvas.height = height;

  		let context = canvas.getContext('2d');

  		pixels = new pixels.constructor(pixels);

  		for (let i = 0; i < pixels.length; i++) {
  			pixels[i * 4 + 3] = 255;
  		}

  		let imageData = context.createImageData(width, height);
  		imageData.data.set(pixels);
  		context.putImageData(imageData, 0, 0);

  		let img = new Image();
  		img.src = canvas.toDataURL();
  		// img.style.transform = "scaleY(-1)";

  		return img;
  	};

  	static pixelsArrayToDataUrl(pixels, width, height) {
  		let canvas = document.createElement('canvas');
  		canvas.width = width;
  		canvas.height = height;

  		let context = canvas.getContext('2d');

  		pixels = new pixels.constructor(pixels);

  		for (let i = 0; i < pixels.length; i++) {
  			pixels[i * 4 + 3] = 255;
  		}

  		let imageData = context.createImageData(width, height);
  		imageData.data.set(pixels);
  		context.putImageData(imageData, 0, 0);

  		let dataURL = canvas.toDataURL();

  		return dataURL;
  	};

  	static pixelsArrayToCanvas(pixels, width, height){
  		let canvas = document.createElement('canvas');
  		canvas.width = width;
  		canvas.height = height;

  		let context = canvas.getContext('2d');

  		pixels = new pixels.constructor(pixels);

  		//for (let i = 0; i < pixels.length; i++) {
  		//	pixels[i * 4 + 3] = 255;
  		//}

  		// flip vertically
  		let bytesPerLine = width * 4;
  		for(let i = 0; i < parseInt(height / 2); i++){
  			let j = height - i - 1;

  			let lineI = pixels.slice(i * bytesPerLine, i * bytesPerLine + bytesPerLine);
  			let lineJ = pixels.slice(j * bytesPerLine, j * bytesPerLine + bytesPerLine);
  			pixels.set(lineJ, i * bytesPerLine);
  			pixels.set(lineI, j * bytesPerLine);
  		}

  		let imageData = context.createImageData(width, height);
  		imageData.data.set(pixels);
  		context.putImageData(imageData, 0, 0);

  		return canvas;
  	};

  	static removeListeners(dispatcher, type){
  		if (dispatcher._listeners === undefined) {
  			return;
  		}

  		if (dispatcher._listeners[ type ]) {
  			delete dispatcher._listeners[ type ];
  		}
  	}

  	static mouseToRay(mouse, camera, width, height){

  		let normalizedMouse = {
  			x: (mouse.x / width) * 2 - 1,
  			y: -(mouse.y / height) * 2 + 1
  		};

  		let vector = new THREE.Vector3(normalizedMouse.x, normalizedMouse.y, 0.5);
  		let origin = new THREE.Vector3(normalizedMouse.x, normalizedMouse.y, 0);
  		vector.unproject(camera);
  		origin.unproject(camera);
  		let direction = new THREE.Vector3().subVectors(vector, origin).normalize();

  		let ray = new THREE.Ray(origin, direction);

  		return ray;
  	}

  	static projectedRadius(radius, camera, distance, screenWidth, screenHeight){
  		if(camera instanceof THREE.OrthographicCamera){
  			return MeasureUtils.projectedRadiusOrtho(radius, camera.projectionMatrix, screenWidth, screenHeight);
  		}else if(camera instanceof THREE.PerspectiveCamera){
  			return MeasureUtils.projectedRadiusPerspective(radius, camera.fov * Math.PI / 180, distance, screenHeight);
  		}else{
  			throw new Error("invalid parameters");
  		}
  	}

  	static projectedRadiusPerspective(radius, fov, distance, screenHeight) {
  		let projFactor = (1 / Math.tan(fov / 2)) / distance;
  		projFactor = projFactor * screenHeight / 2;

  		return radius * projFactor;
  	};

  	static projectedRadiusOrtho(radius, proj, screenWidth, screenHeight) {
  		let p1 = new THREE.Vector4(0);
  		let p2 = new THREE.Vector4(radius);

  		p1.applyMatrix4(proj);
  		p2.applyMatrix4(proj);
  		p1 = new THREE.Vector3(p1.x, p1.y, p1.z);
  		p2 = new THREE.Vector3(p2.x, p2.y, p2.z);
  		p1.x = (p1.x + 1.0) * 0.5 * screenWidth;
  		p1.y = (p1.y + 1.0) * 0.5 * screenHeight;
  		p2.x = (p2.x + 1.0) * 0.5 * screenWidth;
  		p2.y = (p2.y + 1.0) * 0.5 * screenHeight;
  		return p1.distanceTo(p2);
  	}
  		
  		
  	static topView(camera, node){
  		camera.position.set(0, 1, 0);
  		camera.rotation.set(-Math.PI / 2, 0, 0);
  		camera.zoomTo(node, 1);
  	};

  	static frontView (camera, node) {
  		camera.position.set(0, 0, 1);
  		camera.rotation.set(0, 0, 0);
  		camera.zoomTo(node, 1);
  	};

  	static leftView (camera, node) {
  		camera.position.set(-1, 0, 0);
  		camera.rotation.set(0, -Math.PI / 2, 0);
  		camera.zoomTo(node, 1);
  	};

  	static rightView (camera, node) {
  		camera.position.set(1, 0, 0);
  		camera.rotation.set(0, Math.PI / 2, 0);
  		camera.zoomTo(node, 1);
  	};

  	/**
  	 *
  	 * 0: no intersection
  	 * 1: intersection
  	 * 2: fully inside
  	 */
  	static frustumSphereIntersection (frustum, sphere) {
  		let planes = frustum.planes;
  		let center = sphere.center;
  		let negRadius = -sphere.radius;

  		let minDistance = Number.MAX_VALUE;

  		for (let i = 0; i < 6; i++) {
  			let distance = planes[ i ].distanceToPoint(center);

  			if (distance < negRadius) {
  				return 0;
  			}

  			minDistance = Math.min(minDistance, distance);
  		}

  		return (minDistance >= sphere.radius) ? 2 : 1;
  	};

  	// code taken from three.js
  	// ImageUtils - generateDataTexture()
  	static generateDataTexture (width, height, color) {
  		let size = width * height;
  		let data = new Uint8Array(4 * width * height);

  		let r = Math.floor(color.r * 255);
  		let g = Math.floor(color.g * 255);
  		let b = Math.floor(color.b * 255);

  		for (let i = 0; i < size; i++) {
  			data[ i * 3 ] = r;
  			data[ i * 3 + 1 ] = g;
  			data[ i * 3 + 2 ] = b;
  		}

  		let texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  		texture.needsUpdate = true;
  		texture.magFilter = THREE.NearestFilter;

  		return texture;
  	};

  	// from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  	static getParameterByName (name) {
  		name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  		let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  		let results = regex.exec(document.location.search);
  		return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  	}

  	static setParameter (name, value) {
  		// value = encodeURIComponent(value);

  		name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  		let regex = new RegExp('([\\?&])(' + name + '=([^&#]*))');
  		let results = regex.exec(document.location.search);

  		let url = window.location.href;
  		if (results === null) {
  			if (window.location.search.length === 0) {
  				url = url + '?';
  			} else {
  				url = url + '&';
  			}

  			url = url + name + '=' + value;
  		} else {
  			let newValue = name + '=' + value;
  			url = url.replace(results[2], newValue);
  		}
  		window.history.replaceState({}, '', url);
  	}

  	// see https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  	static clipboardCopy(text){
  		let textArea = document.createElement("textarea");

  		textArea.style.position = 'fixed';
  		textArea.style.top = 0;
  		textArea.style.left = 0;

  		textArea.style.width = '2em';
  		textArea.style.height = '2em';

  		textArea.style.padding = 0;

  		textArea.style.border = 'none';
  		textArea.style.outline = 'none';
  		textArea.style.boxShadow = 'none';

  		textArea.style.background = 'transparent';

  		textArea.value = text;

  		document.body.appendChild(textArea);

  		textArea.select();

  		 try {
  			let success = document.execCommand('copy');
  			if(success){
  				console.log("copied text to clipboard");
  			}else{
  				console.log("copy to clipboard failed");
  			}
  		} catch (err) {
  			console.log("error while trying to copy to clipboard");
  		}

  		document.body.removeChild(textArea);

  	}
  }

  /**
   * adopted from Potree
   */

  class Measure extends THREE.Object3D {
  	constructor (globalShiftVector) {
  		super();

  		this.constructor.counter = (this.constructor.counter === undefined) ? 0 : this.constructor.counter + 1;

  		this.name = 'Measure_' + this.constructor.counter;
  		this.points = [];
  		this._showDistances = true;
  		this._showCoordinates = false;
  		this._showArea = false;
  		this._closed = true;
  		this._showAngles = false;
  		this._showHeight = false;
  		this.maxMarkers = Number.MAX_SAFE_INTEGER;

  		this.sphereGeometry = new THREE.SphereGeometry(0.4, 10, 10);
  		this.color = new THREE.Color(0xff1744);
  		this.lineColor = new THREE.Color(0xff6d00);

  		this.lengthUnit = {code: 'm'};

  		this.spheres = [];
  		this.edges = [];
  		this.sphereLabels = [];
  		this.edgeLabels = [];
  		this.angleLabels = [];
  		this.coordinateLabels = [];
  		this.globalShiftVector = globalShiftVector;

  		// this.heightEdge;
  		// this.heightLabel;
  		{ // height stuff
  			{ // height line
  				let lineGeometry = new THREE.Geometry();
  				lineGeometry.vertices.push(
  					new THREE.Vector3(),
  					new THREE.Vector3(),
  					new THREE.Vector3(),
  					new THREE.Vector3());
  				lineGeometry.colors.push(this.lineColor, this.lineColor, this.lineColor);
  				let lineMaterial = new THREE.LineDashedMaterial(
  					{ color: this.lineColor, dashSize: 5, gapSize: 2, linewidth: 0.5 });

  				lineMaterial.depthTest = false;
  				this.heightEdge = new THREE.Line(lineGeometry, lineMaterial);
  				this.heightEdge.visible = false;

  				this.add(this.heightEdge);
  			}

  			{ // height label
  				this.heightLabel = new TextSprite('');
  				this.heightLabel.setBorderColor({r: 0, g: 0, b: 0, a: 0.8});
  				this.heightLabel.setBackgroundColor({r: 0, g: 0, b: 0, a: 0.3});
  				this.heightLabel.setTextColor({r: 180, g: 220, b: 180, a: 1.0});
  				this.heightLabel.material.depthTest = false;
  				this.heightLabel.material.opacity = 1;
  				this.heightLabel.visible = false;				this.add(this.heightLabel);
  			}
  		}

  		this.areaLabel = new TextSprite('');
  		this.areaLabel.setBorderColor({r: 0, g: 0, b: 0, a: 0.8});
  		this.areaLabel.setBackgroundColor({r: 0, g: 0, b: 0, a: 0.3});
  		this.areaLabel.setTextColor({r: 180, g: 220, b: 180, a: 1.0});
  		this.areaLabel.material.depthTest = false;
  		this.areaLabel.material.opacity = 1;
  		this.areaLabel.visible = false;		this.add(this.areaLabel);
  	}

  	createSphereMaterial () {
  		let sphereMaterial = new THREE.MeshLambertMaterial({
  			flatShading: THREE.SmoothShading,
  			color: this.color,
  			depthTest: false,
  			depthWrite: false}
  		);

  		return sphereMaterial;
  	};

  	addMarker (point) {
  		if (point instanceof THREE.Vector3) {
  			point = {position: point};
  		}else if(point instanceof Array){
  			point = {position: new THREE.Vector3(...point)};
  		}
  		this.points.push(point);

  		// sphere
  		let sphere = new THREE.Mesh(this.sphereGeometry, this.createSphereMaterial());

  		this.add(sphere);
  		this.spheres.push(sphere);

  		{ // edges
  			let lineGeometry = new THREE.Geometry();
  			lineGeometry.vertices.push(new THREE.Vector3(), new THREE.Vector3());
  			lineGeometry.colors.push(this.lineColor, this.lineColor, this.lineColor);
  			let lineMaterial = new THREE.LineBasicMaterial({
  				linewidth: 0.5, color: this.lineColor
  			});
  			lineMaterial.depthTest = false;
  			let edge = new THREE.Line(lineGeometry, lineMaterial);
  			edge.visible = true;

  			this.add(edge);
  			this.edges.push(edge);
  		}

  		{ // edge labels
  			let edgeLabel = new TextSprite();
  			edgeLabel.setBorderColor({r: 0, g: 0, b: 0, a: 0.8});
  			edgeLabel.setBackgroundColor({r: 0, g: 0, b: 0, a: 0.3});
  			edgeLabel.material.depthTest = false;
  			edgeLabel.visible = false;
  			this.edgeLabels.push(edgeLabel);
  			this.add(edgeLabel);
  		}

  		{ // angle labels
  			let angleLabel = new TextSprite();
  			angleLabel.setBorderColor({r: 0, g: 0, b: 0, a: 0.8});
  			angleLabel.setBackgroundColor({r: 0, g: 0, b: 0, a: 0.3});
  			angleLabel.material.depthTest = false;
  			angleLabel.material.opacity = 1;
  			angleLabel.visible = false;
  			this.angleLabels.push(angleLabel);
  			this.add(angleLabel);
  		}

  		{ // coordinate labels
  			let coordinateLabel = new TextSprite();
  			coordinateLabel.setBorderColor({r: 0, g: 0, b: 0, a: 0.8});
  			coordinateLabel.setBackgroundColor({r: 0, g: 0, b: 0, a: 0.3});
  			coordinateLabel.material.depthTest = false;
  			coordinateLabel.material.opacity = 1;
  			coordinateLabel.visible = false;
  			this.coordinateLabels.push(coordinateLabel);
  			this.add(coordinateLabel);
  		}

  		{ // Event Listeners			
  			let drag = (e) => {
  				// TODO: write our own MeasureUtils.getMouseMeshVertexIntersection()
  				/*let I = MeasureUtils.getMousePointCloudIntersection(
  					e.drag.end, 
  					e.viewer.scene.getActiveCamera(),
  					e.viewer, 
  					e.viewer.scene.pointclouds,
  					{pickClipped: true});*/
  				if (e != undefined) {
  					let i = this.spheres.indexOf(e.currentMeasuringControlPoint);
  					if (i !== -1) {
  						// FIXME: to be removed, this part was for point in point cloud
  						/*let point = this.points[i];
  						for (let key of Object.keys(I.point).filter(e => e !== 'position')) {
  							point[key] = I.point[key];
  						}*/

  						this.setPosition(i, e.location);
  					}
  				}
  			};

  			let drop = e => {
  				let i = this.spheres.indexOf(e.currentMeasuringControlPoint);
  				if (i !== -1) {
  					this.dispatchEvent({
  						'type': 'marker_dropped',
  						'measurement': this,
  						'index': i
  					});
  				}
  			};

  			let mouseover = (e) => e.object.material.emissive.setHex(0x888888);
  			let mouseleave = (e) => e.object.material.emissive.setHex(0x000000);

  			// HTC: these events are not working since they are not handled in Viewer.onMouseMove
  			sphere.addEventListener('drag', drag);
  			sphere.addEventListener('drop', drop);
  			sphere.addEventListener('mouseover', mouseover);
  			sphere.addEventListener('mouseleave', mouseleave);
  		}

  		let event = {
  			type: 'marker_added',
  			measurement: this,
  			sphere: sphere
  		};
  		this.dispatchEvent(event);

  		this.setMarker(this.points.length - 1, point);
  	};

  	removeMarker (index) {
  		this.points.splice(index, 1);

  		this.remove(this.spheres[index]);

  		let edgeIndex = (index === 0) ? 0 : (index - 1);
  		this.remove(this.edges[edgeIndex]);
  		this.edges.splice(edgeIndex, 1);

  		this.remove(this.edgeLabels[edgeIndex]);
  		this.edgeLabels.splice(edgeIndex, 1);
  		this.coordinateLabels.splice(index, 1);

  		this.spheres.splice(index, 1);

  		this.update();

  		this.dispatchEvent({type: 'marker_removed', measurement: this});
  	};

  	setMarker (index, point) {
  		this.points[index] = point;

  		let event = {
  			type: 'marker_moved',
  			measure:	this,
  			index:	index,
  			position: point.position.clone()
  		};
  		this.dispatchEvent(event);

  		this.update();
  	}

  	setPosition (index, position) {
  		let point = this.points[index];
  		point.position.copy(position);

  		let event = {
  			type: 'marker_moved',
  			measure:	this,
  			index:	index,
  			position: position.clone()
  		};
  		this.dispatchEvent(event);

  		this.update();
  	};

  	getArea () {
  		let area = 0;
  		let j = this.points.length - 1;

  		for (let i = 0; i < this.points.length; i++) {
  			let p1 = this.points[i].position;
  			let p2 = this.points[j].position;
  			area += (p2.x + p1.x) * (p1.y - p2.y);
  			j = i;
  		}

  		return Math.abs(area / 2);
  	};

  	getTotalDistance () {
  		if (this.points.length === 0) {
  			return 0;
  		}

  		let distance = 0;

  		for (let i = 1; i < this.points.length; i++) {
  			let prev = this.points[i - 1].position;
  			let curr = this.points[i].position;
  			let d = prev.distanceTo(curr);

  			distance += d;
  		}

  		if (this.closed && this.points.length > 1) {
  			let first = this.points[0].position;
  			let last = this.points[this.points.length - 1].position;
  			let d = last.distanceTo(first);

  			distance += d;
  		}

  		return distance;
  	}

  	getAngleBetweenLines (cornerPoint, point1, point2) {
  		let v1 = new THREE.Vector3().subVectors(point1.position, cornerPoint.position);
  		let v2 = new THREE.Vector3().subVectors(point2.position, cornerPoint.position);
  		return v1.angleTo(v2);
  	};

  	getAngle (index) {
  		if (this.points.length < 3 || index >= this.points.length) {
  			return 0;
  		}

  		let previous = (index === 0) ? this.points[this.points.length - 1] : this.points[index - 1];
  		let point = this.points[index];
  		let next = this.points[(index + 1) % (this.points.length)];

  		return this.getAngleBetweenLines(point, previous, next);
  	};

  	update () {
  		if (this.points.length === 0) {
  			return;
  		} else if (this.points.length === 1) {
  			let point = this.points[0];
  			let position = point.position;
  			this.spheres[0].position.copy(position);

  			{ // coordinate labels
  				let coordinateLabel = this.coordinateLabels[0];
  				
  				// reflect global shift
  				let adjustedPosition = position.clone().sub(this.globalShiftVector);
  				let msg = adjustedPosition.toArray().map(p => MeasureUtils.addCommas(p.toFixed(2))).join(", ");
  				//let msg = MeasureUtils.addCommas(position.z.toFixed(2) + " " + this.lengthUnit.code);
  				coordinateLabel.setText(msg);

  				coordinateLabel.visible = this.showCoordinates;
  			}

  			return;
  		}

  		let lastIndex = this.points.length - 1;

  		let centroid = new THREE.Vector3();
  		for (let i = 0; i <= lastIndex; i++) {
  			let point = this.points[i];
  			centroid.add(point.position);
  		}
  		centroid.divideScalar(this.points.length);

  		for (let i = 0; i <= lastIndex; i++) {
  			let index = i;
  			let nextIndex = (i + 1 > lastIndex) ? 0 : i + 1;
  			let previousIndex = (i === 0) ? lastIndex : i - 1;

  			let point = this.points[index];
  			let nextPoint = this.points[nextIndex];
  			let previousPoint = this.points[previousIndex];

  			let sphere = this.spheres[index];

  			// spheres
  			sphere.position.copy(point.position);
  			sphere.material.color = this.color;

  			{ // edges
  				let edge = this.edges[index];

  				edge.material.color = this.lineColor;

  				edge.position.copy(point.position);

  				edge.geometry.vertices[0].set(0, 0, 0);
  				edge.geometry.vertices[1].copy(nextPoint.position).sub(point.position);

  				edge.geometry.verticesNeedUpdate = true;
  				edge.geometry.computeBoundingSphere();
  				edge.visible = index < lastIndex || this.closed;
  			}

  			{ // edge labels
  				let edgeLabel = this.edgeLabels[i];

  				let center = new THREE.Vector3().add(point.position);
  				center.add(nextPoint.position);
  				center = center.multiplyScalar(0.5);
  				let distance = point.position.distanceTo(nextPoint.position);

  				edgeLabel.position.copy(center);
  				edgeLabel.setText(MeasureUtils.addCommas(distance.toFixed(2)) + ' ' + this.lengthUnit.code);
  				edgeLabel.visible = this.showDistances && (index < lastIndex || this.closed) && this.points.length >= 2 && distance > 0;
  			}

  			{ // angle labels
  				let angleLabel = this.angleLabels[i];
  				let angle = this.getAngleBetweenLines(point, previousPoint, nextPoint);

  				let dir = nextPoint.position.clone().sub(previousPoint.position);
  				dir.multiplyScalar(0.5);
  				dir = previousPoint.position.clone().add(dir).sub(point.position).normalize();

  				let dist = Math.min(point.position.distanceTo(previousPoint.position), point.position.distanceTo(nextPoint.position));
  				dist = dist / 9;

  				let labelPos = point.position.clone().add(dir.multiplyScalar(dist));
  				angleLabel.position.copy(labelPos);

  				let msg = MeasureUtils.addCommas((angle * (180.0 / Math.PI)).toFixed(1)) + '\u00B0';
  				angleLabel.setText(msg);

  				angleLabel.visible = this.showAngles && (index < lastIndex || this.closed) && this.points.length >= 3 && angle > 0;
  			}
  		}

  		{ // update height stuff
  			let heightEdge = this.heightEdge;
  			heightEdge.visible = this.showHeight;
  			this.heightLabel.visible = this.showHeight;

  			if (this.showHeight) {
  				let sorted = this.points.slice().sort((a, b) => a.position.z - b.position.z);
  				let lowPoint = sorted[0].position.clone();
  				let highPoint = sorted[sorted.length - 1].position.clone();
  				let min = lowPoint.z;
  				let max = highPoint.z;
  				let height = max - min;

  				let start = new THREE.Vector3(highPoint.x, highPoint.y, min);
  				let end = new THREE.Vector3(highPoint.x, highPoint.y, max);

  				heightEdge.position.copy(lowPoint);

  				heightEdge.geometry.vertices[0].set(0, 0, 0);
  				heightEdge.geometry.vertices[1].copy(start).sub(lowPoint);
  				heightEdge.geometry.vertices[2].copy(start).sub(lowPoint);
  				heightEdge.geometry.vertices[3].copy(end).sub(lowPoint);

  				heightEdge.geometry.verticesNeedUpdate = true;
  				// heightEdge.geometry.computeLineDistances();
  				// heightEdge.geometry.lineDistancesNeedUpdate = true;
  				heightEdge.geometry.computeBoundingSphere();

  				// heightEdge.material.dashSize = height / 40;
  				// heightEdge.material.gapSize = height / 40;

  				let heightLabelPosition = start.clone().add(end).multiplyScalar(0.5);
  				this.heightLabel.position.copy(heightLabelPosition);
  				let msg = MeasureUtils.addCommas(height.toFixed(2)) + ' ' + this.lengthUnit.code;
  				this.heightLabel.setText(msg);
  			}
  		}

  		{ // update area label
  			this.areaLabel.position.copy(centroid);
  			this.areaLabel.visible = this.showArea && this.points.length >= 3;
  			let msg = MeasureUtils.addCommas(this.getArea().toFixed(1)) + ' ' + this.lengthUnit.code + '\u00B2';
  			this.areaLabel.setText(msg);
  		}
  	};

  	raycast (raycaster, intersects) {
  		for (let i = 0; i < this.points.length; i++) {
  			let sphere = this.spheres[i];

  			sphere.raycast(raycaster, intersects);
  		}

  		// recalculate distances because they are not necessarely correct
  		// for scaled objects.
  		// see https://github.com/mrdoob/three.js/issues/5827
  		// TODO: remove this once the bug has been fixed
  		for (let i = 0; i < intersects.length; i++) {
  			let I = intersects[i];
  			I.distance = raycaster.ray.origin.distanceTo(I.point);
  		}
  		intersects.sort(function (a, b) { return a.distance - b.distance; });
  	};

  	get showCoordinates () {
  		return this._showCoordinates;
  	}

  	set showCoordinates (value) {
  		this._showCoordinates = value;
  		this.update();
  	}

  	get showAngles () {
  		return this._showAngles;
  	}

  	set showAngles (value) {
  		this._showAngles = value;
  		this.update();
  	}

  	get showHeight () {
  		return this._showHeight;
  	}

  	set showHeight (value) {
  		this._showHeight = value;
  		this.update();
  	}

  	get showArea () {
  		return this._showArea;
  	}

  	set showArea (value) {
  		this._showArea = value;
  		this.update();
  	}

  	get closed () {
  		return this._closed;
  	}

  	set closed (value) {
  		this._closed = value;
  		this.update();
  	}

  	get showDistances () {
  		return this._showDistances;
  	}

  	set showDistances (value) {
  		this._showDistances = value;
  		this.update();
  	}
  }

  /**
   * adopted from Potree
   */

  class MeasureTool extends THREE.EventDispatcher {
  	constructor (_viewer, _renderer, _scene, _camera, _setCurrentMeasuringControlPoint) {
  		super();

  		this.viewer = _viewer;
  		this.renderer = _renderer;
  		this.scene = _scene;
  		this.camera = _camera;
  		this.setCurrentMeasuringControlPoint = _setCurrentMeasuringControlPoint;

  		/*this.addEventListener('start_inserting_measurement', e => {
  			this.viewer.dispatchEvent({
  				type: 'cancel_insertions'
  			});
  		});*/
  		
  		//this.scene.name = 'scene_measurement';
  		//this.light = new THREE.PointLight(0xffffff, 1.0);
  		//this.scene.add(this.light);

  		/*this.viewer.inputHandler.registerInteractiveScene(this.scene);

  		this.onRemove = (e) => { this.scene.remove(e.measurement);};
  		this.onAdd = e => {this.scene.add(e.measurement);};

  		for(let measurement of viewer.scene.measurements){
  			this.onAdd({measurement: measurement});
  		}

  		viewer.addEventListener("update", this.update.bind(this));
  		viewer.addEventListener("render.pass.perspective_overlay", this.render.bind(this));
  		viewer.addEventListener("scene_changed", this.onSceneChange.bind(this));

  		viewer.scene.addEventListener('measurement_added', this.onAdd);
  		viewer.scene.addEventListener('measurement_removed', this.onRemove);*/

  		this.measurements = [];
  	}

  	/*onSceneChange(e){
  		if(e.oldScene){
  			e.oldScene.removeEventListener('measurement_added', this.onAdd);
  			e.oldScene.removeEventListener('measurement_removed', this.onRemove);
  		}

  		e.scene.addEventListener('measurement_added', this.onAdd);
  		e.scene.addEventListener('measurement_removed', this.onRemove);
  	}*/

  	startInsertion (args = {}) {
  		let domElement = this.renderer.domElement;

  		let measure = new Measure(args.globalShiftVector != undefined ? args.globalShiftVector : new THREE.Vector3());

  		this.dispatchEvent({
  			type: 'start_inserting_measurement',
  			measure: measure
  		});

  		measure.showDistances = (args.showDistances === null) ? true : args.showDistances;
  		measure.showArea = args.showArea || false;
  		measure.showAngles = args.showAngles || false;
  		measure.showCoordinates = args.showCoordinates || false;
  		measure.showHeight = args.showHeight || false;
  		measure.closed = args.closed || false;
  		measure.maxMarkers = args.maxMarkers || Infinity;
  		measure.name = args.name || 'Measurement';

  		this.scene.add(measure);

  		let cancel = {
  			removeLastMarker: measure.maxMarkers > 3,
  			callback: null
  		};

  		let insertionCallback = (e) => {
  			if (e.button === THREE.MOUSE.LEFT) {
  				if (measure.points.length >= measure.maxMarkers) {
  					cancel.callback();
  				}else{
  					measure.addMarker(measure.points[measure.points.length - 1].position.clone());
  					this.setCurrentMeasuringControlPoint(measure.spheres[measure.spheres.length - 1]);
  					//this.viewer.inputHandler.startDragging(
  					//	measure.spheres[measure.spheres.length - 1]);
  				}											
  			} else if (e.button === THREE.MOUSE.RIGHT) {
  				cancel.callback();
  			}
  		};

  		cancel.callback = e => {
  			if (cancel.removeLastMarker) {
  				measure.removeMarker(measure.points.length - 1);
  			}
  			domElement.removeEventListener('mouseup', insertionCallback, true);
  			//this.viewer.removeEventListener('cancel_insertions', cancel.callback);
  			this.setCurrentMeasuringControlPoint(null);
  		};

  		//if (measure.maxMarkers > 1) {
  			//this.viewer.addEventListener('cancel_insertions', cancel.callback);
  			domElement.addEventListener('mouseup', insertionCallback, true);
  		//}

  		measure.addMarker(new THREE.Vector3(0, 0, 0));
  		this.setCurrentMeasuringControlPoint(measure.spheres[measure.spheres.length - 1]);
  		//this.viewer.inputHandler.startDragging(
  		//	measure.spheres[measure.spheres.length - 1]);

  		this.measurements.push(measure);
  		//this.viewer.scene.addMeasurement(measure);

  		return measure;
  	}

  	clearAllMeasurements() {
  		let measurements = this.measurements;
  		for (let measure of measurements) {
  			this.scene.remove(measure);
  		}		
  		this.measurements.length = 0;
  		// TODO: might want to dispose all three.js Object3D instances
  	}
  	
  	update(){
  		let camera = this.camera; // this.viewer.camera is already active camera
  		let domElement = this.renderer.domElement;
  		let measurements = this.measurements;

  		let size = new THREE.Vector2();
  		this.renderer.getSize(size);
  		let clientWidth = size.width;
  		let clientHeight = size.height;

  		//this.light.position.copy(camera.position);

  		// make size independant of distance
  		for (let measure of measurements) {
  			//measure.lengthUnit = this.viewer.lengthUnit;
  			measure.update();
  			
  			// spheres
  			for(let sphere of measure.spheres){
  				let worldPos = new THREE.Vector3();
  				sphere.getWorldPosition(worldPos);
  				let distance = camera.position.distanceTo(worldPos);
  				let pr = MeasureUtils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
  				let scale = (10 / pr);
  				sphere.scale.set(scale, scale, scale);
  			}

  			// labels
  			let labels = measure.edgeLabels.concat(measure.angleLabels);
  			for(let label of labels){
  				let worldPos = new THREE.Vector3();
  				label.getWorldPosition(worldPos);
  				let distance = camera.position.distanceTo(worldPos);
  				let pr = MeasureUtils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
  				let scale = (70 / pr);
  				label.scale.set(scale, scale, scale);
  			}

  			// coordinate labels
  			for (let j = 0; j < measure.coordinateLabels.length; j++) {
  				let label = measure.coordinateLabels[j];
  				let sphere = measure.spheres[j];
  				// measure.points[j]

  				let worldPos = new THREE.Vector3();
  				sphere.getWorldPosition(worldPos);
  				let distance = camera.position.distanceTo(worldPos);

  				let screenPos = worldPos.clone().project(camera);
  				screenPos.x = Math.round((screenPos.x + 1) * clientWidth / 2);
  				screenPos.y = Math.round((-screenPos.y + 1) * clientHeight / 2);
  				screenPos.z = 0;
  				screenPos.y -= 30;

  				let labelPos = new THREE.Vector3( 
  					(screenPos.x / clientWidth) * 2 - 1, 
  					-(screenPos.y / clientHeight) * 2 + 1, 
  					0.5 );
  				labelPos.unproject(camera);

  				if(this.viewer.isPerspectiveMode()) {
  					let direction = labelPos.sub(camera.position).normalize();
  					labelPos = new THREE.Vector3().addVectors(
  						camera.position, direction.multiplyScalar(distance));

  				}
  				label.position.copy(labelPos);
  				let pr = MeasureUtils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
  				let scale = (70 / pr);
  				label.scale.set(scale, scale, scale);
  			}

  			// height label
  			if (measure.showHeight) {
  				let label = measure.heightLabel;

  				{
  					let distance = label.position.distanceTo(camera.position);
  					let pr = MeasureUtils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
  					let scale = (70 / pr);
  					label.scale.set(scale, scale, scale);
  				}

  				{ // height edge
  					let edge = measure.heightEdge;
  					let lowpoint = edge.geometry.vertices[0].clone().add(edge.position);
  					let start = edge.geometry.vertices[2].clone().add(edge.position);
  					let end = edge.geometry.vertices[3].clone().add(edge.position);

  					let lowScreen = lowpoint.clone().project(camera);
  					let startScreen = start.clone().project(camera);
  					let endScreen = end.clone().project(camera);

  					let toPixelCoordinates = v => {
  						let r = v.clone().addScalar(1).divideScalar(2);
  						r.x = r.x * clientWidth;
  						r.y = r.y * clientHeight;
  						r.z = 0;

  						return r;
  					};

  					let lowEL = toPixelCoordinates(lowScreen);
  					let startEL = toPixelCoordinates(startScreen);
  					let endEL = toPixelCoordinates(endScreen);

  					let lToS = lowEL.distanceTo(startEL);
  					let sToE = startEL.distanceTo(endEL);

  					edge.geometry.lineDistances = [0, lToS, lToS, lToS + sToE];
  					edge.geometry.lineDistancesNeedUpdate = true;

  					edge.material.dashSize = 10;
  					edge.material.gapSize = 10;
  				}
  			}

  			{ // area label
  				let label = measure.areaLabel;
  				let distance = label.position.distanceTo(camera.position);
  				let pr = MeasureUtils.projectedRadius(1, camera, distance, clientWidth, clientHeight);

  				let scale = (70 / pr);
  				label.scale.set(scale, scale, scale);
  			}
  		}
  	}

  	/*render(){
  		this.viewer.renderer.render(this.scene, this.viewer.camera);
  	}*/
  }

  /**
   * adopted Potree and from http://stemkoski.github.io/Three.js/Sprite-Text-Labels.html
   */

  class TagSprite extends THREE.Object3D {
  	
  	constructor(text, location, options, onClick){
  		super();

  		if(options == null){
  			options = {};
  		}
  		let defaultTagOptions = {
  			shape: 'circle',
  			fontName: 'Helvetica',
  			fontSize: 30,
  			fontColor: { r: 255, g: 255, b: 255, a: 1.0 },
  			backgroundColor: { r: 183, g: 28, b: 28, a: 1.0 },
  			borderColor: { r: 255, g: 255, b: 255, a: 1.0 },
  			borderThickness: 0,
  			visibleBehindObjects: true,
  			pulse: false,
  		};

  		this.onClick = onClick;

  		let texture = new THREE.Texture();
  		texture.minFilter = THREE.LinearFilter;
  		texture.magFilter = THREE.LinearFilter;
  		let spriteMaterial = new THREE.SpriteMaterial({
  			map: texture,
  			depthTest: !options.visibleBehindObjects,
  			depthWrite: false});

  		this.material = spriteMaterial;
  		this.sprite = new THREE.Sprite(spriteMaterial);
  		this.add(this.sprite);
  		
  		this.fontface = options.fontName || defaultTagOptions.fontName;
  		this.fontsize = options.fontSize || defaultTagOptions.fontSize;
  		this.backgroundColor = options.backgroundColor || defaultTagOptions.backgroundColor;
  		this.borderColor = options.borderColor || defaultTagOptions.borderColor;
  		this.borderThickness = options.borderThickness || defaultTagOptions.borderThickness;		
  		this.fontColor = options.fontColor || defaultTagOptions.fontColor;
  		this.shape = options.shape || defaultTagOptions.shape;

  		// this.ringX;
  		// this.ringY;
  		// this.ringRadius;
  		// this.ringCounter=0;
  		// this.ringCounterVelocity;

  		this.setText(text);
  		this.setPosition(location.x, location.y, location.z);
  	}

  	setText(text){
  		if (this.text !== text){
  			this.text = text;
  			this.update();
  		}
  	};

  	setPosition(x,y,z){
  		this.position.set(x,y,z);
  	};

  	setTextColor(color){
  		// this.fontColor = color;
  		// this.update();
  	};

  	setBorderColor(color){
  		// this.borderColor = color;
  		// this.update();
  	};

  	setBackgroundColor(color){
  		// this.backgroundColor = color;
  		// this.update();
  	};

  	update(){
  		let canvas = document.createElement('canvas');
  		let context = canvas.getContext('2d');
  		context.font = 'Bold ' + this.fontsize + 'px ' + this.fontface; // 

  		// get size data (height depends only on font size)
  		let metrics = context.measureText(this.text);
  		let textWidth = metrics.width;
  		let margin = 5;
  		let spriteWidth = 2 * margin + textWidth * 1.4 + 2 * this.borderThickness;
  		//console.log("fontsize: "+this.text+this.fontsize);
  		let spriteHeight = 2 * margin+ this.fontsize * 1.4 + 2 * this.borderThickness;

  		context.canvas.width = spriteWidth;
  		if(this.shape == "circle"){
  			//console.log("circle");
  			context.canvas.height = spriteWidth;//for circle
  			spriteWidth = 2 * margin + textWidth * 1.2 + 2 * this.borderThickness;
  			spriteHeight = spriteWidth;
  			// spriteHeight = 2 * margin+ textWidth * 1.2 + 2 * this.borderThickness;
  		}
  		else if(this.shape == "triangle"){
  			//console.log("rect");
  			context.canvas.height = spriteWidth;//for triangle
  			// spriteWidth = 2 * margin + textWidth * 1.2 + 2 * this.borderThickness;
  			// spriteHeight = 2 * margin+ this.fontsize * 1.2 + 2 * this.borderThickness;
  		}
  		else{//rect
  			context.canvas.height = spriteHeight;
  		}
  		context.font = 'Bold ' + this.fontsize + 'px ' + this.fontface;

  		// background color
  		context.fillStyle = 'rgba(' + this.backgroundColor.r + ',' + this.backgroundColor.g + ',' +
  			this.backgroundColor.b + ',' + this.backgroundColor.a + ')';
  		
  		// border color
  		if(this.borderThickness > 0){
  			context.strokeStyle = 'rgba(' + this.borderColor.r + ',' + this.borderColor.g + ',' +
  			this.borderColor.b + ',' + this.borderColor.a + ')';
  			context.lineWidth = this.borderThickness;
  		}else{
  			context.strokeStyle = 'rgba(0, 0, 0, 0)';
  		}

  		// text color
  		// HTC: disable text border
  		//context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
  		//context.strokeText(this.text, this.borderThickness + margin, this.fontsize + this.borderThickness);

  		//change sprite shape from option.shape
  		if(this.shape == "rectangular"){
  			context.textAlign = "start";
  			this.roundRect(context,
  							this.borderThickness / 2,
  							this.borderThickness / 2,
  							textWidth + this.borderThickness + 2 * margin,
  							this.fontsize * 1.4 + this.borderThickness,
  							6);
  			context.fillStyle = 'rgba(' + this.fontColor.r + ',' + this.fontColor.g + ',' +
  			this.fontColor.b + ',' + this.fontColor.a + ')';
  			context.fillText(this.text, this.borderThickness + margin, this.fontsize + this.borderThickness);
  		}
  		else if(this.shape == "circle"){
  			let metrics = context.measureText(this.text);
  			let textWidth = metrics.width;
  			context.textAlign = "center";
  			let circleCenterX = spriteWidth/2;
  			let circleCenterY = spriteHeight/2;
  			this.fillCircle(context,circleCenterX,circleCenterY,spriteWidth/2);
  			context.fillStyle = 'rgba(' + this.fontColor.r + ',' + this.fontColor.g + ',' +
  			this.fontColor.b + ',' + this.fontColor.a + ')';
  			// console.log(this.text);
  			// console.log("spriteWidth"+spriteWidth);
  			// console.log("spriteHeight"+spriteHeight);
  			// console.log("fontsize"+this.fontsize);
  			// console.log("borderThickness"+this.borderThickness);
  			let textCenterX = spriteWidth/2;
  			let textCenterY = spriteHeight/2 + textWidth/2;
  			//console.log("textCenterX"+textCenterX);
  			//console.log("textCenterY"+textCenterY);
  			context.fillText(this.text, textCenterX, textCenterY);
  		}
  		else if(this.shape =="triangle"){
  			context.textAlign = "start";
  			this.fillTriangle(context,
  							  this.borderThickness / 2,
  							  this.borderThickness / 2,
  							  textWidth + this.borderThickness + 2 * margin);
  			context.fillStyle = 'rgba(' + this.fontColor.r + ',' + this.fontColor.g + ',' +
  			this.fontColor.b + ',' + this.fontColor.a + ')';
  			// context.fillText(this.text, this.borderThickness + margin, this.fontsize + this.borderThickness);
  			context.fillText(this.text, this.borderThickness + margin, this.fontsize + this.borderThickness);
  		}

  		let texture = new THREE.Texture(canvas);
  		texture.minFilter = THREE.LinearFilter;
  		texture.magFilter = THREE.LinearFilter;
  		texture.needsUpdate = true;

  		this.sprite.material.map = texture;

  		this.sprite.scale.set(spriteWidth * 0.01 * 0.9, spriteHeight * 0.01 * 0.9, 1.0);

  		// this.ring(context,canvas,5,5);
  	};

  	roundRect(ctx, x, y, w, h, r){
  		ctx.beginPath();
  		ctx.moveTo(x + r, y);
  		ctx.lineTo(x + w - r, y);
  		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  		ctx.lineTo(x + w, y + h - r);
  		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  		ctx.lineTo(x + r, y + h);
  		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  		ctx.lineTo(x, y + r);
  		ctx.quadraticCurveTo(x, y, x + r, y);
  		ctx.closePath();
  		ctx.fill();
  		ctx.stroke();
  	};

  	fillCircle(ctx,x,y,radius){
  		// Radius should be determined by Math.max(width, height)
  		// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
  		ctx.beginPath();
  		ctx.arc(x, y, radius-this.borderThickness/2, 0, 2 * Math.PI);
  		ctx.stroke();
  		ctx.arc(x, y, radius-this.borderThickness, 0, 2 * Math.PI);
  		ctx.fill();
  	}

  	fillTriangle(ctx,x,y,w){
  		ctx.beginPath();
  		ctx.moveTo(x, y + w*1.732);
  		ctx.lineTo(x + w, y + w*1.732);
  		ctx.lineTo(x + w/2, y);
  		ctx.closePath();
  		ctx.fill();
  		ctx.stroke();
  	}

  	//pulse effect from http://jsfiddle.net/m1erickson/JYP8T/
  	//NEED FIX
  	// ring(ctx,canvas,x, y) {
  	// 	this.ringX = x;
  	// 	this.ringY = y;
  	// 	this.ringRadius = 0;
  	// 	this.ringCounter = 0;
  	// 	this.ringCounterVelocity = 4;
  	
  	// 	console.log("ringringring");
  	// 	requestAnimationFrame(this.animate(ctx,canvas));
  	// }

  	// animate(ctx,canvas) {

  	// 	// return if the animation is complete
  	// 	if (this.ringCounter > 200) {
  	// 		return;
  	// 	}

  	// 	// otherwise request another animation loop
  	// 	requestAnimationFrame(this.animate);
  	
  	// 	// ringCounter<100 means the ring is expanding
  	// 	// ringCounter>=100 means the ring is shrinking
  	// 	if (this.ringCounter < 100) {
  	// 		// expand the ring using easeInCubic easing
  	// 		this.ringRadius = this.easeInCubic(this.ringCounter, 0, 15, 100);
  	// 	} else {
  	// 		// shrink the ring using easeOutCubic easing
  	// 		this.ringRadius = this.easeOutCubic(this.ringCounter - 100, 15, -15, 100);
  	// 	}
  	
  	// 	// draw the ring at the radius set using the easing functions
  	// 	ctx.fillRect(0, 0, canvas.width, canvas.height);
  	// 	ctx.beginPath();
  	// 	ctx.arc(this.ringX, this.ringY, this.ringRadius, 0, Math.PI * 2);
  	// 	// ctx.arc(5, 5, 5, 0, Math.PI * 2);
  	// 	ctx.closePath();
  	// 	ctx.stroke();
  	
  	// 	// increment the ringCounter for the next loop
  	// 	this.ringCounter += this.ringCounterVelocity;
  	// 	console.log("animate");;
  	// }

  	// easeInCubic(now, startValue, deltaValue, duration) {
  	// 	return deltaValue * (now /= duration) * now * now + startValue;
  	// }
  	
  	// easeOutCubic(now, startValue, deltaValue, duration) {
  	// 	return deltaValue * ((now = now / duration - 1) * now * now + 1) + startValue;
  	// }
  }

  /**
   * Tween.js - Licensed under the MIT license
   * https://github.com/tweenjs/tween.js
   * ----------------------------------------------
   *
   * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
   * Thank you all, you're awesome!
   */

  var TWEEN$1 = TWEEN$1 || (function () {

  	var _tweens = [];

  	return {

  		getAll: function () {

  			return _tweens;

  		},

  		removeAll: function () {

  			_tweens = [];

  		},

  		add: function (tween) {

  			_tweens.push(tween);

  		},

  		remove: function (tween) {

  			var i = _tweens.indexOf(tween);

  			if (i !== -1) {
  				_tweens.splice(i, 1);
  			}

  		},

  		update: function (time, preserve) {

  			if (_tweens.length === 0) {
  				return false;
  			}

  			var i = 0;

  			time = time !== undefined ? time : TWEEN$1.now();

  			while (i < _tweens.length) {

  				if (_tweens[i].update(time) || preserve) {
  					i++;
  				} else {
  					_tweens.splice(i, 1);
  				}

  			}

  			return true;

  		}
  	};

  })();


  // Include a performance.now polyfill.
  // In node.js, use process.hrtime.
  if (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {
  	TWEEN$1.now = function () {
  		var time = process.hrtime();

  		// Convert [seconds, nanoseconds] to milliseconds.
  		return time[0] * 1000 + time[1] / 1000000;
  	};
  }
  // In a browser, use window.performance.now if it is available.
  else if (typeof (window) !== 'undefined' &&
           window.performance !== undefined &&
  		 window.performance.now !== undefined) {
  	// This must be bound, because directly assigning this function
  	// leads to an invocation exception in Chrome.
  	TWEEN$1.now = window.performance.now.bind(window.performance);
  }
  // Use Date.now if it is available.
  else if (Date.now !== undefined) {
  	TWEEN$1.now = Date.now;
  }
  // Otherwise, use 'new Date().getTime()'.
  else {
  	TWEEN$1.now = function () {
  		return new Date().getTime();
  	};
  }


  TWEEN$1.Tween = function (object) {

  	var _object = object;
  	var _valuesStart = {};
  	var _valuesEnd = {};
  	var _valuesStartRepeat = {};
  	var _duration = 1000;
  	var _repeat = 0;
  	var _repeatDelayTime;
  	var _yoyo = false;
  	var _isPlaying = false;
  	var _delayTime = 0;
  	var _startTime = null;
  	var _easingFunction = TWEEN$1.Easing.Linear.None;
  	var _interpolationFunction = TWEEN$1.Interpolation.Linear;
  	var _chainedTweens = [];
  	var _onStartCallback = null;
  	var _onStartCallbackFired = false;
  	var _onUpdateCallback = null;
  	var _onCompleteCallback = null;
  	var _onStopCallback = null;

  	this.to = function (properties, duration) {

  		_valuesEnd = properties;

  		if (duration !== undefined) {
  			_duration = duration;
  		}

  		return this;

  	};

  	this.start = function (time) {

  		TWEEN$1.add(this);

  		_isPlaying = true;

  		_onStartCallbackFired = false;

  		_startTime = time !== undefined ? time : TWEEN$1.now();
  		_startTime += _delayTime;

  		for (var property in _valuesEnd) {

  			// Check if an Array was provided as property value
  			if (_valuesEnd[property] instanceof Array) {

  				if (_valuesEnd[property].length === 0) {
  					continue;
  				}

  				// Create a local copy of the Array with the start value at the front
  				_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);

  			}

  			// If `to()` specifies a property that doesn't exist in the source object,
  			// we should not set that property in the object
  			if (_object[property] === undefined) {
  				continue;
  			}

  			// Save the starting value.
  			_valuesStart[property] = _object[property];

  			if ((_valuesStart[property] instanceof Array) === false) {
  				_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
  			}

  			_valuesStartRepeat[property] = _valuesStart[property] || 0;

  		}

  		return this;

  	};

  	this.stop = function () {

  		if (!_isPlaying) {
  			return this;
  		}

  		TWEEN$1.remove(this);
  		_isPlaying = false;

  		if (_onStopCallback !== null) {
  			_onStopCallback.call(_object, _object);
  		}

  		this.stopChainedTweens();
  		return this;

  	};

  	this.end = function () {

  		this.update(_startTime + _duration);
  		return this;

  	};

  	this.stopChainedTweens = function () {

  		for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
  			_chainedTweens[i].stop();
  		}

  	};

  	this.delay = function (amount) {

  		_delayTime = amount;
  		return this;

  	};

  	this.repeat = function (times) {

  		_repeat = times;
  		return this;

  	};

  	this.repeatDelay = function (amount) {

  		_repeatDelayTime = amount;
  		return this;

  	};

  	this.yoyo = function (yoyo) {

  		_yoyo = yoyo;
  		return this;

  	};


  	this.easing = function (easing) {

  		_easingFunction = easing;
  		return this;

  	};

  	this.interpolation = function (interpolation) {

  		_interpolationFunction = interpolation;
  		return this;

  	};

  	this.chain = function () {

  		_chainedTweens = arguments;
  		return this;

  	};

  	this.onStart = function (callback) {

  		_onStartCallback = callback;
  		return this;

  	};

  	this.onUpdate = function (callback) {

  		_onUpdateCallback = callback;
  		return this;

  	};

  	this.onComplete = function (callback) {

  		_onCompleteCallback = callback;
  		return this;

  	};

  	this.onStop = function (callback) {

  		_onStopCallback = callback;
  		return this;

  	};

  	this.update = function (time) {

  		var property;
  		var elapsed;
  		var value;

  		if (time < _startTime) {
  			return true;
  		}

  		if (_onStartCallbackFired === false) {

  			if (_onStartCallback !== null) {
  				_onStartCallback.call(_object, _object);
  			}

  			_onStartCallbackFired = true;
  		}

  		elapsed = (time - _startTime) / _duration;
  		elapsed = elapsed > 1 ? 1 : elapsed;

  		value = _easingFunction(elapsed);

  		for (property in _valuesEnd) {

  			// Don't update properties that do not exist in the source object
  			if (_valuesStart[property] === undefined) {
  				continue;
  			}

  			var start = _valuesStart[property] || 0;
  			var end = _valuesEnd[property];

  			if (end instanceof Array) {

  				_object[property] = _interpolationFunction(end, value);

  			} else {

  				// Parses relative end values with start as base (e.g.: +10, -3)
  				if (typeof (end) === 'string') {

  					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
  						end = start + parseFloat(end);
  					} else {
  						end = parseFloat(end);
  					}
  				}

  				// Protect against non numeric properties.
  				if (typeof (end) === 'number') {
  					_object[property] = start + (end - start) * value;
  				}

  			}

  		}

  		if (_onUpdateCallback !== null) {
  			_onUpdateCallback.call(_object, value);
  		}

  		if (elapsed === 1) {

  			if (_repeat > 0) {

  				if (isFinite(_repeat)) {
  					_repeat--;
  				}

  				// Reassign starting values, restart by making startTime = now
  				for (property in _valuesStartRepeat) {

  					if (typeof (_valuesEnd[property]) === 'string') {
  						_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
  					}

  					if (_yoyo) {
  						var tmp = _valuesStartRepeat[property];

  						_valuesStartRepeat[property] = _valuesEnd[property];
  						_valuesEnd[property] = tmp;
  					}

  					_valuesStart[property] = _valuesStartRepeat[property];

  				}

  				if (_repeatDelayTime !== undefined) {
  					_startTime = time + _repeatDelayTime;
  				} else {
  					_startTime = time + _delayTime;
  				}

  				return true;

  			} else {

  				if (_onCompleteCallback !== null) {

  					_onCompleteCallback.call(_object, _object);
  				}

  				for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
  					// Make the chained tweens start exactly at the time they should,
  					// even if the `update()` method was called way past the duration of the tween
  					_chainedTweens[i].start(_startTime + _duration);
  				}

  				return false;

  			}

  		}

  		return true;

  	};

  };


  TWEEN$1.Easing = {

  	Linear: {

  		None: function (k) {

  			return k;

  		}

  	},

  	Quadratic: {

  		In: function (k) {

  			return k * k;

  		},

  		Out: function (k) {

  			return k * (2 - k);

  		},

  		InOut: function (k) {

  			if ((k *= 2) < 1) {
  				return 0.5 * k * k;
  			}

  			return - 0.5 * (--k * (k - 2) - 1);

  		}

  	},

  	Cubic: {

  		In: function (k) {

  			return k * k * k;

  		},

  		Out: function (k) {

  			return --k * k * k + 1;

  		},

  		InOut: function (k) {

  			if ((k *= 2) < 1) {
  				return 0.5 * k * k * k;
  			}

  			return 0.5 * ((k -= 2) * k * k + 2);

  		}

  	},

  	Quartic: {

  		In: function (k) {

  			return k * k * k * k;

  		},

  		Out: function (k) {

  			return 1 - (--k * k * k * k);

  		},

  		InOut: function (k) {

  			if ((k *= 2) < 1) {
  				return 0.5 * k * k * k * k;
  			}

  			return - 0.5 * ((k -= 2) * k * k * k - 2);

  		}

  	},

  	Quintic: {

  		In: function (k) {

  			return k * k * k * k * k;

  		},

  		Out: function (k) {

  			return --k * k * k * k * k + 1;

  		},

  		InOut: function (k) {

  			if ((k *= 2) < 1) {
  				return 0.5 * k * k * k * k * k;
  			}

  			return 0.5 * ((k -= 2) * k * k * k * k + 2);

  		}

  	},

  	Sinusoidal: {

  		In: function (k) {

  			return 1 - Math.cos(k * Math.PI / 2);

  		},

  		Out: function (k) {

  			return Math.sin(k * Math.PI / 2);

  		},

  		InOut: function (k) {

  			return 0.5 * (1 - Math.cos(Math.PI * k));

  		}

  	},

  	Exponential: {

  		In: function (k) {

  			return k === 0 ? 0 : Math.pow(1024, k - 1);

  		},

  		Out: function (k) {

  			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

  		},

  		InOut: function (k) {

  			if (k === 0) {
  				return 0;
  			}

  			if (k === 1) {
  				return 1;
  			}

  			if ((k *= 2) < 1) {
  				return 0.5 * Math.pow(1024, k - 1);
  			}

  			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

  		}

  	},

  	Circular: {

  		In: function (k) {

  			return 1 - Math.sqrt(1 - k * k);

  		},

  		Out: function (k) {

  			return Math.sqrt(1 - (--k * k));

  		},

  		InOut: function (k) {

  			if ((k *= 2) < 1) {
  				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
  			}

  			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

  		}

  	},

  	Elastic: {

  		In: function (k) {

  			if (k === 0) {
  				return 0;
  			}

  			if (k === 1) {
  				return 1;
  			}

  			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

  		},

  		Out: function (k) {

  			if (k === 0) {
  				return 0;
  			}

  			if (k === 1) {
  				return 1;
  			}

  			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

  		},

  		InOut: function (k) {

  			if (k === 0) {
  				return 0;
  			}

  			if (k === 1) {
  				return 1;
  			}

  			k *= 2;

  			if (k < 1) {
  				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
  			}

  			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

  		}

  	},

  	Back: {

  		In: function (k) {

  			var s = 1.70158;

  			return k * k * ((s + 1) * k - s);

  		},

  		Out: function (k) {

  			var s = 1.70158;

  			return --k * k * ((s + 1) * k + s) + 1;

  		},

  		InOut: function (k) {

  			var s = 1.70158 * 1.525;

  			if ((k *= 2) < 1) {
  				return 0.5 * (k * k * ((s + 1) * k - s));
  			}

  			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

  		}

  	},

  	Bounce: {

  		In: function (k) {

  			return 1 - TWEEN$1.Easing.Bounce.Out(1 - k);

  		},

  		Out: function (k) {

  			if (k < (1 / 2.75)) {
  				return 7.5625 * k * k;
  			} else if (k < (2 / 2.75)) {
  				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
  			} else if (k < (2.5 / 2.75)) {
  				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
  			} else {
  				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
  			}

  		},

  		InOut: function (k) {

  			if (k < 0.5) {
  				return TWEEN$1.Easing.Bounce.In(k * 2) * 0.5;
  			}

  			return TWEEN$1.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

  		}

  	}

  };

  TWEEN$1.Interpolation = {

  	Linear: function (v, k) {

  		var m = v.length - 1;
  		var f = m * k;
  		var i = Math.floor(f);
  		var fn = TWEEN$1.Interpolation.Utils.Linear;

  		if (k < 0) {
  			return fn(v[0], v[1], f);
  		}

  		if (k > 1) {
  			return fn(v[m], v[m - 1], m - f);
  		}

  		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

  	},

  	Bezier: function (v, k) {

  		var b = 0;
  		var n = v.length - 1;
  		var pw = Math.pow;
  		var bn = TWEEN$1.Interpolation.Utils.Bernstein;

  		for (var i = 0; i <= n; i++) {
  			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
  		}

  		return b;

  	},

  	CatmullRom: function (v, k) {

  		var m = v.length - 1;
  		var f = m * k;
  		var i = Math.floor(f);
  		var fn = TWEEN$1.Interpolation.Utils.CatmullRom;

  		if (v[0] === v[m]) {

  			if (k < 0) {
  				i = Math.floor(f = m * (1 + k));
  			}

  			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

  		} else {

  			if (k < 0) {
  				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
  			}

  			if (k > 1) {
  				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
  			}

  			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

  		}

  	},

  	Utils: {

  		Linear: function (p0, p1, t) {

  			return (p1 - p0) * t + p0;

  		},

  		Bernstein: function (n, i) {

  			var fc = TWEEN$1.Interpolation.Utils.Factorial;

  			return fc(n) / fc(i) / fc(n - i);

  		},

  		Factorial: (function () {

  			var a = [1];

  			return function (n) {

  				var s = 1;

  				if (a[n]) {
  					return a[n];
  				}

  				for (var i = n; i > 1; i--) {
  					s *= i;
  				}

  				a[n] = s;
  				return s;

  			};

  		})(),

  		CatmullRom: function (p0, p1, p2, p3, t) {

  			var v0 = (p2 - p0) * 0.5;
  			var v1 = (p3 - p1) * 0.5;
  			var t2 = t * t;
  			var t3 = t * t2;

  			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

  		}

  	}

  };

  // UMD (Universal Module Definition)
  (function (root) {

  	if (typeof define === 'function' && define.amd) {

  		// AMD
  		define([], function () {
  			return TWEEN$1;
  		});

  	} else if (typeof module !== 'undefined' && typeof exports === 'object') {

  		// Node.js
  		module.exports = TWEEN$1;

  	} else if (root !== undefined) {

  		// Global variable
  		root.TWEEN = TWEEN$1;

  	}

  })(undefined);

  /**
   * bimU.io Viewer main application. You should always create an instance of Viewer by passing the ViewerConfiguration object into the constructor.
   * @class Viewer
   * @extends {THREE.EventDispatcher}
   * @param {ViewerConfiguration} configs - Viewer configuation object. See {@link ViewerConfiguration}.
   * @example
  let viewerConfigs = {
      domElementId: "viewer",
      baseUrl: "https://viewer.bimu.io/rest/api/v1",
      THREE: null,
      showFPS: true,
      showUI: false
  };
  let viewer = new bimU.Viewer(viewerConfigs);
   */
  class Viewer extends THREE$1.EventDispatcher {
      /**
       * Configuation object used to initialise bimU.io Viewer. 
       * @typedef {Object} ViewerConfiguration
       * @property {string} domElementId - DIV element ID
       * @property {boolean} showFPS - Whether show FPS meter.
       * @property {boolean} showUI - Whether show UI.
       * @property {string} buttonColor - CSS color keyword, RGBA, or Hex code for the default UI buttons.
       */
      constructor(configs) {
          super();

          if(configs == null){
              throw new Error("Viewer configuration cannot be null.");
          }
          if(configs.domElementId == null){
              throw new Error("DOM element ID cannot be null.");
          }
          if(document.getElementById(configs.domElementId) == null){
              throw new Error("The specified DOM element ID does not exist.");
          }
          let viewerConfigs = configs;
          viewerConfigs.showFPS = configs.showFPS || false;
          viewerConfigs.showUI = configs.showUI || false;
          viewerConfigs.buttonColor = configs.buttonColor || GLOBAL_CONFIGS.defaultButtonColor;

          window.THREE = window.THREE || viewerConfigs.THREE;
          if(window.THREE == null){
              throw new Error("Three.js must be loaded in global scope.");
          }
          if(window.THREE.REVISION < GLOBAL_CONFIGS.minThreeJsVersion || window.THREE.REVISION > GLOBAL_CONFIGS.maxThreeJsVersion){
              throw new Error("Please use a compatible Three.js version.");
          }

          let container = document.getElementById(viewerConfigs.domElementId);
          let containerWidth = container.clientWidth > GLOBAL_CONFIGS.minContainerSize ? container.clientWidth : GLOBAL_CONFIGS.minContainerSize;
          let containerHeight = container.clientHeight > GLOBAL_CONFIGS.minContainerSize ? container.clientHeight : GLOBAL_CONFIGS.minContainerSize;
          let model = null;

          let camera = null;
          let cameraC = null;

          // OrbitControls
          let oControls = null;
          let oControlsP = null;
          let oControlsO = null;
          let orbitCenterMousePt = null;
          let orbitCenterPoint = null;
          let zoomTimeoutId = null;
          let zoomTimeoutThreshold = 400; // ms

          // the following are constants depending on the scale of the scene
          // they need be adjusted according to your model scale
          let orthoZoomFactor = 1.025;
          let perspZoomFactor = 1; // factor determines how fast the user can zoom-in/out          
          let minTargetToCameraDistanceAllowed = 0.2; // this is the minimum radius the camera can orbit around a target.
          let modelBoundingBoxDiagonal; // determine model scale
          let zoomSpeedMultiplier = 0.05; // zoom step based on distance between camera and orbit center
          let minZoomSpeed = 1.0; // minimum zoom-in step
          let maxZoomSpeedMultiplier = 0.2; // how much you can zoom out as per model size (this.modelBoundingBoxDiagonal)

          let scene = null;
          let renderer = null;        

          //for object picking
          let raycaster = new THREE$1.Raycaster();
          //this.raycaster.firstHitOnly = true; // this cannot be enabled because it doesn't work in all cases though it is a bit faster
          let mouse = new THREE$1.Vector2();
          let mouseDownPt = new THREE$1.Vector2();
          //this.mouseMoveTHR = 2.5; // HTC: To be removed. Don't think we need this.
          let touchStartPt = new THREE$1.Vector2();

          let maxPt = new THREE$1.Vector3();
          let minPt = new THREE$1.Vector3();
          let center = new THREE$1.Vector3();

          let bbox = null; // boundung box in type Box3. This should never change.
          let boundingBoxThreshold = 100000000; // (10 km) ^ 2 
          let sectionBox = null; // seciton box in type BoxGeometry
          let sectionBoxEdge = null; // seciton box edge in type LineSegments
          // TODO: should we separate section box and BCF clipping planes
          let sectionPlanes = [];
          let s = 0.05; // expand bounding box to prevent from colliding with models
          // this.initSectionPlanes = [];

          // TransformControls
          let tControls = null;
          let tControlsP = null;
          let tControlsO = null;

          let selectedElements = {};
          let lastSelectedElementIndex = null;
          // let selectMode = 0;
          let addedObjects = {};
          let tags = {};
          let hiddenElementIndices = [];
          let viewerStatus = {selected: 0, hidden: 0, isolated: 0, transparent: 0, isSectioningEnabled: false, isPerspectiveMode: true, initialized: false, isModelLoaded: false, isDisposed: false};

          let CURSOR_STATE = { NONE: -1, SELECT: 0, MEASUREMENT: 1 };
          let cursorState = CURSOR_STATE.SELECT;

          // stats.js
          let stats = null;

          // UI
          let toolbarId = `${viewerConfigs.domElementId}-toolbar`;
          let toolbarContainer = null;
          let modalInstance = null;

          // measuring tools
          let measuringTool = null;
          let currentMeasuringControlPoint = undefined;
          let lastMouseEventTime = Date.now();
          let moveUpdateThreshold = 16;

          // WebXR
          let xrControls;
          let controller;
          let reticle;
          let hitTestSource = null;
          let hitTestSourceRequested = false;
          let currentXrSession = null;
          let localReferenceSpace = null;
  		let viewerReferenceSpace = null;
          const WEBXR_MODE = { NONE: -1, AR_ANCHOR: 0, AR_HIT_TEST: 1, VR: 2 };
          let currentXrMode = WEBXR_MODE.NONE;
          let initialARScale = 1.0;
          let isArLoaded = false;
          let isArSelectingElement = false;
          let arViewerPoseMatrix = new THREE$1.Matrix4();
          let isArIndoorPositioning = true;

          let addButtonInternal = (domId, tooltip, icon, callback, dropdownId) => {
              let buttonId = `${viewerConfigs.domElementId}-${domId}`;
              let htmlString = `<a id="${buttonId}" data-position="top" title="${tooltip}" data-tooltip="${tooltip}" data-target="${dropdownId}" href="#" style="margin: 5px; background: ${viewerConfigs.buttonColor};" class="${dropdownId ? "dropdown-trigger" : ""} btn-floating tooltipped"><i class="zmdi zmdi-${icon}"></i></a>`;
              toolbarContainer.insertAdjacentHTML('beforeend', htmlString);
              // Handle callback
              if(callback){
                  let button = document.getElementById(buttonId);
                  button.onclick = callback;
              }
          };

          let addDropdownInternal = (domId, options) => {
              let items = options.map(option => option.domId ? `<li><a id="${viewerConfigs.domElementId}-${option.domId}" href="#">${option.name}</a></li>` : `<li class="divider" tabindex="-1"></li>`);
              let htmlString = `
                <ul id="${domId}" class="dropdown-content">
                    ${items.join("")}
                </ul>
            `;
              toolbarContainer.insertAdjacentHTML('beforeend', htmlString);
              // Handle callback
              options.forEach(option => {
                  if(option.domId){
                      let item = document.getElementById(`${viewerConfigs.domElementId}-${option.domId}`);
                      item.onclick = option.callback;
                  }                
              });
          };

          /**
           * Displays a modal dialog with custom UI.
           * @param {string} title - Modal dialog title in plain text or HTML.
           * @param {string} body - Modal dialog body in plain text or HTML.
           * @param {string} closeButtonText - Display text of the Close button. Passing a null value will hide the button.
           * @param {string} okButtonText - Display text of the OK button. Passing a null value will hide the button.
           * @param {function} [okButtonCallback] - Callback function when the OK button is clicked.
           * @param {boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click.
           */
          this.showDialog = (title, body, closeButtonText, okButtonText, okButtonCallback, dismissible) => {
              checkViewerInitialization();

              if(!document.getElementById(toolbarId)){
                  throw new Error("Viewer UI was not enabled.");
              }

              if(closeButtonText == null && okButtonText == null){
                  throw new Error("Either closeButtonText or okButtonText must be present.");
              }

              let modalTitle = document.getElementById("modal-title");
              modalTitle.innerHTML = title || "";
              let modalBody = document.getElementById("modal-body");
              modalBody.innerHTML = body || "";
              let modalCloseButton = document.getElementById("modal-close-button");
              if(closeButtonText != null){
                  modalCloseButton.innerHTML = closeButtonText;
                  modalCloseButton.style.display = "inline-block";
              }else{
                  modalCloseButton.style.display = "none";
              }
              let modalOkButton = document.getElementById("modal-ok-button");
              if(okButtonText != null){
                  modalOkButton.innerHTML = okButtonText;
                  modalOkButton.onclick = okButtonCallback;
                  modalOkButton.style.display = "inline-block";
              }else{
                  modalOkButton.style.display = "none";
              }

              if(modalInstance){
                  modalInstance.options.dismissible = dismissible === undefined ? true : dismissible;
                  modalInstance.open();
              }else{
                  // workaround while script loading
                  let intervalId = setInterval(() => {
                      if(modalInstance){
                          modalInstance.options.dismissible = dismissible === undefined ? true : dismissible;
                          modalInstance.open();
                          clearInterval(intervalId);
                      }
                  }, 500);
              }
          };

          /**
           * Closes custom modal dialog.
           */
          this.closeDialog = () => {
              if(modalInstance){
                  modalInstance.close();
              }
          };

          /**
           * Displays user instructions in a modal dialog.
           */
          this.showHelp = () => {
              let orbit, zoom, pan, select, multiple;
              if(MiscHelper.isMobileDevice()){
                  orbit = "One Finger Drag";
                  zoom = "Two Finger Pinch";
                  pan = "Two Finger Drag";
                  select = "One Finger Tap";
                  multiple = "";
              }else{
                  orbit = "Mouse Left Drag";
                  zoom = "Mouse Wheel Scroll";
                  pan = "Mouse Wheel/Right Drag";
                  select = "Left Click + Ctrl";
                  multiple = "Multiple ";
              }
              let html = `
            <table class="bimU-table striped">
                <tbody>
                    <tr>
                        <td><strong>Orbit</strong></td>
                        <td>${orbit}</td>
                    </tr>
                    <tr>
                        <td><strong>Zoom</strong></td>
                        <td>${zoom}</td>
                    </tr>
                    <tr>
                        <td><strong>Pan</strong></td>
                        <td>${pan}</td>
                    </tr>
                    <tr>
                        <td><strong>${multiple}Select</strong></td>
                        <td>${select}</td>
                    </tr>
                </tbody>
            </table>`;
              this.showDialog("Model Navigation Tips", html, "Close");
          };

          /**
           * Displays selected element properties in a modal dialog.
           */
          this.showElementInformation = () => {
              let title = "Element Information";
              if(Object.keys(selectedElements).length == 0){
                  this.showDialog(title, "No element selected.", "Close");
                  return;
              }
              this.getElementDataByIndex(
                  lastSelectedElementIndex, 
                  (data) => {
                      let rows = [];
                      let parametersByGroup = MiscHelper.arrayGroupBy(data.properties, "group");
                      Object.keys(parametersByGroup).sort().forEach(group => {
                          // add group header of current group
                          rows.push(
                              `<tr class="property-group-header">
                                <th colspan="2">${group}</th>
                            </tr>`
                          );
                          // all properties fall into current category
                          let propertiesOfCurrentGroup = parametersByGroup[group].sort(function(a, b){
                              if(a.n < b.n) return -1;
                              if(a.n > b.n) return 1;
                              return 0;
                          }).map((property, i) => {
                              return(
                                  `<tr>
                                    <th>${property.name}</th>
                                    <td>${property.value}</td>
                                </tr>`
                              );
                          });
                          rows = rows.concat(propertiesOfCurrentGroup);
                      });
                      let html = `
                    <table class="bimU-table striped">
                        <tbody>
                            ${rows.join("")}                            
                        </tbody>
                    </table>`;
                      this.showDialog(title, html, "Close");
                  },
                  (e) => {
                      this.showDialog(title, e.error, "Close");
                  }
              );
          };

          // FIXME: test if viewer can initialized multiple times
          /**
           * Initializes bimU.io Viewer. This function must be called before using any other functions. 
           */
          this.initialize = () => {
              // scene
              scene = new THREE$1.Scene();

              // camera
              // note: cameraC includes cameraC.cameraP and cameraC.cameraO,
              // which are used to update the projection matrix of cameraC (but not posture)
              cameraC = new CombinedCamera( containerWidth, containerHeight, 60, 0.1, 10000000, -100000, 100000 );

              // set z-axis as up axis bcz convention from Revit, IFC, etc.
              cameraC.up.set( 0, 0, 1 );
              cameraC.cameraP.up.set( 0, 0, 1 );
              cameraC.cameraO.up.set( 0, 0, 1 );

              // this.cameraC.setZoom(5);
              camera = cameraC.cameraP;

              // renderer
              renderer = new THREE$1.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
              renderer.setSize(containerWidth, containerHeight);
              renderer.setClearColor(0xffffff, 1);
              renderer.xr.enabled = true;
              renderer.localClippingEnabled = true;
              container.appendChild(renderer.domElement);

              // Add default UIs
              if(viewerConfigs.showUI){
                  // Load styles
                  //MiscHelper.addExternalCss(GLOBAL_CONFIGS.materializeCssPath); // We might allow this option in the future
                  MiscHelper.addCssText(materializeCssString); // Only import those in need
                  MiscHelper.addExternalCss(GLOBAL_CONFIGS.materialIconsPath);
                  container.style.position='relative';

                  // Add html
                  let containerHtml = `<div id="${toolbarId}" style="position: absolute;padding-bottom: 10px;bottom: 0;text-align: center;width:inherit;"></div>`;
                  container.insertAdjacentHTML('beforeend', containerHtml);
                  toolbarContainer = document.getElementById(toolbarId);
                  addButtonInternal("zoom-to-fit-button", "Zoom to Fit", "aspect-ratio-alt", this.zoomToFit);
                  addButtonInternal("rotate-view-button", "Rotate View", "3d-rotation", null, "rotate-view-dropdown");
                  addDropdownInternal("rotate-view-dropdown", [
                      {domId: "top-view-menu-item", name: "Top View", callback: () => this.alignToView("top")},
                      {domId: "bottom-view-menu-item", name: "Bottom View", callback: () => this.alignToView("bottom")},
                      {domId: "front-view-menu-item", name: "Front View", callback: () => this.alignToView("front")},
                      {domId: "back-view-menu-item", name: "Back View", callback: () => this.alignToView("back")},
                      {domId: "left-view-menu-item", name: "Left View", callback: () => this.alignToView("left")},
                      {domId: "right-view-menu-item", name: "Right View", callback: () => this.alignToView("right")}
                  ]);
                  addButtonInternal("reset-visibility-button", "Reset Visibility", "refresh-alt", this.resetVisibility);
                  addButtonInternal("show-hide-section-box-button", "Section Box", "codepen", this.toggleSectionbox);
                  addButtonInternal("hide-elements-button", "Hide Elements", "eye-off", this.hideSelectedElements);
                  addButtonInternal("element-information-button", "Element Information", "format-list-bulleted", this.showElementInformation);                
                  if(!MiscHelper.isMobileDevice()){
                      addButtonInternal("measuring-tools-button", "Measuring Tool", "ruler", null, "measuring-tools-dropdown");
                      addDropdownInternal("measuring-tools-dropdown", [
                          {domId: "read-coordinates-menu-item", name: "Read Coordinates", callback: this.readCoordinates},
                          {domId: "measure-distance-menu-item", name: "Measure Distance", callback: this.measureDistance},
                          {domId: "measure-height-menu-item", name: "Measure Height", callback: this.measureHeight},
                          {domId: "measure-angle-menu-item", name: "Measure Angle", callback: this.measureAngle},
                          {domId: "measure-area-menu-item", name: "Measure Area", callback: this.measureArea},
                          {},
                          {domId: "clear-all-measurements-menu-item", name: "Clear All Measurements", callback: this.clearAllMeasurements}
                      ]);
                  }                
                  addButtonInternal("help-button", "Help", "help-outline", this.showHelp);
                  addButtonInternal("more-actions-button", "More Actions", "more-vert", null, "more-actions-dropdown");
                  addDropdownInternal("more-actions-dropdown", [
                      {domId: "zoom-to-selection-menu-item", name: "Zoom to Selection", callback: this.zoomToSelection},
                      {domId: "section-around-selection-menu-item", name: "Section around Selection", callback: this.sectionAroundSelection},
                      {domId: "isolate-elements-button", name: "Isolate Elements", callback: this.isolateSelectedElements},
                      {domId: "toggle-fullscreen-menu-item", name: "Fullscreen", callback: this.toggleFullscreen}
                  ]);

                  // Add modal
                  let  modalHtml = `
                <div id="bimU-modal" class="modal" style="position: absolute;">
                    <div class="modal-content">
                        <h4 id="modal-title"></h4>
                        <div id="modal-body"></div>
                    </div>
                    <div class="modal-footer">
                        <a id="modal-ok-button" href="#" class="btn-flat"></a>
                        <a id="modal-close-button"href="#" class="modal-close btn-flat"></a>
                    </div>
                </div>`;
                  container.insertAdjacentHTML('beforeend', modalHtml);

                  // Stop propagation to avoid interacting with model viewer                
                  preventClicking(toolbarContainer);
                  preventClicking(document.getElementById("bimU-modal"));

                  // Load scripts
                  MiscHelper.addExternalScript(GLOBAL_CONFIGS.materializeScriptPath, () => {
                      let elems = document.querySelectorAll('.tooltipped');
                      M.Tooltip.init(elems);
                      elems = document.querySelectorAll('.dropdown-trigger');
                      M.Dropdown.init(elems, {alignment: "right", constrainWidth: false});
                      elems = document.querySelectorAll('.modal');
                      modalInstance = M.Modal.init(elems, {opacity: 0})[0];                    
                  });            
              }
              
              if(viewerConfigs.showFPS){
                  stats = new Stats();
                  stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
                  document.body.appendChild( stats.domElement );
              }        

              // OrbitControls (perspective cam and orthographic cam)
              oControlsP = new OrbitControls( cameraC.cameraP, renderer.domElement );
              oControlsP.rotateSpeed = 1;
              oControlsP.zoomSpeed = 1;
              oControlsP.panSpeed = 1;
              oControlsP.enableMouseZoom = false; // We handle mouse zoom outside

              oControlsO = new OrbitControls( cameraC.cameraO, renderer.domElement );
              oControlsO.rotateSpeed = 1;
              oControlsO.zoomSpeed = 1;
              oControlsO.panSpeed = 1;
              oControlsO.enableMouseZoom = false; // We handle mouse zoom outside

              oControls = oControlsP;

              // TransformControls for section box (perspective cam and orthographic cam)
              // TODO: adjust size based on model scale
              tControlsP = new TransformControls( cameraC.cameraP, renderer.domElement, oControls );
              tControlsP.setSize( 1.5 );

              tControlsO = new TransformControls( cameraC.cameraO, renderer.domElement, oControls );
              tControlsO.setSize( 15 );

              tControls = tControlsP;

              let changeSectionRange = function( evt ) {
                  sectionBox.geometry.computeBoundingBox(); // MUST have this line, fuck! (spend all night ...)
                  maxPt = new THREE$1.Vector3().copy(
                          sectionBox.localToWorld( sectionBox.geometry.boundingBox.max.clone() )
                      );// global coor.
                  minPt = new THREE$1.Vector3().copy(
                          sectionBox.localToWorld( sectionBox.geometry.boundingBox.min.clone() )
                      );           

                  // TMP
                  sectionPlanes[0].constant = -minPt.x;
                  sectionPlanes[1].constant = maxPt.x;
                  sectionPlanes[2].constant = -minPt.y;
                  sectionPlanes[3].constant = maxPt.y;
                  sectionPlanes[4].constant = -minPt.z;
                  sectionPlanes[5].constant = maxPt.z;

                  model.setDoubleSide(true);
                  sectionBoxEdge.update();
                  // tControls.update();

                  // set sectioning enabled status badge
                  viewerStatus.isSectioningEnabled = true;
                  dispatchViewerStatus();
              };

              let onTransformControlChangeStart = function( evt ) {
                  oControls.enableRotate = false;
              };

              let onTransformControlChanged = function( evt ) {
                  oControls.enableRotate = true;
              };

              // Add listeners to TransformControls (attach sectionBox to it later)
              // Perspective
              tControlsP.addEventListener("touchStart", onTransformControlChangeStart);
              tControlsP.addEventListener("touchEnd", onTransformControlChanged);
              tControlsP.addEventListener("objectChange", changeSectionRange);
              // tControlsP.addEventListener("change", scope.render); // necessary? -> seems not. render is already recursive
              scene.add( tControlsP );

              // Orthographic
              tControlsO.addEventListener("touchStart", onTransformControlChangeStart);
              tControlsO.addEventListener("touchEnd", onTransformControlChanged);
              tControlsO.addEventListener("objectChange", changeSectionRange);
              // tControlsO.addEventListener("change", scope.render);  // necessary? -> seems not. render is already recursive
              scene.add( tControlsO );


              // lights
              let lights = [];
              lights.push(new THREE$1.AmbientLight( 0xffffff, .3 )); // white light
              lights.push(new THREE$1.DirectionalLight( 0xffffff, .6 ));
              lights[lights.length - 1].position.set( 1, 1, 1 ).normalize();
              lights.push(new THREE$1.DirectionalLight( 0xffffff, .3 ));
              lights[lights.length - 1].position.set( -1, 1, 1 ).normalize();
              lights.push(new THREE$1.DirectionalLight( 0xffffff, .2 ));
              lights[lights.length - 1].position.set( -1, -1, 1 ).normalize();
              lights.push(new THREE$1.DirectionalLight( 0xffffff, .1 ));
              lights[lights.length - 1].position.set( -1, 1, -1 ).normalize();
              for (let i=0; i < lights.length; i++) {
                  let light = lights[i];
                  scene.add( light );
              }

              // TODO: consider moving these events to the custom orbit control
              if(!MiscHelper.isSafariMobile()){ // Full screen on iOS is very clunky
                  window.addEventListener( 'resize', onWindowResize, false );
              }
              const resizeObserver = new ResizeObserver(entries => {
                  onWindowResize();
                  // Trigger render immediately to avoid background flickering
                  // But render() loop should not be called
                  // A relevant issue https://github.com/pixijs/pixi.js/issues/3395
                  renderer.render(scene, camera);
              });
              resizeObserver.observe(container);                          
              container.addEventListener( 'mouseup', onMouseUp, false );
              container.addEventListener( 'mousedown', onMouseDown, false );
              container.addEventListener( 'mousemove', onMouseMove, false );
              renderer.domElement.addEventListener( 'wheel', onMouseWheel, false );
              container.addEventListener( 'touchstart', onTouchStart, false );
              container.addEventListener( 'touchend', onTouchEnd, false );

              // set up Potree measuring tools
              measuringTool = new MeasureTool(this, renderer, scene, camera, setCurrentMeasuringControlPoint);

              // start to render and dispatch loaded event
              //render();
              renderer.setAnimationLoop( render );
              viewerStatus.initialized = true;
              dispatchViewerStatus();
              this.dispatchEvent({type: EventsEnum.ON_VIEWER_INITIALIZED, version: version, message: 'Hello bimU.io Viewer.'});
          };
          
          let dispatchViewerStatus = () => {
              this.dispatchEvent({type: EventsEnum.ON_VIEWER_STATUS_CHANGED, status: viewerStatus});
          };

          let preventClicking = (domElement) => {
              let stopPropagation = (e) => {
                  e.stopPropagation();
              };
              domElement.onmouseup = stopPropagation;
              domElement.onmousedown = stopPropagation;
              domElement.onmousemove = stopPropagation;
              domElement.ontouchstart = stopPropagation;
              domElement.ontouchend = stopPropagation;
          };
          
          /**
           * BCF-compatible viewpoint object.
           * @typedef {Object} Viewpoint
           * @property {Camera} camera - Perspective camera or orthographic camera.
           * @property {ClippingPlane[]} clippingPlanes - Clipping plane definition.
           * @property {string} originatingSystem - Where this viewpoint was created from.
           */
          /**
           * BCF-compatible camera object.
           * @typedef {Object} Camera
           * @property {XYZ} cameraViewPoint - Camera location.
           * @property {XYZ} cameraDirection - Camera direction.
           * @property {XYZ} cameraUpVector - Camera up vector.
           * @property {number} fieldOfView - Camera’s field of view angle in degrees.
           * @property {number} viewToWorldScale - Scaling from view to world.
           */
          /**
           * BCF-compatible clipping plane object.
           * @typedef {Object} ClippingPlane
           * @property {XYZ} normal - The normal to the plane.
           * @property {number} constant - The negative distance from the origin to the plane along the normal vector.
           */
          /**
           * BCF-compatible XYZ object.
           * @typedef {Object} XYZ
           * @property {number} x - X.
           * @property {number} y - Y.
           * @property {number} z - Z.
           */
          /**
           * Sets camera viewpoint and clipping planes.
           * @param  {Viewpoint} viewpointObject - The BCF compatible viewpoint definition. See {@link Viewpoint}.
           * @see {@link https://github.com/buildingSMART/BCF-XML/tree/release_2_1/Documentation#visualization-information-bcfv-file|BCF Documentation}
           */
          this.setViewpoint = (viewpointObject) => {

              // TODO: schema validation
      
              // handle global shift vector
              let globalShiftVector = model.globalShiftVector != undefined ? model.globalShiftVector : new THREE$1.Vector3();
              
              let camInfo = viewpointObject.camera;
              
              if (camInfo.fieldOfView > 0)
                  this.setProjectionMode(CameraTypesEnum.PERSPECTIVE, camInfo.fieldOfView);
              else
                  this.setProjectionMode(CameraTypesEnum.ORTHOGRAPHIC, camInfo.viewToWorldScale); // TODO: handle revit custom zoom factor
      
              let cam = camera;
              let controls = oControls;
              
              let cvp = new THREE$1.Vector3(camInfo.cameraViewPoint.x, camInfo.cameraViewPoint.y, camInfo.cameraViewPoint.z).sub(globalShiftVector);            cam.position.copy(cvp);
              // let coordsCvp = cam.position;
              // let tweenCvp = new TWEEN.Tween(coordsCvp) // Create a new tween that modifies 'coords'.
              //     .to(cvp, 1000) // Move to (300, 200) in 1 second.
              //     .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
              //     .onUpdate(() => {
              //         // Called after tween.js updates 'coords'.
              //         // Move 'box' to the position described by 'coords' with a CSS translation.
              //         cam.position.copy(coordsCvp);
              //     })
              //     .start(); // Start the tween immediately.

      
              let cuv = new THREE$1.Vector3(camInfo.cameraUpVector.x, camInfo.cameraUpVector.y, camInfo.cameraUpVector.z).normalize();
              //cam.up.copy(cuv);
              // HTC: what's the difference here?
              let q = new THREE$1.Quaternion().setFromUnitVectors(new THREE$1.Vector3(0, 1, 0), cuv);
              cam.quaternion.copy(q);
              // let coordsQ = cam.quaternion;
              // let tweenQ = new TWEEN.Tween(coordsQ) // Create a new tween that modifies 'coords'.
              //     .to(q, 1000) // Move to (300, 200) in 1 second.
              //     .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
              //     .onUpdate(() => {
              //         // Called after tween.js updates 'coords'.
              //         // Move 'box' to the position described by 'coords' with a CSS translation.
              //         cam.quaternion.copy(coordsQ);
              //     })
              //     .start(); // Start the tween immediately.
      
              let cd = new THREE$1.Vector3( camInfo.cameraDirection.x, camInfo.cameraDirection.y, camInfo.cameraDirection.z ).normalize();    
              // HTC: should we use Camrea.lookAt()?
              controls.target.set(
                  cvp.x + cd.x * 10,
                  cvp.y + cd.y * 10,
                  cvp.z + cd.z * 10
              );
              controls.update();
              
      
              let cpInfo = viewpointObject.clippingPlanes;               
              if(cpInfo != undefined && cpInfo.length > 0){

                  // empty array
                  sectionPlanes.length = 0;

                  cpInfo.forEach(sectionPlane => {
                      let normal = new THREE$1.Vector3(-sectionPlane.normal.x, -sectionPlane.normal.y, -sectionPlane.normal.z);
                      let constant = -sectionPlane.constant - normal.dot(globalShiftVector);
                      sectionPlanes.push(new THREE$1.Plane(normal, constant));
                  });
                  
                  model.setDoubleSide(true);
                  
                  viewerStatus.isSectioningEnabled = true;
                  dispatchViewerStatus();
              }

              // simulate zooming at the center of the container after rendering
              zoomTimeoutId = window.setTimeout(function(){
                  updateOrbitCenter({
                      offsetX: containerWidth / 2,
                      offsetY: containerHeight / 2
                  });
              }, zoomTimeoutThreshold);
      
              // TODO: handle element visibility
          };    

          /**
           * Sets camera viewpoint with animation
           * @param  {Viewpoint} viewpointObject - The BCF compatible viewpoint definition. See {@link Viewpoint}.
           * @see {@link https://github.com/buildingSMART/BCF-XML/tree/release_2_1/Documentation#visualization-information-bcfv-file|BCF Documentation}
           */
           this.setViewpointWithAnimation = (viewpointObject) => {
              let coords = this.getViewpoint().camera.cameraViewPoint;
              let tweenCvp = new TWEEN$1.Tween(coords) // Create a new tween that modifies 'coords'.
                  .to(viewpointObject.camera.cameraViewPoint, 1000) // Move to (300, 200) in 1 second.
                  .easing(TWEEN$1.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                  .onUpdate(() => {
                      // Called after tween.js updates 'coords'.
                      let viewpoint = viewpointObject;
                      viewpoint.camera.cameraViewPoint = coords;
                      this.setViewpoint(viewpoint);
                  })
                  .start(); // Start the tween immediately.
           };
          
          /**
           * Gets camera viewpoint and clipping planes.
           * @return  {Viewpoint} The BCF compatible viewpoint definition. See {@link Viewpoint}.
           * @see {@link https://github.com/buildingSMART/BCF-XML/tree/release_2_1/Documentation#visualization-information-bcfv-file|BCF Documentation}
           */
          this.getViewpoint = () => {
              // handle global shift vector
              let globalShiftVector = model.globalShiftVector != undefined ? 
                                          model.globalShiftVector : new THREE$1.Vector3();
      
              // CameraViewPoint
              let correctedCameraViewpoint = camera.position.clone().add(globalShiftVector);
              let cvp = {
                  x: correctedCameraViewpoint.x,
                  y: correctedCameraViewpoint.y,
                  z: correctedCameraViewpoint.z
              };
      
              // CameraDirection
              let dirVector = new THREE$1.Vector3();
              dirVector.subVectors(oControls.target, camera.position).normalize(); 
              // camera.getWorldDirection( dirVector );
              // or (almost the same)
              // let dirVector = new THREE.Vector3( 0, 0, -1 ); // the init direction of camera (is (0, 1, 0) now?)
              // dirVector.applyQuaternion( camera.quaternion );
              let cd = {
                  x: dirVector.x,
                  y: dirVector.y,
                  z: dirVector.z
              };
      
              // CameraUpVector
              let upVector = new THREE$1.Vector3();
              upVector.copy(new THREE$1.Vector3( 0, 1, 0 )).applyQuaternion(camera.quaternion);
              let cuv = {
                  x: upVector.x,
                  y: upVector.y,
                  z: upVector.z
              };
      
              let vws = 0.0,
                  fov = 0.0;
              if(cameraC.isPerspectiveMode) {
                  fov = camera.fov;
              } else {
                  vws = Math.abs(camera.top - camera.bottom) / camera.zoom;
              }
      
              let camInfo = {cameraViewPoint: cvp, cameraDirection: cd, cameraUpVector: cuv, viewToWorldScale: vws, fieldOfView: fov};
      
              let cpArr = [];
              sectionPlanes.forEach(item => {
                  let cpObj = {
                      normal: {x: -item.normal.x, y: -item.normal.y, z: -item.normal.z}, 
                      constant: - item.constant + item.normal.dot(globalShiftVector)
                  };
                  cpArr.push(cpObj);
              });
      
              return {camera: camInfo, clippingPlanes: cpArr, originatingSystem: "bimU.io Web Viewer"};
          };

          /**
           * Sets the section box orthogonally.
           * @param {THREE.Vector3} min - Minimum coordinates (lower-left-rear corner of the box).
           * @param {THREE.Vector3} max - Maximum coordinates (upper-right-front corner of the box).
           */
          this.setSectionBox = (min, max) => {
              // create bounding box
              let box = new THREE$1.Box3();
              box.expandByPoint(min);
              box.expandByPoint(max);
              // create section box
              removeSectionBox();
              initSectionBox(box);
              // reset zoom and orbit center
              let node = new THREE$1.Object3D();
              node.boundingBox = box;
              this.zoomToObject(node);
          };
      
          /**
           * Changes camera parameters directly.
           * @param {CameraTypesEnum} mode - Perspective camera or orthographic camera.
           * @param {number} value - Field of View or View to World Scale.
           */
          this.setProjectionMode = (mode, value) => {
              // update the position of cameraC (not necessary)
              cameraC.position.copy( camera.position );
      
              // turn off Transform Controls anyway ...
              tControls.detach();
              // this.sectionBox.visible = false;
      
              if (mode == CameraTypesEnum.PERSPECTIVE) { // to PerspectiveCamera
                  camera = cameraC.cameraP;
                  camera.position.copy(cameraC.cameraO.position);
                  camera.fov = value;
      
                  oControlsP.enabled = true;
                  oControlsP.target.set(oControls.target.x, oControls.target.y, oControls.target.z);
                  if(oControls.previousTarget != undefined){
                      oControlsP.previousTarget = oControls.previousTarget.clone();
                      oControlsP.coupleCenters = oControls.coupleCenters;
                  }
                  oControlsP.update();
                  oControlsO.enabled = false;
                  oControls = oControlsP;
      
                  cameraC.toPerspective();
      
                  tControls = tControlsP;    
              } else if (mode == CameraTypesEnum.ORTHOGRAPHIC) { // to OrthographicCamera
                  camera = cameraC.cameraO;
                  camera.position.copy( cameraC.cameraP.position );
                  camera.zoom = 1;
      
                  oControlsO.enabled = true;
                  oControlsO.target.set(oControls.target.x, oControls.target.y, oControls.target.z);
                  if(oControls.previousTarget != undefined){
                      oControlsO.previousTarget = oControls.previousTarget.clone();
                      oControlsO.coupleCenters = oControls.coupleCenters;
                  }            
                  oControlsO.update();
                  oControlsP.enabled = false;
                  oControls = oControlsO;
                  cameraC.toOrthographic();
      
                  cameraC.cameraO.right = containerWidth / containerHeight * value / 2;
                  cameraC.cameraO.left = -containerWidth / containerHeight * value / 2;
                  cameraC.cameraO.top = value / 2;
                  cameraC.cameraO.bottom = -value / 2;
                  cameraC.cameraO.updateProjectionMatrix();
                  cameraC.projectionMatrix = cameraC.cameraO.projectionMatrix;
      
                  tControls = tControlsO;
              }
      
              // this.tControls.attach(this.sectionBox);
              
              this.resetVisibility();
      
              viewerStatus.isPerspectiveMode = (mode == CameraTypesEnum.PERSPECTIVE);
              dispatchViewerStatus();
          };

          /**
           * Checks camera type.
           * @return  {boolean} Whether current camera is a perspective one. 
           */
          this.isPerspectiveMode = () => cameraC.isPerspectiveMode;
      
          /**
           * Toggles section box visibility.
           * @param {boolean} [isVisible] - Use true to show the section box or false to hide it. It toggles the visibility if the parameter is not set.
           */
          this.toggleSectionbox = (isVisible) => {
              if (typeof isVisible === "boolean" ? !isVisible : sectionBox.visible) {
                  sectionBox.visible = false;
                  sectionBoxEdge.visible = false;
                  tControls.detach();
              }else{
                  sectionBox.visible = true;
                  sectionBoxEdge.visible = true;
                  tControls.attach(sectionBox);                
              }
          };
      
          /**
           * Creates a section box around current selection.
           */
          this.sectionAroundSelection = () => {
              if(!this.anyElementSelected(true)) return;
      
              removeSectionBox();
              let box = this.getBoundingBoxBySelection();
              initSectionBox(box);
              this.toggleSectionbox();
              model.setDoubleSide(true);
              this.unselectAllElements();
              this.zoomToFit();
      
              // set sectioning enabled status badge
              viewerStatus.isSectioningEnabled = true;
              dispatchViewerStatus();
          };
      
          /**
           * Checks if there's any element selected.
           * @param {boolean} showWarning - Whether an event should be dispathed if there's no element selected.
           * @returns {boolean} Whether at least one element selected. 
           */
          this.anyElementSelected = (showWarning) => {
              if(Object.keys(selectedElements).length == 0){
                  if(showWarning){
                      this.dispatchEvent({type: EventsEnum.ON_VIEWER_ERROR, error: "No element is selected!"}); 
                  }
                  return false;
              }else{
                  return true;
              }
          };
      
          /**
           * Aligns current camera to an orthogonal view.
           * @param {string} viewOrientation - Valid values: 'top', 'bottom', 'front', 'back', 'left', 'right'. 
           */
          this.alignToView = (viewOrientation) => {
              // TODO: validation
              let views = {"top":[0.001,0,0],"bottom":[Math.PI+0.001,0,0],"front":[Math.PI/2,0,0],"back":[Math.PI/2,Math.PI,0],"left":[Math.PI,-Math.PI/2,Math.PI/2],"right":[0,Math.PI/2,Math.PI/2]};
              camera.rotation.x = views[viewOrientation][0];
              camera.rotation.y = views[viewOrientation][1];
              camera.rotation.z = views[viewOrientation][2];
              if(viewOrientation == "bottom"){
                  camera.up.set( 0, 0, -1 );
                  oControls.phiDirectionToggle = -1;
                  oControls.thetaDirectionToggle = -1;
              }else{
                  camera.up.set( 0, 0, 1 );
                  oControls.phiDirectionToggle = 1;
                  oControls.thetaDirectionToggle = 1;
              }
              oControls.thetaChangeCounter = 0;
              this.zoomToFit();
          };
      
          /**
           * Zooms model extent to fit current viewport.
           */
          this.zoomToFit = () => {
              let node = new THREE$1.Object3D();
              node.boundingBox = new THREE$1.Box3(minPt, maxPt);
              this.zoomToObject(node);
          };
      
          /**
           * Moves camera to focus on current selection.
           */
          this.zoomToSelection = () => {
              if(!this.anyElementSelected(true)) return;
      
              let node = new THREE$1.Object3D();
              node.boundingBox = this.getBoundingBoxBySelection();
              this.zoomToObject(node);
          };
      
          /**
           * Returns a bounding box of selected elements.
           * @returns {THREE.Box3} Represents an axis-aligned bounding box (AABB) in 3D space.
           */
          this.getBoundingBoxBySelection = () => {
              let box = new THREE$1.Box3();

              Object.keys(selectedElements).forEach(function(index) {
                  box.expandByObject(selectedElements[index]);
              /*
              model.meshGroup.children.forEach(mesh => {
                  let geometry = mesh.geometry;
                  let selecteds = geometry.attributes.selected.array
                  for (let j = 0; j < geometry.index.array.length; j++) {      
                      let index = geometry.index.array[j];
                      if(selecteds[index] == 1) {                        
                          let x = geometry.attributes.position.array[index * 3];
                          let y = geometry.attributes.position.array[index * 3 + 1];
                          let z = geometry.attributes.position.array[index * 3 + 2];
                          box.expandByPoint(new THREE.Vector3(x, y, z)); 
                      }
                  }
              */
              });
              return box;
          };    
          
          /**
           * Moves camera to focus on a particular 3D object.
           * @param {THREE.Object3D} object3D - The base class for most objects in Three.js.
           */
          this.zoomToObject = (object3D) => {
              camera.zoomTo(object3D, 1);
              let center = new THREE$1.Vector3();
              object3D.boundingBox.getCenter(center);
              if(orbitCenterPoint != undefined){
                  orbitCenterPoint.copy(center);
              }
              oControls.previousTarget.copy(center);
              oControls.target.copy(center);
          };

          let checkViewerInitialization = () => {
              if(!viewerStatus.initialized){
                  throw new Error("Cannot perform this operation because viewer is not initialized.");
              }
          };
          
          // TODO: Model configuration object docs
          /**
           * Loads model from bimU.io server.
           * @param {object} modelConfigs - Model configuration object.
           * @param {function} onProgress - Callback when model is being downloaded.
           * @param {function} onLoaded - Callback when model is fully loaded.
           * @param {function} onError - Callback when an error occurs.
           */
          // TODO: handle multiple models
          this.loadModel = (modelConfigs, onProgress, onLoaded, onError) => {
              checkViewerInitialization();

              model = new Model(modelConfigs, handleGeometry, onLoaded);
              if(onProgress != null){
                  model.addEventListener(EventsEnum.ON_MODEL_PROGRESS, onProgress);
              }
              if(onError != null){
                  model.addEventListener(EventsEnum.ON_MODEL_ERROR, onError);
              }            
          };

          // handle some vertices too far away
          let handleBoundingBox = () => {
              const { meshGroup } = model;
              meshGroup.children.forEach(mesh => {
                  let meshBox = new THREE$1.Box3().setFromObject( mesh );
                  let meshBoxCenter = new THREE$1.Vector3();
                  meshBox.getCenter(meshBoxCenter);
                  let bboxCenter = new THREE$1.Vector3();
                  bbox.getCenter(bboxCenter);
                  if(meshBoxCenter.distanceToSquared(bboxCenter) < boundingBoxThreshold){
                      bbox.union(meshBox);
                  }
              });            
          };
      
          let handleGeometry = (model) => {
              const { meshGroup, onLoaded } = model;
      
              // Get pos of 2 corners from 'boundingBox'
              // model.geometry.computeBoundingBox();
      
              // set up bounding box for whole model
              if(!bbox){
                  bbox = new THREE$1.Box3();
              }            
              handleBoundingBox();
              console.log("Bounding Box: ", bbox);
      
              // model.geometry.center(); // Center the geometry based on the bounding box.
      
              // set up section box
              initSectionBox();
      
              // determine perps zoom speed by model size
              modelBoundingBoxDiagonal = maxPt.distanceTo( minPt );
              // TODO: This is emprical formula. Might need to change based on renderer size later.
              perspZoomFactor *= 1 + Math.pow(modelBoundingBoxDiagonal / 100, 2);
      
              // set camera at the "max" point of bbox
              camera.position.set(maxPt.x, minPt.y, maxPt.z);
      
              // set center as average of max and min
              // this.center.set((this.maxPt.x + this.minPt.x) / 2, (this.maxPt.y + this.minPt.y) / 2, (this.maxPt.z + this.minPt.z) / 2);
              let bboxCenter = new THREE$1.Vector3();
              bbox.getCenter(bboxCenter);
              center.set( bboxCenter.x, bboxCenter.y, bboxCenter.z );
      
              meshGroup.matrixAutoUpdate = true;
              scene.add( meshGroup );            
      
              oControls.target.set( center.x, center.y, center.z );
              oControls.previousTarget.set( center.x, center.y, center.z );      
                  
              // update control
              oControls.update();
      
              // fit view
              this.zoomToFit();
      
              // callback
              onLoaded({type: EventsEnum.ON_MODEL_LOADED});
              viewerStatus.isModelLoaded = true;
          };
      
          let initSectionBox = (box) => {
              let newBox = box != undefined ? box : bbox;
              
              // Set sectionBox as the same size as boundingBox of model initially
              let newBoxSize = new THREE$1.Vector3();
              newBox.getSize(newBoxSize);
              
              let buffer = newBoxSize.multiplyScalar(s);
              maxPt = new THREE$1.Vector3().copy( newBox.max ).add( buffer );
              minPt = new THREE$1.Vector3().copy( newBox.min ).sub( buffer );
      
              let hex = 0xff0000;
              let geometry = new THREE$1.BoxGeometry(
                  maxPt.x - minPt.x,
                  maxPt.y - minPt.y,
                  maxPt.z - minPt.z);
              let material = new THREE$1.MeshBasicMaterial( {color: hex} );
              material.transparent = true;
              material.opacity = 0.01;
              material.side = THREE$1.DoubleSide;
      
              sectionBox = new THREE$1.Mesh( geometry, material );
              sectionBox.renderOrder = 1; // *********
              let newBoxCenter = new THREE$1.Vector3();
              newBox.getCenter(newBoxCenter);
              sectionBox.position.copy(newBoxCenter);
              // this.sectionBox.position.set(0, 0, 0);
              sectionBox.visible = false;
              scene.add( sectionBox );
      
              // Set array of section planes according to sectionBox
              // this.sectionBox.geometry.faces.forEach(function(item, index) {
                  // console.log(item.normal);
                  // if (index < 1) {
                  //     scope.sectionPlanes.push(new THREE.Plane( new THREE.Vector3( item.normal.x, item.normal.y, item.normal.z ), this.max));
                  // }
              // })
      
              sectionPlanes.push(new THREE$1.Plane( new THREE$1.Vector3(
                  sectionBox.geometry.faces[0].normal.x, sectionBox.geometry.faces[0].normal.y, sectionBox.geometry.faces[0].normal.z),
                  -(minPt.x)));
              sectionPlanes.push(new THREE$1.Plane( new THREE$1.Vector3(
                  sectionBox.geometry.faces[2].normal.x, sectionBox.geometry.faces[2].normal.y, sectionBox.geometry.faces[2].normal.z),
                  maxPt.x));
              sectionPlanes.push(new THREE$1.Plane( new THREE$1.Vector3(
                  sectionBox.geometry.faces[4].normal.x, sectionBox.geometry.faces[4].normal.y, sectionBox.geometry.faces[4].normal.z),
                  -(minPt.y)));
              sectionPlanes.push(new THREE$1.Plane( new THREE$1.Vector3(
                  sectionBox.geometry.faces[6].normal.x, sectionBox.geometry.faces[6].normal.y, sectionBox.geometry.faces[6].normal.z),
                  maxPt.y));
              sectionPlanes.push(new THREE$1.Plane( new THREE$1.Vector3(
                  sectionBox.geometry.faces[8].normal.x, sectionBox.geometry.faces[8].normal.y, sectionBox.geometry.faces[8].normal.z),
                  -(minPt.z)));
              sectionPlanes.push(new THREE$1.Plane( new THREE$1.Vector3(
                  sectionBox.geometry.faces[10].normal.x, sectionBox.geometry.faces[10].normal.y, sectionBox.geometry.faces[10].normal.z),
                  maxPt.z));
      
              // Set visual edge of section box
              sectionBoxEdge = new THREE$1.BoxHelper( sectionBox, hex ); // return type: LineSegments
              sectionBoxEdge.visible = false;
              scene.add( sectionBoxEdge );
      
              // Set clippingPlanes to all model materials
              model.meshGroup.children.forEach(mesh => {
                  mesh.material.forEach(function(mat) {
                      mat.clippingPlanes = sectionPlanes;
                  });
              });
              // Set clippingPlanes to all added objects materials
              Object.keys(addedObjects).forEach(uuid => {
                  let object  = addedObjects[uuid];
                  applySectionPlanesRecursively(object);
              });
          };

          let applySectionPlanesRecursively = (object) => {
              if (object.type == "Group"){
                  object.children.forEach(o => {
                      applySectionPlanesRecursively(o);
                  });
              }else{
                  if (typeof object.material == "array"){
                      object.material.forEach(function(mat) {
                          mat.clippingPlanes = sectionPlanes;
                          mat.side = THREE$1.DoubleSide;
                      });
                  }else if(object.material != undefined){
                      object.material.clippingPlanes = sectionPlanes;
                      object.material.side = THREE$1.DoubleSide;
                  }
              }
          };
      
          let render = (timestamp, xrFrame) => {
              // Stop here if viewer has been disposed
              if(viewerStatus.isDisposed) return;

              if(viewerConfigs.showFPS) stats.begin();
      
              //requestAnimationFrame( render );
              // A built in function that can be used instead of requestAnimationFrame. For WebXR projects this function (setAnimationLoop) must be used.
              //renderer.setAnimationLoop( render );

              TWEEN$1.update(timestamp);

              if (xrFrame) {
                  //let referenceSpace = renderer.xr.getReferenceSpace();
                  //let session = renderer.xr.getSession();
                  if(!isArLoaded){                   
                      if (hitTestSourceRequested === false && currentXrMode == WEBXR_MODE.AR_HIT_TEST) {
                          currentXrSession.requestHitTestSource({space: viewerReferenceSpace}).then(function (source){
                              hitTestSource = source;
                          });

                          currentXrSession.addEventListener('end', function() {
                              hitTestSourceRequested = false;
                              hitTestSource = null;
                          });

                          hitTestSourceRequested = true;
                      }
                      if (hitTestSource) {
                          var hitTestResults = xrFrame.getHitTestResults(hitTestSource);
                          if (hitTestResults.length) {
                              var hit = hitTestResults[ 0 ];                            
                              reticle.matrix.fromArray(hit.getPose(localReferenceSpace).transform.matrix);
                              reticle.visible = true;
                              this.dispatchEvent({type: EventsEnum.ON_AR_HIT_TEST_RESULT_FOUND});
                          } else {
                              reticle.visible = false;
                              this.dispatchEvent({type: EventsEnum.ON_AR_HIT_TEST_RESULT_LOST});
                          }
                      }
                  }                

                  if(isArLoaded && isArSelectingElement){
                      let matrix;
                      // iOS WebXR Viewer seems to have a different convention
                      if(MiscHelper.isMacOS()){
                          matrix = xrFrame.getPose(localReferenceSpace, viewerReferenceSpace).transform.matrix;
                      }else{
                          matrix = xrFrame.getViewerPose(localReferenceSpace).transform.matrix;
                      }
                      arViewerPoseMatrix.fromArray(matrix);
                  }

                  if(isArLoaded && isArIndoorPositioning){
                      console.log("AR indoor poisitioning updated");
                      let matrix;
                      // iOS WebXR Viewer seems to have a different convention
                      //if(MiscHelper.isMacOS()){
                      //    matrix = xrFrame.getPose(localReferenceSpace, viewerReferenceSpace).transform.matrix;
                      //}else{
                          matrix = xrFrame.getViewerPose(localReferenceSpace).transform.matrix;
                      //}
                      arViewerPoseMatrix.fromArray(matrix);
                  }
              }
      
              renderer.render(scene, camera);
              tControls.update(); // necessary: gizmo scale
      
              measuringTool.update();
      
              //this.composer.render();
      
              if(viewerConfigs.showFPS) stats.end();
          };
      
          let onWindowResize = () => {
              let isFullscreen = MiscHelper.isFullScreen();
              containerWidth = isFullscreen ? window.innerWidth : container.clientWidth;
              containerHeight = isFullscreen ? window.innerHeight : container.clientHeight;
      
              renderer.setSize( containerWidth, containerHeight );
      
              cameraC.cameraP.aspect = containerWidth / containerHeight;
              cameraC.cameraP.updateProjectionMatrix();
              cameraC.updateProjectionMatrix();
          };

          /**
           * Unselects all selected elements.
           */
          this.unselectAllElements = () => {
              Object.keys(selectedElements).forEach(function(index) {            
                  selectedElements[index].geometry.dispose();
                  selectedElements[index].material.dispose();
                  scene.remove(selectedElements[index]);            
                  delete selectedElements[index];
              /*        
              model.meshGroup.children.forEach(mesh => {
                  let geometry = mesh.geometry;
                  setColorAttrs(geometry, Object.keys(selectedElements).map(Number), null, null, false); // Key is string
              */
              });
              selectedElements = {};
      
              viewerStatus.selected = 0;
              dispatchViewerStatus();
          };

          /**
           * Makes all hidden elements visible.
           */
          this.unhideAllElements = () => {
              // This is a workaround when hiddenElementIndices has too many elements, especially when isolating.
              this.setVisibility([0], false, true);
              this.setVisibility([0], true);
          };
      
          /**
           * Unhides all elements and clears all section planes.
           */
          this.resetVisibility = () => {
              this.unhideAllElements();
              this.clearAllColorOverrides();
      
              removeSectionBox();
              initSectionBox();
              model.setDoubleSide(false);
      
              viewerStatus.isSectioningEnabled = false;
              dispatchViewerStatus();
          };
      
          let removeSectionBox = () => {
              scene.remove( sectionBox );
              sectionBox = null;
              scene.remove( sectionBoxEdge );
              sectionBoxEdge = null;
              sectionPlanes = [];
              tControls.detach();
          };
      
          /**
           * Makes elements hidden or visible.
           * @param {number[]} elementIndices - An array of element indices.
           * @param {boolean} isVisible - True is visible. False is hidden.
           * @param {boolean} [invertOthers] - True to set all other elements inversely. Default is false.
           */
          this.setVisibility = (elementIndices, isVisible, invertOthers) => {
              if(!Array.isArray(elementIndices)){
                  throw new Error("elementIndices must be an array.");
              }

              if(elementIndices.length == 0){
                  throw new Error("elementIndices must contain at least one element.");
              }

              // clear all temp meshes beforehand
              this.unselectAllElements();

              let allOtherElementIndices = [];
              model.meshGroup.children.forEach(mesh => {
                  let geometry = mesh.geometry;
                  for (let i = 0; i < geometry.attributes.visible.array.length; i++) {
                      let eIdx = geometry.attributes.attributeData.array.attr[i * 4 + 1];
                      if (elementIndices.includes(eIdx)){
                          geometry.attributes.visible.array[i] = isVisible ? 1.0 : 0.0; // visible: 1, hidden: 0
                      }else if(invertOthers){
                          geometry.attributes.visible.array[i] = !isVisible ? 1.0 : 0.0; // visible: 1, hidden: 0
                          allOtherElementIndices.push(eIdx);
                      }
                  }
                  geometry.attributes.visible.needsUpdate = true;
              });
              if(isVisible){
                  hiddenElementIndices = invertOthers ? allOtherElementIndices : hiddenElementIndices.filter(index => !elementIndices.includes(index));
              }else{
                  if(invertOthers){
                      hiddenElementIndices.length = 0; // empty array
                  }
                  hiddenElementIndices.push(...elementIndices);
              }

              // TODO: handle bounding box (for zoom to fit) if invertOthers is true

              viewerStatus.selected = Object.keys(selectedElements).length;
              viewerStatus.hidden = hiddenElementIndices.length;
              dispatchViewerStatus();
          };
      
          /**
           * Makes all selected elements invisible.
           */
          this.hideSelectedElements = () => {            
              let selectedElementIndices = this.getElementIndicesBySelection();
              this.setVisibility(selectedElementIndices, false);
          };

          /**
           * Hides all unselected elements.
           */
          this.isolateSelectedElements = () => {
              this.zoomToSelection();            
              let selectedElementIndices = this.getElementIndicesBySelection();            
              this.setVisibility(selectedElementIndices, true, true);
          };
      
          /**
           * Checks whether a 3D point is within the current section box.
           * @param {THREE.Vector3} point - A 3D point.
           */
          this.isPointInSectionBox = (point) => {
              let isInSectionBox = true;
              for (let i = 0; i < sectionPlanes.length; i++){
                  if (sectionPlanes[i].distanceToPoint( point ) < 0) {
                      isInSectionBox = false;
                      break;
                  }
              }
      
              return isInSectionBox;
          };
      
          let firstIntersectObject = (intersects) => {            
              let _firstIntersectObject = null, _elementIndex = null;      
              for (let i = 0; i < intersects.length; i++) {                
                  if (this.isPointInSectionBox(intersects[i].point)) {
                      _firstIntersectObject = intersects[i];

                      // check if it's a tag
                      // TODO: check performance
                      let tag = _firstIntersectObject.object.parent;
                      if(tag instanceof TagSprite){                        
                          // fire tag callback if any
                          if(MiscHelper.isFunction(tag.onClick)){
                              tag.onClick();
                          }

                          return {elementIndex: null, firstIntersectObject: _firstIntersectObject};
                      }

                      let geometry = _firstIntersectObject.object.geometry;
                      if (geometry != null && geometry.attributes != null && geometry.attributes.attributeData != null){
                          let oneOfVertexIndicesOfIntersectedFace = _firstIntersectObject.face.a;                        
                          let attributeData = geometry.attributes.attributeData.array.attr;
                          let tempElementIndex = attributeData[oneOfVertexIndicesOfIntersectedFace * 4 + 1];
                          // check if element is already discarded (or say hidden)
                          if( hiddenElementIndices.indexOf( tempElementIndex ) < 0) {
                              _elementIndex = tempElementIndex;
                              break;
                          }
                      }else{
                          _elementIndex = null;
                          break;
                      }
                  }
              }
              return {elementIndex: _elementIndex, firstIntersectObject: _firstIntersectObject};
          };

          /*
           * WORK IN PROGRESS. Selects elements by index.
           * @param {number[]} elementIndices - An array of element indices.
           */
          this.selectElements = (elementIndices) => {
              console.error("This function is still work in progress.");
          };
          
          // let setColorAttrs = (geometry, elementIndices, color, transparency, selected) =>
          let setColorAttrs = (geometry, elementIndices, color) => {        
              let attributeData = geometry.attributes.attributeData.array.attr;
              for (let j = 0; j < geometry.index.array.length; j++) {      
                  let index = geometry.index.array[j];
                  if (elementIndices.includes(attributeData[index * 4 + 1])) {
                      // Use the original color and opacity by setting all params to 0 when color is null
                      if(color instanceof THREE$1.Color) {
                          geometry.attributes.colorOverriden.array[index] = 1;
                          geometry.attributes.color.array[index * 4] = color.r;
                          geometry.attributes.color.array[index * 4 + 1] = color.g;
                          geometry.attributes.color.array[index * 4 + 2] = color.b;
                          geometry.attributes.color.array[index * 4 + 3] = 1.0; //transparency;
                      }
                      // else geometry.attributes.selected.array[index] = selected ? 1 : 0;           
                  }
              }
              geometry.attributes.colorOverriden.needsUpdate = true;
              // geometry.attributes.selected.needsUpdate = true;
              geometry.attributes.color.needsUpdate = true;
          };

          /**
           * Removes color overrides from all elements.
           */
          this.clearAllColorOverrides = () => {
              model.meshGroup.children.forEach(mesh => {
                  let geometry = mesh.geometry;
                  for (let j = 0; j < geometry.index.array.length; j++) {      
                      let index = geometry.index.array[j];
                      geometry.attributes.colorOverriden.array[index] = 0;
                  }
                  geometry.attributes.colorOverriden.needsUpdate = true;
              });
          };
          
          let trySelectObject = (event) => { // event for: .ctrlShift, offsetX, offsetY
              let cam = cameraC.isPerspectiveMode ? cameraC.cameraP : cameraC.cameraO;
      
              let elementIndex = null;
              let isMultiSelect = (event.ctrlKey) ? true : false; // press ctrl for multi-selecting
              let prevSelectedCount = this.getElementIndicesBySelection().length;
      
              try{    
                  let x = event.offsetX == undefined ? event.layerX : event.offsetX;
                  let y = event.offsetY == undefined ? event.layerY : event.offsetY;
                  mouse.x = ( x / containerWidth ) * 2 - 1;
                  mouse.y = - ( y / containerHeight ) * 2 + 1;
      
                  // update the picking ray with the camera and mouse position
                  raycaster.setFromCamera( mouse, cam );

                  // Overwrite raycaster to select element in AR
                  if(isArSelectingElement){
                      let tempMatrix = new THREE$1.Matrix4();
                      tempMatrix.identity().extractRotation( arViewerPoseMatrix );
                      raycaster.ray.origin.setFromMatrixPosition( arViewerPoseMatrix );
                      raycaster.ray.direction.set( 0, 0, -1 ).applyMatrix4( tempMatrix );

                      // DEBUG ONLY
                      //const length = 5;
                      //const hex = 0xffff00;
                      //arrowHelper = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, length, hex );
                      //scene.add( arrowHelper );                    
                  }

                  // Overwrite raycaster to select element in AR
                  if(isArIndoorPositioning){
                      let tempMatrix = new THREE$1.Matrix4();
                      tempMatrix.identity().extractRotation( arViewerPoseMatrix );
                      raycaster.ray.origin.setFromMatrixPosition( arViewerPoseMatrix );
                      raycaster.ray.direction.set( 0, 0, -1 ).applyMatrix4( tempMatrix );

                      // DEBUG ONLY
                      //const length = 5;
                      //const hex = 0xffff00;
                      //arrowHelper = new THREE.ArrowHelper( raycaster.ray.direction, raycaster.ray.origin, length, hex );
                      //scene.add( arrowHelper );                    
                  }

                  // Put all tags in an array
                  let selectableObjects = Object.keys(tags).map(uuid => tags[uuid]);
                  // Add original model group to the array
                  selectableObjects.push(model.meshGroup);

                  let intersects = raycaster.intersectObjects(selectableObjects, true);
                  let obj = firstIntersectObject( intersects );
                  elementIndex = obj.elementIndex;
                  let _firstIntersectObject = obj.firstIntersectObject;

                  // Stop here if the element is already selected in AR
                  if(isArSelectingElement && Object.keys(selectedElements).includes(String(elementIndex))){
                      return;
                  }
                  
                  if(elementIndex == null || _firstIntersectObject == null){
                      this.unselectAllElements();
                  }else{
                      let geometry = _firstIntersectObject.object.geometry;
                      let attributeData = geometry.attributes.attributeData.array.attr;
                      // check if Index of selected element is in selected element arr already    
                      // if yes, return index no., delselect, remove from scene amd delete it
                      if(Object.keys(selectedElements).includes(String(elementIndex))) {
                          selectedElements[elementIndex].geometry.dispose();
                          selectedElements[elementIndex].material.dispose();
                          scene.remove(selectedElements[elementIndex]);
                          
                          delete selectedElements[elementIndex];
                          
                          // setColorAttrs(geometry, [elementIndex], null, null, false);
                      } else {            
                          // draw temp elem        
                          let vertexPositions = [];
                          //let vertexColors = [];
                          //let vertextColorOverriden = [];
                          //let vertexAlpha = [];
                          //let vertextVisible = [];
          
                          for (let j = 0; j < geometry.index.array.length; j++) {
          
                              let index = geometry.index.array[j];
                              if (elementIndex == attributeData[index * 4 + 1]) {
                                  let v1 = geometry.attributes.position.array[index * 3];
                                  let v2 = geometry.attributes.position.array[index * 3 + 1];
                                  let v3 = geometry.attributes.position.array[index * 3 + 2];
                                  vertexPositions.push(v1, v2, v3);
          
                                  let c1, c2, c3, alpha;
                                  /*if (selectMode == 1) {
                                      let matIndex = attributeData[index * 4];
                                      let color = geometry.materialArray[matIndex].uniforms.diffuse.value;
                                      c1 = color.r;
                                      c2 = color.g;
                                      c3 = color.b;
                                  } else if (selectMode == 0) {*/
                                      // c1 = 0.5;
                                      // c2 = 0.62;
                                      // c3 = 0.87;
                                      // alpha = 0.55;
                                  //}
                                  // vertexColors.push(c1, c2, c3);
                                  // vertextColorOverriden.push(0);
                                  // vertextVisible.push(1);
                                  // vertexAlpha.push(alpha); 
                              }
          
                          }
                          
                          
                          let highlightGeometry = new THREE$1.BufferGeometry();
                          
                          let vertices = new Float32Array(vertexPositions);
                          highlightGeometry.setAttribute('position', new THREE$1.BufferAttribute(vertices, 3));
                          /*
                          // vertices = new Float32Array(vertexColors);
                          var params = {};
                          params[ 'color' ] = new THREE.Color().fromArray( [0.5, 0.62, 0.87] );
                          // highlightGeometry.setAttribute('color', new THREE.BufferAttribute(vertices, 4));
                          vertices = new Uint8Array(vertextColorOverriden);
                          highlightGeometry.setAttribute('colorOverriden', new THREE.BufferAttribute(vertices, 1));
                          vertices = new Uint8Array(vertextVisible);
                          highlightGeometry.setAttribute('visible', new THREE.BufferAttribute(vertices, 1));
                          params[ 'opacity' ] = 0.55;
                          params[ 'transparent' ] = true;
                          */
                          let highlightMaterial;
                          // let highlightMaterial = new CustomShaderMaterial(params);
                          // FIXME: temporary workaround for Safari. need to review if shader material is still needed
                          // if(MiscHelper.isSafari() || MiscHelper.isIOS()){
                              highlightMaterial = new THREE$1.MeshBasicMaterial( {color: 0x809EDE, opacity: 0.55, transparent: true} );
                          // }
                          highlightMaterial.clippingPlanes = sectionPlanes;
          
                          let highlightMesh = new THREE$1.Mesh(highlightGeometry, highlightMaterial);
                          highlightMesh.scale.set(model.scale, model.scale, model.scale);

                          // Apply transformation matrix for highlight mesh in AR
                          if(isArSelectingElement){
                              highlightMesh.applyMatrix4( model.meshGroup.matrixWorld );
                          }                        
          
                          scene.add(highlightMesh);

                          // setColorAttrs(geometry, [elementIndex], null, null, true);                    
                          
                          if(!isMultiSelect) {
                              this.unselectAllElements();
                          }
                          selectedElements[elementIndex] = highlightMesh;
                          // selectedElements[elementIndex] = null;     
                          lastSelectedElementIndex = elementIndex;
                      }
                  }
              }catch(err){
                  console.log(err);
              }

              // handle events
              let _selectedElementIndices = this.getElementIndicesBySelection();
              if(elementIndex || prevSelectedCount != _selectedElementIndices.length){
                  this.dispatchEvent({
                      type:EventsEnum.ON_SELECTION_CHANGED, 
                      isClickedElementSelected: _selectedElementIndices.includes(elementIndex),
                      clickedElementIndex: elementIndex, 
                      selectedElementIndices: _selectedElementIndices
                  });
                  viewerStatus.selected = _selectedElementIndices.length;
                  dispatchViewerStatus();
              }            
      
              return elementIndex;
          };

          /**
           * Retrieves file properties from bimU.io server.
           * @param {function} onSuccess - Callback when data is received.
           * @param {function} onError - Callback when an error occurs.
           */
          this.getFileProperties = (onSuccess, onError) => {
              model.getFileProperties(onSuccess, onError);
          };

          /**
           * Retrieves model metadata from bimU.io server.
           * @param {function} onSuccess - Callback when data is received.
           * @param {function} onError - Callback when an error occurs.
           */
          this.getModelMetadata = (onSuccess, onError) => {
              model.getModelMetadata(onSuccess, onError);
          };
      
          /**
           * Retrieves model element data (Revit parameters, Navisworks properties, etc.) from bimU.io server.
           * @param {number} elementIndex - Element index.
           * @param {function} onSuccess - Callback when data is received.
           * @param {function} onError - Callback when an error occurs.
           */
          this.getElementDataByIndex = (elementIndex, onSuccess, onError) => {
              model.getElementDataByIndex(elementIndex, onSuccess, onError);
          };

          /**
           * Activates or exits full screen mode.
           * @param {boolean} [isFullScreen] - Use true to activate full screen or false to exit. It toggles the full screen mode if the parameter is not set.
           */
          this.toggleFullscreen = (isFullScreen) => {
              // Note that full screen API doesn't work with iOS Chrome
              let leaveFullscreen = typeof isFullScreen === "boolean" ? !isFullScreen : MiscHelper.isFullScreen();
              if(leaveFullscreen){
                  let eventArgs = {type: EventsEnum.ON_FULL_SCREEN_DISABLED};
                  if (document.exitFullscreen) {
                      document.exitFullscreen();
                  } else if (document.webkitExitFullscreen) {
                      document.webkitExitFullscreen();
                  } else if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                  } else if (document.msExitFullscreen) {
                      document.msExitFullscreen();
                  } else {
                      eventArgs.type = EventsEnum.FULL_SCREEN_UNSUPPORTED;
                  }
                  this.dispatchEvent(eventArgs);
              }else{
                  let eventArgs = {type: EventsEnum.ON_FULL_SCREEN_ENABLED};
                  if (container.requestFullscreen) {
                      container.requestFullscreen();
                  } else if (container.webkitRequestFullscreen) {
                      container.webkitRequestFullscreen();
                  } else if (container.mozRequestFullScreen) {
                      container.mozRequestFullScreen();
                  } else if (container.msRequestFullscreen) {
                      container.msRequestFullscreen();
                  } else {
                      eventArgs.type = EventsEnum.FULL_SCREEN_UNSUPPORTED;
                  }
                  this.dispatchEvent(eventArgs);
              }
          };
      
          let getRelativeTouchOffset = (event) => {
              let rect = container.getBoundingClientRect();
              let x = ( event.changedTouches[0].clientX - rect.left ) / rect.width;
              let y = ( event.changedTouches[0].clientY - rect.top ) / rect.height;
              return new THREE$1.Vector2(x, y);
          };
      
          let onTouchStart = (event) => {
              event.preventDefault();
      
              if(event.changedTouches){            
                  touchStartPt.copy( getRelativeTouchOffset(event) );
              }
          };
      
          let onTouchEnd = (event) => {
              event.preventDefault();
      
              let relativeTouchOffset = getRelativeTouchOffset(event);
              if(currentXrMode == WEBXR_MODE.NONE && event.changedTouches && (touchStartPt.distanceToSquared( relativeTouchOffset ) == 0)){
                  // simulate mouse event and pass a fake mouse event object into select object function
                  let elementIndex = trySelectObject({
                      offsetX: relativeTouchOffset.x * containerWidth, 
                      offsetY: relativeTouchOffset.y * containerHeight
                  });
              }
          };
      
          let onMouseUp = (event) => {
              event.preventDefault();
      
              // mouse left click (in OSX, left + ctrl also)
              if (event.button != THREE$1.MOUSE.LEFT) return;
      
              // HTC: check how Potree do this?
              // check moving dist between mouse down and up is smaller than threshold, then selecting (rotate or pan otherwise)
              if (mouseDownPt.distanceToSquared(new THREE$1.Vector2(event.offsetX, event.offsetY)) == 0) {
                  if (cursorState == CURSOR_STATE.SELECT) {
                      let elementIndex = trySelectObject(event);
                      if (elementIndex != null) {
                          // make selected point orbit center
                          updateOrbitCenter(event);                    
                      }             
                  }else if(cursorState == CURSOR_STATE.MEASUREMENT){
                      if(currentMeasuringControlPoint != undefined);else{
                          // finish measuring
                          cursorState = CURSOR_STATE.SELECT;
                      }                
                  }
              }
      
              // move back to previous state of orbit control (otherwise camera will flash)
              oControls.target.copy(oControls.previousTarget);
              oControls.coupleCenters = true;
          };
      
          let onMouseDown = (event) => {
              event.preventDefault();
      
              if (event.button != THREE$1.MOUSE.LEFT) return;
      
              mouseDownPt.set(event.offsetX, event.offsetY);
      
              // find intersected vertex to serve as orbit center later
              if(orbitCenterMousePt != null){            
                  oControls.previousTarget = oControls.target.clone();
                  oControls.target.copy(orbitCenterPoint);
                  oControls.coupleCenters = false;
              }
          };

          let onMouseWheel = (event) => {
              event.preventDefault();              
      
              // calculate the mouse distance from the center of the window
              let mouse = new THREE$1.Vector2();
              mouse.x = ( event.offsetX / containerWidth ) * 2 - 1;
              mouse.y = - ( event.offsetY / containerHeight ) * 2 + 1;
              let vector = new THREE$1.Vector3(mouse.x, mouse.y, 0.5);
              vector.unproject(camera);
              if(cameraC.isPerspectiveMode){
                  vector.sub(camera.position);         
                  if (event.deltaY < 0) { 
                      // zoom-in -> the camera is approaching the scene
                      // with OrbitControls the target is always in front of the camera (in the center of the screen)
                      // So when the user zoom-in, the target distance from the camera decrease.
                      // This is achieved because the camera position changes, not the target.
                      camera.position.add(vector.setLength(perspZoomFactor));
          
                      // SOLUTION A
                      //this.oControls.target.addVectors(this.oControls.target, vector.setLength(this.perspZoomFactor));
                  } else { 
                      // zoom-out -> the camera is moving away from the scene -> the target distance increase
                      camera.position.sub(vector.setLength(perspZoomFactor));
          
                      // SOLUTION A
                      //this.oControls.target.subVectors(this.oControls.target, vector.setLength(this.perspZoomFactor));
                  }    
                  // SOLUTION B
                  // Now camera.position is changed but not the control target. As a result: 
                  //  - the distance from the camera to the target is changed, and this is ok.
                  //  - the target is no more in the center of the screen and needs to be repositioned. 
                  // The new target will be in front of the camera (in the direction of the camera.getWorldDirection() )
                  // at a suitable distance (no less than the value of minTargetToCameraDistanceAllowed constant).
                  // Thus, the target is pushed a little further if the user approaches too much the target.
                  let targetToCameraDistance = Math.max(minTargetToCameraDistanceAllowed, oControls.target.distanceTo(camera.position));
                  let worldDirection = new THREE$1.Vector3();
                  camera.getWorldDirection(worldDirection);
                  let newTarget = worldDirection.setLength( targetToCameraDistance ).add(camera.position);
                  oControls.target.copy(newTarget);
      
                  // tune zoom factor according to targetToCameraDistance
                  let orbitCenterToCameraDistance = orbitCenterPoint != undefined ? orbitCenterPoint.distanceTo(camera.position) : targetToCameraDistance;
                  // TODO: These are emprical arbitrary values. Double check and test.
                  perspZoomFactor = Math.max(minZoomSpeed , Math.min( modelBoundingBoxDiagonal / maxZoomSpeedMultiplier, orbitCenterToCameraDistance * zoomSpeedMultiplier ) );
              }else{ // orthographic mode
                  let cameraDirection = new THREE$1.Vector3();
                  camera.getWorldDirection( cameraDirection );
                  let projectedCameraPosition = new THREE$1.Vector3();
                  let farPlane = new THREE$1.Plane();
                  farPlane.setFromNormalAndCoplanarPoint(cameraDirection, vector);            
                  farPlane.projectPoint(camera.position, projectedCameraPosition);
                  vector.subVectors(vector, projectedCameraPosition);
                  //let ratio = (this.camera.top + zoom) / this.camera.top;
                  let ratio = event.deltaY < 0 ? orthoZoomFactor : 1 / orthoZoomFactor;
                  let translation = vector.clone().multiplyScalar(ratio).sub(vector);
                  /*this.camera.left = this.camera.left - zoom * aspect;
                  this.camera.right = this.camera.right + zoom * aspect;
                  this.camera.top = this.camera.top + zoom;
                  this.camera.bottom = this.camera.bottom - zoom;*/
                  camera.zoom = camera.zoom * ratio;
                  if (event.deltaY < 0) {
                      camera.position.add(vector.setLength(translation.length()));
                      oControls.target.add(vector.setLength(translation.length()));
                  } else {
                      camera.position.sub(vector.setLength(translation.length()));
                      oControls.target.sub(vector.setLength(translation.length()));
                  }
              }
      
              // update camera
              camera.updateProjectionMatrix();
      
              // avoid calling too many times
              if(zoomTimeoutId != undefined){
                  window.clearTimeout(zoomTimeoutId);
              }

              zoomTimeoutId = window.setTimeout(function(){
                  updateOrbitCenter(event);
              }, zoomTimeoutThreshold);
          };
      
          let updateOrbitCenter = (event) => {
              let mouse = new THREE$1.Vector2();
              mouse.x = ( event.offsetX / containerWidth ) * 2 - 1;
              mouse.y = - ( event.offsetY / containerHeight ) * 2 + 1;
              if(orbitCenterMousePt == null){
                  orbitCenterMousePt = mouse.clone();
              }else{
                  orbitCenterMousePt.copy(mouse);
              }
              
              raycaster.setFromCamera( orbitCenterMousePt, camera );
              let intersects = raycaster.intersectObject( model.meshGroup, true );
              let foundFlag = false;
              let obj = firstIntersectObject( intersects );
              if (obj.firstIntersectObject) {
                  orbitCenterPoint = obj.firstIntersectObject.point;
                  foundFlag = true;
              }
      
              // TODO: not working well...
              if(!foundFlag){
                  // should consider this.sectionBox which is a mesh
                  sectionBox.geometry.computeBoundingBox(); 
                  let sectionBoxBoundingBox = sectionBox.geometry.boundingBox;
                  let sectionBoxCenter = new THREE$1.Vector3();
                  sectionBoxBoundingBox.getCenter(sectionBoxCenter);
      
                  // find closet point on section box to mouse ray
                  let worldDirection = new THREE$1.Vector3();
                  camera.getWorldDirection(worldDirection);
                  let ray = new THREE$1.Ray( camera.position, worldDirection );
                  let closestPtOnRayFromCam = new THREE$1.Vector3(); // the closest point on the mouse/camera direction ray            
                  ray.closestPointToPoint(sectionBoxCenter, closestPtOnRayFromCam);
                  let dirVector = new THREE$1.Vector3();
                  dirVector.subVectors(closestPtOnRayFromCam, sectionBoxCenter).normalize(); 
                  ray = new THREE$1.Ray(sectionBoxCenter, dirVector); //  Ray from section box center to the closest point
                  let intersectedPoint;
                  intersectedPoint = ray.intersectBox(sectionBoxBoundingBox);            
                  if(intersectedPoint != undefined){
                      orbitCenterPoint = intersectedPoint;
                  }        
              }
          };
      
          let onMouseMove = (e) => {
              e.preventDefault();
      
              if(
                  cursorState == CURSOR_STATE.MEASUREMENT && 
                  currentMeasuringControlPoint != undefined && 
                  Date.now() - lastMouseEventTime > moveUpdateThreshold
              ){
                  lastMouseEventTime = Date.now();
      
                  let mouse = new THREE$1.Vector2();
                  mouse.x = ( e.offsetX / containerWidth ) * 2 - 1;
                  mouse.y = - ( e.offsetY / containerHeight ) * 2 + 1;
      
                  raycaster.setFromCamera( mouse, camera );
                  // Put all added objects in an array
                  // FIXME: this is not working
                  let addObjectsArray = Object.keys(addedObjects).map(uuid => addedObjects[uuid]);
                  // Add original model group to the array
                  addObjectsArray.push(model.meshGroup);
                  let intersectObjs = raycaster.intersectObjects(addObjectsArray, true);
                  let obj = firstIntersectObject( intersectObjs );
                  if (obj.firstIntersectObject) {
                      currentMeasuringControlPoint.dispatchEvent({
                          type: 'drag',
                          location: obj.firstIntersectObject.point,
                          currentMeasuringControlPoint: currentMeasuringControlPoint
                      });
                  }
              }else if(cursorState == CURSOR_STATE.SELECT && Object.keys(tags).length > 0){
                  // change mouse cursor when hovering on tags
                  // TODO: check performance
                  let mouse = new THREE$1.Vector2();
                  mouse.x = ( e.offsetX / containerWidth ) * 2 - 1;
                  mouse.y = - ( e.offsetY / containerHeight ) * 2 + 1;
                  raycaster.setFromCamera( mouse, camera );
                  let tagsArray = Object.keys(tags).map(uuid => tags[uuid]);
                  let intersectTags = raycaster.intersectObjects(tagsArray, true);
                  if(intersectTags.length > 0){
                      container.style.cursor = 'pointer';
                      intersectTags[0].object.parent.scale.setScalar(1.2);
                  }else{
                      container.style.cursor = 'default';
                      Object.keys(tags).forEach(uuid => {
                          tags[uuid].scale.setScalar(1.0);
                      });                    
                  }
              }
          };

          // TODO: handle measure tool start/hit/end events

          let checkMobileDevice = () => {
              if(MiscHelper.isMobileDevice()){
                  throw new Error("This operation is NOT supported on mobile devices.");
              }
          };
      
          /**
           * Starts user interaction to read XYZ coordinates.
           */
          this.readCoordinates = () => {
              checkMobileDevice();
              let measurement = measuringTool.startInsertion({
                  showDistances: false,
                  showAngles: false,
                  showCoordinates: true,
                  globalShiftVector: model.globalShiftVector,
                  showArea: false,
                  closed: true,
                  maxMarkers: 1,
                  name: 'Point'});
          };
      
          /**
           * Starts user interaction to measure distance point by point.
           */
          this.measureDistance = () => {
              checkMobileDevice();
              let measurement = measuringTool.startInsertion({
                  showDistances: true,
                  showArea: false,
                  closed: false,
                  name: 'Distance'});
          };
      
          /**
           * Starts user interaction to measure height by three points.
           */
          this.measureHeight = () => {
              checkMobileDevice();
              let measurement = measuringTool.startInsertion({
                  showDistances: false,
                  showHeight: true,
                  showArea: false,
                  closed: false,
                  maxMarkers: 2,
                  name: 'Height'});
          };
      
          /**
           * Starts user interaction to measure angles by a triangle formed by three points.
           */
          this.measureAngle = () => {
              checkMobileDevice();
              let measurement = measuringTool.startInsertion({
                  showDistances: false,
                  showAngles: true,
                  showArea: false,
                  closed: true,
                  maxMarkers: 3,
                  name: 'Angle'});
          };
      
          /**
           * Starts user interaction to measure area by a polygon.
           */
          this.measureArea = () => {
              checkMobileDevice();
              let measurement = measuringTool.startInsertion({
                  showDistances: true,
                  showArea: true,
                  closed: true,
                  name: 'Area'});
          };
      
          /**
           * Removes all current measurements shown in the viewer.
           */
          this.clearAllMeasurements = () => {
              checkMobileDevice();
              measuringTool.clearAllMeasurements();
          };
      
          let setCurrentMeasuringControlPoint = (controlPointObject) => {   
              currentMeasuringControlPoint = controlPointObject;
              cursorState = CURSOR_STATE.MEASUREMENT;
          };

          /**
           * Overrides element color.
           * @param {number[]} elementIndices - An array of element indices.
           * @param {THREE.Color} color - Three.js color object.
           */
          // @param {number} transparency - 0 is Opaque. 1 is invisible.
          this.setColor = (elementIndices, color) => {
              if(!Array.isArray(elementIndices)){
                  console.error("elementIndices must be an array.");
                  return;
              }
              if(!color instanceof THREE$1.Color){
                  console.error("color must be a THREE.Color.");
                  return;
              }
              // if(typeof(transparency) != "number"){
              //     console.error("transparency must be a number.");
              //     return
              // }

              model.meshGroup.children.forEach(mesh => {
                  let geometry = mesh.geometry;
                  setColorAttrs(geometry, elementIndices, color);
              });
          };

          /**
           * WORK IN PROGRESS. Adds texture to elements.
           * @param {number[]} elementIndices - An array of element indices.
           * @param {THREE.Texture} texture - Texture object.
           **/
          this.setTexture = (elementIndices, texture) => {
              console.error("This function is still work in progress.");
          };

          /**
           * Adds an arbitrary 3D object to the viewer.
           * @param {THREE.Object3D} object3D - Three.js Object3D object.
           * @return {string} UUID of created Object3D.
           */
          this.addObject = (object3D) => {
              checkViewerInitialization();
              if(object3D != null){
                  let uuid = object3D.uuid;
                  addedObjects[uuid] = object3D;

                  // Resize section box by added object
                  if(!bbox){ // when model is not loaded yet or when no custom object/tag is added
                      bbox = new THREE$1.Box3();
                  }
                  if(viewerStatus.isModelLoaded){
                      removeSectionBox();
                      bbox.expandByObject(object3D);
                      initSectionBox();
                  }else{                    
                      bbox.expandByObject(object3D);
                  }
                  
                  scene.add(object3D);
                  return uuid;
              }else{
                  console.error(`Cannot add null object.`);
              }
          };

          /**
           * Removes an existing 3D object from the viewer.
           * @param {string} objectId - Three.js Object3D UUID.
           */
          this.removeObject = (objectId) => {
              checkViewerInitialization();
              if(Object.keys(addedObjects).includes(String(objectId))) {
                  scene.remove(addedObjects[objectId]);
                  delete addedObjects[objectId];
              }else{
                  console.error(`Cannot remove object because objectId ${objectId} is not found.`);
              }
          };

          /**
           * Display options for Tag.
           * @typedef {Object} TagOptions
           * @property {string} [shape='circle'] - Use 'circle' or 'rectangular'.
           * @property {string} [fontName='Helvetica'] - Font name. See https://www.cssfontstack.com/ for more details. FontAwesome is also  
           * @property {number} [fontSize=30] - Font size in pixel values (px).
           * @property {string} [fontColor='rgba(255, 255, 255, 1)'] - CSS color keyword, RBGA, or Hex code for text.
           * @property {string} [backgroundColor='rgba(97, 232, 240, 1)'] - CSS color keyword, RGBA, or Hex code for background.
           * @property {string} [borderColor='rgba(0, 0, 0, 0)'] - CSS color keyword, RGBA, or Hex code for border. Default is no border (transparent).
           * @property {number} [borderThickness=0] - Border thickness in pixel values (px).
           * @property {boolean} [visibleBehindObjects=true] - Whether tag is still visible when behind other objects.
           * @property {boolean} [pulse=false] - Whether tag has pulse effect.
           */
          /**
           * This method adds a 3D sprite to a particular location.
           * @param {string} text - Text to display in tag.
           * @param {THREE.Vector3} location - 3D point where tag is placed.
           * @param {TagOptions} [options] - Tag display options.
           * @param {function} [onClick] - Callback function when tag is clicked.
           * @return {string} UUID of created Object3D.
           */
          this.addTag = (text, location, options, onClick) => {            
              checkViewerInitialization();
              if(!location instanceof THREE$1.Vector3){
                  console.error("Tag location must be Vector3");
              }else{
                  let newTag = new TagSprite(text, location, options, onClick);
                  let uuid = newTag.uuid;
                  tags[uuid] = newTag;

                  // Resize section box by added object
                  if(!bbox){ // when model is not loaded yet or when no custom object/tag is added
                      bbox = new THREE$1.Box3();
                  }
                  if(viewerStatus.isModelLoaded){
                      removeSectionBox();
                      bbox.expandByObject(newTag);
                      initSectionBox();
                  }else{                    
                      bbox.expandByObject(newTag);
                  }

                  scene.add(newTag);    
                  return newTag.uuid;
              }            
          };

          /**
           * Removes an existing tag from the viewer.
           * @param {string} tagId - Three.js Object3D UUID.
           */
          this.removeTag = (tagId) => {
              checkViewerInitialization();
              if(Object.keys(tags).includes(String(tagId))) {
                  scene.remove(tags[tagId]);
                  delete tags[tagId];
              }else{
                  console.error(`Cannot remove tag because tagtId ${tagtId} is not found.`);
              }
          };

          /**
           * Returns primitive geometry of a particular model element.
           * @param {number} elementIndex - Element index.
           * @return {THREE.BufferGeometry} Three.js BufferGeometry object.
           */
          this.getGeometry = (elementIndex) => {
              // TODO: check performance with a huge model that has lots of meshes
              let vertexPositions = [];
              model.meshGroup.children.forEach(mesh => {
                  let geometry = mesh.geometry;
                  let attributeData = geometry.attributes.attributeData.array.attr;      

                  for (let j = 0; j < geometry.index.array.length; j++) {

                      let index = geometry.index.array[j];
                      if (elementIndex == attributeData[index * 4 + 1]) {
                          let x = geometry.attributes.position.array[index * 3];
                          let y = geometry.attributes.position.array[index * 3 + 1];
                          let z = geometry.attributes.position.array[index * 3 + 2];
                          vertexPositions.push(x, y, z);
                      }
                  }
              });

              let duplicateGeometry = new THREE$1.BufferGeometry();
              let vertices = new Float32Array(vertexPositions);
              duplicateGeometry.setAttribute('position', new THREE$1.BufferAttribute(vertices, 3));
              
              return duplicateGeometry;
          };

          /**
           * Returns the bounding box of particular model elements or the entire model if the parameter is not set.
           * @param {number} elementIndices - Element index.
           * @returns {THREE.Box3} Represents an axis-aligned bounding box (AABB) in 3D space.
           */
          this.getBoundingBox = (elementIndices) => {
              if(elementIndices === undefined){
                  return bbox;
              }
              // let geometry = this.getGeometry(elementIndex);
              // return new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);

              let box = new THREE$1.Box3();
              model.meshGroup.children.forEach(mesh => {
                  let geometry = mesh.geometry;
                  let attributeData = geometry.attributes.attributeData.array.attr;
                  for (let j = 0; j < geometry.index.array.length; j++) {      
                      let index = geometry.index.array[j];
                      if (elementIndices.includes(attributeData[index * 4 + 1]) ) {                      
                          let x = geometry.attributes.position.array[index * 3];
                          let y = geometry.attributes.position.array[index * 3 + 1];
                          let z = geometry.attributes.position.array[index * 3 + 2];
                          box.expandByPoint(new THREE$1.Vector3(x, y, z)); 
                      }
                  }
              
              });
              return box;
          };

          /**
           * Returns the center point of a particular model element.
           * @param {number} elementIndex - Element index.
           * @return {THREE.Vector3} Three.js Vector3 object.
           */
          this.getLocation = (elementIndex) => {
              let box = this.getBoundingBox([elementIndex]);
              let boxCenter = new THREE$1.Vector3();
              box.getCenter(boxCenter);
              return boxCenter;
          };

          /**
           * Returns indices of selected elements.
           * @return {number[]} An array of element indices.
           */
          this.getElementIndicesBySelection = () => {
              return Object.keys(selectedElements).map(index => Number(index));
          };

          /**
           * Creates a custom button on the user interface of the viewer.
           * @param {string} domElementId - DOM element id to use for this button.
           * @param {string} icon - Icon string.
           * @param {string} color - CSS color keyword, RGBA, or Hex code.
           * @param {string} tooltip - Short description.         
           * @param {function} callback - A callback function when this button is clicked.
           */
          this.addCustomButton = (domElementId, icon, color, tooltip, callback) => {
              if(!document.getElementById(toolbarId)){
                  throw new Error("Viewer UI was not enabled.");
              }
              if(document.getElementById(domElementId)){
                  throw new Error("A DOM element with the same id already exists.");
              }
              // Add html
              let htmlString = `<a id="${domElementId}" data-position="top" title="${tooltip}" data-tooltip="${tooltip}" style="margin: 5px; background: ${color};" class="btn-floating tooltipped"><i class="zmdi zmdi-${icon}"></i></a>`;
              let toolbarDiv = document.getElementById(toolbarId);
              toolbarDiv.insertAdjacentHTML('beforeend', htmlString);
              // Handle callback
              let button = document.getElementById(domElementId);
              button.onclick = callback;
              // Initialization
              if(window.M) M.Tooltip.init(button);
          };

          /**
           * Removes an existing DOM element by its ID.
           * @param {string} domElementId - DOM element id to remove.
           */
          this.removeDomElement = (domElementId) => {
              let elem = document.getElementById(domElementId);
              if(elem) elem.parentNode.removeChild(elem);
          };
          
          /**
           * Sets background color of the viewer canvas.
           * @param {number} color - Hexadecimal color. E.g., 0xff0000.
           */
          this.setBackgroundColor = (color) => {
              // https://jsfiddle.net/f2Lommf5/15331/
              // https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient
              // https://stackoverflow.com/questions/16177056/changing-three-js-background-to-transparent-or-other-color
              // https://threejs.org/docs/#api/en/scenes/Scene.background
              
              renderer.setClearColor(color, 1);
          };

          /**
           * Turns on or off wireframe mode.
           * @param {boolean} [isWireframe] - Use true to show wireframe or false to hide it. It toggles the wireframe mode if the parameter is not set.
           */
          this.toggleWireframeMode = (isWireframe) => {
              model.meshGroup.children.forEach(mesh => {
                  mesh.material.forEach(function(mat) {
                      mat.wireframe = typeof isWireframe === "boolean" ? isWireframe : !mat.wireframe;
                  });
              });
          };

          /**
           * Returns screenshot of the viewer canvas.
           * @param {boolean} openInNewWindow - Whether opens screenshot in a new window/tab.
           * @return {string} A DOMString containing a data URI containing a representation of the screenshot.
           */
          this.getScreenshot = (openInNewWindow) => {
              let dataUrl = renderer.domElement.toDataURL();

              if(openInNewWindow){
                  let w = window.open('', '');
                  w.document.title = "bimU.io Viewer Screenshot";
                  let img = new Image();
                  img.src = dataUrl;
                  w.document.body.appendChild(img);
              }            

              return dataUrl;
          };

          // Below APIs are backed by cloud BIM database.

          /**
           * Retrieves element data from bimU.io server based on a custom query expression.
           * @param {string} filterExpression - Filter expression string.
           * @param {string} selectExpression - Select expression string.
           * @param {number} limit - Limit on the number of elements returned.
           * @param {function} onSuccess - Callback when data is received.
           * @param {function} onError - Callback when an error occurs.
           */
          this.getElementDataByQuery = (filterExpression, selectExpression, limit, onSuccess, onError) => {
              let sqlStatement = `SELECT ${selectExpression} FROM ModelDatabase WHERE ${filterExpression}`;
              if(limit != undefined){
                  sqlStatement += ` LIMIT ${limit}`;
              }
              console.log(sqlStatement);
              model.runModelDataQuery(sqlStatement, onSuccess, onError);
          };

          /**
           * Retrieves element data by predefined property filters and selectors.
           * @param {PropertyFilter[]} propertyFilters - Array of property filters that look for elements satisfying specified conditions.
           * @param {PropertySelector[]} propertySelectors - Array of property selectors. Maximum of 5 properties to return.
           * @param {number} limit - Limit on the number of elements returned.
           * @param {function} onSuccess - Callback when data is received.
           * @param {function} onError - Callback when an error occurs.
           */
          this.getElementDataByProperty = (propertyFilters, propertySelectors, limit, onSuccess, onError) => {
              if(!Array.isArray(propertyFilters) || !propertyFilters.every(filter => filter instanceof PropertyFilter)){
                  throw new Error('Invalid property filters. Must use bimU.PropertyFilter[].');
              }
              if(!Array.isArray(propertySelectors) || !propertySelectors.every(selector => selector instanceof PropertySelector)){
                  throw new Error('Invalid property selectors. Must use bimU.PropertySelector[].');
              }
              if(propertySelectors.length > GLOBAL_CONFIGS.maxNumOfPropertySelector){
                  throw new Error(`Cannot select/return more than ${GLOBAL_CONFIGS.maxNumOfPropertySelector} properties.`);
              }
              this.getElementDataByQuery(
                  propertyFilters.map(filter => filter.getExpressionString()).join(" AND "), 
                  propertySelectors.map(selector => selector.getExpressionString()).join(", "), 
                  limit, 
                  onSuccess, 
                  onError
              );
          };

          /**
           * Retrieves element data by predefined property filters and selectors.
           * @param {PropertyFilter[]} propertyFilters - Array of property filters.
           * @param {PropertySelector} propertyToAggregate - Single property selector that will be aggregated.
           * @param {AggregateFunctionsEnum} aggregateFunction - Limit on the number of elements returned. Default is COUNT.
           * @param {function} onSuccess - Callback when data is received.
           * @param {function} onError - Callback when an error occurs.
           */
          this.aggregateElementProperty = (propertyFilters, propertyToAggregate, aggregateFunction, onSuccess, onError) => {
              if(!Array.isArray(propertyFilters) || !propertyFilters.every(filter => filter instanceof PropertyFilter)){
                  throw new Error('Invalid property filters. Must use bimU.PropertyFilter[].');
              }
              if(!(propertyToAggregate instanceof PropertySelector)){
                  throw new Error('Invalid property selector. Must use bimU.PropertySelector.');
              }
              this.getElementDataByQuery(
                  propertyFilters.map(filter => filter.getExpressionString()).join(" AND "), 
                  propertyToAggregate.getExpressionString(aggregateFunction != null ? aggregateFunction : AggregateFunctionsEnum.COUNT),
                  null,
                  onSuccess, 
                  onError
              );
          };

          /*
           * WORK IN PROGRESS. Returns all property names from a particular group or all groups if group name is not specified.
           * @param {string} [groupName] - Property group name.
           **/
          this.getPropertyNamesByGroup = (groupName) => {
              console.error("This function is still work in progress.");
          };

          // ================================================================== WebXR functions ==================================================================

          /**
           * Returns bool value about whether browser supports AR of WebXR.
           * @param {function} callback - Returns true if supported; false otherwise.
           */
          this.isWebArSupported = ( callback ) => {
              if ( 'xr' in navigator ) {
                  navigator.xr.isSessionSupported( 'immersive-ar' ).then( ( supported ) => {
                      if(supported){
                          console.log("AR Supported");
                          callback(true);
                      }else{
                          console.error("AR Not Supported");
                          callback(false);
                      }
                  } ).catch( (error) => {
                      console.error(error);
                  });
              } else {
                  if ( window.isSecureContext === false ) {
                      console.error('WEBXR NEEDS HTTPS'); // TODO Improve message
                      callback(false);
                  } else {
                      console.error('WEBXR NOT AVAILABLE');
                      callback(false);
                  }
              }
          };

          /**
           * Starts WebXR AR Viewer.
           * @param {enum} arMode - Enum from WEBXR_MODE.
           * @param {Element} domElement - DOM element overlay. It must be a fixed size on iOS.
           * @param {function} onSessionEnded - Callback function when AR session ended.
           */
          this.startAR = (arMode, domElement, onSessionEnded) => {
              navigator.xr.isSessionSupported('immersive-ar').then((supported) =>{
                  if(supported){
                      if (currentXrSession === null) {
                          // FIXME: validation
                          currentXrMode = arMode;

                          // AR session configuration
                          let sessionInit = {};
                          if(currentXrMode == WEBXR_MODE.AR_HIT_TEST){
                              sessionInit.requiredFeatures = ['hit-test'];
                          }
                          if(domElement){ // FIXME: validation
                              sessionInit.optionalFeatures = ['dom-overlay'];
                              sessionInit.domOverlay = {root: domElement};
                          }

                          renderer.xr.setReferenceSpaceType( 'local' );

                          navigator.xr.requestSession('immersive-ar', sessionInit).then((session) => {
                              /*
                              session.updateWorldTrackingState( {
                                  'planeDetectionState': { 'enabled': true }
                              } );
                              */
              
                              // Handle sessions
                              session.addEventListener('end', () => {
                                  currentXrSession = null;
                                  isArIndoorPositioning = true;
                                  if(onSessionEnded){
                                      onSessionEnded();
                                  }                                
                              });
                              
                              renderer.xr.setSession( session );
                              currentXrSession = session;

                              // Request reference spaces                            
                              session.requestReferenceSpace('local').then(function (referenceSpace){
                                  localReferenceSpace = referenceSpace;
                              });
                              session.requestReferenceSpace('viewer').then(function (referenceSpace){
                                  viewerReferenceSpace = referenceSpace;
                              });

                              // Make canvas transparent
                              renderer.setClearColor(null, 0);
                              xrControls = new THREE$1.Object3D();
                              xrControls.add(camera);
                              scene.add(xrControls);

                              // Add controllers
                              controller = renderer.xr.getController( 0 );
                              scene.add(controller);
                              xrControls.add(controller);

                              // Remove model from web viewer
                              const { meshGroup } = model;
                              scene.remove(meshGroup);

                              // Move meshGroup's center to axis for meshGroup rotation
                              meshGroup.children.forEach(mesh => {
                                  let geometry = mesh.geometry;
                                  geometry.applyMatrix4( new THREE$1.Matrix4().makeTranslation( -center.x, -center.y, currentXrMode == WEBXR_MODE.AR_HIT_TEST ? -minPt.z : -center.z ) );
                              });
                              
                              // Set initial scale arbitrarily to equivalently 1 meter in any direction in the real world
                              let size = new THREE$1.Vector3();
                              bbox.getSize(size);
                              initialARScale = Math.min(Math.min(1/size.x, 1/size.y), 1/size.z);   
                              this.resetARScale();                         

                              if(currentXrMode == WEBXR_MODE.AR_HIT_TEST){
                                  reticle = new THREE$1.Mesh(
                                      new THREE$1.RingBufferGeometry(0.15, 0.2, 32).rotateX(-Math.PI/2),
                                      new THREE$1.MeshBasicMaterial()
                                  );
                                  reticle.matrixAutoUpdate = false;
                                  reticle.visible = false;
                                  scene.add(reticle);

                                  controller.addEventListener('select', () => {
                                      if (!isArLoaded && reticle.visible) {
                                          meshGroup.position.setFromMatrixPosition(reticle.matrix);
                                          if(meshGroup.rotation.x != -Math.PI / 2.0){ //only check x axis because z axis may be affected by rotateModelXY
                                              meshGroup.rotation.x = -Math.PI / 2.0;
                                              meshGroup.rotation.z = -Math.PI / 2.0;
                                          }
                                          scene.add(meshGroup);
                                          resetARExtents();
                                      }
                                  });
                              }else if(currentXrMode == WEBXR_MODE.AR_ANCHOR){
                                  if (!isArLoaded) {
                                      meshGroup.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
                                      meshGroup.quaternion.setFromRotationMatrix(controller.matrixWorld);
                                      meshGroup.rotation.x = -Math.PI / 2.0;
                                      meshGroup.rotation.z = -Math.PI / 2.0;
                                      scene.add(meshGroup);
                                      resetARExtents();                                    
                                  }                                
                              }                          
                          });
                      } else {
                          console.error("AR session has already started.");
                      }
                  }
                  else{
                      console.error("AR Not Supported.");
                  }
              });
          };

          let resetARExtents = () => {           
              // TODO: Handle section box transform 
              model.meshGroup.updateMatrixWorld();
              bbox = new THREE$1.Box3();
              handleBoundingBox();
              removeSectionBox();
              initSectionBox();

              this.unselectAllElements();

              // Dispatch AR extents updated event
              isArLoaded = true;
              if(reticle) reticle.visible = false;
              this.dispatchEvent({type: EventsEnum.ON_AR_EXTENTS_UPDATED});
          };

          /**
           * Reset model to inital scale in AR.
           */
          this.resetARScale = () => {
              model.meshGroup.scale.set(initialARScale, initialARScale, initialARScale);
          };

          /**
           * Set model scale relative to initial scale in AR.
           * @param {number} relativeScale - Relative scale.
           */
          this.setARScale = (relativeScale) => {
              if(typeof relativeScale === 'number'){
                  model.meshGroup.scale.setScalar(relativeScale * initialARScale);
                  resetARExtents();
              }
          };

          /**
           * Set model rotation in AR by degree on XY plane.
           * @param {number} degree - 0 - 360 degrees.
           */
          this.setARRotationOnXY = (degree) => {
              let radian = degree * Math.PI / 180;
              model.meshGroup.rotation.z = radian;
              resetARExtents();
          };

          /**
           * Translate model in AR.
           * @param {THREE.Vector3} vector - Translation vector.
           */
          this.translateARPosition = (vector) => {
              model.meshGroup.position.add(vector);
              resetARExtents();
          };

          /**
           * Move section plane position in AR.
           * @param {number} index - Section plane index.
           * @param {number} distancePercentage - Distance in percentage.
           */
          this.moveARSectionPlane = (index, distancePercentage) => {
              let size = new THREE$1.Vector3();
              bbox.getSize(size);
              if(index === 0){ // minX
                  sectionPlanes[index].constant -= size.x * distancePercentage;
              }else if(index === 1){ // maxX
                  sectionPlanes[index].constant -= size.x * distancePercentage;
              }else if(index === 2){ // minY
                  sectionPlanes[index].constant -= size.y * distancePercentage;
              }else if(index === 3){ // maxY
                  sectionPlanes[index].constant -= size.y * distancePercentage;
              }else if(index === 4){ // minZ
                  sectionPlanes[index].constant -= size.z * distancePercentage;
              }else if(index === 5){ // maxZ
                  sectionPlanes[index].constant -= size.z * distancePercentage;
              }            
          };

          /**
           * Enable or disable element selection in AR.
           * @param {THREE.Vector3} isEnabled - Toggle enabled/disabled if undefined.
           */
          this.toggleARSelectElement = (isEnabled) => {
              isArSelectingElement = typeof isEnabled === "boolean" ? isEnabled : !isArSelectingElement;
          };

          /**
           * Enable or disable indoor poisitioning in AR.
           * @param {THREE.Vector3} isEnabled - Toggle enabled/disabled if undefined.
           */
          this.toggleARIndoorPositioning = (isEnabled) => {
              isArIndoorPositioning = typeof isEnabled === "boolean" ? isEnabled : !isArIndoorPositioning;
          };

          /**
           * Get viewer pose matrix from camera in AR.
           */
          this.getArViewerPoseMatrix = () => {
              return arViewerPoseMatrix;
          };

          /**
           * Trigger element selection based on current viewer pose in AR.
           */
          this.triggerARSelectElement = () => {
              trySelectObject({});
          };

          /**
           * Terminate current AR session.
           */
          this.exitAR = () => {
              currentXrSession.end();
          };

          /**
           * Destroys this Viewer instance and releases all resources.
           */
          this.dispose = () => {
              viewerStatus.isDisposed = true;

              let empty = (elem) => {
                  while (elem.lastChild) elem.removeChild(elem.lastChild);
              };

              // clean up DOM
              empty(container);

              // remove all event listeners
              let newContainer = container.cloneNode(false);
              container.parentNode.replaceChild(newContainer, container);

              // release memory
              model.meshGroup.children.forEach(mesh => {
                  mesh.material.forEach(function(mat) {
                      mat.dispose();
                  });
                  mesh.geometry.dispose();
              });
              delete model.meshGroup;
              model = null; // cannot delete local variable in strict mode
              delete cameraC.cameraP;
              delete cameraC.cameraO;
              cameraC = null; // cannot delete local variable in strict mode
              oControlsP.dispose();
              oControlsO.dispose();
              tControlsP.dispose();
              tControlsO.dispose();
              addedObjects = null; // cannot delete local variable in strict mode
              sectionPlanes = null; // cannot delete local variable in strict mode
              measuringTool = null; // cannot delete local variable in strict mode
              scene.dispose();
              renderer.dispose();
          };
      }
  }

  console.log("bimU.io Viewer API version: " + version);

  exports.AggregateFunctionsEnum = AggregateFunctionsEnum;
  exports.DataTypesEnum = DataTypesEnum;
  exports.EventsEnum = EventsEnum;
  exports.OperatorsEnum = OperatorsEnum;
  exports.PropertyFilter = PropertyFilter;
  exports.PropertySelector = PropertySelector;
  exports.Viewer = Viewer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
