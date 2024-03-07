
import './App.css'

function App() {
 
  const callWaiter = () => {
    console.log('Waiter called')
  }
  
  return (
    <>
      <div>
      <button onClick={callWaiter}>Call waiter</button>
      </div>
     
    </>
  )
}

export default App
