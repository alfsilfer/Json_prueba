const csv = require('csv-parser')
const fs = require('fs')
const to = require('convert-csv-to-json')
const express = require('express')
const app = express()



const exitJson = "./doc_prueba.csv"
const newJson = 'test2.json' 
to.generateJsonFileFromCsv(exitJson,newJson); 



function recibe (c,j){
  
  
  fs.readFile(c,"utf8", function(err, data) {
  if (err) throw err;

  let mobilePrice = 0
  let carPrice = 0
  let stickerPrice = 0  
  
  let csvJson = JSON.parse(data)
  for(values of csvJson){
    if(values.CATEGORY === "mobile"){
      let mobileCost = values.COST.replace(",",".")
      mobilePrice = parseFloat(mobileCost)
      
    }
    else if (values.CATEGORY === "car"){
      let carCost = values.COST.slice(0).replace(".","")
      carPrice = parseFloat(carCost)
      
    }
    else if(values.CATEGORY === "stickers"){
      let stickersCost = values.COST.replace(",",".")
      stickerPrice = parseFloat(stickersCost)
      
    }
  } 
    fs.readFile(j,'utf8',(err,data)=>{
      
      if (err) throw err;
      app.get("/",(req,res,next)=>{

      jsonData = JSON.parse(data)  
      jsonData.categories.car = (carPrice*112)/100
      jsonData.categories.outlet = (carPrice*99)/100
      jsonData.categories.bargain = ((carPrice*105)/100)-1
      jsonData.categories.home = ((carPrice + 3)*99)/100
      jsonData.categories.music = (carPrice*103.1)/100
      jsonData.categories.mobile = mobilePrice+12
      jsonData.categories["*"] = (stickerPrice*120)/100

      //console.log(jsonData)
      res.send({jsonData})

      }
      
    )
      
      
  })
  
  
  })
  
}

const ncategories = "./jsonPrueba.json"
recibe(newJson,ncategories)



app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
})

