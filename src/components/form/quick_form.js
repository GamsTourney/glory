import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import get from 'lodash/get'
import each from 'lodash/each'
import startCase from 'lodash/startCase'

const Field = ({ field, labels, value, onChange }) => {
  const fieldLabel = labels[field] || startCase(field)
  return <TextField label={fieldLabel} onChange={onChange} value={value} />
}

Field.propTypes = {
  field: PropTypes.string.isRequired,
  options: PropTypes.shape({}),
  labels: PropTypes.shape({}),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
}

Field.defaultProps = {
  options: {},
  labels: {},
  value: undefined
}

const QuickForm = ({ initial, fields, labels, options, onSubmit }) => {
  const initialValues = {}
  if (initial) {
    each(fields, f => {
      initialValues[f] = get(initial, f)
    })
  }

  const [form, setValues] = useState(initialValues)
  const updateField = (field, value) => {
    setValues({
      ...form,
      [field]: value
    })
  }

  return (
    <form onSubmit={() => onSubmit(form)}>
      {fields.map(f => (
        <Field
          key={f}
          field={f}
          options={options}
          labels={labels}
          value={get(form, f) || ''}
          onChange={e => updateField(f, get(e, 'target.value'))}
        />
      ))}
    </form>
  )
}

QuickForm.propTypes = {
  initial: PropTypes.shape({ id: PropTypes.number }),
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.shape({}),
  labels: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired
}

QuickForm.defaultProps = {
  initial: {},
  options: {},
  labels: {}
}

export default QuickForm
