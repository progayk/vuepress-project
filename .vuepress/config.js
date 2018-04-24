module.exports = {
    title: 'My Documentations',
    description: 'Document information for site',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guides/' },
            // { text: 'Git Docs', link: '/guides/git/' },
            { text: 'Info', link: '/info/' }
        ],
        sidebar: [
            '/',
            '/guides/',
            '/guides/git/',
            '/info/'
        ]
    }
}