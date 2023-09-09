import React from "react";

import { createContext,useState,useRef,useEffect } from "react";

import {io} from "socket.io-client";

import Peer from 'simple-peer'

const socketProvider = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = ({children})=>{

    const [stream,setStream] = useState(null);
    const [id,setId] = useState('');
    const [call,setCall] = useState({});
    const [callAccepted, setCallAccpeted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name,setName] = useState('')
    const [getAudio,setGetAudio] = useState(true);
    const [getVideo,setGetVideo] = useState(true);
    const [destroyPeer,setDestoryPeer] = useState(false);

    const videoStream = useRef();
    const userStream = useRef();
    const connectionRef = useRef();
    
    const userID = (id)=>{
        setId(id);
    }

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({audio:true,video:true})
        .then((currentStream)=>{
            setStream(currentStream)
            if(videoStream.current){
                videoStream.current.srcObject = currentStream;
            }
            
        }) 

        socket.on("me",userID);

        socket.on("calluser",({from,name,signal})=>{
            setCall({callReceived:true,from,name,signal})
        })

        return()=>{
            socket.off("me",userID);
        }

    },[])


    useEffect(()=>{
        socket.on("refreshClient",()=>{
            window.location.reload()
        })
    },[])

   

    const muteAudio = ()=>{
         stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
         setGetAudio(!getAudio);
    }

    const muteVideo = ()=>{
        stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        setGetVideo(!getVideo);
   }

    const callUser = (userid)=>{
        const peer = new Peer({initiator:true,trickle:false,stream});

        peer.on("signal",(data)=>{
            socket.emit("calluser",{userToCall:userid,signalData:data,from:id,name})
            })

        peer.on("stream",(currenStream)=>{
                userStream.current.srcObject = currenStream
            })
        socket.on("callaccepted",(signal,username)=>{
            setCallAccpeted(true);
            call.name = username;
            peer.signal(signal);
        })

        connectionRef.current = peer;
    }

    const answerCall = ()=>{
        setCallAccpeted(true);

        const peer = new Peer({initiator:false,trickle:false,stream});

        peer.on("signal",(data)=>{
                socket.emit("answercall",{signal:data,to:call.from,name})
        })

        peer.on("stream",(currenStream)=>{
            userStream.current.srcObject = currenStream
        })

        peer.signal(call.signal);

      
        connectionRef.current = peer;
        
    }

    const leaveCall = ()=>{

        setCallEnded(true)

        socket.emit("refresh");

        window.location.reload();
        
    }

    return(
        <socketProvider.Provider value={{
            call,
            callAccepted,
            callEnded,
            id,
            videoStream,
            userStream,
            callUser,
            answerCall,
            leaveCall,
            name,
            setName,
            stream,
            muteAudio,
            muteVideo,
            getAudio,
            getVideo,
            destroyPeer
        }}>
            {children}
        </socketProvider.Provider>
    )
}

export {ContextProvider,socketProvider}