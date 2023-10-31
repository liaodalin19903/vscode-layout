import React from 'react'

function appIntro() {

  window.electron.ipcRenderer.on("M2R-comdw", (data) => {
    console.log('lml - : ', data)
  })  

  return (
    <div>appIntro detail</div>
  )
}

export default appIntro
