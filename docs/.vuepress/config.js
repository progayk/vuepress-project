module.exports = {
    title: 'My Documentations',
    description: 'A library with project documents',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guides',
                items: [
                    {
                        text: 'Vuepress Docs',
                        link: '/guides/vuepress-docs',
                    },
                    {
                        text: 'Git Docs',
                        link: '/guides/git-docs'
                    },
                    {
                        text: 'Firebase Docs',
                        link: '/guides/firebase-docs'
                    },
                    {
                        text: 'Firebase Vue Auth',
                        link: '/guides/firebase-vue-authentication'
                    },
                    {
                        text: 'Firebase Rest. App',
                        link: '/guides/firebase-friendlyeats-web'
                    },
                    {
                        text: 'Spanish Web App',
                        link: '/guides/spanish-app'
                    },
                    {
                        text: 'Node.js Docs',
                        link: '/guides/nodejs-docs'
                    },
                    {
                        text: 'BakerMill Menu',
                        link: '/guides/bakermill-menu'
                    },
                    {
                        text: 'Vue2+Flask SPA Survey App',
                        link: '/guides/vue-flask-quiz'
                    }
                ],
            },
            {
                text: 'Vue Course',
                items: [
                    {
                        text: 'Getting Started',
                        link: '/vuejs2_course/getting-started',
                    },
                    {
                        text: 'VueJs Interaction with DOM',
                        link: '/vuejs2_course/vuejs-interaction-with-DOM',
                    },
                ]
            },
            {
                text: 'Info',
                link: '/info/'
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
                'vue-flask-quiz'
            ],
            '/vuejs2_course/': [
                '',
                'getting-started',
                'vuejs-interaction-with-DOM'
            ],
            '/info/': [
                ''
            ],
            '/': [
                ''
            ]
        }
    }
}