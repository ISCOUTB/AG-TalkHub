from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    Id_user = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=150, unique=True)
    # Otros campos que quieras modificar o añadir

    # Agregar related_name para evitar conflictos
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Cambiar el related_name para evitar el conflicto
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',  # Cambiar el related_name para evitar el conflicto
        blank=True
    )

    def __str__(self):
        return self.user_name
# Create your models here.
