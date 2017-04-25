import { app, router, store } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  const s = isDev && Date.now()

  if (context.cookies.token && context.cookies.token != '') {
    store.state.token = context.cookies.token
    store.state.isAuthenticated = true
  }

  return new Promise((resolve, reject) => {
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(component => {
        if (component.preFetch) {
          console.log('PREFTECH')
          return component.preFetch && component.preFetch(store)
        }
      })).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    })
  })
}
