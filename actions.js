export function patch(path, value) {
  return {
    type: 'PATCH', value, path
  }
}

export function init(data) {
  return {
    type: 'INIT', data
  }
}

