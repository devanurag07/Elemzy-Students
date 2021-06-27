from teachers.models import Notes
from rest_framework import routers, urlpatterns
from .api import ClassroomAPI, NotesAPI, DocumentAPI, AssignmentAPI
from django.urls import path


router = routers.DefaultRouter()

urlpatterns = [
    path("classroom", ClassroomAPI.as_view()),
    path("classroom/notes", NotesAPI.as_view()),
    path("classroom/documents", DocumentAPI.as_view()),
    path("classroom/assignments", AssignmentAPI.as_view()),

] + router.urls