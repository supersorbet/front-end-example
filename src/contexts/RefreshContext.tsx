import React, { useState, useEffect } from 'react'

const FAST_INTERVAL = 60000
const SLOW_INTERVAL = 360000
const VERY_SLOW_INTERVAL = 1000 * 60 * 10

const RefreshContext = React.createContext({ slow: 0, fast: 0, verySlow: 0 })

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }) => {
  const [slow, setSlow] = useState(0)
  const [fast, setFast] = useState(0)
  const [verySlow, setVerySlow] = useState(0)

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1)
    }, FAST_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1)
    }, SLOW_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setVerySlow((prev) => prev + 1)
    }, VERY_SLOW_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return <RefreshContext.Provider value={{ slow, fast, verySlow }}>{children}</RefreshContext.Provider>
}

export { RefreshContext, RefreshContextProvider }
