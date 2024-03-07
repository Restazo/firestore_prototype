import express from "express"
import cors from "cors"
import db from "./lib/firebase.js"
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.post("/api/callwaiter", async (req, res) => {
  try {

    const { restaurantName, tableNumber } = req.body
    
 

    const restaurantRef = db.collection('restaurants')
    const restaurantsSnapshot = await restaurantRef.where('name', '==', restaurantName).get()
    const restaurantDoc = restaurantsSnapshot.docs[0];

    const tablesSnapshot = await restaurantDoc.ref.collection('tables').where('table', '==', tableNumber).get()
    const tableDoc = tablesSnapshot.docs[0]

    // Update table status

    await tableDoc.ref.update({
      waiterCalled: true
    })

    console.log("waiter called")
    return res.status(200).json({ success: "waiter called" })
  } catch (error) {
    return res.status(500).json({ error: error.toString() })
  }
})

app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurantsRef = db.collection('restaurants')
    const restaurants = (await restaurantsRef.get()).docs.map(item => item.data())
   
   

    console.log("waiter called")
    return res.status(200).json({ success: restaurants })
  } catch (error) {
    return res.status(500).json({ error: error.toString() })
  }
})

export default app
