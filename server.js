const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const {	StatusCodes } = require('http-status-codes')

const Like = require("./models/like")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




mongoose
  .connect("mongodb://localhost:27017/like", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Product-Service Connected to MongoDB"))
  .catch((e) => console.log(e))



app.post('/', async(request, response)=>{
  try {
    const like = await Like.find(request.body);
    const a = like.filter(
      (e) =>e.likes.toString()===request.body.car_Id&&e.user_Id.toString()===request.body.user_Id
    )
    if (a.length===0) {
      const like1 = await Like.create({...request.body})
      response
              .status(StatusCodes.CREATED).json({
                success: true,
                status: 201,
                data: like1,
              })
    } else {
      response
              .status(StatusCodes.CREATED).json({
                success: true,
                status: 201,
                data: a[0],
              })
    }
  } catch (err) {
    response
            .status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "internal server error"
            })
  }
})
 






const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})