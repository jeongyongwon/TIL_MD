# DJANGO SUMMARY

---

### 프로젝트 생성

```bash
$ django-admin startproject {project_name}
```



### `setting.py` 의 설정

```python
# 28번째 라인
ALLOWED_HOSTS = ['*']
```



#### 서버가 실행되는지 확인함

```bash
python manage.py runserver 8080
```



### `manage.py` 가  있는 폴더에서 app을 생성해준다.

```bash
python manage.py startapp {app_name}
```



### 👉  앱 설치 이후 기본 설정

### `INSTALLED_APPS` 에  앱을 등록한다

```python 
`INSTALLED_APPS` = [
  'app_name',
  'bootstrap4',
  # bootstrap4 자주 사용하니까 미리 같이 해주자
]

....

TEMPLATES = [
  'DIRS' = os.path.join(BASE_DIR,'templates') 
]


...
# 나중에 static, media 무조건 사용하므로 미리 사용하기

STATIC_DIRS = [
    os.path.join(BASE_DIR,'static')
    ]


MEDIA_ROOT = os.path.join(BASE_DIR,',media')

MEDIA_URL = '/media/'


AUTH_USER_MODEL = 'accounts.User'
# AbstractUser의 상속을 위해 미리 설정해줌
```



### 그리고 `templates` 와 `static`, `media` 폴더를  경로에 맞게 생성해줌

```bash
project/
			templates/
				base.html 
			static/
				bootstrap/
					bootstrap.min.css
					bootstrap.min.js
			media/
			app_name/
				templates/
					app_name/
				static/
					images/
					stylesheets/
       
```



### `base.html`에 필요한 설정을 해주자

```html
{% load static %}
{% load bootstrap4 %}


<head>
  <script src="https://kit.fontawesome.com/9477688b31.js" crossorigin="anonymous"></script>
  <!--fontawesome-->
  
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <!--bootstrap-->
  
    <link rel="stylesheet" href="{% static 'bootstrap/bootstrap.min.css' %}">
  <!--static-->
</head>
<body>
  <!--
base.html에 nav-bar를 두는게 좋은 것 같다 
그리고 로그인 했을 때와 안했을 때의 case 분류를 해줌

`request.user.is_authenticated`로 비교

-->
  
  <div class="container">
        {% block body %}
        {% endblock %}
    </div>
</body>

<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<!--bootstrap-->

<script src="{% static 'bootstrap/bootstrap.min.js' %}"></script>
<!--static-->
```



### project의 `urls.py` 설정 

```python
from django.contrib import admin
from django.urls import path, include ## include로 추가해서 app으로 연결되도록 설정한다.

from django.conf import settings
from django.conf.urls.static import static
## MEDIA


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('content/', include('content.urls')),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
### MEDIA 파일을 활용을 위해 기존의 url에 /media/ 와 파일을 저장하는 경로를 붙여줌

```



### 기본적으로 로그인 기능을 먼저 구현하자

`urls` ➡️  `views` ➡️ `template` 순으로 작성하자

```python
#urls.py

from django.urls import path
from . import views
### 같은 폴더에 views.py 불러오는 거 잊지 않기

app_name = 'accounts'
## url 접근의 용이성을 위해 app_name 설정

urlpatterns = [
 				.....
]
```



### USER 모델 기본 설정을 해주자

```python
#models.py

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
### USER MODEL이 망가지지 않도록  AbstractUser을 overriding 해준다.

# Create your models here.

class User(AbstractUser):
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name = 'followings')
    ### 나에게 버튼을 눌러서 팔로우하는 사람을 쌓는 것이고
    ### related_name으로 M:N 모델에서 내가 역으로 관계를 지닌 사람으로 몇명인지를 확인할 수 있음
```



### form 도 역시나 설정해주자

```python
# from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

# 그대로 활용하지 못하는 경우는 항상 상속받아서 custom!!!!
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'email']

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email']
```

### `views.py` 에서 **import** 해야할 것들 

```python
from django.shortcuts import render, redirect, get_object_or_404 ## 인스턴스 얻을 수 있음
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import get_user_model

## model이나 form도 있다
```



### follower(followings) 

```python
def follow(request, pk):
    User = get_user_model()
    # 팔로우 당하는 사람
    user = get_object_or_404(User, pk=pk)
    if user != request.user:
        # 팔로우를 요청한 사람 => request.user
        # 팔로우가 되어 있다면,
        if user.followers.filter(pk=request.user.pk).exists():
            # 삭제
            user.followers.remove(request.user)
        else:
            # 추가
            user.followers.add(request.user)
    return redirect('accounts:detail', user.pk)
```



### `detail.html ` 에 있다고 가정하고

```html
<p> {{ user_followers.count }}명이 팔로우하고 있습니다.</p>
<p> {{ user.followings.count }}명을 내가 팔로우하고 있습니다.</p>
```



## 🔥 CRUD 

- `urls.py`에서 **variable routing** 을 넘겨주는 것이 중요하다.

- **M : N** 관계에 대한 이해가 기본적으로 필요하다.

  ```bash
  # 1:1 관계
  
  어떤 사람은 한가지의 주민번호만 가지고, 주민번호도 한사람만 대상으로 함
  
  # 1:N 관계
  
  한 부서에는 여러명의 사람이 속해있다. 그러나 한 사람은 여러 부서에 속할 수 없음
  
  # M:N 관계
  
  교수는 여러명의 수강생들을 가질 수 있고, 수강생도 여러 수업의 교수를 가질 수 있음
  ```



### Create 하는 경우

```python
@login_required
def create(request):
    if request.method == 'POST':
      # (3) POST 요청을 왔을 때 
        form = PPO_Form(request.POST,request.FILES)
        # (4) 담겨옴 정보를 담은 form을 넘겨줌  + MEDIA 형식도 있으면  `request.FILES`를 적어줌
        if form.is_valid():
            ppo = form.save(commit=False)
            # (5) 받은 폼을 not commit 상태로 저장하고, 채워야 될 참조하는 것을 적어줌
            ppo.user = request.user
            ppo.save()
            return redirect('contents:detail', ppo.pk)


    else :
        form = PPO_Form()
        # (1) form을 가져옴 ✨ 여기선 GET 요청임
    context = {
        'form':form,
    }
    # (2) form을 가져와서 create 하는 곳으로 넘김
    return render(request,'contents/create.html',context)
```



`create.html`에서 `POST` 처리와 `MEDIA` 형식의 파일 받도록 해주는 설정을 해야함

```html
{% extends 'base.html' %}
{% load bootstrap4 %}
{% block body %}
    <form action="" method="POST" enctype='multipart/form-data'>
      	<!--method를 POST로 적어줘야 action의 의  url로 넘기는 것이고
						MEDIA 형식의 파일을 넘겨주기 위해 enctype을 적어주는 것이 필요-->
        {% csrf_token %}
      	<!--POST 형식으로 넘겨줄 수 있는 token이다-->
        {% bootstrap_form form %}
        <button class="btn btn-primary">생성</button>
      	<!--button type은 default는 submit이다
					그러므로 type='button'으로 적혀있으면 전송이 안됨-->
    </form>
{% endblock %}
```



