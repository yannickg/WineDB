var getLocation = function()
{
    var suc = function(p)
    {
        document.getElementById("loclat").innerHTML = 'Latitude: '
                + p.coords.latitude;
        document.getElementById("loclong").innerHTML = 'Longitude: '
                + p.coords.longitude;
        document.getElementById("locaccur").innerHTML = 'Accuracy: '
                + p.coords.accuracy + 'm';

        var mapview = document.getElementById('mapview');

        var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center="
                + p.coords.latitude
                + ","
                + p.coords.longitude
                + "&zoom=13&size=220x180&markers=color:blue|"
                + p.coords.latitude + ',' + p.coords.longitude;

        mapview.style.display = "";
        mapview.style.position = "absolute";
        mapview.style.bottom = "7px";
        mapview.style.left = "14px";
        document.getElementById("mapcanvas").src = image_url;
    };
    
    var fail = function(error)
    {
        document.getElementById("loclong").innerHTML = '<span style="color:red;">Failed to get location</span>';
        switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User did not share geolocation data.");
            break;

        case error.POSITION_UNAVAILABLE:
            alert("Could not detect current position.");
            break;

        case error.TIMEOUT:
            alert("Retrieving position timed out.");
            break;

        default:
            alert("Unknown error.");
            break;
        }
    };

    if (navigator.geolocation)
    {
        document.getElementById("loclong").innerHTML = "Getting geolocation . . .";
        navigator.geolocation.getCurrentPosition(suc, fail);
    }
    else
    {
        document.getElementById("loclong").innerHTML = '<span style="color:red;">Device or browser can not get location</span>';
    }
};

var closeLocation = function()
{
    document.getElementById("loclat").innerHTML = "";
    document.getElementById("loclong").innerHTML = "";
    document.getElementById("locaccur").innerHTML = "";
    document.getElementById("mapcanvas").src = "";
    document.getElementById("mapview").style.display = "none";
};

var beep = function()
{
    navigator.notification.beep(2);
};

var vibrate = function()
{
    navigator.notification.vibrate(0);
};

function roundNumber(num)
{
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a)
{
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

function toggleAccel()
{
    if (accelerationWatch !== null)
    {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    }
    else
    {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
}

var preventBehavior = function(e)
{
    e.preventDefault();
};

function dump_pic(data)
{
    var viewport = document.getElementById('viewport');
    //console.log(data);
    viewport.style.display = "";
    viewport.style.position = "relative";
    viewport.style.top = "10px";
    viewport.style.left = "20px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg)
{
    alert(msg);
}

function show_pic()
{
    navigator.camera.getPicture(
            dump_pic, 
            fail, 
            {
                quality : 50
            }
            );
}

function closeviewport()
{
    var viewport = document.getElementById('viewport');
    viewport.style.display = "none";
    document.getElementById("test_img").src = "";
}

function contacts_success(contacts)
{
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name &&
               contacts[2].name.formatted ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts()
{
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function touchEvent(event)
{
    alert("We got an event: " + event);
    scanBarcode();
}

function scanBarcode()
{
	window.plugins.BarcodeScanner.scan(
	        
	        function(result)
	        {
	            if (!result.cancelled)
	            {
	                if (result.format == "QR_CODE")
	                {
	                    alert("We got a QR_CODE\n" +
	                              "Result: " + result.text);
	                }
	                else if (result.format == "EAN_13")
	                {
	                    alert("We got a EAN_13\n" +
                                "Result: " + result.text);
	                }
                    else if (result.format == "UPC_A")
                    {
                        alert("We got a UPC_A\n" +
                                "Result: " + result.text);
                    }
                    else
                    {
                        alert("We got a barcode\n" +
                                  "Result: " + result.text + "\n" +
                                  "Format: " + result.format);
                    }
	            }
	        },
	        
	        function(error)
	        {
	            alert("Scanning failed: " + error);
	        }
	        
	        );
}

var check_network = function()
{
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    document.getElementById("networktext").innerHTML = "<span>Connection type:<br/>"
        + states[networkState] + "</span>";
};
