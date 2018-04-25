module.exports = {
    title: 'My Documentations',
    description: 'Document information for site',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guides', link: '/guides/' },
            // { text: 'Git Docs', link: '/guides/git/' },
            { text: 'Info', link: '/info/' }
        ],
        // sidebar: [
        //     '/',
        //     '/guides/',
        //     '/guides/git/',
        //     '/guides/firebase/',
        //     '/guides/firebase/friendlyeats-project/',
        //     '/info/'
        // ],
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
        // sidebar: [
        //     {
        //         title: 'Home',
        //         children: [
        //             '/'
        //         ]
        //     },
        //     {
        //         title: 'Guides',
        //         collapsable: false,
        //         children: [
        //             '/guides/'
        //         ]
        //     },
        //     {
        //         title: 'Info',
        //         children: [
        //             '/info/'
        //         ]
        //     }
        // ]

    }
}