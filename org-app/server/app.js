import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.post("/api/callwaiter", (req, res) => {
  try {
    console.log("waiter called")
    return res.status(200).json({ response: "success" })
  } catch (error) {
    return res.status(500).json({ error: error.toString() })
  }
})

export default app
