module.exports = data => {
  const list = data.toString().split('.')
  return `${list[0]}.${list[1].substr(0, 3)}`
}
