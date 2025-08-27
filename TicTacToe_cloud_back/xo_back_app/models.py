from django.db import models

class Games(models.Model):
  user1 = models.CharField(max_length=255, null=False, blank=False)
  user2 = models.CharField(max_length=255, null=True, blank=True)
  move = models.CharField(max_length=255,null=True, blank=True)
  whatMove = models.CharField(max_length=255, null=True, blank=True)
  finish = models.CharField(max_length=255, default=0, null=False, blank=False)
