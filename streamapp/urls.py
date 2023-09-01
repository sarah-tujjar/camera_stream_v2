from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('home/', views.index, name='index'),
    path('', views.signin, name='signin'),
    # path('ipcam_feed/', views.ipcam_feed, name='ipcam_feed'),
    path('play_alert/', views.play_alert_audio, name='play_alert_audio'),
    path('uploadEmployee/', views.uploadEmployee, name='uploadEmployee'),
    path('uploadBlack/', views.uploadBlack, name='uploadBlack'),
    # path('get_mqtt_message/', views.get_mqtt_message, name='get_mqtt_message'),
    # path('append/', views.append_data, name='append_data'),
    path('save_logsdata/', views.save_logsdata_view, name='save_logsdata_view'),
    path('fetch_logsdata/', views.fetch_logsdata_view, name='fetch_logsdata_view'),
    path('signin_user/', views.signin_user, name='signin_user'),
    path('logout/', views.logout_user, name='logout'),
    path('play_audio/', views.play_audio, name='play_audio'),
    # path('videostream/', views.ssvideostream, name='ssvideostream'),
    # path('get_value/', views.get_value, name='get_value'),
    # path('video_feed_qss/', views.video_feed_qss, name='video_feed_qss'),
    path('patrol/', views.patrol, name='patrol'),
    path('delemp/<int:employee_id>/', views.delemp, name='delemp'),
    path('updwbstatus/<int:employee_id>/', views.updwbstatus, name='updwbstatus'),
    path('fetch_listdata/', views.fetch_listdata_view, name='fetch_listdata_view'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)