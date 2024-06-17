const request=require('request')
function forecast(address,callback){
    setTimeout(()=>{
        const url=' http://api.weatherapi.com/v1/current.json?key=<a6bb49a7752b4d51b4e160717240206>&q='+address+''
request({url:url},(error,response)=>{
    if(error){
        callback('unable to connect',undefined)
    }
    else{
        callback(undefined,
            JSON.parse(response.body)
        )
    }
})
    },2000)

}
module.exports=forecast