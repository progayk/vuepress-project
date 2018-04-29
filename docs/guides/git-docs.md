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