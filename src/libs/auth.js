import router from '@/config/router'
import store from '@/store'

export default {
   beforeRouteEnter (to, from, next) {
       if (to.meta.auth.indexOf('*') != -1) {
         document.title = to.meta.title
         next()
       } else if (to.name != 'login' && to.meta.auth.indexOf(parseInt(store.getters['auth/role'])) == -1) {
         router.push({name: 'login'})
         next(false)
       } else {
         document.title = to.meta.title
         next()
       }
   }
}
