<template><div><h1 id="m-monit-system-monitoring" tabindex="-1"><a class="header-anchor" href="#m-monit-system-monitoring" aria-hidden="true">#</a> M/Monit System Monitoring</h1>
<p>Monit is a small popular Open Source utility for managing and monitoring Unix systems. M/Monit builds on Monit's capabilities and provides monitoring and management of all your Monit enabled hosts via a modern, clean and well designed user interface which also works on mobile devices.</p>
<p><a href="https://mmonit.com/" target="_blank" rel="noopener noreferrer">M/Monit website<ExternalLinkIcon/></a> <a href="https://mmonit.com/monit/" target="_blank" rel="noopener noreferrer">Monit website<ExternalLinkIcon/></a> <a href="https://bitbucket.org/tildeslash/monit/src/master/" target="_blank" rel="noopener noreferrer">Git<ExternalLinkIcon/></a></p>
<p>Setup and configuration have been tested on following operating systems:</p>
<h3 id="m-monit" tabindex="-1"><a class="header-anchor" href="#m-monit" aria-hidden="true">#</a> M/Monit</h3>
<ul>
<li>Ubuntu- 16.04, 18.04, 20.04 (Focal Fossa)</li>
<li>M/Monit- 3.6.0 -&gt; 3.7.5</li>
</ul>
<h3 id="monit" tabindex="-1"><a class="header-anchor" href="#monit" aria-hidden="true">#</a> Monit</h3>
<ul>
<li>Ubuntu- 16.04, 18.04, 20.04</li>
<li>Monit- 5.16.0 -&gt; 5.27.0</li>
</ul>
<p><a href="https://ko-fi.com/B0B31BJU3" target="_blank" rel="noopener noreferrer"><img src="https://www.ko-fi.com/img/githubbutton_sm.svg" alt="ko-fi"><ExternalLinkIcon/></a></p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>M/Monit is a non-free software to montior and manage all Monit enabled hosts. 30 days free trial.</p>
</div>
<h2 id="configuration-files" tabindex="-1"><a class="header-anchor" href="#configuration-files" aria-hidden="true">#</a> Configuration files</h2>
<ul>
<li><a href="https://github.com/libellux/Libellux-Up-and-Running/blob/master/docs/mmonit/config/server.xml" target="_blank" rel="noopener noreferrer">server.xml<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/libellux/Libellux-Up-and-Running/blob/master/docs/mmonit/config/monitrc" target="_blank" rel="noopener noreferrer">monitrc<ExternalLinkIcon/></a></li>
</ul>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2>
<p>Dependancies when building or upgrading Monit from source.</p>
<ul>
<li><code v-pre>zlib1g-dev</code></li>
<li><code v-pre>libssl-dev</code></li>
<li><code v-pre>libpam0g-dev</code></li>
<li><code v-pre>ruby-full</code> (optional)</li>
</ul>
<h2 id="m-monit-installation" tabindex="-1"><a class="header-anchor" href="#m-monit-installation" aria-hidden="true">#</a> M/Monit Installation</h2>
<p>For additional information see reference <a href="https://mmonit.com/documentation/mmonit_manual.pdf" target="_blank" rel="noopener noreferrer">M/Monit documentation<ExternalLinkIcon/></a>.</p>
<p>To download the latest version of M/Monit visit the <a href="https://mmonit.com/download/" target="_blank" rel="noopener noreferrer">official website<ExternalLinkIcon/></a>. Continue to extract the file and move it to <code v-pre>/usr/local/mmonit/</code>.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ wget https://mmonit.com/dist/mmonit-3.7.5-linux-x64.tar.gz
server@ubuntu:~$ tar -zxvf mmonit-3.7.5-linux-x64.tar.gz
server@ubuntu:~$ rm mmonit-3.7.5-linux-x64.tar.gz
server@ubuntu:~$ sudo mv mmonit-3.7.5/ /usr/local/mmonit/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now you can visit M/Monit at <code v-pre>http://192.168.0.1:8080</code> if executing the command <code v-pre>sudo ./mmonit</code> from <code v-pre>/usr/local/mmonit-3.7.5/bin/</code> (Dont forget to check <a href="#firewall-settings">Firewall settings</a>). However, we strongly recommend to run M/Monit with TLS support.</p>
<h3 id="enable-tls" tabindex="-1"><a class="header-anchor" href="#enable-tls" aria-hidden="true">#</a> Enable TLS</h3>
<p>To enable M/Monit to run with TLS comment out the port 8080 connector and uncomment the SSL/TLS connector to listen on port 8443. Proceed to update the host section and define the server IP address along with the certificate path.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ sudo nano /usr/local/mmonit/conf/server.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token comment">&lt;!--
        &lt;Connector address="*" port="8080" processors="10" />
        --></span>

        <span class="token comment">&lt;!-- Define a SSL/TLS HTTP/1.1 Connector on port 8443 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Connector</span> <span class="token attr-name">scheme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https<span class="token punctuation">"</span></span> <span class="token attr-name">address</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>*<span class="token punctuation">"</span></span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8443<span class="token punctuation">"</span></span> <span class="token attr-name">processors</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10<span class="token punctuation">"</span></span> <span class="token attr-name">secure</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

        <span class="token comment">&lt;!--
            Define the default virtual host which name must match the
            Engine defaultHost attribute
        --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Host</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>localhost<span class="token punctuation">"</span></span> <span class="token attr-name">appBase</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>.<span class="token punctuation">"</span></span> <span class="token attr-name">address</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>192.168.0.1<span class="token punctuation">"</span></span> <span class="token attr-name">certificate</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>conf/mmonit.pem<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><div class="highlight-line">&nbsp;</div></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="add-m-monit-to-systemd" tabindex="-1"><a class="header-anchor" href="#add-m-monit-to-systemd" aria-hidden="true">#</a> Add M/Monit to systemd</h3>
