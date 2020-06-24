import Vue from 'vue'
import VueRouter from 'vue-router'
import DiplomaUpload from '@/components/DiplomaUpload'
import DiplomaView from '@/components/DiplomaView'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/upload',
    name: 'Upload',
    component: DiplomaUpload
  },
  {
    path: '/view',
    name: 'View',
    component: DiplomaView
  }
]

const router = new VueRouter({
  routes
})

export default router
