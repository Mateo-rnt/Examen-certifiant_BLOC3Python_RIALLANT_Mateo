from django.urls import path
from .views import *

urlpatterns = [
    path('events/', EventListCreateAPIView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroyAPIView.as_view(), name='event-retrieve-update-destroy'),
    path('tickets/', TicketListCreateAPIView.as_view(), name='ticket-list-create'),
    path('tickets/<int:pk>/', TicketRetrieveUpdateDestroyAPIView.as_view(), name='ticket-retrieve-update-destroy'),
    path('tickets/user/<int:pk>', TicketRetrieveByUserAPIView.as_view(), name='ticket-retrieve-by-user'),
    path('users/', UserViewSet.as_view({'get': 'list'}), name='user-list'),
    path('users/<int:pk>/', UserViewSet.as_view({'get': 'retrieve'}), name='user-retrieve'),
    path('users/signup/', UserSignupView.as_view(), name='user-signup'),
]
