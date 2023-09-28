import { useEffect } from 'react'
import Link from 'next/link'

const searchText = [
  '网络工具',
  'traceroute',
  '路由'
]

const IndexPage = () => {
  useEffect(() => {
    const handleMessage = (_event, args) => alert(args)

    // add a listener to 'message' channel
    global.ipcRenderer.addListener('message', handleMessage)

    return () => {
      global.ipcRenderer.removeListener('message', handleMessage)
    }
  }, [])

  const onSayHiClick = () => {
    global.ipcRenderer.send('message', 'hi from next')
  }

  return (
    <>
    asdas
    </>
  )
}

export default IndexPage
