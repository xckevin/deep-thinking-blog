---
title: 一次性搞懂解决 SSH 链接 Git 的 Permission denied 问题
excerpt: SSH 是开发者日常工作中的利器，但配置不当时，可能会遭遇让人抓狂的 Permission denied (publickey) 错误。这篇文章深入浅出地解读了 SSH 的工作原理，并提供了八步排查法，帮你轻松搞定 GitLab 的 SSH 连接问题。从公钥上传、SSH 配置，到调试输出解析，每一步都清晰实用，还附带图解让你快速上手。通过正确配置，你将享受高效、安全、自动化的 Git 操作，再也不被繁琐的登录步骤打扰！
publishDate: 'Dec 10 2024'
tags:
  - Guide
seo:
  image:
    src: '/post-1.jpg'
    alt: A person standing at the window
---

![A person standing at the window](/post-1.jpg)
#### **背景**

相信不少人跟我一样，兴致勃勃地开始配置 SSH，想着不用输入密码就能优雅地操作 GitLab，结果迎头就撞上了这么一行冰冷的错误提示：

```
Permission denied (publickey,keyboard-interactive).
```

一瞬间头皮发麻，怀疑人生：**“SSH 是不是故意跟我作对？”** 别急，本文就带你从问题的根源入手，搞定这个烦人的提示，让 SSH 为你工作，而不是让你抓狂！

---

#### **为什么要用 SSH 配置 GitLab？**

1. **提高效率**：省去每次输入用户名和密码的繁琐操作。
2. **更安全**：通过密钥认证，无需暴露密码。
3. **自动化支持**：方便写脚本实现 CI/CD 操作。

SSH 的强大不用多说，但是当问题出现时，了解背后的原理和解决方法就显得尤为重要。

---

#### **问题现象：权限被拒绝**

通常连接 GitLab 时，你可能会遇到这样的错误：
```bash
Permission denied (publickey,keyboard-interactive).
```

这意味着 SSH 客户端尝试认证时，远程主机（GitLab）拒绝了你的公钥。那究竟哪里出了问题？

---

### **解决过程：用八步赶走 "Permission denied"**

#### **1. 检查 SSH 公钥是否正确上传**

首先，确保你把正确的公钥添加到了 GitLab 的 **SSH Keys** 中。

##### **操作步骤**：
1. 打开本地公钥文件（`.pub` 结尾的文件），例如：
   ```bash
   cat ~/.ssh/id_rsa_gitlab.pub
   ```
   你会看到类似这样的内容：
   ```
   ssh-rsa AAAAB3NzaC1yc2... your_email@example.com
   ```

2. 登录 GitLab，进入 **Profile -> SSH Keys**，将上面复制的公钥粘贴进去。

3. 保存即可。

---

#### **2. 确保本地配置正确**

如果你使用多个 SSH 密钥（例如一个给 GitHub，一个给 GitLab），你需要配置 SSH 使用正确的密钥。

##### **配置 SSH Config 文件**：
编辑或创建 `~/.ssh/config` 文件：
```bash
nano ~/.ssh/config
```

添加以下内容：
```plaintext
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_rsa_gitlab
```

如果你的 GitLab 是公司内网服务器，记得把 `gitlab.com` 替换成实际域名或 IP 地址。

---

#### **3. 确保私钥被加载**

有时候，SSH 代理未加载你的私钥，会导致连接失败。

##### **检查已加载的密钥**：
```bash
ssh-add -l
```

##### **手动加载私钥**：
如果没有显示你的密钥，可以用以下命令加载：
```bash
ssh-add ~/.ssh/id_rsa_gitlab
```

如果提示 `Could not open a connection to your authentication agent`，需要先启动 SSH 代理：
```bash
eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa_gitlab
```

---

#### **4. 测试连接**

验证 SSH 是否配置正确：
```bash
ssh -T git@gitlab.com
```

如果是内网 GitLab，请使用其域名或 IP 地址：
```bash
ssh -T git@<gitlab_domain_or_ip>
```

成功时会显示：
```
Welcome to GitLab, @yourusername!
```

---

#### **5. 确保仓库地址使用 SSH 格式**

SSH 和 HTTPS 是两种不同的协议，如果你的仓库地址是 HTTPS 格式，会导致 SSH 无法工作。

##### **检查仓库地址：**
用以下命令查看当前远程仓库地址：
```bash
git remote -v
```

如果显示类似：
```plaintext
https://gitlab.com/username/repository.git
```

将其更改为 SSH 格式：
```bash
git remote set-url origin git@gitlab.com:username/repository.git
```

---

#### **6. 修改文件权限**

SSH 私钥文件权限过高会导致 SSH 拒绝使用它。

##### **修复文件权限：**
```bash
chmod 600 ~/.ssh/id_rsa_gitlab
chmod 700 ~/.ssh
```

---

#### **7. 检查服务器配置（内网 GitLab）**

如果你使用的是公司内部 GitLab，可能使用了非标准的端口。你需要在 `~/.ssh/config` 文件中指定端口号：
```plaintext
Host gitlab.internal
    HostName gitlab.internal
    User git
    Port 2222  # 替换为实际端口号
    IdentityFile ~/.ssh/id_rsa_gitlab
```

---

#### **8. 调试 SSH 输出**

最后，如果问题仍未解决，可以启用 SSH 调试模式，查看更多细节：
```bash
ssh -vT git@gitlab.com
```

调试信息中会显示：
- 是否找到正确的密钥。
- 是否被服务器接受。

---

### **用图解读，轻松理解 SSH 验证流程**

以下是 SSH 验证的基本流程：

1. **客户端发起连接**：`ssh -T git@gitlab.com`
2. **服务器返回公钥指纹**。
3. **客户端检查本地是否有对应的私钥**。
4. **私钥签名并发送**。
5. **服务器验证签名，授权连接**。

<插入一个简洁的流程图，展示从客户端发起请求到验证完成的过程。>

---

### **最终的收益：搞定 Permission denied！**

1. **全流程自动化**：再也不用输入密码，`git clone`、`push` 一气呵成。
2. **安全性更高**：不依赖密码验证，降低泄露风险。
3. **节省时间**：尤其是需要频繁操作 Git 的开发者，效率提升显著。

---

### **总结：SSH 不再难，用心配置见真章！**

配置 SSH 是一个很常见的需求，但稍不留神就容易出错。通过本文的八步排查法，你可以轻松搞定 SSH 链接 GitLab 的问题。下次再遇到 `Permission denied` 错误，你可以自信地说：“这事我懂了！”

如果你觉得本文对你有帮助，别忘了点赞和分享哦！🚀