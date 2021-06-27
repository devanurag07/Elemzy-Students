from django.db.models import fields
from rest_framework.serializers import ModelSerializer, Serializer
from teachers.models import ClassRoom, Notes, Document, Assignment, Semester, Teacher
from teachers.models import RankingDocument, Subject
from rest_framework import serializers

from main.models import UserProfile
# // Classroom info
# Notes Seriazlizer,
# Document Serializer
# Assignment Serializer
# Leave Request Serializer


# Ranking Document Seriazlizer
#


class TeacherUserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["firstname", "lastname", "email", "birthdate", "profile_pic"]


class TeacherSerializer(ModelSerializer):

    user = TeacherUserProfileSerializer(many=False)

    class Meta:
        model = Teacher
        fields = ["user"]


class SubjectSerializer(ModelSerializer):

    class Meta:
        model = Subject
        fields = "__all__"


class SemesterSerializer(ModelSerializer):
    subjects = SubjectSerializer(many=True)

    class Meta:
        model = Semester
        fields = "__all__"


class ClassRoomSerializer(ModelSerializer):

    semesters = SemesterSerializer(many=True)

    class Meta:
        model = ClassRoom
        fields = "__all__"


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Notes
        fields = "__all__"


class DocumentSerializer(ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"


class AssignmentSerializer(ModelSerializer):
    class Meta:
        model = Assignment
        fields = "__all__"
