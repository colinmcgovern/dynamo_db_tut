import React, { useEffect } from 'react'
import config from './aws-exports'
import { Amplify, API } from 'aws-amplify'
import {Authenticator } from '@aws-amplify/ui-react'
import './App.css'

Amplify.configure(config)

function App() {
  
  const [petName, setPetName] = React.useState('')
  const [petType, setPetType] = React.useState('')
  const [pets, setPets] = React.useState([])

  useEffect(() => {
    API.get('petsapi','/pets/name')
    .then(petRes=>setPets([...pets,...petRes]))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    API.post('petsapi','/pets',{
      body: {
        name: petName,
        type: petType,
      },
    }).then(fetchedPets => {
      setPets([...pets,{name: petName, type: petType}])
    })
    return true
  }

  return (
    <div className="App">
      <header className="App-header">

            <form onSubmit={handleSubmit}>
              <input value={petName} placeholder="name_here" onChange={(e) => setPetName(e.target.value)}/>
              <input value={petType} placeholder="type_here" onChange={(e) => setPetType(e.target.value)}/>
              <button>Add Pet</button>
            </form>

            <ul>
              {pets.map(pet => <li>{pet.name}</li>)}
            </ul>


{/*          <Authenticator>
            {({ signOut, user }) => (
              <div className="App">
                <p>
                  Hey {user.username}, welcome to my channel, with auth!
                </p>
                <button onClick={signOut}>Sign out</button>
              </div>
            )}
          </Authenticator>*/}
      </header>
    </div>
  );
}

export default App;