<p>To simplify the process to start and stop M/Monit add it to the systemd. First create a mmonit.service file, paste the below and save.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ sudo nano /etc/systemd/system/mmonit.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
Description <span class="token operator">=</span> Easy, proactive monitoring of Unix systems, network and cloud services
After <span class="token operator">=</span> network.target
<span class="token assign-left variable">Documentation</span><span class="token operator">=</span> https://mmonit.com/documentation/ 

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">KillMode</span><span class="token operator">=</span>process
ExecStart <span class="token operator">=</span> /usr/local/mmonit/bin/mmonit -i
ExecStop <span class="token operator">=</span> /usr/local/mmonit/bin/mmonit stop
PIDFile <span class="token operator">=</span> /usr/local/mmonit/logs/mmonit.pid
Restart <span class="token operator">=</span> on-abnormal

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
WantedBy <span class="token operator">=</span> multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next reload the systemd daemon, enable our newly configured M/Monit service and then start it.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ sudo systemctl daemon-reload
server@ubuntu:~$ sudo systemctl enable mmonit
server@ubuntu:~$ sudo systemctl start mmonit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Go to your browser and visit <code v-pre>https://192.168.0.1:8443</code>. Login using the default credentials user <code v-pre>admin</code> with the default password <code v-pre>swordfish</code>. Click the <strong>Admin</strong> tab, select <strong>Users</strong> and edit (default admin accout) or add a new user. Then grant administration privileges to overwrite the default credentials.</p>
<img class="zoom-custom-imgs" :src="('/img/mmonit/mmonit_login.png')" alt="mmonit login">
<h2 id="monit-installation" tabindex="-1"><a class="header-anchor" href="#monit-installation" aria-hidden="true">#</a> Monit Installation</h2>
<p>First install the PAM development package to enable Pluggable Authentication Modules (PAM) support.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ sudo apt-get install libpam0g-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Next install the latest version of Monit as an agent for M/Monit enter the commands below.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ wget https://bitbucket.org/tildeslash/monit/downloads/monit-5.27.0.tar.gz
client@ubuntu:~$ tar -zxvf monit-5.27.0.tar.gz
client@ubuntu:~$ cd monit-5.27.0/
client@ubuntu:~$ sudo ./configure
client@ubuntu:~$ sudo make &amp;&amp; sudo make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tls-ssl-settings" tabindex="-1"><a class="header-anchor" href="#tls-ssl-settings" aria-hidden="true">#</a> TLS/SSL settings</h3>
<p>Create a TLS certificate for Monit to enable secure transmission to M/Monit.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ sudo openssl req -new -newkey rsa:2048 -x509 -days 730 -nodes -out /etc/monit/monit.pem -keyout /etc/monit/monit.pem
client@ubuntu:~$ sudo chmod 700 /etc/monit/monit.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration" aria-hidden="true">#</a> Configuration</h2>
<p>Copy the default Monit configuration file and create an backup.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ sudo cp monitrc /usr/local/etc/
client@ubuntu:~$ cd /usr/local/etc
client@ubuntu:~$ sudo cp monitrc monitrc_bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next edit the Monit configuration file to enable communication with M/Monit over TLS/SSL.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ sudo nano monitrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## Set global SSL options (just most common options showed, see manual for</span>
<span class="token comment">## full list).</span>
<span class="token comment">#</span>
<span class="token builtin class-name">set</span> ssl <span class="token punctuation">{</span>
     verify: <span class="token builtin class-name">enable</span>
     selfsigned: allow
<span class="token punctuation">}</span>

