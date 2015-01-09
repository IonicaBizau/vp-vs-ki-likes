// Dependencies
var Request = require("request")
  , Exec = require("child_process").exec
  ;

// Constants
const VP = "http://graph.facebook.com/victor.ponta"
    , KI = "http://graph.facebook.com/klausiohannis"
    ;

/**
 * seq
 * Fetches the number of likes.
 *
 * @name seq
 * @function
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
function seq(callback) {
    Request({
        url: VP,
        json: true
    }, function (err, res, vp) {

        Request({
            url: KI,
            json: true
        }, function (err, res, ki) {
            callback(null, [vp.likes, ki.likes]);
        });
    });
}

/**
 * show
 * Executes `notiy-send` to show system notifications.
 *
 * @name show
 * @function
 * @param {Array} arr The array with the number of likes.
 * @return {undefined}
 */
function show(arr) {
    Exec("notify-send -t 1000 'Victor Ponta: " + arr[0] + "\nKlaus Iohannis: " + arr[1] + " :: Diff: " + (arr[1] - arr[0]) + "'");
}


// Start
seq(function (err, arr) {
    show(arr);
});
setInterval(function () {
    seq(function (err, arr) {
        show(arr);
    });
}, 10000);
