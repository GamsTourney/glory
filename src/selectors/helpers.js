import get from 'lodash/get'

function createPropGetter(property) {
  return (state, props) => get(props, property)
}

export { createPropGetter }
