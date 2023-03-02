from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,AbstractUser
)
# Create your models here.

# class User(AbstractUser):
#     is_student = models.BooleanField(default=False)
#     is_mentor  = models.BooleanField(default=False)


class User(AbstractUser):


        
    email = models.EmailField(max_length=255)
    sub = models.CharField(max_length=100)

    class Meta:
          #abstract = False
          swappable = 'AUTH_USER_MODEL'
