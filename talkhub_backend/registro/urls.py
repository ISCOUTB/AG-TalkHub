"""
URL configuration for registro project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

# Redirigir a la página de registro cuando accedas a "/"
def redirect_to_register(request):
    return redirect('register')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),  # Incluye las URLs de la app 'users'
    path('', redirect_to_register),  # Redirige la raíz a la página de registro
]
