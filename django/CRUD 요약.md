# CRUD 요약

----

## [1] 프로젝트 및 앱 생성

- `django-admin startproject (projectname)` 

  👉 프로젝트를 생성

- `python manage.py startapp (appname)`

  👉 `manage.py`  같은 dir에서 앱을 생성해준다.

  👉 앱을 생성하면 `settings.py`에서 출생신고를 해준다

  ```python
  ####[setting.py]#####
  
  ### HOSTS 허용도 함
  ALLOWED_HOSTS = ['*'] 
  
  ### 출생신고 해줌(설치된 앱을 등록해줌)
  
  INSTALLED_APPS = [
      'appname',
  
      'django.contrib.admin',
      'django.contrib.auth',
      'django.contrib.contenttypes',
      'django.contrib.sessions',
      'django.contrib.messages',
      'django.contrib.staticfiles',
  ]
  
  ...
  
  
  ### 언어코드와 TIME_ZONE도 바꿀 수 있지만..글로벌 앱이 되기 위해서는 손대지 말자
  LANGUAGE_CODE = 'en-us'
  
  TIME_ZONE = 'UTC'
  ```



## [2] URL 설정

- 앱마다 `urls.py `를 만들어서 각 앱마다 URL head 경로를 설정함

  ```python
  from django.contrib import admin
  from django.urls import path, include ###include 모듈을 import 해줘야 가능
  
  urlpatterns = [
      path('admin/', admin.site.urls), ##admin은 default로 있다
      path('community/',include('community.urls')) 
      ### appname/로 경로 설정을 하고 include(appnamm.urls)로 해당 앱의 url를 집어넣음
  ]
  
  ```

  

## [3] base.html 설정함



- `templates`의 효율성을 위해 `base.html` 설정함

- 이를 위해  `setting.py`의  `TEMPLATES`에서 base.html의 경로를 설정해준다.

- 그리고 `bootstrap` 적용을 위해 static을 활용해준다.

  ```python
  TEMPLATES = [
      {
          'BACKEND': 'django.template.backends.django.DjangoTemplates',
        ####os.path.join(BASE_DIR,'temlplates,appname') 식으로 해서 특정 폴더에 넣어주는데
        ## 그냥 manage.py dir에 두자
          'DIRS': [os.path.join(BASE_DIR,'templates')],
          'APP_DIRS': True,
          'OPTIONS': {
              'context_processors': [
                  'django.template.context_processors.debug',
                  'django.template.context_processors.request',
                  'django.contrib.auth.context_processors.auth',
                  'django.contrib.messages.context_processors.messages',
              ],
          },
      },
  ]
  
  
  ...
  
  
  STATIC_URL = '/static/'
  
  #### 얘도 templates/static을 base.html처럼 만들어줌
  
  STATICFILES_DIRS = [
      os.path.join(BASE_DIR, 'static'),
  ]
  
  ```

  

- `BASE_DIR`에  `templates` 폴더를 만들고, base.html을 아래와 같이 만들어줌

- <img src="image-20200412113108744.png" alt="image-20200412113108744" style="zoom:50%;" />

  ```html
  <!DOCTYPE html>
  {% load static %}
  <!--boot strap 활용을 위해서 적어줘야함-->
  
  
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <link rel="stylesheet" href="{% static 'bootstrap/bootstrap.min.css' %}">
    	<!--bootstrap 활용을 위해 static/bootstrap/ 의 경로를 설정하고
  bootstrap 홈페이지에 받은 파일 중에 min.css와 min.js를 넣어줌-->
  
  </head>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <!--bootstrap에서 CDN으로 위에 2개는 받고 믿에는 CSS처럼 BASE_DIR에서 끌어옴-->
  <script src="{% static 'bootstrap/bootstrap.min.js' %}"></script>
  <body>
      <nav class="bg-secondary">
          <a href="{% url 'community:index' %}">전체 리뷰 목록 조회</a>
          <a href="{% url 'community:create' %}">새로운 리뷰 작성</a>
      </nav>
  		<!--아래와 같이 base.html을 다른 앱에서 상속받을 수 있도록 적어줌-->
      <div>
          {% block body %}
          {% endblock %}
      </div>
  
  </body>
  </html>
  ```

  



## [3] DB_Model 생성 및 Form 생성

- `models.py`에 DB을 위해 객체 생성을 해준다.

  ```python
  from django.db import models
  
  class Review(models.Model) : ### models에서 Model을 상속받음
      title = models.CharField(max_length=100)
      movie_title = models.CharField(max_length=30)
      rank = models.IntegerField()
      content = models.TextField()
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  
  ```

  

