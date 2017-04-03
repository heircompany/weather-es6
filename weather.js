export class WeatherData {
    constructor(cityName, description) {
        this.cityName = cityName;
        this.description = description;
        this.temperature = '';
    }
}

export const WEATHER_PROXY_HANDLER = {
    get: function(target, property) {
        return Reflect.get(target, property);
    }
    set: function(target, property, value) {
        const CONVERT = (value * 1.8 + 32).toFixed(2) + 'F';
        return Reflect.set(target, property, CONVERT)
    }
};
//
// class WeatherData {
//     constructor(cityName, description) {
//         this.cityName = cityName;
//         this.description = description;
//         this.temperature = '';
//     }
// }
//
// const WEATHER_PROXY_HANDLER = {
//     get: function(target, property) {
//         return Reflect.get(target, property);
//     }
//     set: function(target, property, value) {
//         const CONVERT = (value * 1.8 + 32).toFixed(2) + 'F';
//         return Reflect.set(target, property, CONVERT)
//     }
// };
//
// module.exports = {WeatherData, WEATHER_PROXY_HANDLER}
