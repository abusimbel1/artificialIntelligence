import React, { useEffect, useState } from "react"
// @ts-ignore
import MicRecorder from "mic-recorder-to-mp3"
// @ts-ignore
import { saveAs } from "file-saver"
import { FaPlay, FaStop } from "react-icons/fa"
import gif from "../../assets/gifs/YdBO.gif"

import "./audioRecording.scss"

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

export const AudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [blobURL, setBlobURL] = useState("")
  const [isBlocked, setIsBlocked] = useState(false)
  const [dialogText, setDialogText] = useState("Hello! Start recording?")

  useEffect(() => {
    if (blobURL) {
      const isConfirmed = window.confirm("Do you want to process this record?")

      // isConfirmed && makeRequest...
    }
  }, [blobURL])

  useEffect(() => {
    if (isRecording) {
      setBlobURL("")
      setDialogText("Recording has started...")
    } else {
      setDialogText("Hello! Start recording?")
    }
  }, [isRecording])

  useEffect(() => {
    // @ts-ignore
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted")
        setIsBlocked(false)
      },
      () => {
        console.log("Permission Denied")
        setIsBlocked(true)
      }
    )
  }, [])

  const startRecording = () => {
    if (isBlocked) {
      console.log("Permission Denied")
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true)
        })
        .catch((e: any) => console.error(e))
    }
  }

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]: any) => {
        console.log(buffer)

        const blobURL = URL.createObjectURL(blob)
        setBlobURL(blobURL)
        setIsRecording(false)
        // saveAs(blob, "record.mp3"); // todo uncomment if tou want to save your record
      })
      .catch((e: any) => console.log(e))
  }

  return (
    <div className="audio-recording">
      <div className="audio-recording__dialog-text">{dialogText}</div>
      <div className="audio-recording__play-stop">
        {!isRecording && (
          <button
            className="audio-recording__start"
            onClick={startRecording}
            disabled={isRecording}
          >
            <FaPlay />
          </button>
        )}
        {isRecording && (
          <button
            className="audio-recording__stop"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            <FaStop />
          </button>
        )}
        {isRecording && (
          <img className="audio-recording__gif" src={gif} alt="" />
        )}
      </div>
      {/* {blobURL && <audio src={blobURL} controls={true} />} */}
    </div>
  )
}
