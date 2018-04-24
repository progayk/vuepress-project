module.exports = {
    title: 'My Documentation',
    description: 'Document information for site',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guides/' },
            { text: 'Info', link: '/info/' }
        ],
        sidebar: [
            '/',
            '/guides/',
            '/info/'
        ]
    }
}