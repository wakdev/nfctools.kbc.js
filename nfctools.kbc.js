/**
 * Use NFC Tools - KeyBoard Controller on a Web Page
 * @author: wakdev [https://www.wakdev.com]
 *
 * Usage:
 *
 * NFCToolsKBC.getInstance().registerCallback(function(content){
 *    // Do what you want!
 * });
 *
 */
var NFCToolsKBC = (function () {

  // Variables
  var instance = null; // Singleton instance
  var callback = null; // Callback function
  var isAlreadyRegister = false; // Is event already register ?

  /**
   * Create instance
   */
  function create () {

    /**
     * To register a callback function
     * Usage :
     */
    function registerCallback(callback) {

      // Check if callback param is a function
      if (typeof callback == 'function') {
        this.callback = callback; // Then, save the callback reference

        // Register the event if is not already registered
        if(this.callback != null && !isAlreadyRegister) {
          document.addEventListener('paste', (event) => {
            this.callback((event.clipboardData || window.clipboardData).getData('text')); // Call the callback function
            event.preventDefault(); // To block the default event handling
          });
          isAlreadyRegister = true; // Event is now registered
        }
      } else {
        // You must pass a function as a callback
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
