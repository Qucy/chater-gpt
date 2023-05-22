import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome.vue'

import TLDRSummarization from '../components/generation/TLDRSummarization.vue'
import FriendChat from '../components/generation/FriendChat.vue'
import GrammarCorrection from '../components/generation/GrammarCorrection.vue'
import ResReviewCreator from '../components/generation/ResReviewCreator.vue'
import Translation from '../components/generation/Translation.vue'

import DatabaseAgent from '../components/agents/DatabaseAgent.vue'
import FinDataAgent from '../components/agents/FinDataAgent.vue'
import SearchAgent from '../components/agents/SearchAgent.vue'

import PromptTemplate from '../components/prompt/PromptTemplate.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome
        },

        // routers for generation tasks
        {
          path: '/generation-tldr',
          name: 'tldr',
          component: TLDRSummarization
        },
        {
          path: '/generation-friendchat',
          name: 'friendchat',
          component: FriendChat
        },
        {
          path: '/generation-grammercorr',
          name: 'grammar',
          component: GrammarCorrection
        },
        {
          path: '/generation-restreview',
          name: 'review',
          component: ResReviewCreator
        },
        {
          path: '/generation-translation',
          name: 'translation',
          component: Translation
        },

        // routers for agent
        {
          path: '/database-agent',
          name: 'databaseagent',
          component: DatabaseAgent
        },
        {
          path: '/fin-data-agent',
          name: 'findataagent',
          component: FinDataAgent
        },
        {
          path: '/search-agent',
          name: 'searchagent',
          component: SearchAgent
        },

        // routers for prompt template
        {
          path: '/prompt-templates',
          name: 'prompttemplate',
          component: PromptTemplate
        },
      ]
    }
  ]
})

// add router guard
router.beforeEach((to, from, next) => {

  if (to.name === 'login') return next()
  // get token from session storage
  const token = sessionStorage.getItem('token')
  if (!token) return next({ name: 'login' })
  // if token exists, continue to the route
  next()
 
})


export default router
