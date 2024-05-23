import express, { Express } from "express"


const app: Express = express();


app.get('/', (req, res) => {

    return res.send("Hey")
})



app.listen(5001, () => {
    console.log(`connected to port 5001`)
})

