from django.utils import tree
from rest_framework import response
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, NOT
from django.shortcuts import get_object_or_404


# Models
from teachers.models import Assignment, Document, Notes, Subject
from teachers.models import GradedAssignment

# Serializers
from .serializers import AssignmentSerializer, ClassRoomSerializer, DocumentSerializer, NoteSerializer
# Utils
from .utils import get_student, get_classroom, hasAccessToSubject


no_access_to_subject_msg = "You do not have access to this subject"


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

            return Response(no_access_to_subject_msg, status=status.HTTP_401_UNAUTHORIZED)

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


class AssignmentAPI(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):

        student = get_student(request=request)
        subject_pk = request.query_params.get("subject_pk", "None")

        if(not subject_pk.isnumeric()):
            return Response("Invalid Subject Pk its not provied or its a string")

        subject = get_object_or_404(Subject, pk=subject_pk)

        hasAccess = hasAccessToSubject(subject, student)

        if(hasAccess):
            assignments = Assignment.objects.filter(subject=subject)

            def is_graded(assignment): return not(GradedAssignment.objects.filter(
                assignment=assignment, student=student).exists())
            non_graded_assignments = filter(is_graded, assignments)

            response_data = AssignmentSerializer(
                non_graded_assignments, many=True).data

            return Response(response_data)

        else:
            return Response(no_access_to_subject_msg, status=status.HTTP_401_UNAUTHORIZED)
