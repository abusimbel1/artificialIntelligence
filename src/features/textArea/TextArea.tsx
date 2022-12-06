import { useEffect, useState } from "react"
import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

import "./textArea.scss"

export const TextArea = () => {
  const [value, setValue] = useState("")
  const { quill, quillRef } = useQuill()

  useEffect(() => {
    console.log(quillRef.current)
  }, [])

  return (
    <div className="text-area">
      {/* <div style={{ width: 500, height: 300 }}> */}
      <div className="text-area__quill" ref={quillRef} />
      {/* </div> */}
    </div>
  )
}
