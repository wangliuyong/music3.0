import OriginJsonp from 'jsonp'

export default function jsonp (url, data, option) {

  url += (url.indexOf('?') < 0 ? '?' : '&')+query(data)

  return new Promise((resolve, reject) => {
    OriginJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function query (data) {
  let query = ''
  for (let key in data) {
    let value = data[key] ? data[key] : ''
    query += `&${key}=${encodeURIComponent(value)}`
  }

  return query ? query.substring(1):''
}
