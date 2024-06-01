import './App.css'

function App() {
  return (
    <>
      <div 
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: 'blue',
          paddingBottom: '30px',
        }}
        ref={(el) => {
          if (el) {
            el.style.setProperty('height', '100px', 'important');
            el.style.setProperty('width', '100px', 'important');
            el.style.setProperty('background-color', 'red');
            el.style.setProperty('padding-bottom', '30px', 'important');
          }
        }}>A</div>
    </>
  )
}

export default App
