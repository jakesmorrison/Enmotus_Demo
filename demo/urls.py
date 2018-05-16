from django.conf.urls import url
from . import views

app_name = 'demo'
urlpatterns = [
    url(r'^demo_dashboard$', views.demo_dashboard, name='demo_dashboard'),
    url(r'^get_data$', views.get_data, name='get_data'),
    url(r'^new_fio', views.new_fio, name='new_fio'),
    url(r'^stop_demo', views.stop_demo, name='stop_demo'),

]