import { RecordDialog } from "./features/recordDialog/RecordDialog"
import { TextArea } from "./features/textArea/TextArea"

import "./App.scss"
import { Speaker } from "./features/speaker/Speaker"

function App() {
  return (
    <div className="app">
      <TextArea />
      <div className="record-area">
        <RecordDialog />
        <Speaker />
      </div>
    </div>
  )
}

export default App
