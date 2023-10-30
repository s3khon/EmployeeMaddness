import React, {useState, useEffect} from 'react'

const Missing = () => {

    const [missingEmployees, setMissingEmployees] = useState([]); 
  
    const fetchMissingEmployees = () => {
        return fetch("/api/missing").then(res => res.json()); 
    }

    useEffect( () => {
        fetchMissingEmployees()
            .then( data => setMissingEmployees(data))
            .catch( err => console.log(err))
    }, []); 
  
  return (
    <div>
        <h1>Missing employees: </h1>
        <ul> 
            {missingEmployees.map(item => (
                <li key={item._id}>{item.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default Missing