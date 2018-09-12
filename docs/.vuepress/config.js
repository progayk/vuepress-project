module.exports = {
    title: 'My Documentations',
    description: 'A library with project documents',
    serviceWorker: true,
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'All Docs',
                items: [
                    { text: 'Guides', link: '/guides/' },
                    { text: 'SEMSIS', link: '/semsis/' },
                    { text: 'Typography', link: '/typography/' },
                    { text: 'Chain Projects', link: '/chain-project/' },
                    { text: 'Express', link: '/express-framework/' },
                    { text: 'Firebase Docs', link: '/firebase-docs/' },         
                    { text: 'Flask Mega Tutorial', link: '/flask-mega-tutorial/' },         
                    { text: 'Kotlin', link: '/kotlin-course/' },
                    { text: 'VueJS 2 Course', link: '/vuejs2_course/' },
                    { text: 'NuxtJS', link: '/nuxtjs-course/' },
                    { text: 'API', link: '/API/' },
                    { text: 'Yelp Camp', link: '/yelp-camp-project/' },
                ]   
            }
        ],
        sidebar: {
            '/guides/': [
                '',
                'vuepress-docs',
                'git-docs',
                'firebase-docs',
                'firebase-friendlyeats-web',
                'firebase-vue-authentication',
                'spanish-app',
                'nodejs-docs',
                'bakermill-menu',
                'vue-flask-quiz',
                'vuefire-vue-firebase-crud'
            ],
            '/semsis/': [
                '',
                'hanging-around'
            ],
            '/vuejs2_course/': [
                '',
                'getting-started',
                'vuejs-interaction-with-DOM',
                'conditionals-and-lists',
                'project-monster-slayer',
                'vue-instance',
                'dev-workflow-vuecli-webpack',
                'vue-components',
                'vue-class-component',
                'communicating-between-components',
                'advanced-component-usage',
                'handling-user-input-with-forms',
                'understanding-direvtives',
                'vuejs-animations-and-transitions',
                'vue-router',
                'state-management-with-vuex'
            ],
            '/info/': [
                ''
            ],
            '/typography/': [
                '',
                'typographic-design',
                'fonts',
                'web-style-guide'
            ],
            '/yelp-camp-project/': [
                '',
                'yelp-camp-basics'
            ],
            '/nuxtjs-course/': [
                '',
                'nuxtjs-getting-started',
                'pages-routes-views',
                'project-1-pages-routes-views'
            ],
            '/chain-project/': [
                '',
                'day-1',
                'day-2',
                'kapellum',
                'list-companies-firebase-vue'
            ],
            '/express-framework/': [
                '',
                'intro-to-express',
                'intermediate-express'
            ],
            '/flask-mega-tutorial/': [
                '',
                'part-1-hello-world',
                'chapter-2-templates',
                'chapter-3-web-forms'
            ],
            '/kotlin-course/': [
                '',
                'getting-started'
            ],
            '/firebase-docs/': [
                '',
                'cloud-firestore',
                'ssr-vue-apps-with-nuxtjs',
                'firestore-project'
            ],
            '/API/': [
                '',
                'intro-to-apis'
            ],
            '/': [
                ''
            ],

        }
    }
}