# REST API

---

- 기본적으로 JSON을 보내기 위함이다



### 호환을 위해 아직까진 `django==2.1.15` 을 설치한다

```bash
$ pip install django==2.1.15
```



### 그리고 프로젝트, 앱 등을 생성함. 그런 다음 Model 및 Url 설정함.

```bash
$ pip install djangorestframework
```



### `settings.py`의 **INSTALLED_APPS**에 등록해준다

```python 
INSTALLED_APPS = [
    ### local apps
    'musics',

    ## third party apps
    'rest_framework',
    'django_extensions',

```

### JSON 데이터를 앱 내에  `fixtures/{app_name}`안에 넣어준다.

```json
[
  {
    "model": "musics.artist",
    "pk": 1,
    "fields": {
      "name": "Coldplay"
    }
  },
  {
    "model": "musics.artist",
    "pk": 2,
    "fields": {
      "name": "Maroon5"
    }
  },
  {
    "model": "musics.music",
    "pk": 1,
    "fields": {
      "artist": 2,
      "title": "Girls Like You"
    }
  },
  ......
]

```





### ➡️ `models.py`

```python
from django.db import models

# Create your models here.


class Artist(models.Model):
    name = models.CharField(max_length=50)


class Music(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)


class Comment(models.Model):
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    content = models.TextField()
```



### app 폴더에 `serializers.py` 을 만들어준다.

`rest_framework` 에서 `serializers`를  **import** 해준다 

```python
from rest_framework import serializers
from .models import Artist, Music, Comment
```





### ➡️  `views.py`

```python
from django.shortcuts import render, get_object_or_404
from .models import Artist, Music, Comment

## form.py 처럼 serializers.py에서 import 해줌
from .serializers import ArtistSerializer, ArtistDetailSerializer, MusicSerializer, MusicDetailSerializer, CommentSerializer


from rest_framework.response import Response

## request.method에 데이터를 전송하도록
from rest_framework.decorators import api_view
```



### 흐름 이해하기

----

```python
#urls.py
path('artists/', views.artists_list, name = 'artist_list')

#views.py
@api_view(['GET'])
def artists_list(request):
    artists = Artist.objects.all()
    # (1) Artist의 모든 객체들을 받아오고
    
    
    serializer = ArtistSerializer(artists, many=True)
    # (2) 객체들을 직렬화해서 넘겨주는데  serializers.py에 가져온  ArtistSerializer를 활용
    # +many는 여러 개 있다 ?
    return Response(serializer.data) #(3) fields에 있는 것을 넘겨줌
  
    # serializers.py
    class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name']
```



### 위와 흐름이 비슷함 

```python
#urls.py
path('artists/<int:artist_pk>/', views.artists_detail, name = 'artist_detail')

#views.py
@api_view(['GET'])
def artists_detail(request, artist_pk):
    artist = get_object_or_404(Artist, pk=artist_pk)
    serializer = ArtistDetailSerializer(artist)
    return Response(serializer.data)
    
    #serializers.py
    class MusicSerializer(serializers.ModelSerializer):
      class Meta:
          model = Music
          fields = ['id', 'artist_id', 'title']
    
    class ArtistDetailSerializer(serializers.ModelSerializer):
    ## Artist를 참조하는 Music을 모두 가져오는 ?
    music_list = MusicSerializer(source='music_set', many=True)
    # models.IntegerField처럼 생각하면 됨
    music_count = serializers.IntegerField(source='music_set.count')

      class Meta:
          model = Artist
          fields = ['id', 'name', 'music_list', 'music_count']
```



### Comment 작성 및 수정, 삭제

```python
# urls.py
path('musics/<int:music_pk>/comments/', views.comment_create, name = 'comment_create')

#views.py
@api_view(['POST'])
def comment_create(request, music_pk):
  # JSON 형식을 python이 처리할 수 있도록
  # request.POST 랑 비슷하다고 생각하면 됨
    serializer = CommentSerializer(data = request.data) 
    # raise_exception 옵션은 검증에 실패시 400 bad request 응답을 준다
    if serializer.is_valid(raise_exception=True): 
        serializer.save(music_id = music_pk)
    return Response(serializer.data)
  
#serializers.py
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','content','music_id']
```



```python
#urls.py 
path('comments/<int:comment_pk>/', views.comment_update_and_delete, name="comment_update_and_delete"),

#views.py
def comment_update_and_delete(request,comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'PUT':
        # 수정
        serializer = CommentSerializer(data=request.data, instance=comment)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message':'성공적으로 수정되었습니다'})
    else :
        comment.delete()
        return Response({'message':'성공적으로 삭제되었습니다'})
  
  
#serializers.py

```

