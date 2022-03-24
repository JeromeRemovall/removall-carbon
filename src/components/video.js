import React from 'react'
import "../scss/components/video.scss"
import ReactPlayer from 'react-player'
import {Play} from "react-feather";

function Video({src, title, thumbnail}) {

	return(
		<div className="video">
			<ReactPlayer 
				url={src}
				width='100%'
          		height='100%'
				controls={true}
				playIcon={<button className='play'><Play /></button>}
				light={thumbnail}
				playing={true}
			/>
		</div>
	)
}

export default Video;