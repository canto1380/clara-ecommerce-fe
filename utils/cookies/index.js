import serverCookies from 'cookies'
import Cookies from 'js-cookie'
import clientCookies from 'js-cookie'

export const getToken = (ctx) => {
  let token
  if(ctx) {
    const { req, res } = ctx

    const cookies = new serverCookies(req, res)
    token = cookies.get('token')
  } else {
    token = clientCookies.get('token')
  }

  return token || null
}

export const getIdUser = (ctx) => {
  let idUser
  if(ctx) {
    const {req, res} = ctx
    const cookies = new serverCookies(req, res)
    idUser = cookies.get('idUser')
  } else {
    idUser = clientCookies.get('idUser')
  }

  return idUser || null
}
export const getCartItem = (ctx) => {
  let cartItems
  if(ctx) {
    const {req, res} = ctx
    const cookies = new serverCookies(req, res)
    cartItems = cookies.get('cart-clara')
  } else {
    cartItems = clientCookies.get('cart-clara')
  }
  return cartItems || null
}
// export const getCurrency = () => {
//   const currenciesCookies = clientCookies.get('currencies')
//   const currencyCookies = clientCookies.get('currency')

//   if(currenciesCookies && currencyCookies) {
//     const currencies = JSON.parse(decodeURI(currenciesCookies)).split('|').map((currency) => JSON.parse(currency))

//     return currencies.find(({ code }) => code === currencyCookies)
//   }

//   const code = 'EUR'

//   clientCookies.set('currency', code)

//   return { code, symbol: '€' }
// }

// export const getCurrencies = () => {
//   const currenciesCookies = clientCookies.get('currencies')

//   if(currenciesCookies)
//     return JSON.parse(decodeURI(currenciesCookies)).split('|').map((currency) => JSON.parse(currency))

//   return []
// }
