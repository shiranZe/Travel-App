var locs = [{lat: 11.22, lng: 22.11}]

function getLocs() {
    return Promise.resolve(locs);
}


function getPosition() {
    console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
       
    })
}

function loadAddress(inputValue) {
    const API_KEY = 'AIzaSyAT6kgeeG5OSYsEuffWJVuFeRPhnOa0Di0';
    var prm = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${API_KEY}`);
    return prm.then(function (res) {
        var prmJson = res.json();
       return prmJson.then(data => {
            console.log(data.results[0].geometry.location)
            return data.results

        })
    })
    console.log('Sent the Request');
}

function loadCurrLoc(lat,lng){
    const API_KEY = 'AIzaSyAT6kgeeG5OSYsEuffWJVuFeRPhnOa0Di0';
    var prm = fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
    return prm.then(function (res) {
        var prmJson = res.json();
       return prmJson.then(data => {
            // console.log(data.results[0].geometry.location) // get back coordinates lat lng
            return data.results

        })
    })
    console.log('Sent the Request');
}





export default {
    getLocs,
    getPosition,
    loadAddress,
    loadCurrLoc
}




// // 2nd promise
// var showOff = function (phone) {
//     return new Promise(
//         function (resolve, reject) {
//             var message = 'Hey friend, I have a new ' +
//                 phone.color + ' ' + phone.brand + ' phone';

//             resolve(message);
//         }
//     );


//     // Promise
// var willIGetNewPhone = new Promise(
//     function (resolve, reject) {
//         if (isMomHappy) {
//             var phone = {
//                 brand: 'Samsung',
//                 color: 'black'
//             };
//             resolve(phone); // fulfilled
//         } else {
//             var reason = new Error('mom is not happy');
//             reject(reason); // reject
//         }

//     }
// );


// var askMom = function () {
//     willIGetNewPhone
//     .then(showOff) // chain it here
//     .then(function (fulfilled) {
//             console.log(fulfilled);
//          // output: 'Hey friend, I have a new black Samsung phone.'
//         })
//         .catch(function (error) {
//             // oops, mom don't buy it
//             console.log(error.message);
//          // output: 'mom is not happy'
//         });
// };


// const askMom = function () {
//     willIGetNewPhone
//         .then(showOff)
//         .then(fulfilled => console.log(fulfilled)) // fat arrow
//         .catch(error => console.log(error.message)); // fat arrow
// };