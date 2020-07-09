import React, { useContext, useEffect } from 'react'
import moment from 'moment'

import AppContext from '../../context/App/AppContext'

import './Toast.css'

const Toast = () => {
  const appContext = useContext(AppContext)
  const {
    activeEvents,
    events,
    activeCalendarEvents,
    deleteSelectedEvent,
    selected
  } = appContext

  useEffect(() => {
    const interval = setInterval(()=> {
      addEvent()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  const deleteEvent = event => {
    deleteSelectedEvent(event)
    selected({})
  }

  const addEvent = () => {
    if (events.length) {
      for (const event of events) {
        const startEventDate = `${moment(new Date(event.start)).format('YYYY-MM-DDTHH:mm')}`
        const now = moment(new Date(event.start)).format('YYYY-MM-DDTHH:mm')
        if (now === startEventDate) {
          activeEvents(event)
        }
      }
    }
  }

  return (
    <>
      {
        activeCalendarEvents.map((e, i)=>
          <div key={i} className="notification-container notification-bottom-right">
            <div className="notification toast"
                 style={{ backgroundColor: e.backgroundColor }}
            >
              <button
                onClick={() => deleteEvent(e)}
              >X</button>
              <p className="notification-title">{ e.title }</p>
              <p className="notification-subtitle">
                { moment(e.start).fromNow() }
              </p>
              <p className="notification-message">
                { e.description }
              </p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Toast
