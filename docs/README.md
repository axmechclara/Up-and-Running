---
title: "Libellux: Up and Running"
meta:
  - name: description
    content: Libellux Up and Running is a collection of personal notes and documentation regarding open-source software configuration. The focus is to build a so called Zero Trust Network using a central authentication server to enhance the security for our existing applications. We will manage our network using an open-source software tool for provisioning and configuration management to automate and speed up productivity.
noGlobalSocialShare: true
---

# Introduction

Libellux: Up and Running is a collection of personal notes and documentation regarding open-source software configuration. The focus is to build a so called [Zero Trust Network](https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/) using a central authentication server to enhance the security for our existing applications. We will manage our network using an open-source software tool for provisioning and configuration management to automate and speed up productivity.

[![StyleCI](https://github.styleci.io/repos/245666033/shield)](https://github.styleci.io/repos/245666033/shield)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c55fd474-8155-440c-971b-a9ccbaf2133c/deploy-status)](https://app.netlify.com/sites/nervous-jennings-d80639/deploys)

::: tip DISCLAIMER
It is understood that this documentation, and any configurations may contain errors and are provided for education purposes only. The documentation, and any configurations are provided "as is" without warrany of any kind, whether express, implied, statutory, or otherwise.
:::

## Credits

| Role | Names |
|------|-------|
| Lead Authors: | Fredrik Hilmersson [@libellux](https://github.com/libellux) |
| Contributors: | Damir Kucic [@dkucic](https://github.com/dkucic) |
| Reviewers: | Scott Shinn [@atomicturtle](https://github.com/atomicturtle), Adam Hilmersson [@cnsta](https://github.com/cnsta) |

## Environments

* Ubuntu 20.04 LTS (Focal Fossa)
* Ubuntu 18.04 LTS (Bionic Beaver)
* Ubuntu 16.04 LTS (Xenial Xerus)
* VMware ESXi 6.7.0

::: details Conventions
| Type | Convention | Description |
|--------|----------|-------------|
| Environment | server@ubuntu | Suffix determine operating system |
| Server CLI | server@centos | Commands executed from server command-line |
| Client CLI | client@ubuntu | Commands executed from client command-line |
| Server IP | 192.168.0.1 | Server IP address |
| Client IP | 192.168.0.2 | Client IP address |
:::

## Table of contents

#### PART 1: ZERO TRUST NETWORK

* [1.0: WireGuard Secure VPN Tunnel](./wireguard/README.md) <Badge text="incomplete" type="warning"/>
* [1.1: privacyIDEA Authentication Server](./privacyidea/README.md) <Badge text="incomplete" type="warning"/>
* [1.2: Universal 2nd Factor with YubiKey](./u2f/README.md) <Badge text="incomplete" type="warning"/>

#### PART 2: INTRUSTION DETECTION AND PREVENTION

* [2.0: OSSEC Host Intrusion Detection System](./ossec/README.md) <Badge text="stable" type="default"/>
* [2.1: PSAD Intrusion Detection with Log Analysis](./psad/README.md) <Badge text="stable" type="default"/>
* [2.2: OpenVAS Open Vulnerability Assessment Scanner](./openvas/README.md) <Badge text="stable" type="default"/>
* 2.3: Snort Network Intrusion Detection & Prevention System <Badge text="TBA" type="warning"/>

#### PART 3: MONITORING AND MANAGEMENT

* [3.0: OpenLDAP Lightweight Directory Access](./ldap/README.md) <Badge text="incomplete" type="warning"/>
* 3.1: AWX Ansible Tower <Badge text="TBA" type="warning"/>
* [3.2: M/Monit System Monitoring](./mmonit/README.md) <Badge text="stable" type="default"/>
* [3.3: Performance Co-Pilot Grafana](./pcp/README.md) <Badge text="incomplete" type="warning"/>
* [3.4: Rsyslog Log Processing](./rsyslog/README.md) <Badge text="incomplete" type="warning"/>
* [3.5: Graylog Centralized Log Management](./graylog/README.md) <Badge text="incomplete" type="warning"/>

#### PART 4: MISCELLANEOUS

* [4.0: Jira Software](./jira/README.md) <Badge text="TBA" type="warning"/>

## Feedback

[Questions](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose), [comments](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose), or [problems](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose) regarding this service? Create an issue [here](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose) or contact [webmaster@libellux.com](mailto:webmaster@libellux.com).

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B31BJU3)

## Road map

To follow the process and prioritization check out the project [road map](https://github.com/libellux/Libellux-Up-and-Running/projects/1). Feel free to create a [feature request](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose) if there's any documentation or software you would like us to cover.

## Release notes

**Libellux: Up and Running changelog (1.0.1) <fredrik@libellux.com>**

**Release Maintainers**

Fredrik Hilmersson [@libellux](https://github.com/libellux)

**Contributors on this release**

Scott Shinn [@atomicturtle](https://github.com/atomicturtle)  
Adam Hilmersson [@cnsta](https://github.com/cnsta)

**Release notes**

The second release of Libellux: Up and Running mostly contain updates to already existing chapters. There is a few new additions to each chapter e.g. Agentless monitoring and Windows Server 2019 agent installation for OSSEC. The OpenVAS chapter has also been revised and updated with new features such as basic vulnerability scans to give a first hands-on experience. We've also completed the first revision for M/Monit System Monitoring.  

What's New:

M/Monit System Monitoring (3.7.5) with Monit (5.27.0)  
Agentless monitoring chapter to OSSEC Host Intrusion Detection (3.6.0)  
Windows Server 2019 agent installation (OSSEC 3.6.0)  
Basic authenticated and unauthenticated scan to OpenVAS Vulnerability Scanner (OpenVAS 20.08)

::: details Prior releases
**Libellux: Up and Running changelog (1.0.0) <fredrik@libellux.com>**

**Release Maintainers**

Fredrik Hilmersson [@libellux](https://github.com/libellux)

**Contributors on this release**

Damir Kucic [@dkucic](https://github.com/dkucic)  
Scott Shinn [@atomicturtle](https://github.com/atomicturtle)  
Adam Hilmersson [@cnsta](https://github.com/cnsta)  
Zeny Palac [@doczenzen](https://twitter.com/doczenzen)  
Falk [@falkowich](https://github.com/falkowich)

**Release notes**

This is the first release of Libellux: Up and Running. The initial release contain documentation and configuration for the software specified below (see What's New). Libellux: Up and Running is a collection of personal notes and documentation regarding open-source software configuration. The focus is to build a so called Zero Trust Network using a central authentication server to enhance the security for our existing applications. We will manage our network using an open-source software tool for provisioning and configuration management to automate and speed up productivity.

What's New:

OSSEC Host Intrusion Detection (3.6.0)  
PSAD Intrusion Detection (2.4.6)  
OpenVAS Vulnerability Scanner (OpenVAS 20.08, Atomicorp 20.08)
:::

## Recommended reading <Badge text="affiliate links" type="warning"/>

The books recommended throughout this website, have all been insightful and many times the core for documentation. They've also been helpful in understanding and chosing the correct approach when applying configurations for various open-source software. All the literature are personally recommended. Following the affiliated links is a way to support Libellux: Up and Running.

<img class="zoom-custom-imgs" :src="('/img/books.png')" alt="Books">

* [Zero Trust Networks: Building Secure Systems in Untrusted Networks, Gilman Evan, 2017](https://amzn.to/2HLyLJ5)
* [UNIX and Linux System Administration Handbook (5th Edition), Evi Nemeth, 2017](https://amzn.to/2TGVusl)
* [Securing DevOps: Security in the Cloud, Julien Vehent, 2017](https://amzn.to/3oDUDHm)
* [Instant OSSEC Host-based Intrusion Detection, Lhotsky Brad, 2013](https://amzn.to/3oDUNys)
* [OSSEC Host-Based Intrusion Detection Guide, Rory Bray, 2008](https://amzn.to/2TCKKLP)
* [Systems Performance: Enterprise and the Cloud, Gregg Brendan, 2013](https://amzn.to/3kDNaFK)
* [Mastering Ansible: Effectively automate configuration management and deployment challenges with Ansible, Freeman James & Keating Jesse, 2019](https://amzn.to/2JhvCSa)
* [Mastering OpenLDAP: Configuring, Securing and Integrating Directory, Butcher Matt, 2007](https://amzn.to/2TGW8Gh)
* [Ansible Up and Running (2nd Edition), Hochstein Lorin & Moser Rene, 2017](https://amzn.to/31PXy5N)
* [Jira 8 Administration Cookbook, Patrick Li, 2019](https://amzn.to/31Urf5N)
* [Linux Firewalls, Michael Rash, 2007](https://amzn.to/35OuPzP)
* [Linux Firewalls, Steve Suehring, 2015](https://amzn.to/34DnAuS)

<social-share />

<!--![6 healing sounds video](https://wujiquan.sgp1.digitaloceanspaces.com/Qigong/Wujiquan-six-healing-sounds.mp4)-->
