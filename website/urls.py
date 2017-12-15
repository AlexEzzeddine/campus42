from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^edit_map$', views.edit_map, name='edit_map'),
    url(r'^save_map$', views.save_map, name='save_map'),
    url(r'^get_active_users$', views.get_active_users, name='get_active_users'),
    url(r'^update_users$', views.update_users, name='update_users'),
]