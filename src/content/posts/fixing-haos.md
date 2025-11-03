---
title: Fixing HAOS
pubDate: "2025-11-03 16:06"
description: "How I fixed my Home Assistant server."
heroImage: "../../assets/haos.png"
---

### Fixing My Home Assistant

Yesterday evening the Pi 3 B+ running Home Assistant OS died.
After talking to some people in the Hack Club Slack, I decided to flash HAOS onto my Pi 5 for better performance, as the Pi 3 was having slight performance issues as well.
I have automatic backups to Google Drive happening daily from HAOS so this wasn't a problem and I figured the Pi 5 would be up and running within half an hour.

**I was _very_ wrong.**

After booting the newly flashed Pi 5 with HAOS and connecting to `homeassistant.local:8123`, I discovered an issue in the logs during the `preparing Home Assistant` phase of the set up.

```
2025-06-26 05:26:06.698 INFO (MainThread) [supervisor.updater] No Supervisor connectivity, delaying version fetch
2025-06-26 05:26:06.699 WARNING (MainThread) [supervisor.homeassistant.core] Error on Home Assistant installation. Retrying in 30sec

```

After connecting the Pi to my monitor and keyboard I found that the Home Assistant Supervisor wasn't connecting to the internet, even though I could `ping google.com`.
I tried many things but couldn't figure it out, even with help from my friends from Hack Club, so I stepped away for an hour and came back. When I sat down again, Home Assistant magically decided to work.
I didn't know what happened but I was happy it was working. I loaded my latest backup and everything went back to normal.

Today, I bought a new 128GB A2 Class Micro SD Card for Home Assistant, as I wanted the faster read/write speeds from A2, compared to my previous A1 card.
I flashed it with HAOS, and just like yesterday, supervisor couldn't reach the internet. I realised I should check Home Assistant Observer on `homeassistant.local:4357`.
It provided me with a warning that the system was having setup issues (which I already knew), but it also linked me to [this page](https://www.home-assistant.io/more-info/unhealthy/setup).
From there I discovered it was likely and issue with D-BUS, the dameon that lets supervisor connect to the host system.
After a little more poking around, I found a solution: manually starting the D-BUS dameon and then restarting supervisor.

**From ha cli:**

```
login
systemctl start d-bus.service
ha supervisor restart
```

**Not in ha cli:**

```
systemctl start d-bus.service
ha supervisor restart
```
