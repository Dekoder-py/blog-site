---
title: Nix
pubDate: "2025-11-28 07:34"
description: "Nix and nix-darwin!"
heroImage: "../../assets/nix.png"
---

### Nix Darwin

I use Nix and nix-darwin on my MacBook Pro.
Nix is a package manager, language, and a great way to declaratively configure your system and packages.
nix-darwin brings Mac specific configuration to Nix.

#### Declarative?

Declarative package management and configuration basically means explicitly stating every option and package that you want on your system.
In contrast, imperative systems, such as Homebrew, pacman, and apt, have you run an install command whenever you want, which leaves you with packages you forgot you installed and no longer need, many different places to change settings, and an overall more time consuming experience.
With Nix, I have a single config file, `flake.nix`, that contains all the settings, apps, CLI tools, and other options I want. This file could be copied to any other Mac and applied seamlessly.

#### Flake.nix
A great example of why it's nice to have one file for everything, with simple, easy to find options, is enabling Touch ID to approve sudo commands.
Normally, you'd have to edit `/etc/pam.d/sudo_local` and figure out the correct names and options to enable this.
With Nix and nix-darwin, you can simply put `security.pam.services.sudo_local.touchIdAuth = true;` into `flake.nix` and run `sudo darwin-rebuild switch` to apply the changes.
