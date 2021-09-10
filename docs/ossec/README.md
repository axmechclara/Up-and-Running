---
title: OSSEC Host Intrusion Detection System
meta:
  - name: description
    content: OSSEC is a full platform to monitor and control your systems. It mixes together all the aspects of HIDS (host-based intrusion detection), log monitoring and SIM/SIEM together in a simple, powerful and open source solution.
---

# OSSEC Host Intrusion Detection System

OSSEC is a full platform to monitor and control your systems. It mixes together all the aspects of HIDS (host-based intrusion detection), log monitoring and SIM/SIEM together in a simple, powerful and open source solution.

[OSSEC website](https://www.ossec.net/) [GitHub](https://github.com/ossec/ossec-hids)

Setup and configuration has been tested on the following operating systems:

* Ubuntu- 16.04, 18.04, 20.04, Rocky 8 Linux, Windows Server 2019, Windows 10
* 2.9.0 -> 3.6.0

## Configuration files

## Prerequisites

* `build-essential`
* `libssl-dev`
* `libpcre2-dev`
* `zlib1g-dev`
* `jq` (optional)
* `pcre2` library for version >= 3.3.0 ([ftp.pcre.org](https://ftp.pcre.org/pub/pcre/))

## Server installation 

To install **OSSEC 3.6.0** on **Ubuntu 20.04** or **Rocky 8 Linux** download the [latest stable version](https://github.com/ossec/ossec-hids/releases) from ossec-hids GitHub.

### Verify file integrity

It's recommended to verify the file integrity of the downloaded file. Get the key file (.asc) from ossec-hids [GitHub](https://github.com/ossec/ossec-hids/releases) release.

:::: code-group
::: code-group-item Ubuntu
```shell-session
server@ubuntu:~$ wget https://github.com/ossec/ossec-hids/releases/download/3.6.0/ossec-hids-3.6.0.tar.gz.asc
:::
::: code-group-item Rocky
```shell-session
server@rocky:~$ wget https://github.com/ossec/ossec-hids/releases/download/3.6.0/ossec-hids-3.6.0.tar.gz.asc
```
:::
::::

Extract the file and run the installation script. If receiving build errors, make sure that you have installed all the required dependencies or check the [troubleshooting section](#troubleshooting) for details.

:::: code-group
::: code-group-item Ubuntu
```shell-session
server@ubuntu:~$ wget https://github.com/ossec/ossec-hids/archive/3.6.0.tar.gz
server@ubuntu:~$ tar -zxvf 3.6.0.tar.gz
server@ubuntu:~$ cd ossec-hids-3.6.0/
server@ubuntu:~$ wget https://ftp.pcre.org/pub/pcre/pcre2-10.32.tar.gz
server@ubuntu:~$ tar -zxvf pcre2-10.32.tar.gz -C src/external/
server@ubuntu:~$ sudo apt-get install build-essential libssl-dev libpcre2-dev zlib1g-dev
server@ubuntu:~$ sudo PCRE2_SYSTEM=yes ./install.sh
```
:::
::: code-group-item Rocky
```shell-session
server@rocky:~$ wget https://github.com/ossec/ossec-hids/archive/3.6.0.tar.gz
server@rocky:~$ tar -zxvf 3.6.0.tar.gz
server@rocky:~$ cd ossec-hids-3.6.0/
server@rocky:~$ wget https://ftp.pcre.org/pub/pcre/pcre2-10.32.tar.gz
server@rocky:~$ tar -zxvf pcre2-10.32.tar.gz -C src/external/
server@rocky:~$ sudo apt-get install build-essential libssl-dev libpcre2-dev zlib1g-dev
server@rocky:~$ sudo PCRE2_SYSTEM=yes ./install.sh
```
:::
::::

In this setup we will not use e-mail notifications as we will be using Slack as our notification channel. We won't be adding IP addresses to our allow list now but in a later segment.

```shell-session{2,4,9}
[sudo] password for user: (en/br/cn/de/el/es/fr/hu/it/jp/nl/pl/ru/sr/tr) [en]: ENTER
What kind of installation do you want (server, agent, local, hybrid or help)? server
Choose where to install the OSSEC HIDS [/var/ossec/]: ENTER
Do you want e-mail notification? (y/n) [y]: n
Do you want to run the integrity check daemon? (y/n) [y]: y
Do you want to run the rootkit detection engine? (y/n) [y]: y
Do you want to enable active response? (y/n) [y]: y
Do you want to enable the firewall-drop response? (y/n) [y]: y
Do you want to add more IPs to the white list? (y/n)? [n]: n
Do you want to enable remote syslog (port 514 udp)? (y/n) [y]: y
--- Press ENTER to finish (maybe more information below). ---
```

## Server configuration

### Allow list

In the global section of the OSSEC configuration file add the IP addresses of the client(s) and services (e.g. OpenVAS) to allow.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml{6}
<global>
  <allow_list>127.0.0.1</allow_list>
  <allow_list>::1</allow_list>
  <allow_list>localhost.localdomain</allow_list>
  <allow_list>127.0.0.53</allow_list>
  <allow_list>192.168.0.2</allow_list> <!-- OSSEC client -->
</global>
```

### Remote syslog

To enable the function to harvest syslog we need to establish that our remote client connection is secure and then allow it. Add the client IP address within the remote section.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml{3}
<remote>
  <connection>secure</connection>
  <allowed-ips>192.168.0.2</allowed-ips> <!-- OSSEC client -->
</remote>
```

### Repeated offenders

The first time an IP is blocked it will be put on timeout for the default 600 seconds. If the IP is blocked again it will follow the defined repeated offenders list. To enable repeated offenders, add the entry in the active response config.

::: warning NOTE
Make sure that you add the repeated offenders entry at the top of the active response section in the ossec.conf file.
:::

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml
<!-- Active Response Config -->
<active-response>
  <!-- Specify a comma seperated list of timeouts per
    - re-incidence (in minutes).
    -->
  <repeated_offenders>30,60,120,240,480</repeated_offenders>
</active-response>
```

Save the config and restart OSSEC to confirm that the repeated offenders been added.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/ossec-control restart
Starting OSSEC HIDS v3.6.0...
2020/08/06 14:38:31 ossec-execd: INFO: Adding offenders timeout: 30 (for #1)
2020/08/06 14:38:31 ossec-execd: INFO: Adding offenders timeout: 60 (for #2)
2020/08/06 14:38:31 ossec-execd: INFO: Adding offenders timeout: 120 (for #3)
2020/08/06 14:38:31 ossec-execd: INFO: Adding offenders timeout: 240 (for #4)
2020/08/06 14:38:31 ossec-execd: INFO: Adding offenders timeout: 480 (for #5)
Started ossec-execd...
Started ossec-analysisd...
Started ossec-logcollector...
Started ossec-remoted...
Started ossec-syscheckd...
Started ossec-monitord...
Completed.
```

### PSAD rules

If PSAD Intrusion Detection is to be used, make sure to include the PSAD ruleset in the configuration file (as its not defined by default).

::: warning NOTE
Make sure that you add the the psad rules include before the local rules.
:::

```xml{1}
    <include>psad_rules.xml</include>
    <include>local_rules.xml</include>
</rules>
```

## Agent installation

To install OSSEC as an agent is the same approach as when installing the server. Download the [latest stable version](https://github.com/ossec/ossec-hids/releases) from ossec-hids GitHub. Download and install the dependencies. Extract the OSSEC source code and run the installation script.

```shell-session
client@ubuntu:~$ wget https://github.com/ossec/ossec-hids/archive/3.6.0.tar.gz
client@ubuntu:~$ tar -zxvf 3.6.0.tar.gz
client@ubuntu:~$ cd ossec-hids-3.6.0/
client@ubuntu:~$ wget https://ftp.pcre.org/pub/pcre/pcre2-10.32.tar.gz
client@ubuntu:~$ tar -zxvf pcre2-10.32.tar.gz -C src/external/
client@ubuntu:~$ sudo apt-get install build-essential libssl-dev libpcre2-dev zlib1g-dev
client@ubuntu:~$ sudo PCRE2_SYSTEM=yes ./install.sh
```

```shell-session{1,13,15,19,23}
1- What kind of installation do you want (server, agent, local, hybrid or help)? agent

  - Agent(client) installation chosen.

2- Setting up the installation environment.

 - Choose where to install the OSSEC HIDS [/var/ossec]: 

    - Installation will be made at  /var/ossec .

3- Configuring the OSSEC HIDS.

  3.1- What's the IP Address or hostname of the OSSEC HIDS server?: 192.168.0.1

  3.2- Do you want to run the integrity check daemon? (y/n) [y]: y

   - Running syscheck (integrity check daemon).

  3.3- Do you want to run the rootkit detection engine? (y/n) [y]: y

   - Running rootcheck (rootkit detection).

  3.4 - Do you want to enable active response? (y/n) [y]: y
```

## Agent configuration

Edit the agent configuration file and verify that the server IP address is correct. Continue with disabling email notifications.

```shell-session
client@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml{3,8}
<ossec_config>
  <client>
    <server-ip>192.168.0.1</server-ip>
    <config-profile></config-profile>
  </client>

  <global>
    <email_notification>no</email_notification>
  </global>
```

Proceed and add the following lines after the rootcheck segment to enable active response and repeated offenders.

```shell-session
client@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml
<command>
  <name>firewall-drop</name>
  <executable>firewall-drop.sh</executable>
  <expect>srcip</expect>
  <timeout_allowed>yes</timeout_allowed>
</command>

<!-- Active Response Config -->
<active-response>
  <!-- Specify a comma seperated list of timeouts per
     - re-incidence (in minutes).
    -->
  <repeated_offenders>30,60,120,240,480</repeated_offenders>
</active-response>

<active-response>
  <!-- Firewall Drop response. Block the IP for
    - 600 seconds on the firewall (iptables,
    - ipfilter, etc).
    -->
  <disabled>no</disabled>
  <command>firewall-drop</command>
  <agent_id>001</agent_id>
  <location>local</location>
  <rules_id></rules_id>
  <level>6</level>
  <timeout>600</timeout>
</active-response>
```

## Manage agents

To manage an agent we need to add the agent to our OSSEC server. Run the command shown in the code segment below and follow the instructions.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/manage_agents
```

```shell-session{5,10,14,15,16,22}
****************************************
* OSSEC HIDS v3.6.0 Agent manager.     *
* The following options are available: *
****************************************
   (A)dd an agent (A).
   (E)xtract key for an agent (E).
   (L)ist already added agents (L).
   (R)emove an agent (R).
   (Q)uit.
Choose your action: A,E,L,R or Q: A

- Adding a new agent (use '\q' to return to the main menu).
  Please provide the following:
   * A name for the new agent: client@ubuntu
   * The IP Address of the new agent: 192.168.0.2
   * An ID for the new agent[001]: 001
Agent information:
   ID:001
   Name:client@ubuntu
   IP Address:192.168.0.2

Confirm adding it?(y/n): y
```

Once we added the client, proceed by extracting its agent key by providing the assigned agent ID.

```shell-session{6,10,14,17}
****************************************
* OSSEC HIDS v3.6.0 Agent manager.     *
* The following options are available: *
****************************************
   (A)dd an agent (A).
   (E)xtract key for an agent (E).
   (L)ist already added agents (L).
   (R)emove an agent (R).
   (Q)uit.
Choose your action: A,E,L,R or Q: E

Available agents: 
   ID: 001, Name: client@ubuntu, IP: 192.168.0.2
Provide the ID of the agent to extract the key (or '\q' to quit): 001

Agent key information for '001' is: 
523b0d579891be85956bb3da6c757455005eaf1508ef578186431efbebf5901ecb467ddd857ed5dfdeb5b2cb00e8911c6d031=

** Press ENTER to return to the main menu.
```

Copy the agent key and head back to our OSSEC client and import the agent key. Execute the command, shown in the code section below, on the client and paste the key. Validate that our agent information is correct before adding it.

```shell-session
client@ubuntu:~$ sudo /var/ossec/bin/manage_agents
```

```shell-session{7,14,21}
****************************************
* OSSEC HIDS v3.6.0 Agent manager.     *
* The following options are available: *
****************************************
   (I)mport key from the server (I).
   (Q)uit.
Choose your action: I or Q: i

* Provide the Key generated by the server.
* The best approach is to cut and paste it.
*** OBS: Do not include spaces or new lines.

Paste it here (or '\q' to quit): 
523b0d579891be85956bb3da6c757455005eaf1508ef578186431efbebf5901ecb467ddd857ed5dfdeb5b2cb00e8911c6d031=

Agent information:
   ID:001
   Name:client@ubuntu
   IP Address:192.168.0.2

Confirm adding it?(y/n): y
Added.
```

Finally restart the OSSEC server and the client to enable and activate OSSEC HIDS.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/ossec-control restart
client@ubuntu:~$ sudo /var/ossec/bin/ossec-control restart
```

To confirm that our agent now is active, run the following command from the server.

```shell-session{1,5}
server@ubuntu:~$ sudo /var/ossec/bin/agent_control -lc

OSSEC HIDS agent_control. List of available agents:
   ID: 000, Name: server@ubuntu (server), IP: 127.0.0.1, Active/Local
   ID: 001, Name: client@ubuntu, IP: 192.168.0.2, Active
```

If the agent does not appear, make sure that the firewall settings are in place and that the correct ports are opened on both environments. See the [Firewall settings](#firewall-settings) section for more information.

## Windows agent

The following agent installation has been tested on Windows Server 2019 and Windows 10. Login to your OSSEC server and run the agent manager.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/manage_agents
```

Select option (A) to add our new Windows agent.

```shell-session{5,10}
****************************************
* OSSEC HIDS v3.6.0 Agent manager.     *
* The following options are available: *
****************************************
   (A)dd an agent (A).
   (E)xtract key for an agent (E).
   (L)ist already added agents (L).
   (R)emove an agent (R).
   (Q)uit.
Choose your action: A,E,L,R or Q: a
```

Enter the name of our Windows agent, specify its local IP address and attach an agent ID.

```shell-session{3,4,5,11}
- Adding a new agent (use '\q' to return to the main menu).
  Please provide the following:
   * A name for the new agent: client@windows
   * The IP Address of the new agent: 192.168.0.2
   * An ID for the new agent[001]: 001
Agent information:
   ID:001
   Name:client@windows
   IP Address:192.168.0.2

Confirm adding it?(y/n): y
```

Once we've created our new agent proceed to extract its agent key.

```shell-session{6,10,14}
****************************************
* OSSEC HIDS v3.6.0 Agent manager.     *
* The following options are available: *
****************************************
   (A)dd an agent (A).
   (E)xtract key for an agent (E).
   (L)ist already added agents (L).
   (R)emove an agent (R).
   (Q)uit.
Choose your action: A,E,L,R or Q: e

Available agents: 
   ID: 001, Name: client@windows, IP: 192.168.0.2
Provide the ID of the agent to extract the key (or '\q' to quit): 001
```

Copy the agent ID as we will need it when setting up the client machine.

```shell-session{2}
Agent key information for '001' is: 
xasdEGdh321ieC1i321wMSAxOTIuMTY4Ljg4LjYwIGRjdaszcxODVmZTY3N2U1M43156dasdaE5YjgyNzg2M2fsat6421WJhMDkzNjI3MTM4ZDk3ZGFhxsaRyvfYzExMDg1YTQ=
```

Login to the Windows Server 2019 client machine and download the latest OSSEC windows agent client (in this case [3.6.0](https://updates.atomicorp.com/channels/atomic/windows/ossec-agent-win32-3.6.0-12032.exe)). Otherwise you can find the latest release [here](https://www.ossec.net/downloads/) (under the latest stable releases and *Agent Windows*). Run the executable file.

<img class="zoom-custom-imgs" :src="('/img/ossec/windows_agent_setup.png')" alt="Windows setup">

Accept the current terms and agreements and proceed with the installation. In the next step you will be able to select which components to monitor. If you run a Windows web server keep the option to scan and monitor IIS logs checked (in this tutorial we do not use it).

<img class="zoom-custom-imgs" :src="('/img/ossec/windows_agent_components.png')" alt="Windows components">

Once we've completed the installation we will be presented the OSSEC Windows Agent Manager. Add the OSSEC server IP and the Authentication key we did copy in earlier section. Press save.

<img class="zoom-custom-imgs" :src="('/img/ossec/windows_agent_manager.png')" alt="Windows manager">

Next update the firewall settings on our OSSEC server (see [Firewall Settings](https://www.libellux.com/ossec/#firewall-settings)) and add the Windows agent client IP address to the remote connection and allowed IPS section in the OSSEC server configuration file.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml{2,7}
<global>
  <allow_list>192.168.0.2</allow_list> <!-- OSSEC client -->
</global>

<remote>
  <connection>secure</connection>
  <allowed-ips>192.168.0.2</allowed-ips> <!-- OSSEC client -->
</remote>
```

Finally, to check if our new Windows agent is active run the agent control command as following.

```shell-session
server@ubuntu:~$ /var/ossec/bin/agent_control -lc
```

```shell-session{3}
OSSEC HIDS agent_control. List of available agents:
   ID: 000, Name: server@ubuntu (server), IP: 127.0.0.1, Active/Local
   ID: 001, Name: client@windows, IP: 192.168.0.2, Active
```

## Agentless monitoring

::: tip INFO
The agentless monitoring has so far only been tested with VMware ESXi 6.7. The result is still not 100% but will give an overview on how to configure your agentless servers or devices.
:::

Generate SSH keys for the OSSEC user.

```shell-session
server@ubuntu:~$ sudo -u ossec ssh-keygen
```

If receiving `Saving key "/var/ossec/.ssh/id_rsa" failed: Permission denied` make sure that OSSEC is the directory owner of `.ssh/`.

```shell-session
server@ubuntu:~$ sudo chown -R ossec:ossec .ssh/
server@ubuntu:~$ sudo -u ossec ssh-keygen
```

### VMware ESXi

Login as the administrator through the vSphere client. Go to the *Host*, *Manage* and Advanced settings under the *System* tab.

<img class="zoom-custom-imgs" :src="('/img/ossec/remote_syslog_settings.png')" alt="VMware syslog settings">

Filter by *syslog* and find the `Syslog.global.logHOST` parameter. Right click and select *Edit option* and set our remote OSSEC host.

<img class="zoom-custom-imgs" :src="('/img/ossec/remote_syslog_value.png')" alt="VMware syslog options">

Additionally we need to edit the `/etc/profile.local` file for our VMware ESXi SSH prompt as the agentless service expects the prompt to end with either `#` or `$`. As administrator SSH to the VMware ESXi shell and using the vi editor append the following line.

```bash
# profile.local
# This file is not used when UEFI secure boot is enabled
PS1="\e[0;41m[\u@\h \W]\$ \e[m"
```

### Enabling agentless monitoring

To enable agentless monitoring go back to our OSSEC server and execute the following command.

```shell-session
server@ubuntu:~$ /var/ossec/bin/ossec-control enable agentless
```

Proceed to add VMware ESXi server. as agentless, using the *NOPASS* option as we're using SSH keys to authenticate.

```shell-session
server@ubuntu:~$ /var/ossec/agentless/register_host.sh add root@192.168.0.2 NOPASS
```

To test if the authentication works you can run the command below.

```shell-session
server@ubuntu:~$ sudo -u ossec ssh root@192.168.0.2
```

### Configure agentless monitoring

For more information regarding setting up and configure agentless monitoring check the OSSEC documentation [here](https://www.ossec.net/docs/manual/agent/agentless-monitoring.html).

Open the OSSEC configuration file and add the VMware ESXi IP address to the remote syslog section.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml
  <remote>
    <connection>syslog</connection>
    <allowed-ips>192.168.0.2</allowed-ips> <!-- VMware ESXi -->
  </remote>
```

Additionally add the agentless types to our configuration.

```xml
  <agentless>
    <type>ssh_integrity_check_bsd</type>
    <frequency>36000</frequency>
    <host>root@192.168.0.2</host> <!-- VMware ESXi -->
    <state>periodic</state>
    <arguments>/bin /etc/ /sbin</arguments>
  </agentless>

  <agentless>
    <type>ssh_generic_diff</type>
    <frequency>36000</frequency>
    <host>root@192.168.0.2</host> <!-- VMware ESXi -->
    <state>periodic_diff</state>
    <arguments>ls -la /etc; cat /etc/passwd</arguments>
  </agentless>
```

Finally restart OSSEC.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/ossec-control restart
```

## Firewall settings

The firewall being used is UFW (Uncomplicated Firewall). It is set by default to deny incoming traffic, allow outgoing traffic and allow port 22 (OpenSSH). Read more about UFW [here](https://help.ubuntu.com/community/UFW).

::: details UFW Settings
```shell-session
server@ubuntu:~$ sudo ufw default deny incoming
server@ubuntu:~$ sudo ufw default allow outgoing
server@ubuntu:~$ sudo ufw allow 22
server@ubuntu:~$ sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
```
:::

```shell-session
server@ubuntu:~$ sudo ufw allow proto udp from 192.168.0.2 to any port 1514 comment "OSSEC client"
server@ubuntu:~$ sudo ufw allow proto udp from 192.168.0.2 to any port 514 comment "OSSEC client syslog"
```

## Slack integration

Download [OSSEC icon](/img/ossec/512x512.png) for the Slack App integration.

Add the ossec-slack command within the command section of the OSSEC configuration file.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

To send all alerts to Slack with the pre-defined alert level, leave the expect segment blank.

```xml
<command>
  <name>ossec-slack</name>
  <executable>ossec-slack.sh</executable>
  <expect></expect> <!-- no expect args required -->
  <timeout_allowed>no</timeout_allowed>
</command>
```

In the active response section we'll set the alert level.

```xml
<active-response>
  <command>ossec-slack</command>
  <location>server</location>
  <level>6</level>
</active-response>
```

Next edit the `ossec-slack.sh` file to match our Slack App settings.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/active-response/bin/ossec-slack.sh
```

::: warning NOTE
Make sure that the log path is correct `/../` in the ossec-slack.sh file.
:::

```bash{3,10}
SLACKUSER="OSSEC"
CHANNEL="#ossec-hids"
SITE="https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXX/XXXXXXXXXXX"
SOURCE="ossec2slack"
...
# Logging
cd $LOCAL
cd ../
PWD=`pwd`
echo "`date` $0 $1 $2 $3 $4 $5 $6 $7 $8" >> ${PWD}/../logs/active-responses.log
```

Save the file and reload OSSEC and we should now start receive alerts to our defined channel.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/ossec-control reload
```

## Cloudflare integration

::: warning NOTE
The Cloudflare integration requires you to have the jq (JSON processing) tool installed. This tool is used when removing blocked IP's following the repeated offenders timeout interval.
:::

```shell-session
server@ubuntu:~$ sudo apt-get install jq
```

First add the cloudflare-ban command to the OSSEC configuration file.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml
<command>
  <name>cloudflare-ban</name>
  <executable>cloudflare-ban.sh</executable>
  <timeout_allowed>yes</timeout_allowed>
  <expect>srcip</expect>
</command>
```

As well to the active response section. Here we set to block all alerts level 6 or greater. 

```xml
<active-response>
  <command>cloudflare-ban</command>
  <location>server</location>
  <level>6</level>
  <timeout>43200</timeout>
</active-response>
```

Next proceed to update the `cloudflare-ban.sh` script and put your Cloudflare username along with your Global API key.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/active-response/bin/cloudflare-ban.sh
```

```bash{5,6}
ACTION=$1
USER=$2
IP=$3
PWD=`pwd`
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9ey'
USER='cloudflareuser@email.com'
MODE='block' # block or challenge
```

Save the changes and reload OSSEC.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/ossec-control reload
```

To monitor the blocked IP address within the Cloudflare account, go to Firewall, Tools and under IP Access Rules.

## Monitoring

To monitor if the OSSEC daemons are running accordingly, we use Monit to monitor the current status. Edit the Monit configuration file and add the lines below, continue with reloading the Monit daemon to apply the new monitoring rules. If working correctly we shall now receive M/Monit alerts saying processes is not running.

```shell-session
client@ubuntu:~$ sudo nano /usr/local/etc/monitrc
```

```bash
# OSSEC processes
check process ossec-agentd matching "ossec-agentd"
check process ossec-execd matching "ossec-execd"
check process ossec-logcollector matching "ossec-logcollector"
check process ossec-syscheckd matching "ossec-syscheckd"
```

Save and reload Monit.

```shell-session
client@ubuntu:~$ cd /usr/local/
client@ubuntu:~$ sudo ./bin/monit reload
```

### Monitor failed M/Monit login attempts with OSSEC

Add the M/Monit error.log path to the OSSEC monitor section (local files).

```shell-session
client@ubuntu:~$ sudo nano /var/ossec/etc/ossec.conf
```

```xml
<localfile>
    <log_format>syslog</log_format>
    <location>/usr/local/mmonit-3.7.2/logs/error.log</location>
</localfile>
```

Go to the OSSEC server and add the custom rule to the `local_rules.xml` file.

```shell-session
server@ubuntu:~$ sudo nano /var/ossec/rules/local_rules.xml
```

```xml
<rule id="100101" level="6">
  <if_sid>2501</if_sid>
  <match>Unauthorized, authentication failed for</match>
  <group>authentication_failed,</group>
  <description>User authentication failure.</description>
</rule>
```

Save and reload the OSSEC server.

```shell-session
server@ubuntu:~$ sudo /var/ossec/bin/ossec-control reload
```

## Upgrading

To upgrade OSSEC, download the [latest release](https://github.com/ossec/ossec-hids/releases), extract the file and run the install script. The installer will tell if OSSEC is already installed and if you wish to update it.

```shell-session
server@ubuntu:~$ wget https://github.com/ossec/ossec-hids/archive/3.6.0.tar.gz
server@ubuntu:~$ tar -zxvf 3.6.0.tar.gz
server@ubuntu:~$ cd ossec-hids-3.6.0/
server@ubuntu:~$ wget https://ftp.pcre.org/pub/pcre/pcre2-10.32.tar.gz
server@ubuntu:~$ tar -zxvf pcre2-10.32.tar.gz -C src/external/
server@ubuntu:~$ sudo apt-get install build-essential libssl-dev libpcre2-dev zlib1g-dev
server@ubuntu:~$ sudo PCRE2_SYSTEM=yes ./install
```

### Upgrade to OSSEC 3.3.0

To upgrade to OSSEC 3.3.0 using the pcre2 package, download the new version along with the pcre2 package, extract and upgrade OSSEC as normal.

```shell-session
server@ubuntu:~$ wget https://github.com/ossec/ossec-hids/archive/3.3.0.tar.gz
server@ubuntu:~$ tar -zxvf 3.3.0.tar.gz
server@ubuntu:~$ cd ossec-hids-3.3.0/
server@ubuntu:~$ wget https://ftp.pcre.org/pub/pcre/pcre2-10.32.tar.gz
server@ubuntu:~$ tar -zxvf pcre2-10.32.tar.gz -C src/external/
server@ubuntu:~$ sudo apt-get install build-essential libssl-dev libpcre2-dev zlib1g-dev
server@ubuntu:~$ sudo PCRE2_SYSTEM=yes ./install
```

```shell-session{12}
OSSEC HIDS v2.9.3 Installation Script - http://www.ossec.net
 
You are about to start the installation process of the OSSEC HIDS.
You must have a C compiler pre-installed in your system.
 
    - System: Linux hostname 4.4.0-116-generic
    - User: root
    - Host: hostname

    -- Press ENTER to continue or Ctrl-C to abort. --

    - You already have OSSEC installed. Do you want to update it? (y/n): y
```

## Custom rules

Read more about how to create custom rules and decoders [here](https://www.ossec.net/docs/manual/rules-decoders/create-custom.html).

* [local_rules.xml](https://github.com/libellux/Libellux-Up-and-Running/blob/master/docs/ossec/config/local_rules.xml)

### Ignore snap loop devices

`/var/ossec/rules/local_rules.xml`

```xml
<rule id="100100" level="0">
  <if_sid>531</if_sid>
  <regex>'df -P':\s+/dev/loop\d+\s+\d+\s+\d+\s+0\s+100%\s+/snap/\w+/\d+</regex>
  <description>Ignore full snap loop devices.</description>
</rule>
```

### Monitor failed M/Monit authentication

`/var/ossec/rules/local_rules.xml`

```xml
<rule id="100101" level="6">
  <if_sid>2501</if_sid>
  <match>Unauthorized, authentication failed for</match>
  <group>authentication_failed,</group>
  <description>User authentication failure.</description>
</rule>
```

`/var/ossec/etc/oseec.conf`

```xml
<localfile>
  <log_format>syslog</log_format>
  <location>/usr/local/mmonit-3.7.2/logs/error.log</location>
</localfile>
```

### Mute useless systemd-resolved message

`/var/ossec/rules/local_rules.xml`

```xml
<rule id="100102" level="0">
  <program_name>systemd-resolved</program_name>
  <match>Server returned error NXDOMAIN</match>
  <description>Useless systemd-resolved log message.</description>
</rule>
```

### Alert on fail2ban action

`/var/ossec/rules/local_rules.xml`

```xml
<rule id="100103" level="6">
  <match>fail2ban.actions</match>
  <group>authentication_failed,</group>
  <description>Fail2ban action taken.</description>
</rule>
```

`/var/ossec/etc/oseec.conf`

```xml
<localfile>
  <log_format>syslog</log_format>
  <location>/var/log/fail2ban.log</location>
</localfile>
```

## Command-line

Command|Description
-------|-----------
/var/ossec/bin/agent_control -lc|List all active agents
/var/ossec/bin/ossec-logtest|Logtest
/var/ossec/bin/ossec-control|start,stop,reload,restart,status,enable,disable
/var/ossec/bin/manage_agents|manage agents (e.g., add, remove)

## Troubleshooting

If you encounter any issue or having questions regarding OSSEC I recommend using their very helpful [mailing list](https://groups.google.com/forum/#!forum/ossec-list).

You can also read more about debug mode and how to view more verbose logs [here](https://www.ossec.net/docs/faq/unexpected.html).

[Questions](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose), [comments](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose), or [problems](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose) regarding this service? Create an issue [here](https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose) or contact [webmaster@libellux.com](mailto:webmaster@libellux.com).

### Duplicate counter error

In the OSSEC log (/var/ossec/logs/ossec.log) you might notice that the log gets filled with warnings and errors as shown below.

```shell-session
2019/02/21 13:33:21 ossec-remoted: WARN: Duplicate error: [...]
2019/02/21 13:33:21 ossec-remoted(1407): ERROR: Duplicated counter for [...]
```

Stop both the OSSEC manager and the agent. In the agent server go to /var/ossec/queue/rids and remove all the files within the folder. At the manager server go into /var/ossec/queue/rids and remove the file corresponding to the agents ID. Do not delete the sender_counter. Restart both.

Or disable the feature by editing `/var/ossec/etc/internal_options.conf`

    # Verify msg id (set to 0 to disable it)
    remoted.verify_msg_id=0

Save and restart.

### build-essential

If receiving build error `./install.sh: 105: make: not found` install the build-essential package `sudo apt-get install build-essential`.

### libevent-dev

If receiving the build error below, install the libevent development package `sudo apt-get install libevent-dev`.

    os_maild/sendmail.c:12:10: fatal error: event.h: No such file or directory
    12 | #include <event.h>
       |          ^~~~~~~~~
    compilation terminated.
    make: *** [Makefile:926: os_maild/sendmail.o] Error 1

### pcre2 & libpcre2-dev

If receiving the build error `./os_regex/os_regex.h:19:10: fatal error: pcre2.h: No such file or directory` download and install pcre2 package (version 10.32) found [here](https://ftp.pcre.org/pub/pcre/).

```shell-session
server@ubuntu:~$ wget https://ftp.pcre.org/pub/pcre/pcre2-10.32.tar.gz
server@ubuntu:~$ tar -zxvf pcre2-10.32.tar.gz -C src/external/
```

If the build error persist, make sure to install the libpcre2 development package `sudo apt-get install libpcre2-dev`.

### zlib1g-dev

If receiving the build error `os_zlib/os_zlib.c:13:10: fatal error: zlib.h: No such file or directory` install the zlib1g development package `sudo apt-get install zlib1g-dev`.

### libssl-dev

If receiving the build error `./external/compat/includes.h:65:10: fatal error: openssl/opensslv.h: No such file or directory` install the libssl development package `sudo apt-get install libssl-dev`.

### Ignore snap partition state

If receiving multiple snap partition usage alerts, add a custom rule to local_rules.xml.

```shell-session
Rule: 531 (level 7) -> 'Partition usage reached 100% (disk space monitor).'
ossec: output: 'df -P': /dev/loop0           27776   27776         0     100% /snap/snapd/7264
```

```xml
<rule id="100100" level="0">
  <if_sid>531</if_sid>
  <regex>'df -P':\s+/dev/loop\d+\s+\d+\s+\d+\s+0\s+100%\s+/snap/\w+/\d+</regex>
  <description>Ignore full snap loop devices</description>
</rule>
```

### Server returned error NXDOMAIN

If receiving multiple systemd-resolved regarding NXDOMAIN and potential DNS violation, add a custom rule to local_rules.xml.

```shell-session
systemd-resolved[3225]: message repeated 4 times: [ Server returned error NXDOMAIN, mitigating potential DNS violation DVE-2018-0001, retrying transaction with reduced feature level UDP.]
```

```xml
<rule id="100102" level="0">
  <program_name>systemd-resolved</program_name>
  <match>Server returned error NXDOMAIN</match>
  <description>Useless systemd-resolved log message.</description>
</rule>
```

### Cannot unlink /queue/rids/sender

If receiving the error message shown below.

```shell-session
2020/08/09 20:04:17 manage_agents: ERROR: Cannot unlink /queue/rids/sender: No such file or directory
Added.
```

Proceed with creating the missing file `sudo touch /queue/rids/sender`.

## Recommended reading <Badge text="affiliate links" type="warning"/>

* [Instant OSSEC Host-based Intrusion Detection, Lhotsky Brad, 2013](https://amzn.to/3oDUNys)
* [OSSEC Host-Based Intrusion Detection Guide, Rory Bray, 2008](https://amzn.to/2TCKKLP)

## Enterprise solutions <Badge text="non-sponsored" type="default"/>

### Atomic Enterprise OSSEC

Atomic Enterprise OSSEC is built specifically for organizations that need to leverage OSSEC in large or mission critical environments. With a dedicated management console, thousands of pre-built OSSEC rules, compliance reporting, and more, Atomic Enterprise OSSEC makes it easy to deploy, manage, and use OSSEC in any on-premise, cloud, or hybrid environment.

[Atomic Enterprise OSSEC](https://atomicorp.com/atomic-enterprise-ossec/)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B31BJU3)
