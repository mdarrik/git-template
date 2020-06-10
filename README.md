# git-template

Forked from [git-the-latest](https://github.com/chrisdickinson/git-the-latest)

Sets up my personal git template preferences. Currently that's just setting the default primary branch to `main` instead of `master` due to the problematic history of the term "master" and it's association with slavery and anti-blackness.

This configures `git init` to default the primary branch to `main` instead of
`master` by creating a git template directory at `~/.git-template` and running
`git config --global` to set that directory as the default for creating new
repos.

# License

MIT
