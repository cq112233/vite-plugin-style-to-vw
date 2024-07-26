const A = (props:{size:string})=> {
  console.log('props',props.size)
  return ( 
    <div style={{border: '1px solid black', padding: '10px', margin: '10px'
    }}>
      A2
      { props.size }
    </div>
   );
}

export default A;