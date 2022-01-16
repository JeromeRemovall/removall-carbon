import React from "react"
import "../scss/components/button.scss"

function ButtonDownload({label, labelMobile, file}) {
	return(
		<>
			<button type="submit" className="button-primary">
				<hr />
				{label}
				{/* {file} */}
				{/* <a href={file} download="test.pdf">{label}</a> */}
			</button>
			<button type="submit" className="button-primary mobile">
				<hr />
				{labelMobile}
				{/* {file} */}
				{/* <a href={file} download="test.pdf">{labelMobile}</a> */}
			</button>
		</>
	)
}

export default ButtonDownload;