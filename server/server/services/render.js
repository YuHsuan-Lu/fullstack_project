//use axios to get requst
const axios =require("axios")
const { response } = require("express")

exports.homeRoutes = (req,res)=>{
    //make GET request to the api users
    axios.get(`http://localhost:${process.env.PORT}/api/players`)
         .then(function(response){
            //  console.log(response)
            res.render('index',{users:response.data})
         }).catch(err=>{
             res.send(err)
         })
        }

exports.add_user = (req,res)=>{
    res.render('add_user')
}
exports.edit = (req, res) =>{
    axios.get(`http://localhost:${process.env.PORT}/api/players`, { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("edit", { users : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}



