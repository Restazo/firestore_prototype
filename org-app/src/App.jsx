import { useState, useEffect } from "react"
import {
  collection,
  onSnapshot,

} from "firebase/firestore"
import { db } from "./config/firestore"

function App() {
  const [tables, setTables] = useState([])

  const restaurantId = "1"

  useEffect(() => {
    const ubsub = onSnapshot(
      collection(db, "restaurants", restaurantId, "tables"),
      snapshot => {
        const tablesData = snapshot.docs.map(doc => doc.data())

        setTables(tablesData)
        console.log(tablesData)
      }
    )

    return () => {
      ubsub()
    }
  }, [restaurantId]) // Re-run the effect if `restaurantId` changes

  return (
    <>
      <h1>Tables</h1>
      <ul>
        {tables.map(table => (
          <li key={table.table}>{table.waiterCalled ? 'assistance required' : "Dont disturb me"}</li>
        ))}
      </ul>
    </>
  )
}

export default App
