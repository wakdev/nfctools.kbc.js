/**
 * To use NFC Tools KeyBoard Controller on a Web Page
 * @author: wakdev [https://www.wakdev.com]
 */
var NFCToolsKBC = (function () {

  var instance = null; // Singleton instance
  var callback = null; // Callback function
  var isAlreadyRegister = false; // Is event already register ?

  /**
   * Create instance
   */
  function create () {

    /**
     * To register a callback function
     */
    function registerCallback(callback) {

      // Check if callback is a function
      if (typeof callback == 'function') {
        this.callback = callback; // Save callback reference

        // Register event
        if(this.callback != null && !isAlreadyRegister) {
          document.addEventListener('paste', (event) => {
              this.callback((event.clipboardData || window.clipboardData).getData('text'));
              event.preventDefault();
          });
          isAlreadyRegister = true;
        }
      } else {
        console.log("Error: Unable to register callback");
      }
    }
    return {
      registerCallback: registerCallback
    };
  }

  // Get instance
  return {
    getInstance: function() {
      if(instance == null) {
        instance = create();
      }
      return instance; // Return singleton
    }
  };

})();