<span class="token builtin class-name">set</span> mmonit https://USERNAME:PASSWORD@192.168.0.1:8443/collector
<span class="token comment">#     # with timeout 30 seconds              # Default timeout is 5 seconds</span>
<span class="token comment">#     # and register without credentials     # Don't register credentials</span>

<span class="token comment">#</span>
<span class="token builtin class-name">set</span> httpd port <span class="token number">2812</span> and
    <span class="token comment">#use address localhost      # only accept connection from localhost (drop if you use M/Monit)</span>
    allow localhost             <span class="token comment"># allow localhost to connect to the server and</span>
    allow <span class="token number">192.168</span>.0.1           <span class="token comment"># allow M/Monit</span>
    allow USERNAME:PASSWORD     <span class="token comment"># require user 'admin' with password 'monit'</span>
    with ssl <span class="token punctuation">{</span>                  <span class="token comment"># enable SSL/TLS and set path to server certificate</span>
        pemfile: /etc/monit/monit.pem
        version: TLSv12
        ciphers: <span class="token string">"ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384"</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="firewall-settings" tabindex="-1"><a class="header-anchor" href="#firewall-settings" aria-hidden="true">#</a> Firewall settings</h2>
<p>The firewall being used is UFW (Uncomplicated Firewall). It is set by default to deny incoming traffic, allow outgoing traffic and allow port 22 (OpenSSH). Read more about UFW <a href="https://help.ubuntu.com/community/UFW" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>.</p>
<details class="custom-container details"><summary>UFW Settings</summary>
<div class="language-console ext-console line-numbers-mode"><pre v-pre class="language-console"><code>server@ubuntu:~$ sudo ufw default deny incoming
server@ubuntu:~$ sudo ufw default allow outgoing
server@ubuntu:~$ sudo ufw allow 22
server@ubuntu:~$ sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>For non SSL/TLS allow port 8080.</p>
</div>
<div class="language-console ext-console line-numbers-mode"><pre v-pre class="language-console"><code>server@ubuntu:~$ sudo ufw allow 8443 comment &quot;Monit&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-console ext-console line-numbers-mode"><pre v-pre class="language-console"><code>client@ubuntu:~$ sudo ufw allow from 192.168.0.1 to any port 2812 comment &quot;M/Monit&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Start Monit.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ sudo /usr/local/bin/monit start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="m-monit-behind-nginx-proxy" tabindex="-1"><a class="header-anchor" href="#m-monit-behind-nginx-proxy" aria-hidden="true">#</a> M/Monit behind NGINX Proxy</h2>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>   Host             <span class="token variable">$http_host</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>   X-Real-IP        <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>   REMOTE_HOST      <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>   X-Forwarded-For  <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_set_header</span>   X-FORWARDED-PROTOCOL <span class="token variable">$scheme</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">rewrite</span> ^/(.*) /<span class="token variable">$1</span> break</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_redirect</span> http://192.168.0.1:8080 /</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">proxy_cookie_path</span> / /</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="slack-notifications" tabindex="-1"><a class="header-anchor" href="#slack-notifications" aria-hidden="true">#</a> Slack notifications</h2>
<p>Download <a href="https://bitbucket.org/tildeslash/monit/downloads/Monit-Icons.zip" target="_blank" rel="noopener noreferrer">M/Monit icons<ExternalLinkIcon/></a> for the Slack App integration.</p>
<p>Start with installing Ruby to send our notifications.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ sudo apt-get install ruby-full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Proceed to go to Slack and the section for managing apps and select <em>Build</em>. Give your new App an name e.g. M/Monit and connect it to an workspace. Then you'll be presented multiple options select, <em>Incoming Webhooks</em> under the <em>Add features and functionality section</em>. Activate Incoming Webhooks. Click the button <em>Add New Webhook to Workspace</em>.</p>
<img class="zoom-custom-imgs" :src="('/img/mmonit/slack_incoming_webhook.png')" alt="mmonit slack incoming webhook">
<p>Next you will be able to select to which channel you want the notifications to be sent to (works with private channels as well). Select your preferred channel and you will get redirected back and presented with the applications webhook URL. Copy the webhook URL for later.</p>
<p>Head back to M/Monit and in the menu under <em>Admin</em> click the <em>Alerts</em> option (<code v-pre>https://192.168.0.1.8443/admin/alerts/</code>). Create a new alert with the following conditions: <em>Any Host</em>, <em>Any Service</em>, <em>Any State</em>, <em>Any Event</em> and then select <em>Execute program</em> as the action. In the input field besides the <em>Execute program</em> paste the Ruby code with correct webhook URL and specified channel.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Make sure to add line breaks as in the code segment below</p>
</div>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>ruby <span class="token operator">-</span>e "
    <span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'net/https'</span></span>
    <span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'json'</span></span>
    uri <span class="token operator">=</span> <span class="token constant">URI</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ'</span></span><span class="token punctuation">)</span>
    http <span class="token operator">=</span> Net<span class="token double-colon punctuation">::</span><span class="token class-name">HTTP</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>uri<span class="token punctuation">.</span>host<span class="token punctuation">,</span> uri<span class="token punctuation">.</span>port<span class="token punctuation">)</span>
    http<span class="token punctuation">.</span>use_ssl <span class="token operator">=</span> <span class="token boolean">true</span>
    request <span class="token operator">=</span> Net<span class="token double-colon punctuation">::</span><span class="token constant">HTTP</span><span class="token double-colon punctuation">::</span><span class="token class-name">Post</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>uri<span class="token punctuation">.</span>request_uri<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string-literal"><span class="token string">'Content-Type'</span></span> <span class="token operator">=></span> <span class="token string-literal"><span class="token string">'application/json'</span></span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    request<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span> \"channel\"  <span class="token operator">=></span> \"<span class="token comment">#general\", \"username\" => \"mmonit\", \"text\" => \"[#{ENV['MONIT_HOST']}] #{ENV['MONIT_SERVICE']} - #{ENV['MONIT_DESCRIPTION']}\" }.to_json</span>
    response <span class="token operator">=</span> http<span class="token punctuation">.</span>request<span class="token punctuation">(</span>request<span class="token punctuation">)</span>
    puts response<span class="token punctuation">.</span>body
"
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next run the test to see if the integration is working correctly. You should receive test output ok and a test notification should be sent to your specific Slack channel.</p>
<img class="zoom-custom-imgs" :src="('/img/mmonit/slack_alert.png')" alt="mmonit slack alert">
<p>If you do not use M/Monit you can also configure the individual Monit instance to add Slack notifications. Read more at <a href="https://mmonit.com/wiki/MMonit/SlackNotification" target="_blank" rel="noopener noreferrer">Tideslash Wiki<ExternalLinkIcon/></a>.</p>
<h2 id="upgrading" tabindex="-1"><a class="header-anchor" href="#upgrading" aria-hidden="true">#</a> Upgrading</h2>
<p>Upgrading M/Monit without overwriting configuration files and databases can be done using the built-in upgrade command.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ cd /usr/local/
server@ubuntu:~$ wget https://mmonit.com/dist/mmonit-3.7.0-linux-x64.tar.gz
server@ubuntu:~$ tar -zxvf mmonit-3.7.0-linux-x64.tar.gz
server@ubuntu:~$ cd /usr/local/mmonit-3.6.2/bin/
server@ubuntu:~$ sudo ./mmonit stop
server@ubuntu:~$ /usr/local/mmonit-3.7.0/upgrade/upgrade -p /usr/local/mmonit-3.6.2/
server@ubuntu:~$ cd /usr/local/mmonit-3.7.0/bin/
server@ubuntu:~$ sudo ./mmonit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="command-line" tabindex="-1"><a class="header-anchor" href="#command-line" aria-hidden="true">#</a> Command-line</h2>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting" aria-hidden="true">#</a> Troubleshooting</h2>
<p><a href="https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose" target="_blank" rel="noopener noreferrer">Questions<ExternalLinkIcon/></a>, <a href="https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose" target="_blank" rel="noopener noreferrer">comments<ExternalLinkIcon/></a>, or <a href="https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose" target="_blank" rel="noopener noreferrer">problems<ExternalLinkIcon/></a> regarding this service? Create an issue <a href="https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a> or contact <a href="mailto:webmaster@libellux.com">webmaster@libellux.com</a>.</p>
<p><a href="https://www.libellux.com/openvas/" target="_blank" rel="noopener noreferrer">OpenVAS<ExternalLinkIcon/></a> reports Monit to be using weak ciphers accepted through TLS1.0,1.1,1.2 protocol. Add the following lines within the ssl section.</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">with</span> ssl</span> <span class="token punctuation">{</span>
    pemfile:
    version: TLSv12
    ciphers: "ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384"
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To resolve the issue where libcrypto.so.1.0.x has been removed with the auto remove/clean command is to reinstall the libssl1.0.x and libssl-dev packages.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ sudo apt-get install libssl1.0.x libssl-dev --reinstall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>To resolve the issue where you receive the configuration error: libz not found. Proceed to install the zlib1g-dev package.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ sudo apt-get install zlib1g-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>In case you get the configure error: Couldn’t find your SSL header files. Proceed by installing the libssl-dev package.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ sudo apt-get install libssl-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If you receive <code v-pre>configure: error: PAM enabled but headers or library not found</code>, install the PAM development support or run configure --without-pam to build without PAM.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server@ubuntu:~$ libpam0g-dev
server@ubuntu:~$ sudo ./configure --without-pam
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>If you get the error <code v-pre>SSL server certificate verification error: self signed certificate is not allowed, please use a trusted certificate or use the 'selfsigned: allow' SSL option</code> update the monit configuration file to allow self-signed certificates.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ sudo nano /usr/local/etc/monitrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">set</span> ssl <span class="token punctuation">{</span>
    verify: <span class="token builtin class-name">enable</span>
    selfsigned: allow
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If receiving the error that the sever certificate has expired you can either re-generate a new self-signed certificate for your M/Monit server or simply disable the SSL verification at the client side.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Cannot connect to [192.168.0.1]:8443 -- SSL server certificate verification error: certificate has expired
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>client@ubuntu:~$ sudo nano /usr/local/etc/monitrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">set</span> ssl <span class="token punctuation">{</span>
    <span class="token comment">#verify: enable</span>
    selfsigned: allow
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="enterprise-solutions" tabindex="-1"><a class="header-anchor" href="#enterprise-solutions" aria-hidden="true">#</a> Enterprise solutions <Badge text="non-sponsored" type="tip"/></h2>
<h3 id="m-monit-enterprise" tabindex="-1"><a class="header-anchor" href="#m-monit-enterprise" aria-hidden="true">#</a> M/Monit Enterprise</h3>
<p>The M/Monit Enterprise License is a perpetual license and allows you to install and run an unlimited number of M/Monit instances for monitoring an unlimited number of hosts in-house.</p>
<p><a href="https://mmonit.com/shop/" target="_blank" rel="noopener noreferrer">M/Monit<ExternalLinkIcon/></a></p>
</div></template>
