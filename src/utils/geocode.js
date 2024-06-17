const request = require('request')

function geoCode(address,callback){
    setTimeout(()=>{
        const url='https://api.mapbox.com/search/geocode/v6/forward?q='+address+'&types=country&access_token=pk.eyJ1IjoiZmxleHdpdGhqZXNzeSIsImEiOiJjbHd5ejk5dWEwMjZwMmlyMnkxdzZ1YnduIn0.R7Xz6s0gy8SNU4w9zSkDTg'
        request({url:url,json:true},(error,response)=>{
            if(error){
callback('unable to connect',undefined)
            }
            else if(response.body.features.length===0){
                callback('unable to find location', undefined)

            }
            else{
                callback(undefined,{
                    latitude: response.body.features[0].geometry.coordinates[0],
                   longitude: response.body.features[0].geometry.coordinates[1],
                })
            }
        })
        
    },2000)

}
module.exports = geoCode