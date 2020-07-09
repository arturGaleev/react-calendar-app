import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'

import EventForm from './EventForm'
import AppContext from '../../context/App/AppContext'

const EditEvent = () => {
  const [color, setColor] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const appContext = useContext(AppContext)
  const { events, colors, selectedEvent, colorObj, editSelectedEvent} = appContext

  useEffect(() => {
    if (Object.keys(selectedEvent).length) {
      setColor(selectedEvent.bgColor)
      setEventName(selectedEvent.title)
      setDescription(selectedEvent.description)
      setCheckbox(selectedEvent.allDay)

      const start = `${moment(new Date(selectedEvent.start)).format()}`
      let end = ''
      if (!selectedEvent.allDay) {
        setShowTime(false)
        end = `${moment(new Date(selectedEvent.end)).format()}`
      } else {
        setShowTime(true)
        end = `${moment(new Date(selectedEvent.end)).format('YYYY-MM-DD')}`
      }

      setStartDate(new Date(start))
      setEndDate(new Date(end))

    }
    // eslint-disable-next-line
  }, [selectedEvent, events])

  const inputChange = event => {
    const attributeName = event.target.getAttribute('name')
    if (attributeName === 'event-name') {
      setEventName(event.target.value)
    }
    if (attributeName === 'description') {
      setDescription(event.target.value)
    }
  }

  const onInputChange = (propertyName) => event => {
    if (propertyName === 'startDate') {
      setStartDate(event)
    }

    if (propertyName === 'endDate') {
      setEndDate(event)
    }
  }

  const closeModal = () => {

  }

  const handleChange = event => {
    if (event.target.value !== 'Select color') {
      setColor(event.target.value)
    } else {
      setColor('')
    }
  }

  const onCheckBoxChange = (event) => {
    const isCheck = event.target.checked

    setShowTime(isCheck)
    setCheckbox(isCheck)
  }

  const editEvent = () => {
    const event = setEvent(selectedEvent.id)
    editSelectedEvent(event)
  }

  const setEvent = id => {
    const start = `${moment(startDate).format()}`
    let end = ''
    if (!checkbox) {
      end = `${moment(startDate).format()}`
    } else {
      end = `${moment(startDate).format('YYYY-MM-DD')}`
    }

    const event = {
      id,
      title: eventName,
      description,
      start,
      end,
      bgColor: color,
      backgroundColor: colorObj[color]
    }

    return event
  }

  return (
    <>
      <EventForm
        modalId="edit-event"
        title="Edit Event"
        closeModal={closeModal}
        eventname={eventName}
        inputChange={inputChange}
        checkbox={checkbox}
        onCheckBoxChange={onCheckBoxChange}
        showTime={showTime}
        startDate={startDate}
        endDate={endDate}
        onInputChange={onInputChange}
        color={color}
        colors={colors}
        colorObj={colorObj}
        handleChange={handleChange}
        eventType={editEvent}
        buttonText="Update"
      />
    </>
  )
}

export default EditEvent
