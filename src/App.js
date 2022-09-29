import './App.css'
import Video from './Video'
import { useEffect, useRef, useState } from 'react'

function App() {
  
  const storageJob = JSON.parse(localStorage.getItem('Jobs :'))
  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState(() => storageJob ?? [])
  const [message, setMessage] = useState()
  const handleSubmit = () => {

    setJobs(pre => {
      const newJobs = [...pre, job]
      if (job === '') {
        setMessage('Vui lòng nhập công việc')
      } else {
        const jsonJobs = JSON.stringify(newJobs)
        localStorage.setItem('Jobs :', jsonJobs)
        setMessage('')
      }
      return newJobs
    })
    setJob('')
  }
  console.log(jobs.filter(item => item!==''
    
  ))
    // const videoRef = useRef()

    // useEffect(() => {
    //   console.log(videoRef.current)
    // })


    // const handlePlay = () => {
    //   videoRef.current.play()
    // }

    // const handlePause = () => {
    //   videoRef.current.pause()
    // }

   return (
     <div>
       {/* <div>
        <Video ref={videoRef} /> 
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div> */}
      <div>
      <div>
        <input value={job} placeholder=' nhập công việc '
          onChange={e => setJob(e.target.value)}
        />
        <button onClick={handleSubmit}>ADD</button>
      </div>
      {message}
      {jobs.filter(item => item!=='').map((job, i) => (
        <li key={i} > {job === '' ? false : job} </li>
      ))}

    </div>
     </div>
     
   )

}

export default App