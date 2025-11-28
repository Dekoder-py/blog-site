---
title: Nix
pubDate: "2025-11-28 07:34"
updatedDate: "2025-11-29 07:29"
description: "Nix and nix-darwin!"
heroImage: "../../assets/nix.png"
---

### Nix and nix-darwin

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

An example of a basic flake that sets up a mac with a few packages, configures finder, and sudo authentication is shown below.

```nix
{
  description = "Kyle's Macbook System Flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    nix-darwin.url = "github:nix-darwin/nix-darwin/master";
    nix-darwin.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs @ { self, nix-darwin, nixpkgs }: let configuration = {pkgs, ...}: {
      system.primaryUser = "kyle";

      # Install these packages from the nixpkgs unstable branch with nix
      environment.systemPackages = with pkgs; [
        python3
        neovim
        nodejs
      ];

      nixpkgs.config.allowUnfree = true; # allow packages marked as unfree (e.g. not FOSS)

      # enable Touch ID and Watch ID for sudo commands
      security.pam.services.sudo_local = {
        touchIdAuth = true;
        watchIdAuth = true;
        reattach = true;
      };

      # disable the macron menu on macOS in favor of repeat keystrokes
      system.defaults.NSGlobalDomain.ApplePressAndHoldEnabled = true;

      # Finder settings
      system.defaults.finder.ShowPathbar = true;
      system.defaults.finder.AppleShowAllExtensions = true;
      system.defaults.finder.FXPreferredViewStyle = "Nlsv"; # list view
      system.defaults.finder.ShowStatusBar = true;

      # Necessary for using flakes on this system.
      nix.settings.experimental-features = "nix-command flakes";

      # Set Git commit hash for darwin-version.
      system.configurationRevision = self.rev or self.dirtyRev or null;

      # Used for backwards compatibility, please read the changelog before changing.
      # $ darwin-rebuild changelog
      system.stateVersion = 6;

      # The platform the configuration will be used on.
      nixpkgs.hostPlatform = "aarch64-darwin";
    };
  in {
    # Build darwin flake using:
    # $ darwin-rebuild build --flake .#macbook
    darwinConfigurations."macbook" = nix-darwin.lib.darwinSystem {
      modules = [configuration];
    };
  };
}
```

You can also view my full flake [here](https://github.com/Dekoder-py/nix-darwin/blob/main/flake.nix).

If you'd like to install Nix and nix-darwin, you can find the instructions [here](https://github.com/nix-darwin/nix-darwin).
