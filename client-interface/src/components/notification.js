import React, { useContext } from 'react'

import { socketProvider } from '../context'
import './notification.css'

function Notification() {
  const {answerCall,call,callAccepted} = useContext(socketProvider);
  return (
    <>
      {call.callReceived && !callAccepted && (
        <div className='noti'>
          <h2> {call.name || "User"} is Calling:</h2>
          <button className="answer" onClick={answerCall}> Answer Call</button>
        </div>
      )}
    </>
  )
}

export default Notification