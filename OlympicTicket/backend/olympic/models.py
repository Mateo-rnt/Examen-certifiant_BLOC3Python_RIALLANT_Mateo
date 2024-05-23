from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import random
import string


# Create userprofile when user is created
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    key = models.CharField(max_length=8, blank=True)
    

    # generate key for user
    def generate_key(self):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    # assign key to user
    def assign_key(self):
        self.key = self.generate_key()
        self.save()

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)
        if created:
            profile.assign_key()  


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=100)
    price = models.FloatField()
    capacity = models.IntegerField()
    image = models.ImageField(upload_to='event_images', blank=True, null=True)

    def __str__(self):
        return self.name

class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    total_price = models.FloatField( null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=8, blank=True)
    def generate_key(self):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

    def __str__(self):
        return f"{self.user.username} - {self.event.name}"
    
    def save(self, *args, **kwargs):
        self.key = self.generate_key()
        self.total_price = self.event.price * self.quantity
        super(Ticket, self).save(*args, **kwargs)