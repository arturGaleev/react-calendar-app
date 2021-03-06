import React, { useState, useContext } from 'react'
import moment from 'moment'

import EventForm from './EventForm'
import AppContext from '../../context/App/AppContext'

const AddEvent = () => {
  const [color, setColor] = useState('')
  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const appContext = useContext(AppContext)
  const { addEvent, events, colors, colorObj } = appContext

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
    reset()
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

  const createEvent = () => {
    const event = setEvent(events.length + 1)
    addEvent(event)
    reset()
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
      allDay: checkbox,
      bgColor: color,
      backgroundColor: colorObj[color]
    }

    return event
  }

  const reset = () => {
    setColor('')
    setEventName('')
    setDescription('')
    setCheckbox(false)
    setShowTime(false)
    setStartDate(new Date())
    setEndDate(new Date())
  }

  return (
    <div>
      <EventForm
        modalId="add-event"
        title="Add Event"
        description={description}
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
        eventType={createEvent}
        buttonText="Save"
      />
    </div>
  )
}

export default AddEvent
