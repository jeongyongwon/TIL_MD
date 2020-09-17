# Docker

## * 어지간하면 최대화 해서 보셈 터미널 출력 결과 보기쉽도록

---

- on-Premises <=> Cloud와 반대되는 개념 : 내부에서 장비를 두고 관리하는 것
- Container => 하나하나 별도의 서버
- Compose => 여러 컨테이너를 하나처럼 쓸 수 있음
- Image => 정의라고 생각하면 됨



> 첫 번째 강의 링크 : https://www.youtube.com/watch?v=MHzxhoBmCwA&list=PLEOnZ6GeucBVj0V5JFQx_6XBbZrrynzMh
>
> 첫 번째 강의 슬라이드 : https://docs.google.com/presentation/d/1GVwoLxHq0JwajKIPU8yc72flSJ6pr09ViT-XcLGcRnM/edit#slide=id.p
>
> 설치링크 : https://hub.docker.com/editions/community/docker-ce-desktop-windows/
>
> 공식문서 : https://docs.docker.com/get-started/
>
> Hyper-V OFF : [https://support.bluestacks.com/hc/ko/articles/115004254383-Hyper-V-%EA%B8%B0%EB%8A%A5%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EC%95%8A%EC%9C%BC%EB%A0%A4%EB%A9%B4-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%84%A4%EC%A0%95%ED%95%B4%EC%95%BC-%ED%95%A9%EB%8B%88%EA%B9%8C-](https://support.bluestacks.com/hc/ko/articles/115004254383-Hyper-V-기능을-사용하지-않으려면-어떻게-설정해야-합니까-)
>
> **=> 강의 따라하기 위해서 터미널로 실행함 (그냥 Bash에서 하니까 충돌)**
>
> Docker Quick Terminal download : https://docs.docker.com/toolbox/toolbox_install_windows/

## 도커를 그럼 왜 쓸까 ?

- 예전에는 개발, stage, Real, DB서버, Git서버, 배포서버 등을 다 분리해서 썼음
- 지금은 Docker안에서 다 관리하면 되고, 이미지를 뜨면 됨



## 버전확인

```bash
#설치 후 bash에서 docker의 버전 확인하기
$ docker --version
>> Docker version 19.03.12, build 48a66213fe


$ docker version
## 클라이언트 버전
>> Client: Docker Engine - Community
 Version:           19.03.12
 API version:       1.40
 Go version:        go1.13.10
 Git commit:        48a66213fe
 Built:             Mon Jun 22 15:43:18 2020
 ## 클라이언트는 Windows/CPU
 OS/Arch:           windows/amd64
 Experimental:      false
 
## 서버 버전
Server: Docker Engine - Community
 Engine:
  Version:          19.03.12
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.13.10
  Git commit:       48a66213fe
  Built:            Mon Jun 22 15:49:27 2020
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          v1.2.13
  GitCommit:        7ad184331fa3e55e52b890ea95e65ba581ae3429
 runc:
  Version:          1.0.0-rc10
  GitCommit:        dc9208a3303feef5b3839f4323d9beb36df0a9dd
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683

```



## 도커 Start

- `docker run {이미지 네임}   - 실행`

```bash
### hello-world라는 이미지 기반으로 도커를 실행
$ docker run hello-world
>> Unable to find image 'hello-world:latest' locally
## 없으니까 지금 Pulling 중
latest: Pulling from library/hello-world
0e03bdcc26d7: Pulling fs layer
0e03bdcc26d7: Verifying Checksum
0e03bdcc26d7: Download complete
0e03bdcc26d7: Pull complete
## 해쉬같이 검증하는거?
Digest: sha256:49a1c8800c94df04e9658809b006fd8a686cab8028d33cfba2cc049724254202
## 최신버전 hello-world를 받았다
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

## hell0-world라는 이미지를 https://hub.docker.com/ 여기서 받음
Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

## 도커 공식문서
For more examples and ideas, visit:
 https://docs.docker.com/get-started/

```

## 도커 기록

- `docker ps (실행 중인 도커만 나옴) `
- `docker ps -a (실행했던 것도 뜸)`

```bash
$ docker ps -a
## 4분전에 만들고 hello-world라는 이름으로 4분전에 바로 빠져나옴
>> CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
9ba877ebacea        hello-world         "/hello"            4 minutes ago       Exited (0) 4 minutes ago       
```



## 도커 실행

- `docker container run {docker image name} {command}`

```bash
# ubuntu 환경에서 실행
$ docker container run ubuntu:latest /bin/echo 'Hello World'
>> Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
3ff22d22a855: Pull complete
e7cb79d19722: Pull complete
323d0d660b6a: Pull complete
b7f616834fd0: Pull complete
Digest: sha256:5d1d5407f353843ecf8b16524bc5565aa332e9e6a1297c73a92d3e754b8a636d
Status: Downloaded newer image for ubuntu:latest
Hello World

## 실행을 했더니 새로운 이력이 나타났다
$ docker ps -a
## docker container ps -a 와 같은 것이다
>>CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS                          PORTS               NAMES
cb6bc725a466        ubuntu:latest       "/bin/echo 'Hello Wo…"   49 seconds ago       Exited (0) 48 seconds ago                           relaxed_herschel
82194af3dcaf        hello-world         "/hello"                 About a minute ago   Exited (0) About a minute ago                       fervent_franklin

```

## 이미지의 디스크 사용량 확인

```bash
$ docker system df
TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              2                   2                   73.87MB             0B (0%)
Containers          2                   0                   0B                  0B
Local Volumes       0                   0                   0B                  0B
Build Cache         0                   0                   0B                  0B


$ docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              1e4467b07108        9 days ago          73.9MB
hello-world         latest              bf756fb1ae65        7 months ago        13.3kB
```

## 필요한 이미지 다운받기

- https://hub.docker.com/  

  => 이미지 리스트들을 확인할 수 있다 + 보통 official라 붙은게 좋다

- `docker pull {image name}`

```bash
# nginx 웹서버를 다운받음
$ docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
6ec8c9369e08: Pull complete
d3cb09a117e5: Pull complete
7ef2f1459687: Pull complete
e4d1bf8c9482: Pull complete
795301d236d7: Pull complete
Digest: sha256:0e188877aa60537d1a1c6484b8c3929cfe09988145327ee47e8e91ddf6f76f5c
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
```



## 컨테이너 구동하기

- `docker rm {컨테이너 id}` => 컨테이너 삭제 + rm 뒤에 `,`로 복수 삭제 가능

- `docker container run --name `{돌릴려고 하는 컨테이너 이름 정해주기} 

  `-d` : Detach / front background 분리하는거 => background에서만 돌아간다

  `-p` : Port => 1000 이상만 부여한다 (시스템이 1000이하는 쓰기 때문에)

```bash
$ docker container run --name webserver -d -p 80:80 nginx
7f382b479cbf530a909b75dd497571286832242d9f762d37e7233f8e1649cbf5

#webserver라는 컨테이너가 떠있는걸 알 수 있다(현재 돌아가는거만)
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
7f382b479cbf        nginx               "/docker-entrypoint.…"   7 seconds ago       Up 5 seconds        0.0.0.0:80->80/tcp   webserver
```



## 이미지 찾아보기

- STARS를 많이 받은게 사람들이 좋다고 한거임

```bash
$ docker search ubuntu
NAME                                                      DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
ubuntu                                                    Ubuntu is a Debian-based Linux operating sys…   11174               [OK]
dorowu/ubuntu-desktop-lxde-vnc                            Docker image to provide HTML5 VNC interface …   452                                     [OK]
rastasheep/ubuntu-sshd                                    Dockerized SSH service, built on top of offi…   246                                     [OK]
consol/ubuntu-xfce-vnc                                    Ubuntu container with "headless" VNC session…   222                                     [OK]
ubuntu-upstart                                            Upstart is an event-based replacement for th…   110                 [OK]
ansible/ubuntu14.04-ansible                               Ubuntu 14.04 LTS with ansible                   98                                      [OK]
1and1internet/ubuntu-16-nginx-php-phpmyadmin-mysql-5      ubuntu-16-nginx-php-phpmyadmin-mysql-5          50                                      [OK]
ubuntu-debootstrap                                        debootstrap --variant=minbase --components=m…   44                  [OK]
nuagebec/ubuntu                                           Simple always updated Ubuntu docker images w…   24                                      [OK]
i386/ubuntu                                               Ubuntu is a Debian-based Linux operating sys…   22
1and1internet/ubuntu-16-apache-php-5.6                    ubuntu-16-apache-php-5.6                        14                                      [OK]
1and1internet/ubuntu-16-apache-php-7.0                    ubuntu-16-apache-php-7.0                        13                                      [OK]
eclipse/ubuntu_jdk8                                       Ubuntu, JDK8, Maven 3, git, curl, nmap, mc, …   12                                      [OK]
1and1internet/ubuntu-16-nginx-php-phpmyadmin-mariadb-10   ubuntu-16-nginx-php-phpmyadmin-mariadb-10       11                                      [OK]
1and1internet/ubuntu-16-nginx-php-5.6                     ubuntu-16-nginx-php-5.6                         8                                       [OK]
1and1internet/ubuntu-16-nginx-php-5.6-wordpress-4         ubuntu-16-nginx-php-5.6-wordpress-4             7                                       [OK]
1and1internet/ubuntu-16-apache-php-7.1                    ubuntu-16-apache-php-7.1                        6                                       [OK]
darksheer/ubuntu                                          Base Ubuntu Image -- Updated hourly             5                                       [OK]
1and1internet/ubuntu-16-nginx-php-7.0                     ubuntu-16-nginx-php-7.0                         4                                       [OK]
pivotaldata/ubuntu                                        A quick freshening-up of the base Ubuntu doc…   4
pivotaldata/ubuntu16.04-build                             Ubuntu 16.04 image for GPDB compilation         2
1and1internet/ubuntu-16-sshd                              ubuntu-16-sshd                                  1                                       [OK]
smartentry/ubuntu                                         ubuntu with smartentry                          1                                       [OK]
pivotaldata/ubuntu-gpdb-dev                               Ubuntu images for GPDB development              1
1and1internet/ubuntu-16-php-7.1                           ubuntu-16-php-7.1                               1                                       [OK]
```



## ubuntu 받기

```bash
$ docker pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
Digest: sha256:5d1d5407f353843ecf8b16524bc5565aa332e9e6a1297c73a92d3e754b8a636d
Status: Image is up to date for ubuntu:latest
docker.io/library/ubuntu:latest

# ubuntu 이미지가 잘설치됨
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              1e4467b07108        9 days ago          73.9MB
nginx               latest              8cf1bfb43ff5        12 days ago         132MB
hello-world         latest              bf756fb1ae65        7 months ago        13.3kB


## 추후 필요하니까 설치해주자
$ docker pull centos
Using default tag: latest
latest: Pulling from library/centos
6910e5a164f7: Pull complete
Digest: sha256:4062bbdd1bb0801b0aa38e0f83dece70fb7a5e9bce223423a68de2d8b784b43b
Status: Downloaded newer image for centos:latest
docker.io/library/centos:latest
```

## centos 를 한번 실행해보자

- `it`는 인터렉티브한 실행(아직 명확히 모르겠음)
- `docker container run -it --name {컨테이너 이름:안지어주면 랜덤임} {image name} {command}`

```bash
$ docker container run -it --name "test1" centos /bin/cal
     August 2020
Su Mo Tu We Th Fr Sa
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30 31

## 그런데 컨테이너를 실행해보면 없다 
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
7f382b479cbf        nginx               "/docker-entrypoint.…"   17 minutes ago      Up 17 minutes       0.0.0.0:80->80/tcp   webserver

## centos 이미지를 보면 빠져나와있다(STATUS 부분)
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS                NAMES
e7b8b5c3c2a2        centos              "/bin/cal"               2 minutes ago       Exited (0) 2 minutes ago                        test1
7f382b479cbf        nginx               "/docker-entrypoint.…"   19 minutes ago      Up 18 minutes              0.0.0.0:80->80/tcp   webserver
cb6bc725a466        ubuntu:latest       "/bin/echo 'Hello Wo…"   2 hours ago         Exited (0) 2 hours ago                          relaxed_herschel
82194af3dcaf        hello-world         "/hello"                 2 hours ago         Exited (0) 2 hours ago                          fervent_franklin
```

## centos의 세계로 들어가보자

```bash
$ docker container run -it --name centossh centos bash
[root@5e040eff22e8 /]# whoami    => 현재 centos의 세계이며 리눅스 명령어가 작동하는 것을 알 수 있다
root
[root@5e040eff22e8 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@5e040eff22e8 /]# ls -al
total 56
drwxr-xr-x   1 root root 4096 Aug  3 05:47 .
drwxr-xr-x   1 root root 4096 Aug  3 05:47 ..
-rwxr-xr-x   1 root root    0 Aug  3 05:47 .dockerenv
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  360 Aug  3 05:47 dev
drwxr-xr-x   1 root root 4096 Aug  3 05:47 etc
drwxr-xr-x   2 root root 4096 May 11  2019 home
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
drwx------   2 root root 4096 Jun 11 02:35 lost+found
drwxr-xr-x   2 root root 4096 May 11  2019 media
drwxr-xr-x   2 root root 4096 May 11  2019 mnt
drwxr-xr-x   2 root root 4096 May 11  2019 opt
dr-xr-xr-x 138 root root    0 Aug  3 05:47 proc
dr-xr-x---   2 root root 4096 Jun 11 02:35 root
drwxr-xr-x  11 root root 4096 Jun 11 02:35 run
lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
drwxr-xr-x   2 root root 4096 May 11  2019 srv
dr-xr-xr-x  13 root root    0 Aug  3 05:47 sys
drwxrwxrwt   7 root root 4096 Jun 11 02:35 tmp
drwxr-xr-x  12 root root 4096 Jun 11 02:35 usr
drwxr-xr-x  20 root root 4096 Jun 11 02:35 var
[root@5e040eff22e8 /]# exit
exit
```

## Ubuntu 세계로도 들어가보자

- `docker stop {컨테이너 명}` => 도커 멈추는 것
- `docker container(이 부분 생략해도 됨) start {컨테이너 명}`
- `docker container ls -a` = `docker ps -a`

```bash
$ docker container run -it --name "ubuntush" ubuntu bash
root@39546c9830fd:/# cat /etc/issue
Ubuntu 20.04 LTS \n \l

root@39546c9830fd:/#  => 이단계에서 (ctrl+p)  + (ctrl + q)를 누르면 빠져나오면서 컨테이너는 구동 되는 것을 확인할 수 있다  # 만약 exit(ctrl+D)로 칠 경우에는 Stop를 하고 나와서 ps를 쳐도 나오지 않는다

$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                NAMES
39546c9830fd        ubuntu              "bash"                   About a minute ago   Up About a minute                        ubuntush
7f382b479cbf        nginx               "/docker-entrypoint.…"   33 minutes ago       Up 33 minutes       0.0.0.0:80->80/tcp   webserver

## 작동하는거 죽여주자
$ docker stop ubuntush
ubuntush
```



## 쉽게 컨테이너로 들어가기

- `docker attach {컨테이너 명}` => 컨테이너 들어가기

```bash
$ docker attach ubuntush
root@39546c9830fd:/# cat /etc/hosts
127.0.0.1       localhost  ## IP와 도메인 Mapping
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.17.0.3      39546c9830fd
root@39546c9830fd:/#
```



## 이미 컨테이너가 가동되어있다면 명령어를 바로 실행할 수 있음

- `docker container exec -it {컨테이너 명} {명령어}`

```bash
$ docker container exec -it ubuntush cat /etc/hosts
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.17.0.3      39546c9830fd
```



## 포트 및  개명

- `docker container port {컨테이너 명} => 어떤 포트를 쓰니`
- `docker container rename {기본 컨테이너명} {바꿀 명}`



## 컨테이너 간의 카피 및 공유

- `docker container cp {컨테이너 명}:{경로} {클라이언트 경로}` => 컨테이너에 있는 파일을 내 로컬로 복사
- `docker container cp  {클라이언트 경로} {컨테이너 명}:{경로} ` => 반대로 클라이언트를 컨테이너 쪽으로 복사할 수 있음
- `docker run -v {로컬경로}:{컨테이너 경로}` => 서로 공유한다



## 컨테이너 효율적으로 stop 하기

```bash
$ docker ps -q
5e040eff22e8
7f382b479cbf

$ docker stop `docker ps -q`
5e040eff22e8
7f382b479cbf

$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```





----

## Docker에 Oracle 설치해보기

```bash
$ docker pull wnameless/oracle-xe-11g-r2

$ docker run -d --name ora -p 8080:8080 -p 1521:1521  wnameless/oracle-xe-11g-r2
#  -d : background로 띄울꺼고, 이름은 ora, 웹 포트 8080, 1521은 DB 포트


$ docker exec -it ora bash

## 현재 ora라는 컨테이너 안에 Ubuntu 환경에서 oracle이 설치되있는 것을 알 수 있고
root@3b0ceb078ae6:/# cat /etc/issue
Ubuntu 18.04.3 LTS \n \l

## 그 Ubutu 환경에 있는 lsnrctl이 있는 것을 알 수 있다
root@3b0ceb078ae6:/# lsnrctl

LSNRCTL for Linux: Version 11.2.0.2.0 - Production on 03-AUG-2020 07:00:51

Copyright (c) 1991, 2011, Oracle.  All rights reserved.

Welcome to LSNRCTL, type "help" for information.

LSNRCTL> exit # ora 컨테이너로 나가는거다
```



## Docker에 MariaDB 설치해보기 

```bash
# 난 그냥 최신 버전 받앗는데 위에 :버전 붙여서 버전 조정가능
$ docker pull mariadb
Using default tag: latest
latest: Pulling from library/mariadb
3ff22d22a855: Already exists
e7cb79d19722: Already exists
323d0d660b6a: Already exists
b7f616834fd0: Already exists
78ed0160f03e: Pull complete
a122e9306ac4: Pull complete
673e89352b19: Pull complete
caf1e694359b: Pull complete
04f5e4f6ead3: Pull complete
a41772aadb3d: Pull complete
c3811aa2fa0a: Pull complete
655ad574d3c7: Pull complete
90ae536d75f0: Pull complete
Digest: sha256:812d3a450addcfe416420c72311798f3f3109a11d9677716dc631c429221880c
Status: Downloaded newer image for mariadb:latest
docker.io/library/mariadb:latest

# Mariadb가 있음
$ docker images
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
mariadb                      latest              8075b7694a2d        9 days ago          407MB
ubuntu                       latest              1e4467b07108        9 days ago          73.9MB
nginx                        latest              8cf1bfb43ff5        12 days ago         132MB
centos                       latest              831691599b88        6 weeks ago         215MB
hello-world                  latest              bf756fb1ae65        7 months ago        13.3kB
wnameless/oracle-xe-11g-r2   latest              0d19fd2e072e        10 months ago       2.1GB

#DB 포트를 할당하고 컨테이너 작동
$ docker run -d  -p 3306:3306 -e MYSQL_ROOT_PASSWORD=7845 --name maria mariadb
dca4fda7692c65404f719b50e0328c686a1bec427f57f56eb343c4fa638cb67a



## maria 이미지로  들어오고
$ docker exec -it maria bash
root@dca4fda7692c:/# cat /etc/issue
Ubuntu 20.04 LTS \n \l

## 컨테이너 안에서 mariadb 어딧니?
root@dca4fda7692c:/# which mariadb
/usr/bin/mariadb

# mariadb 실행하기
root@dca4fda7692c:/# mariadb -u root -p
Enter password:

# 그러면 로컬에서 사용하는 터미널 DB처럼 조정할 수 있다
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 3
Server version: 10.5.4-MariaDB-1:10.5.4+maria~focal mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.001 sec)

MariaDB [(none)]>

```

