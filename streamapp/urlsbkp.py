from django.urls import path
from .views import video_feed_ppe, index, get_value, video_feed_medical,video_feed_qss, ppe, medical, send_value

urlpatterns = [
    path('', index, name='index'),
    path('medical/', medical, name='medical'),
    path('ppe/', ppe, name='ppe'),
    path('video_feed_ppe/', video_feed_ppe, name='video_feed'),
    path('video_feed_medical/', video_feed_medical, name='video_feed_medical'),
    path('video_feed_qss/', video_feed_qss, name='video_feed_qss'),
    path('get_value/', get_value, name='get_value'),
    path('send_value/', send_value, name='send_value'),
]
