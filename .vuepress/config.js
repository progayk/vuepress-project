module.exports = {
    title: 'My Documentations',
    description: 'Document information for site',
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
            '/info/': [
                ''
            ],
            '/': [
                ''
            ]
        }
    }
}