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
                    },
                    {
                        text: 'VueFire: Vuejs + Firebase',
                        link: '/guides/vuefire-vue-firebase-crud'
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
                        text: 'Interaction with DOM',
                        link: '/vuejs2_course/vuejs-interaction-with-DOM',
                    },
                    {
                        text: 'Conditionals and Lists',
                        link: '/vuejs2_course/conditionals-and-lists',
                    },
                    {
                        text: 'Project: The Monster Slayer',
                        link: '/vuejs2_course/project-monster-slayer'
                    },
                    {
                        text: 'Vue Instance',
                        link: '/vuejs2_course/vue-instance'
                    },
                    {
                        text: 'DevWorkflow vue-cli,webpack',
                        link: '/vuejs2_course/dev-workflow-vuecli-webpack'
                    },
                    {
                        text: 'Vue Components',
                        link: '/vuejs2_course/vue-components'
                    },
                    {
                        text: 'Component Communication',
                        link: '/vuejs2_course/communicating-between-components'
                    },
                    {
                        text: "Advanced component usage",
                        link: '/vuejs2_course/advanced-component-usage'
                    },
                    {
                        text: "User Input with Forms",
                        link: '/vuejs2_course/handling-user-input-with-forms'
                    },
                    {
                        text: "state management - vuex",
                        link: '/vuejs2_course/state-management-with-vuex'
                    }
                ]
            },
            {
                text: 'Chain Project',
                items: [
                    {
                        text: "Day 1",
                        link: '/chain-project/day-1'
                    },
                    {
                        text: 'Day 2',
                        link: '/chain-project/day-2'
                    },
                    {
                        text: "List Clinics",
                        link: '/chain-project/list-companies-firebase-vue'
                    },
                    {
                        text: "Vue Storyblok",
                        link: '/chain-project/storyblok-blog'
                    },
                    {
                        text: "Kapellum Project",
                        link: '/chain-project/kapellum'
                    }
                ]
            },
            {
                text: 'Express',
                items: [
                    {
                        text: 'Into to Express',
                        link: '/express-framework/intro-to-express'
                    },
                    {
                        text: 'Intermediate Express',
                        link: '/express-framework/intermediate-express'
                    }
                ]
            },
            {
                text: 'flask',
                items: [
                    {
                        text: 'Chapter 1: Hello World',
                        link: '/flask-mega-tutorial/part-1-hello-world'
                    },
                    {
                        text: 'Chapter 2: Templates',
                        link: '/flask-mega-tutorial/chapter-2-templates'
                    },
                    {
                        text: 'Chapter 3: Web Forms',
                        link: '/flask-mega-tutorial/chapter-3-web-forms'
                    }
                ]
            },
            {
                text: 'kotlin',
                items: [
                    {
                        text: 'Chapter 1: Getting Started',
                        link: '/kotlin-course/getting-started'
                    }
                ]
            },
            {
                text: 'Firebase Docs',
                items: [
                    {
                        text: 'Cloud Firestore',
                        link: '/firebase-docs/cloud-firestore'
                    },
                    {
                        text: 'SSR Vue Apps with Nuxt.js',
                        link: '/firebase-docs/ssr-vue-apps-with-nuxtjs'
                    }
                ]
            },
            {
                text: 'NuxtJS',
                items: [
                    {
                        text: 'Getting Started',
                        link: '/nuxtjs-course/nuxtjs-getting-started'
                    },
                    {
                        text: 'Pages, Routes, Views',
                        link: '/nuxtjs-course/pages-routes-views'
                    },
                    {
                        text: 'Project 1: simple blog',
                        link: '/nuxtjs-course/project-1-pages-routes-views'
                    }
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
            '/vuejs2_course/': [
                '',
                'getting-started',
                'vuejs-interaction-with-DOM',
                'conditionals-and-lists',
                'project-monster-slayer',
                'vue-instance',
                'dev-workflow-vuecli-webpack',
                'vue-components',
                'communicating-between-components',
                'advanced-component-usage',
                'handling-user-input-with-forms',
                'state-management-with-vuex'
            ],
            '/info/': [
                ''
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
                'ssr-vue-apps-with-nuxtjs'
            ],
            '/': [
                ''
            ],

        }
    }
}