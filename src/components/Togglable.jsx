import { useState } from 'react'

const Togglable = ({ showText, hideText, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVis = () => setVisible(!visible)

  if (!visible) {
    return (
      <div>
        <button
          type='button'
          onClick={toggleVis}
        >
          {showText}
        </button>
      </div>
    )
  }

  return (
    <div>
      {children}
      <button
          type='button'
          onClick={toggleVis}
        >
          {hideText}
        </button>
    </div>
  )
}

export default Togglable
