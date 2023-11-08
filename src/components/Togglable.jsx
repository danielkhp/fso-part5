import { useState } from 'react'

const Togglable = ({ buttonText, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVis = () => setVisible(!visible)

  if (!visible) {
    return (
      <div>
        <button
          type='button'
          onClick={toggleVis}
        >
          {buttonText}
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
          cancel
        </button>
    </div>
  )
}

export default Togglable
