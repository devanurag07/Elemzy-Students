from teachers.models import Notes
from rest_framework import routers, urlpatterns
from .api import ClassroomAPI, NotesAPI, DocumentAPI, AssignmentAPI, GradedAssignmentAPI, RankingDocumentAPI
from django.urls import path


from .api import SubjectExamsResultAPI

router = routers.DefaultRouter()

router.register("classroom/rankingdocuments",
                RankingDocumentAPI, basename="rankingdocs")


urlpatterns = [
    path("classroom", ClassroomAPI.as_view()),
    path("classroom/notes", NotesAPI.as_view()),
    path("classroom/documents", DocumentAPI.as_view()),
    path("classroom/assignments_list", AssignmentAPI.as_view()),
    path("classroom/gradedassignment", GradedAssignmentAPI.as_view()),
    path("classroom/subjectexamsresult", SubjectExamsResultAPI.as_view(),)

] + router.urls
