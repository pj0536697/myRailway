import config from './config.json'

const baseUrl = config.baseUrl

export const login = body => callPost(baseUrl + '/login', body)
export const routes = () => callGet(baseUrl + '/railway/routes')
export const trains = () => callGet(baseUrl + '/railway/trains/')
export const classes = () => callGet(baseUrl + '/railway/classes/')
export const register = body => callPost(baseUrl + '/register', body)
export const schedules = () => callGet(baseUrl + '/railway/schedules/')
export const contact = body => callPost(baseUrl + '/railway/contact', body)
export const validateCard = body => callPost(baseUrl + '/payment/card', body)
export const route = station => callGet(baseUrl + '/railway/route/' + station)
export const validatePhone = body => callPost(baseUrl + '/payment/phone', body)
export const updateAccount = (body, id) => callPut(baseUrl + '/users/' + id, body)
export const trainsByRoute = route => callGet(baseUrl + '/railway/trains/' + route)
export const getReservation = rid => callGet(baseUrl + '/railway/reservations/' + rid)
export const makeReservation = body => callPost(baseUrl + '/railway/reservations', body)
export const deleteReservation = id => callDelete(baseUrl + '/railway/reservations/' + id)
export const getReservations = user => callGet(baseUrl + '/railway/users/' + user + '/reservations/')
export const getBookedSeatsCount = (train, trainClass, date, time) => {
    return callGet(baseUrl + "/railway/reservations/trains/" + train + "/class/" + trainClass + "/date/" + date + "/time/" + time)
}

const callGet = async (url) => {
    const res = await fetch(url)
    return handleres(res)
}

const callPost = async (url, body) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
    return handleres(res)
}

const callPut = async (url, body) => {
    const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
    return handleres(res)
}

const callDelete = async (url) => {
    const res = await fetch(url, {
        method: 'DELETE'
    })
    return handleres(res)
}

const handleres = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        if (res.status === 404) {
            return Promise.reject()
        } else {
            throw res.json()
        }
    }
}