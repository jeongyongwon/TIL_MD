# GIT 요약





## 저장소 생성

```bash
git init   # 저장소 생성
```



## git 상태

```bash
>No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	test
	test.py
	test2.py
	
	## 아직 깃의 타임캡슐에 담지 않음
```



## git의 타임캡슐에 넣기

```bash
git add .
git status

### 깃에 타임캡슐에 담았다는 것을 알 수 있다
### 그러나 아직 설명을 안적었다.
>No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   test
	new file:   test.py
	new file:   test2.py
```





## 타임캡슐에 묻기 (설명과 함께)

```bash
git commit -m 'test1'
git status

##추가적으로 한개 더 묻어준다
git add . (test3.py)
git commit -m 'test3'
```





## 파일들에 변화를 주고 git status로 상태확인

```bash
git status

>On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   test
	deleted:    test.py
	modified:   test2.py

no changes added to commit (use "git add" and/or "git commit -a")
(base) jeong-yong-won-ui-MacBookPro:test jeong-yong-won$ 

```



##  과거의 캡슐 상태로 돌아가기(이전 commit으로 돌아가기)

### 1. 과감한 방법

- 돌아갈 과거 이후의 행적은 완전히 지움

```bash
git log로 우선 돌아갈 로그들을 확인함

>commit ab47fd3e17a5cf1d72e3fb4bdef3a25e7e4af0af (HEAD -> master)
Author: jeongyongwon <asdfg0237@naver.com>
Date:   Sat Jun 20 23:27:54 2020 +0900

    change 1

commit 2099503fb62fde4d8821bd31d3f62b19d014b77d
Author: jeongyongwon <asdfg0237@naver.com>
Date:   Sat Jun 20 23:25:03 2020 +0900

    test3

commit 54222a0f9c0acad9b6ca15ba52544b81101bf6e1
Author: jeongyongwon <asdfg0237@naver.com>
Date:   Sat Jun 20 23:22:54 2020 +0900

    test1
(base) jeong-yong-won-ui-MacBookPro:test jeong-yong-won$ ;q
-bash: syntax error near unexpected token `;'
(base) jeong-yong-won-ui-MacBookPro:test jeong-yong-won$


## 여기서 돌아가고 싶은 시점의 commit 앞의 6자리 복사해서 

git reset 209950 --hard 를 하면 그 시점으로 돌아감

```



### 2. 소심한 방법 (revert - 미래시점이 사라지지 않음)

```bash
git log 
##원하는 시점 다시 찾기

git revert 54222a 

##그런다음 그대로 저장하겠다 :wq를 입력해줌
```





## 평행우주 (branch)

```bash
#git branch {branch-name} 

git branch my-idea 
git checkout my-idea ## 브랜치로 넘어감
git checkout master ## 마스터로 넘어감


## 내가 현재있는 branch를 기점으로 평행우주를 만듬
git branch my-another-idea


git merge {branch name}
```



## 분기를 보기좋게

```python
git rebase {branch내용}
```



----

# GIT 으로 협업하기

```bash
## git remote  => repository가 있는지

git remote origin {git dir}
## origin은 원격명 

git push origin master ## 올리기 

## repository것을 그대로 받아오기

git clone {git dir}

git fetch  ## git의 소식을 받아옴 => 내가 모르는 commit 및 push 내용을 알 수 있음
git status ##하면 받아야할 commit을 확인해야함


### 동기화 시킴
##pull로 다 받기 전까지 push를 할 수 없음
git pull origin master

### branch를 원격저장소에 올림
git add .
git commit -m 'branch push'
git push origin my-idea{branch명을 올린다}


git branch ##로컬에 있는 branch만 보임
git branch -a  ## 로컬 원격에 있는 branch 다 보임


### my-idea라는 브랜치를 만들고 넘어가서 origin이라는 원격저장소의 내용을 my-idea branch로 받아옴
git checkout -b my-idea origin/my-idea




```

