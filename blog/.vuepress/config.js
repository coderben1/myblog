module.exports = {
    title: 'bensite',
    description: '个人博客',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    // base: '/myblog/',
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
          platform: 'github',
          locale: 'zh', // 语言设置
    
          // 其他的 Vssue 配置
          owner: 'coderben1',
          repo: 'myblog',
          clientId: 'ec9416693f5869f7e2ed',
          clientSecret: '5cb96e8d2277a46cc8ed82e27ac1d9fe4549ada0',
        },
    },
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: 'Shares', link: '/shares/ios设备模拟器'},
            { text: '关于', link: '/about' },
            // {
            //     text: 'Languages',
            //     items: [
            //         { text: 'Chinese', link: '/language/chinese' },
            //         { text: 'Japanese', link: '/language/japanese' }
            //     ]
            // }
        ],
        sidebar: {
            '/shares': [
                {
                    title: 'Shares',
                    children: [
                        ['/shares/ios设备模拟器', '▲ios设备模拟器'],
                        ['/shares/localstorage', '▲localStorage（隐私模式-坑）'],
                        ['/shares/element-table', '▲element-table（Excel导出）'],
                    ]
                }
            ],
        },
    }
}