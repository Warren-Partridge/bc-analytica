const express = require('express');
const app = express();
const path = require('path');


// For getting ip info
const ip = require('ip');
const iploc = require('iplocation');

// For getting browser info
const useragent = require('useragent');
const si = require('systeminformation');

// view engine setup
var hbs = require('express-handlebars')({
    extname: '.hbs',
    helpers: {
        getOsInfo: si.osInfo().then(data => {console.log(data); return "DATA!";}).catch(error => console.log(error))
    },
});
app.engine('hbs', hbs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/test', (req, res) => {
    si.osInfo()
        .then(data => console.log(data))
        .catch(error => console.error(error)); // TODO: hostname: 'warrens-air.bc.edu' ... we may be able to get first name from apple users by looking at hostname
});

app.get('/', (req, res) => {
    var agent = useragent.parse(req.headers['user-agent']);

    // O Father forgive me for I have sinned
    si.system() // System info, including hostname and OS distro
        .then(systemData => {
            si.mem() // Device memory usage -> does the user seem busy
                .then(memData => {
                    si.battery()
                        .then(batteryData => {
                            si.osInfo()
                                .then(osData => {
                                    si.users()
                                        .then(usersData => {
                                            si.fsSize() // Device disk usage
                                                .then(fsSizeData => {
                                                    si.networkConnections() // IPs of other connected users. Might not be useful info
                                                        .then(netInterfaceData => {
                                                            si.currentLoad() // CPU current load
                                                                .then(currentLoadData => {
                                                                    si.processes() // Seriously huge data set here, it's all the processes being run on the device
                                                                        .then(processesData => {
                                                                            console.log(systemData);
                                                                            console.log(memData);
                                                                            console.log(batteryData);
                                                                            console.log(osData);
                                                                            console.log(usersData);
                                                                            console.log(fsSizeData);
                                                                            console.log(netInterfaceData);
                                                                            console.log(currentLoadData);
                                                                            console.log(processesData);

                                                                            const userData = ({
                                                                                ipAddress: ip.address(),
                                                                                browserFamily: agent.toJSON().family,
                                                                                systemData: systemData,
                                                                                memData: memData,
                                                                                batteryData: batteryData,
                                                                                osData: osData,
                                                                                usersData: usersData,
                                                                                fsSizeData: fsSizeData,
                                                                                netInterfaceData: netInterfaceData,
                                                                                currentLoadData: currentLoadData,
                                                                                processesData: processesData,
                                                                            });

                                                                            res.render('index', {userData: userData});

                                                                        }).catch(error => console.log(error));
                                                                }).catch(error => console.log(error));
                                                        }).catch(error => console.log(error));
                                                }).catch(error => console.log(error));
                                        }).catch(error => console.log(error))
                                }).catch(error => console.log(error))
                        }).catch(error => console.log(error))
                }).catch(error => console.log(error))
        }).catch(error => console.log(error));
    

});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
