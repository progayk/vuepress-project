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
                'firebase-friendlyeats-web'
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