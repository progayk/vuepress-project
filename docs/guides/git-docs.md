# Git Docs

## Remove a file/folder cache from git 
For single file:
```bash
git rm --cached mylogfile.log
```
For single directory:
```bash
git rm --cached -r mydirectory
```

## Remove a single file from specific commit

In order to delete a specific file from any previuos commit you should follow these steps:

```bash
git checkout <commit_id>
git reset --soft HEAD^
git rm --cached <file-name>
git commit -m "<your_message>"
git checkout master
```

::: danger
This is only for local git repo, if you want to delete from remote repo also, you should
deal with conflictions. For now, I don't know how to do it.
:::

## Transfer files to repo on server

* Create app repo
* Create bare repo
* Create githook to receive our commits and direct them to app repo

### Setup git repo

Create and navigate to app repo

```bash
cd /var/www/html
sudo mkdir Vue
cd Vue
```

Initialize git repo inside app folder:

```bash
git init
```

Then go back and create a folde for repo:

```bash
cd ..
sudo mkdir repo
cd repo
```

On here, we nee d to initialize a bare repo with this git command:

```bash
git init --bare
```

We’re going to create a `post-receive` githook in our **hooks** folder. This will intercept our commits and push the files to the Vue folder.

```bash
sudo vi hooks/post-receive
```

Inside this file instert following code:
```
#!/bin/bash

git --work-tree=/var/www/html/Vue --git-dir=/var/www/html/repo checkout -f
```

Save file and exit.

### Deploy the app

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