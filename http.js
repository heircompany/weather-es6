// create request class for api calls
export class Http {
// class Http {
    // static helper method
    static fetchData(url) {
        return new Promise((resolve, reject) => {
            //built in xmlhttp handler
            const HTTP = new XMLHttpRequest();
            //all requests are GET, but could be a variable
            HTTP.open('GET', url);
            //Promise return cases
            HTTP.onreadystatechange = function() {
                //got your weather, here's your JSON
                if (HTTP.readyState === XMLHttpRequest.DONE && HTTP.status === 200) {
                    //parse JSON string into an object
                    const RESPONSE_DATA = JSON.parse(HTTP.responseText);
                    resolve(RESPONSE_DATA);
                } else if (HTTP.readyState === XMLHttpRequest.DONE) {
                    reject('Couldn'/'t get your Weather.');
                }
            };
            //send the request
            HTTP.send();
        });
    }
}

// module.exports = {Http};
