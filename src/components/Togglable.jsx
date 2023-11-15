import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ showText, hideText, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVis = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggleVis }))

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
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showText: PropTypes.string.isRequired,
  hideText: PropTypes.string.isRequired,
}

export default Togglable
