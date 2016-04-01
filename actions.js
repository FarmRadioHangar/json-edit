export function patch(path, value, dataType) {
  return {
    type: 'PATCH', value, path, dataType
  }
}

export function init(data) {
  return {
    type: 'INIT', data
  }
}

