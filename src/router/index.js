import Vue from 'vue'
import Router from 'vue-router'
import NewsFeed from '@/components/NewsFeed'
import CreateNews from '@/components/news/Createnews'
import NewsDashboard from '@/components/news/NewsDashboard'
import ViewNews from '@/components/news/ViewNews'
import EditNews from '@/components/news/EditNews'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase, { functions } from 'firebase'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'news-feed',
      component: NewsFeed,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/news',
      name: 'news-dashboard',
      component: NewsDashboard,
      meta: {
        requiresAuth: true

      }
    },
    {
      path: '/new-news',
      name: 'new-news',
      component: CreateNews,
      meta: {
        requiresAuth: true

      }
    },
    {
      path: '/news/:news_id',
      name: 'view-news',
      component: ViewNews,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/news/edit/:news_id',
      name: 'edit-news',
      component: EditNews,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true

      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/new',
    //   name: 'new-employee',
    //   component: NewEmployee,
    //   meta: {
    //     requiresAuth: true

    //   }
    // },
    // {
    //   path: '/edit/:employee_id',
    //   name: 'edit-employee',
    //   component: EditEmployee,
    //   meta: {
    //     requiresAuth: true

    //   }
    // },
    // {
    //   path: '/:employee_id',
    //   name: 'view-employee',
    //   component: ViewEmployee,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },

  ]
})

// NAV Guards
router.beforeEach((to, from, next) => {
    // Check for requiredAuth guard
    if(to.matched.some(record => record.meta.requiresAuth)) {
      // Check if NOT logged in
      if(!firebase.auth().currentUser){
        // Go to login
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        // Proceed to route
        next();
      }
    }else if(to.matched.some(record => record.meta.requiresGuest)){
      if(firebase.auth().currentUser){
        // Go to login
        next({
          path: '/dashboard',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        // Proceed to route
        next();
    }
   } else {
      // Proceed to route
      next();
    }
});

export default router;

// exports.uploaddFile = functions.https.onRequest((req, res) => {

//     res.status(200).json({
//       message: 'it worked!'
//     })

// })