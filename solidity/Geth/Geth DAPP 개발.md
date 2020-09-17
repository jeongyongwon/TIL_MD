# Geth DAPP 개발

![image-20200829220439571](../../../AppData/Roaming/Typora/typora-user-images/image-20200829220439571.png)

<img src="../../../AppData/Roaming/Typora/typora-user-images/image-20200829220752368.png" alt="image-20200829220752368" style="zoom: 200%;" />

- 이런식으로 옵션이 쓰임



## 계정 생성

### 첫 번째

```bash
$ geth --datadir "c:\ether\data" account new
# 새로운 계좌를 생성
# DB, KeyStore 경로
INFO [08-29|22:10:11.707] Maximum peer count                       ETH=50 LES=0 total=50
Your new account is locked with a password. Please give a password. Do not forget this password.
!! Unsupported terminal, password will be echoed.
Password: 7845

Repeat password: 7845


Your new key was generated

Public address of the key:   0x3C2a9327275285126256f26ecF759dae5E22D8C1
Path of the secret key file: c:\ether\data\keystore\UTC--2020-08-29T13-10-19.364068200Z--3c2a9327275285126256f26ecf759dae5e22d8c1

- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it's impossible to access account funds!
- You must REMEMBER your password! Without the password, it's impossible to decrypt the key!

```

![image-20200829221127172](../../../AppData/Roaming/Typora/typora-user-images/image-20200829221127172.png)

- 아래와 같이 계좌가 생성됨



## 최초 블록생성

```bash
$ geth --datadir "c:\ether\data" init "c:\ether\genesis.json"
INFO [08-29|22:38:19.283] Maximum peer count                       ETH=50 LES=0 total=50
INFO [08-29|22:38:19.378] Set global gas cap                       cap=25000000
INFO [08-29|22:38:19.378] Allocated cache and file handles         database=c:\ether\data\geth\chaindata cache=16.00MiB handles=16
INFO [08-29|22:38:19.410] Persisted trie from memory database      nodes=0 size=0.00B time=0s gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [08-29|22:38:19.467] Successfully wrote genesis state         database=chaindata                    hash="a13c0c…c8e2d7"
INFO [08-29|22:38:19.467] Allocated cache and file handles         database=c:\ether\data\geth\lightchaindata cache=16.00MiB handles=16
INFO [08-29|22:38:19.482] Persisted trie from memory database      nodes=0 size=0.00B time=0s gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [08-29|22:38:19.498] Successfully wrote genesis state         database=lightchaindata                    hash="a13c0c…c8e2d7"

```

https://needjarvis.tistory.com/246