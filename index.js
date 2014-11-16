// Dependencies
var Request = require("request")
  , Exec = require("child_process").exec
  ;

const VP = "http://graph.facebook.com/victor.ponta"
    , KI = "http://graph.facebook.com/klausiohannis"
    ;

function seq(callback) {
    Request({
        url: VP,
        json: true
    }, function (err, res, vp) {

        Request({
            url: KI,
            json: true
        }, function (err, res, ki) {
            debugger;
            callback(null, [vp.likes, ki.likes]);
        });
    });
}

function show(arr) {
    Exec("notify-send -t 1000 'Victor Ponta: " + arr[0] + "\nKlauss Iohannis: " + arr[1] + " :: Diff: " + (arr[1] - arr[0]) + "'");
}

seq(function (err, arr) {
    show(arr);
});

setInterval(function () {
    seq(function (err, arr) {
        show(arr);
    });
}, 10000);
