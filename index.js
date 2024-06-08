var express= require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/MoneyTrackerList')
var db= mongoose.connection
db.on('error', ()=> console.log("Error in connection with DB"))
db.once('open', ()=> console.log("Connected to DB"))

app.post("/add", (req,res)=>{
    var category_select= req.body.category_select
    var amount_input= req.body.amount_input
    var info= req.body.info
    var date= req.body.date

    var data={
        "Category":category_select,
        "Amount":amount_input,
        "Info":info,
        "Date":date
    }
    db.collection('users').insertOne(data, (err,collection) =>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
})
app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5252)

console.log("Listening to port 5252")