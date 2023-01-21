module.exports = {
  title: 'Anderson Freitas',
  base: '/blog/',
  description: 'Simple blog to save my annotations :)',
  logo: './assets/img/logo.png',
  theme: require.resolve('../../'),
  themeConfig: {
  authors: [
      {
      name: 'Anderson Freitas',
      avatar: '/assets/img/sal.jpg',
      link: 'https://www.linkedin.com/in/afreitasdotdev/',
      linktext: 'Follow',
      },
    ],
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/afreitasdotdev',
        },
        {
          type: 'instagram',
          link: 'https://instagram.com/@ar.freitas',
        },
        {
          type: 'linkedin',
          link: 'https://www.linkedin.com/in/afreitasdotdev/',
        },
        {
          type: 'mail',
          link: 'contato@afreitas.dev',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/afreitasdotdev',
        },
        {
          type: 'web',
          link: 'afreitas.dev',
        }
      ],
      copyright: [
        // {
        //   text: 'Licensed MIT.',
        //   link: 'https://bootstrapstarter.com/license/',
        // },
        {
          text: 'Made with Mediumish',
          link: 'https://bootstrapstarter.com/bootstrap-templates/vuepress-theme-mediumish/',
        },
      ],
    },

    sitemap: {
      hostname: 'https://afreitas.dev'
    },
    comment: {
      service: 'disqus',
      shortname: 'demowebsite',
    },
    newsletter: {
      endpoint: 'https://wowthemes.us11.list-manage.com/subscribe/post?u=8aeb20a530e124561927d3bd8&id=8c3d2d214b'
    },
    feed: {
      canonical_base: 'https://github.com/wowthemesnet/vuepress-theme-mediumish/',
    },
    smoothScroll: true
  },
}
