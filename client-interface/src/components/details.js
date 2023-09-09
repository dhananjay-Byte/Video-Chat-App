import React, { useContext, useState } from 'react'
import './details.css'

import {CopyToClipboard} from "react-copy-to-clipboard"

import { socketProvider } from '../context'

function Details({children}) {
  const {id,callAccepted,name,setName,callUser,leaveCall,callEnded} = useContext(socketProvider);
  const [idtoCall,setIdToCall] = useState('');
  return (
    <div>
        <div>
          <input type='text' value={name} onChange={e=>setName(e.target.value)} placeholder='Enter Display Name'/>

          <input type='text' value={idtoCall} onChange={e=>setIdToCall(e.target.value)} placeholder='Enter ID to Call'/>

        </div>

       
        <div className='buttonWrapper'>
          {console.log(id)}
        <CopyToClipboard text={id}>
            <button className='copyidbuton'>Copy Your ID</button>
          </CopyToClipboard>

          {
          callAccepted && !callEnded ?
          (<button className="endCall" onClick={leaveCall}> End Call</button>):
          (<button className='callbuton' onClick={()=>callUser(idtoCall)}>Make A Call</button>)
          }
        </div>

        {children}
    </div>
    
  )
}

export default Details