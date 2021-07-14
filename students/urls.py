from teachers.models import Notes
from rest_framework import routers, urlpatterns
from .api import ClassroomAPI, NotesAPI, DocumentAPI, AssignmentAPI, GradedAssignmentAPI, RankingDocumentAPI, DashboardDataAPI
from django.urls import path


from .api import SubjectExamsResultAPI
from .api import LeaveRequestAPI

router = routers.DefaultRouter()

router.register("classroom/rankingdocuments",
                RankingDocumentAPI, basename="rankingdocs")

router.register("classroom/leaverequests",
                LeaveRequestAPI, basename="leaverequets")


urlpatterns = [
    path("classroom", ClassroomAPI.as_view()),
    path("classroom/notes", NotesAPI.as_view()),
    path("classroom/documents", DocumentAPI.as_view()),
    path("classroom/assignments_list", AssignmentAPI.as_view()),
    path("classroom/gradedassignment", GradedAssignmentAPI.as_view()),
    path("classroom/subjectexamsresult", SubjectExamsResultAPI.as_view(),),
    path("classroom/dashboard", DashboardDataAPI.as_view(),)

] + router.urls
