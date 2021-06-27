from rest_framework import response
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, NOT
from django.shortcuts import get_object_or_404


# Models
from teachers.models import Assignment, Document, Notes, Subject

# Serializers
from .serializers import AssignmentSerializer, ClassRoomSerializer, DocumentSerializer, NoteSerializer


# Utils
from .utils import get_student, get_classroom, hasAccessToSubject


class ClassroomAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = get_student(request=request)

        if(student == None):
            return Response("No Classroom Attached to Student", status=status.HTTP_401_UNAUTHORIZED)

        classroom = student.classroom

        classroom_json_data = ClassRoomSerializer(classroom).data

        return Response(classroom_json_data, status=status.HTTP_200_OK)


def getSubjectContent(request, ContentModel, ContentModelSerializer):
    student = get_student(request=request)

    if(student == None):
        return Response("No Classroom Attached to Student", status=status.HTTP_401_UNAUTHORIZED)

    subject_pk = request.query_params.get('subject_pk', None)
    if subject_pk == None:
        return Response("Subject pk not provided")
    elif not(subject_pk.isnumeric()):
        return Response("Subject pk should be numeric")

    subject = get_object_or_404(Subject, pk=subject_pk)

    if(subject):
        hasAccess = hasAccessToSubject(subject, student)

        if(hasAccess):
            subject_content = ContentModel.objects.filter(subject=subject)
            response_data = ContentModelSerializer(
                subject_content, many=True).data

            return Response(response_data)
        else:
            response_data = "You do not have any permission to view this subject."

            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)

    else:
        return Response("No subject provided")


class NotesAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        response = getSubjectContent(request, Notes, NoteSerializer)
        return response


class DocumentAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        response = getSubjectContent(request, Document, DocumentSerializer)
        return response


class AssignmentAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        response = getSubjectContent(request, Assignment, AssignmentSerializer)
        return response
