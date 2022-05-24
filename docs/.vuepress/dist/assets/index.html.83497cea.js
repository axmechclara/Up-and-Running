import{_ as l,r as d,o as c,c as u,a as e,b as i,w as a,F as h,e as t,d as s}from"./app.479483b3.js";const v={},p={id:"two-factor-authentication-w-privacyidea-and-yubikey",tabindex:"-1"},m=e("a",{class:"header-anchor",href:"#two-factor-authentication-w-privacyidea-and-yubikey","aria-hidden":"true"},"#",-1),_=t(" Two-factor authentication w/ privacyIDEA and YubiKey "),b=e("p",null,"privacyIDEA is a modular authentication server that can be used to enhance the security of your existing applications like local login, VPN, remote access, SSH connections, access to web sites or web portals with two-factor authentication.",-1),g={href:"https://www.privacyidea.org/",target:"_blank",rel:"noopener noreferrer"},y=t("privacyIDEA website"),f=t(),w={href:"https://github.com/privacyidea/privacyidea",target:"_blank",rel:"noopener noreferrer"},k=t("GitHub"),x=e("br",null,null,-1),A={href:"https://www.pntrs.com/t/TUJGR0dNRkJHRk1NR0ZCRk5GSkxK",target:"_blank",rel:"noopener noreferrer"},I=t("Yubico website"),R=t(),S=e("p",null,"Setup and configuration has been tested on the following operating systems:",-1),D=e("li",null,"Ubuntu 20.04 (Focal Fossa)",-1),N=e("li",null,"privacyIDEA- 3.5.2",-1),E={href:"https://www.pntrs.com/t/TUJGR0dNRkJHRk1NR0ZCRk5GSkxK",target:"_blank",rel:"noopener noreferrer"},C=t("YubiKey 5 NFC"),U={href:"https://ko-fi.com/B0B31BJU3",target:"_blank",rel:"noopener noreferrer"},G=e("img",{src:"https://www.ko-fi.com/img/githubbutton_sm.svg",alt:"ko-fi"},null,-1),T=e("h2",{id:"prerequisites",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#prerequisites","aria-hidden":"true"},"#"),t(" Prerequisites")],-1),K={href:"https://www.pntrs.com/t/TUJGR0dNRkJHRk1NR0ZCRk5GSkxK",target:"_blank",rel:"noopener noreferrer"},P=t("YubiKey 5 NFC"),Y=t(" (optional)"),F={href:"https://www.yubico.com/support/download/yubikey-personalization-tools/",target:"_blank",rel:"noopener noreferrer"},$=t("YubiKey Personalization Tool"),L=t(" (optional)"),q=e("h2",{id:"configuration-files",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#configuration-files","aria-hidden":"true"},"#"),t(" Configuration files")],-1),z=e("h2",{id:"install-community-edition",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#install-community-edition","aria-hidden":"true"},"#"),t(" Install community edition")],-1),H=t("We will use privacyIDEA and their FreeRADIUS plugin together with "),O={href:"https://www.pntrs.com/t/TUJGR0dNRkJHRk1NR0ZCRk5GSkxK",target:"_blank",rel:"noopener noreferrer"},J=t("YubiKey 5 NFC"),B=t(" (from Yubico) to enforce two-factor authentication and apply an role-based access control approach (RBAC). We will simplify the user accounting by fetching the users from the local "),V=e("code",null,"/etc/passwd",-1),M=t(" file and use it as the privacyIDEA resolver (instead of e.g. LDAP, SQL. You can read more about resolvers "),W={href:"https://privacyidea.readthedocs.io/en/latest/configuration/useridresolvers.html#useridresolvers",target:"_blank",rel:"noopener noreferrer"},Z=t("here"),j=t("). To get an hands-on experience we will use the privacyIDEA authentication server to access the "),Q=t("Greenbone Vulnerability Manager's"),X=t(" user interface."),ee={class:"custom-container tip"},te=e("p",{class:"custom-container-title"},"TIP",-1),ie=t("This is the first revision for privacyIDEA. We will write more about the different modular options e.g. LDAP as resolver in future releases. If there's any particular configuration you would like us to cover feel free to create a new "),ne={href:"https://github.com/libellux/Libellux-Up-and-Running/issues/new/choose",target:"_blank",rel:"noopener noreferrer"},se=t("Feature request"),oe=t("."),ae=s(`<p>To get started download the signed key.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ wget https://lancelot.netknights.it/NetKnights-Release.asc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Next import the signed key.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ sudo gpg --import --import-options show-only --with-fingerprint NetKnights-Release.asc
pub rsa4096 2017-05-16  NetKnights GmbH &lt;release@netknights.it&gt;
Key fingerprint = 0940 4ABB EDB3 586D EDE4  AD22 00F7 0D62 AE25 0082
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Continue by adding the key to our system.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ sudo apt-key add NetKnights-Release.asc
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Now we need to add the repository for the specific release (in this case Ubuntu 20.04).</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ sudo add-apt-repository http://lancelot.netknights.it/community/focal/stable
server@ubuntu:~$ sudo apt-get update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>If you prefer to use the nginx version you can install <code>apt-get privacyidea-nginx</code></p></div><p>Once we updated the package manager we can install PrivacyIDEA.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ sudo apt-get update
server@ubuntu:~$ sudo apt-get install privacyidea-apache2
             _                    _______  _______
   ___  ____(_)  _____ _______ __/  _/ _ \\/ __/ _ |
  / _ \\/ __/ / |/ / _ \`/ __/ // // // // / _// __ |
 / .__/_/ /_/|___/\\_,_/\\__/\\_, /___/____/___/_/ |_|
/_/                       /___/

Running online
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let&#39;s create the administration account.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ sudo pi-manage admin add admin -e admin@localhost
Admin admin was registered successfully.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Once you&#39;ve added the administrator account and followed the <a href="#firewall-settings">firewall settings</a> you should be able to reach the web interface from <code>https://192.168.0.1</code> and login as the admin user with your password.</p>`,14),re=["src"],de=e("h2",{id:"privacyidea-freeradius-plugin",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#privacyidea-freeradius-plugin","aria-hidden":"true"},"#"),t(" privacyIDEA FreeRADIUS plugin")],-1),le=t("Now we will install the privacyIDEA freeRADIUS plugin, which we will be using to enable RADIUS for "),ce=t("Greenbone Vulnerability Manager"),ue=t("."),he=e("div",{class:"language-text ext-text line-numbers-mode"},[e("pre",{class:"language-text"},[e("code",null,`server@ubuntu:~$ sudo apt-get install privacyidea-radius
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),ve=t("In the "),pe=e("code",null,"clients.conf",-1),me=t(" we will add our client(s), which in this case is our "),_e=t("Greenbone Vulnerability Manager"),be=t(". Define the IP address of the "),ge=t("Greenbone Vulnerability Manager"),ye=t(" and set the secret (do not use the default secret)."),fe=s(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ sudo -i
root@ubuntu:~$ sudo nano /etc/freeradius/3.0/clients.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#client example.org {</span>
<span class="token comment">#       ipaddr          = radius.example.org</span>
<span class="token comment">#       secret          = testing123</span>
<span class="token comment">#}</span>
client GVM <span class="token punctuation">{</span>
        ipaddr <span class="token operator">=</span> <span class="token number">192.168</span>.0.3
        secret <span class="token operator">=</span> testing123
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the <code>sites-enabled</code> folder you will find the default authentication settings for privacyIDEA. Leave the default <code>perl-privacyidea</code> type.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:~$ cd /etc/freeradius/3.0/sites-enabled/
root@ubuntu:~$ cat privacyidea
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server {
    authorize {
        #files
        perl-privacyidea
        if (ok || updated) {
            update control {
                Auth-Type := Perl
            }
        }
    }
    listen {
        type = auth
        ipaddr = *
        port = 0
    }
    authenticate {
        Auth-Type Perl {
            perl-privacyidea
        }
    }
}
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The authentication type which is an enabled mod is located in the <code>mods-enabled</code> directory and you will see the <code>privacyidea_radius.pm</code> module file. Leave the default settings.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:~$ cd /etc/freeradius/3.0/mods-enabled/
root@ubuntu:~$ cat mods-perl-privacyidea
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>perl perl-privacyidea {
    filename = /usr/share/privacyidea/freeradius/privacyidea_radius.pm
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="configure-privacyidea" tabindex="-1"><a class="header-anchor" href="#configure-privacyidea" aria-hidden="true">#</a> Configure privacyIDEA</h2>`,9),we=t("As we configured the local freeRADIUS plugin and added "),ke=t("Greenbone Vulnerability Manager"),xe=t(" as a client we will now configure the privacyIDEA authentication server. The freeRADIUS plugin doesn't have to be installed on the same server as privacyIDEA. You can define this in the "),Ae=e("code",null,"rlm_perl.ini",-1),Ie=t(" file. In this tutorial we will leave the default localhost as our domain."),Re=s(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:~$ exit
server@ubuntu:~$ sudo nano /etc/privacyidea/rlm_perl.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[Default]
URL = https://localhost/validate/check
#REALM = someRealm
#RESCONF = someResolver
SSL_CHECK = false
#DEBUG = true
</code></pre><div class="highlight-lines"><br><div class="highlight-line">\xA0</div><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="configure-yubikey-for-privacyidea" tabindex="-1"><a class="header-anchor" href="#configure-yubikey-for-privacyidea" aria-hidden="true">#</a> Configure YubiKey for privacyIDEA</h2>`,3),Se={class:"custom-container warning"},De=e("p",{class:"custom-container-title"},"WARNING",-1),Ne=t("privacyIDEA requires "),Ee={href:"https://www.pntrs.com/t/TUJGR0dNRkJHRk1NR0ZCRk5GSkxK",target:"_blank",rel:"noopener noreferrer"},Ce=t("YubiKey 5 NFC"),Ue=t("."),Ge=e("p",null,[t("Start YubiKey Personalization Tool. Go to Settings. In the "),e("code",null,"Logging Settings"),t(" select "),e("code",null,"Flexible format"),t(" and add "),e("code",null,"{serial}, {secretKeyTxt}"),t(" variables in the form field.")],-1),Te=["src"],Ke=e("p",null,[t("Next click the "),e("code",null,"OATH-HOTP"),t(" tab. Select which slot you wish to write your configuration to. Uncheck "),e("code",null,"OATH Token Identifier"),t(" and create the secret key by pressing the "),e("code",null,"Generate"),t(" button. Complete the build by clicking the "),e("code",null,"Write Configuration"),t(" button and save the CSV file.")],-1),Pe=["src"],Ye=s('<h2 id="enroll-token-w-yubikey" tabindex="-1"><a class="header-anchor" href="#enroll-token-w-yubikey" aria-hidden="true">#</a> Enroll token w/ YubiKey</h2><p>Before we enroll the token with YubiKey we will create a resolver and realm and select the first user. Login to privacyIDEA at e.g. <code>https://192.168.0.1</code>. In the top menu click <code>Config</code>. Next click the <code>Users</code> tab and select <code>New passwdresolver</code>. Once you&#39;ve given the resolver a name click the <code>Save Resolver</code> button.</p>',2),Fe=["src"],$e=e("p",null,[t("Next we will create the realm. Click the tab "),e("code",null,"Realms"),t(". Give the realm a name and check the passwdresolver we just created. Click "),e("code",null,"Create Realm"),t(".")],-1),Le=["src"],qe=e("p",null,[t("Now lets select the first user. In the top menu click "),e("code",null,"Users"),t(". Select the realm we just created in the left dropdown menu. This will show the list of all users from the "),e("code",null,"/etc/passwd"),t(" file. You can select any user from the list. We will go with the user "),e("code",null,"mail"),t(" for this example.")],-1),ze=["src"],He=e("p",null,[t("Once you've decided which user you will connect to the YubiKey you can now assign your first token to a user. In the top menu click "),e("code",null,"Token"),t(" and select "),e("code",null,"Import Tokens"),t(" in the left menu. Select authentication method "),e("code",null,"OATH CSV"),t(" and realm. Click the "),e("code",null,"Select file and import"),t(" button and upload the file that you created earlier from the YubiKey configuration.")],-1),Oe=["src"],Je=e("p",null,[t("Go back to "),e("code",null,"All tokens"),t(" in the left menu and you will see your newly enrolled token. Click the serial number for further details.")],-1),Be=["src"],Ve=s("<p>Here you will see the specific settings and details for the newly enrolled token. Now we will assign this token to the user. In the <code>Assign User</code> section select the <code>Realm</code>, fill in the <code>Username</code> you selected from the resolver list and finally set a <code>PIN</code> (in this example we used <code>mail</code> as the PIN). Click the <code>Assign User</code> button.</p>",1),Me=["src"],We=t("Next lets test if the token works. Above the "),Ze=e("code",null,"Assign User",-1),je=t(" section, in the form field next to the test token button, type your selected "),Qe=e("code",null,"PIN",-1),Xe=t(" and click your "),et={href:"https://www.pntrs.com/t/TUJGR0dNRkJHRk1NR0ZCRk5GSkxK",target:"_blank",rel:"noopener noreferrer"},tt=t("YubiKey 5 NFC"),it=t(" button and hit the "),nt=e("code",null,"Test token",-1),st=t(" button."),ot=["src"],at=s(`<p>You can also test if privacyIDEA grants access to the freeRADIUS client directly from the command-line. Fill in your <code>User-Name</code>, insert your <code>PIN</code> within the <code>User-Password</code> variable and hit your YubiKey button to output the token. Make sure to also define your secret.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>server@ubuntu:~$ echo &quot;User-Name=mail, User-Password=mail123456&quot; | radclient -x -s localhost auth testing123
Sent Access-Request Id 61 from 0.0.0.0:59998 to 127.0.0.1:1812 length 44
        User-Name = &quot;mail123456&quot;
        User-Password = &quot;mail123456&quot;
        Cleartext-Password = &quot;mail123456&quot;
Received Access-Accept Id 61 from 127.0.0.1:1812 to 127.0.0.1:59998 length 48
        Reply-Message = &quot;privacyIDEA access granted&quot;
Packet summary:
        Accepted      : 1
        Rejected      : 0
        Lost          : 0
        Passed filter : 1
        Failed filter : 0
</code></pre><div class="highlight-lines"><div class="highlight-line">\xA0</div><br><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now go to the <code>Config</code> menu and select the <code>System</code> tab. In the <code>System Config</code> add <code>127.0.0.1</code> in the <code>Override Authorization Clients</code> field to enable the validation check against the local subnet (e.g. <code>192.168.0.3</code>). Click the <code>Save System Config</code> button.</p>`,3),rt=["src"],dt=s('<h2 id="enable-2fa-for-greenbone-vulnerability-manager" tabindex="-1"><a class="header-anchor" href="#enable-2fa-for-greenbone-vulnerability-manager" aria-hidden="true">#</a> Enable 2FA for Greenbone Vulnerability Manager</h2><p>Login to your Greenbone Security Assistant at e.g. <code>https://192.168.0.3/login</code>. Once you&#39;ve logged in select <code>Administration</code> and <code>RADIUS</code> in the top menu. Click the <code>Edit Radius Authentication</code> button. Check the <code>Enabled</code> box, add the RADIUS host IP address e.g. <code>192.168.0.1</code> and your secret key. Click the <code>Save</code> button.</p>',2),lt=["src"],ct=s("<p>Next lets add the user to the Greebone Security Assistant (GSA). Select <code>Administration</code> and <code>Users</code> in the top menu. Click the <code>New User</code> button. Check <code>RADIUS Authentication Only</code>, select preferred user role and/or group. Add the privacyIDEA IP address in the <code>Host Access</code> field (e.g. <code>192.168.0.1</code>) and check <code>Deny all and allow</code>. If you want to lock access for the local subnet to GSA you can check <code>Deny all and allow</code> in the <code>Interface Access</code> and enter <code>192.168.0.0/24</code>. Once done click the <code>Save</code> button.</p>",1),ut=["src"],ht=e("p",null,[t("Logout as administrator from the Greenbone Security Assistant. Add the "),e("code",null,"Username"),t(" of your newly created user. In the "),e("code",null,"Password"),t(" field type the "),e("code",null,"PIN"),t(" and hit the YubiKey button (do not click the Sign In button) and you should successfully be authenticated.")],-1),vt=["src"],pt=e("h2",{id:"firewall-settings",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#firewall-settings","aria-hidden":"true"},"#"),t(" Firewall settings")],-1),mt=t("The firewall being used is UFW (Uncomplicated Firewall). It is set by default to deny incoming traffic, allow outgoing traffic and allow port 22 (OpenSSH). Read more about UFW "),_t={href:"https://help.ubuntu.com/community/UFW",target:"_blank",rel:"noopener noreferrer"},bt=t("here"),gt=t("."),yt=s(`<details class="custom-container details"><summary>UFW Settings</summary><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>server@ubuntu:~$ sudo ufw default deny incoming
server@ubuntu:~$ sudo ufw default allow outgoing
server@ubuntu:~$ sudo ufw allow 22
server@ubuntu:~$ sudo ufw enable
Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
Firewall is active and enabled on system startup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-console ext-console line-numbers-mode"><pre class="language-console"><code>server@ubuntu:~$ sudo ufw allow 443 comment &quot;privacyIDEA&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="command-line" tabindex="-1"><a class="header-anchor" href="#command-line" aria-hidden="true">#</a> Command-line</h2><table><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody><tr><td>pi-manage admin</td><td>Add or edit existing admin account</td></tr></tbody></table><h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting" aria-hidden="true">#</a> Troubleshooting</h2>`,5),ft=t("If you encounter any issue or having questions regarding privacyIDEA I recommend using their very helpful "),wt={href:"https://community.privacyidea.org/",target:"_blank",rel:"noopener noreferrer"},kt=t("community forum"),xt=t("."),At={id:"enterprise-solutions",tabindex:"-1"},It=e("a",{class:"header-anchor",href:"#enterprise-solutions","aria-hidden":"true"},"#",-1),Rt=t(" Enterprise solutions "),St=e("h3",{id:"netknights-privacyidea-enterprise-edition",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#netknights-privacyidea-enterprise-edition","aria-hidden":"true"},"#"),t(" NetKnights privacyIDEA Enterprise Edition")],-1),Dt=e("p",null,"privacyIDEA is a modular solution for two factor authentication especially with OTP tokens. It is multi-tenency- and multi-instance-capable. Due to the modular structure privacyIDEA can be quickly and easily adapted and enhanced. E.g. adding new token types is as simple as writing a new lean python module. You do not need to modify your network for privacyIDEA, it does not write to existing databases or user stores. It only needs read access to your user stores like LDAP, Active Directory, SQL, SCIM-service or flat files. Existing workflows can be enhanced without the need to modify them. Using its simple REST like API it can be automated and smoothly be integrated.",-1),Nt={href:"https://netknights.it/en/produkte/privacyidea/",target:"_blank",rel:"noopener noreferrer"},Et=t("NetKnights"),Ct={id:"yubienterprise",tabindex:"-1"},Ut=e("a",{class:"header-anchor",href:"#yubienterprise","aria-hidden":"true"},"#",-1),Gt=t(" YubiEnterprise "),Tt=e("p",null,"Yubico offers enterprise solutions and can easily procure and distribute YubiKey authentication solutions for employees at scale.",-1),Kt={href:"https://www.pntrs.com/t/TUJGR0dNRkJHRk1NR0ZCRk5GSkxK",target:"_blank",rel:"noopener noreferrer"},Pt=t("Yubico");function Yt(Ft,$t){const r=d("Badge"),n=d("ExternalLinkIcon"),o=d("RouterLink");return c(),u(h,null,[e("h1",p,[m,_,i(r,{text:"Rev 1",type:"tip"})]),b,e("p",null,[e("a",g,[y,i(n)]),f,e("a",w,[k,i(n)]),x,e("a",A,[I,i(n)]),R,i(r,{text:"affiliate links",type:"warning"})]),S,e("ul",null,[D,N,e("li",null,[e("a",E,[C,i(n)])])]),e("p",null,[e("a",U,[G,i(n)])]),T,e("ul",null,[e("li",null,[e("a",K,[P,i(n)]),Y]),e("li",null,[e("a",F,[$,i(n)]),L])]),q,z,e("p",null,[H,e("a",O,[J,i(n)]),B,V,M,e("a",W,[Z,i(n)]),j,i(o,{to:"/openvas/"},{default:a(()=>[Q]),_:1}),X]),e("div",ee,[te,e("p",null,[ie,e("a",ne,[se,i(n)]),oe])]),ae,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea_login.png",alt:"PrivacyIDEA login"},null,8,re),de,e("p",null,[le,i(o,{to:"/openvas/"},{default:a(()=>[ce]),_:1}),ue]),he,e("p",null,[ve,pe,me,i(o,{to:"/openvas/"},{default:a(()=>[_e]),_:1}),be,i(o,{to:"/openvas/"},{default:a(()=>[ge]),_:1}),ye]),fe,e("p",null,[we,i(o,{to:"/openvas/"},{default:a(()=>[ke]),_:1}),xe,Ae,Ie]),Re,e("div",Se,[De,e("p",null,[Ne,e("a",Ee,[Ce,i(n)]),Ue])]),Ge,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/yubikey-settings.png",alt:"yubikey settings"},null,8,Te),Ke,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/yubikey-hotp.png",alt:"yubikey hotp"},null,8,Pe),Ye,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-resolver.png",alt:"privacyidea resolver"},null,8,Fe),$e,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-realm.png",alt:"privacyidea realm"},null,8,Le),qe,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-users.png",alt:"privacyidea users"},null,8,ze),He,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-token.png",alt:"privacyidea assign token"},null,8,Oe),Je,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-token-2.png",alt:"privacyidea token"},null,8,Be),Ve,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-assign-token.png",alt:"privacyidea assign token"},null,8,Me),e("p",null,[We,Ze,je,Qe,Xe,e("a",et,[tt,i(n)]),it,nt,st]),e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-test-token.png",alt:"privacyidea test token"},null,8,ot),at,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/privacyidea-override-authentication.png",alt:"privacyidea override authentication"},null,8,rt),dt,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/greenbone-radius.png",alt:"greenbone security assistant radius"},null,8,lt),ct,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/greenbone-user.png",alt:"greenbone security assistant user"},null,8,ut),ht,e("img",{class:"zoom-custom-imgs",src:"/img/privacyidea/greenbone-login.png",alt:"greenbone security assistant login"},null,8,vt),pt,e("p",null,[mt,e("a",_t,[bt,i(n)]),gt]),yt,e("p",null,[ft,e("a",wt,[kt,i(n)]),xt]),e("h2",At,[It,Rt,i(r,{text:"non-sponsored",type:"tip"})]),St,Dt,e("p",null,[e("a",Nt,[Et,i(n)])]),e("h3",Ct,[Ut,Gt,i(r,{text:"affiliate links",type:"warning"})]),Tt,e("p",null,[e("a",Kt,[Pt,i(n)])])],64)}var qt=l(v,[["render",Yt],["__file","index.html.vue"]]);export{qt as default};
