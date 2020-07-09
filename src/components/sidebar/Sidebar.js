import React, { useContext } from 'react'

import AddEvent from '../modal/AddEvent'
import EditEvent from '../modal/EditEvent'
import SelectModal from '../modal/SelectModal'
import AppContext from '../../context/App/AppContext'

const Sidebar = () => {
  const appContext = useContext(AppContext)
  const { events, selected } = appContext

  return (
    <div className="col-lg-3">
      <button data-toggle="modal" data-target="#add-event" className="btn btn-primary btn-block">
        Create New Event
      </button>

      <div className="m-t-20">
        <br />
        {
          events.length > 0 ?
            events.map((event, index) =>
              <div
                className={`external-event bg-${event.bgColor}`}
                key={event.id + index}
                onClick={() => selected(event)}
                data-toggle="modal"
                data-target="#selection-modal"
              >
                {event.title}
              </div>
            )
          : 'No events added'
        }
        <AddEvent />
        <SelectModal />
        <EditEvent />
      </div>
    </div>
  )
}

export default Sidebar
