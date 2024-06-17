const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//set up file directory for express config
const filepath=path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
//setup handlebar engine and location
app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(filepath))


app.get('',(req,res)=>{
    res.render('index', {
        title:'welcome',
        name:'jessica'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about us',
        name: 'jessica'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title:'help page',
        message: 'For more information',
        name:'somto'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'please provide a valid address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude}) => {
        if (error)
       return res.send({ error })
    })
    //forecast(longitude, latitude, (error, forecastData) => {
    //    if (error) {
    //      return  res.send({error})
    //    }
    //})
    res.send({
       // forecast:forecastData,
        //latitude:latitude,
        //longitude:longitude,
        address:req.query.address
    })
    //console.log(req.query.address)
    //res.send([{
    //    address:req.query.address,
    //    temperature:32,
    //    condition: 'hot like fire'
    //}])
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
       //return res.render('error', {
       //     title: '404',
       //     name: 'jessica',
       //     message: 'the page cannot be found'
       // })
       return res.send({
            error:'add search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'jessica',
        message: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name:'jessica',
        message: 'the page cannot be found'
    })
})
app.listen(3000,()=>{
    console.log('server started')
})