import video1 from './video/video.mp4'
import {forwardRef, useRef, useImperativeHandle} from 'react'

function Video (props, ref) {

    const video1Ref = useRef()


    useImperativeHandle(ref, () => ({
        play() {
            video1Ref.current.play() 
        },
        pause() {
            video1Ref.current.pause() 
        }
    }))
    

    return (
        <video  
        ref={video1Ref}
        src={video1}  
        style={{width:'50%', height:'500px'}}
       
        />
    )
}

export default forwardRef(Video)