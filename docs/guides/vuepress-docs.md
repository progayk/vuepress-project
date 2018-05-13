---
title: Vuepress Docs
---

# Vuepress Docs

Some of the content in this site is directly copied from [vuepress.vuejs.org](https://vuepress.vuejs.org/).

## First things first

Create a `.vuepress` folder and a `README.md` file in the project directory. The `README.md` file will be your home file. You can use all the features of **Markdown Language**, and also some additional features that **Vuepress** supplies.
Next, inside `.vuepress/config.js` file insert the code below. This will create a navbar with search box in it.
```js
module.exports = {
    title: 'My Documentation',
    description: 'Document information for site'
}
```
## Navbar

### Navbar Links 

Here we are going to add `nav` function to navbar. You can name the link `items` as you wish and they will appear on the
top right corner.

``` js{4,5,6,7,8,9,10}
module.exports = {
    title: 'My Documentation',
    description: 'Document information for site',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guides/' },
            { text: 'Info', link: '/info/' }
        ]
    }
}
```

These links can also be dropdown menus if you provide an array of `items` instead of a `link`:

```javascript{3,4,5,6,7,8,9,10,11}
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ]
  }
}
```
::: tip FACT
In this site above option is used.
:::

In addition, you can have sub groups inside a dropdown by having nested items:

```javascript{3,4,5,6,7,8,9,10,11}
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```


## Sidebar
This will automatically add a sidebar with specified routes and with their sub H1 tags.

```js
module.exports = {
    themeConfig: {
        sidebar: [
            '/',
            '/guides/',
            '/info/'
        ]
    }
}
```

### Sidebar Groups

You can divide sidebar links into multiple groups by using objects:

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```

### Multiple Sidebars

Display different sidebars for different sections of content:

```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
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
```
::: warning
Make sure to define the fallback configuration last.

VuePress checks each sidebar config from top to bottom. If the fallback configuration was first, 
VuePress would incorrectly match `/foo/` or `/bar/four.html` because they both start with `/`.
:::

::: tip FACT
In this site you're displaying **multiple sidebars** is used.
:::

## Search Box

### Built-in Search

You can costumize the search bar by defining how many suggestions to be shown with `themeConfig.searchMaxSuggestions`,
and also disable the search, which is not necessary:

```javascript
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

### Algolia Search

The `themeConfig.algolia` option allows you to use [Algolia DocSearch](https://community.algolia.com/docsearch/) to replace the simple built-in search. 
To enable it, you need to provide at least `apiKey` and `indexName`:

```javascript
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
```

## Add Vue components

Since this is a vue powered kind a documentation framework we can use Vue components inside it. 
Add a components directory into `.vuepress`. Create a new `.vue` file inside of the ./components dir.
Then add your vue component into `guides/README.md` file like so:

```html
<my-comp></my-comp>
```

::: warning
When you add a new component you have to stop and rerun the dev 
:::

The following actually comes from a vue component. Isn't it awesome!

<my-comp></my-comp>

### Vue directives inside .md file

You can also use vue directives right inside and `.md` file. Another cool feature.

```html
<ul>
    <li v-for="n in 5">
        {{ n }}
    </li>
</ul>
```

**The result will be:**

<ul>
    <li v-for="n in 5">
        {{ n }}
    </li>
</ul>


## Asset Handling

### Relative URLs

All markdown files are compiled into Vue components and processed by webpack, therefore you can and should prefer referencing any asset using relative URLs:

```markdown
![An image](./image.png)
```

This would work the same way as in `*.vue` file templates. The image will be processed with `url-loader` and `file-loader`, and copied to appropriate locations in the generated static build.

In addition, you can use the `~` prefix to explicitly indicate this is a webpack module request, allowing you to reference files with webpack aliases or from npm dependencies:

```markdown
![Image from alias](~@alias/image.png)
![Image from dependency](~some-dependency/image.png)
```

webpack aliases can be configured via [configureWebpack](https://vuepress.vuejs.org/config/#configurewebpack) in `.vuepress/config.js.` Example:

```javascript
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
```

::: danger ACI GERCEK
I couldn't add `webpackConfigure` to `config.js` file. :'(
:::

### Simple CSS Override

If you wish to apply simple overrides to the styling of the default theme, you can create an `.vuepress/override.styl` file. This is a [Stylus](http://stylus-lang.com/) file but you can use normal CSS syntax as well.

There are a few color variables you can tweak:

```styl
// showing default values
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```

## The Vue Instance

### Lifecycle Diagram 

![lifecycle diagram](https://vuejs.org/images/lifecycle.png?_sw-precache=6f2c97f045ba988851b02056c01c8d62)

## Vue Router

[Scooby Shaggy Stand Alone vue-router example](../extras/scooby-shaggy.html)

### Programatic Routing

Similar to before I want to demonstrate a few things just discussed with a variation of one of the previous toy examples. Below I have altered the navigation example that displays either Scooby or Shaggy to no longer use the `<router-link>` component.

```html
<!-- index.html -->  
<script src="https://unpkg.com/vue/dist/vue.js"></script>  
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">  
  <p>
    <a @click="toScooby">Scooby</a>
    <a @click="toShaggy">Shaggy</a>
  </p>
  <router-view></router-view>
</div>

<script>  
const Scooby = {  
    template: `
    <div>
      <h4>Scooby</h4>
      <p>
        <img src="https://www.wbkidsgo.com/Portals/4/Images/Content/Characters/Scooby/characterArt-scooby-SD.png" alt="scooby"/>
      </p>
    </div>`
}

const Shaggy = {  
    template: `
    <div class="character">
      <h4>Shaggy</h4>
      <p>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/ShaggyRogers.png/150px-ShaggyRogers.png" alt="shaggy"/>
      </p>
    </div>`
}

const router = new vue-router({  
  routes: [
    { path: '/characters/scooby', component: Scooby },
    { path: '/characters/shaggy', component: Shaggy }
  ]
})

const app = new Vue({  
  router: router,
  methods: {
    toScooby() { this.$router.push('/characters/scooby') },
    toShaggy() { this.$router.push('/characters/shaggy') }
  }
}).$mount('#app')

</script>  
```

The example behaves in the exact same way as before, but now the routing is done via a combinations of click event listeners, Vue methods, and manually calling `this.$router.push('/path')`. This is actually what `<router-link>` does behind the scenes using the `to="/path"` value. I encourage you to play with this live example [here](https://jsfiddle.net/maykjony/r5m4850c/).   

## v-model directive

Consider the trivial example below. Again, you can see a working example of this code [here](https://jsfiddle.net/amcquistan/grq3qj36/).

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>

<div id="app">  
  <div>
    <label for="name">What is your name</label>
    <input id="name" type="text" v-model="textInput" />
    <span>Hello {{ textInput }}</span>
  </div>

  <h4>Which do you like better?</h4>
  <div v-for="choice in radioChoices" :key="choice">
    <label>{{ choice }}</label>
    <input name="fruit" type="radio" v-model="favoriteFruit" :value="choice"/>
  </div>
  <h4>So you like {{ favoriteFruit }}</h4>
</div>

<script>  
new Vue({  
  el: '#app',
  data: {
    textInput: '',
    radioChoices: ['apples', 'oranges'],
    favoriteFruit: ''
  }
})
</script> 
```

The first input is a text input asking for the user's name. This text input has a `v-model` registered to it with the data property `textInput` attached to it, which keeps the text input in sync with the `textInput` data property of the Vue instance. Take a second to type your name into the text input and watch it update in the `<span>Hello {{ textInput }.}</span>` HTML's output.

The second input is a radio input named "fruit" that displays the fruits "apples" and "oranges" and asks the user to select their favorite. The radio input is registered to the `favoriteFruit` data property of the Vue instance via the `v-model`, which associates the value associated with each radio input via the `:value="choice"` attribute binding syntax to keep favoriteFruit in sync with the selected radio input. Again, you can watch the value of `favoriteFruit` update in the 
::: v-pre 
`<h4>So you like {{ favoriteFruit }}</h4>` 
::: 
element's output. 

## Deploy to Netlify

Place all your file under **docs/** directory and create a file on your root dir called `package.json`. And fill it with below code:

```json
{
    "name": "vuepress-docs",
    "version": "1.0.0",
    "description": "My documents for web developing",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs"
    },
    "keywords": [],
    "author": "mayk jony",
    "license": "MIT",
    "devDependencies": {
    "vuepress": "^0.5.0"
    }
}
```

Then run the build command:

```bash
npm run docs:build
```

This may take a while to build after which the static files built can be found in `docs/.vuepress/dist`

We shall proceed to deploy our static site using Netlify. Netlify provides an awesome continuous integration option by deploying from Github or any other supported hosted version control provider. Follow these steps to deploy your site to Netlify:

**Step 1** Create an account on Github and Netlify. Push your code using Git to Github.

**Step 2** Log in your Netlify account and select the `New site from Git` option. Choose Github as the continuous development provider and select the repository containing the documentation.

**Step 3** Specify the **branch** to deploy as `master` or choose whichever branch you would like to deploy. Set the **build command** to ` run docs:build` and the **publish directory** to `docs/.vuepress/dist`. Click ‘Deploy Site’. Your website should be deployed in little time and a public URL is provided to access it.

Here is the [deployed version](https://lucid-swanson-c5426e.netlify.com/) of this tutorial on Netlify.

## Animate on Scrool package

Here is the [github repo](https://github.com/michalsnik/aos) for the AOS package.
And [demo page](http://michalsnik.github.io/aos/).

Install AOS package with npm

```bash
npm install --save AOS
```

Inside `main.js` file import AOS

```javascript
import AOS from 'aos'
import 'aos/dist/aos.css'
```

Add AOS component into any `.vue` file like so:

```html
<div class="column">
  <figure class="image is-square">
    <img data-aos="fade-zoom-in"
         data-aos-offset="200"
         data-aos-easing="ease-in-sine"
         data-aos-duration="600" src="../assets/yirmiuc-nisan-cocuklar.jpg">
  </figure>
</div>
```

## vue-parallaxy package

Here is the [github repo](https://github.com/apertureless/vue-parallax) for this package.

And here is the [demo page](https://apertureless.github.io/vue-parallax/).

install with npm:

```bash
npm install --save vue-parallaxy
```

### Usage

Inside any `.vue` file import the package

```html
<script>
import Parallax from 'vue-parallaxy'
export default {
  name: 'AppHeaderMain',
  components: {
    Parallax
  }
}
</script>
```

Add parallax template:

```html
<parallax :fixed="true">
  <section class="hero is-fullheight has-bg-img">
      <div class="hero-body">
        <div class="container has-text-centered" v-parallax="-0.5">
          <h1 class="title">
            Birlikte Güzel
          </h1>
          <h2 class="subtitle">
            Gelin Güzelleşelim
          </h2>
        </div>
      </div>
  </section>
</parallax>
```

### Props


| Prop   |      Type      |  Default Value | Description
|----------|:-------------:|------|------|
| parallax |  Boolean | true | Activates parallax effect |
| speedFactor |  Number   | 0.15 | factor on how strong the effect is|
| direction |  String   | 'up' | Either 'up' or 'down', determines scroll direction of image |
| fixed | Boolean | false | Other parallax effect. Image is fixed in position |
| sectionHeight | Number | 70 | section height for mobile |
| breakpoint | String | '(min-width: 968px)' | Media query for mobile deactivation |
| sectionClass | String | 'Masthead' | CSS class of the outer section tag |
| containerClass | String | 'Masthead__image' | CSS class of the container holding the  image |
| parallaxClass | String | 'is-parallax' | Modifier class for the parallax effect |
| fixedClass | String | 'is-fixed' | Modifier class for the fixed parallax effect |

## vue-scrollto package

Install [vue-scrollto](https://www.npmjs.com/package/vue-scrollto).

```bash
npm install --save vue-scrollto
```

### Usage

Import the library into `main.js` file:

```javascript
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo, {
  container: "body",
  duration: 1000,
  easing: "ease-in-out",
  offset: 0,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
```

## Deploy a VueJS App with DigitalOcean

### Credits

Thank you [Bailey Charlton](https://medium.com/@Web_Bailey?source=post_header_lockup) for [this great tutorial](https://medium.com/@Web_Bailey/deploy-a-vuejs-app-with-digitalocean-fd6e7af07e40).



So let’s get started by setting up our Digital Ocean server. For this tutorial, we’ll use the **NodeJS 6.11.2** on **16.04** One-click app.

### Create Droplet on DigitalOcean

Depending on how big your VueJS application is, it is recommended that you use the $10/mo droplet plan. If you want to add SSH keys to your server, check out this article, but for now, we’ll skip this step. Name your droplet whatever you want and click create.

Your droplet will be created and an email containing the password will be sent to you. Now let’s enter into our droplet.

::: tip
We’ll be using the default root user for this tutorial. If you want to change users, check out [this article](https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart).
:::

### SSH Into Droplet

You’ll be prompted about the authenticity of the host. Simply type yes and hit enter. Then enter in your password if you’re not using SHH keys. Continue following through the password prompts until you’ve set a new password.

```bash
ssh root@YOUR_DROPLET_IP
```

You’ll be prompted about the authenticity of the host. Simply type yes and hit enter. Then enter in your password if you’re not using SHH keys. Continue following through the password prompts until you’ve set a new password.

### Install Nginx

We now need to add Nginx to our droplet to serve our application. For a more in-depth guide on installing Nginx, check out [this article](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04). For now, I’ll cut to the chase for what we need to do to accomplish our app deployment.

```bash
sudo apt-get update
sudo apt-get install nginx -y
```

The updates and installation may take a few moments. We now need to allow HTTP traffic through our firewall.

```bash
sudo ufw enable
sudo ufw allow 'Nginx HTTP'
```

To be able to make an SSH connection to server we need to allow OpenSSH

```bash
sudo ufw allow OpenSSH
```

### Nginx Configuration

We’re going to jump into the Nginx configuration to point where our application files will be server from.

```bash
sudo vi /etc/nginx/sites-available/default
```

Now let’s make some minor edits and be done with the configuration. We’re going to change the root path to `/var/www/html/Vue/dist`. Next we’ll remove the `try_files $uri $uri/ =404;` line. Lastly, you’ll add the following `404 redirect` below the `server_name`:

```
error_page 404 /index.html;
```

We set the 404 redirect to our *index.html* file because that is the entry point for our VueJS application if you use Vue-Router. Our configuration should now look like the following:

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html/Vue/dist;

        index index.html index.htm index.nginx-debian.html;

        server_name _;

        error_page 404 /index.html;

        location / {
        }
}
```

Save the file and exit.

### Test and Reload Nginx

We’ll now test to see that our Nginx configuration is valid.

```bash
sudo nginx -t
```
You should get a confirmation.

Now let’s reload Nginx with the command:

```bash
sudo systemctl restart nginx
```

Now we are completely done working with Nginx.

### Git Repo Setup

* Create app repo
* Create bare repo
* Create githook to receive our commits and direct them to app repo



Go to [this link](./git-docs.md#transfer-files-to-repo-on-server) to setup git repo.

### Deploy VueJS Application

We need to initialize the local Vue app folder as a Git repo and set it up.

```bash
git init
git remote add origin root@YOUR_DROPLET_IP:/var/www/html/repo
git add .
git commit -m "Initial commit"
```

This will prepare all of our files to be deployed to our bare repo on our droplet. To deploy, simply push your commit.

```bash
git push origin master
```

If you’re not using SSH Keys, you’ll be prompted to enter your droplet’s password. Do so and then the commit will be pushed to the droplet.

Anytime you want to push new changes from your local Vue app to your droplet, you will need to `git add` and `git push` the commits as we did above. So that’s it! We’ve now deployed our VueJS application to our droplet. But there’s a few last steps to complete!

### Finalize Vue Application

Switch back over to your droplet console and navigate to your Vue folder.

```bash
cd /var/www/html/Vue
```

If you run the ls command, you should now see your application’s files all in the folder.

::: danger IMPORTANT
You have to change folder permissions before installing dependencies. To make this use the following commands:
```bash
sudo chown -R $USER:$USER /var/www/html
sudo chmod -R 775 /var/www/html
```
:::

We’ll now need to install the app’s dependencies.

```bash
npm install
```

Depending on how many dependencies your app requires, this may take a few moments. Once they’re installed, we’ll need to “bundle” our application. Since we’re using Webpack with our app, we have a built-in command to bundle our code for production. Let’s run it.

```bash
npm run build
```

This will create a `dist` folder containing all of our bundled code. Depending on how many modules you’ve added to your application, this process may take a few moments.

Once the bundling is done, your Vue application should now be available to view on the web! If you’ve setup a domain name to your droplet, head to the address, otherwise enter in the droplet IP in your browser. For my application, mine shows the default template for a Vue application.

::: tip
Anytime you push new changes to your droplet, you’ll have to run the npm run build command from your droplet console.
:::

## Escaping

By default, fenced code blocks are automatically wrapped with `v-pre`. If you want to display raw mustaches or Vue-specific syntax inside inline code snippets or plain text, you need to wrap a paragraph with the v-pre custom container:

**Input**

```
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

**Output**

::: v-pre
`{{ This will be displayed as-is }}`
:::

### vue-awesome-swiper library

You can see the demo page on [this link](https://surmon-china.github.io/vue-awesome-swiper/).