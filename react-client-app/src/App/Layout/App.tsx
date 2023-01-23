import { useState, useEffect } from 'react'
import axios from 'axios';
import {PeopleAltRounded} from '@mui/icons-material';

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, []) // [] means run once (not strictly true)

  return (
    <div className="App">
      <PeopleAltRounded  />
      <h2>Reactivities</h2>
      <ul>
        {activities.map((activity: any) => (
          <li key={activity.id}>
            {activity.title}
          </li>
          ))}
      </ul>
    </div>
  )
}

export default App
