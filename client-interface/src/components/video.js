import React from 'react'
import './video.css'

import { useContext,useEffect, useState} from 'react'

import { socketProvider } from '../context'

function StreamVideo() {

  
  const {name,callAccepted,callEnded,call,videoStream,userStream,stream,muteAudio,muteVideo,getAudio,getVideo,destroyPeer} = useContext(socketProvider);


  return (
    <div>
                <div className='videoWrapper'>
            {
              stream &&
                <div>
                    <h2>You</h2>
                    <video playsInline muted ref={videoStream} autoPlay className='myvideo'/>              
                </div>
            }
            

            {
                userStream && callAccepted && !callEnded &&
                <div>
                    <h2>{ call.name || "UserName"}</h2>
                    <video playsInline ref={userStream} autoPlay className='myvideo'/>
                </div>
            }
          
          </div>

          <div className='muteDiv'>
            {
              getAudio ? <button className='mute' onClick={muteAudio}> Mute Audio</button>:
              <button className='mute unMute' onClick={muteAudio}> Unmute Audio</button>
            }
            {
              getVideo ? <button className='mute' onClick={muteVideo}> Mute video</button>:
              <button className='mute unMute' onClick={muteVideo}> Unmute Video</button>
            }
          </div>
    </div>
    
  )
}

export default StreamVideo