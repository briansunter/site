---
title: Emacs Daemon Mode on macOS
date: 2019-06-25
featured_image: /images/blog/spacemacs/writeroom.png
image_caption: Photo by Dylan Gillis on Unsplash
excerpt: How to have emacs launch quickly and always be available on macos
tags:
    - blog
    - business
---
# Emacs Deamon Mode on macos
A common complaint about emacs is that it takes longer to launch than vim. I enjoy being able to quickly edit a file without leaving the terminal in vim and was curious if there was a way to make emacs load just as fast. I have a number of emacs plugins through Spacemacs and it does take around 10-20 seconds to launch in both terminal and GUI mode. With emacs client mode, it launches in less than a second.

## Emacs client and Server
Instead of launching a full emacs client every time you want to edit a file, it's better to launch emacs as a daemon in headless mode when your computer starts up. If you have an emacs process already running, you can connect to it using the `emacsclient` command.

## `emacsclient` and `emacsclient -c`

`emacsclient` launches a terminal client to a local emacs process and launches just as quickly as vim.

`emacsclient -c` opens a separate GUI instance

## `launchd` and macos [Launch Agents](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/Introduction.html#//apple_ref/doc/uid/10000172i-SW1-SW1 "Launch Agents")

If we frequently use emacs we can have the macos process manager start an emacs daemon on login and restart it if the deamon dies.

## LaunchAgent.plist
Create this file in

``` bash
~/Library/LaunchAgents/gnu.emacs.daemon.plist
```

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
    "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
 <plist version="1.0">
  <dict>
    <key>Label</key>
    <string>gnu.emacs.daemon</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/emacs</string>
      <string>--daemon</string>
    </array>
   <key>RunAtLoad</key>
   <true/>
   <key>ServiceDescription</key>
   <string>Gnu Emacs Daemon</string>
  </dict>
</plist>
```

## `launchctl` load on startup
This command will start the deamon and ensure it is started on every login.

``` bash
launchctl load -w ~/Library/LaunchAgents/gnu.emacs.daemon.plist
```

You can also use `unload` to stop the daemon and prevent it from starting next login.

### Load
> launchctl load -w <path>: Loads and starts the job while also marking the job as "not disabled." The job will restart on the next login/reboot.

### Unload

> launchctl unload -w <path>: Stops and unloads and disables the job. The job will NOT restart on the next login/restart.


## `emacsclient`
Now that we have a deamon always running, we can quickly launch emacs by running `emacsclient -c` or `emacsclient`. If we ever need to kill the emacs daemon it should be restarted automatically.
