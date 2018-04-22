(function(){
        var networks = [{
            url: "https://squareup.com/login?return_to=%2Ffavicon.ico",
            name: "Square"
        }, {
            url: "https://www.instagram.com/accounts/login/?next=%2Ffavicon.ico",
            name: "Instagram"
        }, {
            url: "https://twitter.com/login?redirect_after_login=%2Ffavicon.ico",
            name: "Twitter"
        }, {
            url: "https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp",
            name: "Facebook"
        }, {
            url: "https://accounts.google.com/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=de&service=youtube",
            name: "Google"
        },, {
            url: "https://plus.google.com/up/accounts/upgrade/?continue=https://plus.google.com/favicon.ico",
            name: "Google Plus"
        }, {
            url: "https://login.skype.com/login?message=signin_continue&redirect_uri=https%3A%2F%2Fsecure.skype.com%2Ffavicon.ico",
            name: "Skype"
        }, {
            url: "https://www.flickr.com/signin/yahoo/?redir=https%3A%2F%2Fwww.flickr.com/favicon.ico",
            name: "Flickr"
        }, {
            url: "https://www.spotify.com/de/login/?forward_url=https%3A%2F%2Fwww.spotify.com%2Ffavicon.ico",
            name: "Spotify"
        }, {
            url: "https://www.reddit.com/login?dest=https%3A%2F%2Fwww.reddit.com%2Ffavicon.ico",
            name: "Reddit"
        }, {
            url: "https://www.tumblr.com/login?redirect_to=%2Ffavicon.ico",
            name: "Tumblr"
        }, {
            url: "https://www.expedia.de/user/login?ckoflag=0&selc=0&uurl=qscr%3Dreds%26rurl%3D%252Ffavicon.ico",
            name: "Expedia"
        }, {
            url: "https://www.dropbox.com/login?cont=https%3A%2F%2Fwww.dropbox.com%2Fstatic%2Fimages%2Ficons%2Ficon_spacer-vflN3BYt2.gif",
            name: "Dropbox"
        }, {
            url: "https://www.amazon.com/ap/signin/178-4417027-1316064?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=10000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Ffavicon.ico",
            name: "Amazon"
        }, {
            url: "https://www.pinterest.com/login/?next=https%3A%2F%2Fwww.pinterest.com%2Ffavicon.ico",
            name: "Pinterest"
        }, {
            url: "https://www.netflix.com/Login?nextpage=%2Ffavicon.ico",
            name: "Netflix"
        }, {
            url: "https://de.foursquare.com/login?continue=%2Ffavicon.ico",
            name: "Foursquare"
        }, {
            url: "https://eu.battle.net/login/de/index?ref=http://eu.battle.net/favicon.ico",
            name: "Battle.net"
        }, {
            url: "https://store.steampowered.com/login/?redir=favicon.ico",
            name: "Steam"
        }, {
            url: "https://www.academia.edu/login?cp=/favicon.ico&cs=www",
            name: "Academia.edu"
        }, {
            url: "https://stackoverflow.com/users/login?ssrc=head&returnurl=http%3a%2f%2fstackoverflow.com%2ffavicon.ico",
            name: "Stack Overflow"
        },, {
            url: "https://accounts.google.com/ServiceLogin?service=blogger&hl=de&passive=1209600&continue=https://www.blogger.com/favicon.ico",
            name: "Blogger"
        }];



        function print(msg,color) {
            document.getElementById('socialMedia').innerHTML += '<div style="color:'+color+';">'+msg + '</div>';
        }
        networks.forEach(function(network) {
            var img = document.createElement('img');
            img.src = network.url;
            var element = document.getElementById('loggedIn')
            img.onload = function() {
                element.innerText += network.name
            };
            img.onerror = function() {
                // print(network.name + ': not logged in');
            };
        });

     //    var parser = new UAParser();
     //    console.log(navigator.getBattery());
	    // console.log(parser.getDevice().vendor);
	    // console.log(parser.getCPU());
	    // console.log(navigator.platform);
	    // console.log(navigator.hardwareConcurrency);
	    // console.log(parser.getOS());
	    // console.log(parser.getResult());
    }()

);

var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}});

/*Usage example*/
findIP.then(ip =>{
		var element = document.getElementById("theIP");
		element.innerText = ip;
	}
)
.catch(e => console.error(e));
function initMap() {

	var uluru = {lat: 42.360082, lng: -71.058880};
	var map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 4,
		center: uluru
    });
	var marker = new google.maps.Marker({
    	position: uluru,
    	map: map
	});
}

var battery = navigator.getBattery().then(result => {
	var para = document.createElement("span");
	var node = document.createTextNode(result.level);
	para.appendChild(node);
	var element = document.getElementById("battery-content");
	element.appendChild(para);
	})
	.catch(error => console.log(error));

var parser = new UAParser();

var browser = document.getElementById("browser-content");
	browser.innerText = parser.getBrowser().name;

var computer = document.getElementById("os-content");
	computer.innerText = parser.getOS().name;

var platform = document.getElementById("platform-content");
	platform.innerText = navigator.platform;

// var info = parser.getDevice().then(result => {
// 	var para = document.createElement("span");
// 	var node = document.createTextNode(result.level);
// 	para.appendChild(node);
// 	var element = document.getElementById("other-content");
// 	element.innerHTML(parser.getDevice());
// 	})
// 	.catch(error => console.log(error));