- Console 창에 `python manage.py makemigrations`으로 폴더에 데이터베이스를 기록함

- 그리고 ` python manage.py migrate`

  👉 만약 객체 생성에 오류가 생긴다면, `manage.py`와 같이 있는 `db.sqlite3` 을 삭제하고 `migrations/` 안에 `__init__.py` 를 제외하고 삭제해주고 객체를 수정한 다음, 다시 위의 단계를 진행함



- 그리고 html 파일에 말고 `forms.py`에서 form을 상속받도록 함.

```python
from django import forms
from django.forms import ModelForm ### ModelForm 을 상속받고 
from .models import Review ## model.py에서 객체를 상속받음


## 객체에 관한 기본설정은 model.py에서 하고 세부적으로 꾸며줄 수 있음
class ReviewForm(ModelForm):
    title = forms.CharField(
        max_length=100,
        label = '리뷰 제목',
        help_text = '리뷰 제목은 100자 이내로 작성하세요.',
        widget = forms.TextInput(
            attrs={
                'placeholder':'리뷰 제목입력'
            }
        )

    )

    movie_title = forms.CharField(
        max_length=30,
        label = '영화 제목',
        help_text = '영화 제목은 30자 이내로 작성하세요.',
        widget = forms.TextInput(
            attrs={
                'placeholder':'영화 제목 입력'
            }
        )

    )
    content = forms.CharField(
        label = '내용',
        help_text = '자유롭게 작성하세요',
        widget = forms.Textarea(
            attrs={
                'row': 5,
                'col':50,
            }
        )

    )



    class Meta: ## 데이터에 관한 데이터
        model = Review
        fields = ['title','movie_title','rank','content']

```





- `forms.py` 에서 상속받기 위해서 html에서 아래와 같이 표현하면 됨

```html
{% extends 'base.html' %} <!--base.html 상속-->
{% load static %} <!--static/안에 있는 것들 상속-->
{% block body %}  <!--base.html 상속받고 안에 넣을 내용위함-->
    {% if request.resolver_match.url_name == 'create' %}
        <h2>새로운 리뷰 작성</h2>
    {% else %}
        <h2>수정하기</h2>
    {% endif %}

    <form action="" method="POST">

        {% csrf_token %}
        {{ form.as_p }} <!--form을 상속받을 때 표현-->

        <input type="submit" value='작성완료'>
    </form>
        <button><a href="{% url 'community:index' %}">BACK</a></button>



{% endblock %}
<!--base.html 상속받고 안에 넣을 내용위함-->
```

- 추가적으로 `admin.py`을 활용해서 admin을 따로 관리할 수 있음

  ```python
  from django.contrib import admin
  from .models import Review ### 객체를 상속받아서 admin에서 활용
  # Register your models here.
  
  admin.site.register(Review)
  ```

  

## [4] view.py와 templates 설정 (CRUD 본격 구현)

```python
from django.urls import path
from . import views

## app name을 설정하고
## community:urlname 형식으로 views.py엣 부를 수 있음 
app_name = 'community'

urlpatterns = [
    path('', views.index, name='index'),
    path('create/',views.create, name ='create'),
    path('<int:pk>/',views.detail,name = 'detail'),
    path('<int:pk>/update/',views.update, name ='update'),
    path('<int:pk>/delete/',views.delete, name = 'delete'),

]
```



```python
from django.shortcuts import render, redirect, get_object_or_404 
### redirect와, get_object_or_404를 불러옴
from django.views.decorators.http import require_POST
## POST 방식을 위해 불러옴

from .models import Review
### DB 모델을 불러옴

from .forms import ReviewForm
### Form을 불러옴


def index(request):
    reviews = Review.objects.order_by('-pk')
    context = {
        'reviews':reviews,
    }
    return render(request,'community/review_list.html',context)


def create(request):
    if  request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save()
            return redirect('community:detail',review.pk)


    else :
        form = ReviewForm()

    context = {
        'form':form,
    }

    return render(request,'community/form.html',context)



def detail(request,pk):
    review = get_object_or_404(Review,pk=pk)
    context = {
        'review':review
    }
    return render(request,'community/review_detail.html',context)



def update(request,pk):
    review = get_object_or_404(Review,pk=pk)
    if request.method == 'POST':
        form = ReviewForm(request.POST, instance=review)
        if form.is_valid():
            review = form.save()
            return redirect('community:detail',review.pk)
    else :
        form = ReviewForm(instance = review)

    context = {
        'form':form
    }
    return render(request,'community/form.html',context)

@require_POST
def delete(request, pk):
    review = get_object_or_404(Review,pk=pk)
    review.delete()
    return redirect('community:index')

# Create your views here.

```

