---
title: My Dotfiles
pubDate: "2025-10-17"
description: "A short post about my configs"
heroImage: "./assets/dotfiles.png"
---

I have two main repos when it comes to configs for my terminal and CLI tools.
The first one, my main [dotfiles](https://github.com/Dekoder-py/dotfiles) repo, contains configs for my terminal of choice (ghostty), tmux, and my old kitty terminal config.
The other repo, [nvim-config](https://github.com/Dekoder-py/nvim-config), holds my Neovim config, written from scratch for the lazy.nvim plugin manager.

The dotfiles repo can be installed by cloning it and using `stow .` to symlink all my config files to the correct locations.
The nvim config can be installed by cloning the repo into `~/.config/nvim`:

```bash
git clone https://github.com/Dekoder-py/nvim-config ~/.config/nvim
```
