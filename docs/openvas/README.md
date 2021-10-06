---
lang: en-US
title: Greenbone Vulnerability Manager
description: OpenVAS is a full-featured vulnerability scanner. Its capabilities include unauthenticated testing, authenticated testing, various high level and low level Internet and industrial protocols, performance tuning for large-scale scans and a powerful internal programming language to implement any type of vulnerability test.
---

# Greenbone Vulnerability Manager <Badge text="Rev 6" type="tip"/>

OpenVAS is a full-featured vulnerability scanner. Its capabilities include unauthenticated testing, authenticated testing, various high level and low level Internet and industrial protocols, performance tuning for large-scale scans and a powerful internal programming language to implement any type of vulnerability test.

[GVM website](https://www.greenbone.net/en/vulnerability-management/) [OpenVAS website](https://www.openvas.org/) [GitHub](https://github.com/greenbone/openvas) [GVM official docs](https://greenbone.github.io/docs/)

Setup and configuration have been tested on the following operating systems:

* Ubuntu- 16.04, 18.04, 20.04 (Focal Fossa), Rocky 8.4 (Green Obsidian)
* GVM 20.08 for Debian 10 visit [sadsloth.net](https://sadsloth.net/post/install-gvm-20_08-src-on-debian/).
* GVM-9 (OpenVAS-9), Atomicorp 20.08 (RHEL 8, CentOS 8, Fedora 32), GVM- 20.08, 20.08.1, 21.04, 21.4.2

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B31BJU3)

## Configuration files

::: tip
The lines in the "scripts" below has been used for testing and successfully configure GVM 20.08 (20.08.1) and 21.04 (21.4.2).
You may use the testing guide to install GVM or follow our detailed step-by-step tutorial below to install GVM 21.04.
:::

* [21.4.2](https://github.com/libellux/Libellux-Up-and-Running/blob/master/docs/openvas/config/21_4_2.sh)
* [20.08.1](https://github.com/libellux/Libellux-Up-and-Running/blob/master/docs/openvas/config/20_08_1.sh)

## Prerequisites

Dependencies required to install GVM 21.04 (21.4.2) from source. For more detailed information regarding dependencies and their function please visit [GVM official docs](https://greenbone.github.io/docs/) website.

::: details Dependencies for Ubuntu 20.04
```no-line-numbers
build-essential cmake gnutls-bin pkg-config glib2.0
libgnutls28-dev libssh-dev libssl-dev libhiredis-dev
redis-server libxml2-dev doxygen xsltproc libldap2-dev
libgcrypt-dev libpcap-dev libgpgme-dev libradcli-dev
graphviz bison libksba-dev libical-dev libpq-dev
postgresql postgresql-contrib postgresql-server-dev-all
libopenvas-dev heimdal-dev libpopt-dev xmltoman
gcc-mingw-w64 nmap npm nodejs libpthread-stubs0-dev
clang-format libmicrohttpd-dev yarn virtualenv
python3-paramiko python3-lxml python3-defusedxml
python3-pip python3-psutil libnet1-dev libunistring-dev
xmlstarlet texlive-fonts-recommended texlive-latex-extra
```
:::

## Install GVM 21.04 from source

Begin to install the dependencies for GVM 21.04 (21.4.2).

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo apt-get update && \
sudo apt-get -y upgrade && \
sudo apt-get install -y build-essential && \
sudo apt-get install -y cmake pkg-config glib2.0 gcc-mingw-w64 \
gnutls-bin libgnutls28-dev libxml2-dev libssh-dev libssl-dev libunistring-dev \
libldap2-dev libgcrypt-dev libpcap-dev libgpgme-dev libradcli-dev \
libksba-dev libical-dev libpq-dev libopenvas-dev libpopt-dev libnet1-dev \
libmicrohttpd-dev redis-server libhiredis-dev doxygen xsltproc \
graphviz bison postgresql postgresql-contrib postgresql-server-dev-all \
heimdal-dev xmltoman nmap npm nodejs virtualenv \
python3-paramiko python3-lxml python3-defusedxml python3-pip python3-psutil \
xmlstarlet texlive-fonts-recommended texlive-latex-extra
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Continue to install yarn using npm with the specified installation prefix.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo npm install -g yarn --prefix /usr/
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Set up GVM user define installation paths

Create the GVM user and add it to sudoers group without login. Also add your current sudo user to the GVM group so you're allowed to run *gvmd*.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo useradd -r -M -U -G sudo -s /usr/sbin/nologin gvm && \
sudo usermod -aG gvm $USER && su $USER
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Specify the GVM libraries location to your dynamic loader and update the cache.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo bash -c 'cat << EOF > /etc/ld.so.conf.d/gvm.conf
# gmv libs location
/usr/local/lib/
EOF' && \
sudo ldconfig
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Next define base, source, build and installation directories.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ export PATH=$PATH:/usr/local/sbin && export INSTALL_PREFIX=/usr/local && \
export SOURCE_DIR=$HOME/source && mkdir -p $SOURCE_DIR && \
export BUILD_DIR=$HOME/build && mkdir -p $BUILD_DIR && \
export INSTALL_DIR=$HOME/install && mkdir -p $INSTALL_DIR
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Import GVM signing key 

Download the signing key from Greenbone community to validate the integrity of the source files.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ curl -O https://www.greenbone.net/GBCommunitySigningKey.asc && \
gpg --import GBCommunitySigningKey.asc
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Edit GVM signing key to trust ultimately

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ gpg --edit-key 9823FAA60ED1E580
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

When you get prompted type *trust* and select option 5 (I trust ultimately).

```shell-session:no-line-numbers{10,23,26}
gpg (GnuPG) 2.2.19; Copyright (C) 2019 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

pub  rsa4096/9823FAA60ED1E580
     created: 2017-09-06  expires: never       usage: SC
     trust: unknown       validity: unknown
[ unknown] (1). Greenbone Community Feed integrity key

gpg> trust
pub  rsa4096/9823FAA60ED1E580
     created: 2017-09-06  expires: never       usage: SC
     trust: unknown       validity: unknown
[ unknown] (1). Greenbone Community Feed integrity key

Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5
Do you really want to set this key to ultimate trust? (y/N) y

pub  rsa4096/9823FAA60ED1E580
     created: 2017-09-06  expires: never       usage: SC
     trust: ultimate      validity: unknown
[ unknown] (1). Greenbone Community Feed integrity key
Please note that the shown key validity is not necessarily correct
unless you restart the program.

gpg> quit
```

### Build GVM libraries

Download and build the [GVM libraries](https://github.com/greenbone/gvm-libs) version 21.04 (21.4.2). Set the GVM libraries to same version as GVM.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ export GVM_VERSION=21.4.2 && \
export GVM_LIBS_VERSION=$GVM_VERSION
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Download and verify the specified GVM libraries.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ curl -f -L https://github.com/greenbone/gvm-libs/archive/refs/tags/v$GVM_LIBS_VERSION.tar.gz -o $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/gvm-libs/releases/download/v$GVM_LIBS_VERSION/gvm-libs-$GVM_LIBS_VERSION.tar.gz.asc -o $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION.tar.gz.asc && \
gpg --verify $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION.tar.gz.asc $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION.tar.gz
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Make sure the output says that the signature from Greenbone Community Feed is good.

```shell-session:no-line-numbers{6}
gpg: Signature made Tue 03 Aug 2021 12:11:44 PM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
```

Once you've confirmed that the signature is good proceed to install GVM libraries.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION.tar.gz && \
mkdir -p $BUILD_DIR/gvm-libs && cd $BUILD_DIR/gvm-libs && \
cmake $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release \
  -DSYSCONFDIR=/etc \
  -DLOCALSTATEDIR=/var \
  -DGVM_PID_DIR=/run/gvm && \
make DESTDIR=$INSTALL_DIR install && \
sudo cp -rv $INSTALL_DIR/* / && \
rm -rf $INSTALL_DIR/*
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Build the Greenbone Vulnerability Manager

Next download, verify and build the [Greenbone Vulnerability Manager (GVM)](https://github.com/greenbone/gvmd) version 21.04 (21.4.3). Set the GVMD version to the latest realese 21.4.3.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ export GVMD_VERSION=21.4.3 && \
curl -f -L https://github.com/greenbone/gvmd/archive/refs/tags/v$GVMD_VERSION.tar.gz -o $SOURCE_DIR/gvmd-$GVMD_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/gvmd/releases/download/v$GVMD_VERSION/gvmd-$GVMD_VERSION.tar.gz.asc -o $SOURCE_DIR/gvmd-$GVMD_VERSION.tar.gz.asc && \
gpg --verify $SOURCE_DIR/gvmd-$GVMD_VERSION.tar.gz.asc $SOURCE_DIR/gvmd-$GVMD_VERSION.tar.gz
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Make sure the signature from Greenbone Community Feed is good.

```shell-session:no-line-numbers{3}
gpg: Signature made Tue 03 Aug 2021 02:28:53 PM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
```

Extract the downloaded GVMD file and proceed with the installation.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/gvmd-$GVMD_VERSION.tar.gz && \
mkdir -p $BUILD_DIR/gvmd && cd $BUILD_DIR/gvmd && \
cmake $SOURCE_DIR/gvmd-$GVMD_VERSION \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release \
  -DLOCALSTATEDIR=/var \
  -DSYSCONFDIR=/etc \
  -DGVM_DATA_DIR=/var \
  -DGVM_RUN_DIR=/run/gvm \
  -DOPENVAS_DEFAULT_SOCKET=/run/ospd/ospd-openvas.sock \
  -DGVM_FEED_LOCK_PATH=/var/lib/gvm/feed-update.lock \
  -DSYSTEMD_SERVICE_DIR=/lib/systemd/system \
  -DDEFAULT_CONFIG_DIR=/etc/default \
  -DLOGROTATE_DIR=/etc/logrotate.d && \
make DESTDIR=$INSTALL_DIR install && \
sudo cp -rv $INSTALL_DIR/* / && \
rm -rf $INSTALL_DIR/*
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Build the Greenbone Security Assistant

Proceed to download and build the [Greenbone Security Assistant (GSA)](https://github.com/greenbone/gsa) version 21.04 (21.4.2) and its node modules.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ export GSA_VERSION=$GVM_VERSION && \
curl -f -L https://github.com/greenbone/gsa/archive/refs/tags/v$GSA_VERSION.tar.gz -o $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/gsa/releases/download/v$GSA_VERSION/gsa-$GSA_VERSION.tar.gz.asc -o $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz.asc && \
curl -f -L https://github.com/greenbone/gsa/releases/download/v$GSA_VERSION/gsa-node-modules-$GSA_VERSION.tar.gz -o $SOURCE_DIR/gsa-node-modules-$GSA_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/gsa/releases/download/v$GSA_VERSION/gsa-node-modules-$GSA_VERSION.tar.gz.asc -o $SOURCE_DIR/gsa-node-modules-$GSA_VERSION.tar.gz.asc && \
gpg --verify $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz.asc $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz && \
gpg --verify $SOURCE_DIR/gsa-node-modules-$GSA_VERSION.tar.gz.asc $SOURCE_DIR/gsa-node-modules-$GSA_VERSION.tar.gz
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Once complete verify the GSA downloads and make sure the signature from Greenbone Community Feed is good.

```shell-session:no-line-numbers{3,6}
gpg: Signature made Tue 03 Aug 2021 02:59:15 PM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
gpg: Signature made Tue 03 Aug 2021 02:54:19 PM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
```

Proceed with the installation of GSA.

::: warning
This may take a while.
:::

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz && \
tar -C $SOURCE_DIR/gsa-$GSA_VERSION/gsa -xvzf $SOURCE_DIR/gsa-node-modules-$GSA_VERSION.tar.gz && \
mkdir -p $BUILD_DIR/gsa && cd $BUILD_DIR/gsa && \
cmake $SOURCE_DIR/gsa-$GSA_VERSION \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release \
  -DSYSCONFDIR=/etc \
  -DLOCALSTATEDIR=/var \
  -DGVM_RUN_DIR=/run/gvm \
  -DGSAD_PID_DIR=/run/gvm \
  -DLOGROTATE_DIR=/etc/logrotate.d && \
make DESTDIR=$INSTALL_DIR install && \
sudo cp -rv $INSTALL_DIR/* / && \
rm -rf $INSTALL_DIR/*
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Build the OpenVAS Samba module

Download and build the [OpenVAS SMB module](https://github.com/greenbone/openvas-smb) version 21.04.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ export OPENVAS_SMB_VERSION=21.4.0 && \
curl -f -L https://github.com/greenbone/openvas-smb/archive/refs/tags/v$OPENVAS_SMB_VERSION.tar.gz -o $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/openvas-smb/releases/download/v$OPENVAS_SMB_VERSION/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz.asc -o $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz.asc && \
gpg --verify $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz.asc $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Verify the SMB module download and make sure the signature from Greenbone Community Feed is trusted.

```shell-session:no-line-numbers{3}
gpg: Signature made Fri 25 Jun 2021 06:36:43 AM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
```

Next extract files and proceed with the installation.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz && \
mkdir -p $BUILD_DIR/openvas-smb && cd $BUILD_DIR/openvas-smb && \
cmake $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release && \
make DESTDIR=$INSTALL_DIR install && \
sudo cp -rv $INSTALL_DIR/* / && \
rm -rf $INSTALL_DIR/*
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Build the OpenVAS Scanner

Download and build the [openvas-scanner (OpenVAS)](https://github.com/greenbone/openvas) version 21.04 (21.4.1).

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ export OPENVAS_SCANNER_VERSION=$GVM_VERSION && \
curl -f -L https://github.com/greenbone/openvas-scanner/archive/refs/tags/v$OPENVAS_SCANNER_VERSION.tar.gz -o $SOURCE_DIR/openvas-scanner-$OPENVAS_SCANNER_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/openvas-scanner/releases/download/v$OPENVAS_SCANNER_VERSION/openvas-scanner-$OPENVAS_SCANNER_VERSION.tar.gz.asc -o $SOURCE_DIR/openvas-scanner-$OPENVAS_SCANNER_VERSION.tar.gz.asc && \
gpg --verify $SOURCE_DIR/openvas-scanner-$OPENVAS_SCANNER_VERSION.tar.gz.asc $SOURCE_DIR/openvas-scanner-$OPENVAS_SCANNER_VERSION.tar.gz
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Verify the signature output.

```shell-session:no-line-numbers{3}
gpg: Signature made Tue 03 Aug 2021 12:59:52 PM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
```

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/openvas-scanner-$OPENVAS_SCANNER_VERSION.tar.gz && \
mkdir -p $BUILD_DIR/openvas-scanner && cd $BUILD_DIR/openvas-scanner && \
cmake $SOURCE_DIR/openvas-scanner-$OPENVAS_SCANNER_VERSION \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release \
  -DSYSCONFDIR=/etc \
  -DLOCALSTATEDIR=/var \
  -DOPENVAS_FEED_LOCK_PATH=/var/lib/openvas/feed-update.lock \
  -DOPENVAS_RUN_DIR=/run/ospd && \
make DESTDIR=$INSTALL_DIR install && \
sudo cp -rv $INSTALL_DIR/* / && \
rm -rf $INSTALL_DIR/*
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Build ospd and ospd-openvas

Proceed to download [ospd](https://github.com/greenbone/ospd).

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ export OSPD_VERSION=21.4.3 && export OSPD_OPENVAS_VERSION=$GVM_VERSION && \
curl -f -L https://github.com/greenbone/ospd/archive/refs/tags/v$OSPD_VERSION.tar.gz -o $SOURCE_DIR/ospd-$OSPD_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/ospd/releases/download/v$OSPD_VERSION/ospd-$OSPD_VERSION.tar.gz.asc -o $SOURCE_DIR/ospd-$OSPD_VERSION.tar.gz.asc && \
curl -f -L https://github.com/greenbone/ospd-openvas/archive/refs/tags/v$OSPD_OPENVAS_VERSION.tar.gz -o $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION.tar.gz && \
curl -f -L https://github.com/greenbone/ospd-openvas/releases/download/v$OSPD_OPENVAS_VERSION/ospd-openvas-$OSPD_OPENVAS_VERSION.tar.gz.asc -o $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION.tar.gz.asc && \
gpg --verify $SOURCE_DIR/ospd-$OSPD_VERSION.tar.gz.asc $SOURCE_DIR/ospd-$OSPD_VERSION.tar.gz && \
gpg --verify $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION.tar.gz.asc $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION.tar.gz
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Verify signature for both files.

```shell-session:no-line-numbers{3,6}
gpg: Signature made Wed 04 Aug 2021 07:13:45 AM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
gpg: Signature made Wed 04 Aug 2021 12:23:19 PM UTC
gpg:                using RSA key 8AE4BE429B60A59B311C2E739823FAA60ED1E580
gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]
```

Extract files and start the installation.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/ospd-$OSPD_VERSION.tar.gz && \
tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION.tar.gz && \
cd $SOURCE_DIR/ospd-$OSPD_VERSION && \
python3 -m pip install . --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Before you're done upgrade `python3-psutil` to version 5.7.2 then proceed to finialize the installation of ospd-openvas and install `gvm-tools`.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ pip install --upgrade psutil==5.7.2 && \
cd $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION && \
python3 -m pip install . --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR --no-warn-script-location && \
python3 -m pip install --user gvm-tools && \
sudo cp -rv $INSTALL_DIR/* / && \
rm -rf $INSTALL_DIR/*
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Configure Redis

Next configure redis for the default GVM installation.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo cp $SOURCE_DIR/openvas-scanner-$GVM_VERSION/config/redis-openvas.conf /etc/redis/ && \
sudo chown redis:redis /etc/redis/redis-openvas.conf && \
echo "db_address = /run/redis-openvas/redis.sock" | sudo tee -a /etc/openvas/openvas.conf
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Start the redis server and enable it as an start up service.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo systemctl start redis-server@openvas.service && \
sudo systemctl enable redis-server@openvas.service
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Add redis to the GVM group and set up correct permissions.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo usermod -aG redis gvm && \
sudo chown -R gvm:gvm /var/lib/gvm && \
sudo chown -R gvm:gvm /var/lib/openvas && \
sudo chown -R gvm:gvm /var/log/gvm && \
sudo chown -R gvm:gvm /run/gvm && \
sudo chmod -R g+srw /var/lib/gvm && \
sudo chmod -R g+srw /var/lib/openvas && \
sudo chmod -R g+srw /var/log/gvm && \
sudo chown gvm:gvm /usr/local/sbin/gvmd && \
sudo chmod 6750 /usr/local/sbin/gvmd
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

You also need to adjust the permissions for the feed synchronization.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo chown gvm:gvm /usr/local/bin/greenbone-nvt-sync && \
sudo chmod 740 /usr/local/sbin/greenbone-feed-sync && \
sudo chown gvm:gvm /usr/local/sbin/greenbone-*-sync && \
sudo chmod 740 /usr/local/sbin/greenbone-*-sync
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

OpenVAS will be launched from an ospd-openvas process. Update the secure path in the sudoers file accordingly.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo visudo
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

```bash{5}
# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# allow users of the gvm group run openvas
%gvm ALL = NOPASSWD: /usr/local/sbin/openvas
```

### Configure PostgreSQL database

For additional information see reference greenbone/gvmd [INSTALL.md](https://github.com/greenbone/gvmd/blob/master/INSTALL.md). First make sure that the required dependencies have been installed (see [Prerequisites](#prerequisites)). Proceed to create a Postgres user and database.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo -u postgres bash
postgres@ubuntu:~$ createuser -DRS gvm && createdb -O gvm gvmd
postgres@ubuntu:~$ psql gvmd
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Setup correct permissions and create database extensions.

```plsql:no-line-numbers
gvmd=# create role dba with superuser noinherit;
gvmd=# grant dba to gvm;
gvmd=# create extension "uuid-ossp";
gvmd=# create extension "pgcrypto";
gvmd=# exit
```

### Create GVM admin

Create the GVM administration user. Do not forget to change the password later.

::: warning
Do not use special characters in the password.
:::

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
postgres@ubuntu:~$ exit
server@ubuntu:~$ sudo /usr/local/sbin/gvmd --create-user=admin --password=admin
User created.
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Next lets retrieve the administrators uuid.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers{2}
server@ubuntu:~$ sudo gvmd --get-users --verbose
admin 0279ba6c-391a-472f-8cbd-1f6eb808823b
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Use the administration uuid and modify the gvmd settings. Remember to put your uuid as the value option.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo gvmd --modify-setting 78eceaec-3385-11ea-b237-28d24461215b --value UUID_HERE
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Update Network Vulnerability Tests

Update Network Vulnerability Tests (NVT) from Greenbone Community Feed.

::: warning
This may take a while.
:::

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo -u gvm greenbone-nvt-sync
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Update Greenbone Feed synchronisation

Update the Greenbone feed synchronisation one at the time.

::: warning
Only one sync per time, otherwise the source ip will be temporarily blocked.
:::

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo -u gvm greenbone-feed-sync --type GVMD_DATA
server@ubuntu:~$ sudo -u gvm greenbone-feed-sync --type SCAP
server@ubuntu:~$ sudo -u gvm greenbone-feed-sync --type CERT
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Generate GVM certificates

Once you've finished the feed synchronisation generate GVM certificates.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo -u gvm gvm-manage-certs -a
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Set up systemd

Next setup the startup scripts. First configure the Greenbone Manager startup script.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
cat << EOF > $BUILD_DIR/gvmd.service
[Unit]
Description=Greenbone Vulnerability Manager daemon (gvmd)
After=network.target networking.service postgresql.service ospd-openvas.service
Wants=postgresql.service ospd-openvas.service
Documentation=man:gvmd(8)
ConditionKernelCommandLine=!recovery

[Service]
Type=forking
User=gvm
Group=gvm
PIDFile=/run/gvm/gvmd.pid
RuntimeDirectory=gvm
RuntimeDirectoryMode=2775
ExecStart=/usr/local/sbin/gvmd --osp-vt-update=/run/ospd/ospd-openvas.sock --listen-group=gvm
Restart=always
TimeoutStopSec=10

[Install]
WantedBy=multi-user.target
EOF
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Copy the startup script from the build folder to your system manager directory.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo cp $BUILD_DIR/gvmd.service /etc/systemd/system/
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Once the first startup script is saved proceed to create the script for the Greenbone Security Assistant (GSA). Remember to define your IP address for GSA.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers{13}
cat << EOF > $BUILD_DIR/gsad.service
[Unit]
Description=Greenbone Security Assistant daemon (gsad)
Documentation=man:gsad(8) https://www.greenbone.net
After=network.target gvmd.service
Wants=gvmd.service

[Service]
Type=forking
User=gvm
Group=gvm
PIDFile=/run/gvm/gsad.pid
ExecStart=/usr/local/sbin/gsad --listen=192.168.0.1 --port=9392
Restart=always
TimeoutStopSec=10

[Install]
WantedBy=multi-user.target
Alias=greenbone-security-assistant.service
EOF
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Copy the startup script to system directory.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo cp $BUILD_DIR/gsad.service /etc/systemd/system/
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Create the systemd service script for ospd-openvas.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
cat << EOF > $BUILD_DIR/ospd-openvas.service
[Unit]
Description=OSPd Wrapper for the OpenVAS Scanner (ospd-openvas)
Documentation=man:ospd-openvas(8) man:openvas(8)
After=network.target networking.service redis-server@openvas.service
Wants=redis-server@openvas.service
ConditionKernelCommandLine=!recovery

[Service]
Type=forking
User=gvm
Group=gvm
RuntimeDirectory=ospd
RuntimeDirectoryMode=2775
PIDFile=/run/ospd/ospd-openvas.pid
ExecStart=/usr/local/bin/ospd-openvas --unix-socket /run/ospd/ospd-openvas.sock --pid-file /run/ospd/ospd-openvas.pid --log-file /var/log/gvm/ospd-openvas.log --lock-file-dir /var/lib/openvas --socket-mode 0o770
SuccessExitStatus=SIGKILL
Restart=always
RestartSec=60

[Install]
WantedBy=multi-user.target
EOF
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Finally copy the last startup script to your system manager directory.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo cp $BUILD_DIR/ospd-openvas.service /etc/systemd/system/
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Modify scanner

Before running vulnerability scans, also known as tasks, you need to modify the default OpenVAS scanner. Get the pre-exisiting scanners by running command below. Copy the UUID from the OpenVAS Default Scanner.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers{3}
server@ubuntu:~$ sudo gvmd --get-scanners
6acd0832-df90-11e4-b9d5-28d24461215b  CVE    0  CVE
08b69003-5fc2-4037-a479-93b440211c73  OpenVAS  /opt/gvm/var/run/ospd.sock  0  OpenVAS Default
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Next run the modification command and attach the UUID to the scanner host socket.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo gvmd --modify-scanner=08b69003-5fc2-4037-a479-93b440211c73 --scanner-host=/run/ospd/ospd-openvas.sock
Scanner modified.
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

### Enable and start services

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo systemctl daemon-reload
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo systemctl enable ospd-openvas
server@ubuntu:~$ sudo systemctl enable gvmd
server@ubuntu:~$ sudo systemctl enable gsad
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers
server@ubuntu:~$ sudo systemctl start ospd-openvas
server@ubuntu:~$ sudo systemctl start gvmd
server@ubuntu:~$ sudo systemctl start gsad
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Next check that all the services are running.

:::: code-group
::: code-group-item Ubuntu
```shell-session:no-line-numbers{1,5,9}
server@ubuntu:~$ sudo systemctl status gvmd
● gvmd.service - Greenbone Vulnerability Manager daemon (gvmd)
     Loaded: loaded (/etc/systemd/system/gvmd.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2021-08-28 20:23:46 UTC; 54min ago
server@ubuntu:~$ sudo systemctl status gsad
● gsad.service - Greenbone Security Assistant daemon (gsad)
     Loaded: loaded (/etc/systemd/system/gsad.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2021-08-28 20:50:09 UTC; 28min ago
server@ubuntu:~$ sudo systemctl status ospd-openvas
● ospd-openvas.service - OSPd Wrapper for the OpenVAS Scanner (ospd-openvas)
     Loaded: loaded (/etc/systemd/system/ospd-openvas.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2021-08-28 20:48:04 UTC; 31min ago
```
:::
::: code-group-item Rocky
```shell-session:no-line-numbers
server@rocky:~$
```
:::
::::

Login at your localhost e.g. `https://192.168.0.1:9392` with the username `admin` and the chosen password.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_login-2.png')" alt="GSA login">

Once logged in, go to the *Administration* tab and select *Feed Status*. You'll see that the update is in progress (this might take awhile). When the status changed to *current*, go to the dashboard and it will be populated with CVEs by creation time and NVTs by severity class.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_dashboard.png')" alt="GSA dashboard">

You may also confirm the current version, go to the *Help* tab and select *About*.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_about.png')" alt="GSA about">

To run basic vulnerability scans and get hands-on approach to get started with OpenVAS check the [Running vulnerability scans](#running-vulnerability-scans) section.

## Install GVM 20.08 CentOS

[Atomicorp GVM package](https://github.com/Atomicorp/openvas) <Badge text="non-sponsored" type="tip"/>

Check if SELinux is enabled.

```{2,7}
server@centos:~$ sestatus
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          enforcing
```

If enabled proceed to disable SELinux by running the command below and update the SELinux configuration file.

```{1,9}
server@centos:~$ sudo setenforce 0
server@centos:~$ sudo nano /etc/selinux/config

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled
```

Save and reboot the system.

```
server@centos:~$ sudo shutdown -r now
```

Once the system rebooted control that SELinux been disabled.

```
server@centos:~$ sestatus
SELinux status:                 disabled
```

Continue and download the Atomicorp installer.

```{7,8}
server@centos:~$ wget -q -O - https://updates.atomicorp.com/installers/atomic | sudo sh

For supported software packages please contact us at: 

  sales@atomicorp.com

Do you agree to these terms? (yes/no) [Default: yes] yes
Enable repo by default? (yes/no) [Default: yes]: yes
```

Enable PowerTools and install extra packages.

```
server@centos:~$ sudo yum config-manager --set-enabled PowerTools
server@centos:~$ sudo yum install epel-release
```

Proceed and install GVM.

```
server@centos:~$ sudo yum install gvm
```

Finally run the GVM configuration script to setup GVM (this might take awhile).

```
server@centos:~$ sudo gvm-setup
```

Once the GVM setup been complete proceed to set the administrator password.

::: warning
Do not use special characters in the password.
:::

```{9,10}
Updating OpenVAS Manager certificates: Complete

GVMD startup: Done

Set the GSAD admin users password.
The admin user is used to configure accounts,
Update NVT's manually, and manage roles.

Enter Administrator Password:
Verify Administrator Password:

Setup complete
  Log in to GSAD at https://localhost
```

Login at your localhost e.g. `https://192.168.0.1` with the username `admin` and the chosen password.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_dashboard.png')" alt="GSA dashboard">

## Running vulnerability scans

There is several approaches on how to configure and run tasks (scans) toward your targets (hosts) in GVM. In this tutorial we will go through how to run the more basic tasks. We will do both unauthenticated scans, where we do not grant GVM SSH access to our target, and authenticated scans to help identify internal server vulnerabilites or misconfigurations.

### Unauthenticated scan

<br/>
<p align="center">
  <video width="600" controls poster="/img/icons/video.png" style="witdth:100%;height:auto;">
    <source src="/vids/openvas/unauthenticated_scan.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

Login to the Greenbone Security Assistant (GSA) e.g. `https://192.168.0.1`. Once logged in we will add our first target. Go the the *Configuration* menu in the top navigation and select *Targets*.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_targets.png')" alt="GSA targets">

In the top left corner of the *Targets* view there's a starred document icon, click and select to create a *New Target*. Fill in the name of the target server e.g. *Ubuntu Client* and its IP address `192.168.0.2`. Leave the rest of the settings in default.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_target.png')" alt="GSA target">

Next we will create a task for unauthenticated targets (scans without SSH access). Go the *Scans* in the top menu and select *Tasks*.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_tasks.png')" alt="GSA tasks">

Click the starred document icon in the top left corner of the *Tasks* view.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_task.png')" alt="GSA task">

Select a descriptive name for your task e.g. Unauthenticated scan. In the *Scan Targets* dropdown menu select your target we created before (Ubuntu Client). Leave the default settings and click save.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_noauth_task.png')" alt="GSA noauth task">

You will then be redirected back to the *Tasks* overview and our new task will be listed in the table below the graphs. To start the scan press the start button on the right side of the table.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_noauth_scan.png')" alt="GSA noauth scan">

### Authenticated scan

First make sure that you've generated SSH keys for your GVM client user e.g. `client@ubuntu`. Add your public key to the targets authorized keys file. You may have to connect to your target host, through SSH, before running GVM vulnerability scan to add the target host to your clients machine known hosts. Once you've established a secure communication between your client and target, proceed to configure credentials in the Greenbone Security Assistant. Go to *Configuration* and select *Credentials*.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_credentials.png')" alt="GSA credentials">

Next click the starred document in the top left corner to create your new credentials. Give the credentials a desciptive name with an optional comment. In the dropdown menu *Type*, select *Username + SSH key* and disallow insecure use and auto-generation. Add the username of the target host user followed by the password and upload the private key (e.g. id_rsa). Click save.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_newcredentials.png')" alt="GSA new credentials">

Go to the *Targets* section and either edit your [unauthenticated scan](#unauthenticated-scan) or create a new target. Set the host IP address and in the dropdown menu, under the *Credentials for authentication checks*, select your newly created SSH credential.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_auth_target.png')" alt="GSA auth target">

Finally create a new task and select the target that we attached our credentials to and leave the default settings.

<img class="zoom-custom-imgs" :src="('/img/openvas/gsa_auth_task.png')" alt="GSA auth task">

## Two-factor authentication w/ privacyIDEA

To enforce two-factor authentication for Greenbone Security Assistant with privacyIDEA and YubiKey read the [Two-factor authentication w/ privacyIDEA and YubiKey](../privacyidea/README.md) chapter.

## Scheduled jobs

To keep the community feed up-to-date, first login as your GVM user.

```
server@ubuntu:~$ sudo su - gvm
```

Create the file that we will populate with the required commands.

```
gvm@ubuntu:~$ touch /opt/gvm/bin/openvas-update
```

Make the file executable.

```
gvm@ubuntu:~$ chmod a+x /opt/gvm/bin/openvas-update
```

Enter the commands that we will run daily.

```
gvm@ubuntu:~$ nano /opt/gvm/bin/openvas-update
```

```
/opt/gvm/bin/greenbone-nvt-sync
/opt/gvm/sbin/greenbone-feed-sync --type GVMD_DATA
/opt/gvm/sbin/greenbone-feed-sync --type SCAP
/opt/gvm/sbin/greenbone-feed-sync --type CERT
```

Edit the GVM users crontab and add the script we created to check for daily updates.

```
gvm@ubuntu:~$ crontab -e
```

```bash{25}
# Edit this file to introduce tasks to be run by cron.
#
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
#
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').
#
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
#
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
#
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
#
# For more information see the manual pages of crontab(5) and cron(8)
#
# m h  dom mon dow   command

0 0 * * * /opt/gvm/bin/openvas-update
```

## Troubleshooting

If you encounter any issue or having questions regarding Greenbone Vulnerability Manager, I recommend using their helpful [community forum](https://community.greenbone.net/).

[Questions](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose), [comments](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose), or [problems](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose) regarding this service? Create an issue [here](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose) or contact [webmaster@libellux.com](mailto:webmaster@libellux.com).

### SEC_ERROR_INADEQUATE_KEY_USAGE

If receiving `SEC_ERROR_INADEQUATE_KEY_USAGE` and the browser blocks access to the local GVM server, proceed with removing the certificate. For example, in Firefox go to `about:preferences#privacy` and the certificate section. Select Show certificates, click the Servers tab and remove the certificates found under GVM Users.

### Failed to find interpreter for Python 3.7

If receiving `RuntimeError: failed to find interpreter for Builtin discover of python_spec='python3.7'` make sure you've followed the instructions to install the required 3.7 packages.

```
server@ubuntu:~$ sudo add-apt-repository ppa:deadsnakes/ppa
server@ubuntu:~$ sudo apt-get update
server@ubuntu:~$ sudo apt-get install python3.7 python3.7-dev
```

## Enterprise solutions <Badge text="non-sponsored" type="tip"/>

### The Greenbone Security Manager

The Greenbone Security Manager (GSM) is an appliance for vulnerability scanning and management. It is offered in various performance levels and basically supports an unlimited number of target systems. The actually achievable number depends on the scan pattern and scan targets. For finding the right model for your purpose, we provide reference values for the number of target IP addresses below, assuming a common scenario with a scan every 24 hours.

[Greenbone Security Manager](https://www.greenbone.net/en/product-comparison/)
