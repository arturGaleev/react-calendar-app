import React from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const EventForm = props => {

  const {
    modalId,
    title,
    closeModal,
    eventname,
    inputChange,
    checkbox,
    onCheckBoxChange,
    showTime,
    startDate,
    endDate,
    onInputChange,
    color,
    colors,
    handleChange,
    eventType,
    buttonText,
    colorObj
  } = props

  return (
    <div>
      <div className="modal" id={modalId} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <div className="modal-body p-3">
              <div className="form-group">
                <label className="control-label">Event Title</label>
                <input
                  type="text"
                  className="form-control form-white"
                  placeholder="Enter title"
                  name="event-name"
                  value={eventname}
                  onChange={inputChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="checkbox"
                  value={checkbox}
                  checked={checkbox}
                  onChange={onCheckBoxChange}
                />
                <label className="control-label">All-day event? (optional)</label>
              </div>
              <div className="form-group">
                <label>Start</label>
                <div className="row">
                  {
                    !showTime ? (
                      <div className="col-md-12">
                        <DatePicker
                          showTimeSelect
                          timeFormat="p"
                          timeIntervals={1}
                          dateFormat="Pp"
                          selected={startDate}
                          onChange={onInputChange('startDate')}
                        />
                      </div>
                    ):
                    (
                      <div className="col-md-12">
                        <DatePicker
                          dateFormat="Pp"
                          selected={startDate}
                          onChange={onInputChange('startDate')}
                        />
                      </div>
                    )
                  }

                </div>
              </div>
              <div className="form-group">
                <label>End</label>
                <div className="row">
                  {
                    !showTime ? (
                        <div className="col-md-12">
                          <DatePicker
                            showTimeSelect
                            timeFormat="p"
                            timeIntervals={1}
                            dateFormat="Pp"
                            selected={endDate}
                            onChange={onInputChange('endDate')}
                          />
                        </div>
                      ):
                      (
                        <div className="col-md-12">
                          <DatePicker
                            dateFormat="Pp"
                            selected={endDate}
                            onChange={onInputChange('endDate')}
                          />
                        </div>
                      )
                  }
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">Choose Event Color</label>
                <select className="form-control form-white" name="event-color"
                  onChange={handleChange}
                >
                  <option>Select color</option>
                  {
                    colors.map(color =>
                      <option
                        value={color.toLowerCase()}
                        key={color}
                      >
                        {color}
                      </option>
                    )
                  }
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary save"
                      data-dismiss="modal"
                      onClick={eventType}
                      disabled={
                        !eventname || !startDate || !endDate || !color
                      }
              >
                {buttonText}
              </button>
              <button type="button" className="btn btn-light cancel" data-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventForm
