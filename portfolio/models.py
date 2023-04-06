from django.db import models

# Create your models here.
class Projects(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/', blank=True)
    description = models.CharField(max_length=200)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.title
    